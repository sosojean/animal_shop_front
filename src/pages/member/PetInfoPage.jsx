import React, {useEffect, useState} from 'react';
import PetInfoDetail from "../../components/member/pet/PetInfoDetail";
import PetInfoList from "../../components/member/pet/PetInfoList";
import instance from "../../utils/axios";
import axios from 'axios';

const PetInfoPage = () => {

    const [selectedPet, setSelectedPet] = useState(0)
    const [data, setData] = useState()
    const [isEdited, setIsEdited] = useState(false)

    const [dogBreedOptions, setDogBreedOptions] = useState([]);
    const [catBreedOptions, setCatBreedOptions] = useState([]);

        // api 통신
    const getBreedOptions = () => {
        axios({
            url: `http://localhost:8080/pet/breed-list?species=DOG`,
            method: "get",
        }).then((res) => {
            console.log("getBreedOptions response", res.data);
            setDogBreedOptions(res.data.breeds);
        })
        .catch((err) => {
            console.error("error", err);
        })

        axios({
            url: `http://localhost:8080/pet/breed-list?species=CAT`,
            method: "get",
        }).then((res) => {
            console.log("getBreedOptions response", res.data);
            setCatBreedOptions(res.data.breeds);
        })
        .catch((err) => {
            console.error("error", err);
        })
    }

    useEffect(() => {
        instance({
            url:"/pet/list",
            method:"get",

        }).then((response) => {
            console.log(response);
            setData(response.data["petProfileList"]);
        }).catch((error) => {
            console.log(error);
        });

        getBreedOptions();

    },[isEdited])



    return (
        <div className={"pet-info-container"}>
            {data && <>
                <PetInfoList setSelectedPet={setSelectedPet} data={data} setIsEdited={setIsEdited} isEdited={isEdited}
                    dogBreedOptions={dogBreedOptions} catBreedOptions={catBreedOptions}
                />
                <PetInfoDetail item={data[selectedPet]}  setIsEdited={setIsEdited} isEdited={isEdited}
                    dogBreedOptions={dogBreedOptions} catBreedOptions={catBreedOptions}
                />
                </>}
        </div>
    );
};

export default PetInfoPage;