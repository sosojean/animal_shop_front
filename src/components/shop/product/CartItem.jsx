import Product from "./Product";

const cartItem  = (props) => {

    return (
        <div className="cart-item-outer">
            <button>-</button>
            <div className="cart-item-inner">
                <input type="checkbox"/>
                <Product data = {props.data} position="cart"/>
            </div>
        </div>
    )
}
export default cartItem