import Product from "../product/Product";
import "../../../assets/styles/shop/order/cartItem.scss"
import instance from "../../../utils/axios";

const cartItem  = (props) => {

    // 장바구니 아이템 삭제
    const handleDeleteItemData = async () => {

        try {
            const response = await instance({
                url: `/cart/delete/${props.data.cartItemId}`, // cartItemId로 API 호출
                method: "delete",
            });

            // 삭제 성공 시
            alert('상품이 삭제되었습니다.', response.data);

            // 삭제 후 부모 상태 새로고침
            props.refreshCartList();
        
        } catch (error) {
            // 삭제 실패 시
            console.error('삭제 에러 발생:', error);
            alert('상품 삭제에 실패했습니다.');
        }
    };

    // 장바구니 아이템 리스트 추가
    // const handleSelectCartItem = () => {

    //     if (props.select) {
    //         props.setCartItemIdList((prevList) => 
    //             [...prevList, props.data.cartItemId]); 
    //         console.log("선택");
    //     } else {
    //         props.cartItemIdList?.filter((id) => (
    //             id !== props.data.cartItemId))
    //         console.log("선택 해제");
    //     }

    //     // 상태 변경
    //     props.setSelect((prevSelect) => !prevSelect);

    // }

    const handleSelectCartItem = () => {
        props.setSelectedItems((prev) => ({
            ...prev,
            [props.data.cartItemId]: !prev[props.data.cartItemId],
        }));
    };

    return (
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
                        <img src={props.data.imgUrl}
                        style={{width: "100px", height: "100px"}}/>
                    </div>
                    <div>
                        <div className="cart-item-name">{props.data.itemNm}</div>
                        <div>
                            옵션: {props.data.option_name} / {props.data.count}개 / {props.data.option_price}원
                        </div>
                        <button>주문수정</button>
                    </div>
                </div>
                <div>{props.data.option_price * props.data.count}원</div>
            </div>
        </div>
    )
}
export default cartItem;