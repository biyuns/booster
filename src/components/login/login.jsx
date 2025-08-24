// src/pages/login/LoginPg.js

import '../../styles/total.css';
import './login.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient';

function LoginPg() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loginError, setLoginError] = useState(false);
    const [isButtonActive, setIsButtonActive] = useState(false);

    // 입력 필드 값이 변경될 때마다 form 상태를 업데이트
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // 이메일과 비밀번호가 모두 입력되었는지 확인하여 버튼 활성화 상태를 결정
    useEffect(() => {
        const { email, password } = form;
        setIsButtonActive(email.trim() !== "" && password.trim() !== "");
    }, [form]);

    // 로그인 버튼 클릭 시 실행될 함수
    const handleLogin = async () => {
        if (!isButtonActive) return; // 버튼이 비활성화 상태면 아무것도 하지 않음

        setLoginError(false); // 이전 에러 상태 초기화
    
        try {
            // apiClient를 사용하여 백엔드에 로그인 요청
            const response = await apiClient.post('/booster/login', {
                email: form.email,
                password: form.password,
            });

            // 응답 데이터에서 accessToken을 추출
            const { accessToken } = response.data;

            if (accessToken) {
                // accessToken을 localStorage에 저장
                localStorage.setItem('accessToken', accessToken);
                console.log('로그인에 성공했습니다.');
                navigate('/main'); // 메인 페이지로 이동
            } else {
                // accessToken이 응답에 없는 비정상적인 경우
                setLoginError(true);
                alert('로그인에 실패했습니다: 서버로부터 토큰을 받지 못했습니다.');
            }
        } catch (error) {
            console.error('로그인 API 요청 오류:', error);
            setLoginError(true);
            
            // 더 구체적인 에러 메시지 제공
            if (error.response) {
                // 서버가 4xx, 5xx 에러로 응답한 경우 (예: 아이디 또는 비밀번호 불일치)
                alert('이메일 또는 비밀번호가 올바르지 않습니다.');
            } else if (error.request) {
                // 서버로부터 응답을 받지 못한 경우 (네트워크, CORS, SSL 문제 등)
                alert('서버에 연결할 수 없습니다. 네트워크 상태를 확인해주세요.');
            } else {
                // 요청을 설정하는 중에 발생한 오류
                alert('로그인 중 알 수 없는 오류가 발생했습니다.');
            }
        }
    };

    const handleGoToSignUp = () => {
        navigate('/signup');
    };

    return (
        <div className="total_ct">
            <p className="login_text"> 안녕하세요 :) <br /> 부스터 입니다. </p>
            <section className="login-form">
                <div className="email-ct">
                    <label className="login-email" htmlFor="email"> 이메일 </label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={form.email} 
                        onChange={handleChange} 
                        placeholder="이메일 주소를 입력해 주세요." 
                        required 
                    />
                    {/* loginError가 true일 때만 에러 메시지 표시 */}
                    {loginError && <p className="error-message"> 입력하신 정보를 확인해 주세요. </p>}
                </div>

                <div className="password-ct">
                    <label className="login-password" htmlFor="password"> 비밀번호 </label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={form.password} 
                        onChange={handleChange} 
                        placeholder="비밀번호를 입력해주세요." 
                        required 
                    />
                </div>
            </section>
            
            <button 
                className="login-button" 
                onClick={handleLogin} 
                style={{ backgroundColor: isButtonActive ? '#FF4500' : '' }}
                disabled={!isButtonActive}
            > 
                로그인 
            </button>

            <hr className='login-line'/> 

            <section className="login-bottom"> 
                <p className="signup-msg"> Booster가 처음 이에요</p>
                <p className="signup-link" onClick={handleGoToSignUp}> 가입하기</p>    
            </section>
        </div>
    );
}

export default LoginPg;
