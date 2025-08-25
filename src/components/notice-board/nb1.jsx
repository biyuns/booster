// src/pages/notice-board/Nb1.jsx (수정 전용)

import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Profileback, Nbanonymous } from "../../img/img";
import "../../components/notice-board/nb-write.css"; // 기존 CSS 재활용
import apiClient from "../../api/apiClient";

const CATEGORY_OPTIONS = [
    { value: 'FREE',  label: '자유' },
    { value: 'PROMO', label: '홍보' },
    { value: 'INFO',  label: '정보' },
    { value: 'TMI',   label: 'TMI' },
];

function Nb1() {
    // ✨ 1. 모든 훅(Hook)을 컴포넌트 최상단에 조건 없이 호출합니다.
    const navigate = useNavigate();
    const { postId } = useParams();
    const location = useLocation();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const initialData = location.state?.post;
    const canSubmit = useMemo(() => title.trim() && !isSubmitting, [title, isSubmitting]);

    // ✨ 2. 데이터 유무 확인 및 상태 초기화는 useEffect 안에서 처리합니다.
    useEffect(() => {
        if (initialData) {
            // 데이터가 있으면 상태를 업데이트합니다.
            setTitle(initialData.title || "");
            setContent(initialData.content || "");
            setCategory(initialData.category || "");
            setIsAnonymous(initialData.is_anonymous || false);
        } else {
            // 데이터가 없으면 경고 후 이전 페이지로 돌려보냅니다.
            alert("수정할 게시글 정보가 없습니다. 잘못된 접근입니다.");
            navigate(`/board/${postId}`, { replace: true });
        }
    }, [initialData, postId, navigate]);

    const handleSubmit = async () => {
        if (!canSubmit) return;
        setIsSubmitting(true);

        try {
            const requestBody = { 
                title: title.trim(), 
                isAnonymous 
            };
            await apiClient.patch(`/booster/edit/${postId}`, requestBody);
            alert('게시글이 성공적으로 수정되었습니다.');
            navigate(`/board/${postId}`, { replace: true });
        } catch (error) {
            console.error('게시글 수정 실패:', error);
            alert(error.response?.data?.message || '게시글 수정 중 오류가 발생했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // ✨ 3. 데이터가 아직 없는 초기 렌더링 시에는 아무것도 보여주지 않아 오류를 방지합니다.
    if (!initialData) {
        return null;
    }

    // --- 여기부터는 initialData가 존재함이 보장됩니다. ---
    return (
        <div className="total_ct">
            <section className="pf-edit-ct">
                <img src={Profileback} alt="뒤로가기" onClick={() => navigate(-1)} />
                <p>게시글 수정</p>
                <div className="profile-dummy"></div>
            </section>
            <hr className="profile-hr" />

            <section className="nb-category-choose-ct">
                <label>카테고리</label>
                <select className="nb-write-select" value={category} disabled>
                    <option value="" disabled>카테고리</option>
                    {CATEGORY_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
            </section>
            
            <section className="nb-write-title-ct">
                <label>제목</label>
                <input className="nb-write-input" placeholder="게시글의 제목을 입력해주세요." value={title} onChange={(e) => setTitle(e.target.value)} />
            </section>
            
            <section className="nb-write-contant-ct">
                <label>본문</label>
                <textarea id="nb-write-textarea" value={content} disabled />
            </section>

            <div className="nb-write-anonymous" onClick={() => setIsAnonymous(prev => !prev)}>
                <button type="button"><img src={Nbanonymous} alt="익명 아이콘" /></button>
                <p>익명</p>
            </div>

            <div className="nb-btn-ct">
                <button className="nb-write-complete-btn" onClick={handleSubmit} disabled={!canSubmit}>
                    {isSubmitting ? '처리 중...' : '수정완료'}
                </button>
            </div>
        </div>
    );
}

export default Nb1;
