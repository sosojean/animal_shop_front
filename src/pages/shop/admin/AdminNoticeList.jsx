import React, {useEffect, useState} from 'react';
import AdminNoticeItem from "../../../components/shop/admin/notice/AdminNoticeItem";
import SellerMenu from "../../../components/shop/seller/SellerMenu";
import AdminMenu from "../../../components/shop/admin/AdminMenu";
import {Link} from "react-router-dom";
import instance from "../../../utils/axios";

const AdminNoticeList = () => {

    const [data, setData] = useState()

    useEffect(() => {
        instance({
            url:"/notices/select",
            method:"GET",

        }).then((response) => {
            console.log(response);
            setData(response.data.noticesDTOList);
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    return (
        <div>
            <AdminMenu/>
            <Link to="/admin/notice/write">
                <span> 작성 </span>
            </Link>




            <div className="notice-list">

                {data&&data.map(item=>{
                    return <AdminNoticeItem item={item}/>

                })}

            </div>


        </div>
    );
};

export default AdminNoticeList;