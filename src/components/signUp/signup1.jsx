import '../../styles/total.css'
import '../../components/signUp/signup1.css'
import Signup_header from '../../components/header/signup-header';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


function SignUpPg1() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
        checkPassword: "",
    });

    const [passwordError, setPasswordError] = useState(false);    

    const changeForm = (e) => {
        let targetName = e.target.name;
        if (targetName === "check-password") {
            targetName = "checkPassword";
        }

        setForm((prev) => ({
            ...prev,
            [targetName]: e.target.value,
        }));
        console.log(form)
    };

    useEffect(() => {
        if(form.checkPassword && form.password !== form.checkPassword) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    }, [form.password, form.checkPassword]);

    const handleNext = () => {
        if(!form.email.endsWith('.ac.kr')) {
            alert('을지대학교 이메일 계정을 사용해주세요.');
            return;
        }
        if(!form.password || form.password !== form.checkPassword) {
            alert('비밀번호를 확인해주세요.');
            return;
        }

        navigate('/s')
    }







    return (
        <div className="total_ct">
            <Signup_header num={1} />
            <p className="signup_text">회원가입</p>
            <section className="signup-form">
                <div className="email-ct">
                    <label className="signup-email" htmlFor="email">이메일</label>
                    <input type="email" id="email" name="email" placeholder="이메일 주소를 입력해주세요." required onChange={changeForm} className={form.email === "" ? "" : "bold"}></input>
                    <p className='warning-msg'>*인증을 위해 학교 계정을 사용해 주세요.</p>
                </div>

                <div className="password-ct">
                    <label className="signup-password" htmlFor="password">비밀번호</label>
                    <input type="password" id="password" name="password" placeholder="비밀번호를 입력해주세요." required onChange={changeForm} className={form.password === "" ? "" : "bold"}></input>
                </div>

                <div className="check-password-ct">
                    <label className="check-password" htmlFor="check-password">비밀번호 확인</label>
                    <input type="password" id="check-password" name="check-password" placeholder="다시 한번 입력해주세요." required onChange={changeForm} className={form.checkPassword === "" ? "" : "bold"}></input>
                    {passwordError && <p className='warning-msg'>!입력하신 비밀번호가 일치하지 않습니다.</p>}
                </div>
            </section>

            <div className="signup-button-ct">
            <button className="next-button" onClick={handleNext}>다음</button>
            </div>
        </div>
    )
}

export default SignUpPg1;