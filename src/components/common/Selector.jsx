const Selector = (props) => {
    const {
        trimOptionText = (option)=>{return option} ,
        selectedValue ,
        optionItems,
        handleSelectChange,
        priceTrimmer
    } = props;
    return (
        <select value={selectedValue} onChange={handleSelectChange}  defaultValue="placeholder">
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