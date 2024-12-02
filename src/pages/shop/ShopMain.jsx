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
            console.log("ProductDetail", res.data);

        }).catch(error => {
            console.log(error);
        })
    },[])

    return(
        <>
        <Banner/>

            {data && <Products name={"✨ 새로 입고된 상품"} data={data["animal_new"]} url = {"/shop/new"}/>}
            {data && <Products name={`🐕 인기 ${"강아지"} 상품`}  data={data["animal_hot"]} url = {"/shop/hot"}/>}
            {data && <Products name={"✨ 맞춤"}  data={data["animal_custom"]} url = {"/shop/all"}/>}


    </>

)
}
export default ShopMain