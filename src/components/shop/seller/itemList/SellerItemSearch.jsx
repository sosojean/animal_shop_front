import { useState } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRotateRight} from "@fortawesome/free-solid-svg-icons";
import { dogItemCategory, catItemCategory, allItemCategory, 
    sellStatusCategory } from "../../../../utils/categoryOption";
import DefaultButton from "../../../common/DefaultButton";

const SellerItemSearch = (props) => {

    const {params, setParams, totalCount} = props;

    const [species, setSpecies] = useState("total");
    const [category, setCategory] = useState("total");
    const [detail, setDetail] = useState("total")
    const [status, setStatus] = useState("total")
    const [term, setTerm] = useState("");
    const [discount, setDiscount] = useState("total");

    const paramsList = [species, category, detail, status, discount];

    // 파라미터 이름과 값을 매핑하는 객체 추가
    const paramsMap = {
            [species]: "species",
            [category]: "category",
            [detail]: "detail",
            [status]: "status",
            [discount]: "discount"
    };

    const dogDetailedCategory = dogItemCategory.filter((value, index) => {
        return value.main.name === category});
        // [0].subcategories

    const catDetailedCategory = catItemCategory.filter((value, index) => {
        return value.main.name === category});

    const handleAddParam = () => {
        setParams(() => {
            const newParams = {};
            
            if (species !== "total") {newParams.species = species;}
            if (category !== "total") {newParams.category = category;}
            if (detail !== "total") {newParams.detailed_category = detail;}
            if (status !== "total") {newParams.status = status;}
            if (term !== "") {newParams.searchTerm = term;}
            if (discount !== "total") {newParams.discount = discount;}

            return Object.keys(newParams).length > 0 ? newParams : {};
        });
    };

    const handleResetFilter = (param) => {

        const paramName = paramsMap[param];

        switch(paramName) {
            case "species":
                setSpecies("total");
                break;
            case "category":
                setCategory("total");
                break;
            case "detail":
                setDetail("total");
                break;
            case "status":
                setStatus("total");
                break;
            case "discount":
                setDiscount("total");
                break;
        }
    };

    const handleAllResetFilter = () => {
        setSpecies("total");
        setCategory("total");
        setDetail("total");
        setStatus("total");
        setDiscount("total");
    }

    const getConvertedName = (param, type) => {
        let index;

        switch (type) {
            case "status":
                index = sellStatusCategory.findIndex(v => v.name === param.toUpperCase());
                return sellStatusCategory[index].convert || "오류";
            case "species":
                return param === "dog" ? "강아지" : "고양이";
            case "category":
                index = dogItemCategory.findIndex(v => v.main.name === param);
                return dogItemCategory[index].main.convert;
            case "detail":
                index = allItemCategory.findIndex(v => v.name === param);
                return allItemCategory[index].convert;
            case "discount":
                return param === "true" ? "할인판매" : "정가판매";
        }
    }

    return (
        <div className="seller-search-main-container">
            <div className="seller-search-container">
                <select onChange={(e) => {setSpecies(e.target.value);}}>
                    <option value="total">강아지/고양이</option>
                    <option value="dog">강아지</option>
                    <option value="cat">고양이</option>
                </select>
                <select onChange={(e) => {setCategory(e.target.value);}}>
                    <option value="total">카테고리</option>
                    {dogItemCategory.map((value) => {
                            return <option value={value.main.name}>{value.main.convert}</option>
                    })}
                </select>
                <select onChange={(e) => {setDetail(e.target.value);}}>
                    <option value="total">세부 카테고리</option>
                    {species !== "total" && category !== "total" ? 
                        species === "dog" ?
                            dogDetailedCategory[0].subcategories.map((value) => {
                                return <option value={value.name}>{value.convert}</option>
                            }) :
                            catDetailedCategory[0].subcategories.map((value) => {
                                return <option value={value.name}>{value.convert}</option>
                            })
                        : allItemCategory.map((value) => {
                            return <option value={value.name}>{value.convert}</option>})
                    }
                </select>
                <select onChange={(e) => {setStatus(e.target.value);}}>
                    <option value="total">판매상태</option>
                    <option value="sell">판매</option>
                    <option value="sold_out">품절</option>
                    <option value="stop">판매중단</option>
                </select>
                <select onChange={(e) => {setDiscount(e.target.value);}}>
                    <option value="total">할인상태</option>
                    <option value="true">할인판매</option>
                    <option value="false">정가판매</option>
                </select>
                <div className="search-input">
                    <input type="search" placeholder="상품명을 입력해주세요" onChange={(e) => {setTerm(e.target.value);}}/>
                    <button onClick={() => {
                        handleAddParam();}}>검색</button>                    
                </div>
            </div>
            <div className="filter-list">
                <div className="filter-buttons row">
                    {paramsList.map((param, index) => {
                        if (param === "total"){ return null } 
                        else { return <button key={index} 
                            onClick={() => handleResetFilter(paramsList[index])}>
                                {getConvertedName(param, paramsMap[param])} ✖</button> }
                    })}
                    {paramsList.some(param => param !== "total") &&
                        <button onClick={handleAllResetFilter} className="reset-button">
                            <span style={{marginRight: "5px"}}><FontAwesomeIcon icon={faRotateRight}/></span>전체 초기화</button>                
                    }
                </div>          
                <p>검색결과 {totalCount}건</p>     
            </div>
        </div>

    )
}

export default SellerItemSearch;