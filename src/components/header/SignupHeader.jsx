import '../../styles/total.css'
import '../../components/header/signup-header.css'
import { Profileback } from '../../img/img';
import SignupHeaderDot from './SignupHeaderDot';



function Signup_header({ num }) {
    return (
        <header>

            <div className='header-num-ct'>
                <img src={Profileback} alt="뒤로가기버튼"></img>
                <div className='signup-num1' id={num === 1 ? "color-num" : undefined}>1</div>
                <SignupHeaderDot />
                <div className='signup-num2' id={num === 2 ? "color-num" : undefined}>2</div>
                <SignupHeaderDot />
                <div className='signup-num3' id={num === 3 ? "color-num" : undefined}>3</div>
            </div>
            <div className='header-p-ct'>
                <p id={num === 1 ? "block" : undefined}>기본 정보</p>
                <p id={num === 2 ? "block" : undefined}>학생 정보</p>
                <p id={num === 3 ? "block" : undefined}>승인대기</p>
            </div>
        </header>
    )
}

export default Signup_header;