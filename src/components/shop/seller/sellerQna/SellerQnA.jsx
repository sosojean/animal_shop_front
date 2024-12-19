import SellerMenu from "../SellerMenu";
import axios from "axios";
import instance from "../../../../utils/axios";
import React, {useEffect, useState} from "react";
import ProductQnA from "../../product/QnA/ProductQnA";
import Pagination from "../../../board/Pagination";
import Title from "../../../common/Title";

const SellerQnA = (props) => {
    const [data, setData] = useState()
    const [page, setPage] = useState(1)
    const [totalPost, setTotalPost] = useState(0)
    const [isEdited, setIsEdited] = useState()

    useEffect(() => {
        instance({
            url: `/seller/query/list?page=${page}`,
            method: "get",
        }).then((res) => {

            setData(res.data['responseItemQueryDTOList'])
            // console.log(res.data);
            setTotalPost(res.data['total_count']);
        }).catch(error => {
            console.log(error)
        })
    },[isEdited,page])



    return (<>
        <SellerMenu/>

        <div>
            <Title>문의 답변</Title>

            {data&&data.map((item)=>{
               return <ProductQnA isEdited={isEdited} setIsEdited={setIsEdited} item={item} position={"seller"}/>
            })}
            {data&&data.length===0?<div className="no-contents"><span>작성된 문의가 없습니다.</span></div>:""}

            {data&&data?.length>10&&<Pagination currentPage={page} handlePageChange={setPage} totalPost={totalPost}/>}



        </div>

    </>)
}
export default SellerQnA