import "../../assets/styles/common/myPage.scss";
import {Link} from "react-router-dom";
import OrderedProductList from "../shop/order/OrderedProductList";


const MyPage = () => {

    return (<>

        <div className="my-page">
            <div className="user-info">
                <img src="https://placehold.co/100" alt=""/>
                <div className="user-info-text">
                    <span>user 님 안녕하세요</span>
                    <Link to={"/mypage/edit"}><span> 회원 정보 수정 > </span></Link>
                </div>

            </div>
            <div className="shop">
                <h2>주문 내역</h2>
                <OrderedProductList></OrderedProductList>




            </div>

        </div>


    </>)
}
export default MyPage