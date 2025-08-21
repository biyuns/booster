import '../../components/mainpg/mainPg.css';
import main_logo from '../../img/main-logo.svg';
import ai_research from '../../img/main-ai-search.svg';
import board from '../../img/board.svg';
import boon from '../../img/boon.svg';
import chat from '../../img/chat.svg';
import my from '../../img/my.svg';
import home_red from '../../img/home_red.svg';
import kimchi from '../../img/img-boon/kimchi.svg';
import boonicon from '../../img/boonicon.svg';
import location from '../../img/location.svg';
import whitelogo from '../../img/whitelogo.svg';
import geul1 from '../../img/geul1.svg';
import geul2 from '../../img/geul2.svg';
import geul3 from '../../img/geul3.svg';
import heart from '../../img/heart.svg';
function MainPg() {
    return (
        <div className="total_ct">
            <p className="main-title"> Booster </p>
            <section className="ai-ct">
                <div className="ai-text-ct">
                    <p> 학교 생활, 어렵게 <br /> 느껴진다면 지금 당장!</p>
                    <img src={main_logo}></img>
                </div>

                <div className="ai-search-ct">
                    <input type='text' placeholder='Booster에게 무엇이든 물어보세요 :) '></input>
                    <img src={ai_research}></img>
                </div>
            </section>

            <section className="main-banner">
                <p className="banner-text1"> 교내 소식 & 꿀팁, <br/> 더 이상 놓치지 마세요!</p>
                <p className="banner-text2"> 시간표, 맛집, 게시판까지 Booster에서 만나보세요 :) </p>
            </section>

        <section className="middle-ct">
            <section className="today-food-ct">
                <div className="food-text-ct">
                    <p className="food-text1"> 오늘의 추천 맛집</p>
                    <p className="food-text2"> 더보기 &gt; </p>
                </div>

                <div className="food-list-ct">
                    <div className="food-ct">
                        <div className="food-img-ct">
                        </div>
                        <div className="food-list-text">
                            <p> 김치찜의 정석</p>
                            <div className="food-total-ct">
                            <section className="food-location-ct">
                                <img src={location}></img>
                                <p> 경기 성남시 중원구 산성대로 566 </p>
                            </section>

                            <section className="food-boon-ct">
                                <img src={boonicon}></img>
                                <p> 전 메뉴 1인당 10% 할인</p>
                            </section>
                            </div>
                        </div>

                        
                    </div>
                    
                    <div className="food-ct">
                        <div className="food-img-ct">
                        </div>
                        <div className="food-list-text">
                            <p> 김치찜의 정석</p>
                            <div className="food-total-ct">
                            <section className="food-location-ct">
                                <img src={location}></img>
                                <p> 경기 성남시 중원구 산성대로 566 </p>
                            </section>

                            <section className="food-boon-ct">
                                <img src={boonicon}></img>
                                <p> 전 메뉴 1인당 10% 할인dpdpddpdpdpdpdpdpdpdpdpdpdpdp</p>
                            </section>
                            </div>
                        </div>

                        
                    </div>

                </div>


            </section>
            <section className="today-food-ct">
                <div className="food-text-ct">
                    <p className='food-text1'> 인기 게시글</p>
                    <p className='food-text2'> 더보기 &gt; </p>
                </div>


            <div className="issue-total-ct">
                <div className="issue-list-ct">
                    <section className="list-top-ct">
                        <div className="list-img-ct">
                        <img src={whitelogo}></img>
                        </div>

                        <div className="list-top-text-ct">
                            <p className="list-text"> 익명</p>
                            <p className="list-date"> 08/12 16:35</p>
                        </div>
                    </section>
                    
                    <p className="geul-title"> 나만 아는 을지대 숨은 맛집</p>
                    <p className="geul-content">맨날 학교 앞에서 뭐 먹을지 고민하면 여기 가봐.가격 착하고, 양 푸짐하고, 사장님도 친절 혼밥도 편하고, 친구들이랑 가도 딱 좋음...</p>

                    <div className="list-bottom-ct">
                        <section className="comment-ct">
                            <div className="comment-img-ct">
                            <img src={geul3}></img>
                            <img src={geul2}></img>
                            <img src={geul1}></img>
                            </div>
                            <p> 32</p>
                        </section>

                        <section className="heart-ct">
                            <div className="heart-img-ct">
                            <img src={heart}></img>
                            </div> 
                            <p> 59</p>
                        </section>
                    </div>
                </div>

                                <div className="issue-list-ct">
                    <section className="list-top-ct">
                        <div className="list-img-ct">
                        <img src={whitelogo}></img>
                        </div>

                        <div className="list-top-text-ct">
                            <p className="list-text"> 익명</p>
                            <p className="list-date"> 08/12 16:35</p>
                        </div>
                    </section>
                    
                    <p className="geul-title"> 나만 아는 을지대 숨은 맛집</p>
                    <p className="geul-content">맨날 학교 앞에서 뭐 먹을지 고민하면 여기 가봐.가격 착하고, 양 푸짐하고, 사장님도 친절 혼밥도 편하고, 친구들이랑 가도 딱 좋음...</p>

                    <div className="list-bottom-ct">
                        <section className="comment-ct">
                            <div className="comment-img-ct">
                            <img src={geul3}></img>
                            <img src={geul2}></img>
                            <img src={geul1}></img>
                            </div>
                            <p> 32</p>
                        </section>

                        <section className="heart-ct">
                            <div className="heart-img-ct">
                            <img src={heart}></img>
                            </div> 
                            <p> 59</p>
                        </section>
                    </div>
                </div>
            </div>
            </section>
        </section>
            <footer className="main-footer">
                    <img src={home_red}></img>
                    <img src={board}></img>
                    <img src={chat}></img>
                    <img src={boon}></img>
                    <img src={my}></img>
            </footer>
        </div>
    )
}

export default MainPg;