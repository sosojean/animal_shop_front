import Card from "../../common/Card"
import DefaultButton from"../../common/DefaultButton";
import axios from "axios";

const NutrientInput = (props) => {

    const {petData, setPetData, nutrientData, setNutrientData, setGoods,
        showResult, setShowResult} = props;

    // console.log("nutrientData", nutrientData);
    console.log("petData", petData);

    const speciesList = ["강아지", "고양이"];
    const ageList = ["성견/성묘", "1살미만"];
    const nutrientList = ['조단백질', '조지방', '조섬유', '조회분', '칼슘', '인', '수분']

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
            return petData[field] === value ? 'active' : '';
    };

    const handleRecommend = () => {

        // 데이터 가공
        const originData = {...petData};
        let postData = {};

        postData.species = originData.species === "강아지" ? "DOG" : "CAT"

        console.log("postData", postData);
        
        axios({
            url: `http://localhost:8080/calc/recommend/food`,
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
            <Card>
                <h2>반려동물 종류</h2>
                <div>
                    {speciesList.map((species, index) => {
                        return (<DefaultButton key={index} className={isButtonActive("species", species)} 
                            onClick={() => handlePetDataChange("species", species)}>
                                {species}</DefaultButton>)
                    })}                  
                </div>
            </Card>
            <Card>
                <h2>반려동물 나이</h2>
                {ageList.map((age, index) => {
                    return <DefaultButton key={index} className={isButtonActive("age", age)} 
                        onClick={(e) => handlePetDataChange("age", age)}>
                        {age}</DefaultButton>
                })}
            </Card>
            {petData?.species === "강아지" &&
                <Card>
                    <h2>대형견</h2>
                    <DefaultButton className={isButtonActive("isLarge", true)} onClick={() => handlePetDataChange("isLarge", true)}>네</DefaultButton>
                    <DefaultButton className={isButtonActive("isLarge", false)} onClick={() => handlePetDataChange("isLarge", false)}>아니오</DefaultButton>
                </Card>            
            }
            <Card>
                <h2>영양성분</h2>
                {nutrientList.map((nutrient, index) => {
                    return (
                        <div key={index}>
                            <span>{nutrient}</span>
                            <input type="number" defaultValue={0}
                                onChange={(e) => {handleNutrientChange(nutrient, e.target.value)}}/>
                        </div>
                    )
                })}
            </Card>
            <DefaultButton onClick={() => { 
                setShowResult(!showResult);
                handleRecommend();}}>
                결과 확인
            </DefaultButton>
        </Card>
    )
}

export default NutrientInput;