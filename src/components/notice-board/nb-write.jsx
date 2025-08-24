import { Profileback, Nbpicture, Nbanonymous, Nbremovebtn } from "../../img/img";
import '../../components/notice-board/nb-write.css'
import React, {useRef, useState, useMemo } from "react";
import apiClient from "../../api/apiClient";
import { useNavigate } from "react-router-dom";

const MAX_IMAGES = 5;
const category_OPTIONS = [
    { value : 'FREE', label: '자유'},
    { value : 'PROMO', label: '홍보'},
    { value : 'INFO', label: '정보'},
    { value : 'TMI', label: 'TMI'},
]
function Nbwrite() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);

    const [imgUrls, setImgUrls] = useState([]);
    const imageCount = imgUrls.length;

    const introImgUrl = useMemo(() => (imgUrls[0] ? imgUrls[0] : ''), [imgUrls]);

    const canSubmit = category && title.trim() && content.trim();

    const handleClickAddImage = () => {
        if(imageCount >= MAX_IMAGES) {
            alert(`이미지는 최대 ${MAX_IMAGES}장까지만 추가할 수 있습니다.`);
            return;
        }
        fileInputRef.current?.click();
    }

    const handleChangeFiles = async (e) => {
        const files = Array.from(e.target.files || []);
    }
    
    return (
        <div className="total_ct">
            <section className="pf-edit-ct">
                <img src={Profileback} alt="back"></img>
                <p> 게시글 작성 </p>
                <div class="profile-dummy"></div>
            </section>

            <hr className="profile-hr"/>  

        <section className="np-add-total-ct">
            <dv className="nb-add-img-ct">
                <div className="nb-picture-add-ct">
                    <button> <img src={Nbpicture}></img></button>
                    <p> 사진 추가</p>
                </div>

                <div className="nb-add-img">
                    <img src={Profileback}></img>
                    <div className="nb-img-remove">
                        <img src={Nbremovebtn}></img>
                    </div>
                </div>
            </dv>
            <p> 0/5개 </p>
        </section>
            
        <section className="nb-category-choose-ct">
            <label> 카테고리 </label>
            <select className="nb-write-select"> 
                <option value="">전체</option>   
                <option value="">자유</option>   
                <option value="">홍보</option>   
                <option value="">정보</option>   
                <option value="">TMI</option>   
            </select>
        </section>
            
        <section className="nb-write-title-ct">
            <label> 제목 </label>
            <input className="nb-write-input" placeholder="게시글의 제목을 입력해주세요."></input>
        </section>

        
        <section className="nb-write-contant-ct">
            <label> 본문 </label>
            <textarea name="" id="nb-write-textarea" placeholder="Booster에서 자유롭게 얘기해보세요."></textarea>
        </section>

        <div className="nb-write-anonymous">
            <button> <img src={Nbanonymous}></img></button>
            <p> 익명 </p>
        </div>
        <div className="nb-btn-ct">
            <button className="nb-write-complete-btn"> 작성완료 </button>
        </div>
    </div>
    )

}

export default Nbwrite;