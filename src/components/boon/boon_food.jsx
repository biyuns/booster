import '../../components/boon/boon_food.css';
import { Home, Board, Chat, Boon_red, My } from '../../img/img';
import BoonItem from './boon-item';
import { useNavigate } from 'react-router-dom';

function BoonFood() {
    const navigate = useNavigate();
const storeData = [
    {
        id : 1,
        name : '롤링파스타',
        image : "/images/img-boon/rolling.svg",
        location : '경기 성남시 수정구 산성대로 529 1층',
        benefit : '매장에서 16,000원 이상 결제 시 음료 1개 서비스 제공(포장식사)'
    },
    {
        id : 2,
        name : '김치찜의 정석',
        image : "/images/img-boon/kimchi.svg",
        location : '경기 성남시 중원구 산성대로 566',
        benefit : '전 메뉴 1인당 10% 할인'
    },
    {
        id : 3,
        name : '타코슈퍼',
        image : "/images/img-boon/taco.svg",
        location : '경기 성남시 수정구 산성대로567번길 10 1층',
        benefit : '12,000원 이상 결제시 아이스티 or 아메리카노 무료'
    },
    {
        id : 4,
        name : '서울삼겹살',
        image : "/images/img-boon/seoul.svg",
        location : '경기 성남시 중원구 산성대로562번길 1',
        benefit : '테이블 당 소주, 맥주 음료중 1개 제공'
    },
    {
        id : 5,
        name : 'black jack bar',
        image : "/images/img-boon/jackbar.svg",
        location : '경기 성남시 중원구 은이로 12 2층',
        benefit : '19:00 ~ 21:00 결제금액 20% 할인 / 21:00 ~ 02 : 30 결제 금액 10% 할인 (금, 토제외)'
    },
    {
        id : 6,
        name : '주야짬뽕',
        image : "/images/img-boon/juya.svg",
        location : '경기 성남시 수정구 산성대로 517',
        benefit : '현금 or 계좌이체시 일부메뉴 1,000원 할인 (자세한 메뉴는 가게 메뉴판 확인)'
    },
    {
        id : 7,
        name : '철뚝집',
        image : "/images/img-boon/cheul.svg",
        location : '경기 성남시 중원구 광명로 95 1층 철뚝집',
        benefit : '모든 메뉴 10% 할인, 음료수 서비스'
    },
    {
        id : 8,
        name : '남해바다멸치국수',
        image : "/images/img-boon/chinoodle.svg",
        location : '경기 성남시 중원구 산성대로 576 1층',
        benefit : '현금 or 계좌이체시 곱뺴기 무료'
    },
    {
        id : 9,
        name : '미뜨레피자',
        image : "/images/img-boon/meddupizza.svg",
        location : '경기 성남시 중원구 산성대로 562번길 3 1층',
        benefit : '홀 이용시 3,000원 할인'
    },
    {
        id : 10,
        name : '천미향훠궈',
        image : "/images/img-boon/skyhuygyu.svg",
        location : '경기 성남시 수정구 산성대로552번길 2 2층',
        benefit : '훠궈 2인당음료 1개제공, 마라탕고기 추가2,000원'
    },
    {
        id : 11,
        name : '통통쭈꾸미',
        image : "/images/img-boon/tongtongjuggu.svg",
        location : '경기 성남시 수정구 산성대로 513',
        benefit : '11:30 ~ 14:00까지 테이블 당음료 한캔서비스'
    },
    {
        id : 12,
        name : '행복식당',
        image : "/images/img-boon/happyfood.svg",
        location : '경기 성남시 수정구 산성대로 581',
        benefit : '헌금or계좌이체시 모든메뉴 1000원 할인(주류제외)'
    },
    {
        id : 13,
        name : '썬더치킨',
        image : "/images/img-boon/zeuschicken.svg",
        location : '경기 성남시 중원구 산성대로 538 1층',
        benefit : '2마리당 음료수 한캔 제공 계좌이체 or 현금 결제, 홀에서만'
    },
    {
        id : 14,
        name : '정든 양갈비',
        image : "/images/img-boon/jihoonyang.svg",
        location : '경기 성남시 중원구 산성대로 576 2층',
        benefit : '현금 or 계좌이체 시 10% 할인'
    },
    {
        id : 15,
        name : '백합식당',
        image : "/images/img-boon/whiteaddfood.svg",
        location : '경기 성남시 수정구 산성대로 503 1층 1호',
        benefit : '12:00 ~ 15:00 , 샤브샤브:13,000 , 칼국수:8,000'
    },
    {
        id : 16,
        name : '명륜진사갈비',
        image : "/images/img-boon/galbe.svg",
        location : '경기 성남시 중원구 은이로 6 2층',
        benefit : '1인기준금액 10% 할인(계좌이체 or 현금)'
    }
]

    return (
        <div className="total_ct">
            <p className="boon-booster"> Booster </p>
            <div className="boon-total-ct">
                <p> 을지대 제휴 혜택</p>
                <section className="boon-category-ct">
                    <button className="boon-food-category" onClick={() => navigate('/boon')}>식당</button>
                    <button className="boon-cafe-category" onClick={() => navigate('/boon/cafe')}>카페, 빵집</button>
                    <button className="boon-fitness-category" onClick={() => navigate('/boon/fitness')}>운동시설</button>
                    <button className="boon-molan-category" onClick={() => navigate('/boon/molan')}>모란,신흥</button>
                    <button className="boon-etc-category" onClick={() => navigate('/boon/etc')}>기타</button>
                </section>

              <div className="boon-contant-total-ct">
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

export default BoonFood;