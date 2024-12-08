import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

const SellerItemOption = ({options, setOptions, newOption, setNewOption, 
    defaultPrice, setDefaultPrice}) => {

    // 옵션 추가
    const handleAddOption = () => {
        if (newOption.name && newOption.price) {
            setOptions([...options, 
                { name: newOption.name, price: parseInt(newOption.price)}]);
            // 입력 필드 초기화
            setNewOption({ name: '', price: ''});
        } else {
            alert('옵션 이름과 가격을 모두 입력해주세요.');
        }
    }

    // 옵션 삭제
    const handleDeleteOption = (id) => {
        setOptions(options.filter((v, i) => i !== id));
    }

    return (
        <>
            <div className="reg-price-container">
                <h3>가격</h3>
                <input type="number" placeholder="가격" 
                    value={defaultPrice}
                    onChange={(e) => { 
                        setDefaultPrice(e.target.value);
                        const defaultOption = options.find(option => option.name === 'default');
                        if (defaultOption) {
                            defaultOption.price = e.target.value; 
                        }
                    }} 
                />
            </div>
            <div className='RegOptContainer'>
                <h3>옵션</h3>
                <div>
                    <div className='OptInputContainer'>
                        <div>
                            <input
                                type="text"
                                placeholder="옵션 이름"
                                value={newOption.name}
                                onChange={(e) => { setNewOption({ ...newOption, name: e.target.value }) }}
                            />
                            <input
                                type="number"
                                placeholder="옵션 가격"
                                value={newOption.price}
                                onChange={(e) => { setNewOption({ ...newOption, price: e.target.value }) }}
                            />
                        </div>
                        <button onClick={handleAddOption}>옵션 추가</button>
                    </div>
                    <ul>
                        {options?.map((option, index) => (
                            index !== 0 && (
                                <li key={index} className='OptList'>
                                    <div><b>{option.name}</b></div>
                                    <div>{option.price.toLocaleString()} 원</div>
                                    <FontAwesomeIcon 
                                        icon={faCircleXmark} 
                                        className='circleXmark' 
                                        onClick={() => { handleDeleteOption(index) }} 
                                    />
                                </li>
                            )    
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default SellerItemOption;