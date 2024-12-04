import Header from "./Header";
import Footer from "./Footer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../../pages/board/Home";
import Join from "../../pages/member/Join";
import Login from "../../pages/member/Login";
import PostWrite from "../../pages/board/PostWrite";
import JoinSuccess from "../../pages/member/JoinSuccess";
import "../../assets/styles/layout/router.scss";
import MyPageEdit from "../../pages/member/MyPageEdit";
import ContentsViewer from "../board/ContentsViewer";
import Search from "../../pages/board/Search";
import Product from "../shop/product/Product";
import Products from "../shop/product/Products";
import ShopMain from "../../pages/shop/ShopMain";
import Cart from "../../pages/shop/order/Cart";
import ProductDetail from "../../pages/shop/product/ProductDetail";
import DeliveryInfo from "../../pages/shop/order/DeliveryInfo";
import SellerRegister from "../../pages/shop/admin/SellerRegister";
import Information from "./Information";
import AllProduct from "../../pages/shop/product/AllProduct";
import SellerMain from "../../pages/shop/seller/SellerMain"
import MyPage from "../member/MyPage";
import SellerQnA from "../shop/seller/sellerQna/SellerQnA";
import ScrollToTop from "../../utils/ScrollToTop";
import SellerItemEditor from "../shop/seller/itemRegister/SellerItemEditor"
import SellerItemRegister from "../../pages/shop/seller/SellerItemRegister";
import SellerItemList from "../shop/seller/itemList/SellerItemList";
import PetRegister from "../../pages/member/PetRegister";
import PetInfoList from "../member/pet/PetInfoList";
import PetInfoEdit from "../member/pet/PetInfoEdit";
import PetInfoPage from "../../pages/member/PetInfoPage";
import SellerOrderAccept from "../../pages/shop/seller/sellerOrderAccept";
import SellerOrderDetail from "../shop/seller/SellerOrderDetail";
import CancelSuccess from "../../pages/shop/order/cancelSuccess";
import SellerManagement from "../shop/admin/SellerManagement";
import ProductManagement from "../../pages/shop/admin/ProductManagement";
import PasswordFinder from "../../pages/member/PasswordFinder";
import AdoptAnimal from "../../pages/additional/AdoptAnimal";
import AdoptDetail from "../additional/AdoptDetail";
import PendingProductManagement from "../../pages/shop/admin/PendingProductManagement";
import AdminStatAnalysis from "../../pages/shop/admin/AdminStatAnalysis";
import AdminNoticeList from "../../pages/shop/admin/AdminNoticeList";
import AdminNoticeWrite from "../../pages/shop/admin/AdminNoticeWrite";

const Router = (props) => {
    return (
        <BrowserRouter>
            <ScrollToTop/>
            <div className="outer-container">
                <Header reload={props.reload} setReload={props.setReload}/>
                <div className="inner-container">
                    <Routes>
                        <Route path="/" element={<Home isAuth={props.isAuth}/>}/>
                        <Route path="/:category" element={<Home isAuth={props.isAuth}/>}/>

                        {/*회원*/}
                        <Route path="/join" element={<Join/>}/>
                        <Route path="/login" element={<Login reload={props.reload} setReload={props.setReload}/>}/>
                        <Route path="/password" element={<PasswordFinder/>} />
                        <Route path="/join/success" element={<Information case ="join" />}/>
                        <Route path="/mypage" element={<MyPage/>}/>
                        <Route path="/mypage/edit" element={<MyPageEdit/>}/>

                        {/*회원-펫등록*/}
                        <Route path="/pet/register" element={<PetRegister />}/>
                        <Route path="/pet/info" element={<PetInfoPage />}/>
                        <Route path="/pet/edit/:petId" element={<PetInfoEdit />}/>



                        {/*게시판*/}
                        <Route path="/:category/:post_id" element={<ContentsViewer/>}/>
                        <Route path="/search" element={<Search/>}/>
                        <Route path="/post/write" element={<PostWrite/>}/>


                        {/*스토어*/}
                        <Route path="/shop" element={<ShopMain/>}/>
                        <Route path="/shop/:category" element={<AllProduct/>}/>
                        <Route path="/shop/detail/:itemId" element={<ProductDetail/>}/>
                        <Route path="/pay/success" element={<Information case ="orderSuccess" />}/>
                        <Route path="/cancel/success" element={<CancelSuccess/>}/>

                        {/*장바구니*/}
                        <Route path="/cart" element={<Cart/>}/>

                        {/*판매자*/}
                        <Route path="/seller" element={<SellerMain/>}/>
                        <Route path="/seller/item/new" element={<SellerItemRegister/>}/>
                        <Route path="/seller/item/list" element={<SellerItemList/>}/>
                        <Route path="/seller/item/edit/:itemId" element={<SellerItemRegister/>}/>
                        <Route path="/seller/qna" element={<SellerQnA/>}/>
                        <Route path="/seller/orders" element={<SellerOrderAccept/>}/>
                        <Route path="/seller/orders/detail/:orderId" element={<SellerOrderDetail/>}/>
                        <Route path="/seller/register" element={<SellerRegister/>}/>
                        <Route path="/seller/register/success" element={<Information case ="seller" />}/>

                        {/*주문*/}
                        <Route path="/order/delivery" element={<DeliveryInfo/>}/>

                        {/*관리자*/}
                        <Route path="/admin/seller" element={<SellerManagement/>}/>
                        <Route path="/admin/product" element={<ProductManagement/>}/>
                        <Route path="/admin/product/pending" element={<PendingProductManagement/>}/>
                        <Route path="/admin/analysis" element={<AdminStatAnalysis/>}/>
                        <Route path="/admin/notice" element={<AdminNoticeList/>}/>
                        <Route path="/admin/notice/write" element={<AdminNoticeWrite/>}/>



                        {/* 입양 */}
                        <Route path="/adoption" element={<AdoptAnimal/>}/>
                        <Route path="/adoption/detail/:desertionNo" element={<AdoptDetail/>}/>

                    </Routes>
                </div>

                {/*{props.isAuth ? <WriteButton/> : null}*/}
                <Footer/>

            </div>
        </BrowserRouter>

    )
}

export default Router