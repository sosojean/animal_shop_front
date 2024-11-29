import React from 'react';
import {useParams} from "react-router-dom";
import instance from "../../../utils/axios";

const SellerOrderDetail = () => {
    const {orderId} = useParams()
    instance({
        url:`/seller/delivery/detail?orderItemId=${orderId}`,
        method:"",
    }).then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error);
    })

    return (
        <div>
            detail{orderId}
        </div>
    );
};

export default SellerOrderDetail;