import axios from "axios";
import Card from "../../common/Card";
import DefaultButton from "../../common/DefaultButton";

const AgeInput = (props) => {

    const {calcData, setCalcData, setGoods, showResult, setShowResult} = props;

    const speciesList = ["강아지", "고양이"];
    const dogSizeList = ["소형", "중형", "대형", "래브란도 리트리버"];
    const catTypeList = ["집고양이", "길고양이"];

    // 결과에 사용할 데이터 저장
    const handleInputChange = (field, value) => {
        setCalcData(prevData => ({
            ...prevData,
            [field]: value
        }));
    };

    // 버튼 활성화
    const isButtonActive = (field, value) => {
        if (calcData)
            return calcData[field] === value ? 'active' : '';
    };

    const handleRecommend = () => {
        // 데이터 가공
        const originData = {...calcData};
        let postData = {};
    
        // birth 가공
        const today = new Date();
    
        // birth가 문자열인지 확인하고, 유효한 형식인지 검사
        if (typeof originData?.birth === 'string' && originData.birth.length === 8) {
            const year = parseInt(originData.birth.substring(0, 4));
            const month = parseInt(originData.birth.substring(4, 6));
            const day = parseInt(originData.birth.substring(6, 8));
    
            // 유효한 날짜인지 확인
            if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
                // 생년월일로 Date 객체 생성
                const birthDateObj = new Date(year, month - 1, day); // 월은 0부터 시작하므로 1을 빼줍니다
    
                // 나이 계산
                let age = today.getFullYear() - birthDateObj.getFullYear();
                const monthDiff = today.getMonth() - birthDateObj.getMonth();
    
                // 생일이 아직 지나지 않았다면 나이에서 1을 빼줍니다
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
                    age--;
                }
    
                postData.humanAge = age;
            } else {
                console.error("Invalid date format");
                postData.humanAge = null;
            }
        } else {
            console.error("Birth data is not a valid string");
            postData.humanAge = null;
        }
    
        postData.species = originData.species === '강아지' ? 'DOG' :
        originData.species === '고양이' ? 'CAT' : ''
        
        console.log("postData", postData);
        
        axios({
            url: `http://localhost:8080/calc/recommend/age`,
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

    return (
        <Card className="default-card age-input">
            <Card className="default-card two-selector-card">
                <h3 className="calc-secondary-header">반려동물 종류</h3>
                <div className="two-selector">
                    {speciesList.map((species, index) => {
                        return <DefaultButton key={index} 
                                onClick={() => {handleInputChange("species", species)}}
                                className={isButtonActive("species", species)}>
                                    {species}
                                </DefaultButton>
                    })}
                </div>
            </Card>
            <Card>
                <h3 className="calc-secondary-header">생년월일</h3>
                <input value={calcData?.birth} onChange={(e) => {handleInputChange("birth", e.target.value)}}/>
                <p>{calcData.birth.length === 8 ? `${calcData.birth.substring(0, 4)}.${calcData.birth.substring(4, 6)}.${calcData.birth.substring(6, 8)}` : "올바른 날짜를 입력해주세요"}</p>
            </Card>
            {calcData?.species === "강아지" &&
                <Card>
                    <h3 className="calc-secondary-header">강아지 크기</h3>
                    <div>
                        {dogSizeList.map((size, index) => {
                            return (
                                <DefaultButton key={index} onClick={() => {handleInputChange("size", size)}}
                                    className={isButtonActive("size", size)}>
                                    {size}                           
                                </DefaultButton>
                            )
                        })}
                    </div>
                </Card>            
            }
            {calcData?.species === "고양이" &&
                <Card>
                    <h3 className="calc-secondary-header">고양이 유형</h3>
                        <div>
                            {catTypeList.map((type, index) => {
                                return (
                                    <DefaultButton key={index} onClick={() => {handleInputChange("size", type)}}
                                        className={isButtonActive("size", type)}>
                                        {type}
                                    </DefaultButton>
                                )
                            })}
                        </div>
                </Card>
            }
            <div className="result-button-container">
                <DefaultButton className="default-button result-button wd100" onClick={() => {
                    handleRecommend();
                    setShowResult(!showResult);}}>
                    결과 확인</DefaultButton>                
            </div>
        </Card>
    )
}

export default AgeInput;