import { useEffect, useState } from "react";
import "../../../assets/styles/shop/seller/sellerDiscount.scss"
import instance from "../../../utils/axios"

const SellerDiscount = (props) => {

    const {data, getRefreshData} = props;
    const [discountedItem, setDiscountedItem] = useState([]);
    const [isDataFetched, setIsDataFetched] = useState(false);

    console.log("seller discount - data", data);
    console.log("discountedItem", discountedItem)

    // 수정 데이터 가져오기
    const getDiscountedData = () => {
        const options = [...data.options];
        const discountedOptions = options.filter(option => 
            option.discountRate > 0);
        
        if (discountedOptions.length > 0) {
            setIsDataFetched(true);   
        }
        
        setDiscountedItem((prevItem) => {

            const newDiscountOptions = 
                discountedOptions.map(item =>
                item = {
                    name: item.name,
                    price: item.price,
                    option_discount_rate: item.discountRate,
                    option_id: item.optionId,
                    select: false // 체크박스 관리
                }
            )

            return newDiscountOptions;
        });
    }

    useEffect(() => {
        getDiscountedData();
      }, []);

    // 할인율 추가 핸들러
    const handleAddItem = (name, price, discount, id) => {

        setDiscountedItem((prevItem) => {

            let originItem = [...prevItem]
            
            // id와 비교하여 요소 존재 여부 확인
            let existedId = originItem.findIndex((item) => item.option_id === id); // index 반환

            if (existedId > -1) {

                originItem[existedId].option_discount_rate = discount;
                
                return originItem;

            } else {
                const newItem = {
                    name: name,
                    price: price,
                    option_discount_rate: discount,
                    option_id: id,
                    select: false // 체크박스 관리
                }
                return [...prevItem, newItem];        
            }
        })
    }

    // 체크박스 단일 선택
    const handleCheckItem = (index) => {

        setDiscountedItem((prevItem) => {

            const originItem = [...prevItem];

            originItem[index] = {
                ...originItem[index],
                select: !originItem[index].select // select 값을 토글
            };

            return originItem;
        })

        return discountedItem[index].select
    }

    // 체크박스 전체 선택
    const handleCheckAll = () => {
        setDiscountedItem((prevItem) => {            
            const originItem = [...prevItem];
            const isFalse = originItem.findIndex(item => item.select === false); // index 반환

            if (isFalse > -1) {
                const allTrue = originItem.map((item) => {
                    item = {...item, select: true}
                    return item;
                })
                return allTrue;              
            } else {
                const allFalse = originItem.map((item) => {
                    item = {...item, select: false}
                    return item;
                })
                return allFalse;
            }
        })
    }

    // state 제거 핸들러 (선택)
    const handleRemoveState = () => {

        if (isDataFetched) {
            const trueList = discountedItem.filter(item => item.select === true);
        
            trueList.forEach(item =>
                instance({
                    url: `/seller/discount/revoke`,
                    method: "PATCH",
                    data: item
                }).then((res) => {
                    console.log("할인율 삭제 성공", res);
                    getRefreshData();
                })
                .catch((err) => {
                    console.error("error", err);
                })            
            )

            alert("적용한 할인율을 삭제했습니다");
        }

        setDiscountedItem((prevItem) => {
            const newList = [...prevItem]
            const falseList = newList.filter(item => item.select === false)

            return falseList;
        })
    }

    // 할인율 등록 핸들러 (선택)
    const handleApplyDiscount = () => {
        const trueList = discountedItem.filter(item => item.select === true);
        
        trueList.forEach(item =>
            instance({
                url: `/seller/discount/ok`,
                method: "patch",
                data: item
            }).then((res) => {
                console.log("할인율 등록 성공", res);
                getRefreshData();
            })
            .catch((err) => {
                console.error("error", err);
            })            
        )

        alert("할인율을 적용했습니다");
    }

    return (
        <div className="discount-modal-container">
            <div><h1>할인 적용</h1></div>
            <div className="option-container">
                {data.options.map((option, index) => {
                    return(
                         <div key={index} className="option-item">
                            <span>{option.name} </span>
                            <span> {option.price}원</span>
                            <input type="number" placeholder="할인율(%)"
                                defaultValue={option.discountRate}
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
                <div className="button-container">
                    <div className="select-button">
                        <input type="checkbox" onClick={handleCheckAll}/>
                        <span>전체선택</span>                        
                    </div>
                    <button onClick={() => {
                        handleRemoveState();}}>
                        삭제
                    </button>
                </div>
                <div className="header-container">
                    <span>선택</span>
                    <span>옵션명</span>
                    <span>옵션가격</span>
                    <span>할인율</span>
                    <span>할인가격</span>
                </div>
                {discountedItem.map((item, index) => {

                    return (
                        <div key={item.option_id} className="discount-option">
                            <input type="checkbox" checked={item.select}
                                onClick={() => handleCheckItem(index)}
                            />
                            <span>{item.name} </span>
                            <span>{item.price}원 </span>
                            <span>{item.option_discount_rate}% </span>
                            <span>{item.price * (1-item.option_discount_rate/100)}원 </span>
                        </div>
                    )
                })}
            </div>
            <div>
                <button onClick={() => {
                    handleApplyDiscount();
                }}>등록</button>
            </div>        
        </div>
    )
}

export default SellerDiscount;