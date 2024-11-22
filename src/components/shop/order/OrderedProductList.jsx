import Product from "../product/Product";
import Products from "../product/Products";
import instance from "../../../utils/axios";
import {useEffect, useState} from "react";

const OrderedProductList = () => {
    const [data, setData] = useState()

    useEffect(() => {
        instance({
            url:`/shop/orders`,
            method:'GET',
        }).then(res=>{
            console.log(res)
            setData(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }, []);




    return(<>

        {/*{data && }*/}

  </>)
}
export default OrderedProductList