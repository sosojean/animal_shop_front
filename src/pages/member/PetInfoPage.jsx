import React, {useEffect, useState} from 'react';
import PetInfoDetail from "../../components/member/pet/PetInfoDetail";
import PetInfoList from "../../components/member/pet/PetInfoList";
import instance from "../../utils/axios";

const PetInfoPage = () => {

    const [selectedPet, setSelectedPet] = useState(0)
    const [data, setData] = useState()
    const [isEdited, setIsEdited] = useState(false)


    useEffect(() => {
        instance({
            url:"/pet/list",
            method:"get",

        }).then((response) => {
            console.log(response);
            setData(response.data["petProfileList"]);
        }).catch((error) => {
            console.log(error);
        })


    },[isEdited])



    return (
        <div className={"pet-info-container"}>
            {data && <>
                <PetInfoList setSelectedPet={setSelectedPet} data={data} setIsEdited={setIsEdited} isEdited={isEdited}/>
                <PetInfoDetail item={data[selectedPet]}  setIsEdited={setIsEdited} isEdited={isEdited}/></>}
        </div>
    );
};

export default PetInfoPage;