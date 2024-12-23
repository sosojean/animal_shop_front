import React, {useEffect, useState} from 'react';
import Title from "../../common/Title";
import instance from "../../../utils/axios";
import ProductQnA from "../../shop/product/QnA/ProductQnA";
import Pagination from "../../board/Pagination";
import Card from "../../common/Card";

const Inquiries = () => {
    const [data, setData] = useState()
    const [totalCount, setTotalCount] = useState()
    const [isEdited, setIsEdited] = useState(false)
    const [page, setPage] = useState(1)


    const selectedUrl = "/mypage/"+"myquery"
    useEffect(() => {
        instance({
            url :selectedUrl,
            method:"get"
        }).then((res) => {
            setData(res.data.responseItemQueryDTOList)
            setTotalCount(res.data.total_count);

            console.log(res.data)

        }).catch((error) => {
            console.log(error);
        })
    }, []);
    return (
        <div>
            <Title>작성한 문의사항</Title>


            {data?.length===0&&<div className="no-contents"><span>작성된 문의가 없습니다.</span></div>}
            <Card>
            {data?.map(item=>{
                return(<ProductQnA key = {item['item_query_id']} item = {item} setIsEdited = {setIsEdited} isEdited = {isEdited}/>)
            })}
            {totalCount>10&&<Pagination currentPage={page} handlePageChange={setPage} totalPost={totalCount} />}
            </Card>


        </div>
    );
};

export default Inquiries;