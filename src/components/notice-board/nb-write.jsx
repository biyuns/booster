// src/pages/notice-board/Nbwrite.jsx

import React, { useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Profileback, Nbpicture, Nbanonymous, Nbremovebtn } from "../../img/img";
import "../../components/notice-board/nb-write.css";
import apiClient from "../../api/apiClient";

// --- 상수 정의 ---
const MAX_IMAGES = 5;
const CATEGORY_OPTIONS = [
  { value: 'FREE',  label: '자유' },
  { value: 'PROMO', label: '홍보' },
  { value: 'INFO',  label: '정보' },
  { value: 'TMI',   label: 'TMI' },
];

function Nbwrite() {
  // --- React Hooks 및 상태 관리 ---
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // 폼 데이터 상태
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [imgUrls, setImgUrls] = useState([]);
  const [isUploading, setIsUploading] = useState(false); // 업로드 진행 상태

  // 파생 상태 (Derived State)
  const imageCount = imgUrls.length;
  const introImgUrl = useMemo(() => (imgUrls.length > 0 ? imgUrls[0] : null), [imgUrls]);
  // 업로드 중이 아닐 때만 제출 가능하도록 조건 추가
  const canSubmit = useMemo(() => category && title.trim() && content.trim() && !isUploading, [category, title, content, isUploading]);

  // --- 이벤트 핸들러 및 API 호출 함수 ---

  // '사진 추가' 버튼 클릭 핸들러
  const handleClickAddImage = () => {
    if (imageCount >= MAX_IMAGES) {
      alert(`이미지는 최대 ${MAX_IMAGES}장까지만 추가할 수 있습니다.`);
      return;
    }
    // 숨겨진 파일 입력창 클릭
    fileInputRef.current?.click();
  };

  // 파일이 선택되면 이미지 업로드 API 호출
  const handleChangeFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const availableSlots = MAX_IMAGES - imageCount;
    if (files.length > availableSlots) {
      alert(`최대 ${availableSlots}장까지만 더 추가할 수 있습니다.`);
    }

    const filesToUpload = files.slice(0, availableSlots);
    setIsUploading(true);

    const formData = new FormData();
    filesToUpload.forEach(file => {
      formData.append('upload', file); // API 명세에 따른 key
    });

    try {
      const response = await apiClient.post('/booster/image/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const newUrls = response.data.imgUrls || [];
      setImgUrls(prevUrls => [...prevUrls, ...newUrls]);
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert('이미지 업로드 중 오류가 발생했습니다.');
    } finally {
      setIsUploading(false);
      e.target.value = ''; // 다음에 같은 파일 선택 가능하도록 초기화
    }
  };

  // 첨부된 이미지 삭제 핸들러
  const handleRemoveImage = (indexToRemove) => {
    setImgUrls(prevUrls => prevUrls.filter((_, index) => index !== indexToRemove));
  };

  // 익명 모드 토글 핸들러
  const toggleAnonymous = () => {
    setIsAnonymous(prev => !prev);
  };

  // 최종 게시글 작성 핸들러
  const handleSubmit = async () => {
    if (!canSubmit) return;

    const requestBody = {
      title: title.trim(),
      content: content.trim(),
      category,
      isAnonymous,
      introImgUrl,
      imgUrls,
    };

    try {
      const response = await apiClient.post('/booster/create', requestBody);
      alert(response.data?.message || '게시글이 성공적으로 등록되었습니다.');
      navigate('/board');
    } catch (error) {
      console.error('게시글 작성 실패:', error);
      if (error?.response) {
        alert(error.response.data?.message || '게시글 등록에 실패했습니다.');
      } else {
        alert('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    }
  };

  // --- JSX 렌더링 ---
  return (
    <div className="total_ct">
      <section className="pf-edit-ct">
        <img src={Profileback} alt="뒤로가기" onClick={() => navigate(-1)} />
        <p> 게시글 작성 </p>
        <div className="profile-dummy"></div>
      </section>
      <hr className="profile-hr" />

      {/* 이미지 추가 섹션 */}
      <section className="np-add-total-ct">
        <div className="nb-add-img-ct">
          <div className="nb-picture-add-ct" onClick={handleClickAddImage}>
            <button type="button" disabled={isUploading}>
              <img src={Nbpicture} alt="사진 추가 아이콘" />
            </button>
            <p>{isUploading ? '업로드 중...' : '사진 추가'}</p>
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
        <p> {imageCount}/{MAX_IMAGES}개 </p>
        <input
          type="file"
          ref={fileInputRef}
          multiple
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleChangeFiles}
        />
      </section>
      
      {/* 카테고리 선택 */}
      <section className="nb-category-choose-ct">
        <label> 카테고리 </label>
        <select className="nb-write-select" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="" disabled>선택하세요</option>
          {CATEGORY_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </section>
      
      {/* 제목 입력 */}
      <section className="nb-write-title-ct">
        <label> 제목 </label>
        <input className="nb-write-input" placeholder="게시글의 제목을 입력해주세요." value={title} onChange={(e) => setTitle(e.target.value)} />
      </section>
      
      {/* 본문 입력 */}
      <section className="nb-write-contant-ct">
        <label> 본문 </label>
        <textarea id="nb-write-textarea" placeholder="Booster에서 자유롭게 얘기해보세요." value={content} onChange={(e) => setContent(e.target.value)} />
      </section>

      {/* 익명 토글 */}
      <div className="nb-write-anonymous" onClick={toggleAnonymous}>
        <button type="button"><img src={Nbanonymous} alt="익명 아이콘" /></button>
        <p> 익명 </p>
      </div>

      {/* 작성 완료 버튼 */}
      <div className="nb-btn-ct">
        <button
          className="nb-write-complete-btn"
          onClick={handleSubmit}
          disabled={!canSubmit}
          style={{ backgroundColor: canSubmit ? '#FF4500' : '' }}
        >
          {isUploading ? '이미지 업로드 중...' : '작성완료'}
        </button>
      </div>
    </div>
  );
}

export default Nbwrite;
