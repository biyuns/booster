import { Profileback, Nbstate, Geul1, Geul2, Geul3, Heart } from "../../img/img";
import '../../components/notice-board/nb-board.css';
function Nbboard(){
    return (
        <div className="total_ct">
            <section className="pf-edit-ct2">
                <img src={Profileback} alt="back"></img>
                <p> 전체 </p>
                <img src={Nbstate}></img>
            </section>

            <section className="board-topct">
                <div className="boadr-imgname-ct">
                    <div className="bd-img">
                        <img></img>
                    </div>
                    <div className="bd-name-month-ct">
                        <p> 익명</p>
                        <p> 08/12 16:35</p>
                    </div>
                </div>

                <div className="bd-title">
                    <p> 나만 아는 을지대 숨은 맛집</p>
                    <p> 맨날 학교 앞에서 뭐 먹을지 고민하면 여기 가봐.</p>
                </div>

                <div className="bd-img-total-ct">
                    <img></img>
                    <img></img>
                    <img></img>
                </div>

                <div className="bd-comment-heart-ct">
                    <div className="bd-comment-ct">
                        <img src={Geul3}></img>
                        <img src={Geul2}></img>
                        <img src={Geul1}></img>
                    </div>
                    <p> 21 </p>
                    <img src={Heart}></img>
                    <p> 3 </p>
                </div>


            </section>


        </div>
    )
}

export default Nbboard;