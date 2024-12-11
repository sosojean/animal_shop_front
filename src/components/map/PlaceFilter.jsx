import React from 'react';
import "../../assets/styles/map/placeFilter.scss"

const PlaceFilter = ({searchData, setSearchData}) => {
    const category= ["동물약국", "미술관", "카페", "동물병원", "반려동물용품", "미용", "문예회관", "펜션", "식당", "여행지", "위탁관리", "박물관"]

    return (
        <div className="place-filter-container">
            {category.map((item, i) => (
                <button className={searchData.category === item?"selected":""} key={i}
                        onClick={()=>{setSearchData((prev)=>({...prev,category:item}))}}>
                    {item}
                </button>
            ))}
            filter
        </div>
    );
};

export default PlaceFilter;