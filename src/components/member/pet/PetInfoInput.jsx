import instance from "../../../utils/axios";
import DefaultButton from "../../common/DefaultButton";

const PetInfoInput = (props) => {

    const {setNext,setPrev,children,isFirstPage,isLastPage,isComplete,petInfo,
        catBreedOptions, dogBreedOptions
    } = props;

    const confirmHandler=()=> {

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


            console.log(response);
        }).catch((error) => {
            console.log(error);
        })

    }

    return (<div className={"pet-info"}>

        <div className={"info-content"}>

        {children}
        {!isFirstPage&&< button onClick={setPrev}>이전</button>}
            {console.log(isComplete)}
        {!isLastPage?
            <DefaultButton className="default" disabled={!isComplete} onClick={setNext}>
                {isFirstPage?"그냥 진행하기":"다음" }</DefaultButton>:
            <DefaultButton className="default"  onClick={confirmHandler}>완료</DefaultButton>}
        </div>

    </div>)
}

export default PetInfoInput
