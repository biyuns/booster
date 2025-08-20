import '../../styles/total.css'
import './login.css';

function LoginPg() {
    return (
        <div className="total_ct">
            <p className="login_text"> 안녕하세요 :) <br /> 부스터 입니다.  </p>
            <section className="login-form">
                <div className="email-ct">
                    <label className="login-email"> 이메일 </label>
                    <input tyep="email" id="email" name="email" placeholder="이메일 주소를 입력해 주세요." required></input>
                </div>

                <div className="password-ct">
                    <label className="login-password"> 비밀번호 </label>
                    <input tyep="password" id="password" name="password" placeholder="비밀번호를 입력해주세요." required></input>
                </div>
            </section>

            <p className="forget-password"> 비밀번호를 잊으셨나요? </p>

            <button className="login-button"> 로그인 </button>

            <hr className='login-line'/> 

            <section className="login-bottom"> 
                <p className="signup-msg"> Booster가 처음 이에요</p>
                <p className="signup-link"> 가입하기</p>    
            </section>
        </div>
    )
}

export default LoginPg;