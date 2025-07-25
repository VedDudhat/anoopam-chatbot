import Chatboticon from "./Chatboticon";

const ChatMessage = ({chat}) => {
    return (
        <div className={`message ${chat.role === "model" ? 'bot' :'user' }-message ${chat.isError ? "error": " "}`}>
          {chat.role === "model" && <Chatboticon/>}
          <p className={`${chat.role === "model" ? 'bot' : 'user'}-message-text`}>
            {chat.text}
          </p>
        </div>
      );
  };

  export default ChatMessage;