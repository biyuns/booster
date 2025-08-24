import '../../components/mypage/myPg_edit.css';
import { Profileback, Profileremove, Mypagelogo } from '../../img/img';
import apiClient from '../../api/apiClient'
import React, {useState, useEffect, useRef} from 'react';
import Mypgeditmodal from '../../components/modal/MypgEditModal';
import Mypgremovemodal from '../../components/modal/MypgRemoveModal'
import { useNavigate } from 'react-router-dom';

function MyPgedit() {

    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState(Mypagelogo);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const fileInputRef = useRef(null);
    
 useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                const response = await apiClient.get('/booster/profile');
                setProfileImage(response.data.profileImageUrl || Mypagelogo);
            } catch (error) {
                console.error("프로필 정보를 불러오는 데 실패했습니다.", error);
            }
        };
        fetchProfileImage();
    }, []);

    // 2. 이미지 업로드(수정) 처리 함수 (POST /form-data)
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
            setProfileImage(response.data.profileImageUrl); // 새 이미지로 화면 업데이트
        } catch (error) {
            console.error("이미지 업로드 실패:", error);
            alert("이미지 업로드 중 오류가 발생했습니다.");
        }
        closeEditModal(); // 모달 닫기
    };

    // 3. 이미지 삭제 처리 함수 (DELETE)
    const handleDeleteConfirm = async () => {
        try {
            const response = await apiClient.delete('/booster/profile/image');
            alert(response.data.message);
            setProfileImage(Mypagelogo); // 기본 이미지로 화면 업데이트
        } catch (error) {
            console.error("이미지 삭제 실패:", error);
            alert("이미지 삭제 중 오류가 발생했습니다.");
        }
        closeDeleteModal();
    };
    
    // 4. 숨겨진 파일 입력창을 클릭하는 함수
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
                <img onClick={() => navigate('/mypage')}src={Profileback} alt="back"></img>
                <p> 프로필 수정 </p>
                <div class="profile-dummy"></div>
            </section>

            <hr className="profile-hr"/>   

            <section className="pf-img-ct">
                <div className="img-total-ct">
                    
                    <div className="pf-img">
                        <img src={Mypagelogo} alt="profile-image"></img>
                    </div>
                
                    <div className="pf-remove-bt" onClick={openDeleteModal} style={{ cursor: 'pointer' }}>
                        <img src={Profileremove} alt="profile-img-remove"></img>
                    </div>
                </div>

                <button className="pf-picture-edit" onClick={openEditModal}> 사진 수정 </button>
            </section>
              <div className="edit-button-ct">
                        {/* <button className="edit-complete"> 수정 완료 </button> */}
                        </div>
              {isDeleteModalOpen && (
                <Mypgremovemodal
                    onClose={closeDeleteModal}
                    onConfirm={handleDeleteConfirm} // 삭제 API 호출 함수를 넘겨줌
                />
            )}
            
            {isEditModalOpen && (
                <Mypgeditmodal
                    onClose={closeEditModal}
                    onAlbumSelect={triggerFileInput} // 파일 선택창을 여는 함수를 넘겨줌
                />
            )}

        </div>
    )
}

export default MyPgedit;