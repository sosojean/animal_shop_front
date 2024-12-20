import "../../assets/styles/common/selector.scss";
const Selector = (props) => {
    const {
        trimOptionText = (option)=>{return option} ,
        selectedValue = "placeholder",
        optionItems  = [],
        handleSelectChange,
        priceTrimmer,
        name,
        className=""
    } = props;

    return (
        <select className={`selector ${className}`} value={selectedValue} onChange={e=>handleSelectChange(name,e.target.value)} >
            <option value='placeholder' disabled hidden>옵션 선택</option>
            {optionItems.map((option, index) => {
                    return (
                        <option key={`${option+index}`}  value={index}>
                            {trimOptionText(option,priceTrimmer)}
                        </option>
                    )}
            )}
        </select>
    )

}
export default Selector;