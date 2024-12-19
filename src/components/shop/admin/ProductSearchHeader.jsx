import React, {useEffect, useState} from 'react';
import "../../../assets/styles/shop/admin/productSearchHeader.scss"
import Selector from "../../common/Selector";
import InputField from "../../common/InputField";
import instance from "../../../utils/axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileCsv, faTable} from "@fortawesome/free-solid-svg-icons";
import DefaultButton from "../../common/DefaultButton";
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
            ["세부카테고리","pouch_treats", "freeze-dried/dehydrated", "nutritional/functional", "snack_cans", "jerky", "dental_treats", "snacks"],
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

    const mapFilterToOption = (key, value) => {
        const index = parseInt(value, 10);
        switch (key) {
            case "searchBy":
                return searchByOptions[index];
            case "status":
                return statusOptions[index];
            case "species":
                return speciesOptions[index];
            case "category":
                return categoryOptions[index];
            case "detailedCategory":
                if (searchQueryData.species === "1") {
                    return detailedCatCategoryOptions[searchQueryData.category]?.[index] || "세부카테고리";
                }
                if (searchQueryData.species === "2") {
                    return detailedDogCategoryOptions[searchQueryData.category]?.[index] || "세부카테고리";
                }
                return "세부카테고리";
            default:
                return value;
        }
    };

    return (
        <div className="product-search-header">


            <form onSubmit={searchHandler} className={"product-filter"}>
                <div>
                    <Selector handleSelectChange={(name, e) => {
                        applySearchQuery({'species': e})
                    }}
                              selectedValue={searchQueryData.species}
                              optionItems={speciesOptions}/>
                    <Selector handleSelectChange={(name, e) => {
                        applySearchQuery({'category': e})
                    }}
                              selectedValue={searchQueryData.category}
                              optionItems={categoryOptions}/>

                    <Selector handleSelectChange={(name, e) => {
                        applySearchQuery({'detailedCategory': e})
                    }}
                              selectedValue={searchQueryData.detailedCategory}
                              optionItems={searchQueryData.species !== "1" ?
                                  detailedDogCategoryOptions[searchQueryData.category] :
                                  detailedCatCategoryOptions[searchQueryData.category]}/>

                    <Selector handleSelectChange={(name, e) => {
                        applySearchQuery({'status': e})
                    }}
                              selectedValue={searchQueryData.status}
                              optionItems={statusOptions}/>
                </div>

                <div className="row">
                    <Selector handleSelectChange={(name, e) => {
                        applySearchQuery({'searchBy': e})
                    }}
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
                        activeFilters.map(([key, value]) => (
                            <button className="filter" key={key} onClick={() => handleResetFilter(key)}>
                                {mapFilterToOption(key, value)} ✖
                            </button>
                        ))
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