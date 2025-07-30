import { createContext, useContext, useState } from "react";

const ChatHistoryContext = createContext();

export const ChatHistoryProvider = ({ children }) => {
  const [chatHistory, setChatHistory] = useState([]);

  return (
    <ChatHistoryContext.Provider value={{ chatHistory, setChatHistory }}>
      {children}
    </ChatHistoryContext.Provider>
  );
};

export const useChatHistory = () => useContext(ChatHistoryContext);
