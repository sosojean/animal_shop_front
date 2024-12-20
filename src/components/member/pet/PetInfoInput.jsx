import instance from "../../../utils/axios";
import DefaultButton from "../../common/DefaultButton";
import {useState} from "react";
import Confetti from "./register/confetti";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const PetInfoInput = (props) => {
    const navigate = useNavigate()

    const {setNext,setPrev,children,isFirstPage,isLastPage,isComplete,petInfo,
        catBreedOptions, dogBreedOptions
    } = props;

    const confirmHandler=()=> { //등록완료

        const postData = {...petInfo};
        const breedIndex = postData.breed
        
        switch (petInfo.species) {
                case "CAT":
                    postData.breed = catBreedOptions[parseInt(breedIndex)]
                    break
                case "DOG":
                    postData.breed = dogBreedOptions[parseInt(breedIndex)]
                    break
        }

        instance({
            url:"/pet/register",
            method:"post",
            data: postData
        }).then((response) => {
            Object.entries(petInfo).forEach(([key,value]) => {
                sessionStorage.setItem(key,value);
            });
            toast.success("반려동물을 등록했어요!")
            props.setPetRegisterSuccess(true);
            navigate("/pet/info")

            setTimeout(() => {
                props.setPetRegisterSuccess(false);
            }, 3000); // 3초 후

            console.log(response);
        }).catch((error) => {
            console.log(error);
        })

    }

    return (
        <>
        <div className={"pet-info"}>

            <div className={"info-content"}>

            {children}
            {!isFirstPage&& <DefaultButton className="prev default " onClick={setPrev}>이전</DefaultButton>}
                {console.log(isComplete)}
            {!isLastPage?
                <DefaultButton className="primary" disabled={!isComplete} onClick={setNext}>
                    {isFirstPage?"그냥 진행하기":"다음" }</DefaultButton>:
                <DefaultButton className="primary"  onClick={confirmHandler}>완료</DefaultButton>}
            </div>

        </div>
        </>)
}

export default PetInfoInput
