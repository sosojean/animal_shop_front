import MainDetail from "../../components/shop/MainDetail";
import ProductDetailNav from "../../components/shop/ProductDetailNav";
import Products from "../../components/shop/Products";
import ProductDetailContent from "../../components/shop/ProductDetailContent"
import ProductReviewList from "../../components/shop/ProductReviewList";
import ProductQnAList from "../../components/shop/ProductQnAList";
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

const ProductDetail = () => {
    const [data, setData] = useState()
    const [defaultPrice, setDefaultPrice] = useState()
    const {itemId} =  useParams();


    useEffect(() => {
        axios({
            url:`http://localhost:8080/item/detail/${itemId}`,
            method: "get",

        }).then(
            res => {
                setData(res.data);
                console.log(res.data);
            }
        )
    },[])

    return(
        <>
            {data && <>
                <MainDetail data={data}/>
                <ProductDetailNav/>
                <ProductDetailContent url={data["image_url"]}/>
                {/* <ProductReviewList/> */}
                <ProductQnAList/>
                <Products/></>}
        </>
    )
}

export default ProductDetail;