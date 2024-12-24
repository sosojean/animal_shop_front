import React, {useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import instance from "../../../utils/axios";

const CancelSuccess = () => {
    const {state} =  useLocation();
    const navigator =useNavigate();
    console.log(state);
    useEffect(() => {
        instance({
            url:"/pay/kakaoRefund",
            method:"POST",
            data:{
                tid:state.tid,
                itemName:state.itemName,
                itemQuantity:state.itemQuantity,
                cancelAmount:state.cancelAmount,
            }
        })
        .then((response) => {
            console.log(response)
            navigator("/refund/success");
        })
        .catch(err=>{
            console.log(err)});
    }, []);




    return (
        <div>
            <span>{state.cancelAmount}</span>
            <span>{state.cancelTaxFreeAmount}</span>
            <span>{state.cancelVatAmount}</span>
            <span>{state.itemName}</span>
            <span>{state.itemQuantity}</span>
            <span>{state.tid}</span>
            {/*<span>{state.cancelAmount}</span>*/}


        </div>
    );
};

export default CancelSuccess;