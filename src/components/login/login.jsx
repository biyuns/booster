// src/pages/login/LoginPg.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import '../../styles/total.css';
import './login.css';

function LoginPg() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loginError, setLoginError] = useState(false);
    const [isButtonActive, setIsButtonActive] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        const { email, password } = form;
        setIsButtonActive(email.trim() !== "" && password.trim() !== "");
    }, [form]);

    // ✨ 문법 오류 수정 및 userId, nickname 저장 로직이 포함된 최종 handleLogin 함수
    const handleLogin = async () => {
        if (!isButtonActive) return;
        setLoginError(false);
    
        try {
            const response = await apiClient.post('/booster/login', {
                email: form.email,
                password: form.password,
            });

            const accessToken = response.headers.access;
            // 서버 응답 본문(body)에서 userId와 nickname을 가져옵니다.
            const { userId, nickname } = response.data; 

            if (accessToken && userId) {
                // 로컬 스토리지에 모든 사용자 정보를 정확히 저장합니다.
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('user_id', userId.toString()); // 키 이름을 'user_id'로 통일
                localStorage.setItem('nickname', nickname);

                console.log('로그인 성공! 로컬 스토리지에 저장된 정보:');
                console.log('accessToken:', localStorage.getItem('accessToken'));
                console.log('user_id:', localStorage.getItem('user_id'));
                console.log('nickname:', localStorage.getItem('nickname'));
                
                alert('로그인에 성공했습니다.');
                navigate('/main');
            } else {
                setLoginError(true);
                alert('로그인에 실패했습니다: 서버로부터 필수 정보(토큰 또는 userId)를 받지 못했습니다.');
            }
        } catch (error) { // 이 catch 블록은 문법적으로 올바릅니다.
            console.error('로그인 API 요청 오류:', error);
            setLoginError(true);
            
            if (error.response) {
                alert('이메일 또는 비밀번호가 올바르지 않습니다.');
            } else if (error.request) {
                alert('서버에 연결할 수 없습니다. 네트워크 상태를 확인해주세요.');
            } else {
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
