

const FilterMini = (props) => {

    const {data, keyName, selectedItems, setSelectedItems} = props;

    const handleAddItem = (code) => {
        setSelectedItems({
            ...selectedItems,
            [keyName]: code
        })
    }
      
    return (
        <ul>
            {data.map((value, index) => {
                return (
                    <li key={index}
                        onClick={() => handleAddItem(value.code)}
                    >
                        {value.name}
                    </li>
                )
            })}
        </ul>
    )
}

export default FilterMini;