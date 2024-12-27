import OrderProduct from "./OrderProduct";
import instance from "../../../utils/axios";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp, faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import Card from "../../common/Card";
import Modal from "../../common/Modal";
import OrderCancelModal from "./OrderCancelModal";
import DeliveryConfirmModal from "./DeliveryConfirmModal";


const Order = ({url,item,isEdited,setIsEdited}) => {
    const [isOpened, setIsOpened] = useState(false)
    const [cancelModalOpen, setCancelModalOpen] = useState(false)
    const [confirmModalOpen, setConfirmModalOpen] = useState(false)
    const isAll = url === "/shop/orders";
    const isRevoke = url === "/shop/orders?status=revoke";



    const isSingle = item["orderItemDTOList"].length == 1 ? true : false;
    const countMessage = `총 ${item["orderItemDTOList"].length} 건 주문 `;

    const open = (<>접기 <FontAwesomeIcon icon={faChevronUp}/></>);
    const close = (<>펼쳐보기 <FontAwesomeIcon icon={faChevronDown}/></>);
    const isProgress = item.orderStatus === "PROGRESS";
    const isCompleted = item.orderStatus === "COMPLETED";
    const isOrderComplete = item.orderStatus === "ORDER";





    const orderCancelHandler = () => {
        setCancelModalOpen(true)

    }

    const deliveryConfirm= () => {
        setConfirmModalOpen(true)
    }
    return(
        <>
            <OrderCancelModal item={item}
                              setModalOpen={setCancelModalOpen}
                              modalOpen={cancelModalOpen}
                              isEdited={isEdited}
                              setIsEdited={setIsEdited}
            />
            <DeliveryConfirmModal item={item}
                                  setModalOpen={setConfirmModalOpen}
                                  modalOpen={confirmModalOpen}
                                  isEdited={isEdited}
                                  setIsEdited={setIsEdited}
            />

            <Card className={"order"}>


                <span>주문번호 {item.orderId}</span>
                <span>결제일 {item.orderDate}</span>
                {isProgress&&<span>배송중</span>}
                {isCompleted&&<span>배송 완료</span>}
                {isOrderComplete&&<span>결제승인</span>}


                {console.log(item)}


                {item && item["orderItemDTOList"].map(
                    (orderItem, index) => {
                        if (isProgress) {
                            orderItem["delivery_approval"] = true;

                        } else if (isCompleted) {
                            orderItem["delivery_completed"] = true;

                        } else if (isOrderComplete) {
                            orderItem["order_completed"] = true;

                        }

                        return (
                            index == 0 ?
                                <OrderProduct url={url} key={orderItem["itemNm"] + index} item={orderItem} position={"order"}/> :
                                isOpened &&
                                <OrderProduct url={url} key={orderItem["itemNm"] + index} item={orderItem} position={"order"}/>);
                    })}
                {!isSingle &&
                    <button className="open-order order-list-btn"
                            onClick={() => {
                                setIsOpened(!isOpened)
                            }}>
                        {countMessage}
                        {isOpened ? open : close}
                    </button>}
                {isProgress&&!isAll && <button className="order-list-btn" onClick={deliveryConfirm}>배송 확정</button>
                }
                {isOrderComplete &&!isAll&&!isRevoke&&
                    <button className="cancel-order order-list-btn" onClick={orderCancelHandler}>주문 취소</button>
                }
            </Card>
        </>
    )
}
export default Order;