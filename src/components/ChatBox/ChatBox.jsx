import { forwardRef, useEffect, useRef, useState } from "react";
import style from "./ChatBox.module.css";
import Message from "./Message";
import ExampleIcon from "./assets/examples-icon.svg";


import Loader from "./Loader";

const ChatBox = forwardRef(
  (
    {
      messageBoxRef = null,
      isLoading = false,
      onFeedBackSubmit = () => {},
      conversations = [],
      onKeyDown = () => {},
      onKeyUp = () => {},
      onSendClick = () => {},
      onLike = () => {},
      onDisLike = () => {},
      onFollowupClick = () => {}
    },
    ref
  ) => {
    const chatListRef = useRef(null);

    const handleOnLikeClick = (e, feedbackStatus, feedbackMessage, message) => {
      onLike(e, feedbackStatus, feedbackMessage, message);
    };

    const handleOnDisLikeClick = (e, message) => {
      onDisLike(message);
    };

    const handleFollowupClick = (followupQuestion) => {
      if (messageBoxRef && messageBoxRef.current) {
        messageBoxRef.current.textContent = followupQuestion;
        onSendClick();
      }
    };

    const handleInput = (event) => {
      const messageBox = event.target;
      if (messageBox.textContent.trim() === "") {
        messageBox.innerHTML = ""; // Remove any <br> or hidden characters
      }
    };

    const landingCardClick = (message) => {
      if (messageBoxRef && messageBoxRef.current) {
        messageBoxRef.current.textContent = message;
        onSendClick();
      }
    };

    useEffect(() => {
      document
        .querySelector("#messageBody")
        .scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
    }, [conversations]);

    return (
      <>
        <div className={style.ChatBoxContainer}>
          <div className={style.ChatMessagesContainer}>
            <div className={style.ChatMessageContainer}>
              <div
                className={style.ChatBoxLanding}
                style={{ display: conversations.length === 0 ? "flex" : "none" }}
              >
                <div className={style.ChatBoxLandingText}>
                  <h1>Hello!</h1>
                  <p>How can i help you today?</p>
                </div>
                <div className={style.ChatboxExampleHeader}>
                  <img
                    src={ExampleIcon}
                    alt="Chat Icon"
                    className={style.ChatBoxExampleIcon}
                    style={{"height":"15px", "width":'15px'}}
                  />
                  <h2>Examples</h2>
                </div>
                <div className={style.ChatBoxExampleList}>
                  <div className={style.ChatBoxExampleItem} onClick={(e) => {landingCardClick(e.target.textContent)}}>
                    How should I prepare for UPSC in 12 months?
                  </div>
                  <div className={style.ChatBoxExampleItem} onClick={(e) => {landingCardClick(e.target.textContent)}}>
                    What is the UPSC exam pattern and syllabus?
                  </div>
                  <div className={style.ChatBoxExampleItem} onClick={(e) => {landingCardClick(e.target.textContent)}}>
                    Which optional subject should I choose for UPSC?
                  </div>
                  <div className={style.ChatBoxExampleItem} onClick={(e) => {landingCardClick(e.target.textContent)}}>
                    Explain the Indian Constitution and Polity​
                  </div>
                  <div className={style.ChatBoxExampleItem} onClick={(e) => {landingCardClick(e.target.textContent)}}>
                   What are the career opportunities after UPSC?
                  </div>
                  <div className={style.ChatBoxExampleItem} onClick={(e) => {landingCardClick(e.target.textContent)}}>
                    How to improve answer writing for UPSC Mains?
                  </div>
                </div>
              </div>
              <div
                id="messageBody"
                ref={chatListRef}
                className={style.chatList}
              >
                {conversations.map((message, index) => {
                  return (
                    <Message
                      onLike={handleOnLikeClick}
                      onDisLike={handleOnDisLikeClick}
                      onFeedbackSubmit={onFeedBackSubmit}
                      onFollowupClick={handleFollowupClick}
                      key={index}
                      message={message}
                    />
                  );
                })}
                {isLoading && <Loader />}
              </div>
            </div>

            <div>
              <div className={style.ChatBoxTextContainer}>
                <div
                  ref={messageBoxRef}
                  className={style.ChatBoxTextBox}
                  contentEditable="plaintext-only"
                  onKeyDown={onKeyDown}
                  onKeyUp={onKeyUp}
                  onInput={handleInput}
                ></div>
                <div>
                  <div
                    className={style.ChatBoxSendIcon}
                    onClick={onSendClick}
                  ></div>
                </div>
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#888",
                  textAlign: "center",
                }}
              >
                Disclaimer: The responses are AI-generated and provided for reference purposes only.
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default ChatBox;
