import "../../../assets/styles/shop/order/cart.scss"
import CartItem from "../../../components/shop/order/CartItem";
import {useEffect, useState} from "react";
import Card from "../../../components/common/Card";
import { Link, useNavigate } from "react-router-dom";
import instance from "../../../utils/axios";
import { toast } from "react-toastify";
import DefaultButton from "../../../components/common/DefaultButton";
import Title from "../../../components/common/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faEquals } from "@fortawesome/free-solid-svg-icons";

const Cart = (props) => {
    const [dataList, setDataList] = useState([]);
    const [isSession, setIsSession] = useState(false);
    const [selectedItems, setSelectedItems] = useState({});
    console.log("selectedItems", selectedItems); 
    const [orderItems, setOrderItems] = useState([]);

    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState();

    const [dataUpdate, setDataUpdate] = useState(false); // 페이지 업데이트 상태관리
    const postData = { cartDetailDTOList: dataList }; // 수정, 전체 구매 데이터
    const accessToken = localStorage.getItem("accessToken"); // 없으면 null
    const navigate = useNavigate();

    const totalPrice = dataList ? dataList.reduce((price, data) => 
        (price + (data.count * data.option_price)), 0) : 0;

    const selectPrice = selectedItems ? 
        Object.keys(selectedItems)
        .filter(key => selectedItems[key])
        .reduce((totalPrice, key) => {
            // const id = Number(key);
            const data = dataList.find(data => String(data.cartItemId) === key);
            if (data) {
                totalPrice += data.count * data.option_price;
            }
            return totalPrice;
        }, 0) : 0;
    
    const discountPrice = selectedItems ? 
        Object.keys(selectedItems)
        .filter(key => selectedItems[key])
        .reduce((totalPrice, key) => {
            // const id = Number(key);
            const data = dataList.find(data => String(data.cartItemId) === key);
            if (data) {
                totalPrice += Math.round(data.option_price * data.count * (1-data.discount_rate/100))
            }
            return totalPrice;
        }, 0) : 0;    

    // Get 통신
    const handleGetCartList = () => {

        instance({
            url: `/cart/list`,
            method: "get"
        }).then(res=>{
            setDataList(res.data.cartDetailDTOList);
        }).catch(err=>{
            console.log("handleGetCartList 실패 ", err);

            let cart = localStorage.getItem("cart")
            cart = JSON.parse(cart)
            setDataList(cart);
            setIsSession(true);
        })
    }

    // 삭제 후 데이터 새로고침 핸들러
    const refreshCartList = () => {
        handleGetCartList();
    };

    // 장바구니 전체 주문
    const purchaseAllHandler = () => {

        // discount_rate가 0이면 곱하면 안됨 예외처리 필요
        const modifitedData = dataList.map(v => {
            return {
              ...v,
              option_price: v.discount_rate !== 0 
                ? Math.round(v.option_price * (1-v.discount_rate/100))
                : v.option_price
            }
          });

        const purchaseData = {
            cartDetailDTOList: modifitedData
        };
        const isCart = true;
        navigate("/order/delivery", {
            state: {
              cart: { type: 'cart', items: purchaseData },
              isCart: { type: 'isCart', items: isCart }
            }
          });
    }

    // 장바구니 선택 주문
    const purchaseSelectedHandler = () => {
        // true인 것만 fileter + 숫자로 변환
        const idsToOrder = Object.keys(selectedItems).filter(key => selectedItems[key])
                                                    .map(value => Number(value));
        console.log("idsToOrder", idsToOrder);

        // idsToOrder 값으로 cartItmId 비교해서 데이터 받아오기
        const dataToOrder = idsToOrder.map(id => dataList.find(data => data.cartItemId === id));
        console.log("dataToOrder", dataToOrder);

        // discount_rate가 0이면 곱하면 안됨 예외처리 필요
        const modifitedData = dataToOrder.map(v => {
            return {
              ...v,
              option_price: v.discount_rate !== 0 
                ? Math.round(v.option_price * (1-v.discount_rate/100))
                : v.option_price
            }
          });
        console.log("dataToOrder", modifitedData);

        const postData = {
            cartDetailDTOList: modifitedData
        };

        const purchaseData = postData;
        const isCart = true;

        console.log("purchaseData", purchaseData);
        navigate("/order/delivery", {
            state: {
              cart: { type: 'cart', items: purchaseData },
              isCart: { type: 'isCart', items: isCart }
            }
          });
    }

    // 장바구니 아이템 선택 삭제
    const handleDeleteSelectedItem = () => {
        
        // true인 것만 fileter
        const idsToDelete = Object.keys(selectedItems).filter(
            (key) => selectedItems[key]
        );

        if (isSession) {
          // 삭제
          let storageCart = localStorage.getItem("cart");
          storageCart = JSON.parse(storageCart);

          idsToDelete.forEach((id) => {
            storageCart = storageCart.filter((item) => item.cartItemId !== id);
          })
  
          localStorage.setItem("cart", JSON.stringify(storageCart));
          setDataUpdate(true);
        } else {
            idsToDelete.forEach((id) => {
                try {
                    instance({
                        url: `/cart/delete/${id}`,
                        method: "delete",
                    }).then(() => {
                        setDataUpdate(true);
                        selectedItems[id] = false; 
                        // 삭제한 상품 id는 false로 만들어 filter 되도록 함
                    });
                } catch (error) {
                    console.error("삭제 에러 발생:", error);
                    alert("상품 삭제에 실패했습니다.");
                }
            });
        }

        toast.success("선택한 상품이 삭제되었습니다.");

    }

    // 장바구니 아이템 전체 삭제
    const handleDeleteAllItem = () => {

        if(!isSession){
            dataList.map((data) => {
                try {
                    const response = instance({
                        url: `/cart/delete/${data.cartItemId}`, // cartItemId로 API 호출
                        method: "delete",
                    });
    
                    setDataUpdate(true); // 페이지 업데이트
                
                } catch (error) {
                    // 삭제 실패 시
                    console.error('삭제 에러 발생:', error);
                    // alert('상품 삭제에 실패했습니다.');
                }
            })

            toast.success("전체 삭제 했습니다");
        } else{
            let storageCart = [];
            localStorage.setItem("cart", JSON.stringify(storageCart));

            setDataUpdate(true);

            toast.success("전체 삭제 했습니다");
        }
    };

    // 모달 열기 핸들러
    const handleModalOpen = () => {
        setModalOpen((prev) => !prev); // 이전 상태를 반전
    };

    useEffect(() => {
        // 로컬스토레지에서 받아오는 데이터
        handleGetCartList();
        setDataUpdate(false);
    },[dataUpdate])

    return (
      <>
          <Card className="cart-item-container">
              <Title>장바구니</Title>
              <div className="cart-delete-button">
                    <DefaultButton onClick={() => {
                        if(totalPrice) {handleDeleteSelectedItem();}
                        else {toast.error("장바구니에 상품을 담아주세요")}
                    }}>
                        선택삭제
                    </DefaultButton>
                    <DefaultButton onClick={() => {
                        if (totalPrice) {handleDeleteAllItem()} 
                        else {toast.error("장바구니에 상품을 담아주세요")}}
                    }>
                            전체삭제
                    </DefaultButton>
              </div>
              <Card className="default-card cart-item-outer-container">
                {dataList && dataList?.map((data, index)=>{
                    return (
                        <CartItem 
                            data = {data} key = {index}
                            orderItems = {orderItems} setOrderItems = {setOrderItems}
                            refreshCartList={refreshCartList}
                            selectedItems={selectedItems} setSelectedItems={setSelectedItems}
                            modalOpen={modalOpen} setModalOpen={setModalOpen} handleModalOpen={handleModalOpen}
                            postData={postData}
                            modalData={modalData} setModalData={setModalData}
                            isSession = {isSession} setDataUpdate={setDataUpdate}
                        />)
                })}                
              </Card>
              <Card className="default-card cart-price-container">
                <div className="cart-price-box">
                    <p><b>선택 금액</b> {selectPrice.toLocaleString()}원</p>
                    <p><FontAwesomeIcon icon={faMinus} /></p>
                    <p className="discount"><b>할인</b> {(selectPrice-discountPrice).toLocaleString()}원</p>
                    <p><FontAwesomeIcon icon={faEquals} /></p>
                    <div className="total-price-box">
                        <p className="total"><b>결제 금액</b> {discountPrice.toLocaleString()}원</p>    
                    </div>
                </div>
                <div className="order-btn-container">
                    {accessToken !== null ?
                        <>
                            <DefaultButton onClick={purchaseSelectedHandler}>
                                선택주문
                            </DefaultButton>
                            <DefaultButton onClick={purchaseAllHandler}>
                                전체주문
                            </DefaultButton>
                        </> : <p>주문은 로그인이 필요합니다</p>
                    }
                </div>
              </Card>
          </Card>
      </>
  )
}

export default Cart;