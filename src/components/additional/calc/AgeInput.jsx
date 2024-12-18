import axios from "axios";
import Card from "../../common/Card";
import DefaultButton from "../../common/DefaultButton";

const AgeInput = (props) => {

    const {calcData, setCalcData, setGoods} = props;

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

        const year = parseInt(originData.birth.substring(0, 4));
        const month = parseInt(originData.birth.substring(4, 6));
        const day = parseInt(originData.birth.substring(6, 8));

        // 생년월일로 Date 객체 생성
        const birthDateObj = new Date(year, month - 1, day); // 월은 0부터 시작하므로 1을 빼줍니다

        // 나이 계산
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = today.getMonth() - birthDateObj.getMonth();

        // 생일이 아직 지나지 않았다면 나이에서 1을 빼줍니다
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
            age--;
        }

        postData.humanAge = age // birth 가공 해야함
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
            <Card className="default-card species-selector">
                <h3>반려동물 종류</h3>
                <div>
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
                <h3>생년월일</h3>
                <input value={calcData?.birth} onChange={(e) => {handleInputChange("birth", e.target.value)}}/>
            </Card>
            {calcData?.species === "강아지" &&
                <Card>
                    <h3>강아지 크기</h3>
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
                    <h3>고양이 유형</h3>
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
            <DefaultButton onClick={handleRecommend}>결과 확인</DefaultButton>
        </Card>
    )
}

export default AgeInput;