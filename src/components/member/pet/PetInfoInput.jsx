
const PetInfoInput = ({setNext,setPrev,children,isFirstPage,isLastPage}) => {

    return (<div className={"pet-info"}>

        <div className={"info-content"}>

        {children}
        {!isFirstPage&&< button onClick={setPrev}>이전</button>}
        {!isLastPage?<button onClick={setNext}>{isFirstPage?"그냥 진행하기":"다음" }</button>:<button>완료</button>}
        </div>

    </div>)
}

export default PetInfoInput
