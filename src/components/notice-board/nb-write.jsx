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

// 카테고리 표시 이름 -> API 전송 값 변환
const CATEGORY_LABEL_TO_VALUE = {
    '자유': 'FREE',
    '홍보': 'PROMO',
    '정보': 'INFO',
    'TMI': 'TMI',
};

function Nbwrite() {
    const navigate = useNavigate();
    const { postId } = useParams();
    const location = useLocation();

    const isEditMode = !!postId;
    const fileInputRef = useRef(null);
    
    const [initialData] = useState(location.state?.post || null);

    const [category, setCategory] = useState(() => {
        if (isEditMode && initialData?.category) {
            return CATEGORY_LABEL_TO_VALUE[initialData.category] || "";
        }
        return "";
    });
    const [title, setTitle] = useState(initialData?.title || "");
    const [content, setContent] = useState(initialData?.content || "");
    const [isAnonymous, setIsAnonymous] = useState(initialData?.is_anonymous || false);
    const [imgUrls, setImgUrls] = useState(initialData?.img_url || []);

    const imageCount = imgUrls.length;
    const canSubmit = useMemo(() => category && title.trim() && content.trim(), [category, title, content]);

    const handleClickAddImage = () => {
        if (imageCount >= MAX_IMAGES) {
            alert(`이미지는 최대 ${MAX_IMAGES}장까지만 추가할 수 있습니다.`);
            return;
        }
        fileInputRef.current?.click();
    };

    const handleChangeFiles = (e) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;
        const availableSlots = MAX_IMAGES - imageCount;
        if (files.length > availableSlots) {
            alert(`최대 ${availableSlots}장까지만 더 추가할 수 있습니다.`);
        }
        const filesToProcess = files.slice(0, availableSlots);
        const localPreviewUrls = filesToProcess.map(file => URL.createObjectURL(file));
        setImgUrls(prev => [...prev, ...localPreviewUrls]);
        e.target.value = '';
    };

    const handleRemoveImage = (index) => {
        setImgUrls(prev => prev.filter((_, i) => i !== index));
    };

    const toggleAnonymous = () => setIsAnonymous(prev => !prev);

    const handleSubmit = async () => {
        if (!canSubmit) return;

        try {
            if (isEditMode) {
                // 수정 모드: PUT 요청
                const requestBody = {
                    title: title.trim(),
                    isAnonymous: isAnonymous,
                    // API 명세에 content, category, images가 없으므로 생략. 필요시 추가해야 함.
                };
                await apiClient.put(`/booster/edit/${postId}`, requestBody);
                alert('게시글이 성공적으로 수정되었습니다.');
                navigate(`/board/${postId}`);
            } else {
                // 작성 모드: POST 요청
                // [주의] 이미지 업로드 로직은 별도 구현이 필요합니다.
                // 현재는 URL 문자열을 보내는 방식이므로, 실제 파일 업로드 후 URL을 받아와야 합니다.
                const requestBody = {
                    title: title.trim(),
                    content: content.trim(),
                    category: category,
                    isAnonymous: isAnonymous,
                    introImgUrl: imgUrls.length > 0 ? imgUrls[0] : null,
                    imgUrls: imgUrls,
                };
                await apiClient.post('/booster/create', requestBody);
                alert('게시글이 성공적으로 등록되었습니다.');
                navigate('/board');
            }
        } catch (error) {
            console.error('처리 실패:', error);
            alert('오류가 발생했습니다. 다시 시도해주세요.');
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
                    {imgUrls.map((url, index) => (
                        <div className="nb-add-img" key={index}>
                            <img src={url} alt={`첨부 이미지 ${index + 1}`} />
                            <div className="nb-img-remove" onClick={() => handleRemoveImage(index)}>
                                <img src={Nbremovebtn} alt="이미지 삭제" />
                            </div>
                        </div>
                    ))}
                </div>
                <p>{imageCount}/{MAX_IMAGES}개</p>
                <input type="file" ref={fileInputRef} multiple accept="image/*" style={{ display: 'none' }} onChange={handleChangeFiles} />
            </section>
            
            <section className="nb-category-choose-ct">
                <label> 카테고리 </label>
                <select className="nb-write-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="" disabled>선택하세요</option>
                    {CATEGORY_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
            </section>
            
            <section className="nb-write-title-ct">
                <label> 제목 </label>
                <input className="nb-write-input" placeholder="게시글의 제목을 입력해주세요." value={title} onChange={(e) => setTitle(e.target.value)} />
            </section>
            
            <section className="nb-write-contant-ct">
                <label> 본문 </label>
                <textarea id="nb-write-textarea" placeholder="Booster에서 자유롭게 얘기해보세요." value={content} onChange={(e) => setContent(e.target.value)} />
            </section>

            <div className="nb-write-anonymous" onClick={toggleAnonymous}>
                <button type="button"><img src={Nbanonymous} alt="익명 아이콘" /></button>
                <p> 익명 </p>
            </div>

            <div className="nb-btn-ct">
                <button className="nb-write-complete-btn" onClick={handleSubmit} disabled={!canSubmit} style={{ backgroundColor: canSubmit ? '#FF4500' : '' }}>
                    {isEditMode ? '수정완료' : '작성완료'}
                </button>
            </div>
        </div>
    );
}

export default Nbwrite;
