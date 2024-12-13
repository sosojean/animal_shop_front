import React from 'react';
import "../../assets/styles/map/placeFilter.scss"

const PlaceFilter = ({searchData, setSearchData}) => {
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
            {category.map((item, i) => (
                <button className={searchData.category === item?"selected":""} key={i}
                        onClick={()=>{onClickCategory(item)}}>
                    {item}
                </button>
            ))}

            <div>

            {Object.keys(conditions).map((key, i) => (
                <>
                <label htmlFor={key}>{conditions[key]}</label>
                <input id={key} type="checkbox" onChange={e=>{setSearchData((prev)=>({...prev,[key]:e.target.checked}))}}/>
                </>
            ))}
            </div>

        </div>
    );
};

export default PlaceFilter;