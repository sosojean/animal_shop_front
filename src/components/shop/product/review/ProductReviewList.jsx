import ProductReview from "./ProductReview";
import {useEffect, useState} from "react";
import axios from "axios";
import instance from "../../../../utils/axios";
import "../../../../assets/styles/shop/product/productReviewList.scss"
import Pagination from "../../../board/Pagination";


const ProductReviewList = ({itemId}) => {

    const [data, setData] = useState()
    const [isModified, setIsModified] = useState(true);
    const [isEdit, setIsEdit] = useState(false)
    const isLoggedIn = localStorage.getItem("accessToken")?true:false
    const [page, setPage] = useState(1)
    const [totalCount, setTotalCount] = useState(0)


    useEffect(() => {

        if (localStorage.getItem("accessToken")) {
            instance({
                url:`item_comment/${itemId}?page=${page}`,
                method:'get'
            }).then((res) => {
                setData(res.data.comments);
                setTotalCount(res.data.total_count);
                console.log("item_comment/",res.data);

            })

        }else{
            axios({
                url:`${process.env.REACT_APP_API}/item_comment/${itemId}?page=${page}`,
                method:'get'
            }).then((res) => {
                setData(res.data.comments);
            })

        }

    },[isModified, isEdit,page]);



    
    return (
        <>
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
                {totalCount.length>=20&&<Pagination currentPage={page} handlePageChange={setPage} totalPost={totalCount} itemPerPage={20} />}



            </div>
        </>
    )
}

export default ProductReviewList;