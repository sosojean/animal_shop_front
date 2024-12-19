import { useState } from "react";
import Card from "../../common/Card";
import { faList } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Filter = (props) => {
  const { className, placeholder, array, isClick,
    selectedItems, setSelectedItems, getRefreshData
  } = props;

  const [secondClick, setSecondClick] = useState(false);
  const [searchText, setSearchText] = useState(""); // 검색어 상태

  const filterArray = Object.entries(array);

  // 검색 필터링 로직
  const filteredArray = searchText
    ? filterArray.filter(([key, value]) =>
        value.toLowerCase().includes(searchText.toLowerCase())
      )
    : filterArray;

  const handleCheckboxChange = (key, name, selectedKey = 'breed') => {

    setSelectedItems((prevSelectedItems) => {
      // breed 배열 찾기
      const breedArray = prevSelectedItems[selectedKey] || [];
  
      // breed 배열에서 해당 항목 찾기
      const existingIndex = breedArray.findIndex(item => item.key === key);
  
      let newBreedArray;
      if (existingIndex >= 0) {
        // 이미 선택된 항목이면 제거
        newBreedArray = breedArray.filter(item => item.key !== key);
      } else {
        // 선택되지 않은 항목이면 추가
        newBreedArray = [...breedArray, { key, checked: true, name }];
      }
  
      // 새로운 상태 반환
      return {
        ...prevSelectedItems,
        [selectedKey]: newBreedArray
      };
    });
  };

  return (
    <>
      {isClick && (
        <Card className="default-card">
          <div className="filter-util-container">
            <input
                type="text"
                placeholder={placeholder}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)} // 검색어 상태 업데이트
            />
            <button
                onClick={() => setSecondClick(!secondClick)}
                className="open-button"
            >
                <FontAwesomeIcon icon={faList}/>   
            </button>            
          </div>
          {secondClick && (
            <div className="select-container">
                <div className="select-list">
                    {filteredArray.map(([key, value]) => {
                        const isChecked = selectedItems?.breed?.some(
                        (item) => item.key === key
                        ) || false;

                        return (
                        <div key={key} className="select-item">
                            <p>{value}</p>
                            <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                              handleCheckboxChange(key, value);
                              getRefreshData();}}
                            />
                        </div>
                        );
                    })}
                </div>
            </div>
          )}
        </Card>
      )}
    </>
  );
};

export default Filter;
