import '../../components/mypage/myPgUser.css';
import { Profileback } from '../../img/img';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';

function MyPgUser() {
    const navigate = useNavigate();

    // 입력 폼 데이터를 관리하는 상태
    const [formData, setFormData] = useState({
        nickname: '',
        gender: '',
        admissionYear: '',
        department: '',
    });

    // 페이지가 처음 로드될 때, 현재 프로필 정보를 불러오는 로직
    useEffect(() => {
        const fetchCurrentProfile = async () => {
            try {
                const response = await apiClient.get('/booster/profile');
                setFormData(response.data); // 성공 시 서버 데이터로 폼을 채움
            } catch (error) {
                console.error("기존 프로필 정보를 불러오는 데 실패했습니다.", error);
                alert("프로필 정보를 불러오지 못했습니다. 이전 페이지로 돌아갑니다.");
                navigate(-1); // 에러 발생 시 이전 페이지로 이동
            }
        };
        fetchCurrentProfile();
    // 의존성 배열을 비워두어, 컴포넌트가 처음 마운트될 때 한 번만 실행되도록 함
    }, []);

    // 입력 필드(input, select)의 값이 바뀔 때마다 formData 상태를 업데이트
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
            // [중요] 이 요청이 성공하려면 백엔드에서 PATCH 메서드를 허용해야 합니다.
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
                        <option value="2017">2017학번</option>
                        <option value="2018">2018학번</option>
                        <option value="2019">2019학번</option>
                        <option value="2020">2020학번</option>
                        <option value="2021">2021학번</option>
                        <option value="2022">2022학번</option>
                        <option value="2023">2023학번</option>
                        <option value="2024">2024학번</option>
                        <option value="2025">2025학번</option>
                                                {Array.from({ length: new Date().getFullYear() - 2016 }, (_, i) => 2017 + i).map(year => (
                            <option key={year} value={year}>{year}학번</option>
                                                ))}
                    </select>
                </section>

                <section className="pf-depart">
                    <label> 학부(학과)</label>

                 <select id="department2" name="department" value={formData.department}
                        onChange={handleChange}>
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
                <button className="ps-edit-complete" onClick={handleSubmit}> 
                    수정 완료 
                </button>
            </div>
        </div>
    )
}

export default MyPgUser;