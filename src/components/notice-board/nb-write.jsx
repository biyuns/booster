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
  const [imgUrls, setImgUrls] = useState([]); // 업로드 완료된 이미지 URL 배열

  // 파생된 상태 (Derived State)
  const imageCount = imgUrls.length;
  const introImgUrl = useMemo(() => (imgUrls.length > 0 ? imgUrls[0] : null), [imgUrls]);
  const canSubmit = useMemo(() => category && title.trim() && content.trim(), [category, title, content]);

  // --- 이벤트 핸들러 함수 ---

  // '사진 추가' 버튼 클릭 시, 숨겨진 파일 입력창을 트리거
  const handleClickAddImage = () => {
    if (imageCount >= MAX_IMAGES) {
      alert(`이미지는 최대 ${MAX_IMAGES}장까지만 추가할 수 있습니다.`);
      return;
    }
    fileInputRef.current?.click();
  };

  // 파일이 선택되었을 때 실행되는 함수
  const handleChangeFiles = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const availableSlots = MAX_IMAGES - imageCount;
    if (files.length > availableSlots) {
      alert(`최대 ${availableSlots}장까지만 더 추가할 수 있습니다.`);
    }

    const filesToProcess = files.slice(0, availableSlots);

    // [중요] 실제 서비스에서는 이 부분에서 서버로 파일을 업로드하고,
    // 응답으로 받은 URL을 상태에 저장해야 합니다.
    // 현재는 데모를 위해 로컬 미리보기 URL을 생성하여 사용합니다.
    const localPreviewUrls = filesToProcess.map(file => URL.createObjectURL(file));
    setImgUrls(prev => [...prev, ...localPreviewUrls]);

    // 다음에 같은 파일을 또 선택할 수 있도록 input 값을 초기화
    e.target.value = '';
  };

  // 개별 이미지 제거
  const handleRemoveImage = (index) => {
    setImgUrls(prev => prev.filter((_, i) => i !== index));
  };

  // 익명 모드 토글
  const toggleAnonymous = () => {
    setIsAnonymous(prev => !prev);
  };

  // 최종 제출 처리
  const handleSubmit = async () => {
    if (!canSubmit) return;

    const requestBody = {
      title: title.trim(),
      content: content.trim(),
      category: category,
      isAnonymous: isAnonymous,
      introImgUrl: introImgUrl,
      imgUrls: imgUrls,
    };

    try {
      const response = await apiClient.post('/booster/create', requestBody);
      alert(response.data?.message || '게시글이 성공적으로 등록되었습니다.');
      navigate('/board'); // 게시판 목록 페이지로 이동
    } catch (error) {
      console.error('게시글 작성 실패:', error);
      if (error?.response) {
        alert(error.response.data?.message || '게시글 등록 중 오류가 발생했습니다.');
      } else if (error?.request) {
        alert('서버로부터 응답을 받지 못했습니다. 네트워크 상태를 확인해주세요.');
      } else {
        alert('요청 중 알 수 없는 오류가 발생했습니다.');
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
          작성완료
        </button>
      </div>
    </div>
  );
}

export default Nbwrite;
