import '../../assets/styles/shop/products.scss';
import Product from "./Product";
import ProductsLabel from "./ProductsLabel";

const Products = (props) => {
    return(
        <>
            {props?.name&&<ProductsLabel name={props.name} url={props.url}/>}

          <div className="products">
              {props.data&&props.data?.map(data=>{
                  return ( <Product data = {data} position="product"/>)

              })}

          </div>
        </>

    )
}
export default Products