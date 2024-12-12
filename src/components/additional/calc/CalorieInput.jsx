import { useState } from "react";


const CalorieInput = (props) => {

    const {calcData, setCalcData} = props;

    console.log("calcData", calcData);

    const speciesList = ["강아지", "고양이"];
    const ageList = ["성견", "성장기"];
    const puppyList = ["1-4개월", "4-12개월"];
    const dogStatusList = [{main: "체중조절", sub: ["감량", "증량"]}, 
        {main: "높은 활동성", sub: ["활동적", "매우 활동적", "극도로 활동적"]}, 
        {main: "임신/수유", sub: ["임신 초기", "임신 후기", "수유"]}];
    const neuterList = ["완료", "안함"];

    const dogDetailList = dogStatusList.filter((value, index) => {
        return calcData?.status === value.main});

    // calcData 저장
    const handleInputChange = (field, value) => {
        setCalcData(prevData => ({
            ...prevData,
            [field]: value
        }));
    };

    return (
        <div>
            <div>
                <h2>반려동물 종류</h2>
                <div>
                    {speciesList.map((species, index) => {
                        return <div key={index} onClick={() => {handleInputChange("species", species)}}>
                            {species}</div>
                    })}                  
                </div>
            </div>
            <div>
                <h2>반려동물 몸무게</h2>
                <input type="number" onChange={(e) => {handleInputChange("weight", e.target.value)}}/>
            </div>
            <div>
                <h2>반려동물 나이</h2>
                <select onChange={(e) => {handleInputChange("isPuppy", e.target.value === "true")}}>
                    {ageList.map((age, index) => {
                        return <option key={index} value={age === "성장기" ? "true" : "false"}>
                            {age}</option>
                    })}
                </select>
            </div>
            <div>
                <h2>세부 선택</h2>
                {calcData?.isPuppy ?
                    <select onChange={(e) => {handleInputChange("month", e.target.value)}}>
                        {puppyList.map((age, index) => {
                            return <option key={index}>{age}</option>
                        })}
                    </select> : 
                    <div>
                        <select onChange={(e) => {handleInputChange("status", e.target.value)}}>
                            {dogStatusList.map((status, index) => {
                                return <option key={index} value={status.main}>{status.main}</option>
                            })}
                        </select>
                        <select onChange={(e) => {handleInputChange("detail", e.target.value)}}>
                            {dogDetailList[0]?.sub?.map((detail, index) => {
                                return <option key={index} value={detail}>{detail}</option>
                            })}
                        </select>
                        <select onChange={(e) => {handleInputChange("neuter", e.target.value)}}>
                            {neuterList.map((neuter, index) => {
                                return <option key={index} value={neuter}>{neuter}</option>
                            })}
                        </select>                       
                    </div>                    
                }
            </div>
        </div>
    )
}

export default CalorieInput;
