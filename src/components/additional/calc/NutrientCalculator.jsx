import { useState, useEffect } from "react";
import instance from "../../../utils/axios";
import "../../../assets/styles/additional/nutrientCalc.scss"
import NutrientInput from "./NutrientInput";
import NutrientResult from "./NutrientResult";
import CalcGoods from "./CalcGoods";
import CalcNav from "./CalcNav";
import Title from "../../common/Title";
import Card from "../../common/Card";

const NutrientCalculator = () => {

    const [petData, setPetData] = useState({species: "강아지", age: "성견/성묘", isLarge: false, isDry: false});
    const [nutrientData, setNutrientData] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [goods, setGoods] = useState([]);

    // 로그인 회원 대표 펫 정보 가져오기기
    const getMyPetData = () => {
        instance({
            url: `/calc/food-info`,
            method: "GET",
        }).then((res) => {
            // 데이터 가공
            let stateData = {...res.data};

            stateData.species = stateData.species === "DOG" ? "강아지" : "고양이";
            stateData.age = stateData.age < 1 ? "1살미만" : "성견/성묘"
            stateData.isLarge = stateData.big;

            console.log("stateData", stateData);
            setPetData(stateData);
        })
        .catch((err) => {
            console.error("error", err);
        });
    };

    useEffect(() => {
        getMyPetData();
      }, []);

    return (
        <div className="nutrient-calc">
            <CalcNav/>
            <Title>사료 영양성분 계산기</Title>
            <div className="nutrient-calc-section">
                <NutrientInput petData={petData} setPetData={setPetData}
                    nutrientData={nutrientData} setNutrientData={setNutrientData}
                    showResult={showResult} setShowResult={setShowResult} setGoods={setGoods}/>
                {showResult &&
                    <NutrientResult petData={petData} nutrientData={nutrientData}/>
                }  
            </div>
            {(showResult && goods.length > 0)  && 
                <Card className="calc-goods">
                    <h3>상품 추천</h3>
                    <CalcGoods goods={goods}/>
                </Card>            
            }
        </div>
    )
}

export default NutrientCalculator;