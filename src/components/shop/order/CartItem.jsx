import Product from "../product/Product";
import "../../../assets/styles/shop/order/cartItem.scss";
import instance from "../../../utils/axios";
import Modal from "../../common/Modal";
import CartModal from "./CartModal";

const cartItem = (props) => {

  // 장바구니 아이템 삭제
  const handleDeleteItemData = async () => {
    try {
      const response = await instance({
        url: `/cart/delete/${props.data.cartItemId}`, // cartItemId로 API 호출
        method: "delete",
      });

      // 삭제 성공 시
      alert("상품이 삭제되었습니다.", response.data);

      // 삭제 후 부모 상태 새로고침
      props.refreshCartList();
    } catch (error) {
      // 삭제 실패 시
      console.error("삭제 에러 발생:", error);
      alert("상품 삭제에 실패했습니다.");
    }
  };

  // Post 통신
  const handlePostCartList = () => {

    // console.log("postData", postData);
    console.log("props.cartItemId", props.data.cartItemId);

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
  };

  // 선택 아이템 아이디: boolean 형태로 리스트에 넣음
  const handleSelectCartItem = () => {
    props.setSelectedItems((prev) => ({
      ...prev,
      [props.data.cartItemId]: !prev[props.data.cartItemId],
    }));

    // // props.setOrderIndex((prev) => ([...prev, props.key]));
    // // props.data state에 담기
    // props.setOrderItems((prev) => ([...prev, props.data]))
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
              <button>주문하기</button>
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
