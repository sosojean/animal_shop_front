import ProductDetailHeader from "../../../components/shop/product/ProductDetailHeader";
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
    const {itemId} =  useParams();
    const [content, setContent] = useState("detail")
    const [isFixed, setIsFixed] = useState(false)


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

    function getScroll() {
        const scroll = document.documentElement.scrollTop;

        const navbarPos = document.getElementById("navbar-hr");
        const navAbsolutePos = window.scrollY + navbarPos.getBoundingClientRect().top;

        const reviewPos = document.getElementById("review-hr");
        const reviewAbsolutePos = window.scrollY + reviewPos.getBoundingClientRect().top;
        const qnaPos = document.getElementById("qna-hr");
        const qnaAbsolutePos = window.scrollY + qnaPos.getBoundingClientRect().top;
        const infoPos = document.getElementById("info-hr");
        // const infoAbsolutePos = window.scrollY + infoPos.getBoundingClientRect().top; //todo 인포 추가 후 처리 해줘야함


        console.log(navAbsolutePos);
        navAbsolutePos < scroll? setIsFixed(true):setIsFixed(false);

        if ( qnaAbsolutePos < scroll){
            setContent("qna")
        }
        else if (  reviewAbsolutePos < scroll){
            setContent("review")
        }else if ( navAbsolutePos < scroll){
            setContent("detail")
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', getScroll);
        return () => window.removeEventListener('scroll', getScroll);
    }, []);

    return(
        <>
            {data && <>
                <ProductDetailHeader data={data}/>
                <hr id="navbar-hr"/>

                <ProductDetailNav content={content} setContent={setContent} isFixed={isFixed}/>
                <ProductDetailContent url={data["image_url"]}/>
                <hr id="review-hr"/>

                <ProductReviewList itemId = {itemId}/>
                <hr id="qna-hr"/>

                <ProductQnAList itemId = {itemId}/>
                <hr id="info-hr"/>

                <Products/></>}
        </>
    )
}

export default ProductDetail;