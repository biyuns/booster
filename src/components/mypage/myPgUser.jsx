import '../../components/mypage/myPgUser.css';
import { Profileback, Profileremove, Mypagelogo } from '../../img/img';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';
function MyPgUser() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nickname: '기존 닉네임',
        gender: 'MALE',
        admissionYear: '2021',
        department: '첨단학부',
    });

    useEffect(() => {
        const fetchCurrentProfile = async () => {
            try {
                const response = await apiClient.get('/booster/profile');
                setFormData(response.data); // 성공 시 실제 데이터로 교체
            } catch (error) {
                console.error("기존 프로필 정보를 불러오는 데 실패했습니다. 테스트 데이터로 UI를 확인합니다.", error);
                // 실패 시에는 아무것도 하지 않아, useState의 초기 테스트 값이 그대로 유지됩니다.
            }
        };

        fetchCurrentProfile();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // '수정 완료' 버튼 클릭 시, PATCH 요청을 보내는 핸들러
    const handleSubmit = async () => {
        if (!formData.nickname || !formData.gender || !formData.admissionYear || !formData.department) {
            alert("모든 항목을 입력해주세요.");
            return;
        }

        try {
            // --- 이 부분을 .put()에서 .patch()로 변경합니다 ---
            const response = await apiClient.patch('/booster/profile', formData);
            
            alert(response.data.message || "프로필이 성공적으로 수정되었습니다.");
            navigate('/mypage');

        } catch (error) {
            console.error("프로필 수정 실패:", error);
            alert("프로필 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };


    return (
        <div className="total_ct">
                        <section className="pf-edit-ct">
                            <img onClick={() => navigate('/mypage')}src={Profileback} alt="back"></img>
                            <p> 회원 정보 수정 </p>
                            <div class="profile-dummy"></div>
                        </section>

                        <hr className="profile-hr"/>   
                
            <div className="pf-content-edit-ct">

                <secion className="pf-name">
                    <label> 이름 </label>
                                        <input
                        name="nickname"
                        value={formData.nickname}
                        onChange={handleChange}
                    />
                    <p> * 안전한 이용을 위해 실명을 사용해주세요.</p>
                
                </secion>

                <section className="pf-gender">
                    <label> 성별 </label>
                    <div className="pf-gender-choose">
                        <button 
                            className={formData.gender === 'FEMALE' ? 'active' : ''}
                            onClick={() => setFormData(prev => ({ ...prev, gender: 'FEMALE' }))}
                        > 
                            여성 
                        </button>
                        <button 
                            className={formData.gender === 'MALE' ? 'active' : ''}
                            onClick={() => setFormData(prev => ({ ...prev, gender: 'MALE' }))}
                        > 
                            남성 
                        </button>

                    </div>
                </section>

                <section className="pf-std-num">
                    <label> 입학연도 </label>
                                        <input
                        type="number"
                        name="admissionYear"
                        value={formData.admissionYear}
                        onChange={handleChange}
                    />
                </section>

                <section className="pf-depart">
                    <label> 학부(학과)</label>
                                        <input
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                    />
                </section>

            </div>

                        <div className="ps-edit-button-ct">
                <button className="ps-edit-complete" onClick={handleSubmit}> 
                    수정 완료 
                </button>
            </div>
        </div>
    )
}

export default MyPgUser;