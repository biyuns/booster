import '../../components/mainpg/mainPg.css';
import board from '../../img/board.svg';
import boon from '../../img/boon.svg';
import chat from '../../img/chat.svg';
import my from '../../img/my.svg';
import home_red from '../../img/home_red.svg';
import boonicon from '../../img/boonicon.svg';
import location from '../../img/location.svg';
import whitelogo from '../../img/whitelogo.svg';
import geul1 from '../../img/geul1.svg';
import geul2 from '../../img/geul2.svg';
import geul3 from '../../img/geul3.svg';
import heart from '../../img/heart.svg';
import React, {useState, useEffect} from 'react';
import apiClient  from '../../api/apiClient';
import { MgMainMove } from '../../img/img';
import { useNavigate } from 'react-router-dom';

const MOCK_POPULAR_POSTS = [
    {
        post_id: 1,
        title: "나만 아는 을지대 숨은 맛집",
        content_preview: "맨날 학교 앞에서 뭐 먹을지 고민하면 여기 가봐.가격 착하고, 양 푸짐하고, 사장님도 친절...",
        is_anonymous: true,
        author_nickname: null,
        create_post_time: "2025-08-24T10:30:00",
        comment_count: 32,
        like_count: 59,
        profile_image_url: null,
        category: "FREE"
    },
    {
        post_id: 2,
        title: "중간고사 A+ 받는 꿀팁 공유",
        content_preview: "시험 기간 다들 힘드시죠? 제가 사용하는 공부법이랑 족보 얻는 꿀팁 공유합니다. 다들 이걸로 성적 올려보세요!",
        is_anonymous: false,
        author_nickname: "의예과 선배",
        create_post_time: "2025-08-23T18:00:00",
        comment_count: 15,
        like_count: 88,
        profile_image_url: null,
        category: "INFO"
    },
    {
        post_id: 3,
        title: "이번주 학식 메뉴 실시간 업데이트",
        content_preview: "오늘 점심은 돈까스, 저녁은 제육덮밥! 사진이랑 같이 매일 업데이트 해드릴게요. 학식 메이트 구합니다.",
        is_anonymous: false,
        author_nickname: "학식요정",
        create_post_time: "2025-08-24T09:00:00",
        comment_count: 21,
        like_count: 45,
        profile_image_url: null,
        category: "FOOD"
    },
    {
        post_id: 4,
        title: "같이 스터디할 팀원 구해요 (의료경영)",
        content_preview: "의료경영학과 전공 과목 같이 공부하실 분 2명 구합니다. 주 2회 중앙도서관에서 진행 예정이에요.",
        is_anonymous: false,
        author_nickname: "스터디원모집",
        create_post_time: "2025-08-22T14:20:00",
        comment_count: 8,
        like_count: 12,
        profile_image_url: null,
        category: "STUDY"
    },
    {
        post_id: 5,
        title: "총학생회에서 알립니다: 가을 축제 일정 안내",
        content_preview: "2025년 가을 축제가 9월 25일부터 26일까지 진행됩니다. 초청 가수 라인업과 부스 정보를 확인하세요!",
        is_anonymous: false,
        author_nickname: "총학생회",
        create_post_time: "2025-08-21T11:00:00",
        comment_count: 102,
        like_count: 250,
        profile_image_url: null,
        category: "NOTICE"
    },
    {
        post_id: 6,
        title: "학교 근처 단기 알바 구합니다.",
        content_preview: "방학 동안 같이 일할 분 찾습니다. 시급 좋고 분위기도 좋아요. 자세한 내용은 쪽지 주세요.",
        is_anonymous: true,
        author_nickname: null,
        create_post_time: "2025-08-24T13:00:00",
        comment_count: 5,
        like_count: 18,
        profile_image_url: null,
        category: "JOB"
    },
    {
        post_id: 7,
        title: "잃어버린 에어팟 프로 찾아주세요 ㅠㅠ",
        content_preview: "오늘 오후 2시쯤 중앙도서관 1열람실에서 에어팟 프로를 잃어버렸습니다. 케이스에 스티커 붙어있어요.",
        is_anonymous: false,
        author_nickname: "울고싶다",
        create_post_time: "2025-08-24T14:30:00",
        comment_count: 3,
        like_count: 22,
        profile_image_url: null,
        category: "LOST"
    },
    {
        post_id: 8,
        title: "기숙사 룸메이트 구해요 (여자)",
        content_preview: "2학기 같이 쓸 룸메이트 구합니다. 깔끔하고 비흡연자이신 분 환영해요. 서로 배려하면서 잘 지내봐요!",
        is_anonymous: false,
        author_nickname: "25학번새내기",
        create_post_time: "2025-08-20T20:00:00",
        comment_count: 9,
        like_count: 31,
        profile_image_url: null,
        category: "DORM"
    }
];

