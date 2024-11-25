import {useEffect, useState} from "react";
import '../../../assets/styles/shop/product/mainDetail.scss'
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import Option from "./Option";
import Thumbnails from "./Thumbnails";
import OptionSelector from "./OptionSelector";
import instance from "../../../utils/axios";

const ProductDetailHeader = ({data}) => {

    const [option, setOption] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [selectedValue, setSelectedValue] = useState("placeholder")
    const defaultPrice = data?.options[0].price;


    //선택옵션 추가핸들러
    const handleSelectChange = (event) => {
        const index = event.target.value;
        const isExistedValue = option.includes(index)

        if (!isExistedValue) {
            if (index !== "default") {
                setOption((prevOption) => [...prevOption, index]);
                // console.log(data);
                // itemId가 들어오도록 변경
                setStocks((prevStocks) => [...prevStocks, { itemId: data.id, optionId:data.options[index].optionId,  count: 1 }]);
            }
        }
    };

    //기존가격에 대한 상대 가격으로 표시
    const priceTrimmer = (optionPrice)=> {
        if (defaultPrice !== optionPrice) {
            const trimmedPrice = optionPrice-defaultPrice ;
            const result =
                (trimmedPrice < 0) ?
                    `(-${Math.abs(trimmedPrice).toLocaleString()}원)` : `(+${Math.abs(trimmedPrice).toLocaleString()}원)`;
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
        setOption((prevOption) => {
            const newOption = [...prevOption];
            newOption.splice(index, 1); // 삭제
            return newOption;
        });

        setStocks((prevStocks) => {
            const newStocks = [...prevStocks];
            newStocks.splice(index, 1); // 삭제
            return newStocks;
        });
    }

    //전체 총합 계산
    const priceCalculator = () => {
        let totalPrice = 0;
        const options = data?.options
        const newStock = [...stocks]
        newStock?.map((stock) => {
            totalPrice+= options[stock.itemId].price*stock.count
        })

        return totalPrice.toLocaleString()
    }

    const dataBuilder = () => {
        const options = data.options;

        let option_items = [];
        let option_item =  {count: "",option_name:"",option_price:""}
        let purchase;

        stocks.map((stock) => {

            let option_item = {
                count: stock.count,
                option_name: options[stock.index].name,
                option_price: options[stock.index].price
            };
            // console.log("option_item",option_item)
            option_items.push(option_item);
             // purchase = {itemId : data.id, ...option_item};
            purchase = {itemId : data.id, option_items : option_items};

        })

        // let purchase = {itemId : data.id, option_items : option_items}; // 실 데이터


        // console.log(purchase)
        return purchase;
    }

    const purchaseHandler = () => {
        const purchaseData = dataBuilder();

        instance({
            url:`/shop/order`,
            method:'post',
            data:purchaseData
        }).then(res=>{
            // console.log(purchaseData)
            // console.log(res)
        }).catch(err=>{
            console.log(err)
        })

    }

    const handlePostCart = () => {
        const data = stocks;
        // console.log("data", data);

        data.map((v, i) => {
            instance({
                url: "/cart/add",
                method: "post",
                data: v
            }).then(res=>{
                // console.log("성공했습니다 ",i)
            }).catch(err=>{
                console.log(err)
            })
        })

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

                <OptionSelector
                    selectedValue={selectedValue}
                    handleSelectChange={handleSelectChange}
                    optionItem={data?.options}
                    priceTrimmer={priceTrimmer}
                />


                <div className="optionListContainer">
                    {option.map((itemIndex, index) => {

                        return (<Option key={data.options[itemIndex].id}
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
                    <button onClick={handlePostCart}>장바구니</button>
                    <button onClick={purchaseHandler}>구매하기</button>
                </div>
            </div>
        </div>
        )}

    </>
    )
}

export default ProductDetailHeader;