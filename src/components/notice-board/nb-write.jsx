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
    
    // --- 상태 관리 수정 ---
    const [initialData] = useState(location.state?.post || null);
    const [title, setTitle] = useState(initialData?.title || "");
    const [content, setContent] = useState(initialData?.content || "");
    const [category, setCategory] = useState(() => (isEditMode ? CATEGORY_LABEL_TO_VALUE[initialData.category] || "" : ""));
    const [isAnonymous, setIsAnonymous] = useState(initialData?.is_anonymous || false);
    
    // ✨ 1. 이미지 상태 분리: 서버 URL과 새로 추가된 파일을 별도로 관리
    const [existingImageUrls, setExistingImageUrls] = useState(initialData?.img_url || []);
    const [newImageFiles, setNewImageFiles] = useState([]); // File 객체를 저장

    // ✨ 2. 미리보기 URL 상태 추가
    const [previewUrls, setPreviewUrls] = useState([]);

    const totalImageCount = existingImageUrls.length + newImageFiles.length;
    const canSubmit = useMemo(() => category && title.trim() && content.trim(), [category, title, content]);

    // ✨ 3. 미리보기 URL 생성 및 메모리 해제 로직
    useEffect(() => {
        const newPreviews = newImageFiles.map(file => URL.createObjectURL(file));
        // 기존 이미지 URL과 새로 생성된 미리보기 URL을 합칩니다.
        setPreviewUrls([...existingImageUrls, ...newPreviews]);

        // 컴포넌트가 언마운트되거나 newImageFiles가 변경될 때 메모리 누수 방지
        return () => {
            newPreviews.forEach(url => URL.revokeObjectURL(url));
        };
    }, [existingImageUrls, newImageFiles]);

    const handleClickAddImage = () => {
        if (totalImageCount >= MAX_IMAGES) {
            alert(`이미지는 최대 ${MAX_IMAGES}장까지만 추가할 수 있습니다.`);
            return;
        }
        fileInputRef.current?.click();
    };

    const handleChangeFiles = (e) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;
        const availableSlots = MAX_IMAGES - totalImageCount;
        if (files.length > availableSlots) {
            alert(`최대 ${availableSlots}장까지만 더 추가할 수 있습니다.`);
        }
        const filesToProcess = files.slice(0, availableSlots);
        setNewImageFiles(prev => [...prev, ...filesToProcess]); // File 객체 저장
        e.target.value = '';
    };

    const handleRemoveImage = (index) => {
        if (index < existingImageUrls.length) {
            // 기존 이미지 제거
            setExistingImageUrls(prev => prev.filter((_, i) => i !== index));
        } else {
            // 새로 추가된 이미지 제거
            const newFileIndex = index - existingImageUrls.length;
            setNewImageFiles(prev => prev.filter((_, i) => i !== newFileIndex));
        }
    };

    const toggleAnonymous = () => setIsAnonymous(prev => !prev);

    const handleSubmit = async () => {
        if (!canSubmit) return;

        // ✨ 4. 서버 전송을 위해 FormData 사용
        const formData = new FormData();
        
        // JSON 데이터를 Blob으로 변환하여 FormData에 추가
        const jsonData = {
            title: title.trim(),
            content: content.trim(),
            category: category,
            isAnonymous: isAnonymous,
            // 수정 모드일 경우, 유지할 기존 이미지 URL 목록 전송
            imgUrls: isEditMode ? existingImageUrls : [],
        };
        formData.append('requestDto', new Blob([JSON.stringify(jsonData)], { type: 'application/json' }));
        
        // 새로 추가된 파일들을 FormData에 추가
        newImageFiles.forEach(file => {
            formData.append('images', file);
        });

        try {
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            
            if (isEditMode) {
                // 수정 모드: PUT 요청 (API 명세에 따라 수정 필요)
                // 현재 PUT /booster/edit/{postId} API가 FormData를 처리하는지 확인 필요
                await apiClient.put(`/booster/edit/${postId}`, formData, config);
                alert('게시글이 성공적으로 수정되었습니다.');
                navigate(`/board/${postId}`);
            } else {
                // 작성 모드: POST 요청
                await apiClient.post('/booster/create', formData, config);
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
                    {/* ✨ 수정됨: 통합된 미리보기 URL 배열을 사용 */}
                    {previewUrls.map((url, index) => (
                        <div className="nb-add-img" key={url + index}>
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
                <button className="nb-write-complete-btn" onClick={handleSubmit} disabled={!canSubmit} style={{ backgroundColor: canSubmit ? '#FF4500' : '' }}>
                    {isEditMode ? '수정완료' : '작성완료'}
                </button>
            </div>
        </div>
    );
}

export default Nbwrite;
