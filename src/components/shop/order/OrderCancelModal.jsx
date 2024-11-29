import Modal from "../../common/Modal";
import OrderProduct from "./OrderProduct";
import {useEffect, useState} from "react";
import petInfo from "../../member/pet/PetInfo";
import instance from "../../../utils/axios";
import {useNavigate} from "react-router-dom";

const OrderCancelModal = ({setModalOpen, modalOpen,item}) => {
    console.log(item.orderItemDTOList);
    const [checkedItems, setCheckedItems] = useState([])
    const [cancelData, setCancelData] = useState()

    const navigate = useNavigate();

    const applyCheck = (newVal) => {
        setCheckedItems((prev) => [...prev,newVal])
    }

    const subCheck = (newVal) => {
        setCheckedItems(checkedItems.filter(num => num !== newVal));
    }
    useEffect(() => {
        console.log(checkedItems);
    }, [checkedItems]);

    useEffect(() => {
        cancelData&&navigate("/cancel/success",{state:cancelData})

    }, [cancelData]);


    const applyCancel = ()=> {
        instance({
            url:"/shop/order/cancel_detail",
            method:'PATCH',
            data:{
                orderItemIds:checkedItems
            }
        }).then(res=>{
            console.log(res.data)
            setCancelData(res.data)


        }).catch(err=>{
            console.log(err)
        })


    }

    return (
        <Modal setModalOpen={setModalOpen} modalOpen={modalOpen}>
            {item&&item.orderItemDTOList.map( (orderItem, index) => {
                return <OrderProduct key={orderItem["itemNm"] + index} item={orderItem} position={"cancel"} applyCheck={applyCheck} subCheck={subCheck}/>})}
            <button onClick={applyCancel}> 취소 </button>


        </Modal>
    );
};

export default OrderCancelModal;