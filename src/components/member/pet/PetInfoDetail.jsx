import Card from "../../common/Card";
import {weightOptions} from "../../../utils/petOptions";
import React, { useEffect, useState } from "react";
import "../../../assets/styles/member/PetInfoDetail.scss"
import instance from "../../../utils/axios";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCrown} from "@fortawesome/free-solid-svg-icons";


const PetInfoDetail = (props) => {

    const {item, setIsEdited, isEdited, dogBreedOptions, catBreedOptions} = props;
    
    console.log(item);

    const url = `http://localhost:8080/file/image-print?filename=${item?.profileImageUrl?item.profileImageUrl
        :"pet_00876a609b11427d8d6dbca99e978a5e.jpg"}`; // todo: default 이미지 지정



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
        <Card className="pet-detail-info">

            {item ? <>
                    <img className={"pet-profile"} src={url} alt=""/>
                    <Card className="detail-info-text">
                        <div className={"name-section"}>
                            {item?.isLeader && <FontAwesomeIcon className="icon" icon={faCrown}/>}
                            <h2>{item.name}</h2>
                        </div>

                        <span>{item.age} 살</span>
                        <span>{item.species === "CAT" ? catBreedOptions[parseInt(item.breed)] : dogBreedOptions[parseInt(item.breed)]}</span>
                        <span>{weightOptions[parseInt(item.weight)]}</span>
                        <span>{item.gender === "FEMALE" ? "여아" : "남아"}</span>
                        <span>{item["is_neutered"]}</span>
                    </Card>

                    <div className="two-buttons">
                        {!item?.isLeader && <button onClick={handleSetLeader}>대표펫 지정하기</button>}
                        <button>정보 수정하기</button>
                    </div>
                </>

                : <div className={"pet-profile"}>등록된 반려동물이 없어요</div>

            }


        </Card>
    );
};

export default PetInfoDetail;