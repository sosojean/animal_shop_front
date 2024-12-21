import React, {useEffect, useState} from 'react';
import "../../../assets/styles/shop/admin/productSearchHeader.scss"
import Selector from "../../common/Selector";
import InputField from "../../common/InputField";
import instance from "../../../utils/axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileCsv, faTable, faRotateRight} from "@fortawesome/free-solid-svg-icons";
import DefaultButton from "../../common/DefaultButton";
import { allItemCategory, dogItemCategory, sellStatusCategory } from '../../../utils/categoryOption';


const ProductSearchHeader = ({setQueryData, setQueryDataTotal, queryDataTotal, saveToCsv}) => {
    const searchQuery = {
        searchBy:"0",
        searchTerm:"",
        status:"0",
        species:"0",
        category:"0",
        detailedCategory:"0"
       }
    const [searchQueryData, setSearchQueryData] = useState(searchQuery)

    const applySearchQuery = (infoList) => {
        setSearchQueryData((prev)=>(
            {
                ...prev,
                ...infoList
            }))
        console.log("executed")
        console.log("applySearchQuery", searchQueryData);
    }


    const searchByOptions = ["item","seller"];
    const statusOptions = ["판매상태","sold_out","stop","sell"];
    const speciesOptions = ["강아지/고양이","cat", "dog"];
    const categoryOptions = ["카테고리","food","treats","supplies"];
    const detailedDogCategoryOptions =
        [["세부카테고리"],["세부카테고리","adult", "puppy", "senior", "wet_food", "natural_food", "air/dried_food", "dry_food"],
        ["세부카테고리","homemade_treats", "dental_chews", "nutritional/functional", "chews", "jerky", "bone_treats", "freeze-dried/dehydrated"],
        ["세부카테고리","toys", "walking_supplies", "potty_supplies", "clothing/accessories", "houses/beds", "grooming/care", "nose_work"]];
    const detailedCatCategoryOptions =
        [["세부카테고리"],["세부카테고리","main_cans", "adult", "kitten", "all_ages", "pouches", "dry_food", "air/dried_food"],
            ["세부카테고리","pouch_treats", "freeze_dried/dehydrated", "nutritional/functional", "snack_cans", "jerky", "dental_treats", "snacks"],
            ["세부카테고리","fishing_rods/lasers", "scratchers/boxes", "litter", "tunnels/hunting_instinct", "cat_towers/cat_wheels", "litter_boxes/bathroom_aids", "balls/plush_toys"]];

    const activeFilters = Object.entries(searchQueryData).filter(([key, value]) => {
        if (key === "searchTerm") {
            return value !== ""; // searchTerm이 공란이 아닌 경우
        }
        return value !== "0"; // 나머지는 "0"이 아닌 경우
    });

    useEffect(() => {
        console.log(searchQueryData)
        applySearchQuery({'detailedCategory': "0"})
    },[searchQueryData.category,searchQueryData.species])

    const handleResetFilter = (key) => {
        setSearchQueryData((prevFilters) => ({
            ...prevFilters,
            [key]: key === "searchTerm" ? "" : "0" // searchTerm은 빈 문자열로 초기화
        }));
    };

    function searchHandler(e) {
        e.preventDefault()
        let params={
                searchBy:searchByOptions[searchQueryData.searchBy],
                searchTerm:searchQueryData.searchTerm}
        if (searchQueryData.species!=="0"){
            params={...params, species:speciesOptions[searchQueryData.species]}
        }
        if (searchQueryData.category!=="0"){
            params={...params, category:categoryOptions[searchQueryData.category]}
        }
        if (searchQueryData.detailedCategory!=="0"){
            params={...params,
                detailed_category:searchQueryData.species!=="1"? // 1 = cat
                    detailedDogCategoryOptions[searchQueryData.category][searchQueryData.detailedCategory]:
                    detailedCatCategoryOptions[searchQueryData.category][searchQueryData.detailedCategory]
            }
                // detailed_category 카테고리 파라미터 이름이라 컨벤션 바꾸면 안됨
        }
        if (searchQueryData.status!=="0"){
            params={...params,
                status:statusOptions[searchQueryData.status]

            }
        }


        instance({
            url:"/item/search",
            method:"get",
            params:params
        }).then(res=>{
            console.log(res)
            setQueryData(res.data.itemDTOLists)
            setQueryDataTotal(res.data["total_count"])
        }).catch(err=>{
            console.log(err)
        })
    }

    const getConverted = (origin, type) => {
        const pageType = type;
        let existedIndex;

        switch (pageType) {
            case "detail" :
                existedIndex = allItemCategory.findIndex(v => v.name === origin);
                if (existedIndex > -1) {return allItemCategory[existedIndex].convert;}
                else {return "세부카테고리";}
            case "category" :
                existedIndex = dogItemCategory.findIndex(v => v.main.name === origin);
                if (existedIndex > -1) {return dogItemCategory[existedIndex].main.convert;}
                else {return "카테고리";}
            case "status" :
                existedIndex = sellStatusCategory.findIndex(v => v.name === origin.toUpperCase());
                if (existedIndex > -1) {return sellStatusCategory[existedIndex].convert;}
                else {return "";}
        }
    }

    const mapFilterToOption = (key, value) => {
        const index = parseInt(value, 10);
        let originName;

        switch (key) {
            case "searchBy":
                return searchByOptions[index];
            case "status":
                originName = statusOptions[index];
                return getConverted(originName, "status");
            case "species":
                return speciesOptions[index] === "dog" ? "강아지" : "고양이";
            case "category":
                originName = categoryOptions[index];
                return getConverted(originName, "category");
            case "detailedCategory":
                if (searchQueryData.species === "1") {
                    const originName = detailedCatCategoryOptions[searchQueryData.category]?.[index];
                    return getConverted(originName, "detail") || "세부카테고리";
                }
                if (searchQueryData.species === "2") {
                    const originName = detailedDogCategoryOptions[searchQueryData.category]?.[index];
                    return getConverted(originName, "detail") || "세부카테고리";
                }
                return "세부카테고리";
            default:
                return value;
        }
    };

    const trimOptionText = (option, type) => {
        let existedIndex;

        // type = priceTrimmer
        switch(type){
            case "species":
                return option === "dog" ? "강아지" : 
                    option === "cat" ? "고양이" : "강아지/고양이";
            case "category":
                existedIndex = dogItemCategory.findIndex(v => v.main.name === option);
                if (existedIndex > -1) {return dogItemCategory[existedIndex].main.convert;}
                else {return "카테고리";}   
            case "detail":
                existedIndex = allItemCategory.findIndex(v => v.name === option);
                if (existedIndex > -1) {return allItemCategory[existedIndex].convert;}
                else {return "세부카테고리";}
            case "status":
                existedIndex = sellStatusCategory.findIndex(v => v.name === option.toUpperCase());
                if (existedIndex > -1) {return sellStatusCategory[existedIndex].convert;}
                else {return "판매상태";}
            case "search":
                return option === "item" ? "상품" : "판매자"; 
        }

    }

    const handleAllResetFilter = () => {
        setSearchQueryData(searchQuery);
    }

    console.log("searchQueryData.detailedCategory", searchQueryData.detailedCategory);
    return (
        <div className="product-search-header">


            <form onSubmit={searchHandler} className={"product-filter"}>
                <div>
                    <Selector handleSelectChange={(name, e) => {
                        applySearchQuery({'species': e})
                    }}
                              trimOptionText={trimOptionText}
                              priceTrimmer="species"
                              selectedValue={searchQueryData.species}
                              optionItems={speciesOptions}/>
                    <Selector handleSelectChange={(name, e) => {
                        applySearchQuery({'category': e})
                    }}
                              trimOptionText={trimOptionText}
                              priceTrimmer="category"
                              selectedValue={searchQueryData.category}
                              optionItems={categoryOptions}/>

                    <Selector handleSelectChange={(name, e) => {
                        applySearchQuery({'detailedCategory': e})
                    }}
                              trimOptionText={trimOptionText}
                              priceTrimmer="detail"
                              selectedValue={searchQueryData.detailedCategory}
                              optionItems={searchQueryData.species !== "1" ?
                                  detailedDogCategoryOptions[searchQueryData.category] :
                                  detailedCatCategoryOptions[searchQueryData.category]}/>

                    <Selector handleSelectChange={(name, e) => {
                        applySearchQuery({'status': e})
                    }}
                              trimOptionText={trimOptionText}
                              priceTrimmer="status"
                              selectedValue={searchQueryData.status}
                              optionItems={statusOptions}/>
                </div>

                <div className="row">
                    <Selector handleSelectChange={(name, e) => {
                        applySearchQuery({'searchBy': e})
                    }}
                              trimOptionText={trimOptionText}
                              priceTrimmer="search"
                              selectedValue={searchQueryData.searchBy}
                              optionItems={searchByOptions}/>

                    <InputField name={"searchTerm"}
                                input={searchQueryData.searchTerm}
                                setInput={(_, e) => applySearchQuery({'searchTerm': e})}
                    />

                    <DefaultButton className={"default small"} onClick={searchHandler}>검색</DefaultButton>
                </div>


            </form>

            <div className="search-products-count">
                <div className="filter-buttons row">
                    {activeFilters.length > 0 && (
                        <>
                            {activeFilters.map(([key, value]) => (
                                <button 
                                    className="filter" 
                                    key={key} 
                                    onClick={() => handleResetFilter(key)}
                                >
                                    {mapFilterToOption(key, value)} ✖
                                </button>
                            ))}
                            <button onClick={handleAllResetFilter}>
                                <span><FontAwesomeIcon icon={faRotateRight}/></span>
                                전체 초기화
                            </button>
                        </>
                    )}
                </div>

                <div className="row result-control">
                    <span> {queryDataTotal && `검색결과 ${queryDataTotal.toLocaleString()}건`}</span>
                    <DefaultButton className={"primary"} onClick={saveToCsv}>파일저장 (.csv) <FontAwesomeIcon
                        className="csv-icon" icon={faTable}/></DefaultButton>
                </div>
            </div>


        </div>
    );
};

export default ProductSearchHeader;