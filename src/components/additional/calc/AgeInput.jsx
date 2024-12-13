import Card from "../../common/Card";
import DefaultButton from "../../common/DefaultButton";

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
        <Card className="default-card age-input">
            <Card className="default-card species-selector">
                <h3>반려동물 종류</h3>
                <div>
                    {speciesList.map((species, index) => {
                        return <DefaultButton key={index} 
                            onClick={() => {handleInputChange("species", species)}}>{species}</DefaultButton>
                    })}
                </div>
            </Card>
            <Card>
                <h3>생년월일</h3>
                <input onChange={(e) => {handleInputChange("birth", e.target.value)}}/>
            </Card>
            {calcData?.species === "강아지" &&
                <Card>
                    <h3>강아지 크기</h3>
                    <div>
                        {dogSizeList.map((size, index) => {
                            return (
                                <DefaultButton key={index} onClick={() => {handleInputChange("size", size)}}>
                                    {size}                           
                                </DefaultButton>
                            )
                        })}
                    </div>
                </Card>            
            }
            {calcData?.species === "고양이" &&
                <Card>
                    <h3>고양이 유형</h3>
                        <div>
                            {catTypeList.map((type, index) => {
                                return (
                                    <DefaultButton key={index} onClick={() => {handleInputChange("size", type)}}>
                                        {type}
                                    </DefaultButton>
                                )
                            })}
                        </div>
                </Card>
            }
        </Card>
    )
}

export default AgeInput;