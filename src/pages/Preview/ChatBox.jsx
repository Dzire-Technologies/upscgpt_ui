import ChatBox from "src/components/ChatBox/ChatBox"
import { useEffect, useRef, useState, useCallback, useMemo } from "react"
import GetService from "src/utils/http/GetService"
import { API_URL } from "src/config/const"
import PostService from "src/utils/http/PostService"
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from "react-router-dom"
import EmptyPreview from "./EmptyPreview"
import { toast } from "react-toastify"
import { isEmptyJSON } from "src/utils/utils"
import { GetUserDetails, getBackendToken } from "src/services/Auth";
import { useChatHistory } from "src/context/ChatHistoryContext"

const PreviewChatBox = ({ urlPrex = "/preview" }) => {
    const [feedbackStatus, setFeedbackStatus] = useState(false);
    const [currentConfigID, setCurrentConfigID] = useState(0)
    const [conversations, setConversation] = useState([])
    const { chatHistory, setChatHistory } = useChatHistory();
    const [currentChat, setCurrentChat] = useState({})
    const [isChatLoading, setIsChatLoading] = useState(false)
    const [enableChatbox, setEnableChatbox] = useState(true)
    const [currentState, setCurrentState] = useState(3)
    const [user, setUser] = useState({});

    const { contextId } = useParams()
    const navigate = useNavigate()
    const messageBoxRef = useRef(null)
    
    const fetchUser = async () => {
        const supauser = await GetUserDetails();
        return supauser?.data?.user_metadata || null;
    };

    // Memoized bot message template
    const createBotMessage = useMemo(() => (message = "", chatId = null, followUps = []) => ({
        isBot: true,
        message,
        entity: null,
        error: "",
        format: "general_message",
        kind: "none",
        data: [],
        chat_id: chatId,
        follow_ups: followUps,
        chat_context_id: contextId
    }), [contextId]);

    // Improved streaming chat query with new API response format
    const chatQuery = useCallback(async (message) => {
        if (!message?.trim()) return;
        if (!user?.token) {
            toast.error("User not authenticated. Please wait...");
            return;
        }
        // Add user's message
        setConversation(prev => [...prev, { isBot: false, message: message.trim() }]);
        setIsChatLoading(true);

        const query = encodeURIComponent(message.trim());
        const chatId = contextId || "";
        const token = user?.token;
        
        let botMessageIndex = -1;
        let accumulatedContent = "";
        let currentChatId = null;
        let processingStatus = "";
        
        const url = `${API_URL}/chat/stream?query=${query}&chat_id=${chatId}`;

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": token,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let buffer = "";

            // Process streaming response
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                
                // Process complete lines
                const lines = buffer.split('\n');
                buffer = lines.pop() || ''; // Keep incomplete line in buffer

                for (const line of lines) {
                    if (!line.trim()) continue;
                    
                    try {
                        // Remove 'data: ' prefix if present
                        const cleanLine = line.trim().replace(/^data:\s*/, "");
                        if (!cleanLine) continue;
                        
                        const event = JSON.parse(cleanLine);
                        await handleStreamEvent(event);
                    } catch (parseError) {
                        console.warn("Failed to parse JSON chunk:", parseError, "Line:", line);
                    }
                }
            }

            // Process any remaining buffer content
            if (buffer.trim()) {
                try {
                    const cleanBuffer = buffer.trim().replace(/^data:\s*/, "");
                    if (cleanBuffer) {
                        const event = JSON.parse(cleanBuffer);
                        await handleStreamEvent(event);
                    }
                } catch (e) {
                    console.warn("Failed to parse final buffer:", e);
                }
            }

        } catch (error) {
            console.error("Chat query error:", error);
            handleChatError(error);
        } finally {
            setIsChatLoading(false);
        }

        // Handle individual stream events based on new API format
        async function handleStreamEvent(event) {

            // Handle processing status (first chunk)
            if (event.status === "processing") {
                processingStatus = event.message || "Processing your query...";
                // Show processing message
                updateBotMessage(processingStatus);
                return;
            }

            // Handle content chunks (middle chunks)
            if (event.chunk !== undefined) {
                accumulatedContent += event.chunk;
                // Update with accumulated content, showing agent if available
                const displayMessage = accumulatedContent;
                updateBotMessage(displayMessage);
                return;
            }

            // Handle completion (last chunk)
            if (event.status === "completed") {
                currentChatId = event.chat_id;
                const finalResponse = event.response || accumulatedContent;
                const followUps = event.follow_ups || [];
                
                // Update with final response and metadata
                updateBotMessage(finalResponse, currentChatId, followUps);
                setIsChatLoading(false);
                return;
            }

            // Handle any other event types
            console.log("Unknown event type:", event);
        }

        // Update or create bot message
        function updateBotMessage(content, chatId = null, followUps = []) {
            setConversation(prev => {
                if (botMessageIndex === -1) {
                    // First update - add new bot message
                    botMessageIndex = prev.length;
                    return [...prev, createBotMessage(content, chatId, followUps)];
                } else {
                    // Update existing bot message
                    return prev.map((chat, idx) =>
                        idx === botMessageIndex
                            ? { 
                                ...chat, 
                                message: content,
                                chat_id: chatId || chat.chat_id,
                                follow_ups: followUps.length > 0 ? followUps : chat.follow_ups
                            }
                            : chat
                    );
                }
            });
        }

        // Handle chat errors
        function handleChatError(error) {
            setConversation(prev => [
                ...prev,
                {
                    ...createBotMessage("Oops, something went wrong. Please try again."),
                    error: error.message,
                },
            ]);
        }

    }, [contextId, createBotMessage, user?.token]);

    // Improved event handlers
    const onChatBoyKeyDown = useCallback((e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            const message = e.target.innerText?.trim();
            if (message) {
                chatQuery(message);
                e.target.innerText = "";
            }
        }
    }, [chatQuery]);

    const onSendClick = useCallback(() => {
        const message = messageBoxRef.current?.innerText?.trim();
        if (message) {
            chatQuery(message);
            messageBoxRef.current.innerText = "";
        }
    }, [chatQuery]);


    const getChatByContexts = useCallback(async (contextId) => {
        if (!contextId || !user?.token) return;

        try {
            const response = await fetch(`${API_URL}/chat/${contextId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": user.token,
                },
            });
            
            const data = await response.json();
            const chats = data?.messages;
            const tempChat = [];

            for (let i = 0; i < chats.length; i += 2) {
                const humanMessage = chats[i];
                const aiMessage = chats[i + 1];

                // Push user message if it exists and role is "human"
                if (humanMessage && humanMessage.role === "human" && humanMessage.content) {
                    tempChat.push({
                        isBot: false,
                        message: humanMessage.content,
                        chat_context_id: contextId,
                        feedback_status: 0,
                    });
                }

                // Push AI message if it exists and role is "ai"
                if (aiMessage && aiMessage.role === "ai" && aiMessage.content) {
                    tempChat.push({
                        isBot: true,
                        message: aiMessage.content,
                        error: "",
                        entity: null,
                        format: null,
                        kind: null,
                        data: null,
                    });
                }
            }
            setConversation(tempChat);
        } catch (error) {
            console.error("Error fetching chat by context:", error);
            toast.error("Failed to load chat history");
        }
    }, [user?.token]);

    // Improved chat history retrieval
    const getChatHistory = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/profile`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": user.token,
                },
            });

            const data = await response.json()
            
            const chats = data.chats
            if (!chats) return;

            const chatHistory = Object.entries(chats).map(([chatContextId, chatQuery]) => ({
                chatId: null,
                chatContextId,
                chatQuery,
                date: null,
            }));

            setChatHistory(chatHistory);
        } catch (error) {
            console.error("Error fetching chat history:", error);
            toast.error("Failed to load chat history");
        }
    }, [setChatHistory, user?.sub]);

    const generateContextUUID = useCallback(() => uuidv4(), []);

    const onCreateNewChat = useCallback(() => {
        navigate(`${urlPrex}/${generateContextUUID()}/chat`);
    }, [navigate, urlPrex, generateContextUUID]);

    // Improved feedback handler
    const onFeedback = useCallback(async (e, feedbackStatus, feedbackMessage = "", message) => {
        try {
            const response = await PostService(`${API_URL}/chat/feedback`, {
                chat_context_id: message.chat_context_id,
                chat_id: message.chat_id,
                feedback_status: feedbackStatus ? 1 : 0,
                feedback_json: { reason: feedbackMessage }
            });

            setFeedbackStatus(response.data?.feedback_status === 1);
            toast.success("Feedback submitted successfully");
        } catch (error) {
            console.error("Error submitting feedback:", error);
            toast.error("Failed to submit feedback");
        }
    }, []);

    // Handle follow-up question clicks
    const onFollowUpClick = useCallback((followUpQuestion) => {
        if (followUpQuestion?.trim()) {
            chatQuery(followUpQuestion);
        }
    }, [chatQuery]);

    // Effects

    useEffect(() => {
        if (contextId) {
            getChatByContexts(contextId);
        }
    }, [contextId, getChatByContexts]);

    useEffect(() => {
        getChatHistory();
        if (!contextId) {
            onCreateNewChat();
        }
    }, [contextId, onCreateNewChat]);

    useEffect(() => {
        if (!user || Object.keys(user).length === 0) {
            const getUser = async () => {
                const metadata = await fetchUser();
                let token = "";
                if (metadata) {
                    let token = localStorage.getItem("x_token");
                    if (!token) {
                        const stoken = await getBackendToken(metadata);
                        if (stoken?.data?.data?.x_token) {
                            token = stoken.data.data.x_token;
                            localStorage.setItem("x_token", token);
                        }
                    }
                    setUser({ ...metadata, token });
                }
            };
            getUser();
        }
    }, []);

    useEffect(() => {
        if (user?.sub) {
            getChatHistory();
        }
    }, [user?.sub, getChatHistory]);

    return (
        <ChatBox
            messageBoxRef={messageBoxRef}
            isLoading={isChatLoading}
            conversations={conversations}
            onKeyDown={onChatBoyKeyDown}
            onSendClick={onSendClick}
            onFeedback={onFeedback}
            onFollowUpClick={onFollowUpClick}
        />
    );
};

export default PreviewChatBox;