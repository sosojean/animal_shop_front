import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus, faX} from "@fortawesome/free-solid-svg-icons";



const Option = (props) => {
    const {data} = props;
    console.log("option data", data);

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

                {data.discount_rate > 0 ?
                    <div className="price-container">
                        <span
                            className="price"> {((props.price * (1 - data.discount_rate / 100)) * stock).toLocaleString() + "원"}</span>
                        <span className="discount-rate">{data.discount_rate + "%"}</span>
                        <span className="origin-price"> {(props.price * stock).toLocaleString() + "원"}</span>
                    </div> :
                    <span className="price"> {(props.price * stock).toLocaleString() + "원"}</span>
                }
            </div>

            <div className="stock-price-container">

                <div className="stock-controller">
                    <button onClick={handleMinusClick}>
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span>{stock}</span>
                    <button onClick={handlePlusClick}>
                        <FontAwesomeIcon icon={faPlus} />

                    </button>
                </div>
                <button className={"delete-option"} onClick={handleDelete}>
                    <FontAwesomeIcon icon={faX} />
                </button>

            </div>

        </div>
    )
}

export default Option;