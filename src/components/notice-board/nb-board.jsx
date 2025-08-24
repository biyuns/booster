// src/pages/notice-board/Nbboard.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import { Profileback, Nbstate, Geul1, Geul2, Geul3, Heart, Mypagelogo } from "../../img/img";
import '../../components/notice-board/nb-board.css';

// 날짜 형식을 MM/DD HH:mm으로 변환하는 헬퍼 함수
const formatPostTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${month}/${day} ${hours}:${minutes}`;
};

function Nbboard() {
    const navigate = useNavigate();
    // 1. URL에서 postId 파라미터 추출
    const { postId } = useParams();
    
    // 2. 게시글 데이터, 로딩, 에러 상태 관리
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // 3. postId가 변경될 때마다 API 호출
    useEffect(() => {
        if (!postId) {
            setError('게시글 ID가 유효하지 않습니다.');
            setIsLoading(false);
            return;
        }

        const fetchPost = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await apiClient.get(`/booster/posts/${postId}`);
                setPost(response.data);
            } catch (err) {
                console.error("상세 게시글 로딩 실패:", err);
                setError('게시글을 불러오는 데 실패했습니다.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchPost();
    }, [postId]);

    // 4. 로딩 및 에러 상태에 따른 UI 처리
    if (isLoading) {
        return <div className="loading-message">게시글을 불러오는 중...</div>;
    }
    if (error) {
        return <div className="error-message">{error}</div>;
    }
    if (!post) {
        return <div className="info-message">해당 게시글을 찾을 수 없습니다.</div>;
    }

    // 5. 받아온 데이터로 화면 렌더링
    return (
        <div className="total_ct">
            <section className="pf-edit-ct2">
                <img src={Profileback} alt="뒤로가기" onClick={() => navigate(-1)} />
                <p> {post.category} </p>
                <img src={Nbstate} alt="상태 아이콘" />
            </section>

            <section className="board-topct">
                <div className="boadr-imgname-ct">
                    <div className="bd-img">
                        {/* 익명이거나 프로필 이미지가 없으면 기본 로고 표시 */}
                        <img src={!post.is_anonymous && post.author_profile_image_url ? post.author_profile_image_url : Mypagelogo} alt="작성자 프로필" />
                    </div>
                    <div className="bd-name-month-ct">
                        {/* 익명이면 '익명', 아니면 'author_nickname' 표시 */}
                        <p>{post.is_anonymous ? '익명' : post.author_nickname}</p>
                        <p>{formatPostTime(post.create_post_time)}</p>
                    </div>
                </div>

                <div className="bd-title">
                    <p className="bd-title-main">{post.title}</p>
                    <p className="bd-title-sub">{post.content}</p>
                </div>

                {/* 첨부된 이미지가 있을 때만 이미지 섹션을 표시 */}
                {post.img_url && post.img_url.length > 0 && (
                    <div className="bd-img-total-ct">
                        {post.img_url.map((url, index) => (
                            <img key={index} src={url} alt={`첨부 이미지 ${index + 1}`} />
                        ))}
                    </div>
                )}

                <div className="bd-comment-heart-ct">
                    <div className="bd-comment-ct">
                        <img src={Geul3} alt="댓글 아이콘" />
                        <img src={Geul2} alt="" />
                        <img src={Geul1} alt="" />
                    </div>
                    {/* 댓글, 좋아요가 없을 경우 0으로 표시 */}
                    <p> {post.comment_count || 0} </p>
                    <img src={Heart} alt="공감 아이콘" style={{ fill: post.liked_by_current_user ? 'red' : 'gray' }} />
                    <p> {post.like_count || 0} </p>
                </div>
            </section>
            {/* 댓글 입력 및 목록 컴포넌트가 추가될 수 있는 위치 */}
        </div>
    );
}

export default Nbboard;
