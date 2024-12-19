import { useState, useEffect } from "react";
import instance from "../../../utils/axios";
import CalorieInput from "./CalorieInput";
import CalorieResult from "./CalorieResult";
import "../../../assets/styles/additional/calorieCalc.scss"
import CalcGoods from "./CalcGoods";

const CalorieCalculator = () => {

    const [calcData, setCalcData] = useState({species: "강아지", breed: "치와와", weight: 0, 
        age: "성견/성묘", status: "해당없음", neuter: "완료"}); 
    const [amount, setAmount] = useState(0);
    const [showFeeding, setShowFeeding] = useState(true);
    const [goods, setGoods] = useState([]);
    const [showResult, setShowResult] = useState(false);
        // {species: "dog", birth: "20200120", size: "small"}
    
    // 로그인 회원 대표 펫 정보 가져오기기
    const getMyPetData = () => {
        instance({
            url: `/calc/calorie`,
            method: "GET",
        }).then((res) => {
            // 데이터 가공
            let stateData = {...res.data};

            stateData.isPuppy = stateData.age < 1;
            stateData.neuter = stateData.isNeutered === true ? "완료" : "안함";
            stateData.species = stateData.species === "DOG" ? "강아지" : "고양이";

            console.log("stateData", stateData);
            setCalcData(stateData);

            console.log("getMyPetData", res.data);
        })
        .catch((err) => {
            console.error("error", err);
        });
    };

    useEffect(() => {
        getMyPetData();
      }, []);

    return (
        <div className="calrorie-calc">
            <h1 className="calrorie-calc-header">칼로리 계산기</h1>
            <div className="calrorie-calc-section">
                <CalorieInput calcData={calcData} setCalcData={setCalcData}
                    showResult={showResult} setShowResult={setShowResult}
                    amount={amount} setAmount={setAmount} setGoods={setGoods}/>
                {showResult &&
                    <CalorieResult calcData={calcData} amount={amount} showFeeding={showFeeding}/>   
                }
            </div>
            <div>
                <CalcGoods goods={goods}/>
            </div>
        </div>
    )
}

export default CalorieCalculator;