import { useState, useEffect } from "react";
import instance from "../../../utils/axios";
import CalorieInput from "./CalorieInput";
import CalorieResult from "./CalorieResult";
import "../../../assets/styles/additional/calorieCalc.scss"

const CalorieCalculator = () => {

    const [calcData, setCalcData] = useState(); 
    const [amount, setAmount] = useState(0);
    const [showFeeding, setShowFeeding] = useState(false);
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
                    showFeeding={showFeeding} setShowFeeding={setShowFeeding}
                    amount={amount} setAmount={setAmount}/>
                <CalorieResult calcData={calcData} amount={amount} showFeeding={showFeeding}/>    
            </div>
          
        </div>
    )
}

export default CalorieCalculator;