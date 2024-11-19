import Header from "./Header";
import Footer from "./Footer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../../pages/Home";
import Join from "../../pages/Join";
import Login from "../../pages/Login";
import PostWrite from "../../pages/PostWrite";
import JoinSuccess from "../../pages/JoinSuccess";
import "../../assets/styles/layout/router.scss";
import MyPage from "../../pages/MyPage";
import ContentsViewer from "../board/ContentsViewer";
import Search from "../../pages/Search";
import Product from "../shop/Product";
import Products from "../shop/Products";
import ShopMain from "../../pages/ShopMain";
import Cart from "../../pages/shop/Cart";
import ProductDetail from "../../pages/shop/ProductDetail";
import SellerItemResigter from "../shop/SellerItemResgister";
import DeliverInfo from "../../pages/shop/DeliverInfo";
import Admin from "../../pages/shop/admin/Admin";
import SellerRegister from "../../pages/shop/SellerRegister";
import Information from "./Information";
import AllProduct from "../../pages/shop/AllProduct";

const Router = (props) => {
    return (
        <BrowserRouter>
            <div className="outer-container">
                <Header reload={props.reload} setReload={props.setReload}/>
                <div className="inner-container">
                    <Routes>
                        <Route path="/" element={<Home isAuth={props.isAuth}/>}/>
                        <Route path="/:category" element={<Home isAuth={props.isAuth}/>}/>

                        {/*<Route path="/item/:itemId" element={<ItemDetail/>}/>*/}
                        {/*<Route path="/test" element={<Test/>}/> /!*라우터 사용 예시*!/*/}
                        {/*<Route path="/best" element={<Best/>}/>*/}
                        {/*<Route path="/new" element={<New/>}/>*/}
                        <Route path="/join" element={<Join/>}/>
                        <Route path="/login" element={<Login reload={props.reload} setReload={props.setReload}/>}/>
                        <Route path="/post/write" element={<PostWrite/>}/>
                        <Route path="/join/success" element={<Information case ="join" />}/>
                        <Route path="/mypage" element={<MyPage/>}/>
                        <Route path="/:category/:post_id" element={<ContentsViewer/>}/>
                        <Route path="/search" element={<Search/>}/>
                        <Route path="/product/detail" element={<ProductDetail/>}/>
                        <Route path="/shop" element={<ShopMain/>}/>
                        <Route path="/shop/:category" element={<AllProduct/>}/>

                        <Route path="/cart" element={<Cart/>}/>

                        <Route path="/seller/item/new" element={<SellerItemResigter/>}/>

                        <Route path="/deliver" element={<DeliverInfo/>}/>
                        <Route path="/admin/:menu" element={<Admin/>}/>
                        <Route path="/seller/register" element={<SellerRegister/>}/>
                        <Route path="/seller/register/success" element={<Information case ="seller" />}/>





                    </Routes>
                </div>

                {/*{props.isAuth ? <WriteButton/> : null}*/}
                <Footer/>

            </div>
        </BrowserRouter>

    )
}

export default Router