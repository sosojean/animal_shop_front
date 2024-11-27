import {useEffect, useState} from "react";
import PetInfoInput from "../../components/member/pet/PetInfoInput";
import InputField from "../../components/common/InputField";
import InputImage from "../../components/common/InputImage";
import Selector from "../../components/common/Selector";
import "../../assets/styles/member/PetRegister.scss"

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
    const weightOptions = [1,2,3,4,5,6,7,9,11,14,17,20,24,28,32,37,42,47];
    const ageOptions = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

    const catBreedOptions = ["고양이","고양이","고양이","고양이","고양이","고양이","고양이"];
    const dogBreedOptions = ["강아지","강아지","강아지","강아지","강아지","강아지","강아지"];


    const [currentStep, setCurrentStep] = useState(step.SelectMethod)
    const [petInfo, setPetInfo] = useState(pet)
    const [isFirstPage, setIsFirstPage] = useState(true)
    const [isLastPage, setIsLastPage] = useState(false)


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


    const selectMethod = (<>
            <div className={"two-buttons"}>
                <button>반려동물 등록번호 입력하고 정보 쉽게 입력하기</button>
            </div>
    </>)
    const nameSpecies = (
        <>
            <div className={"two-buttons"}>
                <button>강아지</button>
                <button>고양이</button>
            </div>
            <InputField name={"name"}
                        title={"이름을 입력해주세요."}
                        placeholder={"이름"}/>
        </>
    )

    const imageBreedAge = (
        <>

        <InputImage imagePath={"a"}/>
            <Selector optionItems={ageOptions}/>
            <Selector optionItems={catBreedOptions}/>

        </>
    )

    const genderWeight = (
        <>
        <div className={"two-buttons"}>

            <button>남아</button>
            <button>여아</button>
        </div>
        <Selector optionItems={weightOptions}/>
        </>
    )

    const descriptionRegCode = (
        <InputField name={"regCode"}
                    title = {"더 알려주고 싶은 정보를 입력해주세요."}
                    placeholder={"참치를 좋아해요"}/>
    )//todo 상태메시지와 등록 코드

    const inputSelector = () => {
        switch (currentStep)
        {
            case step.SelectMethod:
                return selectMethod
                break;
            case step.NameSpecies:
                return nameSpecies
                break;
            case step.ImageBreedAge:
                return imageBreedAge
                break;
            case step.GenderWeight:
                return genderWeight
                break;
            case step.DescriptionRegCode:
                return descriptionRegCode
                break;
        }
    }

    return (
        <div className={"pet-register"}>
            <PetInfoInput setNext = {setNext} setPrev = {setPrev}
                          isFirstPage={isFirstPage} isLastPage={isLastPage}>
            {inputSelector()}
            </PetInfoInput>
        </div>
    )


}




export default PetRegister