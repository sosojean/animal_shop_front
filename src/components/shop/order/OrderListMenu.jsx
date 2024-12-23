import React, {useEffect, useState} from 'react';
import Card from "../../common/Card";
import "../../../assets/styles/shop/order/orderListMenu.scss"
import instance from "../../../utils/axios";
import DefaultButton from "../../common/DefaultButton";

const OrderListMenu = ({url,setUrl}) => {

    const [data, setData] = useState()

    const all = "/shop/orders";
    const waiting = "/shop/orders?status=waiting";
    const revoke = "/shop/orders?status=revoke";
    const progress = "/delivery/progress-list";
    const completed = "/delivery/completed-list";


    useEffect(() => {
        instance({
            url:"/shop/order_info",
            method:"GET",
        }).then(res => {
            console.log("data",res.data)
            setData(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }, []);

    return (
        data&&

        <div className=" order-list-menu">
            <button className={`order-list-control ${url === all ? "selected" : ""}`}
                    onClick={()=>{setUrl(all)}}>
                전체 <span className="state-count">{data.entire}</span>
            </button>
            <button className={`order-list-control ${url === waiting ? "selected" : ""}`}
                    disabled={data.waiting===0}
                    onClick={()=>{setUrl(waiting)}}>
                결제 승인 <span className="state-count">{data.waiting}</span>
            </button>
            <button className={`order-list-control ${url === revoke ? "selected" : ""}`}
                    disabled={data.revoke===0}
                    onClick={()=>{setUrl(revoke)}}>
                배송 취소 <span className="state-count">{data.revoke}</span>
            </button>

            <button className={`order-list-control ${url === progress ? "selected" : ""}`}
                    disabled={data.deliveryProgress===0}
                    onClick={()=>{setUrl(progress)}}>
                배송 중  <span className="state-count">{data.deliveryProgress}</span>
            </button>
            <button className={`order-list-control ${url === completed ? "selected" : ""}`}
                    disabled={data.deliveryCompleted === 0}
                    onClick={() => {setUrl(completed)}}>
                배송 완료<span className="state-count">{data.deliveryCompleted}</span>
            </button>

        </div>

    );
};

export default OrderListMenu;