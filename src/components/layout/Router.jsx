import Header from "./Header";
import Footer from "./Footer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../../pages/board/Home";
import Join from "../../pages/member/Join";
import Login from "../../pages/member/Login";
import PostWrite from "../../pages/board/PostWrite";
import "../../assets/styles/layout/router.scss";
import MyPageEdit from "../../pages/member/MyPageEdit";
import ContentsViewer from "../board/ContentsViewer";
import Search from "../../pages/board/Search";
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
import SellerItemRegister from "../../pages/shop/seller/SellerItemRegister";
import SellerItemList from "../shop/seller/itemList/SellerItemList";
import PetRegister from "../../pages/member/PetRegister";
import PetInfoEdit from "../member/pet/PetInfoEdit";
import PetInfoPage from "../../pages/member/PetInfoPage";
import SellerOrderAccept from "../../pages/shop/seller/sellerOrderAccept";
import SellerOrderDetail from "../shop/seller/SellerOrderDetail";
import CancelSuccess from "../../pages/shop/order/cancelSuccess";
import SellerManagement from "../shop/admin/SellerManagement";
import ProductManagement from "../../pages/shop/admin/ProductManagement";
import PasswordFinder from "../../pages/member/PasswordFinder";
import AdoptAnimal from "../../pages/additional/AdoptAnimal";
import AdoptAnimalDetail from "../../pages/additional/AdoptAnimalDetail";
import PendingProductManagement from "../../pages/shop/admin/PendingProductManagement";
import AdminStatAnalysis from "../../pages/shop/admin/AdminStatAnalysis";
import AdminNoticeList from "../../pages/shop/admin/AdminNoticeList";
import AdminNoticeWrite from "../../pages/shop/admin/AdminNoticeWrite";
import AdminNoticeDetail from "../../pages/shop/admin/AdminNoticeDetail";
import SellerSuspendingItems from "../../pages/shop/seller/SellerSuspendingItems";
import SellerPointHistory from "../../pages/shop/seller/SellerPointHistory";
import {useEffect, useState} from "react";
import Withdraw from "../shop/seller/Withdraw";
import FacilitiesMap from "../../pages/map/FacilitiesMap";
import AdoptInterestAnimal from "../../pages/additional/AdoptInterestAnimal";
import Chatting from "../../pages/Chatting/Chatting";
import CalculatorSelector from "../../pages/additional/CalculatorSelector";
import AgeCalculator from "../additional/calc/AgeCalculator";
import CalorieCalculator from "../additional/calc/CalorieCalculator";
import NutrientCalculator from "../additional/calc/NutrientCalculator";

const Router = (props) => {
    const species = localStorage.getItem("species");
    let speciesInitVal;
    if (species === "dog"){
        speciesInitVal = true
    }

    // if (localStorage.getItem("accessToken")){
    //     instance({
    //         url:"/leader",
    //         method:"get"
    //     }).then(res=>{
    //         console.log(res)
    //     }).catch(err=>{
    //         console.log(err)
    //     })
    // }

    const [isDog, setIsDog] = useState(species==="dog")


    return (
        <BrowserRouter>
            <ScrollToTop/>
            <div className="outer-container">
                <Header reload={props.reload} setReload={props.setReload} isDog={isDog} setIsDog={setIsDog}/>
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
                        <Route path="/shop" element={<ShopMain isDog={isDog} setIsDog={setIsDog}/>}/>
                        <Route path="/shop/:category" element={<AllProduct/>}/>
                        <Route path="/shop/detail/:itemId" element={<ProductDetail/>}/>
                        <Route path="/pay/success" element={<Information case ="orderSuccess" />}/>
                        <Route path="/cancel/success" element={<CancelSuccess/>}/>

                        {/*장바구니*/}
                        <Route path="/cart" element={<Cart/>}/>

                        {/*판매자*/}
                        <Route path="/seller" element={<SellerMain/>}/>
                        <Route path="/seller/notice" element={<AdminNoticeList isSeller={true}/>}/>

                        <Route path="/seller/item/new" element={<SellerItemRegister/>}/>
                        <Route path="/seller/item/list" element={<SellerItemList/>}/>
                        <Route path="/seller/item/edit/:itemId" element={<SellerItemRegister/>}/>
                        <Route path="/seller/item/list/suspending" element={<SellerSuspendingItems/>}/>

                        <Route path="/seller/qna" element={<SellerQnA/>}/>
                        <Route path="/seller/orders" element={<SellerOrderAccept/>}/>

                        <Route path="/seller/orders/detail/:orderId" element={<SellerOrderDetail/>}/>
                        <Route path="/seller/register" element={<SellerRegister/>}/>
                        <Route path="/seller/register/success" element={<Information case ="seller" />}/>
                        <Route path="/seller/point/history" element={<SellerPointHistory/>}/>




                        {/*주문*/}
                        <Route path="/order/delivery" element={<DeliveryInfo/>}/>

                        {/*관리자*/}
                        <Route path="/admin/seller" element={<SellerManagement/>}/>
                        <Route path="/admin/product" element={<ProductManagement/>}/>
                        <Route path="/admin/product/pending" element={<PendingProductManagement/>}/>
                        <Route path="/admin/analysis" element={<AdminStatAnalysis/>}/>
                        <Route path="/admin/notice" element={<AdminNoticeList isSeller={false}/>}/>
                        <Route path="/admin/notice/write" element={<AdminNoticeWrite/>}/>
                        <Route path="/admin/notice/:noticeId" element={<AdminNoticeDetail/>}/>
                        <Route path="/admin/point/withdraw" element={<Withdraw/>}/>



                        {/* 입양 */}
                        <Route path="/adoption" element={<AdoptAnimal/>}/>
                        <Route path="/adoption/detail/:id" element={<AdoptAnimalDetail/>}/>
                        <Route path="/adoption/interest" element={<AdoptInterestAnimal/>}/>

                        {/* 지도 */}
                        <Route path="/map" element={<FacilitiesMap/>}/>

                        {/* 계산기 */}
                        <Route path="/calculator" element={<CalculatorSelector/>}/>
                        <Route path="/calculator/age" element={<AgeCalculator/>}/>
                        <Route path="/calculator/calorie" element={<CalorieCalculator/>}/>
                        <Route path="/calculator/nutrient" element={<NutrientCalculator/>}/>

                        {/* 채팅 */}
                        <Route path="/shop/chatting" element={<Chatting/>}/>


                    </Routes>
                </div>

                {/*{props.isAuth ? <WriteButton/> : null}*/}
                <Footer/>

            </div>
        </BrowserRouter>

    )
}

export default Router