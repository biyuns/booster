import {Board, Boon, Chat, Home, My_red, Mypagelogo, Mypagepwedit} from '../../img/img';
import '../../components/mypage/myPg.css'
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient'
import React, {useEffect, useState} from 'react';

function MyPg() {
    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        nickname: '테스트유저1',
        gender: 'MALE',
        admissionYear: 2021,
        department: '첨단학부',
        profileImageUrl: '', // 초기 프로필 이미지는 기본 로고를 사용하도록 비워둡니다.
    });
    
    const [isLoading, setIsLoading] = useState(true); 
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await apiClient.get('/booster/profile');
                setProfile(response.data); 
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
                            <img src={profile.profileImageUrl || Mypagelogo} alt="사용자이미지" />

                        </div>

                        <div className="user-info-ct">
                              {isLoading ? (
                                <p className="user-name">로딩 중...</p>
                            ) : (
                                <>
                                    <p className="user-name">{profile.nickname}</p>
                                    <p className="user-info">
                                        {profile.gender} / {profile.admissionYear} / {profile.department}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>

                    <button className="pf-edit-btn" onClick={() => navigate('/mypage/profileedit')}> 프로필 수정</button>
                </div>
            
            <section className="ps-logout-ct"> 
                <div className="mypg-password-ct">
                    <p> 회원 정보 수정</p>
                    <img src={Mypagepwedit} onClick={() => navigate('/mypage/userinfo')} alt="이동버튼"></img>
                </div>

                <div className="mypg-password-ct">
                    <p> 비밀번호 변경</p>
                    <img src={Mypagepwedit} onClick={() => navigate('/mypage/password')} alt="이동버튼"></img>
                </div>
                <p className="mypg-logout" onClick={handleLogout}> 로그아웃</p>
            </section>

        </section>

            <footer className="main-footer">
                    <img src={Home} onClick={() => navigate('/main')} alt="하단 내비게이션바"></img>
                    <img src={Board} onClick={() => navigate('/board')} alt="하단 내비게이션바"></img>
                    <img src={Chat} onClick={() => navigate('/chat')} alt="하단 내비게이션바"></img>
                    <img src={Boon} onClick={() => navigate('/boon')} alt="하단 내비게이션바"></img>
                    <img src={My_red} onClick={() => navigate('/mypage')}alt="하단 내비게이션바"></img>
            </footer>
    </div>
    )
}

export default MyPg;