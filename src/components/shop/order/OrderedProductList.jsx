import Product from "../product/Product";
import Products from "../product/Products";
import instance from "../../../utils/axios";
import {useEffect, useState} from "react";
import Order from "./Order";
import "../../../assets/styles/shop/order/order.scss"
import OrderListMenu from "./OrderListMenu";

const OrderedProductList = () => {
    const [data, setData] = useState()
    // const url = `/shop/orders`;

    const [url, setUrl] = useState(`/shop/orders`)


    useEffect(() => {
        instance({
            url:url,
            method:'GET',
        }).then(res=>{
            // console.log("res", res)
            setData(res.data)

        }).catch(err=>{
            console.log(err)
        })
    }, [url]);



    return(<div className={"orders"}>

        <OrderListMenu setUrl={setUrl}/>

        {data && data["orderHistDTOList"].map(item=>{
            return(<Order key={item["orderId"]} item = {item} />)
        })}</div>)


}
export default OrderedProductList