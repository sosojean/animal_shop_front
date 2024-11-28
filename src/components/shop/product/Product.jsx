import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import instance from "../../../utils/axios";

const Product = (props) => {

    console.log("props.data", props.data);

    let cart = [];
    const optionCount = props.data?.option_count;
    let storageCart = localStorage.getItem("cart");

    const handlePostCart = async (item) => {

        try {
            const response = await instance({
                url: "/cart/add",
                method: "post",
                data: item
            });

            // 성공적으로 데이터가 저장된 경우
            console.log('장바구니 데이터 등록 성공:', response.data);

        } catch (error) {
            // 에러가 발생한 경우
            console.log('장바구니 데이터 에러 발생:', error);
        }
    }

    const addCart = () => {
        // 서버 통신용 데이터
        const item = {
            itemId: props.data?.id,
            count: 1,
        };

        let storageCart = localStorage.getItem("cart");

        // 세션 저장용 데이터
        const sessionItem = {
            cartItemId: props.data?.id + "default",
            itemNm: props.data?.name,
            count: 1,
            option_name: "default",
            option_price: props.data?.price,
            imgUrl: props.data?.thumbnail_url,
            itemId: props.data?.id
        }

        if (storageCart){
            let isExist = false;

            storageCart = JSON.parse(storageCart);
            storageCart.every(cartItem=>{
                     if (cartItem.cartItemId === sessionItem.cartItemId) {
                        cartItem.count = cartItem.count+1;
                         isExist = true;
                        return false;

                    }else {
                        return true;
                    }
                }
            )
            if (!isExist){
                // console.log(isExist);
                // console.log("isNotExist!");
                storageCart.push(sessionItem);
            }

            localStorage.setItem("cart", JSON.stringify(storageCart));

        }else {
            cart.push(sessionItem);
            localStorage.setItem("cart", JSON.stringify(cart));
        }

        handlePostCart(item);
        alert("장바구니에 담았습니다!");
    }

    return(

          <div className={props.position}>
              <Link to={`http://localhost:3000/shop/detail/${props.data?.id}`}>

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
              </div>
              </Link>
              {props.position==="product" && (
                  <div>
                      {optionCount > 1 ?
                          <Link to={`http://localhost:3000/shop/detail/${props.data?.id}`}>
                              <button className="cart-button">옵션선택</button>
                          </Link> :
                          ( <button
                              onClick={addCart}
                              className="cart-button">
                              장바구니
                          </button> )}
                  </div>
              )}

          </div>
      )
}

export default Product;