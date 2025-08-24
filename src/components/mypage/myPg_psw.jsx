import { Profileback } from "../../img/img"
import '../../components/mypage/myPg-psw.css';
import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";


function MyPgpsw() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

   const [passwordError, setPasswordError] = useState(false);

    // 2. 입력값 변경을 처리하는 공통 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    // 새 비밀번호와 확인 비밀번호가 일치하는지 확인
    useEffect(() => {
        if (form.confirmPassword && form.newPassword !== form.confirmPassword) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    }, [form.newPassword, form.confirmPassword]);

    // 모든 필드가 채워졌고, 비밀번호 에러가 없을 때만 버튼 활성화
    const isButtonEnabled = form.currentPassword && form.newPassword && form.confirmPassword && !passwordError;

    // 3. '수정 완료' 버튼 클릭 시 실행될 함수
    const handleSubmit = async () => {
        // 버튼이 비활성화 상태이면 아무 작업도 하지 않음
        if (!isButtonEnabled) return;

        try {
            // apiClient를 사용해 PATCH 요청 전송
            // API 명세에 맞게 Request Body를 구성합니다.
            const response = await apiClient.patch('/booster/password', {
                currentPassword: form.currentPassword,
                newPassword: form.newPassword,
                confirmPassword: form.confirmPassword
            });

            // 성공 시 서버 메시지를 보여주고 마이페이지로 이동
            alert(response.data.message || "비밀번호가 성공적으로 변경되었습니다.");
            navigate('/mypage');

        } catch (error) {
            console.error("비밀번호 변경 실패:", error);
            // 서버에서 보낸 에러 메시지가 있다면 그것을 사용하고, 없다면 일반 메시지 표시
            const errorMessage = error.response?.data?.message || "비밀번호 변경 중 오류가 발생했습니다.";
            alert(errorMessage);
        }
    };

    return (
        <div className="total_ct">
            <section className="pf-edit-ct">
                <img src={Profileback} onClick={() => navigate('/mypage')} alt="뒤로가기"></img>
                <p> 비밀번호 수정 </p>
                <div class="profile-dummy"></div>
            </section>

            <hr className="profile-hr"/>

            <div className="mypg-password-edit-ct">
 <section className="new-password">
                    <label htmlFor="currentPassword"> 현재 비밀번호 </label>
                    <input 
                        id="currentPassword"
                        name="currentPassword" // state 객체의 키와 일치
                        type="password" 
                        placeholder="현재 비밀번호를 입력해 주세요."
                        value={form.currentPassword}
                        onChange={handleChange}
                    />
                </section>

                <section className="new-password">
                    <label htmlFor="newPassword"> 새 비밀번호 </label>
                    <input 
                        id="newPassword"
                        name="newPassword" // state 객체의 키와 일치
                        type="password" 
                        placeholder="새 비밀번호를 입력해 주세요."
                        value={form.newPassword}
                        onChange={handleChange}
                    />
                </section>

                <section className="new-password-check">
                    <label htmlFor="confirmPassword"> 새 비밀번호 확인 </label>
                    <input 
                        id="confirmPassword"
                        name="confirmPassword" // state 객체의 키와 일치
                        type="password" 
                        placeholder="다시 한번 입력해 주세요."
                        value={form.confirmPassword}
                        onChange={handleChange}
                    />
                    {passwordError && (
                        <p className="error-message">비밀번호가 일치하지 않습니다.</p>
                    )}
                </section>
            </div>

            <div className="ps-edit-button-ct">
                <button
                    className={`ps-edit-complete ${isButtonEnabled ? 'active' : ''}`}
                    disabled={!isButtonEnabled}
                    onClick={handleSubmit} // 5. 수정 완료 버튼에 handleSubmit 함수 연결
                > 
                    수정 완료 
                </button>

            </div>

        </div>
    )
}

export default MyPgpsw;