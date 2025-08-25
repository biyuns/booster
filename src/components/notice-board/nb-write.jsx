// src/pages/notice-board/Nbwrite.jsx

import React, { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
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

const CATEGORY_LABEL_TO_VALUE = {
    '자유': '자유 게시판',
    '홍보': '홍보 게시판',
    '정보': '정보 게시판',
    'TMI': 'TMI 게시판',
};

function Nbwrite() {
    const navigate = useNavigate();
    const { postId } = useParams();
    const location = useLocation();

    const isEditMode = !!postId;
    const fileInputRef = useRef(null);

    const [initialData] = useState(location.state?.post || null);
    const [title, setTitle] = useState(initialData?.title || "");
    const [content, setContent] = useState(initialData?.content || "");
    const [category, setCategory] = useState(() => (isEditMode ? CATEGORY_LABEL_TO_VALUE[initialData?.category] || "" : ""));
    const [isAnonymous, setIsAnonymous] = useState(initialData?.is_anonymous || false);
    
    const [existingImageUrls, setExistingImageUrls] = useState(initialData?.img_url || []);
    const [newImageFiles, setNewImageFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const totalImageCount = existingImageUrls.length + newImageFiles.length;
    const canSubmit = useMemo(() => category && title.trim() && content.trim() && !isSubmitting, [category, title, content, isSubmitting]);

    useEffect(() => {
        const newPreviews = newImageFiles.map(file => URL.createObjectURL(file));
        setPreviewUrls([...existingImageUrls, ...newPreviews]);
        return () => newPreviews.forEach(url => URL.revokeObjectURL(url));
    }, [existingImageUrls, newImageFiles]);

    const handleClickAddImage = () => {
        if (totalImageCount >= MAX_IMAGES) return alert(`이미지는 최대 ${MAX_IMAGES}장까지만 추가할 수 있습니다.`);
        fileInputRef.current?.click();
    };

    const handleChangeFiles = (e) => {
        const files = Array.from(e.target.files || []);
        const availableSlots = MAX_IMAGES - totalImageCount;
        if (files.length > availableSlots) alert(`최대 ${availableSlots}장까지만 더 추가할 수 있습니다.`);
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

    const toggleAnonymous = () => setIsAnonymous(prev => !prev);

    const handleSubmit = async () => {
        if (!canSubmit) return;
        setIsSubmitting(true);

        try {
            let uploadedImageUrls = [];
            if (newImageFiles.length > 0) {
                const imageFormData = new FormData();
                newImageFiles.forEach(file => {
                    imageFormData.append('upload', file); // API 명세에 따라 key를 'upload'로 설정
                });
                const response = await apiClient.post('/booster/image/upload', imageFormData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                uploadedImageUrls = response.data.imgUrls; // API 응답 형식에 따라 조정 필요
            }

            const finalImageUrls = [...existingImageUrls, ...uploadedImageUrls];
            const introImgUrl = finalImageUrls.length > 0 ? finalImageUrls[0] : null;

            if (isEditMode) {
                const requestBody = { title: title.trim(), isAnonymous };
                await apiClient.put(`/booster/edit/${postId}`, requestBody);
                alert('게시글이 성공적으로 수정되었습니다.');
                navigate(`/board/${postId}`);
            } else {
                const requestBody = {
                    title: title.trim(),
                    content: content.trim(),
                    category,
                    isAnonymous,
                    introImgUrl,
                    imgUrls: finalImageUrls,
                };
                await apiClient.post('/booster/create', requestBody);
                alert('게시글이 성공적으로 등록되었습니다.');
                navigate('/board');
            }
        } catch (error) {
            console.error('처리 실패:', error);
            alert(error.response?.data?.message || '오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="total_ct">
            <section className="pf-edit-ct">
                <img src={Profileback} alt="뒤로가기" onClick={() => navigate(-1)} />
                <p>{isEditMode ? '게시글 수정' : '게시글 작성'}</p>
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
                        <div className="nb-add-img" key={`${url}-${index}`}>
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

            <div className="nb-write-anonymous" onClick={toggleAnonymous}>
                <button type="button"><img src={Nbanonymous} alt="익명 아이콘" /></button>
                <p>익명</p>
            </div>

            <div className="nb-btn-ct">
                <button className="nb-write-complete-btn" onClick={handleSubmit} disabled={!canSubmit}>
                    {isSubmitting ? '처리 중...' : (isEditMode ? '수정완료' : '작성완료')}
                </button>
            </div>
        </div>
    );
}

export default Nbwrite;
