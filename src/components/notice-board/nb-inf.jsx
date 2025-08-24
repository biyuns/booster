// src/pages/notice-board/Ninf.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";
import { Nbcategory2, Geul1, Geul2, Geul3, Heart, Home, Board_red, Chat, Boon, My } from "../../img/img";
import '../notice-board/nb-category.css';

function Ninf() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const response = await apiClient.get('/booster/post/intro/category/INFO');
                response.data.sort((a, b) => new Date(b.create_post_time) - new Date(a.create_post_time));
                setPosts(response.data);
            } catch (error) {
                console.error("정보 게시판 데이터 로딩 실패:", error);
                setPosts([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const handlePostClick = (postId) => {
        navigate(`/board/${postId}`);
    };

    return (
        <div className="total_ct">
            <p className="main-title" onClick={() => navigate('/main')}> Booster </p>
            <section className="nb-category-ct">
                 {/* ... 카테고리 UI ... */}
            </section>
            <hr className="nb-hr"/>

            <section className="nb-contant-all-ct">
                {isLoading && <p>게시글을 불러오는 중...</p>}
                {!isLoading && posts.length === 0 && <p>등록된 게시글이 없습니다.</p>}
                {!isLoading && posts.map(post => (
                    <div 
                        key={post.post_id} 
                        className="nb-contant-ct" 
                        onClick={() => handlePostClick(post.post_id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="nb-left-ct">
                            <p className="nb-left1">{post.title}</p>
                            <p className="nb-left2">{post.content_preview}</p>
                            <p className="nb-left4">{new Date(post.create_post_time).toLocaleString()}</p>
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
            {/* ... 하단 푸터 ... */}
        </div>
    );
}

export default Ninf;
