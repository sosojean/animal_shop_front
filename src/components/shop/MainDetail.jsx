import { useState } from "react";
import '../../assets/styles/shop/mainDetail.scss'

const MainDetail = () => {

    const [option, setOption] = useState([]);
    const [stock, setStock] = useState(1)

    const handleSelectChange = (event) => {
        const value = event.target.value;
        const isExistedValue = option.includes(value)

        if (!isExistedValue){
            if (value !== "default") {
                setOption([...option, value]);
            }
        }
    };

    const handleMinusClick = () => {
        if (stock > 0)
            setStock(s => s-1);
    }

    const handlePlusClick = () => {
        setStock(s => s+1);
    }

    return (
        <div className="detailContainer">
            <div>
                <img src="https://placehold.co/500x400" />
            </div>
            <div className="detailTextContainer">
                <h2>브랜드</h2>
                <h1>고양이 습식캔 (제품명)</h1>
                <select onChange={handleSelectChange}>
                    <option value={"default"}>사료 맛 선택</option>
                    {/* 추후에 데이터 받아 map */}
                    <option value={"닭고기"}>닭고기</option>
                    <option value={"참치"}>참치</option>
                    <option value={"말고기"}>말고기</option>
                </select>
                <div className="optionListContainer">
                {
                    option.map((v, i) => {
                        return(
                            <div key={i} className="optionContainer">
                                <p>{option[i]}</p>
                                <div className="spContainer">
                                    <div className="stockContainer">
                                        <div onClick={handleMinusClick}>-</div>
                                        <p>{stock}</p>
                                        <div onClick={handlePlusClick}>+</div>
                                    </div>
                                    <p>12,800원</p>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
                <div className="purchaseLinkContainer">
                    <p>장바구니</p>
                    <p>바로구매</p>
                </div>
            </div>
        </div>
    )
}

export default MainDetail;