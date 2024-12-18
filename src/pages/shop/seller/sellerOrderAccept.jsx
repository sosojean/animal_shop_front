import instance from "../../../utils/axios";
import {useEffect, useState} from "react";
import SellerItem from "../../../components/shop/seller/itemList/SellerItem";
import SellerAcceptItem from "../../../components/shop/seller/sellerAcceptItem";
import SellerMenu from "../../../components/shop/seller/SellerMenu";
import Pagination from "../../../components/board/Pagination";

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
            <div className="orders">
            {data&&data.map(item =>{
                return (
                    <SellerAcceptItem key={item.orderId} isEdited={isEdited} setIsEdited={setIsEdited} item={item}/>
                )}
            )}
            </div>
            {data&&totalCount&&totalCount>0&&<Pagination  page={page} totalPost={totalCount} handlePageChange={setPage} currentPage={page}/>}
        </div>
    );
};

export default SellerOrderAccept;