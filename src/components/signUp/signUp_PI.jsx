import '../../components/signUp/signup-agree.css'
import { useNavigate } from "react-router-dom";
import SignUpUse2 from "../header/SignUpUse2";
function SignUpPI(){
    const navigate = useNavigate();
    return (
        <div className="total_ct">
               <SignUpUse2 />

            <p className="signup-pi-title"> 개인 정보 수집 및 이용 동의</p>
            <p className="signup-pi-contant"> 
                booster 개인정보 수집 및 이용 안내 <br/><br/>

for춘쿠키 주식회사(이하 ‘회사’)는 회원님께 보다 나은 서비스를<br/>
제공하기 위해 아래와 같이 개인정보를 수집·이용합니다.<br/>
회사는 통합 로그인 및 데이터 관리 시스템을 기반으로 Booster<br/>
 및 부수 서비스(이하 ‘서비스’)를 제공하고 관리합니다.<br/>
1. 회원가입 및 서비스 이용<br/>
구분수집 및 이용 목적수집하는 개인정보 항목보유 및 이용 기간<br/>
필수 항목- 아이디 및 비밀번호 찾기<br/>
- 회원가입 및 이용자 식별<br/>
- 문의 및 민원 처리이메일회원 탈퇴 시까지선택 항목- Booster<br/>
AI 서비스 제공 및 성능·알고리즘 개선<br/>
- 서비스 관련 추천 알고리즘 개선<br/>
- 구매 및 결제 상품 정보 관리- AI와 주고받은 대화 정보(이미지<br/>
 및 영상 포함)<br/>
 - 서비스 이용 행태 정보(입력 정보 및 결과물)<br/>
 - 닉네임, 직업, 성별, 생년월일, 전화번호, 목표, 관심사<br/>
 - 구매자 기입 정보 및 구매 상품 정보회원 탈퇴 시까지<br/>
※ 정보주체는 개인정보 수집 및 이용에 동의하지 않을 권리가 있<br/>
으나, 동의를 거부할 경우 서비스 이용에 제한이 있을 수 있습니다.</p>
        
                <div className="signup-service-btn-ct">
        <button className="signup-service-next" onClick={() => navigate('/signup')} > 확인 </button>
        </div>
        
        </div>

        
    )
}

export default SignUpPI;