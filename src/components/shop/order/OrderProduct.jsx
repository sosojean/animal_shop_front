import instance from "../../../utils/axios";
import {useState} from "react";
import reviewEditor from "./reviewEditor";
import ReviewEditor from "./reviewEditor";


const OrderProduct = ({item}) => {
    const [reviewWriting, setReviewWriting] = useState(false);
    const [imgUrls, setImgUrls] = useState([]);

    // console.log(item.key)



    return(<>
        <div className={"order-item"}>

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
          <button className="order-list-btn" onClick={()=>{setReviewWriting(!reviewWriting)}}>리뷰 작성</button>   {/*/item-comment-image-upload*/}

        </div>
    {reviewWriting?<ReviewEditor item = {item}/>:null}
        </>

)
}
export default OrderProduct;