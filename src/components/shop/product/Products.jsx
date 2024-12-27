import '../../../assets/styles/shop/product/products.scss';
import Product from "./Product";
import ProductsLabel from "./ProductsLabel";

const Products = (props) => {

    return(
        <>{props?.name&&<ProductsLabel name={props.name}
                                       url={props.url}
                                       isCustom={props.isCustom}
                                       isEdit={props.isEdit}
                                       setIsEdit={props.setIsEdit} />}

          <div className="products">
              {props.data&&props.data?.map(data=>{
                  return ( <Product key={data.id} data = {data} position="product"/>)

              })}

          </div>
        </>

    )
}
export default Products