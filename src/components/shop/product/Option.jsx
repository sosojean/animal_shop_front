import {useState} from "react";



const Option = (props) => {
    const [stock, setStock] = useState(1)

    const handleStock = (value) =>{
          props.handleStockChange(props.index, value)
    }

    const handleMinusClick = () => {
        if (stock>1){
            handleStock(-1);
            setStock(stock-1)
        }
    }

    const handlePlusClick = () => {
        handleStock(1);
        setStock(stock+1)

    }

    const handleDelete = () =>{
        props.handleOptionDelete(props.index)
    }

    return (
        <div key={props.item} className="optionContainer">
            <div className="option-name">
                <span>{props.item}</span>
                <button onClick={handleDelete}>x</button>
            </div>

            <div className="stock-price-container">
                 <div className="stock-controller">
                    <button onClick={handleMinusClick}>-</button>
                    <span>{stock}</span>
                    <button onClick={handlePlusClick}>+</button>
                </div>
                <span className="price"> {(props.price * stock).toLocaleString() + "원"}</span>
            </div>

        </div>
    )
}

export default Option;