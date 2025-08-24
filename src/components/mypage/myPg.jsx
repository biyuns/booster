// src/pages/mypage/MyPg.js

import { Board, Boon, Chat, Home, My_red, Mypagelogo, Mypagepwedit } from '../../img/img';
import '../../components/mypage/myPg.css';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import React, { useEffect, useState } from 'react';

function MyPg() {
    const navigate = useNavigate();

    // 1. 서버 원본 데이터를 저장할 상태
    const [profile, setProfile] = useState(null); 
    // 2. 화면에 표시할 가공된 성별 데이터를 저장할 상태
    const [displayGender, setDisplayGender] = useState('');
    
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await apiClient.get('/booster/profile');
                const profileData = response.data;
                setProfile(profileData);

                // --- 3. 성별 데이터 변환 로직 ---
                if (profileData.gender === 'MALE') {
                    setDisplayGender('남자');
                } else if (profileData.gender === 'FEMALE') {
                    setDisplayGender('여자');
                } else {
                    setDisplayGender(''); // 그 외의 경우 (값이 없거나 다른 값일 때)
                }

            } catch (error) {
                console.error("프로필 정보를 가져오는 데 실패했습니다.", error);
            } finally {
                setIsLoading(false); 
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = async () => {
        if (window.confirm("정말 로그아웃 하시겠습니까?")) {
            try {
                await apiClient.post('/booster/logout');
                console.log("서버 로그아웃 성공");
            } catch (error) {
                console.error("로그아웃 API 호출 실패:", error);
            } finally {
                localStorage.removeItem('accessToken');
                alert("로그아웃 되었습니다.");
                navigate('/login'); 
            }
        }
    };

    return (
        <div className="total_ct">
            <p className="main-title" onClick={() => navigate('/main')}> Booster </p>

            <section className="mypg-ct">
                <div className="user-ct">
                    <div className="user-top-ct">
                        <div className="user-image-ct">
                            {/* profile.profileImageUrl이 없거나 비어있으면 Mypagelogo를 기본값으로 사용 */}
                            <img src={profile?.profileImageUrl || Mypagelogo} alt="사용자이미지" />
                        </div>

                        <div className="user-info-ct">
                            {isLoading ? (
                                <p className="user-name">로딩 중...</p>
                            ) : profile ? ( // profile 데이터가 성공적으로 로드되었는지 확인
                                <>
                                    <p className="user-name">{profile.nickname}</p>
                                    <p className="user-info">
                                        {/* 4. 변환된 성별(displayGender)을 화면에 표시 */}
                                        {displayGender} / {profile.admissionYear} / {profile.department}
                                    </p>
                                </>
                            ) : (
                                <p>프로필 정보를 불러올 수 없습니다.</p> // 에러 또는 데이터 없음
                            )}
                        </div>
                    </div>
                    <button className="pf-edit-btn" onClick={() => navigate('/mypage/profileedit')}> 프로필 수정</button>
                </div>
            
                <section className="ps-logout-ct"> 
                    <div className="mypg-password-ct">
                        <p> 회원 정보 수정</p>
                        <img src={Mypagepwedit} onClick={() => navigate('/mypage/userinfo')} alt="이동버튼" />
                    </div>
                    <div className="mypg-password-ct">
                        <p> 비밀번호 변경</p>
                        <img src={Mypagepwedit} onClick={() => navigate('/mypage/password')} alt="이동버튼" />
                    </div>
                    <p className="mypg-logout" onClick={handleLogout}> 로그아웃</p>
                </section>
            </section>

            <footer className="main-footer">
                <img src={Home} onClick={() => navigate('/main')} alt="하단 내비게이션바" />
                <img src={Board} onClick={() => navigate('/board')} alt="하단 내비게이션바" />
                <img src={Chat} onClick={() => navigate('/chat')} alt="하단 내비게이션바" />
                <img src={Boon} onClick={() => navigate('/boon')} alt="하단 내비게이션바" />
                <img src={My_red} onClick={() => navigate('/mypage')}alt="하단 내비게이션바" />
            </footer>
        </div>
    );
}

export default MyPg;
