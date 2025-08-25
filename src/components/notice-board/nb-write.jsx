// src/pages/notice-board/Nbwrite.jsx (작성 전용)

import React, { useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Profileback, Nbpicture, Nbanonymous, Nbremovebtn } from "../../img/img";
import "../../components/notice-board/nb-write.css";
import apiClient from "../../api/apiClient";

const MAX_IMAGES = 5;
const CATEGORY_OPTIONS = [
    { value: 'FREE',  label: '자유' },
    { value: 'PROMO', label: '홍보' },
    { value: 'INFO',  label: '정보' },
    { value: 'TMI',   label: 'TMI' },
];

function Nbwrite() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [isAnonymous, setIsAnonymous] = useState(false); // 익명 상태
    const [imageFiles, setImageFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const previewUrls = useMemo(() => {
        return imageFiles.map(file => URL.createObjectURL(file));
    }, [imageFiles]);

    const canSubmit = useMemo(() => category && title.trim() && content.trim() && !isSubmitting, [category, title, content, isSubmitting]);

    const handleClickAddImage = () => {
        if (imageFiles.length >= MAX_IMAGES) return alert(`이미지는 최대 ${MAX_IMAGES}장까지만 추가할 수 있습니다.`);
        fileInputRef.current?.click();
    };

    const handleChangeFiles = (e) => {
        const files = Array.from(e.target.files || []);
        const availableSlots = MAX_IMAGES - imageFiles.length;
        if (files.length > availableSlots) {
            alert(`최대 ${availableSlots}장까지만 더 추가할 수 있습니다.`);
        }
        setImageFiles(prev => [...prev, ...files.slice(0, availableSlots)]);
        e.target.value = '';
    };

    const handleRemoveImage = (indexToRemove) => {
        setImageFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = async () => {
        if (!canSubmit) return;
        setIsSubmitting(true);

        try {
            let uploadedImageUrls = [];
            if (imageFiles.length > 0) {
                const imageFormData = new FormData();
                imageFiles.forEach(file => imageFormData.append('upload', file));
                const response = await apiClient.post('/booster/image/upload', imageFormData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                uploadedImageUrls = response.data.imgUrls || [];
            }

            const introImgUrl = uploadedImageUrls.length > 0 ? uploadedImageUrls[0] : null;

            const requestBody = {
                title: title.trim(),
                content: content.trim(),
                category,
                isAnonymous,
                introImgUrl,
                imgUrls: uploadedImageUrls,
            };
            const response = await apiClient.post('/booster/create', requestBody);
            alert('게시글이 성공적으로 등록되었습니다.');
            navigate(`/board/${response.data.post_id}`);
        } catch (error) {
            console.error('게시글 작성 실패:', error);
            alert(error.response?.data?.message || '게시글 작성 중 오류가 발생했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // ✨ 1. 익명 상태에 따라 색상을 결정하는 변수
    const anonymousColor = isAnonymous ? '#FF4500' : '#000000'; // 활성화 색상 : 기본 색상

    return (
        <div className="total_ct">
            <section className="pf-edit-ct">
                <img src={Profileback} alt="뒤로가기" onClick={() => navigate(-1)} />
                <p>게시글 작성</p>
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
                <p>{imageFiles.length}/{MAX_IMAGES}개</p>
                <input type="file" ref={fileInputRef} multiple accept="image/*" style={{ display: 'none' }} onChange={handleChangeFiles} />
            </section>
            <section className="nb-category-choose-ct">
                <label>카테고리</label>
                <select className="nb-write-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="" disabled>선택하세요</option>
                    {CATEGORY_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
            </section>
            <section className="nb-write-title-ct">
                <label>제목</label>
                <input className="nb-write-input" placeholder="게시글의 제목을 입력해주세요." value={title} onChange={(e) => setTitle(e.target.value)} />
            </section>
            <section className="nb-write-contant-ct">
                <label>본문</label>
                <textarea id="nb-write-textarea" placeholder="Booster에서 자유롭게 얘기해보세요." value={content} onChange={(e) => setContent(e.target.value)} />
            </section>
            
            {/* ✨ 2. onClick 핸들러와 style 속성 적용 */}
            <div className="nb-write-anonymous" onClick={() => setIsAnonymous(prev => !prev)}>
                <button type="button">
                    {/* 아이콘 색상은 CSS filter를 사용하거나, 별도의 활성화된 아이콘 이미지를 준비하여 조건부로 src를 바꾸는 방식이 좋습니다. 
                        간단한 색상 변경을 위해 여기서는 filter를 예시로 사용합니다. */}
                    <img 
                        src={Nbanonymous} 
                        alt="익명 아이콘" 
                        style={{ filter: isAnonymous ? 'invert(35%) sepia(99%) saturate(3443%) hue-rotate(0deg) brightness(102%) contrast(104%)' : 'none' }}
                    />
                </button>
                <p style={{ color: anonymousColor }}>익명</p>
            </div>

            <div className="nb-btn-ct">
                <button className="nb-write-complete-btn" onClick={handleSubmit} disabled={!canSubmit}>
                    {isSubmitting ? '처리 중...' : '작성완료'}
                </button>
            </div>
        </div>
    );
}

export default Nbwrite;
