import Products from "../../components/shop/product/Products";
import Banner from "../../components/shop/Banner";
import {useEffect, useState} from "react";
import axios from "axios";

const ShopMain = (props) => {

    const [data, setData] = useState()
    useEffect(() => {
        axios({
            url:"http://localhost:8080/shop/main",
            method:"get"
        }).then(res => {
            setData(res.data);

        }).catch(error => {
            console.log(error);
        })
    },[])

    return(
        <>
        <Banner/>

            {data && <Products name={"🐈 인기 고양이 상품"} data={data["cat_hot"]} url = {"/shop/cat"}/>}
            {data && <Products name={"🐕 인기 강아지 상품"}  data={data["dog_hot"]} url = {"/shop/dog"}/>}
            {data && <Products name={"✨ 새로 입고된 상품"}  data={data["new_goods"]} url = {"/shop/all"}/>}


    </>

)
}
export default ShopMain