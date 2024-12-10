import { useState } from "react";


const SellerItemSearch = (props) => {

    const {params, setParams} = props;

    const [species, setSpecies] = useState();

    const handleAddParam = () => {
        setParams((prevParams) => {
            let newParams = {...prevParams};

            if (species.species !== "total") {
                Object.assign(newParams, {...species});

                console.log("newParams", newParams);
                return newParams;                
            } else {
                newParams = {};
                return newParams;
            }

        })
    }

    return (
        <div>
            <select onChange={(e) => setSpecies((prevSpecies) => {
                    return {species: e.target.value};})}>
                <option value="total">전체</option>
                <option value="dog">강아지</option>
                <option value="cat">고양이</option>
            </select>
            <button onClick={() => {
                handleAddParam();}}>검색</button>
        </div>
    )
}

export default SellerItemSearch;