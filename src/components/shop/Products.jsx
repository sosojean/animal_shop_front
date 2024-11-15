import '../../assets/styles/shop/products.scss';
import Product from "./Product";
import ProductsLabel from "./ProductsLabel";
import {useEffect, useState} from "react";
import axios from "axios";
import CartItem from "./CartItem";



const Products = (props) => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios({
            url:"https://jsonplaceholder.typicode.com/users/1/todos",
            method:"GET",

        }).then((response) => {
            setData(response.data)
            // console.log(data)
            setLoading(false)
        })
            .catch(error => console.log(error));

    },[loading])




    return(
        <>
        <ProductsLabel/>
          <div className="products">
              {data&&data?.slice(1, 5).map(data=>{
                  return ( <Product data = {data} position="product" />)

              })}

          </div>
        </>

    )
}
export default Products