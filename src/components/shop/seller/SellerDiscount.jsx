import { useState } from "react";
import "../../../assets/styles/shop/seller/sellerDiscount.scss"

const SellerDiscount = (props) => {

    const {data} = props;
    const [discountedItem, setDiscountedItem] = useState([]);

    console.log("discountedItem", discountedItem)

    const handleAddItem = (name, price, discount, id) => {

        setDiscountedItem((prevItem) => {

            let originItem = [...prevItem]
            
            // id와 비교하여 요소 존재 여부 확인
            // let existedId = originItem.findIndex((item, index) => {
            //     item.id === id
            // }) // index


            const newItem = {
                name: name,
                price: price,
                option_discount_rate: discount,
                option_id: id,
                select: false // 체크박스 관리
            }
            // return [...prevItem, newItem]
        })
    }

    return (
        <div className="discount-modal-container">
            <div className="option-container">
                {data.options.map((option, index) => {
                    return(
                         <div key={index} className="option-item">
                            <span>{option.name} </span>
                            <span> {option.price}원</span>
                            <input type="number" placeholder="할인율(%)"
                                onChange={(e) => 
                                    handleAddItem(option.name, option.price, 
                                        e.target.value, option.optionId)
                                }
                            />
                         </div>   
                    )     
                })}
            </div>
            <div className="discount-option-container">
                <div>test: {discountedItem[12]?.option_discount_rate}</div>
                <div>name {data.options[0].name}</div>
                <div>price</div>
                <div>discount rate</div>
                <div>적용된 가격</div>
            </div>
            <div>
                <button>등록</button>
                <button>전체초기화</button>
            </div>        
        </div>
    )
}

export default SellerDiscount;