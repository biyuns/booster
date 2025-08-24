import '../../components/boon/boon_food.css';
import { Home, Board, Chat, Boon_red, My } from '../../img/img';
import BoonItem from './boon-item';
import { useNavigate } from 'react-router-dom';

function Boonmolan() {
    const navigate = useNavigate();
const storeData = [
    {
        id : 1,
        name : '벌툰 파리지앵',
        image : "/images/img-boon/beetoon.svg",
        location : '경기 성남시 중원구 둔촌대로101번길 M타워 4층',
        benefit : '음료 포함패키지20%할인 (주말, 공휴일 제외)'
    },
    {
        id : 2,
        name : '브이보드게임카페',
        image : "/images/img-boon/vboardgame.svg",
        location : '경기 성남시 중원구 광명로16번길 4 3층',
        benefit : '이용료 10% 할인'
    },
    {
        id : 3,
        name : '홈즈앤푸랑 보드게임카페',
        image : "/images/img-boon/homesandrupang.svg",
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
                    <button onClick={() => navigate('/boon')} className="boon-food-category" style={{background: '#BCBCBC'}}>식당</button>
                    <button onClick={() => navigate('/boon/cafe')}className="boon-cafe-category">카페, 빵집</button>
                    <button onClick={() => navigate('/boon/fitness')}className="boon-fitness-category">운동시설</button>
                    <button onClick={() => navigate('/boon/molan')}className="boon-molan-category" style={{background: '#FF4500'}}>모란,신흥</button>
                    <button onClick={() => navigate('/boon/etc')}className="boon-etc-category">기타</button>
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
                    <img src={Home} alt="홈" onClick={() => navigate('/main')} />
                    <img src={Board} alt="게시판" onClick={() => navigate('/board')} />
                    <img src={Chat} alt="채팅" onClick={() => navigate('/chat')} />
                    <img src={Boon_red} alt="혜택" onClick={() => navigate('/boon')} />
                    <img src={My} alt="마이페이지" onClick={() => navigate('/mypage')} />
                </footer>

            </div>

        </div>
    )
}

export default Boonmolan;