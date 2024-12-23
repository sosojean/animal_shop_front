import "../../../assets/styles/common/myPage.scss";
import {Link, useParams, useSearchParams} from "react-router-dom";
import OrderedProductList from "../../shop/order/OrderedProductList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import Card from "../../common/Card";
import {useEffect} from "react";
import parseJwt from "../../../utils/parseJwt";
import Title from "../../common/Title";
import MyActivity from "./MyActivity";
import WrittenPosts from "./WrittenPosts";
import WrittenComments from "./WrittenComments";
import LikedComments from "./LikedComments";
import FavoritePlaces from "./FavoritePlaces";
import ProductReviews from "./ProductReviews";
import Inquiries from "./Inquiries";
import LikedPosts from "./LikedPosts";


const MyPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get("selected");
    const token = localStorage.getItem("accessToken");
    const profileImg = parseJwt(token).profileImg || "https://placehold.co/250x250";

    const imgSrc = profileImg.includes("http://k.kakaocdn.net")?
        profileImg:
        profileImg.includes("https://placehold.co") ? 
            profileImg : process.env.REACT_APP_IMG_PRINT + profileImg;

    useEffect(() => {
        console.log(keyword)
    }, []);

    const shopSections = {
        orders: <OrderedProductList />,
        posts: <WrittenPosts />,
        comments: <WrittenComments />,
        likedPosts: <LikedPosts />,
        likedComments: <LikedComments />,
        inquiries: <Inquiries />,
        reviews: <ProductReviews />,
        favorites: <FavoritePlaces />,
    };

    // 선택된 섹션 또는 기본 섹션
    const selectedSection = shopSections[keyword] || <OrderedProductList />;

    return (<>

        <div className="my-page">
            <Title>마이 페이지</Title>
            <div className="user-profiles">
            <Card className="user-info default-card">
                <img src={imgSrc} alt="" className="profile-img"/>
                <div className="user-info-text">
                    <span>user 님 안녕하세요</span>
                    <Link to={"/mypage/edit"}><span> 회원 정보 수정 <FontAwesomeIcon icon={faArrowRight}/> </span></Link>
                </div>
            </Card>
            <Card className="user-info default-card">
                <img src="https://placehold.co/100" alt=""/>
                <div className="user-info-text">
                    <span>반려동물 이름</span>
                    <Link to={"/pet/info"}><span> 내 펫 <FontAwesomeIcon icon={faArrowRight}/> </span></Link>
                </div>

            </Card>

            </div>
            <div className="my-activity">
                <Title>활동 이력</Title>

                <Card className={"my-activity-container default-card"}>

                    <MyActivity/>
                </Card>
            </div>

            <div className="shop">
                {selectedSection}
            </div>
        </div>


    </>)
}
export default MyPage