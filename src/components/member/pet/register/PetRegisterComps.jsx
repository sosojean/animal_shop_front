import InputField from "../../../common/InputField";
import InputImage from "../../../common/InputImage";
import Selector from "../../../common/Selector";
import {useEffect} from "react";
import DefaultButton from "../../../common/DefaultButton";
import Title from "../../../common/Title";

const Description = (props) => {// todo 상태메시지와 등록 코드
    return (<div>

        <InputField name={"description"}
                        input={props.petInfo.description}
                       title={"더 알려주고 싶은 정보를 입력해주세요."}
                       placeholder={"참치를 좋아해요"}
                       setInput={props.input}/></div>);
}

const SelectMethod = () => { // todo: 반려동물 등록번호 확인 api 붙히기
    return (<>
        <Title>반려동물 등록방법을 선택 해주세요!</Title>
        <DefaultButton className="default wd100">반려동물 등록번호 입력하고 정보 쉽게 입력하기</DefaultButton>
    </>);
}

const ImageBreedAge =(props) =>{


    const options = props.petInfo.species === "CAT" ? props.strings : props.strings1;

    return (<>
        <Title>반려동물의 정보를 더 입력해주세요!</Title>

        <InputImage imageUploadPath={"pet-image-upload"} objName="profileImageUrl" setImage={props.applyPetInfo}
                    image={props.petInfo.profileImageUrl}/>
        <div>
        <Selector className={"age-selector"}
                  selectedValue={props.petInfo.age}
                  optionItems={props.optionItems}
                  name={"age"}
                  handleSelectChange={props.applyPetInfo}/>

        <Selector selectedValue={props.petInfo.breed}
                  optionItems={options} name={"breed"}
                  handleSelectChange={props.applyPetInfo}/>
        </div>
    </>);
}


const GenderAndWeight = (props) => {

    return (<>
        <div className={"two-buttons"}>

            <DefaultButton onClick={props.onClick} className={props.petInfo.gender === "MALE" && "selected"}>남아</DefaultButton>
            <DefaultButton onClick={props.onClick1} className={props.petInfo.gender === "FEMALE" && "selected"}>여아</DefaultButton>
            <div>
                <span>중성화 했어요</span>
                <input checked={props.petInfo.isNeutered} onChange={props.onChange} type="checkbox"/>
            </div>
        </div>
        <Selector selectedValue={props.petInfo.weight} optionItems={props.optionItems} name={"weight"}
                  handleSelectChange={props.handleSelectChange}/>
    </>);
}


export { Description, SelectMethod, ImageBreedAge, GenderAndWeight };
