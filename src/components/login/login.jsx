import '../../styles/total.css'
import './login.css';
import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

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
        const { email, password} = form;
        if (email.trim() && password.trim()) {
            setIsButtonActive(true);
        } else {
            setIsButtonActive(false);
        }
    }, [form]);

    const handleLogin = async() => {
        if(!isButtonActive) return;

        setLoginError(false);
    
        try {
            const response = await fetch('booster/login', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    email: form.email,
                    password: form.password,
                }),
            });

            if (response.ok) { 
                const result = await response.json();
                localStorage.setItem('accessToken', result.accessToken); 
                console.log('로그인에 성공했습니다.');
                navigate('/main');
            } else { 
                setLoginError(true);
            }
        } catch (error) {
            console.error('로그인 API 요청 오류:', error);
            setLoginError(true);
            alert('로그인 중 문제가 발생했습니다. 네트워크 상태를 확인해주세요.');
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