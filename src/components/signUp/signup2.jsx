import '../../styles/total.css'
import '../../components/signUp/signup2.css'
import Signup_header from '../../components/header/signup-header';
import { useState } from 'react';
import { useEffect } from 'react';

function SignUpPg2() {
    const [form, setForm] = useState({
        name: "",
        gender: "",
        studentNum: "",
        department: "",
    });

    useEffect(() => {
        console.log(form);
    }, [form]);

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
        setForm((prev) => ({
            ...prev,
            gender: e.target.value,
        }));
    }

    return (
        <div className="total_ct">
            <Signup_header num={2} />
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
                        <option value="식품영양학과">식품영양학과</option>
                        <option value="식품산업외식학과">식품산업외식학과</option>
                        <option value="보건환경안전학과">보건환경안전학과</option>
                        <option value="의료경영학과">의료경영학과</option>
                        <option value="의료IT학과">의료IT학과</option>
                        <option value="의료공학과">의료공학과</option>
                        <option value="미용화장품과학과">미용화장품과학과</option>
                        <option value="의료홍보디자인학과">의료홍보디자인학과</option>
                        <option value="스포츠아웃도어학과">스포츠아웃도어학과</option>
                        <option value="장례지도학과">장례지도학과</option>
                        <option value="중도재활복지학과">중도재활복지학과</option>
                        <option value="유아교육학과">유아교육학과</option>
                        <option value="아동학과">아동학과</option>
                        <option value="빅데이터의료융합학과">빅데이터의료융합학과</option>
                        <option value="식품영양전공">식품영양전공</option>
                        <option value="식품생명공학전공">식품생명공학전공</option>
                        <option value="안전공학전공">안전공학전공</option>
                        <option value="화장품과학전공">화장품과학전공</option>
                        <option value="의료공학전공">의료공학전공</option>
                        <option value="빅데이터인공지능전공">빅데이터인공지능전공</option>
                        <option value="의료경영전공">의료경영전공</option>
                        <option value="레지산업전공">레지산업전공</option>
                        <option value="뷰티아트전공">뷰티아트전공</option>
                        <option value="시각디자인전공">시각디자인전공</option>
                        <option value="장례산업전공">장례산업전공</option>
                        <option value="중독상담전공">중독상담전공</option>
                        <option value="사회복지전공">사회복지전공</option>
                        <option value="사회복지전공">첨단학부</option>
                        <option value="사회복지전공">자연계열학부</option>
                        <option value="사회복지전공">인문사회계열학부</option>
                        <option value="아동청소년상담전공">아동청소년상담전공</option>
                        <option value="글로벌빅데이터AI학과">글로벌빅데이터AI학과</option>
                        <option value="의정부 자유전공학부">의정부 자유전공학부</option>
                        <option value="성남 임상병리학과">성남 임상병리학과</option>
                        <option value="의정부 임상병리학과">의정부 임상병리학과</option>
                        <option value="안경광학과">안경광학과</option>
                        <option value="응급구조학과">응급구조학과</option>
                        <option value="방사선학과">방사선학과</option>
                        <option value="치위생학과">치위생학과</option>
                        <option value="물리치료학과">물리치료학과</option>
                        <option value="의료경영학과(25학번)">의료경영학과(25학번)</option>
                        <option value="간호대학">간호대학</option>
                        <option value="의정부 간호학과">의정부 간호학과</option>
                        <option value="성남 간호학과">성남 간호학과</option>
                        <option value="의예과">의예과</option>
                        <option value="의학과">의학과</option>

                    </select>
                </div>
            </section >
            <div className="signup2-button-ct">
            <button className="next-button2">다음</button>
            </div>
        </div >
    )
}

export default SignUpPg2;