import MainDetail from "../../components/shop/MainDetail";
import ProductDetailNav from "../../components/shop/ProductDetailNav";
import Products from "../../components/shop/Products";
import ProductDetailContent from "../../components/shop/ProductDetailContent"
import ProductReviewList from "../../components/shop/ProductReviewList";
import ProductQnAList from "../../components/shop/ProductQnAList";

const ProductDetail = () => {

    return(
        <>
            <MainDetail/>
            <ProductDetailNav/>
            <ProductDetailContent/>
            {/* <ProductReviewList/> */}
            <ProductQnAList/>
            <Products/>
        </>
    )
}

export default ProductDetail;