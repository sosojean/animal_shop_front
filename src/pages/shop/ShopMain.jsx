import Products from "../../components/shop/product/Products";
import Banner from "../../components/shop/Banner";
import {useEffect, useState} from "react";
import axios from "axios";
import ToggleBtn from "../../components/common/ToggleBtn";
import instance from "../../utils/axios";
import PetSelector from "../../components/shop/petSelector";
import CategorySelector from "../../components/shop/CategorySelector";
import SearchBar from "../../components/map/SearchBar";
import ProductSearchBar from "../../components/shop/product/ProductSearchBar";
import category from "../board/Category";

const ShopMain = ({isDog, setIsDog}) => {

    const [data, setData] = useState({
        "animal_custom": [],
        "animal_new": [],
        "animal_hot": [],
    });
    const [petData, setPetData] = useState([])

    const [isEdit, setIsEdit] = useState(false)
    const [leaderPetChange, setLeaderPetChange] = useState(false)
    const [customUrl, setCustomUrl] = useState("")

    const selectedSpeceis = isDog ? "강아지" : "고양이";
    const selectedIcon = isDog ? "🐕" : "🐈"


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
    },[isDog,isEdit])


    useEffect(() => {
        const category = data?.["animal_custom"]?.[0]?.["category"];
        const detailedCategory = data?.["animal_custom"]?.[0]?.["detailed_category"];

        if (category && detailedCategory) {
            setCustomUrl(`/shop/list/${category}/${detailedCategory}`);
        }
    }, [data]);


    useEffect(() => {
        if (token) {
            instance({
                url:"/pet/list",
                method:"get",
            }).then(res => {
                console.log(res);
                setPetData(res.data.petProfileList);
            })
        }
    }, [isEdit]);


    return(
        <>

            <Banner isDog={isDog}/>

            <CategorySelector isDog={isDog} setIsDog={setIsDog}/>
            {data && <Products name={"✨ 새로 입고된 상품"} data={data["animal_new"]}
                               url={"/shop/new"}/>}
            {data && <Products name={`${selectedIcon} 인기 ${selectedSpeceis} 상품`}
                               data={data["animal_hot"]} url={"/shop/best"}/>}

            {data && <Products name={petData.length>0?"✨ 맞춤":"✨ 오늘의 추천 상품"}
                               data={data["animal_custom"]}
                               petData = {petData}
                               url={customUrl} isCustom={petData.length>0}
                               setIsEdit={setIsEdit} isEdit={isEdit}/>}




        </>

    )
}
export default ShopMain