import { useState } from "react"
import FilterMini from "./FilterMini";
import FilterMiniAge from "./FilterMiniAge";


const AdoptFilterMini = (props) => {

    const {
        subSelectedItems, setSubSelectedItems, getRefreshData
    } = props;

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
        { code: "age", name: "나이" },
        { code: "sex", name: "성별" },
        { code: "neuter", name: "중성화" }
    ];

    const [allShow, setAllShow] = useState(false);
    const [showState, setShowState] = useState({
        age: false,
        sex: false,
        neuter: false
      });

    const extractedData = Object.entries(subSelectedItems);
    // console.log("extractedData", extractedData);

    // 문자열 변환
    const getConvertedString = (key, code) => {

        // 배열선택
        let selectedList;
        switch (key) {
            case "neuter":
                selectedList = neuter;
                break;
            case "age":
                selectedList = age;
                break;
            case "sex":
                selectedList = sex;
                break;
            default:
                selectedList = [];
                break;
        }

        // 변환할 String 추출
        let convertedString = selectedList.filter(item => item.code === code)[0].name;
        console.log("convertedString", convertedString);

        return convertedString;
    }

    // 단일 delete
    const handleDeleteItem = (key, value, type) => {

        setSubSelectedItems((prevItems) => {

            if (type === 'object') {
                let filterList = subSelectedItems[key].filter(v => v !== value);
                let newItems = {...prevItems, [key]: filterList}
                return newItems;
            } else {
                let newItems = {...prevItems}
                delete newItems[key];
                return newItems;            
            }
        })
    }
    
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
        <>
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
            {showState.age &&
                <FilterMiniAge
                    data = {age}
                    keyName = "age"
                    selectedItems = {subSelectedItems}
                    setSelectedItems = {setSubSelectedItems}
                    getRefreshData = {getRefreshData}
                />
            }
            {showState.sex && 
                <FilterMini
                    data = {sex}
                    keyName = "sex"
                    selectedItems = {subSelectedItems}
                    setSelectedItems = {setSubSelectedItems}
                    getRefreshData = {getRefreshData}
                />            
            }
            {showState.neuter &&
                <FilterMini
                    data = {neuter}
                    keyName = "neuter"
                    selectedItems = {subSelectedItems}
                    setSelectedItems = {setSubSelectedItems}
                    getRefreshData = {getRefreshData}
                />     
            }
        </div>
        {subSelectedItems && 
            <div className="sub-select-list">
                {extractedData.map((value, index) => {
                    const isAge = typeof(value[1]);

                    if (isAge === "object") {
                        const key = value[0]
                        const item = value[1]
                        const type = typeof(item);

                        return value[1].map((v, i) => (
                            <div key={`${i} + 10`}>
                                <span>{getConvertedString(key, v)}</span>
                                <button onClick={() => {
                                    getRefreshData();
                                    handleDeleteItem(key, v, type)
                                    }}>x</button>
                            </div>
                        ));
                    } else {
                        const key = value[0]
                        const item = value[1]
                        const cs = getConvertedString(key, item)
                        return (
                            <div key={index}>
                                <span>{cs}</span>
                                <button onClick={() => {
                                    handleDeleteItem(key, item);
                                    getRefreshData();
                                    }}>x</button>
                            </div>
                        );
                    }
                })}
                {extractedData.length > 0 && 
                    <button onClick={() => {
                        setSubSelectedItems({})
                        getRefreshData();
                    }}>전체 초기화</button>}
            </div>      
        }
        </>
    )
}

export default AdoptFilterMini;