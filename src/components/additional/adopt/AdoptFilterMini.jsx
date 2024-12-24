import { useState } from "react"
import FilterMini from "./FilterMini";
import FilterMiniAge from "./FilterMiniAge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import DefaultButton from "../../common/DefaultButton";

const AdoptFilterMini = (props) => {

    const {
        subSelectedItems, setSubSelectedItems, getRefreshData
    } = props;

    const sex = [{code: "M", name: "남아"}, {code:"F", name:"여아"}, 
        {code:"Q", name:"알 수 없음"}];

    const age = [{code: 1, name: "1살 미만"}, {code: 5, name: "1살 ~ 5살"}, 
        {code: 9, name: "6살 ~ 9살"}, {code: 10, name: "10살 이상"}]

    const neuter = [
        { code: "Y", name: "완료" },
        { code: "N", name: "미완료" },
        { code: "U", name: "알 수 없음" }
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
            <DefaultButton className="primary filter-button" onClick={() => setAllShow(!allShow)}>
                <span><FontAwesomeIcon icon={faList}/></span><sapn>필터</sapn>
            </DefaultButton>
            {allShow && (
                <>
                    <ul className="filter-att-list">
                        {petAttributes.map((att, index) => {

                            return (
                                <li className="att-item"
                                    key={index} onClick={() => toggleShow(att.code)}>
                                    <span>{att.name}</span>
                                    <span><FontAwesomeIcon icon={faAngleDown}/></span>
                                </li>
                            )
                        })}
                    </ul>                
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
                            className = "filter-mini-gender"
                        />            
                    }
                    {showState.neuter &&
                        <FilterMini
                            data = {neuter}
                            keyName = "neuter"
                            selectedItems = {subSelectedItems}
                            setSelectedItems = {setSubSelectedItems}
                            getRefreshData = {getRefreshData}
                            className = "filter-mini-neuter"
                        />     
                    }                    
                </>
            )}
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
                            <DefaultButton key={`${i} + 10`}>
                                <span onClick={() => {
                                    getRefreshData();
                                    handleDeleteItem(key, v, type)
                                    }}>{getConvertedString(key, v)} ✖</span>
                            </DefaultButton>
                        ));
                    } else {
                        const key = value[0]
                        const item = value[1]
                        const cs = getConvertedString(key, item)
                        return (
                            <DefaultButton key={index}>
                                <span onClick={() => {
                                    handleDeleteItem(key, item);
                                    getRefreshData();
                                    }}>{cs} ✖️</span>
                            </DefaultButton>
                        );
                    }
                })}
                {extractedData.length > 0 && 
                    <DefaultButton 
                        className="alert"
                        onClick={() => {
                            setSubSelectedItems({})
                            getRefreshData();
                        }}>초기화</DefaultButton>
                }
            </div>      
        }
        </>
    )
}

export default AdoptFilterMini;