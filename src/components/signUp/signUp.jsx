import SignUpUse from "../header/SignUpUse";
import '../../components/signUp/signUp-total.css'
import React, {useState, useEffect} from "react";
import { SgChoose, SgChoose2, Sghr1, SgChoose3, SgChoose4 } from "../../img/img";
import { useNavigate } from "react-router-dom";

function SignUpPg() {

    const navigate = useNavigate();

    const [allAgree, setAllAgree] = useState(false);

    const [agreements, setAgreements] = useState({
        age : false,
        service : false,
        community : false,
        privacy : false,
        identity : false,
    });

    const [isNextButtonActive, setIsNextButtonActive] = useState(false);

    const handleToggleAllAgree = () => {
        const newAllAgreeState = !allAgree;
        setAllAgree(newAllAgreeState);
        setAgreements({
            age : newAllAgreeState,
            service : newAllAgreeState,
            community : newAllAgreeState,
            privacy : newAllAgreeState,
            identity : newAllAgreeState,
        });
    };

    const handleToggleAgree = (key) => {
        setAgreements(prev => ({
            ...prev,
            [key] : !prev[key],
        }));
    };

    useEffect(() => {
 
        const allRequiredAgreed = Object.values(agreements).every(value => value === true);
        
        setAllAgree(allRequiredAgreed);

        setIsNextButtonActive(allRequiredAgreed);

    }, [agreements]); 

        const handleNext = () => {
        if (isNextButtonActive) {
            navigate('/signup/step1'); // 활성화 상태일 때만 /main 경로로 이동
        } else {
            alert('모든 필수 약관에 동의해주세요.');
        }
    };
    return (
        <div className="total_ct">
        <SignUpUse />

        <p className="booster-first"> 부스터가 처음이시군요! <br />
        이용약관의 동의가 필요해요
        </p>

        <div className="signup-agree">
            <div className="agree-all-img-ct">
            <button onClick={handleToggleAllAgree} style={{ backgroundColor: allAgree ? '#FF4500' : '' }}>
            <img src={SgChoose} alt="체크표시"></img>
            </button>
            </div>
            <p> 약관 전체동의</p>    
        </div>        

        <div className="sg-line">
            <img src={Sghr1} alt="줄"></img>
        </div>

        <section className="agree-ct">
            <div className="agree-check-ct">
                <div className="essential-ct">
                <button onClick={() => handleToggleAgree('age')}><img src={agreements.age ? SgChoose4 : SgChoose2} alt="체크표시"></img></button>
                <p> 만 14세 이상입니다. </p>
                </div>
            </div>

            <div className="agree-check-ct">
                <div className="essential-ct">
                    <button onClick={() => handleToggleAgree('service')}>
                        <img src={agreements.service ? SgChoose4 : SgChoose2} alt="체크표시" />
                    </button>
                    <p> [필수] 서비스 이용약관 </p>
                </div>
                <button onClick={() => navigate('/signup/service')}><img src={SgChoose3} alt="이동버튼"></img></button>
            </div>

            <div className="agree-check-ct">
                <div className="essential-ct">
                    <button onClick={() => handleToggleAgree('community')}>
                        <img src={agreements.community ? SgChoose4 : SgChoose2} alt="체크표시" />
                    </button>
                <p> [필수] 커뮤니티 이용규칙 확인 </p>
                </div>
                 <button onClick={() => navigate('/signup/community')}><img src={SgChoose3} alt="이동버튼"></img></button>
            </div>

            <div className="agree-check-ct">
                <div className="essential-ct">
                    <button onClick={() => handleToggleAgree('privacy')}>
                        <img src={agreements.privacy ? SgChoose4 : SgChoose2} alt="체크표시" />
                    </button>
                 <p> [필수] 개인정보 수집 및 이용 동의 </p>
                </div>
                 <button onClick={() => navigate('/signup/pi')}><img src={SgChoose3} alt="이동버튼"></img></button>
            </div>
            
            <div className="agree-check-ct">
                <div className="essential-ct">
                <button onClick={() => handleToggleAgree('identity')}>
                    <img src={agreements.identity ? SgChoose4 : SgChoose2} alt="체크표시" />
                </button>
                    <p> [필수] 본인 명의 가입 진행 </p>
                </div>
            </div>

            <div className="plus-info">
                <p className="info2"> 부모님, 친구 등 타인의 명의로 가입할 수 없습니다.</p>
                <p className="info3"> Booster는 안전하고 신뢰할 수 있는 커뮤니티를 위해 회원님의 본인 여부를 확인하고, 학교 인증을 통해 재학 여부를 검증합니다. 두 정보가 모두 확인되어야 서비스 이용이 가능합니다.
                </p>
            </div>
        </section>

        <div className="signup-next-btn-ct">
        <button onClick={handleNext} className="signup-next" style={{backgroundColor : isNextButtonActive ? '#FF4500' : ''}}> 다음 </button>
        </div>

        </div>
    )
}

export default SignUpPg;