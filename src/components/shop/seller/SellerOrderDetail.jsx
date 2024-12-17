import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import instance from "../../../utils/axios";
import "../../../assets/styles/shop/seller/sellerOrederDetail.scss"
import Card from "../../common/Card";
import DefaultButton from "../../common/DefaultButton";

const SellerOrderDetail = () => {
    const navigate = useNavigate();

    const {orderId} = useParams()
    const [data, setData] = useState()

    useEffect(() => {
        instance({
            url:`/seller/delivery/detail?orderItemId=${orderId}`,
            method:"",
        }).then((response) => {
            console.log(response)
            setData(response.data)
        }).catch((error) => {
            console.log(error);
        })
    },[])
    return (
        data&&<>
             <Card className="row default-card order-detail-card">
                <img className="product-img" src={data.thumbnailUrl} alt=""/>
                <div className="col order-detail">
                    <div className="detail-info-item"><span className="title">주문번호</span><span> {data.order_code}</span></div>
                    <div className="detail-info-item"><span className="title">상품명</span><span> {data.itemName}</span></div>
                    <div className="detail-info-item"><span className="title">옵션</span><span> {data.optionName}</span></div>
                    <div className="detail-info-item"><span className="title">결제일시</span><span> {data.order_date}</span></div>
                    <div className="detail-info-item"><span className="title">상태</span><span> {data.order_status}</span></div>
                    <div className="detail-info-item"><span className="title">배송지</span><span> {data.address}</span></div>
                    <div className="detail-info-item"><span className="title">연락처</span><span> {data.phone_number}</span></div>
                    <div className="detail-info-item"><span className="title">수량</span><span> {data.quantity}</span></div>
                    <div className="detail-info-item"><span className="title">수령인</span><span> {data.recipient}</span></div>
                    <div className="detail-info-item"><span className="title">가격</span><span> {data.total_price.toLocaleString()} 원</span></div>
                </div>
        </Card>
        <div className="back-to-list">
            <DefaultButton className={"default long"} onClick={()=>{navigate("/seller/orders")}}> 목록 </DefaultButton>
        </div>
        </>
    );
};

export default SellerOrderDetail;