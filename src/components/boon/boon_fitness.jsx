import '../../components/boon/boon_food.css';
import { Home, Board, Chat, Boon_red, My } from '../../img/img';
import BoonItem from './boon-item';
import { useNavigate } from 'react-router-dom';

function Boonfitness() {
    const navigate = useNavigate();
const storeData = [
    {
        id : 1,
        name : '에이탑짐',
        image : "/images/img-boon/atopgym.svg",
        location : '경기 성남시 중원구 산성대로 518 3층',
        benefit : '3개월 등록시 1개월 추가\n(센터내 이벤트와 중복혜택불가)'
    },
    {
        id : 2,
        name : '킥복싱백짐',
        image : "/images/img-boon/kickbackgym.svg",
        location : '경기 성남시 수정구 논골로 5 2층(단대동)',
        benefit : '신규 1개월 등록시 7일 추가 증정, 신규 8개월 등록 시 \n2주 추가 증정 + 20,000원 상당 사은품 증정'
    }
]
    return (
        <div className="total_ct">
            <p className="boon-booster"> Booster </p>
            <div className="boon-total-ct">
                <p> 을지대 제휴 혜택</p>
                <section className="boon-category-ct">
                    <button onClick={() => navigate('/boon')}className="boon-food-category" style={{background: '#BCBCBC'}}>식당</button>
                    <button onClick={() => navigate('/boon/cafe')} className="boon-cafe-category">카페, 빵집</button>
                    <button onClick={() => navigate('/boon/fitness')}className="boon-fitness-category" style={{background: '#FF4500'}}>운동시설</button>
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

export default Boonfitness;