// src/pages/mypage/MyPgUser.jsx

import '../../components/mypage/myPgUser.css';
import { Profileback } from '../../img/img';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';

function MyPgUser() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nickname: '',
        gender: '',
        admissionYear: '',
        department: '',
    });

    // --- 여기가 수정된 부분입니다 ---
    useEffect(() => {
        const fetchCurrentProfile = async () => {
            try {
                const response = await apiClient.get('/booster/profile');
                setFormData(response.data);
            } catch (error) {
                console.error("기존 프로필 정보를 불러오는 데 실패했습니다.", error);
                alert("프로필 정보를 불러오지 못했습니다. 이전 페이지로 돌아갑니다.");
                navigate(-1);
            }
        };
        fetchCurrentProfile();
    // useEffect가 사용하는 외부 함수 'navigate'를 의존성 배열에 추가합니다.
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        if (!formData.nickname || !formData.gender || !formData.admissionYear || !formData.department) {
            alert("모든 항목을 입력해주세요.");
            return;
        }

        try {
            const response = await apiClient.patch('/booster/profile', formData);
            alert(response.data.message || "프로필이 성공적으로 수정되었습니다.");
            navigate('/mypage');
        } catch (error) {
            console.error("프로필 수정 실패:", error);
            if (error.response) {
                alert(`오류: ${error.response.data.message || '서버에서 오류가 발생했습니다.'}`);
            } else {
                alert("프로필 수정 중 오류가 발생했습니다. 네트워크 또는 서버 설정을 확인해주세요.");
            }
        }
    };

    return (
        <div className="total_ct">
            <section className="pf-edit-ct">
                <img onClick={() => navigate('/mypage')} src={Profileback} alt="back" />
                <p> 회원 정보 수정 </p>
                <div className="profile-dummy"></div>
            </section>
            <hr className="profile-hr"/>   
            
            <div className="pf-content-edit-ct">
                <section className="pf-name">
                    <label> 이름 </label>
                    <input name="nickname" value={formData.nickname} onChange={handleChange} />
                    <p> * 안전한 이용을 위해 실명을 사용해주세요.</p>
                </section>

                <section className="pf-gender">
                    <label> 성별 </label>
                    <div className="pf-gender-choose">
                        <button 
                            className={formData.gender === 'FEMALE' ? 'active' : ''}
                            onClick={() => setFormData(prev => ({ ...prev, gender: 'FEMALE' }))}
                        > 여성 </button>
                        <button 
                            className={formData.gender === 'MALE' ? 'active' : ''}
                            onClick={() => setFormData(prev => ({ ...prev, gender: 'MALE' }))}
                        > 남성 </button>
                    </div>
                </section>

                <section className="pf-std-num">
                    <label> 입학연도 </label>
                    <select id="student-num2" name="admissionYear" required value={formData.admissionYear} onChange={handleChange}>
                        <option value="" disabled hidden>선택하세요</option>
                        {Array.from({ length: new Date().getFullYear() - 2016 }, (_, i) => 2017 + i).map(year => (
                            <option key={year} value={year}>{year}학번</option>
                        ))}
                    </select>
                </section>

                <section className="pf-depart">
                    <label> 학부(학과)</label>
                    <select id="department2" name="department" value={formData.department} onChange={handleChange}>
                        <option value="" disabled hidden>선택하세요</option>
                        <option value="의료경영학과">의료경영학과</option>
                        <option value="첨단학부">첨단학부</option>
                        <option value="자연계열학부">자연계열학부</option>
                        <option value="인문사회계열학부">인문사회계열학부</option>
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
                </section>
            </div>
            
            <div className="ps-edit-button-ct">
                <button className="ps-edit-complete"> 수정 완료 </button>
            </div>
        </div>
    );
}

export default MyPgUser;
