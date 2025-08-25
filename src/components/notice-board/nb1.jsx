// src/pages/notice-board/Nb1.jsx (수정 전용)

import React, { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Profileback, Nbpicture, Nbanonymous, Nbremovebtn } from "../../img/img";
import "../../components/notice-board/nb-write.css"; // 기존 CSS 재활용
import apiClient from "../../api/apiClient";

const MAX_IMAGES = 5;

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
    const fileInputRef = useRef(null);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState(""); // ✨ 수정 가능하도록 변경
    const [category, setCategory] = useState("");
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // ✨ 이미지 관련 상태 추가
    const [existingImageUrls, setExistingImageUrls] = useState([]);
    const [newImageFiles, setNewImageFiles] = useState([]);

    const initialData = location.state?.post;

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || "");
            setContent(initialData.content || "");
            setCategory(initialData.category || "");
            setIsAnonymous(initialData.is_anonymous || false);
            setExistingImageUrls(initialData.img_url || []); // 기존 이미지 URL 설정
        } else {
            alert("수정할 게시글 정보가 없습니다. 잘못된 접근입니다.");
            navigate(`/board/${postId}`, { replace: true });
        }
    }, [initialData, postId, navigate]);

    // ✨ 이미지 미리보기 로직 추가
    const previewUrls = useMemo(() => {
        const newPreviews = newImageFiles.map(file => URL.createObjectURL(file));
        return [...existingImageUrls, ...newPreviews];
    }, [existingImageUrls, newImageFiles]);

    const totalImageCount = existingImageUrls.length + newImageFiles.length;
    const canSubmit = useMemo(() => title.trim() && content.trim() && !isSubmitting, [title, content, isSubmitting]);

    // ✨ 이미지 관련 핸들러 함수 추가
    const handleClickAddImage = () => {
        if (totalImageCount >= MAX_IMAGES) return alert(`이미지는 최대 ${MAX_IMAGES}장까지만 추가할 수 있습니다.`);
        fileInputRef.current?.click();
    };

    const handleChangeFiles = (e) => {
        const files = Array.from(e.target.files || []);
        const availableSlots = MAX_IMAGES - totalImageCount;
        if (files.length > availableSlots) {
            alert(`최대 ${availableSlots}장까지만 더 추가할 수 있습니다.`);
        }
        setNewImageFiles(prev => [...prev, ...files.slice(0, availableSlots)]);
        e.target.value = '';
    };

    const handleRemoveImage = (indexToRemove) => {
        if (indexToRemove < existingImageUrls.length) {
            setExistingImageUrls(prev => prev.filter((_, index) => index !== indexToRemove));
        } else {
            const newFileIndex = indexToRemove - existingImageUrls.length;
            setNewImageFiles(prev => prev.filter((_, index) => index !== newFileIndex));
        }
    };

    // ✨ handleSubmit 함수에 이미지 업로드 및 content 필드 추가
    const handleSubmit = async () => {
        if (!canSubmit) return;
        setIsSubmitting(true);

        try {
            // 1. 새로 추가된 이미지가 있으면 서버에 업로드
            let uploadedImageUrls = [];
            if (newImageFiles.length > 0) {
                const imageFormData = new FormData();
                newImageFiles.forEach(file => imageFormData.append('upload', file));
                const response = await apiClient.post('/booster/image/upload', imageFormData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                uploadedImageUrls = response.data.imgUrls || [];
            }

            // 2. 최종 이미지 URL 목록 생성
            const finalImageUrls = [...existingImageUrls, ...uploadedImageUrls];
            const introImgUrl = finalImageUrls.length > 0 ? finalImageUrls[0] : null;

            // 3. API에 보낼 요청 본문 생성
            // 🚨 중요: 백엔드 API가 아래 필드들을 모두 받을 수 있도록 수정되어야 합니다.
            const requestBody = { 
                title: title.trim(), 
                content: content.trim(), // 본문 추가
                isAnonymous,
                introImgUrl, // 대표 이미지 URL 추가
                imgUrls: finalImageUrls, // 전체 이미지 URL 목록 추가
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

    if (!initialData) {
        return null; // 데이터가 없으면 렌더링하지 않음
    }

    return (
        <div className="total_ct">
            <section className="pf-edit-ct">
                <img src={Profileback} alt="뒤로가기" onClick={() => navigate(-1)} />
                <p>게시글 수정</p>
                <div className="profile-dummy"></div>
            </section>
            <hr className="profile-hr" />

            <section className="np-add-total-ct">
                <div className="nb-add-img-ct">
                    <div className="nb-picture-add-ct" onClick={handleClickAddImage}>
                        <button type="button"><img src={Nbpicture} alt="사진 추가 아이콘" /></button>
                        <p> 사진 추가</p>
                    </div>
                    {previewUrls.map((url, index) => (
                         <div className="nb-add-img" key={index}>
                             <img src={url} alt={`첨부 이미지 ${index + 1}`} />
                             <div className="nb-img-remove" onClick={() => handleRemoveImage(index)}>
                                 <img src={Nbremovebtn} alt="이미지 삭제" />
                             </div>
                         </div>
                     ))}
                </div>
                <p>{totalImageCount}/{MAX_IMAGES}개</p>
                <input type="file" ref={fileInputRef} multiple accept="image/*" style={{ display: 'none' }} onChange={handleChangeFiles} />
            </section>
            
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
                {/* ✨ disabled 속성 제거 */}
                <textarea id="nb-write-textarea" placeholder="Booster에서 자유롭게 얘기해보세요." value={content} onChange={(e) => setContent(e.target.value)} />
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
