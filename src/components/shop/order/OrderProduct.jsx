

const OrderProduct = ({item}) => {


    const createReview = () => {

        console.log(item)


        // instance({
        //     // url: `/item_comment/create/{itemId}` // todo : itemId 가 없어서 리뷰 작성 불가능, 사용자가 해당 주문에서 해당 상품의 리뷰를 작성했는지 여부 체크해서 리턴 해줘야 됌
        //
        //



        //{ --> res
        //     "data": {
        //         "orderHistDTOList": [
        //             {
        //                 "orderId": 1,
        //                 "orderDate": "2024-11-24 11:44",
        //                 "orderStatus": "ORDER",
        //                 "orderItemDTOList": [
        //                     {
        //                         "itemNm": "Cute Dog Toy 2",
        //                         "count": 1,
        //                         "orderPrice": 7000,
        //                         "orderName": "Medium",
        //                         "imgUrl": "https://placehold.co/400/8A2BE2/FFC0CB"
        //                     }
        //                 ]
        //             }
        //         ],
        //         "total_count": 1
        // })

    }

    return(<div className={"order-item"}>

        <img src={item.imgUrl} className="order-image"/>
        <div className="product-info">
            <span>{item.count}</span>
            <span>{item.itemNm}</span>
            <span>{item.orderName}</span>

            {/*<span>{item.orderPrice.toLocaleString() + "원"}</span>*/}

            <span>{(item.orderPrice * item.count).toLocaleString() + "원"}</span>
        </div>
        <button onClick={createReview}>리뷰 작성</button>


    </div>)
}
export default OrderProduct;