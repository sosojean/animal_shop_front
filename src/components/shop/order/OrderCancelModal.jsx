import Modal from "../../common/Modal";
import OrderProduct from "./OrderProduct";
import {useEffect, useState} from "react";
import petInfo from "../../member/pet/PetInfo";
import instance from "../../../utils/axios";
import {useNavigate} from "react-router-dom";
import "../../../assets/styles/shop/order/orderCancelModal.scss"
import {toast} from "react-toastify";

const OrderCancelModal = ({setModalOpen, modalOpen,item, setIsEdited, isEdited}) => {
    // console.log(item.orderItemDTOList);
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
        // console.log(checkedItems);
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
            // console.log(res.data)
            setCancelData(res.data)
            setModalOpen(false)
            setIsEdited(!isEdited)
            // toast.success("주문이 취소되었습니다!")


        }).catch(err=>{
            console.log(err)
        })


    }

    return (
        <Modal setModalOpen={setModalOpen} modalOpen={modalOpen}>
            <div className={"order-cancel-section"}>
            {item && item.orderItemDTOList.map((orderItem, index) => {
                return <OrderProduct key={orderItem["itemNm"] + index} item={orderItem} position={"cancel"}
                                     applyCheck={applyCheck} subCheck={subCheck}/>
            })}
                <div className={"buttons"}>
                    <button onClick={applyCancel}> 선택상품 주문 취소</button>
                    <button onClick={()=>{setModalOpen(false)}}> 닫기</button>
                </div>
            </div>

        </Modal>
    );
};

export default OrderCancelModal;