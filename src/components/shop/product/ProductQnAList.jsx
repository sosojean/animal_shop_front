import ProductQnA from "./ProductQnA";
import {useEffect, useRef, useState} from "react";
import QnAModal from "./QnAModal";
import "../../../assets/styles/shop/product/qnaModal.scss"
import axios from "axios";

const ProductQnAList = ({data}) => {
    const [modalOpen, setModalOpen] = useState(false);


    // useEffect(() => {
    //     axios({
    //         url:``,
    //         method: "get",
    //     })
    //
    // })




    return(
        <>
            <div id="qna-target">
                <span> 상품 문의 </span>
                <button>문의 작성</button>

                <button className={'modal-open-btn'} onClick={() => setModalOpen(true)}>
                    모달 열기
                </button>
                <QnAModal data = {data} modalOpen={modalOpen} setModalOpen={setModalOpen} />

                <ProductQnA/>
                <ProductQnA/>
            </div>

        </>
    )

}

export default ProductQnAList;