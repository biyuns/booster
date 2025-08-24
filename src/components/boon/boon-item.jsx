
import { BoonlocationLogo, BoonBoonlogo } from '../../img/img';

function BoonItem({ image, name, location, benefit }) {
    return (
        <section className="boon-contant-ct">
            <img src={image} alt={`${name} 매장 이미지`} /> 
            <div className="boon-contant-right-ct">
                <p> {name} </p>
                <div className="boon-location-ct">
                    <img src={BoonlocationLogo} alt="위치 아이콘" />
                    <p> {location}</p>
                </div>
                <div className="boon-boon-ct">
                    <img src={BoonBoonlogo} alt="혜택 아이콘" />
                    <p> {benefit} </p>
                </div>
            </div>
        </section>
    );
}

export default BoonItem;
