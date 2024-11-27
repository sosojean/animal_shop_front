import "../../assets/styles/common/myPage.scss";
import {Link} from "react-router-dom";
import OrderedProductList from "../shop/order/OrderedProductList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import Card from "../common/Card";


const MyPage = () => {

    return (<>

        <div className="my-page">
            <div className="user-profiles">
            <Card className="user-info">
                <img src="https://placehold.co/100" alt=""/>
                <div className="user-info-text">
                    <span>user 님 안녕하세요</span>
                    <Link to={"/mypage/edit"}><span> 회원 정보 수정 <FontAwesomeIcon icon={faArrowRight}/> </span></Link>
                </div>
            </Card>
            <Card className="user-info">
                <img src="https://placehold.co/100" alt=""/>
                <div className="user-info-text">
                    <span>반려동물 이름</span>
                    <Link to={"/pet/info"}><span> 내 펫 <FontAwesomeIcon icon={faArrowRight}/> </span></Link>
                </div>


            </Card>
            </div>
            <div className="shop">
                <h2>주문 내역</h2>
                <OrderedProductList></OrderedProductList>


            </div>

        </div>


    </>)
}
export default MyPage