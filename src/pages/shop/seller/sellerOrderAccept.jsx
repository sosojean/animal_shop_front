import instance from "../../../utils/axios";
import React, {useEffect, useState} from "react";
import SellerItem from "../../../components/shop/seller/itemList/SellerItem";
import SellerAcceptItem from "../../../components/shop/seller/sellerAcceptItem";
import SellerMenu from "../../../components/shop/seller/SellerMenu";
import Pagination from "../../../components/board/Pagination";
import Title from "../../../components/common/Title";

const SellerOrderAccept = () => {
    const [data, setData] = useState()
    const [page, setPage] = useState(1)
    const [totalCount, setTotalCount] = useState(0)

    const [isEdited, setIsEdited] = useState(false)
    useEffect(() => {
        instance({
            url:`/seller/delivery/list`,
            method:"get",
            params:{page}
        }).then((response) => {
            console.log(response)
            console.log(response.data.deliveryDTOList)
            setData(response.data.deliveryDTOList)
            setTotalCount(response.data.total_count)
        }).catch((error) => {
            console.log(error);
        })
    },[isEdited,page])

    return (
        <div className="seller-orders">
            <SellerMenu/>
            <Title>주문/배송</Title>
            <div className="orders">
            {data&&data.map(item =>{
                return (
                    <SellerAcceptItem key={item.orderId} isEdited={isEdited} setIsEdited={setIsEdited} item={item}/>
                )}
            )}
            </div>
            {totalCount>0&&
                <Pagination  page={page} totalPost={totalCount}
                             handlePageChange={setPage} currentPage={page}/>}
            {totalCount <= 0 ?
                <div className={"no-contents"}>
                    <span>주문된 상품이 없습니다.</span>
                </div>
            :""}
        </div>
    );
};

export default SellerOrderAccept;