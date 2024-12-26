import Modal from "../../common/Modal";
import OrderProduct from "./OrderProduct";
import {useEffect, useState} from "react";
import petInfo from "../../member/pet/PetInfo";
import instance from "../../../utils/axios";
import {useNavigate} from "react-router-dom";
import "../../../assets/styles/shop/order/orderCancelModal.scss"
import {toast} from "react-toastify";


const DeliveryConfirmModal = ({setModalOpen, modalOpen,item, setIsEdited, isEdited}) => {
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
        console.log(item)
        console.log(checkedItems);
    }, [checkedItems]);



    const applyConfirm = ()=> {
        instance({
            url:"/delivery/delivery-check",
            method:'POST',
            data:{
                deliveryProgressId:checkedItems
            }
        }).then(res=>{
            console.log("delivery-check",res.data)
            setCancelData(res.data)
            setModalOpen(false)
            setIsEdited(!isEdited)
            toast.success("배송이 확정되었습니다!")


        }).catch(err=>{
            console.log(err)
        })



    }

    return (
        <Modal setModalOpen={setModalOpen} modalOpen={modalOpen}>
            <div className="delivery-confirm-section">
            {item && item.orderItemDTOList.map((orderItem, index) => {
                return <OrderProduct key={orderItem["itemNm"] + index} item={orderItem} position={"confirm"}
                                     applyCheck={applyCheck} subCheck={subCheck}/>
            })}
                <div className={"buttons"}>
                    <button onClick={applyConfirm}> 확정</button>
                    <button onClick={()=>{setModalOpen(false)}}> 닫기</button>
                </div>
            </div>


        </Modal>
    );
};

export default DeliveryConfirmModal;