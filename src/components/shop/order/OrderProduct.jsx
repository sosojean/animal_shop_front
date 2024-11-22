

const OrderProduct = ({item}) => {


    return(<div className={"order-item"}>

        <img src={item.imgUrl} className="order-image"/>
        <div className="product-info">
            <span>{item.count}</span>
            <span>{item.itemNm}</span>
            <span>{item.orderName}</span>

            {/*<span>{item.orderPrice.toLocaleString() + "원"}</span>*/}

            <span>{(item.orderPrice * item.count).toLocaleString() + "원"}</span>
        </div>


    </div>)
}
export default OrderProduct;