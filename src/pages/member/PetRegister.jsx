import {useEffect, useState} from "react";
import PetInfoInput from "../../components/member/pet/PetInfoInput";
import "../../assets/styles/member/PetRegister.scss"
import NameAndSpecies from "../../components/member/pet/register/NameAndSpecies";
import {
    Description,
    GenderAndWeight,
    ImageBreedAge,
    SelectMethod
} from "../../components/member/pet/register/PetRegisterComps";

import {weightOptions,catBreedOptions,dogBreedOptions,ageOptions} from "../../utils/petOptions";
import axios from "axios";


const PetRegister = () => {

    const step = {
        SelectMethod:0,
        NameSpecies : 1,
        ImageBreedAge:2,
        GenderWeight:3,
        DescriptionRegCode:4
    }
    const pet = {
        name : "",
        species : "",
        breed : "",
        isNeutered : true,
        age : 0,
        gender : "",
        weight : 0,
        description : "",
        profileImageUrl : "",
        registrationCode : "",
    }

    const [currentStep, setCurrentStep] = useState(step.SelectMethod)
    const [petInfo, setPetInfo] = useState(pet)
    const [isFirstPage, setIsFirstPage] = useState(true)
    const [isLastPage, setIsLastPage] = useState(false)
    const [completeForm, setCompleteForm] = useState(false)
    const [dogBreedOptions, setDogBreedOptions] = useState([]);
    const [catBreedOptions, setCatBreedOptions] = useState([]);

    const applyPetInfo = (name,value) => {
        setPetInfo((prev)=>(
            {
                ...prev,
                [name]:value
            }))
    }

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
        setCompleteForm(isComplete())
        getBreedOptions();
        console.log(petInfo)

    }, [currentStep,petInfo]);


    const setNext = () => {
        if (currentStep < step.DescriptionRegCode) {
            setCurrentStep(currentStep + 1);
            setIsFirstPage(false);
        }
        if (currentStep + 1 === step.DescriptionRegCode) {
            setIsLastPage(true);
        }
    };

    const setPrev = () => {
        if (currentStep > step.SelectMethod) {
            setCurrentStep(currentStep - 1);
            setIsLastPage(false);
        }
        if (currentStep - 1 === step.SelectMethod) {
            setIsFirstPage(true);
        }
    };

    const isComplete = () => {
        switch (currentStep)
        {
            case step.NameSpecies:
                console.log(petInfo)
                return petInfo.species!==""
                break;
            default: return true;
        }
    }
    const inputSelector = () => {
        switch (currentStep)
        {
            case step.SelectMethod: return <SelectMethod/>

            case step.NameSpecies: return <NameAndSpecies onClickDog={() => applyPetInfo("species", "DOG")} petInfo={petInfo}
                                                          onClickCat={() => applyPetInfo("species", "CAT")} input={applyPetInfo}/>


            case step.ImageBreedAge: return <ImageBreedAge applyPetInfo={applyPetInfo}
                                                           petInfo={petInfo}
                                                           optionItems={ageOptions}
                                                           breedOptions={dogBreedOptions}
                                                           strings={catBreedOptions}
                                                           strings1={dogBreedOptions}/>
            case step.GenderWeight: return <GenderAndWeight onClick={() => applyPetInfo("gender", "MALE")} petInfo={petInfo}
                                                            onClick1={() => applyPetInfo("gender", "FEMALE")}
                                                            onChange={(e) => applyPetInfo("isNeutered", e.target.checked)}
                                                            key={`${currentStep}-${JSON.stringify(petInfo)}`}
                                                            optionItems={weightOptions}
                                                            handleSelectChange={applyPetInfo}/>

            case step.DescriptionRegCode: return <Description input={applyPetInfo} petInfo={petInfo}/>
        }
    }

    return (
        <div className={"pet-register"}>
            <PetInfoInput setNext = {setNext} setPrev = {setPrev} isComplete = {completeForm}
                          isFirstPage={isFirstPage} isLastPage={isLastPage} petInfo={petInfo}
                          dogBreedOptions={dogBreedOptions} catBreedOptions={catBreedOptions}>
                <div className="pet-register-form">
                {inputSelector()}
                </div>
            </PetInfoInput>
        </div>
    )


}




export default PetRegister