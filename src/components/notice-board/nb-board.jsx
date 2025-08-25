// src/pages/notice-board/Nbboard.jsx

import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient';

import {
    Profileback, Nbstate, Nbgeul1, Nbgeul2, Nbgeul3, Nbheart,
    Nbline, Nbcheck, Nbsubmit, NbCommentlogo
} from "../../img/img";
import '../../components/notice-board/nb-board.css';
import MypgRemoveModal from '../../components/modal/MypgRemoveModal';

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
    const { postId } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [isAnonymousComment, setIsAnonymousComment] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState({ type: null, id: null });
    const menuRef = useRef(null);

    // ✨ 1. 로컬 스토리지에 저장된 사용자 ID를 가져오는 함수 (그대로 유지)
    const getCurrentUserId = () => {
        const userIdFromStorage = localStorage.getItem('user_id'); 
        if (!userIdFromStorage) {
            return null;
        }
        return parseInt(userIdFromStorage, 10);
    };

    useEffect(() => {
        const fetchPostAndComments = async () => {
            setIsLoading(true);
            setError(null);
            
            if (!postId) {
                setError('잘못된 접근입니다.');
                setIsLoading(false);
                return;
            }

            try {
                const [postResponse, commentsResponse] = await Promise.all([
                    apiClient.get(`/booster/${postId}`),
                    apiClient.get(`/booster/${postId}/comments`)
                ]);

                const postData = postResponse.data;

                // --- ✨ 2. API 응답에서 author_id를 로컬 스토리지에 저장하는 로직 추가 ---
                if (postData && postData.author_id) {
                    localStorage.setItem('author_id', postData.author_id);
                    console.log(`[저장 완료] 로컬 스토리지에 author_id (${postData.author_id}) 를 저장했습니다.`);
                } else {
                    console.warn("[저장 실패] API 응답에 author_id가 없거나 유효하지 않습니다.");
                }

                // --- 3. 내가 쓴 글인지 판단하는 로직 (기존 로직 유지) ---
                const currentUserId = getCurrentUserId();
                const isPostAuthor = currentUserId === postData.author_id;
                setPost({ ...postData, is_author: isPostAuthor });

                const commentsData = commentsResponse.data || [];
                const processedComments = commentsData.map(comment => {
                    const isCommentAuthor = currentUserId === comment.author_id;
                    return { ...comment, is_author: isCommentAuthor };
                });
                setComments(processedComments);

            } catch (err) {
                console.error("데이터 로딩 실패:", err);
                setError(err.response?.status === 403 ? "게시글을 볼 권한이 없습니다." : "데이터를 불러오는 데 실패했습니다.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchPostAndComments();
    }, [postId]);

    const fetchComments = async () => {
        try {
            const response = await apiClient.get(`/booster/${postId}/comments`);
            const currentUserId = getCurrentUserId();
            const processedComments = (response.data || []).map(comment => ({
                ...comment,
                is_author: currentUserId === comment.author_id
            }));
            setComments(processedComments);
        } catch (err) {
            console.error("댓글 로딩 실패:", err);
        }
    };
    
    // ... (이하 다른 함수들은 이전과 동일)
    const handleEdit = () => { setIsMenuOpen(false); navigate(`/board/edit/${postId}`, { state: { post } }); };
    const openDeleteModal = (type, id) => { setItemToDelete({ type, id }); setIsMenuOpen(false); setIsDeleteModalOpen(true); };
    const closeDeleteModal = () => { setIsDeleteModalOpen(false); setItemToDelete({ type: null, id: null }); };
    const confirmDelete = async () => {
        const { type, id } = itemToDelete;
        const url = type === 'post' ? `/booster/delete/${id}` : `/booster/${postId}/comments/${id}`;
        try {
            await apiClient.delete(url);
            alert('삭제되었습니다.');
            if (type === 'post') { navigate('/board'); } else { fetchComments(); }
        } catch (err) { alert('삭제에 실패했습니다.'); } finally { closeDeleteModal(); }
    };
    const handleCommentSubmit = async () => {
        if (!newComment.trim()) return alert("댓글 내용을 입력해주세요.");
        try {
            const payload = { content: newComment, isAnonymous: isAnonymousComment };
            await apiClient.post(`/booster/${postId}/comments`, payload);
            setNewComment(""); setIsAnonymousComment(false); fetchComments();
        } catch (err) { alert("댓글 작성에 실패했습니다."); }
    };
    const handleLikeToggle = async () => {
        if (!post) return;
        try {
            const response = await apiClient.post(`/booster/${post.post_id}/like`);
            const { like_count, liked_by_current_user } = response.data;
            setPost(currentPost => ({ 
                ...currentPost, 
                like_count: like_count,
                liked_by_current_user: liked_by_current_user 
            }));
        } catch (error) { alert("좋아요 처리에 실패했습니다."); }
    };

    useEffect(() => {
        const handleClickOutside = (event) => { if (menuRef.current && !menuRef.current.contains(event.target)) setIsMenuOpen(false); };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    if (isLoading) return <div className="loading-message">로딩 중...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!post) return <div className="info-message">게시글을 찾을 수 없습니다.</div>;

                if (response.data.accessToken) {
                // 로컬 스토리지에 사용자 정보 저장
                localStorage.setItem('token', response.data.accessToken);
                localStorage.setItem('userId', response.data.userId.toString()); // 🔥 userId 저장
                localStorage.setItem('nickname', response.data.nickname);

                console.log('로그인 성공! 저장된 정보:');
                console.log('Token:', response.data.accessToken);
                console.log('User ID:', response.data.userId);
                console.log('Nickname:', response.data.nickname);

                alert('로그인 성공!');
                navigate('/home');
            }
        } catch (error) {
            console.error('로그인 실패:', error);
            alert('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
        }
    };

    return (
        <>
            <div className="total_ct">
                <section className="nb-top-ct">
                    <img src={Profileback} alt="뒤로가기" onClick={() => navigate(-1)} />
                    <p>{post.category}</p>
                    {post.is_author && (
                        <div className="nb-menu-container" ref={menuRef}>
                            <img src={Nbstate} alt="메뉴 열기" onClick={() => setIsMenuOpen(!isMenuOpen)} />
                            {isMenuOpen && (
                                <div className="nb-menu-dropdown">
                                    <button onClick={handleEdit}>수정</button>
                                    <button onClick={() => openDeleteModal('post', post.post_id)}>삭제</button>
                                </div>
                            )}
                        </div>
                    )}
                </section>
                <div className="nb2-board-top-ct">
                    <div className="nb2-top-img-ct">
                        <img src={post.is_anonymous ? NbCommentlogo : (post.intro_img_url || NbCommentlogo)} alt="프로필 사진"/>
                    </div>
                    <div className="nb2-name-time">
                        <p className="nb2-name">{post.is_anonymous ? '익명' : post.author_nickname}</p>
                        <p className="nb2-time">{formatPostTime(post.create_post_time)}</p>
                    </div>
                </div>

                <p className="nb2-title">{post.title}</p>
                <p className="nb2-contant">{post.content}</p>
                
                {post.img_url && post.img_url.length > 0 && (
                    <div className="nb2-user-push-img-ct">
                        {post.img_url.map((url, index) => <div className="nb2-user-img" key={index}><img src={url} alt={`첨부 이미지 ${index + 1}`} /></div>)}
                    </div>
                )}

                <section className="nb2-dat-heart">
                    <div className="nb2-comment-total-ct">
                        <div className="nb2-coment-ct">
                            <img src={Nbgeul1} alt="댓글 아이콘"/><img src={Nbgeul2} alt=""/><img src={Nbgeul3} alt=""/>
                        </div>
                        <p>{post.comment_count || comments.length || 0}</p>
                    </div>
                    <div className="nb2-heart-ct" onClick={handleLikeToggle} style={{cursor: 'pointer'}}>
                        <img src={Nbheart} alt="하트"/>
                        <p>{post.like_count || 0}</p>
                    </div>
                </section>
                <div className="nb2-line"></div>
                <section className="user-comment-total-ct">
                    {comments.map(comment => (
                        <div key={comment.comment_id}>
                            <div className="user-comment-ct">
                                <div className="user-img-ct">
                                    <img src={NbCommentlogo} alt="댓글 작성자 이미지"/>
                                </div>
                                <div className="user-name-time-ct">
                                    <p className="user-name3">{comment.is_anonymous ? '익명' : comment.author_nickname}</p>
                                    <p className="user-time3">{formatPostTime(comment.create_post_time)}</p>
                                </div>
                                {comment.is_author && (
                                    <div className="comment-delete-button-container">
                                        <button onClick={() => openDeleteModal('comment', comment.comment_id)}>삭제</button>
                                    </div>
                                )}
                            </div>
                            <p className="user-content3">{comment.content}</p>
                            <img className="nb2-line2" src={Nbline} alt="구분선"/>
                        </div>
                    ))}
                    <div className="user-input-comment-ct">
                        <div className="user-input-ct">
                            <input type="text" placeholder="댓글을 입력하세요." value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                            <div className="nb2-e-ct" onClick={() => setIsAnonymousComment(!isAnonymousComment)}>
                                <div className="nb2-anoymouse-check-ct">
                                    <img src={Nbcheck} alt="익명체크" style={{ opacity: isAnonymousComment ? 1 : 0.5 }}/>
                                </div>
                                <p className="nb2-e"> 익명 </p>
                            </div>
                            <div className="nb2-submit-ct" onClick={handleCommentSubmit}><img src={Nbsubmit} alt="전송버튼"/></div>
                        </div>
                    </div>
                </section>
            </div>
            {isDeleteModalOpen && (
                <MypgRemoveModal 
                    onClose={closeDeleteModal}
                    onConfirm={confirmDelete}
                />
            )}
        </>
    );
}

export default Nbboard;
