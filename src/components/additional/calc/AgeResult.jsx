import { useState } from "react";


const AgeResult = (props) => {

    const {calcData, setCalcData} = props;
    const [ageList, setAgeList] = useState();

    // 실제 나이 계산 (년, 월)
    const getOriginalAge = (birthDate) => {
        const birth = new Date(
            birthDate?.substring(0, 4),
            parseInt(birthDate?.substring(4, 6)) - 1,
            birthDate?.substring(6, 8)
        );
        const today = new Date();
        
        let years = today.getFullYear() - birth.getFullYear();
        let months = today.getMonth() - birth.getMonth();
        
        if (months < 0) {
            years--;
            months += 12;
        }
        
        return {
            years: years,
            months: months,
            decimal: years + (months / 12)
        };
    }

    // 나이 환산
    const getHumanAge = (birthDate, size, species) => {
        const age = getOriginalAge(birthDate).decimal;
        if (species === "강아지")
            return getCalculateDogAge(age, size);
        else if (species === "고양이")
            return getCalculateCatAge(age, size);
    }

    // 살아온 날 계산
    const getDaysLived = (birthDate) => {
        const birth = new Date(
            birthDate?.substring(0, 4),
            parseInt(birthDate?.substring(4, 6)) - 1,
            birthDate?.substring(6, 8)
        );
        const today = new Date();
        const diffTime = Math.abs(today - birth);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    // 강아지 나이 계산기
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
            case '래브란도 리트리버':
                return Math.round(16 * Math.log(dogAge) + 31);
            default:
                return "none";
        }
    }

    // 고양이 나이 계산기
    const getCalculateCatAge = (catAge, type) => {
        if (catAge <= 2) {
            const months = Math.round(catAge * 12);
            
            const ageMap = [
                { months: 2, age: 3 },    // 2개월
                { months: 4, age: 6 },    // 4개월
                { months: 6, age: 9 },    // 6개월
                { months: 8, age: 11 },   // 8개월
                { months: 10, age: 13 },  // 10개월
                { months: 12, age: 15 },  // 1년
                { months: 18, age: 20 },  // 1년 6개월
                { months: 24, age: 24 }   // 2년
            ];
            
            const ageData = ageMap.find(item => months <= item.months);
            if (ageData) {
                return ageData.age;
            }
        }
    
        // 2년 이후의 나이 계산
        const baseAge = 24;
        const additionalYears = Math.floor(catAge - 2);
        
        // 실내묘(집고양이)와 실외묘(길고양이) 구분
        switch (type) {
            case '집고양이': // 실내묘
                return baseAge + (additionalYears * 4);
            case '길고양이': // 실외묘
                return baseAge + (additionalYears * 8);
            default:
                return "none";
        }
    }

    return (
        <div>
            <h1>결과</h1>
            {calcData?.species === "강아지" ?
                <p>
                    {getHumanAge(calcData?.birth, calcData?.size, "강아지") === "none" ? 
                        "생년월일 혹은 크기를 정확히 작성해주세요" : 
                        "우리 강아지의 나이는 " + getOriginalAge(calcData?.birth).years + "살 " + getOriginalAge(calcData?.birth).months + "개월이고" +
                        " 사람으로 치면 " + getHumanAge(calcData?.birth, calcData?.size, "강아지") + "살이에요!"
                    }
                </p> : calcData?.species === "고양이" ?
                        <p>
                            {getHumanAge(calcData?.birth, calcData?.size, "고양이") === "none" ? 
                                "생년월일 혹은 크기를 정확히 작성해주세요" : 
                                "우리 고양이의 나이는 " + getOriginalAge(calcData?.birth).years + "살 " + getOriginalAge(calcData?.birth).months + "개월이고" +
                                " 사람으로 치면 " + getHumanAge(calcData?.birth, calcData?.size, "고양이") + "살이에요!"
                            }
                        </p> :
                        <p>우리 아이의 정보를 입력해주세요!</p>
            }
        </div>
    )
}

export default AgeResult;