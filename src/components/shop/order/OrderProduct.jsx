import instance from "../../../utils/axios";
import {useState} from "react";
import reviewEditor from "./reviewEditor";
import ReviewEditor from "./reviewEditor";
import {Link} from "react-router-dom";


const OrderProduct = ({item}) => {
    const [reviewWriting, setReviewWriting] = useState(false);
    console.log(item)
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
          <button className="order-list-btn" onClick={()=>{setReviewWriting(!reviewWriting)}}>리뷰 작성</button>   {/*/item-comment-image-upload*/}

        </div>
        {reviewWriting?<ReviewEditor item = {item} setReviewWriting={setReviewWriting}/>:null}
        </>

)
}
export default OrderProduct;