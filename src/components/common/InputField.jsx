import "../../assets/styles/common/inputField.scss"

const InputField = (props) => {
    const {
        name,
        placeholder="",
        title,
        className ="default-input",
        type = "text",
        input,
        value,
        setInput,
        inputClassname=""


    } = props;

    return (<>

        <div className={"input" +" "+ className}>
            {title?<label htmlFor={name}>{title}</label>:""}
            <input className={inputClassname} value={input} onChange={e=>{setInput(name,e.target.value)}}
                   type={type} id={name} placeholder={placeholder}  />
        </div>

    </>)
}
export default InputField