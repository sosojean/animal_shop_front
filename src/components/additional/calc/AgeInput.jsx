

const AgeInput = (props) => {

    const {calcData, setCalcData} = props;

    const speciesList = ["강아지", "고양이"];
    const dogSizeList = ["소형", "중형", "대형", "래브란도 리트리버"]
    const catTypeList = ["집고양이", "길고양이"]

    const handleInputChange = (field, value) => {
        setCalcData(prevData => ({
            ...prevData,
            [field]: value
        }));
    };

    console.log("calcData", calcData);

    return (
        <div>
            <div>
                <h3>반려동물 종류</h3>
                <div>
                    {speciesList.map((species, index) => {
                        return <div key={index} 
                            onClick={() => {handleInputChange("species", species)}}>{species}</div>
                    })}
                </div>
            </div>
            <div>
                <h3>생년월일</h3>
                <input onChange={(e) => {handleInputChange("birth", e.target.value)}}/>
            </div>
            {/* TODO 강아지/고양이에 따라 소중대 - 길집 나누기 */}
            {calcData?.species === "강아지" &&
                <div>
                    <h3>강아지 크기</h3>
                    <div>
                        {dogSizeList.map((size, index) => {
                            return (
                                <div key={index} onClick={() => {handleInputChange("size", size)}}>
                                    {size}                           
                                </div>
                            )
                        })}
                    </div>
                </div>            
            }
            {calcData?.species === "고양이" &&
                <div>
                    <h3>고양이 유형</h3>
                        <div>
                            {catTypeList.map((type, index) => {
                                return (
                                    <div key={index} onClick={() => {handleInputChange("size", type)}}>
                                        {type}
                                    </div>
                                )
                            })}
                        </div>
                </div>
            }
        </div>
    )
}

export default AgeInput;