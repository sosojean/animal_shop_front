import InputField from "../../../common/InputField";
import InputImage from "../../../common/InputImage";
import Selector from "../../../common/Selector";
import {useEffect} from "react";
import DefaultButton from "../../../common/DefaultButton";
import Title from "../../../common/Title";
import "../../../../assets/styles/member/Description.scss"

const Description = (props) => {// todo 상태메시지와 등록 코드
    return (<div className={"more-info"}>
        <Title>더 알려주고 싶은 정보를 입력해주세요!</Title>

        <InputField name={"description"}
                        input={props.petInfo.description}
                       placeholder={"우리 아이를 소개하는 문구를 작성해주세요."}
                       setInput={props.input}/></div>);
}

const SelectMethod = () => { // todo: 반려동물 등록번호 확인 api 붙히기
    return (<>
        <Title>반려동물 등록방법을 선택 해주세요!</Title>
        <DefaultButton className="default wd100">반려동물 등록번호 입력하고 정보 쉽게 입력하기</DefaultButton>
    </>);
}

const ImageBreedAge =(props) =>{


    const trimOptionText = (value)=>{
        if (value === "나이를 선택해주세요.") return value;
        return value+" 살";
    }
    const options = props.petInfo.species === "CAT" ? props.strings : props.strings1;

    return (<div className={"image-breed-age"}>
        <Title>반려동물의 정보를 더 입력해주세요!</Title>

        <InputImage imageUploadPath={"pet-image-upload"} objName="profileImageUrl" setImage={props.applyPetInfo}
                    image={props.petInfo.profileImageUrl}/>
        <div className={"breed-age-selector"}>
        <Selector className={"age-selector info-input"}
                  selectedValue={props.petInfo.age}
                  optionItems={props.optionItems}
                  name={"age"}
                  trimOptionText={trimOptionText}
                  handleSelectChange={props.applyPetInfo}/>

        <Selector selectedValue={props.petInfo.breed}
                  className={"info-input"}
                  optionItems={options} name={"breed"}
                  handleSelectChange={props.applyPetInfo}/>
        </div>
    </div>);
}


const GenderAndWeight = (props) => {

    return (<div className={"gender-and-weight"}>
        <Title>성별과 무게를 입력해주세요!</Title>

        <div className={"two-buttons"}>

            <DefaultButton onClick={props.onClick}
                           className={props.petInfo.gender === "MALE" ? "selected primary" : "default"}>남아</DefaultButton>
            <DefaultButton onClick={props.onClick1}
                           className={props.petInfo.gender === "FEMALE" ?  "selected primary" : "default"}>여아</DefaultButton>

        </div>
        <div className={"neutered-box-container"}>
            <label className={"neutered-label"} htmlFor={"isNeutered"}>중성화 했어요</label>
            <input className={"neutered-box"} id={"isNeutered"} checked={props.petInfo.isNeutered} onChange={props.onChange} type="checkbox"/>
        </div>
        <Selector className={"info-input"} selectedValue={props.petInfo.weight} optionItems={props.optionItems} name={"weight"}
                  handleSelectChange={props.handleSelectChange}/>
    </div>);
}


export {Description, SelectMethod, ImageBreedAge, GenderAndWeight};
