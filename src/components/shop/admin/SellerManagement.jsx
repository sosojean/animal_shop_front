import axios from "axios";
import {useEffect, useState} from "react";
import SellerInfoItem from "./SellerInfoItem";
import instance from "../../../utils/axios";

const SellerManagement = (props) => {
    const [data, setData] = useState()

    useEffect(() => {
        instance({
            url:"/admin/request-list?page=1",
            method:"get"
        }).then((response) => {
            setData(response.data.sellerDTOS);
            console.log(response);

        }).catch(error => {
            console.log(error)
        })
    },[])

    const header = {
        username: "이름",
        bln: "사업자 번호",
        phone_number: "전화번호",
        category : "카테고리",
        contents:"신청 상세"
    }


    return (<>
        <SellerInfoItem isHeader = {true} item={header}/>
        {data? data.map((item) =>{
                return(
                    <SellerInfoItem key={item.id} item={item}/>
                )
            }):null
        }
    </>)
}
export default SellerManagement;