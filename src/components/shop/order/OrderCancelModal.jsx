import Modal from "../../common/Modal";
import OrderProduct from "./OrderProduct";

const OrderCancelModal = ({setModalOpen, modalOpen,item}) => {
    console.log(item.orderItemDTOList);

    return (
        <Modal setModalOpen={setModalOpen} modalOpen={modalOpen}>
            {item&&item.orderItemDTOList.map( (orderItem, index) => {
                return <OrderProduct key={orderItem["itemNm"] + index} item={orderItem} position={"cancel"}/>})}
        </Modal>
    );
};

export default OrderCancelModal;