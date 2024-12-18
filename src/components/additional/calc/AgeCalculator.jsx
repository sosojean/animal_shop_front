import { useState, useEffect } from "react";
import instance from "../../../utils/axios";
import AgeInput from "./AgeInput";
import AgeResult from "./AgeResult";
import "../../../assets/styles/additional/ageCalc.scss"

const AgeCalculator = () => {

    const [calcData, setCalcData] = useState();
    const [petData, setPetData] = useState({});
    // {species: "dog", birth: "20200120", size: "small"}

    console.log("petData", petData);
    
    const getMyPetData = () => {
        instance({
            url: `/calc/age`,
            method: "GET",
        }).then((res) => {
            // 데이터 가공
            const stateData = {...res.data};
            
            // species 변환
            stateData.species = stateData.species === "DOG" ? "강아지" : "고양이";
            
            // age를 연도로 변환
            // 현재 날짜를 YYYYMMDD 형식으로 가져오기
            const currentDate = new Date().toISOString().slice(0,10).replace(/-/g,'');
            
            // age를 기반으로 출생일 계산
            const currentYear = parseInt(currentDate.slice(0,4));
            const monthDay = currentDate.slice(4);
            stateData.birth = (currentYear - stateData.age) + monthDay;
            // delete stateData.age;

            // size 변환 (강아지인 경우에만)
            if (stateData.species === "강아지") {
                switch(stateData.size) {
                    case "small":
                        stateData.size = "소형";
                        break;
                    case "medium":
                        stateData.size = "중형";
                        break;
                    case "large":
                    case "giant":
                        stateData.size = "대형";
                        break;
                    default:
                        // 기본값 유지
                        break;
                }
            }
            
            setPetData(stateData);
            setCalcData(stateData);
        })
        .catch((err) => {
            console.error("error", err);
        });
    };

    useEffect(() => {
        getMyPetData();
      }, []);

    return (
        <div className="age-calc">
            <h1 className="age-calc-header">나이 계산기</h1>
            <div className="age-calc-section">
                <AgeInput
                    calcData={calcData} setCalcData={setCalcData} petData={petData}
                />
                <AgeResult
                    calcData={calcData} setCalcData={setCalcData}
                />                
            </div>

        </div>
    )
}

export default AgeCalculator;