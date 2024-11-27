import "../../assets/styles/common/inputField.scss"

const InputField = (props) => {
    const {
        name,
        placeholder="",
        title,
        className ="default-input",
        type = "text"} = props;

    return (<>

        <div className={className}>
            <label htmlFor={name}>{title}</label>
            <input type={type} id={name} placeholder={placeholder} />
        </div>

    </>)
}
export default InputField