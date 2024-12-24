import Card from "../../common/Card"
import "../../../assets/styles/additional/adoptDetail.scss"
import axios from "axios";
import instance from "../../../utils/axios"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AdoptAnimalComment from "../../../pages/additional/AdoptAnimalComment"
import DefaultButton from "../../common/DefaultButton";
import parseJwt from "../../../utils/parseJwt";
import { toast } from "react-toastify";

const AdoptDetail = (props) => {

    const {setIsCat} = props;

    const { id } = useParams();

    const [data, setData] = useState();
    const [isAdmin, setIsAdmin] = useState(false);

    const navigate = useNavigate();

    const token = localStorage.getItem("accessToken");

    const checkAdmin = () => {
        const role = parseJwt(token).role;
        if (role === "ADMIN")
            setIsAdmin(true);
        else setIsAdmin(false);
    }

    const getApiData = () => {
        axios({
            url: `http://localhost:8080/abandoned_animal/detail?animalId=${id}`,
            method: "get",
        }).then((res) => {
            console.log("getApiData response", res.data);
            setData(res.data);
        })
        .catch((err) => {
            console.error("error", err);
        })
    };

    useEffect(()=>{
        getApiData();
        checkAdmin();
    }, [id]);

    // data.kindCd 가공
    const getConvertedKind = (type) => {
        const kind = data.kindCd;
        const splitKind = kind.split(" ");

        if (type === "species") {
            const species = splitKind[0];
            const splitSpecies = species.split("")[1];

            if (splitSpecies === "개") {
                setIsCat(false);
                return "[강아지]";
            } else {
                setIsCat(true);
                return species;
            }
        } else {
            return splitKind[1];
        }
    }

    // data.age 가공
    const getConvertedAge = () => {
        const age = data.age;
        const rigntNow = new Date();
        const nowYear = rigntNow.getFullYear();

        return nowYear - age;
    }

    // data.neuterCd 가공
    const getConvertedNeuter = () => {
        const neuter = data.neuterYn;

        switch(neuter){
            case "Y":
                return "완료"
            case "N":
                return "미완료"
            case "U":
                return "알수없음"
        }
    }

    // data.weight 가공
    const getConvertedWeight = () => {
        const weight = data.weight;
        const splitWeihgt = weight.split("(");

        console.log("splitWeihgt", splitWeihgt);

        return splitWeihgt[0] + " kg"
    }

    // {data.noticeSdt} ~ {data.noticeEdt} 가공
    const getConvertedNoticeDate = () => {
        const startDate = data.noticeSdt; // 20241204
        const startYear = startDate.substr(0, 4);
        const startMonth = startDate.substr(4, 2);
        const startDay = startDate.substr(6, 2);

        const endDate = data.noticeEdt;
        const endYear = endDate.substr(0, 4);
        const endMonth = endDate.substr(4, 2);
        const endDay = endDate.substr(6, 2);

        return startYear + "-" + startMonth + "-" + startDay + "~" +
            endYear + "-" + endMonth + "-" + endDay
    }

    const handleAddInterest = () => {
        instance({
            url: `/abandoned_animal/register?desertionNo=${data.desertion_no}`,
            method: "get",
        }).then((res) => {
            // console.log("handleAddInterest response", res.data);
            toast.success("관심동물에 등록됐습니다!");
        })
        .catch((err) => {
            console.error("handleAddInterest error", err);
            toast.error("이미 관심동물에 등록 돼 있습니다!");
        })
    }

    const handleSendMail = () => {
        const postData = {
            desertionNo: data.desertion_no,
            newState: "종료(입양)"
        };

        const sendMailPromise = instance({
            url: `/abandoned_animal/manageStatus`,
            method: "post",
            data: postData
        });
    
        toast.promise(
            sendMailPromise,
            {
                pending: "메일을 전송 중입니다...",
                success: "사용자에게 메일을 전송했습니다!",
                error: "사용자에게 메일을 전송 중에 오류가 발생했습니다!"
            }
        )
        .then(() => {
            navigate("/adoption");
        })
        .catch((err) => {
            console.error("handleSendMail error", err);
            navigate("/adoption");
        });
    }

    return (
        <>
        {data &&
            <>
                <Card className="adopt-detail-container default-card">
                    <Card className="img-container default-card">
                        <img src={data.popfile}/>
                    </Card>
                    <div className="info-container">
                        <Card className="info-item basic-container default-card">
                            <div className="basic-box">
                                <div>
                                    <span><b>{getConvertedKind("species")}</b></span>
                                    <span>{" "}{getConvertedKind()}</span>
                                    <span>{" · "}{getConvertedAge() + "세"}</span>                                    
                                </div>
                                <div className="button-box">
                                    {isAdmin &&
                                        <DefaultButton className="alert detail-button" onClick={handleSendMail}>입양 완료</DefaultButton>                  
                                    }
                                    <DefaultButton className="primary detail-button" onClick={handleAddInterest}><FontAwesomeIcon icon={faPlus}/></DefaultButton>      
                                </div>                   
                            </div>
                        </Card>
                        <Card className="info-item feature-container default-card">
                            <div>
                                <span>
                                    <b>
                                        {data.sexCd === 'F' ? "여아" : 
                                        data.sexCd === 'M' ? "남아" : "성별미상"}
                                    </b>
                                </span>
                                <span>{" · "}<b>중성화</b> {getConvertedNeuter()}</span>
                                <span>{" · "}<b>무게</b> {getConvertedWeight()}</span>
                            </div>
                            <div>
                                <p><b>특이사항</b> {data.specialMark}</p>
                            </div>
                        </Card>
                        <Card className="info-item period-container default-card">
                            <p><b>공고번호</b> {data.noticeNo}</p>
                            <p><b>공고기간</b> {getConvertedNoticeDate()}</p>
                        </Card>
                        <Card className="info-item default-card">
                            <div>
                                <span><b>보호소</b> {data.careNm}</span>
                                <span>{" · "}<b>보호소 연락처</b> {data.careTel}</span>
                            </div>
                            <div> 
                                <p><b>보호주소</b> {data.careAddr} </p>
                            </div>
                        </Card>
                    </div>
                </Card>
                <AdoptAnimalComment id={id}/>            
            </>

        }  
        </>
    )
}

export default AdoptDetail;