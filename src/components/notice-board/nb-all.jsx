// src/pages/notice-board/Nball.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";
import { 
    Nbcategory2, Geul1, Geul2, Geul3, Heart, 
    Home, Board_red, Chat, Boon, My 
} from "../../img/img";
import '../notice-board/nb-category.css';

// 테스트용 임시 데이터
const MOCK_ALL_POSTS = {
    FREE: [
        { post_id: 101, user_id: null, title: "[자유] 임시 데이터 제목", content_preview: "자유게시판 임시 데이터 내용입니다.", intro_img_url: null, comment_count: 5, like_count: 10, category: "FREE", create_post_time: "2025-08-25T10:00:00" }
    ],
    PROMO: [
        { post_id: 201, user_id: 4, title: "[홍보] 임시 스터디 모집", content_preview: "같이 React 공부하실 분 구합니다!", intro_img_url: "https://booster-s3-bucket.s3.ap-northeast-2.amazonaws.com/5beae61d-b92a-41", comment_count: 8, like_count: 15, category: "PROMO", create_post_time: "2025-08-25T11:00:00" }
    ],
    INFO: [
        { post_id: 301, user_id: 5, title: "[정보] 도서관 이용 꿀팁", content_preview: "시험 기간에 1열람실 명당자리는 여기입니다. 아침 일찍 가야해요.", intro_img_url: null, comment_count: 12, like_count: 22, category: "INFO", create_post_time: "2025-08-24T18:00:00" }
    ],
    TMI: [
        { post_id: 401, user_id: 6, title: "[TMI] 오늘 점심은 학식", content_preview: "오늘 학식 돈까스였는데, 생각보다 맛있어서 놀랐습니다. 추천!", intro_img_url: null, comment_count: 3, like_count: 7, category: "TMI", create_post_time: "2025-08-25T12:30:00" }
    ]
};

function Nball() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // UI 테스트를 위해 임시 데이터를 즉시 로드합니다.
        // 실제 연동 시 이 부분을 주석 해제하고 아래 블록을 주석 처리하세요.
        
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const response = await apiClient.get('/booster/post/intro');
                const allPosts = Object.values(response.data).flat();
                allPosts.sort((a, b) => new Date(b.create_post_time) - new Date(a.create_post_time));
                setPosts(allPosts);
            } catch (error) {
                console.error("전체 게시판 데이터 로딩 실패. 임시 데이터를 사용합니다.", error);
                const mockAllPosts = Object.values(MOCK_ALL_POSTS).flat();
                mockAllPosts.sort((a, b) => new Date(b.create_post_time) - new Date(a.create_post_time));
                setPosts(mockAllPosts);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPosts();
        

        // --- UI 테스트용 코드 ---
    //     const mockAllPosts = Object.values(MOCK_ALL_POSTS).flat();
    //     mockAllPosts.sort((a, b) => new Date(b.create_post_time) - new Date(a.create_post_time));
    //     setPosts(mockAllPosts);
    //     setIsLoading(false);

     }, []);

    return (
        <div className="total_ct">
            <p className="main-title" onClick={() => navigate('/main')}> Booster </p>
            <section className="nb-category-ct">
                <div className="category-all">
                    <p style={{color : '#1D1B20'}}> 전체 </p>
                    <img src={Nbcategory2} alt="선택된 카테고리 밑줄"/>
                </div>
                <div className="category-free"><p onClick={() => navigate('/board/free')}> 자유 </p></div>
                <div className="category-promotion"><p onClick={() => navigate('/board/promotion')}> 홍보 </p></div>
                <div className="category-info"><p onClick={() => navigate('/board/info')}> 정보 </p></div>
                <div className="category-tmi"><p onClick={() => navigate('/board/tmi')}> TMI </p></div>
            </section>
            
            <hr className="nb-hr"/> 

            <section className="nb-contant-all-ct">
                {isLoading && <p>게시글을 불러오는 중...</p>}
                {!isLoading && posts.length === 0 && <p>등록된 게시글이 없습니다.</p>}
                {!isLoading && posts.map(post => (
                    <div key={post.post_id} className="nb-contant-ct">
                        <div className="nb-left-ct">
                            <p className="nb-left1">{post.title}</p>
                            <p className="nb-left2">{post.content_preview}</p>
                            <p className="nb-left3">{post.category}</p>
                        </div>
                        <div className="nb-right-all-ct">
                            <div className="nb-img-ct">
                                <img src={post.intro_img_url || '/images/img-boon/galbe.svg'} alt={`${post.title} 썸네일`} />
                            </div>
                            <div className="nb-right-ct">    
                                <div className="nb-comment-ct">
                                    <img src={Geul3} alt="댓글 아이콘" />
                                    <img src={Geul2} alt="" />
                                    <img src={Geul1} alt="" />
                                </div>
                                <p>{post.comment_count}</p>
                                <img src={Heart} alt="공감 아이콘" />
                                <p>{post.like_count || 0}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            <button className="nb-write-btn" onClick={() => navigate('/board/write')}> +글쓰기 </button>
            <footer className="main-footer">
                <img src={Home} alt="홈" onClick={() => navigate('/main')} />
                <img src={Board_red} alt="게시판" onClick={() => navigate('/board')} />
                <img src={Chat} alt="채팅" onClick={() => navigate('/chat')} />
                <img src={Boon} alt="혜택" onClick={() => navigate('/boon')} />
                <img src={My} alt="마이페이지" onClick={() => navigate('/mypage')} />
            </footer>
        </div>
    );
}

export default Nball;
