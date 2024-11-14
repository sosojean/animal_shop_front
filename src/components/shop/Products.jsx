import '../../assets/styles/shop/product.scss';
import Product from "./Product";
import ProductsLabel from "./ProductsLabel";



const Products = (props) => {

    return(
        <>
        <ProductsLabel/>
          <div className="products">
              <Product/>
              <Product/>
              <Product/>
              <Product/>
          </div>
        </>

    )
}
export default Products