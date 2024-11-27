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
    const [modalData, setModalData] = useState();
    // console.log("modalData", modalData);
    const [dataUpdate, setDataUpdate] = useState(false); // 페이지 업데이트 상태관리

    const postData = {
        cartDetailDTOList: dataList,
    };

    // Get 통신
    const handleGetCartList = () => {

        instance({
            url: `/cart/list`,
            method: "get"
        }).then(res=>{
            setDataList(res.data.cartDetailDTOList);
            setDataCount(res.data.total_count);
        }).catch(err=>{
            console.log("handleGetCartList 실패 ", err);
        })
    }

    // 삭제 후 데이터 새로고침 핸들러
    const refreshCartList = () => {
        handleGetCartList();
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

    // TODO 모달 오픈 핸들러 정리
    // 모달 열기 핸들러
    const handleModalOpen = () => {
        setModalOpen((prev) => !prev); // 이전 상태를 반전
    };

    useEffect(() => {
        // 로컬스토레지에서 받아오는 데이터
        // let cart = localStorage.getItem("cart")
        // cart = JSON.parse(cart)

        // console.log("Cart state test ", dataList);

        handleGetCartList();
        setDataUpdate(false);
    },[dataUpdate])

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
                    postData={postData}
                    modalData={modalData}
                    setModalData={setModalData}
                  />)
              })}
              <div>
                {/* TODO 장바구니 총 결제 금액 계산 */}
                <p>총 결제 금액</p>
              </div>
          </div>

      </>
  )
}

export default Cart;