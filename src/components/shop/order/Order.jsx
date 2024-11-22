import OrderProduct from "./OrderProduct";
import instance from "../../../utils/axios";


const Order = ({item}) => {

    // console.log(item["orderItemDTOList"]);


    const orderCancelHandler = () => {

        instance({
            url: `/shop/order/cancel/${item.orderId}`,
            method: "Patch",

        }).then(({data}) => {
            console.log(data);
        }).catch((error) => {
            console.log(error)
        })
    }

    return(<div className={"order"}>
        <span>{item.orderId}</span>
        <span>{item.orderDate}</span>
        <span>{item.orderStatus}</span>



        {item && item["orderItemDTOList"].map(
            orderItem => {
                console.log("orderItem", orderItem);
                return (<>

                    <OrderProduct item={orderItem}/>
                </>);
            }
        )}
        <button onClick={orderCancelHandler}>주문 취소</button>


    </div>)
}
export default Order;