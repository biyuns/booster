// src/pages/mypage/MyPgedit.js

import '../../components/mypage/myPg_edit.css';
import { Profileback, Profileremove, Mypagelogo } from '../../img/img';
import apiClient from '../../api/apiClient';
import React, { useState, useEffect, useRef } from 'react';
import Mypgeditmodal from '../../components/modal/MypgEditModal';
import Mypgremovemodal from '../../components/modal/MypgRemoveModal';
import { useNavigate } from 'react-router-dom';

function MyPgedit() {
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState(Mypagelogo);
    // 1. 성별 표시를 위한 새로운 상태 추가
    const [displayGender, setDisplayGender] = useState('');
    
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const fileInputRef = useRef(null);
    
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await apiClient.get('/booster/profile');
                const profileData = response.data;

                // --- 2. 성별 데이터 변환 로직 ---
                if (profileData.gender === 'MALE') {
                    setDisplayGender('남자');
                } else if (profileData.gender === 'FEMALE') {
                    setDisplayGender('여자');
                } else {
                    setDisplayGender(''); // 그 외의 경우 비워둠
                }

                // --- 3. 프로필 이미지 처리 로직 ---
                const imageUrl = profileData.profileImageUrl;
                // 서버에서 받은 URL이 존재하고, 'default-profile.png'가 아닐 때만 서버 이미지 사용
                if (imageUrl && !imageUrl.includes('default-profile.png')) {
                    setProfileImage(imageUrl);
                } else {
                    // 그 외의 경우 (URL이 없거나, 기본 이미지 URL일 때) 로컬 기본 이미지 사용
                    setProfileImage(Mypagelogo);
                }

            } catch (error) {
                console.error("프로필 정보를 불러오는 데 실패했습니다.", error);
            }
        };
        fetchProfileData();
    }, []);

    // 이미지 업로드(수정) 처리 함수
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await apiClient.post('/booster/profile/image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert(response.data.message);
            // 업로드 성공 시, 반환된 URL로 즉시 프로필 이미지 업데이트
            setProfileImage(response.data.profileImageUrl);
        } catch (error) {
            console.error("이미지 업로드 실패:", error);
            alert("이미지 업로드 중 오류가 발생했습니다.");
        }
        closeEditModal();
    };

    // 이미지 삭제 처리 함수
    const handleDeleteConfirm = async () => {
        try {
            const response = await apiClient.delete('/booster/profile/image');
            alert(response.data.message);
            setProfileImage(Mypagelogo); // 삭제 성공 시 로컬 기본 이미지로 변경
        } catch (error) {
            console.error("이미지 삭제 실패:", error);
            alert("이미지 삭제 중 오류가 발생했습니다.");
        }
        closeDeleteModal();
    };
    
    // 숨겨진 파일 입력창을 클릭하는 함수
    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    // 모달 관리 함수
    const openDeleteModal = () => setDeleteModalOpen(true);
    const closeDeleteModal = () => setDeleteModalOpen(false);
    const openEditModal = () => setEditModalOpen(true);
    const closeEditModal = () => setEditModalOpen(false);

    return (
        <div className="total_ct">
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload}
                style={{ display: 'none' }} 
                accept="image/*"
            />

            <section className="pf-edit-ct">
                <img onClick={() => navigate('/mypage')} src={Profileback} alt="back" />
                <p> 프로필 수정 </p>
                <div className="profile-dummy"></div>
            </section>

            <hr className="profile-hr"/>   

            <section className="pf-img-ct">
                <div className="img-total-ct">
                    <div className="pf-img">
                        <img src={profileImage} alt="profile-image" />
                    </div>
                    <div className="pf-remove-bt" onClick={openDeleteModal} style={{ cursor: 'pointer' }}>
                        <img src={Profileremove} alt="profile-img-remove" />
                    </div>
                </div>

                {/* 4. 변환된 성별 정보를 화면에 표시 */}
                <p className="profile-gender-display">성별: {displayGender}</p>

                <button className="pf-picture-edit" onClick={openEditModal}> 사진 수정 </button>
            </section>
            
            <div className="edit-button-ct">
                {/* <button className="edit-complete"> 수정 완료 </button> */}
            </div>

            {isDeleteModalOpen && (
                <Mypgremovemodal
                    onClose={closeDeleteModal}
                    onConfirm={handleDeleteConfirm}
                />
            )}
            
            {isEditModalOpen && (
                <Mypgeditmodal
                    onClose={closeEditModal}
                    onAlbumSelect={triggerFileInput}
                />
            )}
        </div>
    );
}

export default MyPgedit;
