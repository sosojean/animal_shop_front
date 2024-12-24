import classNames from "classnames";

const FilterMini = (props) => {

    const {data, keyName, selectedItems, setSelectedItems, getRefreshData, 
        className
    } = props;

    const handleAddItem = (status, selectedKey = keyName) => {
        setSelectedItems((prevSelectedItems) => {

          return {
            ...prevSelectedItems,
            [selectedKey]: status
          };
        });
    };

    const addClassName = () => {
        
    }
      
    return (
        <ul className={className}>
            {data.map((value, index) => {
                const isActive = selectedItems[keyName] === value.code;

                return (
                    <div key={index}
                        className={classNames('mini-item', { 'active': isActive })}>
                        <li
                            onClick={() => {
                                handleAddItem(value.code);
                                getRefreshData();
                            }}
                        >
                            {value.name}
                        </li>                        
                    </div>

                )
            })}
        </ul>
    )
}

export default FilterMini;