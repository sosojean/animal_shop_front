import Card from "../../common/Card";


const CalorieResult = (props) => {

    const {calcData, amount, showFeeding} = props;

    const calculateDogRER = (weight) => {
        // 체중이 2kg~45kg 사이인 경우
        if (weight >= 2 && weight <= 45) {return Math.round(30 * weight + 70)}
        // 체중이 2kg 미만 또는 45kg 이상인 경우
        else {return Math.round(70 * Math.pow(weight, 0.75))}
    }

    const calculateDogMER = (isPuppy, month, status, detail, neuter) => {
        const weight = calcData?.weight;
        let adultMER;
    
        // 기초대사량 * 활동수치
        // 성견이 아닌 경우
        if (isPuppy) {
            switch (month) {
                case "1-4개월":
                    return Math.round(calculateDogRER(weight) * 3) + "kcal";
                case "4-12개월":
                    return Math.round(calculateDogRER(weight) * 2) + "kcal";
                default:
                    return "아기 강아지의 월령을 선택해주세요";
            }
        // 성견인 경우
        } else {
            // status 확인
            switch (status) {
                case "체중조절":
                    switch (detail) {
                        case "감량":
                            adultMER = Math.round(calculateDogRER(weight));
                            break;
                        case "증량":
                            adultMER = Math.round(calculateDogRER(weight) * 1.7);
                            break;
                        default:
                            return "세부 선택을 모두 골라주세요"
                    }
                    break;
                case "활동적":
                    switch (detail) {
                        case "활동적":
                            adultMER = Math.round(calculateDogRER(weight) * 2);
                            break;
                        case "매우 활동적":
                            adultMER = Math.round(calculateDogRER(weight) * 3);
                            break;
                        case "극도로 활동적":
                            adultMER = Math.round(calculateDogRER(weight) * 4);
                            break;
                        default:
                            return "알맞는 활동성을 선택해주세요";
                    }
                    break;
                case "임신/수유": // 중성화 체크 필요 없음
                    switch (detail) {
                        case "임신 초기":
                            return Math.round(calculateDogRER(weight) * 1.8) + "kcal";
                        case "임신 후기":
                            return Math.round(calculateDogRER(weight) * 3) + "kcal";
                        case "수유":
                            return `${Math.round(calculateDogRER(weight) * 2)} ~ ${Math.round(calculateDogRER(weight) * 6)} kcal (새끼 수에 따라 범위 내에서 가감하세요)`;
                        default:
                            return "세부 선택을 모두 골라주세요"
                    }
                    break;
                case "해당없음": // status에 해당되는 것 없음
                    switch (neuter) {
                        case "완료":
                            return Math.round(calculateDogRER(weight) * 1.6) + "kcal";
                        case "안함":
                            return Math.round(calculateDogRER(weight) * 1.8) + "kcal";
                        default:
                            return "중성화 여부를 선택해주세요";
                    }
                default:
                    return "세부 선택을 모두 선택해주세요";
            }
    
            // 중성화 여부에 따른 값 반환
            switch (neuter) {
                case "완료":
                    return Math.round((adultMER - adultMER * 0.3)) + "kcal";
                case "안함":
                    return Math.round(adultMER) + "kcal";
                default:
                    return "중성화 여부를 선택해주세요";
            }
        }
    }

    const calculateCatMER = (isPuppy, month, status, detail, neuter) => {
        const weight = Number(calcData?.weight);
        let adultMER;

        if (isPuppy) {
            switch (month) {
                case "1-4개월":
                    return Math.round(calculateDogRER(weight) * 3) + "kcal";
                case "4-6개월":
                    return Math.round(calculateDogRER(weight) * 2.5) + "kcal";
                case "7-12개월":
                    return Math.round(calculateDogRER(weight) * 2) + "kcal";
                default:
                    return "아기 고양이의 월령을 선택해주세요"
            }
        // 성묘인 경우
        } else {
            // status 확인
            switch (status) {
                case "체중조절":
                    switch (detail) {
                        case "감량":
                            adultMER = Math.round(calculateDogRER(weight) * 0.8);
                            break;
                        case "증량":
                            adultMER = Math.round(calculateDogRER(weight) * 1.7);
                            break;
                        default:
                            return "세부 선택을 모두 해주세요"
                    }
                    break;
                case "활동적":
                    adultMER = Math.round(calculateDogRER(weight) * 1.6);
                    break;
                case "임신/수유": // 중성화 체크 필요 없음
                    switch (detail) {
                        case "임신 초기":
                            return Math.round(calculateDogRER(weight) * 2) + "kcal";
                        case "임신 후기":
                            return Math.round(calculateDogRER(weight) * 3) + "kcal";
                        case "수유":
                            return `${Math.round(calculateDogRER(weight) * 2)} ~ ${Math.round(calculateDogRER(weight) * 6)} kcal (새끼 수에 따라 범위 내에서 가감하세요)`;
                        default:
                            return "세부 선택을 모두 선택해주세요"
                    }
                    break;
                case "해당없음": // status에 해당되는 것 없음
                    switch (neuter) {
                        case "완료":
                            return Math.round(calculateDogRER(weight) * 1.2) + "kcal";
                        case "안함":
                            return Math.round(calculateDogRER(weight) * 1.4) + "kcal";
                        default:
                            return "중성화 여부를 선택해주세요";
                    }
                default:
                    return "세부 선택을 모두 선택해주세요";
            }
    
            // 중성화 여부에 따른 값 반환
            switch (neuter) {
                case "완료":
                    return Math.round((adultMER - adultMER * 0.3)) + "kcal";
                case "안함":
                    return Math.round(adultMER) + "kcal";
                default:
                    return "중성화 여부를 선택해주세요";
            }
        }
    }

    return (
        <Card className="default-card calorie-result">
            <Card className="default-card">
                <div className="age-result-container">
                    <div className="age-result-box">
                        <p className="result-title"><b>✔️1일 권장 칼로리</b></p>
                        {calcData?.species === "강아지" ?
                            <p>{calculateDogMER(calcData?.isPuppy, calcData?.month, calcData?.status, 
                                calcData?.detail, calcData?.neuter)}</p> :
                            calcData?.species === "고양이" ?
                                <p>{calculateCatMER(calcData?.isPuppy, calcData?.month, calcData?.status, 
                                    calcData?.detail, calcData?.neuter)}</p> :
                                <p>0 kcal</p>
                        }
                    </div>
                    <div className="age-result-box">
                        <p className="result-title"><b>✔️1일 기초 대사량</b></p>
                        <p>{calculateDogRER(calcData?.weight || 0)} kcal</p>
                    </div>
                    {showFeeding &&
                        <div className="age-result-box">
                            <p className="result-title"><b>✔️1일 사료 급여량</b></p>
                            <p>{(() => { const result = Math.round((calculateDogRER(calcData?.weight || 0) * 1000) / amount);
                                return isFinite(result) && !isNaN(result) ? `${result} g` : '올바른 값을 입력해주세요';})()}</p>
                        </div>                    
                    }
                </div>
            </Card>   
        </Card>

    )
}

export default CalorieResult;