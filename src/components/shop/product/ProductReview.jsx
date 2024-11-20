import "../../../assets/styles/shop/product/productReview.scss"
import instance from "../../../utils/axios";

const ProductReview = ({item}) => {

    //
    //
    // console.log(item)
    //
    // function deleteHandler() {
    //     instance({
    //         url:`http://localhost:8080/item_comment/delete/${item.id}`,
    //         method:'delete',
    //     })
    // }

    return (
        <div className="productReviewContainer">
            <div className="reviewerInfoContainer">
                <img className="reviewerImage" src="https://placehold.co/70x70" />
                <div className="reviewerInfoDetail">
                    <div className="reviewerStars">
                        <div>
                            {/*todo 별 숫자 -> 갯수로 바꾸기*/}
                            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                        </div>
                        <p>5</p>
                    </div>
                    <div className="reviewerName">
                        <p>{item?.nickname}</p>
                        <p>{item?.createdDate}</p>
                    </div>
                </div>
            </div>
            <div className="productReview">
                {item.contents}
            </div>
            <button onClick={deleteHandler}> x </button>
        </div>
    )
}

export default ProductReview;