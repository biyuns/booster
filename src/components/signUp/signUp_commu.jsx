import '../../components/signUp/signup-agree.css'
import { Navigate, useNavigate } from "react-router-dom";
import SignUpUse2 from "../header/SignUpUse2";
function SignUpCommu() {
    const navigate = useNavigate();
    return (
        <div className="total_ct">
            <SignUpUse2 />

            <p className='signup-commu-title'> 커뮤니티 이용규칙 확인</p>
            <p className='signup-commu-contant'>
                 Booster 커뮤니티 이용규칙<br/>
목적<br/>
· 커뮤니티 서비스 운영 목적과 약관 적용 범위 명시<br/>
· 예: “본 약관은 for춘쿠키 주식회사가 운영하는 커뮤니티 서비<br/>
스의 이용 조건 및 절차, 회원의 권리와 의무, 게시물 관리 등에<br/>
관한 사항을 규정함을 목적으로 합니다.”<br/>
정의<br/>
· 게시물, 댓글, 운영자, 회원, 포인트, 제재 등의 용어 정의<br/>
가입 및 이용 자격<br/>
·커뮤니티 이용이 가능한 회원 자격(예: 실명 인증, 특정 학교 재<br/>
학 인증 등)<br/>
·금지 회원 유형(타인의 명의 도용, 제재 이력 있는 자 등)<br/>
이용자의 의무<br/>
· 법령 및 약관 준수<br/>
· 건전한 커뮤니티 문화 유지<br/>
· 금지 행위(허위정보, 불법·음란·폭력물, 광고, 도배, 개인정보<br/>
노출, 분란 조장 등)<br/>
·게시물의 관리 및 저작권<br/>
· 게시물 저작권은 작성자에게 있음<br/>
· 회사는 서비스 품질 향상, 홍보 목적으로 활용 가능<br/>
· 불법·부적절한 게시물에 대한 삭제/비공개 <br/>
신고 및 제재<br/>
· 신고 절차(회원·운영자 신고 가능)<br/>
· 제재 단계(경고 → 일정 기간 이용 정지 →<br/> 영구 이용 정지)<br/>
· 제재 사유 구체화<br/>
게시물 삭제 및 계정 해지<br/>
· 본인이 삭제 요청 가능<br/>
· 게시물 삭제 시 보상 포인트 환수 규정<br/>
· 이용계약 해지 절차<br/>
면책 조항<br/>
· 회원이 올린 콘텐츠에 대한 법적 책임은 작성자 본인에게 있음<br/>
· 회사의 고의·중과실이 없는 경우, 게시물로 인한 피해에 대해<br/>
책임 없음<br/>
분쟁 해결<br/>
· 대한민국 법률 적용<br/>
· 관할 법원 명시</p>

                <div className="signup-service-btn-ct">
        <button className="signup-service-next" onClick={() => navigate('/signup')} > 확인 </button>
        </div>
        
        </div>
    )
}

export default SignUpCommu;