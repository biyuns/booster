import React from 'react';
import '../../components/modal/mypg-modal.css'; // 공통 모달 스타일을 import 합니다.

function Mypg_remove_modal({ onClose, onConfirm }) {
    return (
        <div className="mypg-modal-overlay" onClick={onClose}>
            <div className="mypg-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="mypg-modal-ct-top">
                <p>삭제하시겠습니까?</p>
                </div>
                <div className="mypg-modal-button-ct">
                    <button onClick={onClose}>취소</button>
                    <p> | </p>
                    <button onClick={onConfirm} className="confirm-button">확인</button>
                </div>
            </div>
        </div>
    );
}

export default Mypg_remove_modal;
