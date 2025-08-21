import '../../components/boon/boon_food.css';
import { Home, Board, Chat, Boon_red, My,
    Beetoon, Vboadrdgame, Homesandrupang} from '../../img/img';
import BoonItem from './boon-item';

function Boonmolan() {
     const storeData = [
        {
            id : 1,
            name : '벌툰 파리지앵',
            image : Beetoon,
            location : '경기 성남시 중원구 둔촌대로101번길 M타워 4층',
            benefit : '음료 포함패키지20%할인 (주말, 공휴일 제외)'
        },
        {
            id : 2,
            name : '브이보드게임카페',
            image : Vboadrdgame,
            location : '경기 성남시 중원구 광명로16번길 4 3층',
            benefit : '이용료 10% 할인'
        },
            {
            id : 2,
            name : '홈즈앤푸랑 보드게임카페',
            image : Homesandrupang,
            location : '경기 성남시 수정구 산성대로 269 6층',
            benefit : '시간 요금제 20% 할인\n(타이벤트 쿠폰과 중복불가 인메뉴 필수)'
        }
    ]
    return (
        <div className="total_ct">
            <p className="boon-booster"> Booster </p>
            <div className="boon-total-ct">
                <p> 을지대 제휴 혜택</p>
                <section className="boon-category-ct">
                    <button className="boon-food-category" style={{background: '#BCBCBC'}}>식당</button>
                    <button className="boon-cafe-category">카페, 빵집</button>
                    <button className="boon-fitness-category">운동시설</button>
                    <button className="boon-molan-category" style={{background: '#FF4500'}}>모란,신흥</button>
                    <button className="boon-etc-category">기타</button>
                </section>

              <div className="boon-contant-total-ct" style={{paddingBottom: '0px'}}>
                {storeData.map(store=> (
                    <BoonItem
                    key={store.id}
                    name={store.name}
                    image={store.image}
                    location={store.location}
                    benefit={store.benefit}
                    />    
                ))}
              </div>  

            <footer className="main-footer">
                    <img src={Home}></img>
                    <img src={Board}></img>
                    <img src={Chat}></img>
                    <img src={Boon_red}></img>
                    <img src={My}></img>
            </footer>

            </div>

        </div>
    )
}

export default Boonmolan;