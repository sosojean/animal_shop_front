import React from 'react';
import {useLocation} from "react-router-dom";

const CancelSuccess = () => {
    const {state} =  useLocation();
    console.log(state);

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