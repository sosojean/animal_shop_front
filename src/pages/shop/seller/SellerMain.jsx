import { Link } from "react-router-dom";

import '../../../assets/styles/shop/seller/sellerMain.scss';
import SellerMenu from "../../../components/shop/seller/SellerMenu";
import SellerItemList from "../../../components/shop/seller/itemList/SellerItemList";
import SellerStatAnalysis from "./SellerStatAnalysis";


const SellerMain = () => {

    const navigateUrl = "/seller"; // 삭제 후 리다이렉트할 URL 설정

    return (

        <div className="sellerMainContainer">
        <SellerMenu/>
        <SellerStatAnalysis/>
        </div>
    )
}

export default SellerMain;