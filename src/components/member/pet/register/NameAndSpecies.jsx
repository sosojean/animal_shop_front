import InputField from "../../../common/InputField";
import DefaultButton from "../../../common/DefaultButton";
import catIconBig from "../../../../assets/img/catIconBig.svg";
import dogIconBig from "../../../../assets/img/dogIconBig.svg";
import "../../../../assets/styles/member/nameAndSpecies.scss"
import Title from "../../../common/Title";


const NameAndSpecies = (props) => {
    const isDog = props.petInfo.species === "DOG"

    return (<>
        <Title>반려동물의 종과 이름을 입력해주세요!</Title>

        <div className={"two-buttons select-species"}>
            <DefaultButton onClick={props.onClickDog} className={isDog ? "selected primary" :"default" }>
                <img src={dogIconBig} alt="" style={isDog?{width:"120px"}:{width:"60px"}}/>
                <span>강아지</span>

            </DefaultButton>
            <DefaultButton onClick={props.onClickCat} className={!isDog ? "selected primary" :"default"}>
                <img src={catIconBig} alt="" style={isDog?{width:"60px"}:{width:"120px"}}/>
                <span>고양이</span>
            </DefaultButton>
        </div>
        <InputField name={"name"}
                    title={" "}
                    placeholder={"이름을 입력해주세요"}
                    value={props.petInfo.name}
                    input={props.petInfo.name}
                    setInput={props.input}
        />
    </>);
}
export default NameAndSpecies;