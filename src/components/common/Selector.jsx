const Selector = (props) => {
    const {
        trimOptionText = (option)=>{return option} ,
        selectedValue = "placeholder",
        optionItems  = [],
        handleSelectChange,
        priceTrimmer,
        name,
    } = props;

    return (
        <select value={selectedValue} onChange={e=>handleSelectChange(name,e.target.value)} >
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