import { Link } from "react-router-dom";
import SellerItemList from "../../../components/shop/seller/SellerItemList";
import '../../../assets/styles/shop/seller/sellerMain.scss';
import SellerMenu from "../../../components/shop/seller/SellerMenu";


const SellerMain = () => {

    const navigateUrl = "/seller"; // 삭제 후 리다이렉트할 URL 설정

    return (

        <div className="sellerMainContainer">
<SellerMenu/>
            <h1>판매자 센터</h1>
            <div className="sellerListHeader">
                <h2>상품 등록 목록</h2>
                <div className="sellerListHeaderLink">
                    <Link to="/seller/item/new" className="linkContainer">
                         <div className="linkContainer">상품 등록 하러 가기</div>
                    </Link>
                    <Link to="/seller/item/list" className="linkContainer">
                        <div className="linkContainer">상품 등록 목록 더보기</div>
                    </Link>
                </div>
            </div>
            <SellerItemList navigateUrl={navigateUrl}/>
        </div>
    )
}

export default SellerMain;