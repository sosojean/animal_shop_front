import React, {useEffect, useState} from 'react';
import OrderedProduct from "../product/orderedProduct";
import Card from "../../common/Card";
import instance from "../../../utils/axios";
import DefaultButton from "../../common/DefaultButton";
import "../../../assets/styles/shop/seller/sellerAcceptItem.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import OrderProduct from "../order/OrderProduct";
import {toast} from "react-toastify";
const SellerAcceptItem = ({item, setIsEdited, isEdited}) => {



    const [isOpened, setIsOpened] = useState(false)

    const [isConfirmed, setIsConfirmed] = useState(false)

    const isSingle = item["deliveryItemDTOList"].length === 1;
    const countMessage = `총 ${item["deliveryItemDTOList"].length} 건 주문 `;

    const open = (<>접기 <FontAwesomeIcon icon={faChevronUp}/></>);
    const close = (<>펼쳐보기 <FontAwesomeIcon icon={faChevronDown}/></>);

    useEffect(() => {
        const isAnyConfirmed = item.deliveryItemDTOList.some(
            (deliveryItem) => deliveryItem["delivery_approval"] || deliveryItem["delivery_revoke"]
        );
        setIsConfirmed(isAnyConfirmed);
    }, [item]);







    const deliverAllProduct =()=> {
        instance({
            url:`/seller/delivery/approve`,
            method:'POST',
            data:{
                orderId : item.orderId,
                deliveryId : item.deliveryId
            }

        }).then((response) => {
            console.log(response);
            setIsEdited(!isEdited)
            toast.success("전체 상품 배송처리가 완료되었습니다!")
        }).catch((error) => {
            console.log(error);
        })
    }

    const rejectAllProduct =()=> {
        instance({
            url:`/seller/delivery/revoke`,
            method:'POST',
            data:{
                orderId : item.orderId,
                deliveryId : item.deliveryId
            }
        }).then(response=>{
            console.log(response);
            setIsEdited(!isEdited)
        }).catch((error) => {
            console.log(error);
        })

    }



    return (
        <Card className="default-card order">
            <div className="row  order-item-header">
                <div className="row">
                    <img className="order-item-img" src={item?.deliveryItemDTOList[0]["thumbnailUrl"]}/>
                    <div className="col">

                        <span><span className="highlight-gray">구매자</span> {item.customer}</span>
                        <span>결제일시 {item.orderDate}</span>
                    </div>
                </div>
                <div className="price"><span>총 결제 금액</span> <b>{item.totalPrice.toLocaleString()} </b><span>원</span></div>

            </div>




            {item.deliveryItemDTOList.map((deliveryItem, index) => {

                return (
                    index == 0 ? <OrderedProduct key={deliveryItem["orderItemId"]} item={deliveryItem} index={index}
                                        setIsEdited={setIsEdited} isEdited={isEdited}/>:
                        isOpened &&<OrderedProduct key={deliveryItem["orderItemId"]} item={deliveryItem} index={index}
                                                   setIsEdited={setIsEdited} isEdited={isEdited}/>

                )
            })}

            {!isSingle &&
                <DefaultButton className="default wd100 open-order order-list-btn"
                        onClick={() => {
                            setIsOpened(!isOpened)
                        }}>
                    {countMessage}
                    {isOpened ? open : close}
                </DefaultButton>}

            <div className="row order-control-buttons">
                {!isConfirmed&&<>
                    <DefaultButton className={"default long"} onClick={rejectAllProduct}>전체 취소</DefaultButton>
                    <DefaultButton className={"primary long"} onClick={deliverAllProduct}>전체 배송</DefaultButton></>}

            </div>


        </Card>
    );
};

export default SellerAcceptItem;