import Card from "../common/Card";
import { useState } from "react";

const FilterRegion = (props) => {

    const { className, placeholder, array, isClick,
        selectedItems, setSelectedItems
      } = props;

    const [secondClick, setSecondClick] = useState(false);
    const [thirdClick, setThirdClick] = useState(false);
    const [currentCode, setCurrentCode] = useState();
    const [currentSubCode, setCurrentSubCode] = useState();

    const filterArray = array;
    const subFilterArray = array.find(value => value.uprCd === currentCode)?.subcategories ?? [];

    return (
        <>
        {isClick &&
            <Card className={className}>
                <div className="select-container">
                    <p>시/도</p>
                    <button onClick={() => setSecondClick(!secondClick)}>
                        {filterArray.find(value => value.uprCd === currentCode)?.name ?? "시/도 선택"}
                    </button>
                    {secondClick && 
                        <div className="select-list">
                            {filterArray?.map((value, index) => {
                                    return (
                                    <p key={value.uprCd}
                                        onClick={() => setCurrentCode(value.uprCd)}>
                                        {value.name}
                                    </p>
                                    );
                            })}
                        </div>               
                    }
                
                </div>
                <div className="select-container">
                    <p>군/구</p>
                    <button onClick={() => setThirdClick(!thirdClick)}>
                        {subFilterArray.find(value => value.orgCd === currentSubCode)?.name ?? "시/도 선택"}
                    </button>
                    {thirdClick && 
                        <div className="select-list">
                            {subFilterArray?.map((value, index) => {
                                    return (
                                    <p key={value.orgCd}
                                        onClick={() => setCurrentSubCode(value.orgCd)}>
                                        {value.name}
                                    </p>
                                    );
                            })}
                        </div>               
                    }
                
                </div>
            </Card>            
        }
        </>
    )
}

export default FilterRegion;