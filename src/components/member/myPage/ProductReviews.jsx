import React, {useEffect, useState} from 'react';
import Title from "../../common/Title";
import instance from "../../../utils/axios";
import ProductReview from "../../shop/product/review/ProductReview";
import Card from "../../common/Card";
import Pagination from "../../board/Pagination";

const ProductReviews = () => {
    const [data, setData] = useState()
    const [isModified, setIsModified] = useState(true);
    const [isEdit, setIsEdit] = useState(false)
    const isLoggedIn = localStorage.getItem("accessToken")?true:false


    const [page, setPage] = useState(1)
    const [totalCount, setTotalCount] = useState(0)


    const selectedUrl = "/mypage/"+"myreview"
    useEffect(() => {
        instance({
            url :selectedUrl,
            method:"get",
            params:{page}
        }).then((res) => {
            setData(res.data.comments)
            setTotalCount(res.data.total_count)
            console.log(res.data)

        }).catch((error) => {
            console.log(error);
        })
    }, [page]);
    return (
        <div>
            <Title>작성한 상품 리뷰</Title>
            <Card>
                    <div id="review-target">
                        <h2>리뷰</h2>
                        {data && data.length===0&&<div className="no-contents"><span>아직 작성된 리뷰가 없습니다.</span></div>}
                        {data && data.map(item =>{
                            return (
                                <ProductReview
                                    key = {item.id}
                                    item = {item}
                                    isModified = {isModified}
                                    setIsModified = {setIsModified}
                                    isEdit = {isEdit}
                                    setIsEdit = {setIsEdit}
                                    isLoggedIn = {isLoggedIn}

                                />)

                        })}
                        {totalCount && totalCount>=15&&<Pagination currentPage={page} handlePageChange={setPage} totalPost={totalCount} itemPerPage={15} />}



                    </div>
            </Card>
            
        </div>
    );
};

export default ProductReviews;