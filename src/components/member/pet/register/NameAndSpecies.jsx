import InputField from "../../../common/InputField";

const NameAndSpecies = (props) => {

    return (<>
        <div className={"two-buttons"}>
            <button onClick={props.onClickDog} className={props.petInfo.species == "DOG" && "selected"}>강아지</button>
            <button onClick={props.onClickCat} className={props.petInfo.species == "CAT" && "selected"}>고양이</button>
        </div>
        <InputField name={"name"}
                    title={"이름을 입력해주세요."}
                    placeholder={"이름"}
                    value={props.petInfo.name}
                    input={props.petInfo.name}
                    setInput={props.input}
        />
    </>);
}
export default NameAndSpecies;