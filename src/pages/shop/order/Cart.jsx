import Product from "../../../components/shop/product/Product";
import "../../../assets/styles/shop/order/cart.scss"
import CartItem from "../../../components/shop/order/CartItem";
import {useEffect, useState} from "react";
import axios from "axios";

const Cart = (props) => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)



    useEffect(() => {
        let cart = localStorage.getItem("cart")
        cart = JSON.parse(cart)
        setData(cart)
    },[])


    return (
      <>
          <div className="cart-item-container">
              <button>전체삭제</button>
              {data&&data?.map(data=>{
                  return ( <CartItem data = {data} />)
              })}
          </div>
      </>
  )
}

export default Cart;