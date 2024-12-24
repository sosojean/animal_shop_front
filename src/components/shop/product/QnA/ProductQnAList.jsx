import ProductQnA from "./ProductQnA";
import {useEffect, useRef, useState} from "react";
import QnAModal from "./QnAModal";

import axios from "axios";
import instance from "../../../../utils/axios";
import DefaultButton from "../../../common/DefaultButton";
import Pagination from "../../../board/Pagination";

const ProductQnAList = ({data}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [QnA, setQnA] = useState()
    const [isEdited, setIsEdited] = useState(false)
    const [totalCount, setTotalCount] = useState(0)
    const [page, setPage] = useState(1)

     useEffect(() => {
        axios({
            url:`${process.env.REACT_APP_API}/item/query/list/${data.id}`,
            method: "get",
            params:{page}
        }).then(res=>{
            setTotalCount(res.data.total_count);
            setQnA(res.data["responseItemQueryDTOList"])
        })

    },[isEdited,page])



    return(
        <>
            <div id="qna-target">

                <div className={"qna-header"}>
                    <span className="title"><b> 상품 문의 </b></span>

                    <DefaultButton className={'long primary modal-open-btn'} onClick={() => setModalOpen(true)}>
                        문의 작성 하기
                    </DefaultButton>
                </div>
                <QnAModal data={data} modalOpen={modalOpen} setModalOpen={setModalOpen}
                          setIsEdited = {setIsEdited} isEdited = {isEdited}/>

                {QnA?.length===0&&<div className="no-contents"><span>작성된 문의가 없습니다.</span></div>}
                {QnA?.map(item=>{
                    return(<ProductQnA key = {item['item_query_id']} item = {item} setIsEdited = {setIsEdited} isEdited = {isEdited}/>)
                })}
                {totalCount>10&&<Pagination currentPage={page} handlePageChange={setPage} totalPost={totalCount} />}


            </div>

        </>
    )

}

export default ProductQnAList;