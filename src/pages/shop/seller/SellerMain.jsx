import ItemRegButton from "../../../components/shop/seller/ItemRegButton";
import { Link } from "react-router-dom";
import SellerItemList from "../../../components/shop/seller/SellerItemList";


const SellerMain = () => {

    return (
        <div>
            <h1>판매자 센터</h1>
            <ItemRegButton/>
            <Link to="/seller/item/list">
                <div>상품 등록 목록 더보기</div>
            </Link>
            <SellerItemList/>
        </div>
    )
}

export default SellerMain;