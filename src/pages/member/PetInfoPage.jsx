import React, {useEffect, useState} from 'react';
import PetInfoDetail from "../../components/member/pet/PetInfoDetail";
import PetInfoList from "../../components/member/pet/PetInfoList";
import instance from "../../utils/axios";
import axios from 'axios';
import Title from "../../components/common/Title";

const PetInfoPage = () => {

    const [selectedPet, setSelectedPet] = useState(0)
    const [data, setData] = useState([])
    const [isEdited, setIsEdited] = useState(false)
    const [totalCount, setTotalCount] = useState(0)
    const [page, setPage] = useState(1)

    const [dogBreedOptions, setDogBreedOptions] = useState([]);
    const [catBreedOptions, setCatBreedOptions] = useState([]);

        // api 통신
    const getBreedOptions = () => {
        axios({
            url: `${process.env.REACT_APP_API}/pet/breed-list?species=DOG`,
            method: "get",
        }).then((res) => {
            console.log("getBreedOptions response", res.data);
            setDogBreedOptions(res.data.breeds);
        })
        .catch((err) => {
            console.error("error", err);
        })

        axios({
            url: `${process.env.REACT_APP_API}/pet/breed-list?species=CAT`,
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
            params:{page:page}

        }).then((response) => {
            console.log(response);
            setSelectedPet(0)
            setData((prevData) =>
                [...prevData, ...response.data["petProfileList"]]);
            setTotalCount(response.data["total_count"]);
        }).catch((error) => {
            console.log(error);
        });

        getBreedOptions();

    },[isEdited,page])
    useEffect(() => {
        setData([])
    }, [isEdited]);





    return (
        <>
            <Title>나의 펫</Title>

            <div className={"pet-info-container"}>
            {data && <>

                <PetInfoList page={page} setPage={setPage} totalCount={totalCount} setSelectedPet={setSelectedPet} data={data} setIsEdited={setIsEdited} isEdited={isEdited}
                    dogBreedOptions={dogBreedOptions} catBreedOptions={catBreedOptions}
                />
                <PetInfoDetail item={data[selectedPet]}  setIsEdited={setIsEdited} isEdited={isEdited}
                    dogBreedOptions={dogBreedOptions} catBreedOptions={catBreedOptions}
                />
                </>}
        </div></>
    );
};

export default PetInfoPage;