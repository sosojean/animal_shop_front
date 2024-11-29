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
        console.log(e)
        if (e.target.checked) {
            console.log("checked",item.orderItemId)
            applyCheck(item.orderItemId)


        }else if (!e.target.checked){
            console.log("unchecked",item.orderItemId)
            subCheck(item.orderItemId)
        }

    }
    return(<>
        <div className={"order-item"}>

            <Link to = {`/shop/detail/${item.itemId}`}>
            <div className={"product-info"} >
                <img src={item.imgUrl} className="order-image"/>
                <div className="product-info-text">
                    <span>{item.count}</span>
                    <span>{item.itemNm}</span>
                    <span>{item.orderName}</span>

                    {/*<span>{item.orderPrice.toLocaleString() + "원"}</span>*/}

                    <span>{(item.orderPrice * item.count).toLocaleString() + "원"}</span>
                </div>
            </div>
            </Link>
            {position=="order"?
                <button onClick={() => {setReviewWriting(!reviewWriting)}}
                        className="order-list-btn">리뷰 작성</button>:
                <input onChange={(e)=>{ checkHandler(e)}} type={"checkbox"}></input>
            }

        </div>
        {reviewWriting?<ReviewEditor item = {item} setReviewWriting={setReviewWriting}/>:null}
        </>

)
}
export default OrderProduct;