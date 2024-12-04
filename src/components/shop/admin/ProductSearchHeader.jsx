import React, {useEffect, useState} from 'react';
import "../../../assets/styles/shop/admin/productSearchHeader.scss"
import Selector from "../../common/Selector";
import InputField from "../../common/InputField";
import instance from "../../../utils/axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileCsv, faTable} from "@fortawesome/free-solid-svg-icons";
const ProductSearchHeader = ({setQueryData, setQueryDataTotal, queryDataTotal}) => {
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


    const searchByOptions = ["seller","item"];
    const statusOptions = ["전체","sold_out","stop","sell"];
    const speciesOptions = ["전체","cat", "dog"];
    const categoryOptions = ["전체","Toys","Food","Accessories","Health"];
    const detailedCategoryOptions =
        [["전체"],["전체","Chewing","Interactive"],
        ["전체","Wet Food","Dry Food"],
        ["전체","Harnesses","Clothing","Mats"],
        ["전체","Parasite Control","Care","Supplements"]];

    useEffect(() => {
        console.log(searchQueryData)

    },[searchQueryData])

    function searchHandler(e) {
        e.preventDefault()
        let params ={
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
                detailed_category:detailedCategoryOptions[searchQueryData.category][searchQueryData.detailedCategory]}
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

    return (
        <div className="product-search-header">

            <form>
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
                          optionItems={detailedCategoryOptions[searchQueryData.category]}/>

                <Selector handleSelectChange={(name, e) => {
                    applySearchQuery({'status': e})
                }}
                          selectedValue={searchQueryData.status}
                          optionItems={statusOptions}/>

                <Selector handleSelectChange={(name, e) => {
                    applySearchQuery({'searchBy': e})
                }}
                          selectedValue={searchQueryData.searchBy}
                          optionItems={searchByOptions}/>

                <InputField name={"searchTerm"}
                            input={searchQueryData.searchTerm}
                            setInput={(_, e) => applySearchQuery({'searchTerm': e})}
                />

                <button onClick={searchHandler}>검색</button>
            </form>


        </div>
    );
};

export default ProductSearchHeader;