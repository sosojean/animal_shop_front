import { useNavigate } from "react-router-dom";
import Card from "../../common/Card";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import instance from "../../../utils/axios"
import { Link } from "react-router-dom";
import DefaultButton from "../../common/DefaultButton"
import { toast } from "react-toastify";

const AdoptItem = (props) => {

    const {data} = props;
    const navigate = useNavigate();

    console.log("adopt item data", data);

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
        const token = localStorage.getItem('accessToken') || null;

        if(token){
            instance({
                url: `/abandoned_animal/register?desertionNo=${data.desertion_no}`,
                method: "get",
            }).then((res) => {
                // console.log("handleAddInterest response", res.data);
                toast.success("관심동물에 등록됐습니다!");
            })
            .catch((err) => {
                console.error("handleAddInterest error", err);
                toast.error("이미 등록된 아이예요!")
            })            
        } else {
            toast.error("로그인 먼저 해주세요!");
        }
    }

    return (
        <>
        <Card className="default-card adopt-item-Container">
            <Link to={`/adoption/detail/${data.id}`} key={data.id}>      
                <div className="img-container">
                    <img src={data.popfile} alt="강아지"/>
                </div>
            </Link>
            <div className="info-container">
                <Link to={`/adoption/detail/${data.id}`}>
                    <div>
                        <div className="info">
                            <span>{getConvertedKind("species") + " " + 
                                getConvertedKind() + " · "}</span>
                            <span>{data.age === 0 ? '1살 미만' : data.age + "세"}</span>
                        </div>
                        <div className="info">
                            <span>{data.sex === 'F' ? "여아" : 
                                    data.sex === 'M' ? "남아" : "성별미상"}</span>
                            <span>{" · "} 중성화 {" "}
                                {data.neuterYn === 'Y' ? "완료" :
                                    data.neuterYn === 'N' ? "미완료" : "알수없음"}
                            </span>
                        </div>                    
                    </div>                
                </Link>
                <DefaultButton className="primary" onClick={handleAddInterest}>
                    <span><FontAwesomeIcon icon={faPlus}/></span>
                </DefaultButton>
            </div>
            <div className="addr-container">
                <p>{data.org_nm}</p>
            </div>
        </Card>        
        </>

    )
}

export default AdoptItem;