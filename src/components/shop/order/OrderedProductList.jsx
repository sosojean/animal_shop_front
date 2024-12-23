import Product from "../product/Product";
import Products from "../product/Products";
import instance from "../../../utils/axios";
import React, {useEffect, useState} from "react";
import Order from "./Order";
import "../../../assets/styles/shop/order/order.scss"
import OrderListMenu from "./OrderListMenu";
import Card from "../../common/Card";
import Title from "../../common/Title";

const OrderedProductList = () => {
    const [data, setData] = useState()
    // const url = `/shop/orders`;

    const [url, setUrl] = useState(`/shop/orders`)
    const [page, setPage] = useState(1)
    const [totalCount, setTotalCount] = useState(0)



    useEffect(() => {
        instance({
            url:url,
            method:'GET',
            params:{page:1},
        }).then(res=>{
            console.log("res", res)
            setData(res.data.orderHistDTOList)
            setTotalCount(res.data.total_count)

        }).catch(err=>{
            console.log(err)
        })
    }, [url]);


    const loadMoreData = () => {
        instance({
            url: url,
            method:'GET',
            params:{page:page+1},

        }).then(res => {
            setData((prev)=>
                [...prev, ...res.data.orderHistDTOList]
            )
            console.log(data)
            setPage((prev)=>(prev+1))
            // setIsEdited(!isEdited)
        }).catch((error) => {
            console.log(error)
        })
    }


    return(<>
            <Title>주문 내역</Title>
               <div className={"orders"}>

                <OrderListMenu url={url} setUrl={setUrl}/>

                {data&&data.length < 1 &&<Card className="default-card no-contents" ><span>주문 내역이 없습니다.</span></Card>}
                {data && data.map(item=>{
                    return(<Order key={item["orderId"]} item = {item} />)
                })}
                {totalCount>10 && (totalCount/10)>page && <button onClick={loadMoreData}>더보기</button>}

                </div>
        </>
    )


}
export default OrderedProductList