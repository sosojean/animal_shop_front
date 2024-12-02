import instance from "../../../utils/axios";
import {useEffect, useState} from "react";
import SellerItem from "../../../components/shop/seller/itemList/SellerItem";
import SellerAcceptItem from "../../../components/shop/seller/sellerAcceptItem";

const SellerOrderAccept = () => {
    const [data, setData] = useState()
    const [isEdited, setIsEdited] = useState(false)
    useEffect(() => {
        instance({
            url:`/seller/delivery/list`,
            method:"get"
        }).then((response) => {
            console.log(response)
            console.log(response.data.deliveryDTOList)
            setData(response.data.deliveryDTOList)
        }).catch((error) => {
            console.log(error);
        })
    },[isEdited])

    return (
        <div>
            {data&&data.map(item =>{
                return (
                    <SellerAcceptItem key={item.orderId} isEdited={isEdited} setIsEdited={setIsEdited} item={item}/>
                )}
            )}
        </div>
    );
};

export default SellerOrderAccept;