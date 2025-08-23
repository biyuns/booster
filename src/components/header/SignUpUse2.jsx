import { Profileback } from "../../img/img"
import '../../components/header/SignUpUse.css'
import { Navigate, useNavigate } from "react-router-dom";
function SignUpUse2() {
    const navigate = useNavigate();
    return (
            <img className="signup-use" src={Profileback} onClick={() => navigate('/signup')} alt="뒤로가기버튼"/>
    )
}

export default SignUpUse2;