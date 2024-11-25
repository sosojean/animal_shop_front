import Product from "../product/Product";
import Products from "../product/Products";
import instance from "../../../utils/axios";
import {useEffect, useState} from "react";
import Order from "./Order";
import "../../../assets/styles/shop/order/order.scss"

const OrderedProductList = () => {
    const [data, setData] = useState()

    useEffect(() => {
        instance({
            url:`/shop/orders`,
            method:'GET',
        }).then(res=>{
            console.log("res", res)
            setData(res.data)

        }).catch(err=>{
            console.log(err)
        })
    }, []);



    return(<div className={"orders"}>

        {data && data["orderHistDTOList"].map(item=>{
            return(<Order item = {item}/>)
        })}</div>)







}
export default OrderedProductList