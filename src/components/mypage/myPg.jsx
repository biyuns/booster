import {Board, Boon, Chat, Home, My_red, Mypagelogo, Mypagepwedit} from '../../img/img';
import '../../components/mypage/myPg.css'
function MyPg() {
    return (
    <div className="total_ct">
            <p className="main-title"> Booster </p>

        <section className="mypg-ct">
                <div className="user-ct">
                    <div className="user-top-ct">
                        <div className="user-image-ct">
                            <img src={Mypagelogo}></img>
                        </div>

                        <div className="user-info-ct">
                            <p className="user-name"> 사용자 이름</p>
                            <p className="user-info"> 성별/ 학번/ 학과 or 학부</p>
                        </div>
                    </div>

                    <button className="pf-edit-btn"> 프로필 수정</button>
                </div>
            
            <section className="ps-logout-ct">
                <div className="password-ct">
                    <p> 비밀번호 변경</p>
                    <img src={Mypagepwedit}></img>
                </div>
                <p className="mypg-logout"> 로그아웃</p>
            </section>

        </section>

            <footer className="main-footer">
                    <img src={Home}></img>
                    <img src={Board}></img>
                    <img src={Chat}></img>
                    <img src={Boon}></img>
                    <img src={My_red}></img>
            </footer>
    </div>
    )
}

export default MyPg;