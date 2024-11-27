import React, {useState} from 'react';
import Card from "../../common/Card";
import instance from "../../../utils/axios";
import {useNavigate} from "react-router-dom";
import {weightOptions,catBreedOptions,dogBreedOptions,ageOptions} from "../../../utils/petOptions";
import "../../../assets/styles/member/petInfo.scss"

const PetInfo = ({item, setIsEdited, isEdited}) => {

    const navigate = useNavigate();


    const url = `http://localhost:8080/file/image-print?filename=${item.profileImageUrl?item.profileImageUrl
        :"pet_00876a609b11427d8d6dbca99e978a5e.jpg"}`; // todo: default 이미지 지정

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

    const handleSetLeader = ()=> {
        instance({
            url : `/pet/leader/${item.id}`,
            method:'PATCH',
        }).then(res=>{
            console.log(res)
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <Card className={"pet-info"}>
            <img className={"pet-profile"} src={url} alt=""/>
            <div className={"info-section"}>
                <span>{item.name}</span>
                <span>{item.age}</span>
                <span>{item.species==="CAT"? catBreedOptions[parseInt(item.breed)]:dogBreedOptions[parseInt(item.breed)]}</span>
                <span>{weightOptions[ parseInt(item.weight)]}</span>
                <span>{item.gender==="FEMALE"?"여아":"남아"}</span>
                <span>{item["is_neutered"]}</span>
            </div>
            <div className={"button-section"}>
                <button onClick={handleEdit}>수정하기</button>
                <button onClick={handleDelete}>삭제하기</button>
                <button onClick={handleSetLeader}>대표로 설정</button>

            </div>

        </Card>
    );
};

export default PetInfo;