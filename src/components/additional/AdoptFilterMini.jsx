import { useState } from "react"
import FilterMini from "./FilterMini";


const AdoptFilterMini = (props) => {

    const processState = [
        { code: "all", name: "전체" },
        { code: "protection", name: "보호" },
        { code: "announcement", name: "공고" }
    ];

    const gender = [
        { code: "all", name: "전체" },
        { code: "female", name: "여아" },
        { code: "male", name: "남아" }
    ]

    // TODO 나이 물어보고 나중에 만들기

    const petAttributes = [
        { code: "processState", name: "상태" },
        { code: "age", name: "나이" },
        { code: "gender", name: "성별" },
        { code: "neutered", name: "중성화" }
      ];

    const neutered = [
        { code: "all", name: "전체" },
        { code: "Y", name: "완료" },
        { code: "N", name: "미완료" },
        { code: "Q", name: "알 수 없음" }
    ]

    const [allShow, setAllShow] = useState(false);
    const [showState, setShowState] = useState({
        processState: false,
        age: false,
        gender: false,
        neutered: false
      });

    const [selectedItems, setSelectedItems] = useState({})

    console.log("selectedItems", selectedItems);
    
    // 해당 항목의 상태를 토글하는 함수
    const toggleShow = (code) => {
        setShowState((prevState) => {
          const newState = {
            processState: false,
            age: false,
            gender: false,
            neutered: false
          };
          newState[code] = !prevState[code]; // 클릭한 항목만 반전
          return newState;
        });
      };

    return (
        <div className="filter-mini-container">
            <button onClick={() => setAllShow(!allShow)}>필터</button>
            {allShow &&
                <ul className="filter-att-list">
                    {petAttributes.map((att, index) => {

                        return (
                            <li key={index} onClick={() => toggleShow(att.code)}>
                                {att.name}
                            </li>
                        )
                    })}
                </ul>            
            }
            {showState.processState && 
                <FilterMini
                    data = {processState}
                    keyName = "processState"
                    selectedItems = {selectedItems}
                    setSelectedItems = {setSelectedItems}
                />}
            {showState.age && <div>age</div>}
            {showState.gender && 
                <FilterMini
                    data = {gender}
                    keyName = "gender"
                    selectedItems = {selectedItems}
                    setSelectedItems = {setSelectedItems}
                />            
            }
            {showState.neutered &&
                <FilterMini
                    data = {neutered}
                    keyName = "neutered"
                    selectedItems = {selectedItems}
                    setSelectedItems = {setSelectedItems}
                />     
            }
        </div>
    )
}

export default AdoptFilterMini;