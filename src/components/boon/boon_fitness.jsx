// import '../../components/boon/boon_food.css';
// import { Home, Board, Chat, Boon_red, My,
//     Atopgym, Kickbackgym} from '../../img/img';
// import BoonItem from './boon-item';

// function Boonfitness() {
//      const storeData = [
//         {
//             id : 1,
//             name : '에이탑짐',
//             image : Atopgym,
//             location : '경기 성남시 중원구 산성대로 518 3층',
//             benefit : '3개월 등록시 1개월 추가\n(센터내 이벤트와 중복혜택불가)'
//         },
//         {
//             id : 2,
//             name : '킥복싱백짐',
//             image : Kickbackgym,
//             location : '경기 성남시 수정구 논골로 5 2층(단대동)',
//             benefit : '신규 1개월 등록시 7일 추가 증정, 신규 8개월 등록 시 \n2주 추가 증정 + 20,000원 상당 사은품 증정'
//         }
//     ]
//     return (
//         <div className="total_ct">
//             <p className="boon-booster"> Booster </p>
//             <div className="boon-total-ct">
//                 <p> 을지대 제휴 혜택</p>
//                 <section className="boon-category-ct">
//                     <button className="boon-food-category" style={{background: '#BCBCBC'}}>식당</button>
//                     <button className="boon-cafe-category">카페, 빵집</button>
//                     <button className="boon-fitness-category" style={{background: '#FF4500'}}>운동시설</button>
//                     <button className="boon-molan-category">모란,신흥</button>
//                     <button className="boon-etc-category">기타</button>
//                 </section>

//               <div className="boon-contant-total-ct" style={{paddingBottom: '0px'}}>
//                 {storeData.map(store=> (
//                     <BoonItem
//                     key={store.id}
//                     name={store.name}
//                     image={store.image}
//                     location={store.location}
//                     benefit={store.benefit}
//                     />    
//                 ))}
//               </div>  

//             <footer className="main-footer">
//                     <img src={Home}></img>
//                     <img src={Board}></img>
//                     <img src={Chat}></img>
//                     <img src={Boon_red}></img>
//                     <img src={My}></img>
//             </footer>

//             </div>

//         </div>
//     )
// }

// export default Boonfitness;