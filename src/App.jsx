import { useEffect, useRef, useState } from "react";
import ChatbotIcon from "./components/Chatboticon";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";
import Chatbotthink from "./components/Chatbotthink";


const App = () => {
  const [chatHistory, setChatHistory] = useState([]);  
  const [isThinking, setIsThinking] = useState(false); 
  const [showchatbot, setshowchatbot] = useState(false); 
  const chatbodyref = useRef();   
  const generatebotresponse = async (history) => {
    const updateHistory = (text) => {
      setChatHistory(prev => [...prev, {role:"model", text}]);
    };

    history = history.map(({role, text}) => ({role, parts: [{text}]}));
    //format chat history
    const requestOption ={
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({contents: history})
    }
    
    try {
      //make api call for bot's response 
       const response = await fetch(import.meta.env.VITE_API_URL, requestOption);
       const data = await response.json();
       if(!response.ok) throw new Error(data.error.message || "something went wrong");

       const apiResponsetext = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
       updateHistory(apiResponsetext);
       console.log(data); 
    }
    catch(error) {
      updateHistory(error.message, true);
    }   
  };
  useEffect(() => {
    //auto scroll
    chatbodyref.current.scrollTo({top: chatbodyref.current.scrollHeight, behavior: "smooth"});
  }, [chatHistory]);

  return (
    <div className={`container ${showchatbot ? "show-chatbot" : ""}`}>
      <button onClick={() => setshowchatbot (prev => !prev)} 
      id="chatbot-toggler">
        <span className="material-symbols-rounded" >mode_comment</span>
        <span className="material-symbols-rounded" >close</span>
      </button>
      <div className="chatbot-popup">
        {/* chatbot-header */}
        <div className="chatbot-header"> 
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">Anoopam Chatbot</h2>
          </div>
          <button className="material-symbols-rounded">keyboard_arrow_down</button>
        </div>

        {/*chatbot-body*/} 
        <div ref={chatbodyref} className="chatbot-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Hey there 🙏 <br /> Jay Shree Swaminarayan!!
            </p>
          </div>

          {/* Dynamically render chat history */}
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}

          {/* Typing Indicator */}
          {isThinking && (
            <div className="message bot-message">
              <ChatbotIcon />
              <Chatbotthink />
            </div>
          )}
        </div>

        {/* chatbot-footer */}
        <div className="chat-footer">
          <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} setIsThinking={setIsThinking} generatebotresponse ={generatebotresponse} />
        </div>
      </div>
    </div>
  );
};

export default App;
