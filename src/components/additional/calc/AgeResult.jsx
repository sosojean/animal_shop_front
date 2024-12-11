

const AgeResult = (props) => {

    const {calcData, setCalcData} = props;

    const getDogAge = (birthDate, size) => {
        // 생년월일을 Date 객체로 변환
        const birth = new Date(
            birthDate?.substring(0, 4),
            parseInt(birthDate?.substring(4, 6)) - 1,
            birthDate?.substring(6, 8)
        );

        const today = new Date();
        
        // 나이 계산 (년 + 월/12)
        let years = today.getFullYear() - birth.getFullYear();
        let months = today.getMonth() - birth.getMonth();
        
        // 월이 음수인 경우 조정
        if (months < 0) {
            years--;
            months += 12;
        }
        
        // 전체 나이를 년 단위로 변환
        const dogAge = years + (months / 12);
        
        // 강아지 나이를 사람 나이로 변환
        return getCalculateDogAge(dogAge, size);
    }

    const getCalculateDogAge = (dogAge, size) => {
        // 2년 이하의 강아지 나이 계산
        if (dogAge <= 2) {
            const months = Math.round(dogAge * 12);
        
            // 개월 수에 따른 나이 매핑을 배열로 변경
            const ageMap = [
                { months: 2, age: 2 },    // 2개월
                { months: 4, age: 6 },    // 4개월
                { months: 6, age: 10 },   // 6개월
                { months: 8, age: 12 },   // 8개월
                { months: 10, age: 14 },  // 10개월
                { months: 12, age: 16 },  // 1년
                { months: 18, age: 20 },  // 1년 6개월
                { months: 24, age: 24 }   // 2년
            ];
            
            // 현재 개월 수보다 크거나 같은 첫 번째 매핑값 찾기
            const ageData = ageMap.find(item => months <= item.months);
            if (ageData) {
                return ageData.age;
            }
        }

        // 2년 이후의 나이 계산
        const baseAge = 24; // 2년까지의 기본 나이

        switch (size) {
            case '소형':
                return baseAge + 5 * Math.floor(dogAge - 2);
            case '중형':
                return baseAge + 6 * Math.floor(dogAge - 2);
            case '대형':
                return baseAge + 7 * Math.floor(dogAge - 2);
            default:
                return "none";
        }
    }

    return (
        <div>
            <h1>결과</h1>
            <p>
                {getDogAge(calcData?.birth, calcData?.size) === "none" ? 
                    "생년월일 혹은 크기를 정확히 작성해주세요" : 
                    "우리 아이의 나이는 " + getDogAge(calcData?.birth, calcData?.size) + "살이에요!"
                }
            </p>
        </div>
    )
}

export default AgeResult;