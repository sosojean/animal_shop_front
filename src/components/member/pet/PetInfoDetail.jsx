import Card from "../../common/Card";
import {weightOptions} from "../../../utils/petOptions";
import React, { useEffect, useState } from "react";
import "../../../assets/styles/member/PetInfoDetail.scss"
import instance from "../../../utils/axios";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight, faCrown, faQuoteLeft, faQuoteRight} from "@fortawesome/free-solid-svg-icons";
import animalPlaceholder from "../../../assets/img/animalPlaceholder.svg"
import DefaultButton from "../../common/DefaultButton";
import {Link} from "react-router-dom";


const PetInfoDetail = (props) => {

    const {item, setIsEdited, isEdited, dogBreedOptions, catBreedOptions} = props;
    
    console.log(item);

    const url = item?.profileImageUrl?`${process.env.REACT_APP_API}/file/image-print?filename=${item.profileImageUrl
        }`:animalPlaceholder; // todo: default 이미지 지정



    const handleSetLeader = ()=> {
        instance({
            url : `/pet/leader/${item.id}`,
            method:'PATCH',
        }).then(res=>{
            console.log(res)
            setIsEdited(!isEdited);
        }).catch((error) => {
            console.log(error)
        })
    }


    return (
        <Card className="default-card pet-detail-info">

            {item ? <>
                    <img className={"pet-profile"} src={url} alt=""/>
                    <p>
                        <FontAwesomeIcon icon={faQuoteLeft}/>
                        산책을 좋아해요
                        <FontAwesomeIcon icon={faQuoteRight}/>
                    </p>
                    <Card className="default-card detail-info-text">

                        <div className={"row pet-info-content"}>
                            <div className={"col detail-pet-info"}>
                                <div className={"name-section"}>
                                    {item?.isLeader && <FontAwesomeIcon className="icon" icon={faCrown}/>}
                                    <h2>{item.name}</h2>
                                    <span>{item.age} 살</span>
                                </div>
                                <span>{item.breed}</span>
                                <span>{weightOptions[parseInt(item.weight)]}</span>
                                <span>{item.gender === "FEMALE" ? "여아" : "남아"}</span>
                                {/*<span>{item["is_neutered"]}</span>*/}
                            </div>
                            <div className={"link-container"}>
                                <div className={"go-to-wiki"}>
                                    <span>우리아이 특성 알아보기<FontAwesomeIcon icon={faAngleRight}/></span>

                                    <Link to={`/wiki/${item.wikiId}`}>
                                    <span>{item.breed}</span>

                                </Link>
                                <Link to={`/wiki/${item.wikiId}`}>
                                    <span>{item.breed}</span>

                                </Link>
                                <Link to={`/wiki/${item.wikiId}`}>
                                    <span>{item.breed}</span>

                                </Link>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <div className="two-buttons">
                        {!item?.isLeader &&
                            <DefaultButton className={"primary-border long"}
                                           onClick={handleSetLeader}>대표펫 지정하기</DefaultButton>}
                        {/*<button>정보 수정하기</button>*/}
                    </div>
                </>

                : <div className={"pet-profile"}>등록된 반려동물이 없어요</div>

            }


        </Card>
    );
};

export default PetInfoDetail;