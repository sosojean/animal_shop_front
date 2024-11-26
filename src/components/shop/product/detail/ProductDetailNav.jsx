import '../../../../assets/styles/shop/product/productDetailNav.scss'
import {Link} from "react-router-dom";
import {useState} from "react";

const ProductDetailNav = ({content , setContent, isFixed}) => {

    const scrollCallBack = (e) =>{
        // console.log(e)
        document.getElementById(e.target.id+"-target").scrollIntoView();
        setContent(e.target.id );
    }
    return (
        <>
            <ul  className={"productDetailNavContainer" +" "+(isFixed ? "fixed" : "")}>
                <hr/>
                <li  className={ content == "detail"?"active":""}>
                    <button onClick={scrollCallBack} id="detail">상품 상세</button>
                </li>
                <li   className={ content == "review"?"active":""}>
                    <button onClick={scrollCallBack} id="review">리뷰</button>
                </li>
                <li className={  content == "qna"?"active":""}>
                    <button onClick={scrollCallBack} id="qna">문의</button></li>
                <li  className={content == "info" ? "active" : ""}>
                    <button   id="info">상세 정보</button>
                </li>
            </ul>
        </>
    )
}

export default ProductDetailNav;