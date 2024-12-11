import React, {useEffect, useState} from 'react';
import Card from "../../common/Card";
import "../../../assets/styles/shop/order/orderListMenu.scss"
import instance from "../../../utils/axios";

const OrderListMenu = ({setUrl}) => {

    const [data, setData] = useState()

    useEffect(() => {
        instance({
            url:"/shop/order_info",
            method:"GET",
        }).then(res => {
            console.log("data",res.data)
            setData(res.data)
        })
    }, []);

    return (

        <Card className="order-list-menu">
            <button onClick={()=>{setUrl("/shop/orders")}}> 전체 {data?.entire}</button>
            <button onClick={()=>{setUrl("/shop/orders?status=waiting")}}> 결제 승인{data?.waiting}</button>
            <button onClick={()=>{setUrl("/shop/orders?status=revoke")}}> 배송 취소{data?.revoke}</button>
            {/*<button onClick={()=>{setUrl("/shop/orders?status=approve")}}> approve</button>*/}


            <button onClick={()=>{setUrl("/delivery/progress-list")}}> 배송 중{data?.deliveryProgress}</button>
            <button onClick={()=>{setUrl("/delivery/completed-list")}}> 배송 완료{data?.deliveryCompleted}</button>

        </Card>

    );
};

export default OrderListMenu;