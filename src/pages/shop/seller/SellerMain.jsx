import ItemRegButton from "../../../components/shop/seller/ItemRegButton";
import { Link } from "react-router-dom";
import SellerItemList from "../../../components/shop/seller/SellerItemList";


const SellerMain = () => {

    return (
        <div>
            <h1>판매자 센터</h1>
            <ItemRegButton/>
            <SellerItemList/>
        </div>
    )
}

export default SellerMain;