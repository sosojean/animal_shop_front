import "../../assets/styles/shop/productReview.scss"

const ProductReview = () => {

    return (
        <div className="productReviewContainer">
            <div className="reviewerInfoContainer">
                <img className="reviewerImage" src="https://placehold.co/70x70" />
                <div className="reviewerInfoDetail">
                    <div className="reviewerStars">
                        <div>
                            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                        </div>
                        <p>5</p>
                    </div>
                    <div className="reviewerName">
                        <p>다섯살 초코 (닉네임)</p>
                        <p>2024. 02. 12</p>
                    </div>
                </div>
            </div>
            <div className="productReview">
                <p>체험단 상품<br/>진짜 생닭가슴살 모양 그대로~~<br/>우리 애기도 넘 좋아하고~~ 사람도 먹어도되나 싶을정도로<br/>상품이 좋아보였습니다👍👍👍</p>
            </div>
        </div>
    )
}

export default ProductReview;