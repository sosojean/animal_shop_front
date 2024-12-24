import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../../common/Card";
import DefaultButton from "../../common/DefaultButton";


const CalorieInput = (props) => {

    const {calcData, setCalcData, showResult, setShowResult,
        amount, setAmount, setGoods} = props;

    const [dogBreedOptions, setDogBreedOptions] = useState([]);
    const [catBreedOptions, setCatBreedOptions] = useState([]);

    const breedOptions = calcData?.species === "고양이" ? catBreedOptions : dogBreedOptions;

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

    const handleRecommend = () => {

        // 데이터 가공
        const originData = {...calcData};
        let postData = {};

        postData.breed = originData.breed || "싱가푸라";
        postData.weight = parseFloat(originData.weight) || 1;
        postData.species = originData.species === '강아지' ? 'DOG' : 'CAT';

        console.log("postData", postData);
        
        axios({
            url: `${process.env.REACT_APP_API}/calc/recommend/calorie`,
            method: "POST",
            data: postData
        }).then((res) => {
            console.log("handleRecommend", res.data);
            setGoods(res.data.goods);
        })
        .catch((err) => {
            console.error("error", err);
        });
    };

    const getBreedOptions = () => {
        axios({
            url: `${process.env.REACT_APP_API}/pet/breed-list?species=DOG`,
            method: "get",
        }).then((res) => {
            console.log("getBreedOptions response", res.data);
            setDogBreedOptions(res.data.breeds);
        })
        .catch((err) => {
            console.error("error", err);
        })

        axios({
            url: `${process.env.REACT_APP_API}/pet/breed-list?species=CAT`,
            method: "get",
        }).then((res) => {
            console.log("getBreedOptions response", res.data);
            setCatBreedOptions(res.data.breeds);
        })
        .catch((err) => {
            console.error("error", err);
        })
    }

    useEffect(() => {
        getBreedOptions();

    }, []);

    return (
        <Card className="default-card calrorie-input">
            <Card className="default-card">
                <h2>반려동물 종류</h2>
                <div>
                    {speciesList.map((species, index) => {
                        return <DefaultButton 
                        key={index} className={isButtonActive("species", species)} 
                        onClick={() => {
                            handleInputChange("species", species)
                            handleInputChange("breed", "")
                            }}>
                            {species}</DefaultButton>
                    })}
                </div>
                <select value={calcData?.breed} onChange={(e) => {handleInputChange("breed", e.target.value)}}>
                    <option key={100} value="default">--종 선택--</option>
                    {breedOptions.map((breed, index) => {
                        return <option key={index} value={breed}>{breed}</option>
                    })}
                </select>
            </Card>
            <Card className="default-card">
                <h2>반려동물 몸무게</h2>
                <input type="number" value={calcData?.weight} 
                    onChange={(e) => {handleInputChange("weight", e.target.value)}}/>
            </Card>
            <Card className="default-card">
                <h2>반려동물 나이</h2>
                <div>
                    {ageList.map((age, index) => {
                        return <DefaultButton 
                            key={index} 
                            className={isButtonActive("isPuppy", age === "1살미만")}
                            onClick={() => {handleInputChange("isPuppy", age === "1살미만")}}>
                            {age}
                        </DefaultButton>
                    })}
                </div>
            </Card>
            <Card className="default-card detail-selector">
                <h2>세부 선택</h2>
                {calcData?.species === "고양이" ? 
                    calcData?.isPuppy ?
                        <div className="buttons">
                            <span><b>월령</b></span>
                            {kittenList.map((age, index) => (
                                <DefaultButton 
                                    key={index}
                                    className={isButtonActive("month", age)}
                                    onClick={() => handleInputChange("month", age)}>
                                    {age}
                                </DefaultButton>
                            ))}
                        </div> : 
                        <div>
                            <div className="buttons">
                                <span><b>상태</b></span>
                                {catStatusList.map((status, index) => (
                                    <DefaultButton 
                                        key={index}
                                        className={isButtonActive("status", status.main)}
                                        onClick={() => handleInputChange("status", status.main)}>
                                        {status.main}
                                    </DefaultButton>
                                ))}
                            </div>
                            <div className="buttons">
                                <span><b>세부</b></span>
                                {catDetailList[0]?.sub?.map((detail, index) => (
                                    <DefaultButton 
                                        key={index}
                                        className={isButtonActive("detail", detail)}
                                        onClick={() => handleInputChange("detail", detail)}>
                                        {detail}
                                    </DefaultButton>
                                ))}
                            </div>
                            <div className="buttons">
                                <span><b>중성화</b></span>
                                {neuterList.map((neuter, index) => (
                                    <DefaultButton 
                                        key={index}
                                        className={isButtonActive("neuter", neuter)}
                                        onClick={() => handleInputChange("neuter", neuter)}>
                                        {neuter}
                                    </DefaultButton>
                                ))}
                            </div>
                        </div>
                    :
                    calcData?.isPuppy ?
                        <div className="buttons">
                            <span><b>월령</b></span>
                            {puppyList.map((age, index) => (
                                <DefaultButton 
                                    key={index}
                                    className={isButtonActive("month", age)}
                                    onClick={() => handleInputChange("month", age)}>
                                    {age}
                                </DefaultButton>
                            ))}
                        </div> : 
                        <div>
                            <div className="buttons">
                                <span><b>상태</b></span>
                                {dogStatusList.map((status, index) => (
                                    <DefaultButton 
                                        key={index}
                                        className={isButtonActive("status", status.main)}
                                        onClick={() => handleInputChange("status", status.main)}>
                                        {status.main}
                                    </DefaultButton>
                                ))}
                            </div>
                            <div className="buttons">
                                <span><b>세부</b></span>
                                {dogDetailList[0]?.sub?.map((detail, index) => (
                                    <DefaultButton 
                                        key={index}
                                        className={isButtonActive("detail", detail)}
                                        onClick={() => handleInputChange("detail", detail)}>
                                        {detail}
                                    </DefaultButton>
                                ))}
                            </div>
                            <div className="buttons">
                                <span><b>중성화</b></span>
                                {neuterList.map((neuter, index) => (
                                    <DefaultButton 
                                        key={index}
                                        className={isButtonActive("neuter", neuter)}
                                        onClick={() => handleInputChange("neuter", neuter)}>
                                        {neuter}
                                    </DefaultButton>
                                ))}
                            </div>
                        </div>                           
                }
            </Card>
            <Card className="default-card">
                <h2>사료 kcal(/kg)</h2>
                <input type="number" defaultValue={0} onChange={(e) => setAmount(e.target.value)}/>
                <p>사료의 kcal(kg당)을 작성해주세요</p>                   
            </Card>
            <DefaultButton onClick={() => {
                handleRecommend();
                setShowResult(!showResult)}}>
                    결과 확인
            </DefaultButton> 
        </Card>
    )
}

export default CalorieInput;
