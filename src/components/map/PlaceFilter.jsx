import React, {useState} from 'react';
import "../../assets/styles/map/placeFilter.scss"
import {faAngleDown, faAngleUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const PlaceFilter = ({searchData, setSearchData}) => {
    const [isOpened, setIsOpened] = useState(false)

    const category= ["동물약국", "미술관", "카페", "동물병원", "반려동물용품", "미용", "문예회관", "펜션", "식당", "여행지", "위탁관리", "박물관"]

    const conditions ={parking: "주차가능",indoor:"실내가능",outdoor:"실외가능"};

    const onClickCategory = (item) => {
        if(searchData.category === item){
            setSearchData((prev)=>({...prev,category:null}))

        }else{
            setSearchData((prev)=>({...prev,category:item}))
        }
    }



    return (
        <div className="place-filter-container">
            {/*<h2>장소</h2>*/}
            <div className="row place-filter-inner-container">
                <div className="place-filter-container-buttons">
                    {category.slice(isOpened ? 0 : 0, isOpened ? category.length : 4).map((item, i) => (
                        <button className={searchData.category === item ? "selected category" : "category"} key={i}
                                onClick={() => {
                                    onClickCategory(item)
                                }}>
                            {item}
                        </button>
                    ))}
                </div>
                <div>
                    <button className="show-more-button" onClick={() => {
                        setIsOpened(!isOpened)
                    }}>

                    <FontAwesomeIcon icon={isOpened?faAngleUp:faAngleDown}/></button>
                </div>
            </div>
            {/*<span>조건 선택</span>*/}

            <div className="check-box-list">
                {Object.keys(conditions).map((key, i) => (
                    <div className="check-box-container" key={key}>
                        <input
                            id={key}
                            type="checkbox"
                            onChange={(e) => setSearchData((prev) => ({...prev, [key]: e.target.checked}))}
                        />
                        <label htmlFor={key}>{conditions[key]}</label>
                    </div>
                ))}
            </div>
            {/*<span>초기화</span>*/}


        </div>
    );
};

export default PlaceFilter;