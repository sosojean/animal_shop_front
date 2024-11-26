import "../../../assets/styles/shop/order/cart.scss"
import CartItem from "../../../components/shop/order/CartItem";
import Pagination from "../../../components/board/Pagination";
import Modal from "../../../components/common/Modal";
import CartModal from "../../../components/shop/order/CartModal";
import {Children, useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import instance from "../../../utils/axios";

const Cart = (props) => {
    const [dataList, setDataList] = useState([]);
    const [dataCount, setDataCount] = useState(0);
    const [selectedItems, setSelectedItems] = useState({}); 
    const [modalOpen, setModalOpen] = useState(false);
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

        alert("선택한 상품이 삭제되었습니다.");

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
                <button onClick={() => handleDeleteAllItem()}>
                    전체삭제
                </button>
                <button onClick={() => handleDeleteSelectedItem()}>선택 삭제</button>
              </div>
              {dataList && dataList?.map((data, index)=>{
                  return ( 
                  <CartItem 
                    data = {data} key = {index} 
                    refreshCartList={refreshCartList}
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    handleModalOpen={handleModalOpen}
                  />)
              })}
              <div>
                {/* TODO 장바구니 총 결제 금액 계산 */}
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