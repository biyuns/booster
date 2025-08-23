import '../../styles/total.css'
import '../../components/signUp/signup3.css'

import { useNavigate } from 'react-router-dom';
import { SignUpCom } from '../../img/img';
import SignupHeader3 from '../header/SignupHeader3';

function SignUpPg3() {
    
    const navigate = useNavigate();
    return (
        <div className="total_ct">
            <SignupHeader3 num={3} />
            <div className="signup3-img-ct">
                <img src={SignUpCom} alt="회원가입 완료"></img>
            </div>

            <p className='signup3-complete'> 회원가입 완료</p>

            <p className='signup3-chuk'> 가입을 축하합니다. </p>

            <button className='signup3-button'onClick={() => navigate('/main')}> 확인 </button>

        </div>

    )
}

export default SignUpPg3;