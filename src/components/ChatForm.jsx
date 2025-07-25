import { useRef } from "react";
import { data }  from "../data";

const ChatForm = ({ chatHistory, setChatHistory, setIsThinking, generatebotresponse }) => {
  const inputRef = useRef();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;

    const newUserChat = { role: "user", text: userMessage };
    const newChatHistory = [...chatHistory, newUserChat];
    setChatHistory(newChatHistory);

    inputRef.current.value = "";
    setIsThinking(true);

    const promptWithContext = `please answer the question based on the given data:"""${data}"""Question: ${userMessage}`;
    const updatedChat = [...chatHistory, { role: "user", text: promptWithContext}];
    
    await generatebotresponse(updatedChat);
    setIsThinking(false);  
};

  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
      <input
        ref={inputRef}  
        type="text"
        placeholder="Ask a question"
        className="message-input"
        required
      />
      <button className="material-symbols-rounded">send</button>
    </form>
  );
};

export default ChatForm;
