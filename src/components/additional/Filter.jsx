import { useState } from "react";
import Card from "../common/Card";
import { faList } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Filter = (props) => {
  const { className, placeholder, array, isClick,
    selectedItems, setSelectedItems
  } = props;

  // const [selectedItems, setSelectedItems] = useState([]);
  // console.log("selectedItems", selectedItems);
  const [secondClick, setSecondClick] = useState(false);
  const [searchText, setSearchText] = useState(""); // 검색어 상태

  const filterArray = Object.entries(array);

  // 검색 필터링 로직
  const filteredArray = searchText
    ? filterArray.filter(([key, value]) =>
        value.toLowerCase().includes(searchText.toLowerCase())
      )
    : filterArray;

  const handleCheckboxChange = (key, name) => {
    setSelectedItems((prevSelectedItems) => {
      // 존재하는지 확인
      const existingIndex = prevSelectedItems.findIndex(
        (item) => item.key === key
      );

      // Toggle the selection state
      if (existingIndex >= 0) {
        // Remove the item if it's already selected
        const newSelectedItems = [...prevSelectedItems];
        newSelectedItems.splice(existingIndex, 1);
        return newSelectedItems;
      } else {
        // Add the item if it's not selected
        return [...prevSelectedItems, { key, value: true, name: name }];
      }
    });
  };

  return (
    <>
      {isClick && (
        <Card className={className}>
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
                        const isChecked = selectedItems.some(
                        (item) => item.key === key
                        );

                        return (
                        <div key={key} className="select-item">
                            <p>{value}</p>
                            <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleCheckboxChange(key, value)}
                            />
                        </div>
                        );
                    })}
                </div>
                <button>적용</button>
            </div>
          )}
        </Card>
      )}
    </>
  );
};

export default Filter;
