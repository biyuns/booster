import '../../components/boon/boon_food.css';
import { Home, Board, Chat, Boon_red, My } from '../../img/img';
import BoonItem from './boon-item';
import { useNavigate } from 'react-router-dom';

function Booncafe() {
    const navigate = useNavigate();
const storeData = [
    {
        id : 1,
        name : '이디야커피',
        image : '/images/img-boon/ediya.svg',
        location : '경기 성남시 수정구 산성대로 529 1층',
        benefit : '테이크아웃 시 아메리카노(L) 1,800원, (EX) 2,500원, 밀크베버리지 무료 사이즈업 \n아이스티 주문 시 무료 사이즈업 + 무료 샷 추가'
    },
    {
        id : 2,
        name : '이너프',
        image : "/images/img-boon/inuf.svg",
        location : '경기 성남시 수정구 산성대로 569 1~2층',
        benefit : '17:00 이전 10% 할인, 17:00 이후 20% 할인(음료만) \n시험기간 2주간 24시 연장 + 음료 25% 할인'
    },
    {
        id : 3,
        name : '카페만월경',
        image : "/images/img-boon/mammonth.svg",
        location : '경기 성남시 수정구 산성대로 569 B1층',
        benefit : '쿠폰 도장 1개무료증정 \n(문자로 학생증 사진 + 쿠폰 도장 9개 인증)'
    },
    {
        id : 4,
        name : '홈그라운드',
        image : "/images/img-boon/homeground.svg",
        location : '경기 성남시 중원구 산성대로 578 4층, 5층',
        benefit : '10% 할인\n(전메뉴, 연습실 포함)'
    },
    {
        id : 5,
        name : 'B491',
        image : "/images/img-boon/B491.svg",
        location : '경기 성남시 수정구 산성대로 491 2층',
        benefit : '포장 주문 시 10개당 동일 음료 1잔 무료 제공, 매장 방문 시 사이즈업 or 샷추가 무료'
    },
    {
        id : 6,
        name : '베들레헴',
        image : "/images/img-boon/bethlehem.svg",
        location : '경기 성남시 중원구 산성대로 448-1',
        benefit : '20,000원 이상 구매시 크림빵 1개 무료 제공'
    }
]
    return (
        <div className="total_ct">
            <p className="boon-booster"> Booster </p>
            <div className="boon-total-ct">
                <p> 을지대 제휴 혜택</p>
                <section className="boon-category-ct">
                    <button onClick={() => navigate('/boon')} className="boon-food-category" style={{background: '#BCBCBC'}}>식당</button>
                    <button onClick={() => navigate('/boon/cafe')}className="boon-cafe-category" style={{background: '#FF4500'}}>카페, 빵집</button>
                    <button onClick={() => navigate('/boon/fitness')}className="boon-fitness-category">운동시설</button>
                    <button onClick={() => navigate('/boon/molan')}className="boon-molan-category">모란,신흥</button>
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

export default Booncafe;