import instance from "../../../utils/axios";

const PetInfoInput = ({setNext,setPrev,children,isFirstPage,isLastPage,isComplete,petInfo}) => {

    const confirmHandler=()=> {

        instance({
            url:"/pet/register",
            method:"post",
            data:{
                ...petInfo

            }
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
            <button disabled={!isComplete} onClick={setNext}>
                {isFirstPage?"그냥 진행하기":"다음" }</button>:
            <button onClick={confirmHandler}>완료</button>}
        </div>

    </div>)
}

export default PetInfoInput