function MainPg() {
    
    const [popularPosts, setPopularPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

 useEffect(() => {
        const fetchPopularPosts = async () => {
            try {
                const response = await apiClient.get('/booster/home');
                const sortedData = response.data.sort((a, b) => 
                    new Date(b.create_post_time) - new Date(a.create_post_time)
                );
                setPopularPosts(sortedData);
            } catch (err) {
                console.error("API 연동 실패. 임시 데이터를 사용합니다.", err.response?.status || err.message);
                const sortedMockData = [...MOCK_POPULAR_POSTS].sort((a, b) => 
                    new Date(b.create_post_time) - new Date(a.create_post_time)
                );
                setPopularPosts(sortedMockData);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPopularPosts();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${month}/${day} ${hours}:${minutes}`;
    };

    return (
        <div className="total3_ct">
            <p className="main-title" onClick={() => navigate('/main')}> Booster </p>
            <section className="ai-ct">
                <div className="ai-text-ct">
                    <p> 학교 생활, 어렵게 <br /> 느껴진다면 지금 당장!</p>
                    <img src="/images/main-logo.svg" alt="로고" onClick={() => navigate('/chat')}></img>
                </div>

                <div className="ai-search-ct">
                    <input type='text' placeholder='Booster에게 무엇이든 물어보세요 :) '></input>
                    <img src={MgMainMove} alt="검색버튼"></img>
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
                    <p className="food-text2" onClick={() => navigate('/boon')}> 더보기 &gt; </p>
                </div>

                <div className="food-list-ct">
                    <div className="food-ct">
                        <div className="food-img-ct">
                        </div>
                        <div className="food-list-text">
                            <p> 김치찜의 정석</p>
                            <div className="food-total-ct">
                            <section className="food-location-ct">
                                <img src={location} alt="위치"></img>
                                <p> 경기 성남시 중원구 산성대로 566 </p>
                            </section>

                            <section className="food-boon-ct">
                                <img src={boonicon} alt="혜택"></img>
                                <p> 전 메뉴 1인당 10% 할인</p>
                            </section>
                            </div>
                        </div>

                        
                    </div>
                    
                    <div className="food-ct">
                        <div className="food2-img-ct">
                        </div>
                        <div className="food-list-text">
                            <p> B491</p>
                            <div className="food-total-ct">
                            <section className="food-location-ct">
                                <img src={location} alt="위치"></img>
                                <p> 경기 성남시 수정구 산성대로 491 2층, </p>
                            </section>

                            <section className="food-boon-ct">
                                <img src={boonicon} alt="혜택"></img>
                                <p> 포장 주문 시 10개당 동일 음료 1잔 무료 제공, 매장 방문 시 사이즈업 or 샷추가 무료</p>
                            </section>
                            </div>
                        </div>

                        
                    </div>

                </div>


            </section>

    <section className="today-food-ct">
                    <div className="food-text-ct">
                        <p className='food-text1'> 인기 게시글</p>
                        <p className='food-text2' onClick={() => navigate('/board')}> 더보기 &gt; </p>
                    </div>
                    <div className="issue-total-ct">
                        {isLoading && <p>게시글을 불러오는 중...</p>}
                        
                        {!isLoading && popularPosts.map(post => (
                            <div className="issue-list-ct" key={post.post_id}>
                                <section className="list-top-ct">
                                    <div className="list-img-ct">
                                        <img src={post.profile_image_url || whitelogo} alt="프로필"></img>
                                    </div>
                                    <div className="list-top-text-ct">
                                        <p className="list-text">{post.is_anonymous ? '익명' : post.author_nickname}</p>
                                        <p className="list-date">{formatDate(post.create_post_time)}</p>
                                    </div>
                                </section>
                                
                                <p className="geul-title">{post.title}</p>
                                <p className="geul-content">{post.content_preview}</p>

                                <div className="list-bottom-ct">
                                    <section className="comment-ct">
                                        <div className="comment-img-ct">
                                            <img src={geul3} alt=""></img>
                                            <img src={geul2} alt=""></img>
                                            <img src={geul1} alt=""></img>
                                        </div>
                                        <p>{post.comment_count}</p>
                                    </section>
                                    <section className="heart-ct">
                                        <div className="heart-img-ct">
                                            <img src={heart} alt="공감수"></img>
                                        </div> 
                                        <p>{post.like_count}</p>
                                    </section>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </section>
            <footer className="main-footer">
                    <img src={home_red} onClick={() => navigate('/main')} alt="하단 내비게이션바"></img>
                    <img src={board} onClick={() => navigate('/board')} alt="하단 내비게이션바"></img>
                    <img src={chat} onClick={() => navigate('/chat')} alt="하단 내비게이션바"></img>
                    <img src={boon} onClick={() => navigate('/boon')} alt="하단 내비게이션바"></img>
                    <img src={my} onClick={() => navigate('/mypage')}alt="하단 내비게이션바"></img>
            </footer>
        </div>
    )
}

export default MainPg;