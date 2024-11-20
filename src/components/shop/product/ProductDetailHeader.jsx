import {useEffect, useState} from "react";
import '../../../assets/styles/shop/product/mainDetail.scss'
import {useParams} from "react-router-dom";
import axios from "axios";
import Option from "./Option";
import Thumbnails from "./Thumbnails";

const ProductDetailHeader = ({data}) => {

    const [option, setOption] = useState([]);
    const [stocks, setStocks] = useState([])
    const defaultPrice = data?.options[0].price;


    //선택옵션 추가핸들러
    const handleSelectChange = (event) => {
        const index = event.target.value;
        const isExistedValue = option.includes(index)

        if (!isExistedValue){
            if (index !== "default") {
                setOption([...option, index]);
                setStocks([...stocks, {index :index, count:1}])
            }
        }
    };

    //기존가격에 대한 상대 가격으로 표시
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

    //수량 변경 핸들러
    const handleStockChange = (index, value) => {
        const newStocks = [...stocks];
        newStocks[index].count += value;
        setStocks(newStocks);
    }


    //선택옵션 삭제핸들러
    const handleOptionDelete = (index) => {
        const newOption = [...option];
        newOption.splice(index, 1);
        setOption(newOption);

        const newStocks = [...stocks];
        newStocks.splice(index, 1);
        setStocks(newStocks);

        console.log(stocks);
    }

    //전체 총합 계산
    const priceCalculator = () => {
        let totalPrice = 0;
        const options = data?.options
        const newStock = [...stocks]
        newStock?.map((stock) => {
            totalPrice+= options[stock.index].price*stock.count
        })

        return totalPrice.toLocaleString()
    }


    return (
    <>
        {data&& (
        <div className="detailContainer">
            <div className="thumbnail-area-container">
            <Thumbnails thumbnails={data["thumbnail_url"]}/>
            </div>
            <div className="detailTextContainer">
                <div className="detail-category-container">
                    <span>{data.species}</span>
                    <span> > </span>
                    <span>{data.category}</span>

                </div>

                <h2>{data.seller}</h2>
                <h1>{data.name}</h1>
                <h1>{defaultPrice.toLocaleString()} 원</h1>

                <select onChange={handleSelectChange} defaultValue="placeholder">
                    <option value='placeholder' disabled hidden>옵션 선택</option>
                    {data?.options.map((option, index) => {
                            return (
                                <option key={index}
                                        value={index}>
                                    {option.name + " " + priceTrimmer(option.price)}
                                </option>
                            )}
                    )}

                </select>

                <div className="optionListContainer">
                    {option.map((itemIndex, index) => {

                        return (<Option key={data.options[itemIndex].name}
                                        item={data.options[itemIndex].name}
                                        index={index}
                                        price={data.options[itemIndex].price}
                                        handleStockChange={handleStockChange}
                                        handleOptionDelete={handleOptionDelete}
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

export default ProductDetailHeader;