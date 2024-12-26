import {Link, useNavigate} from "react-router-dom";
import Card from "../../common/Card";
import React from "react";
import instance from "../../../utils/axios";
import DefaultButton from "../../common/DefaultButton";
import {toast} from "react-toastify";

const OrderedProduct = ({item, index, setIsEdited, isEdited}) => {
    const isDelivered = item["delivery_approval"];
    const isRevoked = item["delivery_revoke"];
    const isOnWaiting = !item["delivery_revoke"] && !item["delivery_approval"];



    const navigate = useNavigate();
    const deliverProduct =()=> {
        console.log(item)
        instance({
            url:`/seller/delivery/approve_detail`,
            method:'POST',
            data:{orderItemId:item.orderItemId}

        }).then(res=>{
            setIsEdited(!isEdited)
            toast.success(`${item["optionName"]}의 배송처리가 완료되었습니다!`)

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
            <Card className="ordered-product light-card">
                <Link to={`/seller/orders/detail/${item["orderItemId"]}`}>

                    <div className="order-item-info">

                        <div className="col">
                            {/*<span> 상품 주문번호 {item["orderItemId"]}</span>*/}

                            <span> <b>품목명</b> {item["itemName"]}</span>
                            <span> <b>옵션명</b> {item["optionName"]}</span>
                            <span> <b>가격</b> {item["optionPrice"].toLocaleString()} 원</span>
                            <span> <b>수량</b> {item["quantity"]}</span>
                        </div>
                        <div className="col order-status-info">
                            <div>
                            {isDelivered && <span className='highlight'>배송중</span>}
                            {isRevoked && <span className='highlight-gray'>배송거절</span>}
                            {isOnWaiting && <span className='highlight'>배송대기</span>}
                            </div>
                                <span>{(item["optionPrice"]*item["quantity"]).toLocaleString()} 원</span>

                        </div>
                    </div>
                </Link>
                <div className="row order-control-buttons">
                    <DefaultButton className={"default long"} onClick={() => {
                        navigate(`/seller/orders/detail/${item["orderItemId"]}`)}}>주문 상세</DefaultButton>


                    {!isDelivered && !isRevoked &&<>
                        <DefaultButton className={"default mid"} onClick={rejectProduct}>거절</DefaultButton>
                        <DefaultButton className={"primary mid"} onClick={deliverProduct}>배송</DefaultButton></>}


                </div>
            </Card>

    );
};

export default OrderedProduct;