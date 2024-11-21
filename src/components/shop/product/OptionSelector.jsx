const OptionSelector = ({ selectedValue ,optionItem, handleSelectChange, priceTrimmer}) => {




    return (
        <select value={selectedValue} onChange={handleSelectChange}  defaultValue="placeholder">
            <option value='placeholder' disabled hidden>옵션 선택</option>
            {optionItem.map((option, index) => {
                    return (
                        <option key={index} value={index}>
                            {option.name + " " + (priceTrimmer?priceTrimmer(option.price):option.price)}
                        </option>
                    )}
            )}
        </select>
    )

}
export default OptionSelector;