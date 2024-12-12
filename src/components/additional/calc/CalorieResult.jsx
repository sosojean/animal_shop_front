

const CalorieResult = (props) => {

    const {calcData} = props;

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
                    return Math.round(calculateDogRER(weight) * 3);
                case "4-12개월":
                    return Math.round(calculateDogRER(weight) * 2);
                default:
                    throw new Error("puppy - 유효하지 않습니다.");
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
                    }
                    break;
                case "높은 활동성":
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
                    }
                    break;
                case "임신/수유": // 중성화 체크 필요 없음
                    switch (detail) {
                        case "임신 초기":
                            return Math.round(calculateDogRER(weight) * 1.8);
                        case "임신 후기":
                            return Math.round(calculateDogRER(weight) * 3);
                        case "수유":
                            return `${Math.round(calculateDogRER(weight) * 4)} ~ ${Math.round(calculateDogRER(weight) * 6)} 새끼 수에 따라 범위 내에서 가감하세요`;
                    }
                    break;
                case "해당없음": // status에 해당되는 것 없음
                    switch (neuter) {
                        case "완료":
                            return Math.round(calculateDogRER(weight) * 1.6);
                        case "안함":
                            return Math.round(calculateDogRER(weight) * 1.8);
                        default:
                            return "중성화 여부를 선택해주세요";
                    }
                    break;
                default:
                    return "세부 선택을 모두 선택해주세요";
            }
    
            // 중성화 여부에 따른 값 반환
            switch (neuter) {
                case "완료":
                    return Math.round((adultMER - adultMER * 0.3));
                case "안함":
                    return Math.round(adultMER);
                default:
                    return "중성화 여부를 선택해주세요";
            }
        }
    }    

    return (
        <div>
            <h1>칼로리 계산</h1>
            <div>
                <div>
                    <p>1일 권장 칼로리</p>
                    <p>{calculateDogMER(calcData?.isPuppy, calcData?.month, calcData?.status, 
                        calcData?.detail, calcData?.neuter)} kcal</p>
                </div>
                <div>
                    <p>1일 기초대사량</p>
                    <p>{calculateDogRER(calcData?.weight || 0)} kcal</p>
                </div>
            </div>
        </div>
    )
}

export default CalorieResult;