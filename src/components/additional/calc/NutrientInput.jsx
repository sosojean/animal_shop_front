import Card from "../../common/Card"
import DefaultButton from"../../common/DefaultButton";
import axios from "axios";

const NutrientInput = (props) => {

    const {petData, setPetData, nutrientData, setNutrientData, setGoods,
        showResult, setShowResult} = props;

    // console.log("nutrientData", nutrientData);
    // console.log("petData", petData);

    const speciesList = ["강아지", "고양이"];
    const ageList = ["성견/성묘", "1살미만"];
    const nutrientList = ['조단백질', '조지방', '조섬유', '조회분', '칼슘', '인', '수분', '타우린']

    const handleNutrientChange = (field, number) => {

        setNutrientData((prevData) => {
            const existingIndex = prevData.findIndex(item => item.name === field);

            if (existingIndex !== -1) {
                // 기존 항목이 있으면 업데이트
                const updatedData = [...prevData];
                updatedData[existingIndex] = { name: field, value: parseFloat(number) };
                return updatedData;
            } else {
                // 새로운 항목 추가
                return [...prevData, { name: field, value: parseFloat(number) }];
            }
        });
    };

    const handlePetDataChange = (field, value) => {
        setPetData(prevData => ({
            ...prevData,
            [field]: value
        }));
    };

    // 버튼 활성화
    const isButtonActive = (field, value) => {
        if (petData)
            return petData[field] === value ? 'long active' : 'long';
    };

    const handleRecommend = () => {

        // 데이터 가공
        const originData = {...petData};
        let postData = {};

        postData.species = originData.species === "강아지" ? "DOG" : "CAT"

        console.log("postData", postData);
        
        axios({
            url: `${process.env.REACT_APP_API}/calc/recommend/food`,
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
        <Card className="default-card nutrient-input">
            <Card className="default-card two-selector-card">
                <h3>반려동물 종류</h3>
                <div className="two-selector">
                    {speciesList.map((species, index) => {
                        return (<DefaultButton key={index} className={"long " + isButtonActive("species", species)} 
                            onClick={() => handlePetDataChange("species", species)}>
                                {species}</DefaultButton>)
                    })}                  
                </div>
            </Card>
            <Card className="default-card two-selector-card">
                <h3>반려동물 나이</h3>
                <div className="two-selector">
                    {ageList.map((age, index) => {
                        return <DefaultButton key={index} className={"long " + isButtonActive("age", age)} 
                            onClick={(e) => handlePetDataChange("age", age)}>
                            {age}</DefaultButton>
                    })}                    
                </div>
            </Card>
            {petData?.species === "강아지" &&
                <Card className="default-card two-selector-card">
                    <h3>대형견</h3>
                    <div className="two-selector">
                        <DefaultButton className={"long " + isButtonActive("isLarge", true)} onClick={() => handlePetDataChange("isLarge", true)}>네</DefaultButton>
                        <DefaultButton className={"long " + isButtonActive("isLarge", false)} onClick={() => handlePetDataChange("isLarge", false)}>아니오</DefaultButton>                        
                    </div>
                </Card>            
            }
            {petData?.species === "고양이" &&
                <Card className="default-card two-selector-card">
                    <h3>사료 종류</h3>
                    <div className="two-selector">
                        <DefaultButton className={"long " + isButtonActive("isDry", true)} onClick={() => handlePetDataChange("isDry", true)}>건식</DefaultButton>
                        <DefaultButton className={"long " + isButtonActive("isDry", false)} onClick={() => handlePetDataChange("isDry", false)}>습식</DefaultButton>
                    </div>
                </Card>            
            }
            <Card className="default-card input-card">
                <h3>영양성분</h3>
                <div className="input-grid-container">
                    {nutrientList.map((nutrient, index) => {
                        if (petData?.species === "고양이") {
                            return (
                                <div key={index} className="input-box">
                                    <span className="span-box"><b>{nutrient}</b></span>
                                    <input type="number" defaultValue={0}
                                        onChange={(e) => {handleNutrientChange(nutrient, e.target.value)}}/>
                                    <div>
                                        <span><b>%</b></span>
                                    </div>
                                </div>
                            )}
                        else {
                            if (index < nutrientList.length - 1) {
                                return (
                                    <div key={index}  className="input-box">
                                        <span className="span-box">{nutrient}</span>
                                        <input type="number" defaultValue={0}
                                            onChange={(e) => {handleNutrientChange(nutrient, e.target.value)}}/>
                                        <div>
                                            <span><b>%</b></span>
                                        </div>
                                    </div>
                                )
                            }
                        }
                    })}                    
                </div>

            </Card>
            <div className="result-button-container">
                <DefaultButton
                    className="default-button result-button wd100"
                    onClick={() => { 
                    setShowResult(!showResult);
                    handleRecommend();}}>
                    결과 확인
                </DefaultButton>
            </div>
        </Card>
    )
}

export default NutrientInput;