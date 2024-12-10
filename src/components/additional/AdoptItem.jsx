import { useNavigate } from "react-router-dom";
import Card from "../common/Card";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import instance from "../../utils/axios"

const AdoptItem = (props) => {

    const {data} = props;
    const navigate = useNavigate();

    // data.kindCd 가공
    const getConvertedKind = (type) => {
        const kind = data.species;
        const splitKind = kind.split(" ");

        if (type === "species") {
            const species = splitKind[0];
            const splitSpecies = species.split("")[1];

            if (splitSpecies === "개") {
                return "[강아지]";
            }
            else {return species;}
        } else {
            return splitKind[1];
        }
    }

    const handleAddInterest = () => {
        instance({
            url: `/abandoned_animal/register?desertionNo=${data.desertion_no}`,
            method: "get",
        }).then((res) => {
            console.log("handleAddInterest response", res.data);
            alert("관심동물에 등록됐습니다!");
        })
        .catch((err) => {
            console.error("handleAddInterest error", err);
        })
    }

    return (
        <>
        <Card className="adopt-item-Container">
            <div className="img-container">
                <img src={data.popfile} alt="강아지"/>
            </div>
            <div className="info-container">
                <div className="process-container" onClick={handleAddInterest}>
                    {/* <p>{data.status}</p> */}
                    <span><FontAwesomeIcon icon={faPlus}/></span>    
                </div>
                <div>
                    <span>{getConvertedKind("species") + " " + 
                        getConvertedKind() + "/"}</span>
                    <span>{data.age}세</span>
                </div>
                <div>
                    <span>{data.sex === 'F' ? "여아" : 
                            data.sex === 'M' ? "남아" : "성별미상"}</span>
                    <span>{" / "} 중성화 {" "}
                        {data.neuterYn === 'Y' ? "완료" :
                            data.neuterYn === 'N' ? "미완료" : "알수없음"}
                    </span>
                </div>
            </div>
            <div className="addr-container">
                <p>{data.location}</p>
            </div>
        </Card>        
        </>

    )
}

export default AdoptItem;