import {useState} from "react";



const Option = (props) => {
    const [stock, setStock] = useState(1)

    console.log(props)

    const handleStock = (value) =>{
        console.log(value)
        // setStock(value)
        props.handleStockChange(props.index,value)
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

    return (
      <div key={props.item} className="optionContainer">
          <p>{props.item}</p>
          <div className="spContainer">
              <div className="stockContainer">
                  <div onClick={handleMinusClick}>-</div>
                  <p>{stock}</p>
                  <div onClick={handlePlusClick}>+</div>
              </div>
              <p>{props.price*stock}</p>
          </div>
      </div>
  )
}

export default Option;