import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import Products from "../../../components/shop/product/Products";
import Title from "../../../components/common/Title";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight} from "@fortawesome/free-solid-svg-icons";
import ToggleBtn from "../../../components/common/ToggleBtn";
import "../../../assets/styles/shop/allproducts.scss"
import {catItemCategory, dogItemCategory} from "../../../utils/categoryOption";

const AllProduct = (props) => {

    const {category,detail} = useParams();
    const [data, setData] = useState()
    const [selectedItem, setSelectedItem] = useState(category||null);
    const [selectedDetailItem, setSelectedDetailItem] = useState(detail||null);

    const navigate = useNavigate();

    const itemCategory = props.isDog?dogItemCategory:catItemCategory;
    const categoryList = extractMainNames(itemCategory);


    function extractMainNames(categories) {
        return categories.map(category => category.main.name);
    }

    function getKoreanName(categories, name) {
        for (const category of categories) {
            if (category.main.name === name) return category.main.convert;
            for (const subcategory of category.subcategories) {
                if (subcategory.name === name) return subcategory.convert;
            }
        }
        return null; // 이름이 없으면 null 반환
    }

// 특정 main 카테고리에 대한 subcategories의 name을 추출하는 함수
    function getSubcategoriesByMainName(categories, mainName) {
        const category = categories.find(category => category.main.name === mainName);
        return category ? category.subcategories.map(subcategory => subcategory.name) : [];
    }
    const categoryTrimmer = (category, detail) => {
        return Object.fromEntries(
            Object.entries({
                category,
                detailed_category: detail // detail을 detailed_category로 매핑
            }).filter(([_, value]) => value !== "")
        );
    };



    useEffect(() => {
        if (selectedItem !== category) {
            const basePath = selectedItem ? `/shop/list/${selectedItem}` : `/shop/list`;
            const fullPath = detail ? `${basePath}/${detail}` : basePath;
            navigate(fullPath);
        }
    }, [selectedItem, category, detail, navigate]);

    useEffect(() => {
        if (selectedDetailItem !== detail) {
            const basePath = category ? `/shop/list/${category}` : `/shop/list`;
            const fullPath = selectedDetailItem ? `${basePath}/${selectedDetailItem}` : basePath;
            navigate(fullPath);
        }
    }, [selectedDetailItem, category, detail, navigate]);


    useEffect(() => {
        console.log(category, detail)
        const species= localStorage.getItem("species");
        let url = `${process.env.REACT_APP_API}/shop/product-category`
         axios({
            url:url ,
            method:"get",
            params:{
                species:species?species:"dog",
                ...categoryTrimmer(category, detail)
            }
        }).then(res => {
            console.log(res)
            setData(res.data["goods"]);
        }).catch(err=>{
            console.log(err)
        })
    },[category,detail])



    return (<>
        {data&& <>
            <Title>
                <Link to={`/shop/${category}`}>
                    {getKoreanName(itemCategory,category)}
                </Link>
                {detail && <FontAwesomeIcon icon={faAngleRight}/>}
                <Link to={`/shop/${category}/${detail}`}>
                    {getKoreanName(itemCategory,detail)}
                </Link>

            </Title>
            <div className={"all-products"}>
                <nav className="navbar">
                    <ul className=" navbar-menu">
                        {categoryList.map(item=>
                            <li className={selectedItem === item ? "menu-item selected" : "menu-item"}
                                onClick={() => {
                                    setSelectedItem(item);
                                    setSelectedDetailItem(null);
                                }}>
                                {getKoreanName(itemCategory,item)}
                            </li>)}
                    </ul>
                </nav>
                <nav className="navbar">
                    <ul className=" navbar-menu">
                        {selectedItem&&getSubcategoriesByMainName(itemCategory,selectedItem).map(item=>
                            <li className={selectedDetailItem === item ? "menu-item selected" : "menu-item"}
                                onClick={() => setSelectedDetailItem(selectedDetailItem === item ? null : item)}>
                                {getKoreanName(itemCategory,item)}
                            </li>)}
                    </ul>
                </nav>

            </div>

            <Products data={data}/>
        </>}
    </>)

}
export default AllProduct;