import '../../components/boon/boon_food.css';
import { Home, Board, Chat, Boon_red, My } from '../../img/img';
import BoonItem from './boon-item';
import { useNavigate } from 'react-router-dom';



function Boonetc() {
     const navigate = useNavigate();

     const storeData = [
{
    id : 1,
    name : 'studycafe 공부다방',
    image : "/images/img-boon/studycafe.svg",
    location : '경기 성남시 수정구 산성대로 569 3,4층',
    benefit : '100시간권 또는 4주 정기권 이용시 해당 기간에 사용할 수 있는 사물함 제공'
},
{
    id : 2,
    name : '눈큰나라',
    image : "/images/img-boon/bigeye.svg",
    location : '경기 성남시 중원구 은이로 5번길 23',
    benefit : '안경구입 시 총 금액에서 10% 할인, 쿠퍼비전 1회용 렌즈 5회 \n구매시 1회 무료증정'
},
{
    id : 3,
    name : '찰떡드럼스튜디오',
    image : "/images/img-boon/chaldduck.svg",
    location : '경기 성남시 중원구 산성대로 512-1 3층',
    benefit : '레슨 4회 + 연습실 이용 18만원 -> 15만원(첫 등록시)'
},
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
                    <button onClick={() => navigate('/boon/molan')}className="boon-molan-category">모란,신흥</button>
                    <button onClick={() => navigate('/boon/etc')}className="boon-etc-category" style={{background: '#FF4500'}}>기타</button>
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

export default Boonetc;