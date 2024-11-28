import "../../../assets/styles/shop/order/cart.scss"
import CartItem from "../../../components/shop/order/CartItem";
import {useEffect, useState} from "react";
import instance from "../../../utils/axios";

const Cart = (props) => {
    const [dataList, setDataList] = useState([]);
    console.log("DataList", dataList);
    const [selectedItems, setSelectedItems] = useState({}); 
    const [orderItems, setOrderItems] = useState([]);

    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState();

    const [dataUpdate, setDataUpdate] = useState(false); // 페이지 업데이트 상태관리
    const postData = { cartDetailDTOList: dataList }; // 수정, 전체 구매 데이터

    const totalPrice = dataList.reduce((price, data) => 
        (price + (data.count * data.option_price)), 0);

    const selectPrice = Object.keys(selectedItems)
        .filter(key => selectedItems[key])
        .reduce((totalPrice, key) => {
            const id = Number(key);
            const data = dataList.find(data => data.cartItemId === id);
            if (data) {
                totalPrice += data.count * data.option_price;
            }
            return totalPrice;
        }, 0);

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

            console.log("cart", cart);
        })
    }

    // 삭제 후 데이터 새로고침 핸들러
    const refreshCartList = () => {
        handleGetCartList();
    };

    // 장바구니 아이템 선택 주문
    const handleOrderSelectedItem = () => {
        
        // true인 것만 fileter + 숫자로 변환
        const idsToOrder = Object.keys(selectedItems).filter(key => selectedItems[key])
                                                    .map(value => Number(value));

        // idsToOrder 값으로 cartItmId 비교해서 데이터 받아오기
        const dataToOrder = idsToOrder.map(id => dataList.find(data => data.cartItemId === id));

        const postData = {
            cartDetailDTOList: dataToOrder
        };

        try {
            instance({
                url: "/cart/orders",
                method: "post",
                data: postData
            }).then((res) => {
                console.log(res.data);
                alert("상품 주문에 성공했습니다.");
                setDataUpdate(true);
            });
        } catch (error) {
            console.error("주문 에러 발생:", error);
            alert("상품 주문에 실패했습니다.");
        }

    }

    // 장바구니 아이템 전체 주문
    const handleOrderAllItem = () => {
        try {
            instance({
                url: "/cart/orders",
                method: "post",
                data: postData
            }).then((res) => {
                console.log(res.data);
                alert("상품 주문에 성공했습니다.");
                setDataUpdate(true);
            });
        } catch (error) {
            console.error("주문 에러 발생:", error);
            alert("상품 주문에 실패했습니다.");
        }
    }

    // 장바구니 아이템 선택 삭제
    const handleDeleteSelectedItem = () => {
        
        // true인 것만 fileter
        const idsToDelete = Object.keys(selectedItems).filter(
            (key) => selectedItems[key]
        );

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

        alert("선택한 상품이 주문되었습니다.");

    }

    // 장바구니 아이템 전체 삭제
    const handleDeleteAllItem = () => {

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
                alert('상품 삭제에 실패했습니다.');
            }
        })

        alert("전체 삭제 했습니다");
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
          <div className="cart-item-container">
              <div className="cart-delete-button">
                <div>
                    <button onClick={() => handleDeleteAllItem()}>
                            전체삭제
                    </button>
                    <button onClick={() => handleDeleteSelectedItem()}>선택삭제</button>
                </div>
              </div>
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
                  />)
              })}
              <div className="cart-price-container">
                <div>
                    <p>선택 상품 금액 {selectPrice.toLocaleString()}원</p>
                    <p>전체 상품 금액 {totalPrice.toLocaleString()}원</p>
                </div>
                <div>
                    <button onClick={handleOrderSelectedItem}>
                        선택주문
                    </button>
                    <button onClick={handleOrderAllItem}>
                        전체주문
                    </button>
                </div>
              </div>
          </div>
      </>
  )
}

export default Cart;