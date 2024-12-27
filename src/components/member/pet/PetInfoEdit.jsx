import React, {useEffect, useState} from 'react';
import instance from "../../../utils/axios";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import InputField from "../../common/InputField";
import Selector from "../../common/Selector";
import {weightOptions,catBreedOptions,dogBreedOptions,ageOptions} from "../../../utils/petOptions";
import InputImage from "../../common/InputImage";
import "../../../assets/styles/member/petInfoEdit.scss"
import Title from "../../common/Title";


const PetInfoEdit = () => {
    const {petId} = useParams();
    const {state} = useLocation();

    const navigate = useNavigate();
    const pet = {
        ...state,
    };

    console.log(pet);

    const [petInfo, setPetInfo] = useState(pet)
    // const url = `${process.env.REACT_APP_API}/file/image-print?filename=${petInfo.profileImageUrl}`

    useEffect(() => {
        console.log(petInfo);
    },[petInfo])

    const applyPetInfo = (name,value) => {
        setPetInfo((prev)=>(
            {
                ...prev,
                [name]:value
            }))
    }

    useEffect(() => {
        console.log(petInfo)

    }, [petInfo]);

    const editConfirmHandler= () => { // todo: 동물 수정 시 get 에서 안들어오는 데이터 반영해줘야함
        instance({
            url:`/pet/update/${petId}`,
            method:"patch",
            data:petInfo,
        }).then(res => {
            console.log(res)
            navigate("/pet/info");
        }).catch(err => console.log(err));

    }

// 이름 중성화 여부 나이 몸무게 동물 등록 번호 프로필 사진
    return (
        <>
            <Title>반려동물 정보 수정</Title>
        <div className={"pet-info-edit"}>
            {/*<img src={url} alt=""/>*/}

            <InputImage imageUploadPath={"pet-image-upload"} objName="profileImageUrl" setImage={applyPetInfo}
                        image={petInfo.profileImageUrl}/>


            <InputField name={"name"} title={"이름"}
                        input={petInfo.name} setInput={applyPetInfo}/>

            <InputField name={"description"} title={"설명"}
                        input={petInfo.description} setInput={applyPetInfo}/>

            <Selector selectedValue={petInfo.weight} optionItems={weightOptions} name={"weight"}
                      handleSelectChange={applyPetInfo}/>

            <Selector selectedValue={petInfo.age} optionItems={ageOptions} name={"age"}
                      handleSelectChange={applyPetInfo}/>

            <div>
                <label htmlFor="isNeutered">
                    <span>중성화 여부</span>
                    <input id={"isNeutered"} checked={petInfo.isNeutered} onChange={(e)=>{ applyPetInfo("isNeutered",e.target.checked)} } type="checkbox"/>
                </label>
            </div>
            <button onClick={editConfirmHandler}>수정 완료</button>

        </div>
        </>
    );
};

export default PetInfoEdit;