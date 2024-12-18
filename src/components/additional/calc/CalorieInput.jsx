import { useState } from "react";
import Card from "../../common/Card";
import DefaultButton from "../../common/DefaultButton";


const CalorieInput = (props) => {

    const {calcData, setCalcData, showFeeding, setShowFeeding,
        amount, setAmount} = props;

    console.log("calcData", calcData);
    console.log("amount", amount);

    const speciesList = ["강아지", "고양이"];
    const ageList = ["성견/성묘", "1살미만"];
    const puppyList = ["1-4개월", "4-12개월"];
    const kittenList = ["1-4개월", "4-6개월", "7-12개월"];
    const dogStatusList = [{main: "체중조절", sub: ["감량", "증량"]}, 
        {main: "높은 활동성", sub: ["활동적", "매우 활동적", "극도로 활동적"]}, 
        {main: "임신/수유", sub: ["임신 초기", "임신 후기", "수유"]}, {main: "해당없음", sub: []}];
    const catStatusList = [{main: "체중조절", sub: ["감량", "증량"]}, 
    {main: "활동적", sub: []}, {main: "임신/수유", sub: ["임신 초기", "임신 후기", "수유"]}, 
    {main: "해당없음", sub: []}];
    const neuterList = ["완료", "안함"];

    const dogDetailList = dogStatusList.filter((value, index) => {
        return calcData?.status === value.main});
    const catDetailList = catStatusList.filter((value, index) => {
        return calcData?.status === value.main});

    // calcData 저장
    const handleInputChange = (field, value) => {
        setCalcData(prevData => ({
            ...prevData,
            [field]: value
        }));
    };

    // 버튼 활성화
    const isButtonActive = (field, value) => {
        if (calcData)
            return calcData[field] === value ? 'active' : '';
    };

    return (
        <Card className="default-card calrorie-input">
            <Card className="default-card">
                <h2>반려동물 종류</h2>
                <div>
                    {speciesList.map((species, index) => {
                        return <DefaultButton 
                        key={index} className={isButtonActive("species", species)} 
                        onClick={() => {handleInputChange("species", species)}}>
                            {species}</DefaultButton>
                    })}
                </div>
            </Card>
            <Card className="default-card">
                <h2>반려동물 몸무게</h2>
                <input type="number" onChange={(e) => {handleInputChange("weight", e.target.value)}}/>
            </Card>
            <Card className="default-card">
                <h2>반려동물 나이</h2>
                <select onChange={(e) => {handleInputChange("isPuppy", e.target.value === "true")}}>
                    {ageList.map((age, index) => {
                        return <option key={index} value={age === "1살미만" ? "true" : "false"}>
                            {age}</option>
                    })}
                </select>
            </Card>
            <Card className="default-card">
                <h2>세부 선택</h2>
                {calcData?.species === "고양이" ? 
                    calcData?.isPuppy ?
                        <select onChange={(e) => {handleInputChange("month", e.target.value)}}>
                            {kittenList.map((age, index) => {
                                return <option key={index}>{age}</option>
                            })}
                        </select> : 
                        <div>
                            <select onChange={(e) => {handleInputChange("status", e.target.value)}}>
                                {catStatusList.map((status, index) => {
                                    return <option key={index} value={status.main}>{status.main}</option>
                                })}
                            </select>
                            <select onChange={(e) => {handleInputChange("detail", e.target.value)}}>
                                {catDetailList[0]?.sub?.map((detail, index) => {
                                    return <option key={index} value={detail}>{detail}</option>
                                })}
                            </select>
                            <select onChange={(e) => {handleInputChange("neuter", e.target.value)}}>
                                {neuterList.map((neuter, index) => {
                                    return <option key={index} value={neuter}>{neuter}</option>
                                })}
                            </select>                       
                        </div>
                    :
                    calcData?.isPuppy ?
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
            </Card>
            <DefaultButton onClick={() => {setShowFeeding(!showFeeding)}}>사료 급여량 g 계산</DefaultButton>
            {showFeeding &&
                <Card className="default-card">
                    <p>사료의 kcal(kg당)을 작성해주세요</p>
                    <input type="number" onChange={(e) => setAmount(e.target.value)}/>
                </Card>            
            }
        </Card>
    )
}

export default CalorieInput;
