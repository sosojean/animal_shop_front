import ProductDetailHeader from "../../../components/shop/product/detail/ProductDetailHeader";
import ProductDetailNav from "../../../components/shop/product/detail/ProductDetailNav";
import Products from "../../../components/shop/product/Products";
import ProductDetailContent from "../../../components/shop/product/detail/ProductDetailContent"
import ProductReviewList from "../../../components/shop/product/review/ProductReviewList";
import ProductQnAList from "../../../components/shop/product/QnA/ProductQnAList";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import ProductDetailInfo from "../../../components/shop/product/detail/ProductDetailInfo";

const ProductDetail = () => {
    const [data, setData] = useState()
    const {itemId} =  useParams();
    const [content, setContent] = useState("detail")
    const [isFixed, setIsFixed] = useState(false)

    const targetRef = useRef(null);

    function updateOptionName(data) {
             data.options[0].name = "기본 옵션";
         return data;
    }

    useEffect(() => {
        axios({
            url:`${process.env.REACT_APP_API}/item/detail/${itemId}`,
            method: "get",

        }).then(
            res => {
                setData(updateOptionName(res.data));
                console.log("ProductDetail", res.data);
            }
        )
    },[])

    function handleScroll() {
        const scroll = document.documentElement.scrollTop;
        let navAbsolutePos

        const navbarPos = document.getElementById("navbar-hr");
        if (navbarPos) {
            navAbsolutePos = navbarPos.offsetTop; // getBoundingClientRect 대신 offsetTop 사용
            setIsFixed(scroll >= navAbsolutePos);
        }

        const reviewPos = document.getElementById("review-hr");
        const reviewAbsolutePos = window.scrollY + reviewPos.getBoundingClientRect().top;
        const qnaPos = document.getElementById("qna-hr");
        const qnaAbsolutePos = window.scrollY + qnaPos.getBoundingClientRect().top;
        const infoPos = document.getElementById("info-hr");
        const infoAbsolutePos = window.scrollY + infoPos.getBoundingClientRect().top; //todo 인포 추가 후 처리 해줘야함


        if (qnaPos && qnaPos.offsetTop <= scroll) {
            setContent("qna");
        } else if (reviewPos && reviewPos.offsetTop <= scroll) {
            setContent("review");
        } else if (navbarPos && navAbsolutePos <= scroll) {
            setContent("detail");
        } else if (infoPos && infoAbsolutePos <= scroll) {
            setContent("info")
        }
    }

    useEffect(() => {
        const targetElement = targetRef.current;

        if (targetElement) {
            window.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (targetElement) {
                window.removeEventListener("scroll", handleScroll);

            }

        };
    }, [data]);

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

                <ProductQnAList data = {data} itemId = {itemId}/>
                <hr id="info-hr" ref={targetRef}/>

                <ProductDetailInfo data={data}/>

                <Products/></>}
        </>
    )
}

export default ProductDetail;