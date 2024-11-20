import MainDetail from "../../../components/shop/product/MainDetail";
import ProductDetailNav from "../../../components/shop/product/ProductDetailNav";
import Products from "../../../components/shop/product/Products";
import ProductDetailContent from "../../../components/shop/product/ProductDetailContent"
import ProductReviewList from "../../../components/shop/product/ProductReviewList";
import ProductQnAList from "../../../components/shop/product/ProductQnAList";
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