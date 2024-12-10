import { useState } from "react";
import { dogItemCategory, catItemCategory } from "../../../../utils/categoryOption";

const SellerItemSearch = (props) => {

    const {params, setParams} = props;

    const [species, setSpecies] = useState("total");
    const [category, setCategory] = useState("total");

    const handleAddParam = () => {
        setParams(() => {
            const newParams = {};
            
            if (species !== "total") {
                newParams.species = species;
            }
            
            if (category !== "total") {
                newParams.category = category;
            }
            
            // 추후 추가될 파라미터들도 같은 방식으로 처리할 수 있습니다.
            // if (newParam) {
            //     newParams.newParam = newParam;
            // }

            return Object.keys(newParams).length > 0 ? newParams : {};
        });
    };

    // const handleAddParam = () => {
    //     setParams((prevParams) => {
    //         let newParams = {...prevParams};

    //         if (species.species !== "total") {
    //             Object.assign(newParams, {...species});
    //             Object.assign(newParams, {...category});

    //             console.log("newParams", newParams);
    //             return newParams;                
    //         } else {
    //             newParams = {};
    //             return newParams;
    //         }

    //         // Object.assign(newParams, {...category});

    //         // return newParams;
    //     })
    // }

    return (
        <div>
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
            <button onClick={() => {
                handleAddParam();}}>검색</button>
        </div>
    )
}

export default SellerItemSearch;