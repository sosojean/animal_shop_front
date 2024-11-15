import Product from "../../components/shop/Product";
import "../../assets/styles/shop/cart.scss"
import CartItem from "../../components/shop/CartItem";
import {useEffect, useState} from "react";
import axios from "axios";

const Cart = (props) => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //     axios({
    //         url:"https://jsonplaceholder.typicode.com/users/1/todos",
    //         method:"GET",
    //
    //     }).then((response) => {
    //         setData(response.data)
    //         console.log(data)
    //         setLoading(false)
    //     })
    //         .catch(error => console.log(error));
    //
    // },[loading])

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