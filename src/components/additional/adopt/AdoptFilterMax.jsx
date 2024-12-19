import Card from "../../common/Card";
import Filter from "../adopt/Filter";
import { catBreedSelector, dogBreedSelector} from "../../../utils/petOptions";
import { regionOptions } from "../../../utils/regionOptions";
import { useState } from "react";
import FilterRegion from "../adopt/FilterRegion";


const AdoptFilterMax = (props) => {

    const {selectedItems, setSelectedItems, getRefreshData} = props;

    const [click, setClick] = useState({breed: false, region: false});
    const [isCat, setIsCat] = useState(false);

    const handleDeleteItem = (index) => {
        setSelectedItems((prevSelectedItems) => {
            const key = "breed"
            const breedArray = prevSelectedItems[key] || [];

            // 새로운 배열 생성 (불변성 유지)
            const newBreedArray = breedArray.filter((_, i) => i !== index);

            // 새로운 객체 반환 (불변성 유지)
            return {
                ...prevSelectedItems,
                [key]: newBreedArray
            };
        })
    }

    const handleAddSpecies = (species = "dog", selectedKey = 'species') => {
        setSelectedItems((prevSelectedItems) => {
    
              let newSpecies = species

    
              return {
                [selectedKey]: newSpecies
              }
        })
    }

    return (
        <>
        <Card className="default-card filter-max-container">
            <div className="kind-selector">
                <Card>
                    <button onClick={() => {
                        setIsCat(false);
                        getRefreshData();
                        handleAddSpecies("개");
                    }}>
                        강아지
                    </button>
                </Card>
                <Card>
                    <button onClick={() => {
                        setIsCat(true);
                        getRefreshData();
                        handleAddSpecies("고양이");
                    }}>
                        고양이
                    </button>
                </Card>
            </div>
            <div className="breed-selector">
                <p onClick={() => {setClick(prevState => ({
                        ...prevState,
                        breed: !prevState.breed}))
                }}>
                    {selectedItems.breed?.length > 0 
                        ? selectedItems.breed?.length === 1 ?
                            `${selectedItems.breed[0].name}` :
                            `${selectedItems.breed[0].name} 외 ${selectedItems.breed?.length - 1}건`
                        : "품종 선택"}
                </p>
                {isCat ?
                    <Filter
                        className="breed-filter"
                        placeholder="품종 검색"
                        array={catBreedSelector}
                        isClick={click.breed}
                        selectedItems={selectedItems}
                        setSelectedItems={setSelectedItems}
                        getRefreshData={getRefreshData}
                    /> :                    
                    <Filter
                        className="breed-filter"
                        placeholder="품종 검색"
                        array={dogBreedSelector}
                        isClick={click.breed}
                        selectedItems={selectedItems}
                        setSelectedItems={setSelectedItems}
                        getRefreshData={getRefreshData}
                    />                
                }
            </div>
            <div className="region-selector">
                <p onClick={() => {setClick(prevState => ({
                            ...prevState,
                            region: !prevState.region}))
                    }}>
                    {selectedItems.location?.length > 0 
                        ? selectedItems.location[1] ? 
                            `${selectedItems.location[0]} ${" " + selectedItems.location[1]}` : 
                            `${selectedItems.location[0]}`
                        : "지역 선택"}
                </p>
                <FilterRegion
                    className="region-filter"
                    array={regionOptions}
                    isClick={click.region}
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                    getRefreshData={getRefreshData}
                />
            </div>
        </Card>
        <div className="filter-breed-container">
            {selectedItems.breed?.length > 0 && (
            <>
                <div className="filter-breed-list">
                    {selectedItems.breed.map((item, index) => {
                        
                        return (
                            <div className="filter-breed-item" key={item.key}>
                                <span>{item.name}</span>
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