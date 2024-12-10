import { useState } from "react";
import { dogItemCategory, catItemCategory, allItemCategory } from "../../../../utils/categoryOption";

const SellerItemSearch = (props) => {

    const {params, setParams} = props;

    const [species, setSpecies] = useState("total");
    const [category, setCategory] = useState("total");
    const [detail, setDetail] = useState("total")
    const [status, setStatus] = useState("total")
    const [term, setTerm] = useState("");

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

            return Object.keys(newParams).length > 0 ? newParams : {};
        });
    };

    return (
        <div className="seller-search-container">
            <select onChange={(e) => {setSpecies(e.target.value);}}>
                <option value="total">전체</option>
                <option value="dog">강아지</option>
                <option value="cat">고양이</option>
            </select>
            <select onChange={(e) => {setCategory(e.target.value);}}>
                <option value="total">전체</option>
                {dogItemCategory.map((value) => {
                        return <option value={value.main.name}>{value.main.convert}</option>
                })}
            </select>
            <select onChange={(e) => {setDetail(e.target.value);}}>
                <option value="total">전체</option>
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
                <option value="total">전체</option>
                <option value="sell">판매</option>
                <option value="sold_out">품절</option>
                <option value="stop">판매중단</option>
            </select>
            <input type="search" placeholder="상품명을 입력해주세요" onChange={(e) => {setTerm(e.target.value);}}/>
            <button onClick={() => {
                handleAddParam();}}>검색</button>
        </div>
    )
}

export default SellerItemSearch;