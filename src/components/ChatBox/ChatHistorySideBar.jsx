import { useRef, useState } from 'react'
import style from "./ChatBox.module.css"
import plusIcon from "./assets/plus-image.svg"
import arrowRight from "./assets/arrow-right.svg"
import ChatHistoryButton from "src/components/ChatBox/ChatHistoryButton"
import Clock from "./assets/time-lap.svg"
import sideBarIcon from "./assets/sidebar-icon.svg"
import newChatIcon from "./assets/newchat-icon.svg" 
import ChatDropdownMenu from './ChatDropdownMenu/ChatDropdownMenu'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom'



function ChatHistorySideBar({ chatHistory }) {

  const toggleHistoryRef = useRef(null)
  const [isHidden, setIsHidden] = useState(false);

  const navigate = useNavigate()
  

  const showHideSideHistory = (e) => {
    onClick(e, setIsHidden)
  }

  const formatDate = (date) => {
      const options = { year: 'numeric', month: 'long' };
      return new Date(date).toLocaleDateString('en-US', options);
  };

  function generateContextUUID() {
          return uuidv4();
      }
  
  const onCreateNewChat=()=>{
      navigate(`/preview/${generateContextUUID()}/chat`)
    }

  const handleNavigateChatContext=(e, contextId)=>{
      navigate(`/preview/${contextId}/chat`)    
  }


const formattedData = chatHistory.reduce((acc, chat) => {
  
    const { chatContextId, chatQuery, date } = chat;

    // Format the date to "MONTH YEAR"
    const formattedDate = formatDate(date);

    // Initialize the entry if it doesn't exist
    if (!acc[formattedDate]) {
        acc[formattedDate] = {
            title: formattedDate,
            chatQuery: []
        };
    }

    // Add the message to the appropriate date group
    acc[formattedDate].chatQuery.push({
        contextId: chatContextId,
        message: chatQuery
    });

    return acc;
}, {});

const resultArray = Object.values(formattedData);


  return (
    <>
    <div className={isHidden ? `${style.toggleContainer}` : `${style.chatHistoryContainer}`} ref={toggleHistoryRef}>
        <div className={style.ChatNavBar}>
          {/* {isHidden ? <></> : (<div className={style.HistoryArrowButton} onClick={(e) => {showHideSideHistory(e) }}>
            <img src={arrowRight} />
            </div>)} */}

          <div className={style.NewChatBtnDiv} style={{ width: '100%' }}>
            <button
              onClick={(e)=>{onCreateNewChat(e)}}
              style={{
                width: '100%',
                background: 'linear-gradient(to right, #6F7EDB, #5A6BC7)',
                color: '#ffffff',
                cursor: 'pointer',
                padding: '0.5rem 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                borderRadius: '0.375rem', // rounded-md
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // shadow-lg
                transition: 'all 0.2s ease-in-out',
                fontSize: '14px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'linear-gradient(to right, #5A6BC7, #4B5BBE)';
                e.currentTarget.style.boxShadow = '0 6px 10px rgba(0, 0, 0, 0.15)'; // hover:shadow-xl
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'linear-gradient(to right, #6F7EDB, #5A6BC7)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              }}
            >
              {/* <img src={newChatIcon} style={{paddingRight: '10px',height: '16px',width: '16px',verticalAlign: 'middle'}} /> */}
              New Chat
            </button>
          </div>
        </div>
        <div className={style.ChatHistoryContent}>
          <div className={style.RecentChat}>
            <div className={style.RecentChats}>
            <ChatDropdownMenu handleNavigateChatContext={handleNavigateChatContext} data={resultArray}/>
            </div>
          </div>
        </div>
    </div>
      {/* {isHidden ? (<ChatHistoryButton onClick={() => { setIsHidden(!isHidden) }} icon={Clock} text={"History"} />) : null} */}
    </>

  )
}

export default ChatHistorySideBar