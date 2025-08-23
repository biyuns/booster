import { Profileback } from "../../img/img"
import '../../components/header/SignUpUse.css'
import { useNavigate } from "react-router-dom";
function SignUpUse() {  
    const navigate = useNavigate();
    return (
            <img className="signup-use" src={Profileback} onClick={() => navigate('/')} alt="뒤로가기버튼"/>
    )
}

export default SignUpUse;