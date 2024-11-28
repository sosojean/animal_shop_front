import OrderProduct from "./OrderProduct";
import instance from "../../../utils/axios";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp, faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import Card from "../../common/Card";
import Modal from "../../common/Modal";
import OrderCancelModal from "./OrderCancelModal";


const Order = ({item}) => {
    const [isOpened, setIsOpened] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const isSingle = item["orderItemDTOList"].length == 1 ? true : false;
    const countMessage = `총 ${item["orderItemDTOList"].length} 건 주문 `;

    const open = (<>접기 <FontAwesomeIcon icon={faChevronUp}/></>);
    const close = (<>펼쳐보기 <FontAwesomeIcon icon={faChevronDown}/></>);




    const orderCancelHandler = () => {
        setModalOpen(true)
        // console.log(item);
        // instance({
        //     url: `/shop/order/cancel_detail`,
        //     method: "Patch",
        //     data: { orderItemIds : [ item["orderItemDTOList"][0].orderItemId ]}
        //
        // }).then((data) => {
        //     console.log(data);
        // }).catch((error) => {
        //     console.log(error)
        // })
    }
    return(
        <><OrderCancelModal item={item} setModalOpen={setModalOpen} modalOpen={modalOpen}/>
        <Card className={"order"}>

            <span>{item.orderId}</span>
            <span>{item.orderDate}</span>
            <span>{item.orderStatus}</span>


            {item && item["orderItemDTOList"].map(
                (orderItem, index) => {
                    // console.log("orderItem", orderItem);
                    return (
                        index==0?
                        <OrderProduct key={orderItem["itemNm"] + index} item={orderItem} position={"order"} />:
                            isOpened&&<OrderProduct key={orderItem["itemNm"] + index} item={orderItem} position={"order"}/>);})}
            {!isSingle &&
                <button className="open-order order-list-btn"
                        onClick={() => {setIsOpened(!isOpened)}}>
                    {countMessage}
                    {isOpened ?open:close}
                </button>}
            <button className="cancel-order order-list-btn" onClick={orderCancelHandler}>주문 취소</button>
        </Card>
        </>
            )}
export default Order;