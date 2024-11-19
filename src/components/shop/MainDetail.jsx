import {useEffect, useState} from "react";
import '../../assets/styles/shop/mainDetail.scss'
import {useParams} from "react-router-dom";
import axios from "axios";
import Option from "./Option";

const MainDetail = () => {

    const [option, setOption] = useState([]);
    const [data, setData] = useState()
    const [defaultPrice, setDefaultPrice] = useState()
    const {itemId} =  useParams();
    const [stocks, setStocks] = useState([])

    useEffect(() => {
        axios({
            url:`http://localhost:8080/item/detail/${itemId}`,
            method: "get",

        }).then(
            res => {
                setData(res.data);
                setDefaultPrice(res.data.options[0].price);
            }
        )
    },[])


    const handleSelectChange = (event) => {
        const index = event.target.value;
        console.log(index);
        const isExistedValue = option.includes(index)

        if (!isExistedValue){
            if (index !== "default") {
                console.log( event.target)
                setOption([...option, index]);
                setStocks([...stocks, {index :index, count:1}])
            }
        }
    };


    const priceTrimmer = (optionPrice)=> {
        if (defaultPrice !== optionPrice) {
            const trimmedPrice = optionPrice-defaultPrice;
            const result =
                (trimmedPrice < 0) ?
                    `(-${trimmedPrice}원)` : `(+${trimmedPrice}원)`;
            return result;
        }
        else{
            return ""
        }
    }

    const handleStockChange = (index, value) => {
        const newStocks = [...stocks];
        newStocks[index].count += value;
        setStocks(newStocks);
    }

    const priceCalculator = () => {
        let totalPrice = 0;
        const options = data?.options
        const newStock = [...stocks]
        newStock?.map((stock) => {
            console.log(stock);

            totalPrice+= options[stock.index].price*stock.count
        })

        return totalPrice
    }


    return (

    <>
        <button onClick={()=>{
            console.log(stocks)
        }}></button>
        {data&& (
        <div className="detailContainer">
        <div>
            <img src={"https://placehold.co/500"}/>
        </div>
            <div className="detailTextContainer">
                <h2>{data.seller}</h2>
                <h1>{data.name}</h1>
                <h1>{data.options[0].price} 원</h1>

                <select onChange={handleSelectChange}>
                    <option value='placeholder' disabled hidden selected>옵션 선택</option>

                    {data?.options.map((option,index) => {
                        return (
                            <option key={index}
                                    value={index}>
                                {option.name + " " + priceTrimmer(option.price)}
                            </option>
                        )
                        }
                    )}

                </select>
                <div className="optionListContainer">
                    {option.map((itemIndex, index) => {
                        
                        return (<Option item={data.options[itemIndex].name}
                                        index={index}
                                        price={data.options[itemIndex].price}
                                        handleStockChange={handleStockChange}
                        />)
                    })}
                </div>

                {stocks[0] && <span className="price">총 상품 금액 {priceCalculator()} 원</span>}
                <div className="purchaseLinkContainer">
                    <p>장바구니</p>
                    <p>바로구매</p>
                </div>
            </div>
        </div>
        )}

    </>
    )
}

export default MainDetail;