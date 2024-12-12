

const NutrientInput = (props) => {

    const {petData, setPetData, nutrientData, setNutrientData, 
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

    return (
        <div>
            <div>
                <h2>반려동물 종류</h2>
                <div>
                    {speciesList.map((species, index) => {
                        return (<button key={index} 
                            onClick={() => handlePetDataChange("species", species)}>
                                {species}</button>)
                    })}                  
                </div>
            </div>
            <div>
                <h2>반려동물 나이</h2>
                {ageList.map((age, index) => {
                    return <button key={index} onClick={(e) => handlePetDataChange("age", age)}>
                        {age}</button>
                })}
            </div>
            <div>
                <h3>대형견</h3>
                <button onClick={() => handlePetDataChange("isLarge", true)}>네</button>
                <button onClick={() => handlePetDataChange("isLarge", false)}>아니오</button>
            </div>
            <div>
                {nutrientList.map((nutrient, index) => {
                    return (
                        <div key={index}>
                            <span>{nutrient}</span>
                            <input type="number"
                                onChange={(e) => {handleNutrientChange(nutrient, e.target.value)}}/>
                        </div>
                    )
                })}
            </div>
            <button onClick={() => setShowResult(!showResult)}>결과 확인</button>
        </div>
    )
}

export default NutrientInput;