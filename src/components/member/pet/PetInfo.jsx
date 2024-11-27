import React, {useState} from 'react';
import Card from "../../common/Card";
import instance from "../../../utils/axios";
import {useNavigate} from "react-router-dom";
import {weightOptions,catBreedOptions,dogBreedOptions,ageOptions} from "../../../utils/petOptions";

const PetInfo = ({item, setIsEdited, isEdited}) => {

    const navigate = useNavigate();

    const url = `http://localhost:8080/file/image-print?filename=${item.profileImageUrl}`;

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

    return (
        <Card className={"pet-info"}>
            <img src={url} alt=""/>
            <span>{item.name}</span>
            <span>{item.age}</span>
            <span>{item.species==="CAT"? catBreedOptions[parseInt(item.breed)]:dogBreedOptions[parseInt(item.breed)]}</span>
            <span>{weightOptions[ parseInt(item.weight)]}</span>
            <span>{item.gender==="FEMALE"?"여아":"남아"}</span>
            <span>{item["is_neutered"]}</span>

            <button onClick={handleEdit}>수정하기</button>
            <button onClick={handleDelete}>삭제하기</button>


        </Card>
    );
};

export default PetInfo;