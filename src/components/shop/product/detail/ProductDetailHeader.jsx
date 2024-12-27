import {useEffect, useState} from "react";
import '../../../../assets/styles/shop/product/mainDetail.scss'
import {useNavigate} from "react-router-dom";
import Option from "../option/Option";
import Thumbnails from "./Thumbnails";
import Selector from "../../../common/Selector";
import instance from "../../../../utils/axios";
import { dogItemCategory } from "../../../../utils/categoryOption";
import {toast} from "react-toastify";
import DefaultButton from "../../../common/DefaultButton";
import CartButton from "./CartButton";


const ProductDetailHeader = ({data}) => {

    console.log("ProductDetailHeader", data);

    const [option, setOption] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [session, setSession] = useState([]);
    const [zoomImage, setZoomImage] = useState(false)
    const [index, setIndex] = useState(0)

    const [selectedValue, setSelectedValue] = useState("placeholder")
    const navigate = useNavigate();
    let position = {x: 0, y: 0};

    const [xy, setXy] = useState({position})


    const defaultPrice = data?.options[0].price;
    const selectedDefault =  data.options[0].discount_rate !== null ? 
        defaultPrice * (1 - (data.options[0].discount_rate/100)) : defaultPrice;

    // const optionLength = data?.options.length;
    console.log("session", session);
    console.log("data", data);

    useEffect(() => {
        handleSelectChange("","0")
    },[])

    useEffect(() => {
        console.log("option",option)
    },[option])


    //선택옵션 추가핸들러
    const handleSelectChange = (_,val) => {
        const index = val;
        const isExistedValue = option.includes(index)

        let sessionItem = {
            cartItemId: data?.options.length === 1 ? data?.id + "default" : 
            data?.id + data?.options[index].name + data?.options[index].optionId,
            itemNm: data?.name,
            count: 1,
            option_name: data?.options[index].name,
            option_price: data?.options[index].price,
            imgUrl: data?.thumbnail_url[0],
            itemId: data?.id
        }

        if (!isExistedValue) {
            if (index !== "default") {
                setOption((prevOption) => [...prevOption, index]);
                // console.log(data);
                setStocks((prevStocks) => [...prevStocks, { itemId: data.id, optionId:data.options[index].optionId,  count: 1, index: index }]);
                setSession((prevSession) => [...prevSession, sessionItem])
            }
        }
    };

    //기존가격에 대한 상대 가격으로 표시
    const priceTrimmer = (optionPrice, optionId)=> {

        const findOption = data.options.filter(option => option.optionId === optionId);
        const discount = findOption[0].discount_rate;
        const disOptionPrice = discount !== null ? optionPrice * (1-discount/100) : optionPrice;

        if (selectedDefault !== disOptionPrice) {
            const trimmedPrice = disOptionPrice - selectedDefault;

            const result = (trimmedPrice < 0) ?
                        `(-${Math.abs(trimmedPrice).toLocaleString()}원)` : 
                        `(+${Math.abs(trimmedPrice).toLocaleString()}원)`;
            return result
        } else {
            return ""
        }
    }

    //수량 변경 핸들러
    const handleStockChange = (index, value) => {
        const newStocks = [...stocks];
        newStocks[index].count += value;
        setStocks(newStocks);

        const newSession = [...session];
        newSession[index].count += value;
        setSession(newSession);
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

        setSession((prevSession) => {
            const newSession = [...prevSession];
            newSession.splice(index, 1); // 삭제
            return newSession;
        });
    }

    //전체 총합 계산
    const priceCalculator = () => {
        let totalPrice = 0;
        const options = data?.options
        const newStock = [...stocks]
        newStock?.map((stock) => {
            console.log(options[stock.index].price , options[stock.index].discount_rate)
            totalPrice+= options[stock.index].price * stock.count-(options[stock.index].price * options[stock.index].discount_rate)/100 * stock.count
        })

        return totalPrice.toLocaleString()
    }

    const dataBuilder = () => {

        console.log(data)
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
            option_items.push(option_item);
        })

        return option_items;
    }

    const purchaseHandler = () => {
        const accessToken = localStorage.getItem('accessToken');
        console.log("token", accessToken);

        if (option.length === 0) {
            // navigate("/login");
            toast.warn("옵션을 하나 이상 선택 해 주세요!");
            return
        }else if (accessToken) {
            const purchaseData = dataBuilder();
            navigate("/order/delivery", {state : {purchaseData : purchaseData , itemId:data.id}});
        }else if (!accessToken) {
            navigate("/login");
            toast.warn("구매는 로그인이 필요합니다.");
        }

    }

    const trimOptionText = (option, priceTrimmer)=>{
        return  `${option.name} ${priceTrimmer(option.price, option.optionId)}`;

    }

    const convertCategory = (name) => {
        const existedIndex = dogItemCategory.findIndex(v => v.main.name === name);
        return dogItemCategory[existedIndex].main.convert;
    }

    return (
    <>
        {data&& (

        <div className="detailContainer">
            <div className="thumbnail-area-container">
            <Thumbnails thumbnails={data["thumbnail_url"]}
                        setIndex={setIndex}
                        setXy={setXy}
                        setZoomImage={setZoomImage}
                        xy={xy}
                        index={index}
            />
            </div>
            <div className="zoom-img-container">
                <div className="inner-img-container" style={{ display: zoomImage ? "block" : "none" }}>
                    {zoomImage&&<img className="zoom-img"
                                     style={{transform: `translate(${-xy.x*4}px, ${-xy.y*4}px)`}}
                                     src={data["thumbnail_url"][index]}/>}

                </div>
            </div>

            <div className="detailTextContainer">

                <div className="detail-category-container">
                    <span>{data.species === "dog" ? "강아지" : "고양이"}</span>
                    <span> > </span>
                    <span>{convertCategory(data.category)}</span>

                </div>

                <div>
                    <h2>{data.seller}</h2>
                    <h1>{data.name}</h1>
                    {data.options[0].discount_rate > 0 && data.options[0].discount_rate !== null ?
                        <div className="discount-price-container">
                            <h1 className="origin-price">{defaultPrice.toLocaleString()} 원</h1>

                            <div className="discount-price">
                                <span className="rate">{data.options[0].discount_rate}%</span>
                                <span
                                    className="appliedprice">{(defaultPrice * (1 - (data.options[0].discount_rate / 100))).toLocaleString()} 원</span>
                            </div>
                        </div> :
                        <div className="origin-price-container">
                          <h1 className="origin-price">{defaultPrice.toLocaleString()} 원</h1>
                        </div>
                    }
                </div>

                <Selector
                    selectedValue={selectedValue}
                    handleSelectChange={handleSelectChange}
                    optionItems={data?.options}
                    priceTrimmer={priceTrimmer}
                    trimOptionText={trimOptionText}
                />


                <div className="optionListContainer">
                    {option.map((itemIndex, index) => {

                        return (<Option key={data.options[itemIndex].id}
                                        item={data.options[itemIndex].name}
                                        index={index}
                                        price={data.options[itemIndex].price}
                                        handleStockChange={handleStockChange}
                                        handleOptionDelete={handleOptionDelete}
                                        data={data.options[itemIndex]}
                        />)
                    })}
                </div>


                <div className="purchaseLinkContainer">
                    {stocks[0] ? <span className="price">총 상품 금액 {priceCalculator()} 원</span>:<span></span>}

                    <div className={"buttons-container row"}>
                        <CartButton data={data} session={session} stocks={stocks}/>
                        <DefaultButton className={"primary long"} onClick={purchaseHandler}>구매하기</DefaultButton>
                    </div>
                </div>
            </div>
        </div>
        )}

    </>
    )
}

export default ProductDetailHeader;