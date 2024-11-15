import MainDetail from "../../components/shop/MainDetail";
import ProductDetailNav from "../../components/shop/ProductDetailNav";
import Products from "../../components/shop/Products";
import ProductDetailContent from "../../components/shop/ProductDetailContent"

const ProductDetail = () => {

    return(
        <>
            <MainDetail/>
            <ProductDetailNav/>
            <ProductDetailContent/>
            <Products/>
        </>
    )
}

export default ProductDetail;