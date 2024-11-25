import ProductQnA from "./ProductQnA";
import {useEffect, useRef, useState} from "react";
import QnAModal from "./QnAModal";
import "../../../assets/styles/shop/product/qnaModal.scss"
import axios from "axios";
import instance from "../../../utils/axios";

const ProductQnAList = ({data}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [QnA, setQnA] = useState()
    const [isEdited, setIsEdited] = useState(false)

     useEffect(() => { //todo : 문의 get instance -> axios , 에러 여부 확인
        instance({
            url:`/item/query/list/${data.id}`,
            method: "get",
        }).then(res=>{
            setQnA(res.data["responseItemQueryDTOList"])

        })

    },[isEdited])



    return(
        <>
            <div id="qna-target">
                <span> 상품 문의 </span>

                <button className={'modal-open-btn'} onClick={() => setModalOpen(true)}>
                    문의 작성
                </button>
                <QnAModal data = {data} modalOpen={modalOpen} setModalOpen={setModalOpen}
                          setIsEdited = {setIsEdited} isEdited = {isEdited}/>


                {QnA?.map(item=>{
                    return(<ProductQnA item = {item} setIsEdited = {setIsEdited} isEdited = {isEdited}/>)
                })}


            </div>

        </>
    )

}

export default ProductQnAList;