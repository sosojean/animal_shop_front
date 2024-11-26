import "../../../assets/styles/shop/order/cart.scss"
import CartItem from "../../../components/shop/order/CartItem";
import {useEffect, useState} from "react";
import instance from "../../../utils/axios";

const Cart = (props) => {
    const [dataList, setDataList] = useState([])
    const [loading, setLoading] = useState(true)

    // Get 통신 테스트
    const handleGetCartList = () => {

        instance({
            url: "/cart/list",
            method: "get"
        }).then(res=>{
            setDataList(res.data.cartDetailDTOList);
        }).catch(err=>{
            console.log("handleGetCartList 실패 ", err);
        })
    }

    useEffect(() => {
        // 로컬스토레지에서 받아오는 데이터
        // let cart = localStorage.getItem("cart")
        // cart = JSON.parse(cart)

        console.log("Cart state test ", dataList);
    },[dataList])


    return (
      <>
          <div className="cart-item-container">
              <div>
                <button onClick={handleGetCartList}>전체삭제</button>
                <button>선택 삭제</button>
              </div>
              {dataList && dataList?.map(data=>{
                  return ( <CartItem data = {data} key = {data.cartItemId} />)
              })}
          </div>
      </>
  )
}

export default Cart;