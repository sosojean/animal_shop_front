

const CalorieResult = (props) => {

    const {calcData} = props;

    const calculateDogRER = (weight) => {
        // 체중이 2kg~45kg 사이인 경우
        if (weight >= 2 && weight <= 45) {return Math.round(30 * weight + 70)}
        // 체중이 2kg 미만 또는 45kg 이상인 경우
        else {return Math.round(70 * Math.pow(weight, 0.75))}
    }

    return (
        <div>
            <h1>칼로리 계산</h1>
            <div>
                <div>
                    <p>1일 기초대사량</p>
                    <p>{calculateDogRER(calcData?.weight || 0)} kcal</p>
                </div>
            </div>
        </div>
    )
}

export default CalorieResult;