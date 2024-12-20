import { useState } from "react";
import '../../../assets/styles/shop/order/cartOption.scss'

const CartOption = ({name, price, stock, setStock}) => {

    const handleMinusClick = () => {
        if (stock>1){
            setStock(stock-1)
        }
    }

    const handlePlusClick = () => {
        setStock(stock+1)
    }

    return (
        <div className="cart-option-container">
            <div className="option-name">
                <span>{name}</span>
            </div>

            <div className="stock-price-container">
                 <div className="stock-controller">
                    <button onClick={handleMinusClick}>-</button>
                    <p>{stock}</p>
                    <button onClick={handlePlusClick}>+</button>
                </div>
                <span className="price"> {price * stock + " 원"}</span>
            </div>

        </div>
    )
}

export default CartOption;