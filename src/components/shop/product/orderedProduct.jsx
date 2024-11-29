import {Link} from "react-router-dom";
import Card from "../../common/Card";
import React from "react";
import instance from "../../../utils/axios";

const OrderedProduct = ({item, index, setIsEdited, isEdited}) => {

    const deliverProduct =()=> {
        console.log(item)
        instance({
            url:`/seller/delivery/approve_detail`,
            method:'POST',
            data:{orderItemId:item.orderItemId}

        }).then(res=>{
            setIsEdited(!isEdited)
            console.log(res)
        }).catch((error) => {
            console.log(error)
        })
    }

    const rejectProduct =()=> {
        instance({
            url:`/seller/delivery/revoke_detail`,
            method:'POST',
            data:{orderItemIds: [item.orderItemId]
        }
        }).then(res=>{
            setIsEdited(!isEdited)

        })

    }
    return (
            <Card>
                <Link to={`/seller/orders/detail/${item["orderItemId"]}`}>

                {index == 0 && <span>{item["thumbnailUrl"]}</span>}
                    <div>
                        <span>배송 시작 여부 {item["delivery_approval"]?"o":"x"}</span>
                        <span>배송 취소 여부 {item["delivery_revoke"]?"o":"x"}</span>
                        <span>{item["itemName"]}</span>
                        <span>{item["optionName"]}</span>
                        <span>{item["optionPrice"]}</span>
                        <span>{item["orderItemId"]}</span>
                        <span>{item["quantity"]}</span>
                    </div>
                </Link>

                <button onClick={deliverProduct}>배송</button>
                <button onClick={rejectProduct}>거절</button>
            </Card>

    );
};

export default OrderedProduct;