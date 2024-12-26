import Products from "../../components/shop/product/Products";
import Banner from "../../components/shop/Banner";
import {useEffect, useState} from "react";
import axios from "axios";
import ToggleBtn from "../../components/common/ToggleBtn";
import instance from "../../utils/axios";
import SearchBar from "../../components/map/SearchBar";
import ProductSearchBar from "../../components/shop/product/ProductSearchBar";

const ShopMain = ({isDog, setIsDog}) => {

    const [data, setData] = useState()

    const selectedSpeceis = isDog ? "강아지" : "고양이";
    const selectedIcon = isDog ? "🐕" : "🐈"

    // const [isDog, setIsDog] = useState(true)

    const token  = localStorage.getItem("accessToken");

    useEffect(() => {
        token?
        instance({
            url:"/shop/main",
            method:"get",
            params:{species:isDog?"dog":"cat"}
        }).then(res => {
            setData(res.data);
            console.log("ProductDetail", res.data);

        }).catch(error => {
            console.log(error);
        })
        :
        axios({
            url:`${process.env.REACT_APP_API}/shop/main`,
            method:"get",
            params:{species:isDog?"dog":"cat"}
        }).then(res => {
            setData(res.data);
            console.log("ProductDetail", res.data);

        }).catch(error => {
            console.log(error);
        })
    },[isDog])

    return(
        <>

            <div>

                <ToggleBtn setIsDog={setIsDog} isDog={isDog}/>
                <span>{selectedSpeceis} 상품을 보여드려요</span>
            </div>
            <Banner  isDog={isDog}/>
            <ProductSearchBar/>


            {data && <Products name={"✨ 새로 입고된 상품"} data={data["animal_new"]} url = {"/shop/new"}/>}
            {data && <Products name={`${selectedIcon} 인기 ${selectedSpeceis} 상품`}  data={data["animal_hot"]} url = {"/shop/hot"}/>}
            {data && <Products name={"✨ 맞춤"}  data={data["animal_custom"]} url = {"/shop/all"}/>}


    </>

)
}
export default ShopMain