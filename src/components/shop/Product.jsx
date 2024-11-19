import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";

const Product = (props) => {

    let cart = [];

    const addCart = () => {
        const item = {
            title: props.data?.name,
            count: 1 };

        let storageCart = localStorage.getItem("cart");

        if (storageCart){
            let isExist = false;

            storageCart = JSON.parse(storageCart);
            storageCart.every(cartItem=>{
                     if (cartItem.title === item.title) {
                        cartItem.count = cartItem.count+1;
                         isExist = true;
                        return false;

                    }else {
                        return true;
                    }
                }
            )
            if (!isExist){
                console.log(isExist);
                console.log("isNotExist!");
                storageCart.push(item);
            }

            localStorage.setItem("cart", JSON.stringify(storageCart));

        }else {
            cart.push(item);
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }

    return(
          <div className={props.position}>

              <img src={props?.data["thumbnail_url"]} alt=""/>
              <div className="product-info">
                  <span className="brand">{props.data?.nickname}</span>
                  <span className="title">{props.data?.name}</span>
                  <span className="price">{props.data?.price}원</span>
                  <div className="option">
                      <span className="option">참치맛</span>
                      <hr className="vertical"/>
                      <span className="count">{props.data?.count}</span>
                  </div>
                  <span className="star"><FontAwesomeIcon icon={faStar}/>{props.data?.rating}</span>
                  {props.position==="product"?
                      <button onClick={addCart} className="cart-button">장바구니</button>:null}
              </div>

          </div>
      )
}
export default Product