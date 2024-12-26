import axios from "axios";
import Card from "../../common/Card";
import DefaultButton from "../../common/DefaultButton";

const AgeInput = (props) => {

    const {calcData, setCalcData, setGoods, showResult, setShowResult} = props;

    const speciesList = ["강아지", "고양이"];
    const dogSizeList = ["소형", "중형", "대형"]; // + 래브란도 리트리버
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
            return calcData[field] === value ? 'long active' : 'long';
    };

    // const handleRecommend = () => {
    //     // 데이터 가공
    //     const originData = {...calcData};
    //     let postData = {};
    
    //     postData.species = originData.species === '강아지' ? 'DOG' :
    //         originData.species === '고양이' ? 'CAT' : ''
    //     // humanAge 필요
        
    //     console.log("postData", postData);
        
    //     axios({
    //         url: `${process.env.REACT_APP_API}/calc/recommend/age`,
    //         method: "POST",
    //         data: postData
    //     }).then((res) => {
    //         console.log("handleRecommend", res.data);
    //         setGoods(res.data.goods);
    //     })
    //     .catch((err) => {
    //         console.error("error", err);
    //     });
    // };

    return (
        <Card className="default-card age-input">
            <Card className="default-card two-selector-card">
                <h3 className="calc-secondary-header">반려동물 종류</h3>
                <div className="two-selector">
                    {speciesList.map((species, index) => {
                        return <DefaultButton key={index} 
                                onClick={() => {handleInputChange("species", species)}}
                                className={"long " + isButtonActive("species", species)}>
                                    {species}
                                </DefaultButton>
                    })}
                </div>
            </Card>
            <Card className="default-card input-card">
                <h3 className="calc-secondary-header">생년월일</h3>
                <div className="input-box">
                    <input value={calcData?.birth} onChange={(e) => {handleInputChange("birth", e.target.value)}}/>
                    <div>
                        <p>{calcData.birth.length === 8 ? `${calcData.birth.substring(0, 4)}.${calcData.birth.substring(4, 6)}.${calcData.birth.substring(6, 8)}` : "올바른 날짜를 입력해주세요"}</p>           
                    </div>      
                </div>
            </Card>
            {calcData?.species === "강아지" &&
                <Card className="default-card three-selector-card">
                    <h3 className="calc-secondary-header">강아지 크기</h3>
                    <div className="three-selector">
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
                <Card className="default-card three-selector-card">
                    <h3 className="calc-secondary-header">고양이 유형</h3>
                        <div className="three-selector">
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
                    // handleRecommend();
                    setShowResult(!showResult);}}>
                    {showResult ? "결과 닫기" : "결과 확인"}</DefaultButton>                
            </div>
        </Card>
    )
}

export default AgeInput;