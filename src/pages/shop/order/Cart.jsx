import "../../../assets/styles/shop/order/cart.scss"
import CartItem from "../../../components/shop/order/CartItem";
import Pagination from "../../../components/board/Pagination";
import {useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import instance from "../../../utils/axios";

const Cart = (props) => {
    const [dataList, setDataList] = useState([]);
    const [dataCount, setDataCount] = useState(0);
    const [cartItemIdList, setCartItemIdList] = useState([]);
    const [dataUpdate, setDataUpdate] = useState(false); // 페이지 업데이트 상태관리

    // 페이지 네이션
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const currentPage = parseInt(queryParams.get("page")) || 1; // 현재 페이지 확인


    // Get 통신
    const handleGetCartList = (page) => {

        instance({
            url: `/cart/list?page=${page}`,
            method: "get"
        }).then(res=>{
            setDataList(res.data.cartDetailDTOList);
            setDataCount(res.data.total_count);
            setCartItemIdList(res.data.cartDetailDTOList.map((data) => 
                data.cartItemId));
        }).catch(err=>{
            console.log("handleGetCartList 실패 ", err);
        })
    }

    // 페이지 네이션용 핸들러
    const handlePageChange = (newPage) => {
        navigate(`/cart?page=${newPage}`); // 페이지 변화
    };

    // 삭제 후 데이터 새로고침 핸들러
    const refreshCartList = () => {
        handleGetCartList(currentPage);
    };

    // 장바구니 아이템 삭제
    const handleDeleteItemData = () => {

        cartItemIdList.map((v) => {
            try {
                const response = instance({
                    url: `/cart/delete/${v}`, // cartItemId로 API 호출
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

    

    useEffect(() => {
        // 로컬스토레지에서 받아오는 데이터
        // let cart = localStorage.getItem("cart")
        // cart = JSON.parse(cart)

        // console.log("Cart state test ", dataList);

        handleGetCartList(currentPage);
        setDataUpdate(false);
    },[currentPage, dataUpdate])

    return (
      <>
          <div className="cart-item-container">
              <div>
                <button onClick={() => handleDeleteItemData()}>
                    전체삭제
                </button>
                <button>선택 삭제</button>
              </div>
              {dataList && dataList?.map(data=>{
                  return ( 
                  <CartItem 
                    data = {data} key = {data.cartItemId} 
                    refreshCartList={refreshCartList}
                  />)
              })}
              <div>
                <p>총 결제 금액</p>
              </div>
          </div>

          <Pagination
                currentPage={currentPage}
                totalPost={dataCount}
                handlePageChange={handlePageChange}
          />
      </>
  )
}

export default Cart;