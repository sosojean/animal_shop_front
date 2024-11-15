import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";

const Product = (props) => {

    let cart = [];

    const addCart = () => {
        const item = {
            title: props.data.title,
            count: props.data.id };

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

              <img src="https://placehold.co/100" alt=""/>
              <div className="product-info">
                  <span className="brand">{props.data?.id}</span>
                  <span className="title">{props.data?.title}</span>
                  <span className="price">12,800원</span>
                  <div className="option">
                      <span className="option">참치맛</span>
                      <hr className="vertical"/>
                      <span className="count">{props.data?.count}</span>
                  </div>
                  <span className="star"><FontAwesomeIcon icon={faStar}/>4.5</span>
                  <button onClick={addCart} className="cart-button">장바구니</button>
              </div>

          </div>
      )
}
export default Product