import MainDetail from "../../components/shop/MainDetail";
import ProductDetailNav from "../../components/shop/ProductDetailNav";
import Products from "../../components/shop/Products";
import ProductDetailContent from "../../components/shop/ProductDetailContent"
import ProductReviewList from "../../components/shop/ProductReviewList";

const ProductDetail = () => {

    return(
        <>
            <MainDetail/>
            <ProductDetailNav/>
            {/* <ProductDetailContent/> */}
            <ProductReviewList/>
            <Products/>
        </>
    )
}

export default ProductDetail;