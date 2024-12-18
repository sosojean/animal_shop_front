import React, {useState} from 'react';
import Card from "../../common/Card";
import instance from "../../../utils/axios";
import {useNavigate} from "react-router-dom";
import {weightOptions,catBreedOptions,dogBreedOptions,ageOptions} from "../../../utils/petOptions";
import "../../../assets/styles/member/petInfo.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCrown} from "@fortawesome/free-solid-svg-icons";
import animalPlaceholder from "../../../assets/img/animalPlaceholder.svg";

const PetInfo = (props) => {

    const {item, index, setIsEdited, isEdited, setSelectedPet, dogBreedOptions, catBreedOptions} = props;

    // console.log("petInfo", item);
    const navigate = useNavigate();

    const url = item.profileImageUrl?`http://localhost:8080/file/image-print?filename=${item.profileImageUrl
        }`:animalPlaceholder; // todo: default 이미지 지정

    const handleEdit = () => {
        navigate(`/pet/edit/${item.id}` ,{state : item});
    }

    const handleDelete = () => {
        instance({
            url : `/pet/delete/${item.id}`,
            method: "DELETE"
        }).then((response) => {
            console.log(response)
            setIsEdited(!isEdited);

        }).catch((error) => {
            console.log(error)
        })
    }

    const handleSelect = () =>{
        setSelectedPet(index)
        console.log(index)
    }

    return (
        <Card onClick={handleSelect} className={"default-card pet-info"}>
            <img className={"pet-profile"} src={url} alt=""/>
            <div className={"info-section"}>
                <h2>{item.isLeader&&<FontAwesomeIcon className="icon" icon={faCrown}/>}{" "+item.name}</h2>
                <span>{item.age} 살</span>
                <span>{item.breed}</span>
                <span>{weightOptions[ parseInt(item.weight)]}</span>
                <span>{item.gender==="FEMALE"?"여아":"남아"}</span>
                <span>{item["is_neutered"]}</span>
            </div>
            <div className={"button-section"}>

                <button className={"edit-btn"} onClick={handleEdit}>수정하기</button>
                <button className={"delete-btn"} onClick={handleDelete}>삭제하기</button>

            </div>

        </Card>
    );
};

export default PetInfo;