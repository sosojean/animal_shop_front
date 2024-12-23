import React from 'react';
import Card from "../../../common/Card";
import {Link} from "react-router-dom";
import DefaultButton from "../../../common/DefaultButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus} from "@fortawesome/free-solid-svg-icons";

const InterestAnimal = ({data}) => {
    return (
        <Card className="adopt-item-Container">
            <Link to={`/adoption/detail/${data.id}`} key={data.id}>
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
                <div className="process-container" onClick={() => {}}>
                    <DefaultButton><FontAwesomeIcon icon={faMinus}/></DefaultButton>
                </div>
            </div>
            <div className="addr-container">
                <p>{data.care_nm}</p>
            </div>
        </Card>
    );
};

export default InterestAnimal;