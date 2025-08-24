import '../../styles/total.css'
import '../../components/signUp/signup2.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
import apiClient from '../../api/apiClient';
import SignupHeader2 from '../header/SignupHeader2';

function SignUpPg2() {
    const navigate = useNavigate();
    const location = useLocation();
    const { email, password } = location.state || {};

    const [form, setForm] = useState({
        name: "",
        gender: "",
        studentNum: "",
        department: "",
    });

    const [isNextButtonActive, setIsNextButtonActive] = useState(false);

        useEffect(() => {
        if (!email || !password) {
            alert('필수 정보가 누락되었습니다. 첫 단계부터 다시 진행해주세요.');
            navigate('/signup/step1');
        }
    }, [email, password, navigate]);

    const changeForm = (e) => {
        let targetName = e.target.name;
        if (targetName === "student-num") {
            targetName = "studentNum";
        }
        setForm((prev) => ({
            ...prev,
            [targetName]: e.target.value,
        }));
    };

    const clickButton = (e) => {
        e.preventDefault()
        setForm((prev) => ({
            ...prev,
            gender: e.target.value,
        }));
    }

     useEffect(() => {
        const allFieldsFilled = Object.values(form).every(value => value !== "");
        setIsNextButtonActive(allFieldsFilled);
    }, [form]);
 const handleNext = async (e) => {
        e.preventDefault(); // form 새로고침 방지

        // 요청하신 상세 유효성 검사 로직을 유지합니다.
        if (form.name === "") {
            alert("이름을 입력해주세요.");
            return;
        }
        if (form.gender === "") {
            alert("성별을 선택해주세요.");
            return;
        }
        if (form.studentNum === "") {
            alert("입학년도를 선택해주세요.");
            return;
        }
        if (form.department === "") {
            alert("학부(학과)를 선택해주세요.");
            return;
        }
        
        // 모든 필드가 채워졌을 때 API 요청을 보냅니다.
        if (isNextButtonActive) {
            const requestBody = {
                email: email,
                password: password,
                nickname: form.name,
                admissionYear: parseInt(form.studentNum, 10),
                gender: form.gender.toUpperCase(),
                department: form.department
            };

            try {
                const response = await apiClient.post('/booster/join', requestBody);
                
                console.log("가입 정보:", requestBody);
                console.log("회원가입 성공:", response.data);
                
                // 요청하신 대로 회원가입 완료 후 '/signup/step3'로 이동합니다.
                navigate('/signup/step3');

            } catch (error) {
                console.error("회원가입 실패:", error.response ? error.response.data : error.message);
                alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
            }
        }
    };

    return (
        <div className="total_ct">
            <SignupHeader2 num={2} />
            <p className="signup2_text">회원가입</p>
            <section className="signup-form2">
                <div className="name2-ct">
                    <label className="signup-name2" htmlFor="name">이름</label>
                    <input type="text" id="name2" name="name" placeholder="이름을 입력해주세요." required onChange={changeForm} className={form.name === "" ? "" : "bold"}></input>
                    <p className='warning-msg2'>*안전한 이용을 위해 실명을 사용해 주세요.</p>
                </div>

                <div className="gender-ct2">
                    <label className="signup-gender2">성별</label>
                    <div>
                        <button id="female2" value="female" name="female" onClick={clickButton} className={form.gender === "female" ? "active-button2" : ""}>여성</button>
                        <button id="male2" value="male" name="male" onClick={clickButton} className={form.gender === "male" ? "active-button2" : ""}>남성</button>
                    </div>
                </div>

                <div className="student-num-ct2">
                    <label className="signup-student-num2" htmlFor="student-num">입학년도</label>
                    <select id="student-num2" name="student-num" required onChange={changeForm} className={form.studentNum === "" ? "" : "bold2"}>
                        <option value="" disabled hidden>선택하세요</option>
                        <option value="2017">2017학번</option>
                        <option value="2018">2018학번</option>
                        <option value="2019">2019학번</option>
                        <option value="2020">2020학번</option>
                        <option value="2021">2021학번</option>
                        <option value="2022">2022학번</option>
                        <option value="2023">2023학번</option>
                        <option value="2024">2024학번</option>
                        <option value="2025">2025학번</option>
                    </select>
                </div>

                <div className="department-ct2">
                    <label className="signup-department2" htmlFor="department">학부(학과)</label>
                    <select id="department2" name="department" required onChange={changeForm} className={form.department === "" ? "" : "bold2"}>
                        <option value="" disabled hidden>선택하세요</option>
                        <option value="의료경영학과">의료경영학과</option>
                        <option value="사회복지전공">첨단학부</option>
                        <option value="사회복지전공">자연계열학부</option>
                        <option value="사회복지전공">인문사회계열학부</option>
                        <option value="자유전공학부">자유전공학부</option>
                        <option value="임상병리학과">임상병리학과</option>
                        <option value="안경광학과">안경광학과</option>
                        <option value="응급구조학과">응급구조학과</option>
                        <option value="방사선학과">방사선학과</option>
                        <option value="치위생학과">치위생학과</option>
                        <option value="물리치료학과">물리치료학과</option>
                        <option value="간호대학">간호학과</option>
                        <option value="의예과">의예과</option>

                    </select>
                </div>
            </section >
            <div className="signup2-button-ct">
            <button className="next-button2"onClick={handleNext}
                    style={{ backgroundColor: isNextButtonActive ? '#FF4500' : '' }}>다음</button>
            </div>
        </div >
    )
}

export default SignUpPg2;