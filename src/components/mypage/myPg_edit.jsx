// import '../../components/mypage/myPg_edit.css';
// import { Profileback, Profileremove, Mypagelogo } from '../../img/img';

// import React, {useState} from 'react';
// import Mypg_edit_modal from '../modal/mypg-edit-modal';
// import Mypg_remove_modal from '../modal/mypg-remove-modal';

// function MyPgedit() {

//         // 각 모달의 열림/닫힘 상태를 관리하는 state
//     const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
//     const [isEditModalOpen, setEditModalOpen] = useState(false);

//     // 삭제 확인 모달을 열고 닫는 함수
//     const openDeleteModal = () => setDeleteModalOpen(true);
//     const closeDeleteModal = () => setDeleteModalOpen(false);

//     // 사진 수정 모달을 열고 닫는 함수
//     const openEditModal = () => setEditModalOpen(true);
//     const closeEditModal = () => setEditModalOpen(false);
    
//     // 삭제 '확인'을 눌렀을 때 실행할 함수 (콘솔에 로그만 남기도록 설정)
//     const handleDeleteConfirm = () => {
//         console.log("삭제가 확인되었습니다.");
//         // 실제 삭제 로직을 여기에 추가하세요.
//         closeDeleteModal(); // 로직 실행 후 모달 닫기
//     };
//     return (
//         <div className="total_ct">
//             <section className="pf-edit-ct">
//                 <img src={Profileback} alt="back"></img>
//                 <p> 프로필 수정 </p>
//                 <div class="profile-dummy"></div>
//             </section>

//             <hr className="profile-hr"/>   

//             <section className="pf-img-ct">
//                 <div className="img-total-ct">
                    
//                     <div className="pf-img">
//                         <img src={Mypagelogo} alt="profile-image"></img>
//                     </div>
                
//                     <div className="pf-remove-bt" onClick={openDeleteModal} style={{ cursor: 'pointer' }}>
//                         <img src={Profileremove} alt="profile-img-remove"></img>
//                     </div>
//                 </div>

//                 <button className="pf-picture-edit" onClick={openEditModal}> 사진 수정 </button>
//             </section>

//             <div className="pf-content-edit-ct">

//                 <secion className="pf-name">
//                     <label> 이름 </label>
//                     <input></input>
//                     <p> * 안전한 이용을 위해 실명을 사용해주세요.</p>
                
//                 </secion>

//                 <section className="pf-gender">
//                     <label> 성별 </label>
//                     <div className="pf-gender-choose">
//                         <button> 여성 </button>
//                         <button> 남성 </button>
//                     </div>
//                 </section>

//                 <section className="pf-std-num">
//                     <label> 입학연도 </label>
//                     <input></input>
//                 </section>

//                 <section className="pf-depart">
//                     <label> 학부(학과)</label> 
//                     <input></input>
//                 </section>

//             </div>
//             <div className="edit-button-ct">
//             <button className="edit-complete"> 수정 완료 </button>
//             </div>
//                         {isDeleteModalOpen && (
//                 <Mypg_remove_modal
//                     onClose={closeDeleteModal}
//                     onConfirm={handleDeleteConfirm}
//                 />
//             )}

//             {/* isEditModalOpen이 true일 때만 사진 수정 모달을 렌더링 */}
//             {isEditModalOpen && (
//                 <Mypg_edit_modal
//                     onClose={closeEditModal}
//                 />
//             )}

//         </div>
//     )
// }

// export default MyPgedit;