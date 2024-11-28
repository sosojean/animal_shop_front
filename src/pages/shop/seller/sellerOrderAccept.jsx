import instance from "../../../utils/axios";
import {useEffect, useState} from "react";
import SellerItem from "../../../components/shop/seller/itemList/SellerItem";

const SellerOrderAccept = () => {

    const [data, setData] = useState()
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
    },[])



    return (
        <div>
            {data&&data.map(item =>{
                // return (<SellerItem
                //     key={item.id}
                //     item={item}
                //
                //
                // />)
                }

            )}

        </div>
    );
};

export default SellerOrderAccept;