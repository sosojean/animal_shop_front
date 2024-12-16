import { useState, useEffect } from "react";
import instance from "../../../utils/axios";
import AgeInput from "./AgeInput";
import AgeResult from "./AgeResult";
import "../../../assets/styles/additional/ageCalc.scss"

const AgeCalculator = () => {

    const [calcData, setCalcData] = useState();
    // {species: "dog", birth: "20200120", size: "small"}
    
    const getMyPetData = () => {
        instance({
            url: `/calc/age`,
            method: "GET",
        }).then((res) => {
            console.log("response", res.data);
        })
        .catch((err) => {
            console.error("error", err);
        })
    }

    useEffect(() => {
        getMyPetData();
      }, []);

    return (
        <div className="age-calc">
            <h1 className="age-calc-header">나이 계산기</h1>
            <div className="age-calc-section">
                <AgeInput
                    calcData={calcData} setCalcData={setCalcData}
                />
                <AgeResult
                    calcData={calcData} setCalcData={setCalcData}
                />                
            </div>

        </div>
    )
}

export default AgeCalculator;