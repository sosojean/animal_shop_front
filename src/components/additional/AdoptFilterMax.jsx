import Card from "../common/Card";
import Filter from "./Filter";
import { catBreedSelector, dogBreedSelector } from "../../utils/petOptions";
import { useState } from "react";


const AdoptFilterMax = () => {

    const [click, setClick] = useState(false);
    const [isCat, setIsCat] = useState(false);

    return (
        <Card className="filter-max-container">
            <div className="kind-selector">
                <Card>
                    <button onClick={() => setIsCat(false)}>
                        강아지
                    </button>
                </Card>
                <Card>
                    <button onClick={() => setIsCat(true)}>
                        고양이
                    </button>
                </Card>
            </div>
            <div className="breed-selector">
                <p onClick={() => {setClick(!click)}}>선택 정보</p>
                {isCat ?
                    <Filter
                        className="breed-filter"
                        placeholder="품종 검색"
                        array={catBreedSelector}
                        isClick={click}
                    /> :                    
                    <Filter
                        className="breed-filter"
                        placeholder="품종 검색"
                        array={dogBreedSelector}
                        isClick={click}
                    />                
                }
            </div>
            <div className="region-selector">
                <p>선택 정보</p>
                <select>
                    <option>지역</option>
                </select>
            </div>
        </Card>
    )
}

export default AdoptFilterMax;