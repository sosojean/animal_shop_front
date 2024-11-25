import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const Product = (props) => {

    console.log("product 데이터 테스트: ", props.data); // 

    let cart = [];

    // const handlePostCart = async () => {

    //     const data = {
    //         "itemId" : props.data.id
    //         "count" : 3, // 이건 생각해 봐야함
    //         "optionId" : 37 
    //     }

    //     console.log(data)

    //     try {
    //         const response = await instance({
    //             url: "/cart/add",
    //             method: "post",
    //             data: data
    //         });

    //         // 성공적으로 데이터가 저장된 경우
    //         console.log('등록 성공:', response.data);

    //     } catch (error) {
    //         // 에러가 발생한 경우
    //         console.log('에러 발생:', error);
    //     }
    // }


    const addCart = () => {
        const item = {
            title: props.data?.name,
            count: 1 };

        const test = {
            itemId : 18,
            count : 3,
            opitonId : 37
        }

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

        <Link to={`http://localhost:3000/shop/detail/${props.data?.id}`}>
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
                  <Link to={`http://localhost:3000/shop/detail/${props.data?.id}`}>
                     <button>옵션선택</button>
                  </Link>
              </div>

          </div>
        </Link>
      )
}
export default Product