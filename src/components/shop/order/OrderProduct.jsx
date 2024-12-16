import instance from "../../../utils/axios";
import {useState} from "react";
import reviewEditor from "./reviewEditor";
import ReviewEditor from "./reviewEditor";
import {Link} from "react-router-dom";
import "../../../assets/styles/shop/order/orderItem.scss"


const OrderProduct = ({item, position, applyCheck, subCheck}) => {
    const [reviewWriting, setReviewWriting] = useState(false);
    console.log(item)

    const checkHandler = (e) => {
        const itemId  = position === "confirm"? item.itemId:item.orderItemId

        console.log(e)
        if (e.target.checked) {
            console.log(item)
            console.log("checked",itemId)
            applyCheck(itemId)


        }else if (!e.target.checked){
            console.log("unchecked",itemId)
            subCheck(itemId)
        }

    }
    return(<>
            <div className={"order-item"}>

                <Link to={`/shop/detail/${item.itemId}`}>
                    <div className={"product-info"}>
                        <img src={item.imgUrl} className="order-image"/>
                        <div className="product-info-text">

                            {item.delivery_revoke ? <span>배송 취소</span> : ""}
                            {item.delivery_approval ? <span>배송중</span> : ""}
                            {item.delivery_completed ? <span>배송완료</span> : ""}
                            {item.order_completed && !item.delivery_revoke ? <span>주문완료</span> : ""}

                            <span> 품목 {item.itemNm}</span>
                            <span> 옵션 {item.orderName}</span>

                            <span> 가격 {item.orderPrice}</span>
                            <span> 수량 {item.count}</span>

                            {/*<span>{item.orderPrice.toLocaleString() + "원"}</span>*/}

                        </div>
                        <span>총계 {(item.orderPrice * item.count).toLocaleString() + "원"}</span>

                    </div>
                </Link>

                {position == "order" ?
                    <button onClick={() => {
                        setReviewWriting(!reviewWriting)
                    }}
                            className="order-list-btn">리뷰 작성</button> :
                    <input onChange={(e) => {
                        checkHandler(e)
                    }} type={"checkbox"}></input>
                }

            </div>
            {reviewWriting ? <ReviewEditor item={item} setReviewWriting={setReviewWriting}/>:null}
        </>

)
}
export default OrderProduct;