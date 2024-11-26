import {useEffect, useState} from "react";
import '../../../../assets/styles/shop/product/mainDetail.scss'
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import Option from "../option/Option";
import Thumbnails from "./Thumbnails";
import OptionSelector from "../option/OptionSelector";
import instance from "../../../../utils/axios";

const ProductDetailHeader = ({data}) => {

    const [option, setOption] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [selectedValue, setSelectedValue] = useState("placeholder")
    const defaultPrice = data?.options[0].price;

    // 장바구니 담기
    const addCart = () => {
        const itemList = stocks; // 추가하려는 상품 리스트
    
        // localStorage에서 cart 데이터를 가져오기
        let storageCart = localStorage.getItem("cart");
        storageCart = storageCart ? JSON.parse(storageCart) : []; // JSON 파싱 또는 빈 배열로 초기화
    
        // itemList를 순회하여 storageCart에 추가 또는 업데이트
        itemList.forEach((item) => {
            const existingItemIndex = storageCart.findIndex(
                (cartItem) =>
                    cartItem.itemId === item.itemId && cartItem.optionId === item.optionId
            );
    
            if (existingItemIndex !== -1) {
                // 동일한 itemId와 optionId가 있을 경우 count 업데이트
                storageCart[existingItemIndex].count += item.count;
            } else {
                // 새로운 항목일 경우 추가
                storageCart.push(item);
            }
        });
    
        // 업데이트된 storageCart를 다시 localStorage에 저장
        localStorage.setItem("cart", JSON.stringify(storageCart));
        alert("장바구니에 담았습니다!");
    };

    // post 통신
    const handlePostCart = () => {
        const data = stocks;

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

    //선택옵션 추가핸들러
    const handleSelectChange = (event) => {
        const index = event.target.value;
        const isExistedValue = option.includes(index)
        // console.log(stocks)

        if (!isExistedValue) {
            if (index !== "default") {
                setOption((prevOption) => [...prevOption, index]);
                // console.log(data);
                setStocks((prevStocks) => [...prevStocks, { itemId: data.id, optionId:data.options[index].optionId,  count: 1, index: index }]);
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
            totalPrice+= options[stock.index].price*stock.count
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
                    <button onClick={() => {
                        addCart();
                        handlePostCart();
                    }}>
                        장바구니
                    </button>
                    <button onClick={purchaseHandler}>구매하기</button>
                </div>
            </div>
        </div>
        )}

    </>
    )
}

export default ProductDetailHeader;