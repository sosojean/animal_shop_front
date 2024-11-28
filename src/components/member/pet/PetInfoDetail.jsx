import Card from "../../common/Card";
import {catBreedOptions, dogBreedOptions, weightOptions} from "../../../utils/petOptions";
import React from "react";

const PetInfoDetail = ({item}) => {
    console.log(item);

    const url = `http://localhost:8080/file/image-print?filename=${item?.profileImageUrl?item.profileImageUrl
        :"pet_00876a609b11427d8d6dbca99e978a5e.jpg"}`; // todo: default 이미지 지정
    return (
        <Card className="detail-info">
            {item?<>
            <img className={"pet-profile"} src={url} alt=""/>

            <h2>{item.name}</h2>
            <span>{item.age} 살</span>
            <span>{item.species === "CAT" ? catBreedOptions[parseInt(item.breed)] : dogBreedOptions[parseInt(item.breed)]}</span>
            <span>{weightOptions[parseInt(item.weight)]}</span>
            <span>{item.gender === "FEMALE" ? "여아" : "남아"}</span>
            <span>{item["is_neutered"]}</span></>:"등록된 반려동물이 없어요"}


        </Card>
    );
};

export default PetInfoDetail;