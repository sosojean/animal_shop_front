import React from 'react';
import Card from "../../common/Card";
import "../../../assets/styles/shop/order/orderListMenu.scss"

const OrderListMenu = ({setUrl}) => {
    return (

        //
        <Card className="order-list-menu">
            <button onClick={()=>{setUrl("/shop/orders")}}> 전체</button>
            <button onClick={()=>{setUrl("/shop/orders")}}> 결제 승인</button>
            <button onClick={()=>{setUrl("/delivery/progress-list")}}> 배송 중</button>
            <button onClick={()=>{setUrl("/delivery/completed-list")}}> 배송 완료</button>

        </Card>

    );
};

export default OrderListMenu;