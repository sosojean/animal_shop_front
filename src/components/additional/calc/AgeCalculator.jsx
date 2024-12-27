import { useState, useEffect } from "react";
import instance from "../../../utils/axios";
import AgeInput from "./AgeInput";
import AgeResult from "./AgeResult";
import "../../../assets/styles/additional/ageCalc.scss"
import CalcGoods from "./CalcGoods";
import CalcNav from "./CalcNav";
import Title from "../../common/Title";
import Card from "../../common/Card";
import axios from "axios";

const AgeCalculator = () => {

    const [calcData, setCalcData] = useState({birth: 0});
    const [goods, setGoods] = useState([]);
    const [showResult, setShowResult] = useState(false);
    
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
            
            // setPetData(stateData);
            setCalcData(stateData);
        })
        .catch((err) => {
            console.error("error", err);
        });
    };

    const getRecommend = () => {
        // 데이터 가공
        const originData = {...calcData};
        let postData = {};
    
        postData.species = originData.species === '강아지' ? 'DOG' :
            originData.species === '고양이' ? 'CAT' : ''
        postData.humanAge = originData.humanAge || 0;
        
        console.log("postData", postData);
        
        axios({
            url: `${process.env.REACT_APP_API}/calc/recommend/age`,
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

    useEffect(() => {
        getMyPetData();
      }, []);

    useEffect(() => {
        getRecommend();
    }, [calcData.species, calcData.humanAge]);

    return (
        <>
            <CalcNav/>
            <div className="age-calc">
                <Title>나이 계산기</Title>
                <div className="age-calc-section">
                    <AgeInput
                        calcData={calcData} setCalcData={setCalcData}
                        setGoods={setGoods} showResult={showResult} setShowResult={setShowResult}
                    />
                    {showResult &&
                        <AgeResult
                            calcData={calcData} setCalcData={setCalcData}
                        />                     
                    }
                </div>
                {(showResult && goods.length > 0) &&
                    <Card className="calc-goods">
                        <h3>상품 추천</h3>
                        <CalcGoods goods={goods}/>
                    </Card>
                }
            </div>        
        </>

    )
}

export default AgeCalculator;