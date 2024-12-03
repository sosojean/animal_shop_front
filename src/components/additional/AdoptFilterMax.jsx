import Card from "../common/Card";
import Filter from "./Filter";
import { catBreedSelector, dogBreedSelector } from "../../utils/petOptions";
import { useState } from "react";
import FilterRegion from "./FilterRegion";


const AdoptFilterMax = (props) => {

    const {selectedItems, setSelectedItems} = props;

    const [click, setClick] = useState(false);
    const [isCat, setIsCat] = useState(false);

    const handleDeleteItem = (index) => {
        setSelectedItems((prevSelectedItems) => {
            const newSelectedItems = [...prevSelectedItems];
            newSelectedItems.splice(index, 1); // 해당 인덱스의 항목 제거
            return newSelectedItems;
        })
    }

    return (
        <>
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
                <p onClick={() => {setClick(!click)}}>
                    {selectedItems.length > 0 
                        ? selectedItems.length === 1 ?
                            `${selectedItems[0].name}` :
                            `${selectedItems[0].name} 외 ${selectedItems.length - 1}건`
                        : "선택 품종 정보"}
                </p>
                {isCat ?
                    <Filter
                        className="breed-filter"
                        placeholder="품종 검색"
                        array={catBreedSelector}
                        isClick={click}
                        selectedItems={selectedItems}
                        setSelectedItems={setSelectedItems}
                    /> :                    
                    <Filter
                        className="breed-filter"
                        placeholder="품종 검색"
                        array={dogBreedSelector}
                        isClick={click}
                        selectedItems={selectedItems}
                        setSelectedItems={setSelectedItems}
                    />                
                }
            </div>
            <div className="region-selector">
                <p>선택 정보</p>
                <FilterRegion/>
            </div>
        </Card>
        <div className="filter-breed-container">
            {selectedItems[0] && (
            <>
                <div className="filter-breed-list">
                    {selectedItems.map((item, index) => {
                        
                        return (
                            <div className="filter-breed-item">
                                <span key={item.key}>{item.name}</span>
                                <button onClick={() => handleDeleteItem(index)}>X</button>                
                            </div>
                        )

                    })}
                </div>
                <button onClick={() => setSelectedItems([])}>선택 초기화</button>
            </>
            )}
        </div>
        </>
    )
}

export default AdoptFilterMax;