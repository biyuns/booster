// import './chatbot.css';
// import { useState } from 'react';
// import BotMsg from './bot-msg';
// import UserMsg from './user-msg';
// import apiClient from '../../api/apiClient';

// function ChatBot() {

//     //API 연동
//     const [sessionId, setSession] = useState(null)

//     const questionBody = {
//         question: question.trim(),
//         sessionId: sessionId,
//     };

//     const fetchChatBot = async () => {
//         try {
//             const response = await apiClient.post('/booster/chatbot/ask', questionBody);

//             const answer = await response.data;
//             console.log(answer);
//             createBotC(answer.answer);
//             setSession(answer.sessionId);
//         } catch (err) {

//         } finally {

//         }
//     }


//     //input 값 받아오기
//     const [question, setQuestion] = useState("");

//     const inputValue = (e) => {
//         setQuestion(e.target.value);
//     }


//     //사용자 chat 만들기
//     const [chat, setChat] = useState([]);

//     function createUserC(question) {
//         setChat((prevChat) => [...prevChat, { id: crypto.randomUUID(), text: question, send: "user" }]);

//         fetchChatBot();
//         setQuestion("");
//     }


//     function createBotC(answer) {
//         setChat((prevChat) => [...prevChat, { id: crypto.randomUUID(), text: answer, send: "bot" }]);
//         setQuestion("");
//     }


//     return (
//         <div className="total_ct">
//             <p className="main-title"> Booster </p>
//             <section className='chat-ct'>
//                 {chat.map((msg) => (
//                     msg.send === "user" ? <UserMsg key={msg.id} q={msg.text} /> : <BotMsg key={msg.id} a={msg.text} />
//                 ))}
//             </section>
//             <section className='input-ct'>
//                 <div className='input-div'>
//                     <input
//                         placeholder="Booster에게 무엇이든 물어보세요:)"
//                         value={question || ""}
//                         onChange={inputValue}
//                     />
//                     <button onClick={() => { createUserC(question) }}>
//                         <img></img>
//                     </button>
//                 </div>
//             </section>
//             <footer className="main-footer">
//                 {/* <img src={home_red}></img>
//                 <img src={board}></img>
//                 <img src={chat}></img>
//                 <img src={boon}></img>
//                 <img src={my}></img> */}
//             </footer>
//         </div>
//     )
// }

// export default ChatBot;