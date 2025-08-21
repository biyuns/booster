// src/components/modal/ImageEditModal.js

import React from 'react';
import '../../components/modal/mypg-modal.css'; // 공통 모달 스타일을 import 합니다.

function Mypg_edit_modal({ onClose }) {
    // 사용자가 선택한 파일을 처리하는 함수
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log("선택된 파일:", file.name);
            // 여기에 파일 업로드 또는 미리보기 로직을 추가할 수 있습니다.
            onClose(); // 파일 선택 후 모달을 바로 닫거나, '확인' 버튼을 통해 닫을 수 있습니다.
        }
    };

    return (
        <div className="mypg-modal-overlay" onClick={onClose}>
            <div className="mypg-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="mypg-modal-ct-top">
                <p>변경할 사진을 선택해 주세요</p>
                </div>
                
                <div className="mypg-modal-ct-bottom">
                {/* 사용자가 클릭할 버튼 역할의 label */}
                <label htmlFor="file-upload" className="file-select-button">
                    사진 선택
                </label>
                
                {/* 실제 파일 입력을 담당하지만 화면에는 보이지 않음 */}
                <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                </div>
            </div>
        </div>
    );
}

export default Mypg_edit_modal;
