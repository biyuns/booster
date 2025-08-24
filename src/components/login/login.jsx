import '../../styles/total.css'
import './login.css';
import React, { useEffect, useState} from 'react';
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value,
        }));
    };

        useEffect(() => {
        const { email, password } = form;
        if (email.trim() && password.trim()) {
            setIsButtonActive(true);
        } else {
            setIsButtonActive(false);
        }
    }, [form]);

    // 2. handleLogin 함수를 apiClient를 사용하도록 수정합니다.
    const handleLogin = async () => {
        if (!isButtonActive) return;

        setLoginError(false);
    
        try {
            // apiClient.post를 사용하여 백엔드에 로그인 요청
            const response = await apiClient.post('/booster/login', {
                email: form.email,
                password: form.password,
            });

            // 성공 시, 응답 데이터에서 accessToken을 추출하여 localStorage에 저장
            const accessToken = response.data.accessToken;
            if (accessToken) {
                localStorage.setItem('accessToken', accessToken);
                console.log('로그인에 성공했습니다.');
                navigate('/main'); // 메인 페이지로 이동
            } else {
                // accessToken이 응답에 없는 경우
                setLoginError(true);
                alert('로그인에 실패했습니다: 토큰 정보가 없습니다.');
            }
        } catch (error) {
            console.error('로그인 API 요청 오류:', error);
            setLoginError(true);
            
            // 더 구체적인 에러 메시지 제공
            if (error.response) {
                // 서버가 4xx, 5xx 에러로 응답한 경우
                alert('이메일 또는 비밀번호가 올바르지 않습니다.');
            } else if (error.request) {
                // 서버로부터 응답을 받지 못한 경우 (네트워크, CORS, SSL 문제 등)
                alert('서버에 연결할 수 없습니다. 네트워크 상태를 확인해주세요.');
            } else {
                alert('로그인 중 알 수 없는 오류가 발생했습니다.');
            }
        }
    };

    const handleGoToSingUp = () => {
        navigate('/signup');
    };


    return (
        <div className="total_ct">
            <p className="login_text"> 안녕하세요 :) <br /> 부스터 입니다.  </p>
            <section className="login-form">
                <div className="email-ct">
                    <label className="login-email"> 이메일 </label>
                    <input type="email" id="email" name="email" value={form.email} onChange={handleChange} placeholder="이메일 주소를 입력해 주세요." required></input>
                    {loginError && <p> 입력하신 정보를 확인해 주세요. </p>}
                </div>

                <div className="password-ct">
                    <label className="login-password"> 비밀번호 </label>
                    <input type="password" id="password" name="password" value={form.password} onChange={handleChange} placeholder="비밀번호를 입력해주세요." required></input>
                </div>
            </section>
            <button className="login-button" onClick={handleLogin} 
            style={{backgroundColor:isButtonActive ? '#FF4500' : ''}}> 로그인 </button>

            <hr className='login-line'/> 

            <section className="login-bottom"> 
                <p className="signup-msg"> Booster가 처음 이에요</p>
                <p className="signup-link" onClick={handleGoToSingUp}> 가입하기</p>    
            </section>
        </div>
    )
}

export default LoginPg;