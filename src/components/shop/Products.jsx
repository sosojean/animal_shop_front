import '../../assets/styles/shop/products.scss';
import Product from "./Product";
import ProductsLabel from "./ProductsLabel";



const Products = (props) => {

    return(
        <>
        <ProductsLabel/>
          <div className="products">
              <Product position = "product"/>
              <Product position = "product"/>
              <Product position = "product"/>
              <Product position = "product"/>

          </div>
        </>

    )
}
export default Products