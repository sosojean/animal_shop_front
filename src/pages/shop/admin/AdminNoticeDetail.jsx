import React from 'react';
import AdminMenu from "../../../components/shop/admin/AdminMenu";
import AdminNoticeDetailContent from "../../../components/shop/admin/notice/AdminNoticeDetailContent";
import SellerMenu from "../../../components/shop/seller/SellerMenu";

const AdminNoticeDetail = ({isSeller}) => {
    return (
        <div>
            {isSeller ? <SellerMenu/>: <AdminMenu/>}
            <AdminNoticeDetailContent isSeller={isSeller}/>

        </div>
    );
};

export default AdminNoticeDetail;