import MainDetail from "../../components/shop/MainDetail";
import ProductDetailNav from "../../components/shop/ProductDetailNav";
import Products from "../../components/shop/Products";
import ProductDetailContent from "../../components/shop/ProductDetailContent"
import ProductReview from "../../components/shop/ProductReview";

const ProductDetail = () => {

    return(
        <>
            <MainDetail/>
            <ProductDetailNav/>
            {/* <ProductDetailContent/> */}
            <ProductReview/> <ProductReview/> <ProductReview/> <ProductReview/> <ProductReview/>
            <Products/>
        </>
    )
}

export default ProductDetail;