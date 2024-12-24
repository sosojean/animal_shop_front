import classNames from "classnames";

const FilterMiniAge = (props) => {
    const {data, keyName, selectedItems, setSelectedItems, getRefreshData} = props;

    const handleAddItem = (status, selectedKey = keyName) => {
      setSelectedItems((prevSelectedItems) => {
        // 해당 키가 이미 존재하는지 확인
        if (selectedKey in prevSelectedItems) {
          const currentList = prevSelectedItems[selectedKey];
          const statusIndex = currentList.indexOf(status);
          
          if (statusIndex === -1) {
            // status가 리스트에 없으면 추가
            return {
              ...prevSelectedItems,
              [selectedKey]: [...currentList, status]
            };
          } else {
            // status가 리스트에 있으면 제거
            return {
              ...prevSelectedItems,
              [selectedKey]: currentList.filter((_, index) => index !== statusIndex)
            };
          }
        } else {
          // 키가 존재하지 않으면 새 리스트로 추가
          return {
            ...prevSelectedItems,
            [selectedKey]: [status]
          };
        }
      });
    };
      
    return (
        <ul className="filter-mini-age">
            {data.map((value, index) => {
                const isActive = selectedItems[keyName]?.includes(value.code);

                return (
                    <div key={index} className={classNames('mini-item', { 'active': isActive })}>
                        <li onClick={() => {
                              getRefreshData();
                              handleAddItem(value.code);}}>
                                {value.name}
                        </li>                        
                    </div>
                )
            })}
        </ul>
    )
}

export default FilterMiniAge;