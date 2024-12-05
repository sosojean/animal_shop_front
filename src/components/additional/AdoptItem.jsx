import { useNavigate } from "react-router-dom";
import Card from "../common/Card";

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

    return (
        <>
        <Card className="adopt-item-Container">
            <div className="img-container">
                <img src={data.popfile} alt="강아지"/>
            </div>
            <div className="info-container">
                <div className="process-container">
                    <p>{data.status}</p>
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