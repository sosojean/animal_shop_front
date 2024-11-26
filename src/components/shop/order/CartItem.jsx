import Product from "../product/Product";
import "../../../assets/styles/shop/order/cartItem.scss"

const cartItem  = (props) => {

    return (
        <div className="cart-item-outer">
            <button>X</button>
            <div className="cart-item-inner">
                <input type="checkbox"/>
                {/* <Product data = {props.data} position="cart"/> */}
                <div className="cart-item-info">
                    <div>
                        <img src={props.data.imgUrl}
                        style={{width: "100px", height: "100px"}}/>
                    </div>
                    <div>
                        <div className="cart-item-name">{props.data.itemNm}</div>
                        <div>옵션: {props.data.option_name} / {props.data.count}개</div>
                        <button>주문수정</button>
                    </div>
                </div>
                <div>{props.data.option_price}원</div>
            </div>
        </div>
    )
}
export default cartItem