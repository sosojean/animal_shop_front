import ProductReview from "./ProductReview";
import {useEffect, useState} from "react";
import axios from "axios";


const ProductReviewList = ({itemId}) => {

    const [data, setData] = useState()
    useEffect(() => {
        axios({
            url:`http://localhost:8080/item_comment/${itemId}?page=1`,
            method:'get'
        }).then((res) => {
            setData(res.data.comments);
            console.log(res.data)
        })
    }, []);
    
    return (
        <>
            <div id="review-target">

                {data && data.map(item =>{
                    return<ProductReview item = {item}/>

                })}


            </div>
        </>
    )
}

export default ProductReviewList;