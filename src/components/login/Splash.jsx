import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import '../../components/login/splash.css'
import { Boosterlogo } from "../../img/img";
function Splash() {

    const navigate = useNavigate();

        useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/login'); 
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);
    return (
        <div className="total_ct2">
            <div className="splash-img-ct">
            <img src={Boosterlogo} alt="부스터로고"></img>
            </div>

            <p className="splash-booster"> Booster </p>
        </div>
    )
}

export default Splash;