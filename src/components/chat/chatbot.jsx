// src/pages/chatbot/ChatBot.jsx

import './chatbot.css';
import { useState, useEffect, useRef } from 'react';
import BotMsg from './bot-msg';
import UserMsg from './user-msg';
import apiClient from '../../api/apiClient';
// import { send_icon } from '../../img/img'; // 전송 아이콘 import (예시)

function ChatBot() {
    // --- 상태 관리 ---
    const [sessionId, setSessionId] = useState(null); // 이전 대화를 기억하기 위한 세션 ID
    const [question, setQuestion] = useState(""); // 사용자가 입력 중인 질문
    const [chat, setChat] = useState([]); // 전체 대화 내역 (사용자 + 봇)
    const [isLoading, setIsLoading] = useState(false); // API 응답 대기 상태

    const chatContainerRef = useRef(null);

    // --- 대화창 스크롤 자동 이동 ---
    useEffect(() => {
        // chat 배열에 새로운 메시지가 추가될 때마다 스크롤을 맨 아래로 이동
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chat]);

    // --- 메시지 전송 처리 핸들러 ---
    const handleSendMessage = async () => {
        const userQuestion = question.trim();
        if (!userQuestion) return; // 빈 메시지는 전송하지 않음

        // 1. 사용자 메시지를 UI에 즉시 추가
        setChat(prevChat => [...prevChat, { id: crypto.randomUUID(), text: userQuestion, send: "user" }]);
        setQuestion(""); // 2. 입력창 비우기
        setIsLoading(true); // 3. 로딩 상태 시작

        const requestBody = {
            question: userQuestion,
            sessionId: sessionId, // 첫 질문 시 null, 이후에는 서버에서 받은 ID 사용
        };

        try {
            // 4. API 서버에 질문 전송
            const response = await apiClient.post('/booster/chatbot/ask', requestBody);
            const botResponse = response.data;

            // 5. 봇의 답변을 UI에 추가
            setChat(prevChat => [...prevChat, { id: crypto.randomUUID(), text: botResponse.answer, send: "bot" }]);
            
            // 6. 다음 대화를 위해 새로운 세션 ID 저장
            setSessionId(botResponse.sessionId);

        } catch (err) {
            console.error("챗봇 응답 오류:", err);
            const errorMessage = {
                id: crypto.randomUUID(),
                text: "죄송해요, 지금은 답변할 수 없어요. 잠시 후 다시 시도해주세요.",
                send: "bot"
            };
            setChat(prevChat => [...prevChat, errorMessage]);
        } finally {
            setIsLoading(false); // 7. 로딩 상태 종료
        }
    };

    // --- Enter 키로 메시지 전송 ---
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !isLoading) {
            handleSendMessage();
        }
    };

    return (
        <div className="total_ct">
            <p className="main-title"> Booster </p>
            
            <section className='chat-ct' ref={chatContainerRef}>
                {/* 초기 안내 메시지 */}
                {chat.length === 0 && (
                     <BotMsg key="init" a="안녕하세요! 부스터 챗봇입니다. 무엇을 도와드릴까요?" />
                )}
                
                {/* 대화 내역 렌더링 */}
                {chat.map((msg) => (
                    msg.send === "user" 
                        ? <UserMsg key={msg.id} q={msg.text} /> 
                        : <BotMsg key={msg.id} a={msg.text} />
                ))}

                {/* 로딩 중일 때 "입력 중..." 메시지 표시 */}
                {isLoading && <BotMsg key="loading" a="..." />}
            </section>

            <section className='input-ct'>
                <div className='input-div'>
                    <input
                        placeholder="Booster에게 무엇이든 물어보세요:)"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={isLoading} // 로딩 중에는 입력 비활성화
                    />
                    <button onClick={handleSendMessage} disabled={isLoading}>
                        {/* <img src={send_icon} alt="전송" /> */}
                        전송
                    </button>
                </div>
            </section>
            
            <footer className="main-footer">
                {/* Footer 내용 */}
            </footer>
        </div>
    );
}

export default ChatBot;
