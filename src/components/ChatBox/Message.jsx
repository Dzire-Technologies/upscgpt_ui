import style from "./ChatBox.module.css";
import botIcon from "./assets/bot-icon.svg";
import botErrorIcon from "./assets/bot-error-icon.svg";
import userIcon from "./assets/user-icon.svg";
import Time from "./Time";
import { useState } from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const Message = ({
  message = {},
  onLike = () => {},
  onDisLike = () => {},
  onFeedbackSubmit = () => {},
  onFollowupClick = () => {} 
}) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [showChatSummary, setShowChatSummary] = useState(false);
  const [showChatError, setShowChatError] = useState(false);
  const [followupClicked, setFollowupClicked] = useState(false);

  const handleOnLikeClick = (e) => {
    onLike(e, true, "", message);
  };

  const handleOnDislikeClick = (e) => {
    setShowFeedback(true);
    onDisLike(e);
  };

  const handleOnSummaryOpen = () => {
    setShowChatSummary(true);
  };

  const handleFollowupClick = (followupQuestion) => {
    setFollowupClicked(true);
    onFollowupClick(followupQuestion);
  };

  // Custom renderer for code blocks
  const markdownComponents = {
    code({ inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline ? (
        <SyntaxHighlighter
          style={oneDark}
          language={match ? match[1] : "plaintext"}
          PreTag="div"
          customStyle={{ width: "auto" }}
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <>
      <div className={style.Message}>
        <div
          className={
            message.isBot == false
              ? style.UserMessageContainer
              : style.BotMessageContainer
          }
        >
          <div>
            <div
              className={`${style.MessageContainer}  ${
                message.isBot == false ? style.UserMessage : style.BotMessage
              }`}
            >
              {message.isBot && (
                <div>
                  <img
                    src={message.error != "" ? botErrorIcon : botIcon}
                    className={style.MessageAvatar}
                  />
                </div>
              )}
              <Markdown components={markdownComponents}>
                {message.message}
              </Markdown>{" "}
              {message.isBot == true && message.error != "" && (
                <span
                  className={style.ErrorExpandButton}
                  onClick={() => setShowChatError(!showChatError)}
                >
                  click here
                </span>
              )}
              {message.isBot == true && (
                <Time
                  onLike={handleOnLikeClick}
                  onDisLike={handleOnDislikeClick}
                  onSummaryClick={handleOnSummaryOpen}
                  summaryOpen={showChatSummary}
                  time={"Today 12:30pm"}
                  message={message}
                />
              )}
              {!message.isBot && (
                <div>
                  {" "}
                  <img src={userIcon} className={style.UserMessageAvatar} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Followup Questions */}
        {message.isBot &&
          message.follow_ups &&
          message.follow_ups.length > 0 &&
          !followupClicked && (
            <div className={style.FollowupContainer}>
              {message.follow_ups.map((question, index) => (
                <button
                  key={index}
                  className={style.FollowupButton}
                  onClick={() => handleFollowupClick(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          )}
      </div>
      {/* <div style={{marginLeft: "52px", marginBottom: "40px"}}>
                 {showFeedback && message.isBot && <Feedback onSubmit={onFeedbackSubmit} onFeedBackClose={handleOnFeedbackClose} message={message} /> }
                
                 { (message.kind == "list" || message.kind == "table" || message.kind == "single" || message.kind == "none") && <Table data={message.data?.chart?.data} />}
                 { message.kind == "bar_chart" && <BarChart title={message.data.chart.title} data={message.data.chart.data} xAxis={message.data.chart.xAxis[0]} yAxis={message.data.chart.yAxis[0]}  /> }
                 { message.kind == "pie_chart" && <PieChart title={message.data.chart.title} data={message.data.chart.data} labelKey={message.data.chart.xAxis[0]} dataKey={message.data.chart.yAxis[0]}  /> }
                 { message.kind == "line_chart" && <LineChart title={message.data.chart.title} data={message.data.chart.data} xAxis={message.data.chart.xAxis[0]} yAxis={message.data.chart.yAxis[0]}  /> }
                 { message.kind == "area_chart" && <AreaChart title={message.data.chart.title} data={message.data.chart.data} xAxis={message.data.chart.xAxis[0]} yAxis={message.data.chart.yAxis[0]}  /> }
                 { message.isBot && message.data.query && <Summary message={message} /> }
                 { message.isBot && showChatError && message.error != "" && <ErrorMessage error={message.error} onClose={()=>setShowChatError(false)} />} 
            </div> */}
    </>
  );
};

export default Message;
