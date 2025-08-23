import dot from '../../img/signupdot.svg';
import './signup-header.css'

function Signup_header_dot() {
    return (
        <div className='dot-ct'>
            <img src={dot}></img>
            <img src={dot}></img>
            <img src={dot}></img>
        </div>
    )
}

export default Signup_header_dot;