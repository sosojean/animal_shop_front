import Product from "../product/Product";
import "../../../assets/styles/shop/order/cartItem.scss";
import instance from "../../../utils/axios";
import Modal from "../../common/Modal";
import CartModal from "./CartModal";

const cartItem = (props) => {

  console.log("cartItem", props.data);

  // 장바구니 아이템 삭제
  const handleDeleteItemData = () => {
    
      try {
        if (!props.isSession) {
          const response = instance({
            url: `/cart/delete/${props.data.cartItemId}`, // cartItemId로 API 호출
            method: "delete",
          });
        } else {
          let storageCart = localStorage.getItem("cart");
          storageCart = JSON.parse(storageCart);
  
          storageCart = storageCart.filter((item) => item.cartItemId !== props.data.cartItemId);
          localStorage.setItem("cart", JSON.stringify(storageCart));
        }

        alert("상품이 삭제되었습니다.");

        // 삭제 후 부모 상태 새로고침
        props.refreshCartList();

      } catch (error) {
        // 삭제 실패 시
        console.error("삭제 에러 발생:", error);
        alert("상품 삭제에 실패했습니다.");
      }

  };

  // 장바구니 수정
  const handlePostCartList = () => {

    // console.log("postData", postData);
    console.log("props.cartItemId", props.data.cartItemId);

    // 서버 수정
    instance({
      url: `/cart/detail/${props.data.cartItemId}`,
      method: "post",
      data: props.postData,
    })
      .then((res) => {
        console.log("handlePostCartList 성공 ", res.data);
        props.setModalData(res.data);
      })
      .catch((err) => {
        console.log("handlePostCartList 실패 ", err);
      });

      // 세션 수정
      // filter를 통해 모달 데이터 받아오기

      // 모달 데이터 기본형태
      let sessionData = {
        cartItemImg: props.data.imgUrl,
        cartItemName: props.data.itemNm,
        options: [
          {
            name: props.data.option_name,
            price: props.data.option_price,
            count: props.data.option_count
          }
        ]
      }
  };

  // 세션 수정 모달 데이터 불러오기
  const getSessonModalData = () => {
    let sessionData = props.postData["cartDetailDTOList"].filter((data) => (
        data.itemId === props.data.itemId
    ))

    console.log("getSessonModalData", sessionData);

    // sessionData.map((data) => {
    //   data = {
    //     cartItemImg:
    //   }
    // })
  }

  // 선택 아이템 아이디: boolean 형태로 리스트에 넣음
  const handleSelectCartItem = () => {
    props.setSelectedItems((prev) => ({
      ...prev,
      [props.data.cartItemId]: !prev[props.data.cartItemId],
    }));
  };

  return (
    <>
      <div className="cart-item-outer">

        <button onClick={handleDeleteItemData}>X</button>

        <div className="cart-item-inner">

          <input
            type="checkbox"
            checked={!!props.selectedItems[props.data.cartItemId]} // 선택 여부 반영
            onChange={handleSelectCartItem} // 클릭 시 선택 상태 토글
          />

          {/* <Product data = {props.data} position="cart"/> */}

          <div className="cart-item-info">
            <div>
              <img
                src={props.data.imgUrl}
                style={{ width: "100px", height: "100px" }}
              />
            </div>

            <div>
              <div className="cart-item-name">{props.data.itemNm}</div>
              <div>
                옵션: {props.data.option_name} / {props.data.count}개 /{" "}
                {props.data.option_price}원
              </div>
              <button onClick={() => {
                props.handleModalOpen();
                handlePostCartList();}}>
                주문수정
              </button>
            </div>

            <div>
              <p>{props.data.option_price * props.data.count}원</p>
              <button onClick={getSessonModalData}>주문하기</button>
            </div>

          </div>
        </div>

        <Modal modalOpen={props.modalOpen} setModalOpen={props.setModalOpen}>
          <CartModal
            modalData = {props.modalData}
            refreshCartList = {props.refreshCartList}
          />
        </Modal>

      </div>
    </>
  );
};
export default cartItem;
