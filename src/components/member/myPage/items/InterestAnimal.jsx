import React from 'react';
import Card from "../../../common/Card";
import {Link} from "react-router-dom";
import DefaultButton from "../../../common/DefaultButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus} from "@fortawesome/free-solid-svg-icons";
import instance from '../../../../utils/axios';
import { toast } from "react-toastify";

const InterestAnimal = ({data, update, setUpdate}) => {

    console.log("interestAnimal", data);

    const handleDeleteInterest = () => {
        instance({
            url: `/abandoned_animal/delete?animalId=${data.id}`,
            method: "delete",
        }).then((res) => {
            // console.log("handleDeleteInterest response", res.data);
            toast.success("관심동물 해제됐습니다!");
            setUpdate(!update);
        })
        .catch((err) => {
            console.error("handleDeleteInterest error", err);
            toast.error("관심동물 해제 중 오류가 발생했습니다!");
        })
    }

    return (
        <Card className="adopt-item-Container">
            <Link to={`/adoption/detail/${data.abandoned_animal_id}`} key={data.id}>
                <div className="img-container">
                    <img src={data.attachmentUrl} alt="강아지"/>
                </div>
            </Link>
            <div className="info-container">
                <Link to={`/adoption/detail/${data.id}`} key={data.id}>
                    <div>
                        <div>
                            {/*<span>{("species") + " " +*/}
                            {/*    () + "/"}</span>*/}
                            <span>{data.age}세</span>
                        </div>
                        <div>
                            <span>{data.sex_cd === 'F' ? "여아" :
                                data.sex_cd === 'M' ? "남아" : "성별미상"}</span>
                            <span>{" / "} 중성화 {" "}
                                {data.neuter_yn === 'Y' ? "완료" :
                                    data.neuter_yn === 'N' ? "미완료" : "알수없음"}
                            </span>
                        </div>
                    </div>
                </Link>
                <div className="process-container" onClick={() => {handleDeleteInterest()}}>
                    <DefaultButton ><FontAwesomeIcon icon={faMinus}/></DefaultButton>
                </div>
            </div>
            <div className="addr-container">
                <p>{data.care_nm}</p>
            </div>
        </Card>
    );
};

export default InterestAnimal;