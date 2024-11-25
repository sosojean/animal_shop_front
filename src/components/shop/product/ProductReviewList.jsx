import ProductReview from "./ProductReview";
import {useEffect, useState} from "react";
import axios from "axios";
import instance from "../../../utils/axios";


const ProductReviewList = ({itemId}) => {

    const [data, setData] = useState()
    const [isModified, setIsModified] = useState(true);
    const [isEdit, setIsEdit] = useState(false)
    const isLoggedIn = localStorage.getItem("accessToken")?true:false

    useEffect(() => {
        let getFunc
        if (localStorage.getItem("accessToken")) {
            instance({
                url:`item_comment/${itemId}?page=1`,
                method:'get'
            }).then((res) => {
                setData(res.data.comments);
                // console.log(res.data)
            })

        }else{
            axios({
                url:`http://localhost:8080/item_comment/${itemId}?page=1`,
                method:'get'
            }).then((res) => {
                setData(res.data.comments);
                // console.log(res.data)
            })

        }

    },[isModified, isEdit]);



    
    return (
        <>
            <div id="review-target">
            <span>리뷰</span>
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


            </div>
        </>
    )
}

export default ProductReviewList;