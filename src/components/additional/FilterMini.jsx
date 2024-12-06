

const FilterMini = (props) => {

    const {data, keyName, selectedItems, setSelectedItems, getRefreshData } = props;

    // console.log("FilterMini", keyName);

    // const handleAddItem = (status, selectedKey = keyName) => {
    //     setSelectedItems((prevSelectedItems) => {

    //         const keyIndex = prevSelectedItems.findIndex(item => 
    //             selectedKey in item); // 없으면 -1

    //           if (keyIndex > -1) {
    //             let updatedItems = [...prevSelectedItems];
    //             updatedItems[keyIndex] = { [selectedKey]: status };

    //             return updatedItems;          
    //           } else {
    //             return {...prevSelectedItems, [selectedKey]: status };
    //           }
    //     })
    // }

    const handleAddItem = (status, selectedKey = keyName) => {
        setSelectedItems((prevSelectedItems) => {

          return {
            ...prevSelectedItems,
            [selectedKey]: status
          };
        });
    };
      
    return (
        <ul>
            {data.map((value, index) => {
                return (
                    <li key={index}
                        onClick={() => {
                            handleAddItem(value.code);
                            getRefreshData();
                        }}
                    >
                        {value.name}
                    </li>
                )
            })}
        </ul>
    )
}

export default FilterMini;