import React, {useEffect, useState} from 'react';
import AdminNoticeItem from "../../../components/shop/admin/notice/AdminNoticeItem";
import AdminMenu from "../../../components/shop/admin/AdminMenu";
import {Link} from "react-router-dom";
import instance from "../../../utils/axios";
import "../../../assets/styles/board/board.scss"
import SellerMenu from "../../../components/shop/seller/SellerMenu";

const AdminNoticeList = ({isSeller}) => {

    const [data, setData] = useState()

    useEffect(() => {
        instance({
            url:"/notices/select?page=1",
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
            {isSeller?<SellerMenu/>:<AdminMenu/>}
            <div className="notice-list">

                {data&&data.map(item=>{
                    return <AdminNoticeItem item={item} isSeller={isSeller}/>
                })}
            </div>

            {!isSeller&&
                <Link to="/admin/notice/write">
                    <span> 공지 작성 </span>
                </Link>
            }




        </div>
    );
};

export default AdminNoticeList;