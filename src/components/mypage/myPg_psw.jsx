// import { Profileback } from "../../img/img"
// import '../../components/mypage/myPg-psw.css';
// import React, {useState, useEffect} from 'react';



// function MyPgpsw() {

//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [passwordError, setPasswordError] = useState(false);
    
// useEffect(() => {
//     // confirmPassword가 비어있지 않고, 두 비밀번호가 다를 때만 에러를 true로 설정
//     if (confirmPassword && password !== confirmPassword) {
//       setPasswordError(true);
//     } else {
//       setPasswordError(false);
//     }
//   }, [password, confirmPassword]);

//    const isButtonEnabled = password !== '' && !passwordError;

//     return (
//         <div className="total_ct">
//             <section className="pf-edit-ct">
//                 <img src={Profileback}></img>
//                 <p> 비밀번호 수정 </p>
//                 <div class="profile-dummy"></div>
//             </section>

//             <hr className="profile-hr"/>

//             <div className="mypg-password-edit-ct">
//                 <section className="new-password">
//                     <label htmlfor="mypg-new-password"> 새 비밀번호 </label>
//                     <input 
//                     id ="mypg-new-password"
//                     type="password" 
//                     placeholder="새 비밀번호를 입력해 주세요."
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}></input>        
                
//                 </section>    

//                 <section className="new-password-check">
//                     <label htmlfor="psw-check"> 새 비밀번호 확인 </label>
//                     <input 
//                     id="psw-check"
//                     type="password" 
//                     placeholder="다시 한번 입력해 주세요."
//                     value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//                     ></input>
//                        {passwordError && (
//             <p className="error-message">비밀번호가 일치하지 않습니다.</p>
//           )}
//                 </section>
//              </div>   

//             <div className="ps-edit-button-ct">
//                     <button
//           className={`ps-edit-complete ${isButtonEnabled ? 'active' : ''}`}
//           disabled={!isButtonEnabled}
//         > 수정 완료 </button>
//             </div>

//         </div>
//     )
// }

// export default MyPgpsw;