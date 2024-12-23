import Card from "../../common/Card";
import Filter from "../adopt/Filter";
import { catBreedSelector, dogBreedSelector} from "../../../utils/petOptions";
import { regionOptions } from "../../../utils/regionOptions";
import { useState } from "react";
import FilterRegion from "../adopt/FilterRegion";
import DefaultButton from "../../common/DefaultButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";

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

    const handleAddSpecies = (species = "개", selectedKey = 'species') => {
        setSelectedItems((prevSelectedItems) => {
              let newSpecies = species
    
              return {
                [selectedKey]: newSpecies
              }
        })
    }

    return (
        <div className="filter-container">
            <Card className="default-card filter-max-container">
                <div className="kind-selector">
                    <DefaultButton 
                        className={`default-button kind-button primary ${selectedItems.species === '개' ? 'active' : ''}`}
                        onClick={() => {
                            setIsCat(false);
                            getRefreshData();
                            handleAddSpecies("개");
                        }}>
                        <span>🐶</span>
                        <span>강아지</span>
                    </DefaultButton>    
                    <DefaultButton 
                        className={`default-button kind-button primary ${selectedItems.species === '고양이' ? 'active' : ''}`}
                        onClick={() => {
                            setIsCat(true);
                            getRefreshData();
                            handleAddSpecies("고양이");
                        }}>
                        <span>🐱</span>
                        <span>고양이</span>
                    </DefaultButton>    
                </div>
                <div className="breed-selector">
                    <DefaultButton
                        className="primary selector-button"
                        onClick={() => {setClick(prevState => ({
                            ...prevState,
                            breed: !prevState.breed}))
                    }}>
                        <span>
                            {selectedItems.breed?.length > 0 
                                ? selectedItems.breed?.length === 1 ?
                                    `${selectedItems.breed[0].name}` :
                                    `${selectedItems.breed[0].name} 외 ${selectedItems.breed?.length - 1}건`
                                : "품종 선택"}                            
                        </span>
                        <span>
                            <FontAwesomeIcon icon={faAngleDoubleDown}/>
                        </span>
                    </DefaultButton>
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
                    <DefaultButton 
                        className="primary selector-button" 
                        onClick={() => {setClick(prevState => ({
                                ...prevState,
                                region: !prevState.region}))
                        }}>
                        <span>
                            {selectedItems.location?.length > 0 
                                ? selectedItems.location[1] ? 
                                    `${selectedItems.location[0]} ${" " + selectedItems.location[1]}` : 
                                    `${selectedItems.location[0]}`
                                : "지역 선택"}                            
                        </span>
                        <span>
                            <FontAwesomeIcon icon={faAngleDoubleDown}/>
                        </span>
                    </DefaultButton>
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
        </div>
    )
}

export default AdoptFilterMax;