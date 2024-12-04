

const FilterMiniAge = (props) => {
    const {data, keyName, selectedItems, setSelectedItems} = props;

    const handleAddItem = (status, selectedKey = keyName) => {
        setSelectedItems((prevSelectedItems) => {
          const arrayIndex = prevSelectedItems.findIndex(item => selectedKey in item);
      
          if (arrayIndex === -1) {
            return [...prevSelectedItems, { [selectedKey]: [status] }];
          } else {
            const updatedItems = [...prevSelectedItems];
            const selectedList = updatedItems[arrayIndex][selectedKey];
            const listIndex = selectedList.findIndex(item => item === status);
      
            if (listIndex === -1) {
              updatedItems[arrayIndex] = {
                ...updatedItems[arrayIndex],
                [selectedKey]: [...updatedItems[arrayIndex][selectedKey], status]
              };
            } else {
                updatedItems[arrayIndex][selectedKey].splice(listIndex, 1);
            }
      
            return updatedItems;
          }
        });
    };
      
    return (
        <ul>
            {data.map((value, index) => {

                return (
                    <div key={index}>
                        <input type="checkbox"
                            onClick={() => handleAddItem(value.code)}
                        />
                        <li>{value.name}</li>                        
                    </div>
                )
            })}
        </ul>
    )
}

export default FilterMiniAge;