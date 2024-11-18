import axios from "axios";
import {useEffect, useState} from "react";
import SellerInfoItem from "./SellerInfoItem";

const SellerManagement = (props) => {
    const [data, setData] = useState()

    useEffect(() => {
        axios({
            url:"https://jsonplaceholder.typicode.com/users",
            method:"get"
        }).then((response) => {
            setData(response.data);
            console.log(response);

        })
    },[])

    const header = {
        username: "이름",
        email: "이메일",
        phone: "전화번호",
        website : "정보"


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