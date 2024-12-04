import { useState } from "react"
import FilterMini from "./FilterMini";
import FilterMiniAge from "./FilterMiniAge";


const AdoptFilterMini = (props) => {

    const {
        subSelectedItems, setSubSelectedItems
    } = props;

    const status = [{code: "T", name: "보호중"}, {code: "F", name: "공고중"}];

    const sex = [{code: "M", name: "남아"}, {code:"F", name:"여아"}, 
        {code:"Q", name:"알수없음"}];

    const age = [{code: 1, name: "1살 미만"}, {code: 5, name: "1살 ~ 5살"}, 
        {code: 9, name: "6살 ~ 9살"}, {code: 10, name: "10살 이상"}]

    const neuter = [
        { code: "Y", name: "완료" },
        { code: "N", name: "미완료" },
        { code: "U", name: "알수없음" }
    ]

    const petAttributes = [
        { code: "status", name: "상태" },
        { code: "age", name: "나이" },
        { code: "sex", name: "성별" },
        { code: "neuter", name: "중성화" }
    ];

    const [allShow, setAllShow] = useState(false);
    const [showState, setShowState] = useState({
        status: false, // status
        age: false,
        sex: false,
        neuter: false
      });
    
    // 해당 항목의 상태를 토글하는 함수
    const toggleShow = (code) => {
        setShowState((prevState) => {
          const newState = {
            status: false,
            age: false,
            sex: false,
            neuter: false
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
            {showState.status && 
                <FilterMini
                    data = {status}
                    keyName = "status"
                    selectedItems = {subSelectedItems}
                    setSelectedItems = {setSubSelectedItems}
                />}
            {showState.age &&
                <FilterMiniAge
                    data = {age}
                    keyName = "age"
                    selectedItems = {subSelectedItems}
                    setSelectedItems = {setSubSelectedItems}
                />
            }
            {showState.sex && 
                <FilterMini
                    data = {sex}
                    keyName = "sex"
                    selectedItems = {subSelectedItems}
                    setSelectedItems = {setSubSelectedItems}
                />            
            }
            {showState.neuter &&
                <FilterMini
                    data = {neuter}
                    keyName = "neuter"
                    selectedItems = {subSelectedItems}
                    setSelectedItems = {setSubSelectedItems}
                />     
            }
        </div>
    )
}

export default AdoptFilterMini;