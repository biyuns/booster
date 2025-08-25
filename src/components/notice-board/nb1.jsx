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
    const navigate = useNavigate();
    const { postId } = useParams();
    const location = useLocation();

    // Nbboard에서 전달받은 post 데이터로 초기 상태 설정
    const initialData = location.state?.post;

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 컴포넌트 마운트 시, 전달받은 데이터로 상태 초기화
    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || "");
            setContent(initialData.content || "");
            setCategory(initialData.category || "");
            setIsAnonymous(initialData.is_anonymous || false);
        } else {
            // 데이터 없이 페이지에 직접 접근한 경우, 상세 페이지로 리디렉션
            console.error("수정할 게시글 정보가 없습니다.");
            alert("잘못된 접근입니다.");
            navigate(`/board/${postId}`);
        }
    }, [initialData, postId, navigate]);

    // 수정 시에는 제목과 익명 여부만 활성화
    const canSubmit = useMemo(() => title.trim() && !isSubmitting, [title, isSubmitting]);

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

    return (
        <div className="total_ct">
            <section className="pf-edit-ct">
                <img src={Profileback} alt="뒤로가기" onClick={() => navigate(-1)} />
                <p>게시글 수정</p>
                <div className="profile-dummy"></div>
            </section>
            <hr className="profile-hr" />

            {/* 수정 모드에서는 카테고리, 본문, 이미지 변경 불가 (API 명세에 따름) */}
            <section className="nb-category-choose-ct">
                <label>카테고리</label>
                <select className="nb-write-select" value={category} disabled>
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
