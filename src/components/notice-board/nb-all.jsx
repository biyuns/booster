// src/pages/notice-board/Nball.js

import React, { useState, useEffect } from "react";
// 1. useNavigate를 import 합니다.
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";
import { 
    Nbcategory2, Geul1, Geul2, Geul3, Heart, 
    Home, Board_red, Chat, Boon, My 
} from "../../img/img";
import '../notice-board/nb-category.css';

function Nball() {
    // 2. navigate 함수를 사용할 수 있도록 초기화합니다.
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const response = await apiClient.get('/booster/post/intro');
                const allPosts = Object.values(response.data).flat();
                allPosts.sort((a, b) => new Date(b.create_post_time) - new Date(a.create_post_time));
                setPosts(allPosts);
            } catch (error) {
                console.error("전체 게시판 데이터 로딩 실패:", error);
                // API 실패 시 목업 데이터를 사용하지 않으려면 빈 배열로 설정
                setPosts([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, []);

    // 3. handlePostClick 함수를 useEffect 밖으로 꺼냅니다.
    const handlePostClick = (postId) => {
        // App.js에 정의해둔 상세 페이지 경로로 이동시킵니다.
        navigate(`/board/${postId}`);
    };

    return (
        <div className="total_ct">
            <p className="main-title" onClick={() => navigate('/main')}> Booster </p>
            <section className="nb-category-ct">
                {/* ... 카테고리 링크들 ... */}
            </section>
            
            <hr className="nb-hr"/> 

            <section className="nb-contant-all-ct">
                {isLoading && <p>게시글을 불러오는 중...</p>}
                {!isLoading && posts.length === 0 && <p>등록된 게시글이 없습니다.</p>}
                
                {!isLoading && posts.map(post => (
                    // 4. 각 게시글을 감싸는 div에 onClick 이벤트를 추가합니다.
                    <div 
                        key={post.post_id} 
                        className="nb-contant-ct" 
                        onClick={() => handlePostClick(post.post_id)}
                        style={{ cursor: 'pointer' }}
                    >
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
                                    <img src={Geul3} alt="댓글 아이콘" /><img src={Geul2} alt="" /><img src={Geul1} alt="" />
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
                {/* ... 푸터 아이콘들 ... */}
            </footer>
        </div>
    );
}

export default Nball;
