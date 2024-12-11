import Card from "../common/Card";
import "../../assets/styles/additional/adoptDetail.scss"
import axios from "axios";
import instance from "../../utils/axios"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const AdoptDetail = (props) => {

    const {setIsCat} = props;

    // const { data } = props;
    const { id } = useParams();

    const [data, setData] = useState();
    const navigate = useNavigate();

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
            console.log("handleAddInterest response", res.data);
            alert("관심동물에 등록됐습니다!");
        })
        .catch((err) => {
            console.error("handleAddInterest error", err);
        })
    }

    return (
        <>
        {data &&
            <Card className="adopt-detail-container">
                <div className="img-container">
                    <img src={data.popfile}/>
                </div>
                <div className="info-container">
                    <div className="basic-container">
                        <span>{getConvertedKind("species")}</span>
                        <span>{" "}{getConvertedKind()}</span>
                        <span>{" / "}{getConvertedAge() + "세"}</span>
                        <span onClick={handleAddInterest}><FontAwesomeIcon icon={faPlus}/></span>
                    </div>
                    <div className="feature-container">
                        <div>
                            <span>
                                {data.sexCd === 'F' ? "여아" : 
                                    data.sexCd === 'M' ? "남아" : "성별미상"}
                            </span>
                            <span>{" / "}<b>중성화</b> {getConvertedNeuter()}</span>
                            <span>{" / "}<b>무게</b> {getConvertedWeight()}</span>
                        </div>
                        <div>
                            <p><b>특이사항</b> {data.specialMark}</p>
                        </div>
                    </div>
                    <div className="period-container">
                        <p><b>공고번호</b> {data.noticeNo}</p>
                        <p><b>공고기간</b> {getConvertedNoticeDate()}</p>
                    </div>
                    <div>
                        <div>
                            <span>보호소 {data.careNm}</span>
                            <span>{" / "}보호소 연락처 {data.careTel}</span>
                        </div>
                        <div> 
                            <p>보호주소 {data.careAddr} </p>
                        </div>
                    </div>
                </div>
            </Card>        
        }  
        </>
    )
}

export default AdoptDetail;