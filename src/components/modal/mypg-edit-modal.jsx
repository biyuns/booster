// src/components/modal/ImageEditModal.js

import React from 'react';
import '../../components/modal/mypg-modal.css'; 
function Mypg_edit_modal({ onClose, onAlbumSelect }) {
    return (
        <div className="mypg-modal-overlay" onClick={onClose}>
            <div className="mypg-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="mypg-modal-ct-top">
                <p>변경할 사진을 선택해 주세요</p>
                </div>
                
                <div className="mypg-modal-ct-bottom">
                <button onClick={onAlbumSelect} className="file-select-button" 
                style={{backgroundColor : '#707070', border : '0px'}}>
                    사진 선택
                </button>
    
                {/* <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                /> */}
                </div>
            </div>
        </div>
    );
}

export default Mypg_edit_modal;
