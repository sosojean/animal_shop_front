import React from 'react';
import {Link} from "react-router-dom";

const AdminNoticeItem = ({item}) => {
    return (
        <Link to={`/admin/notice/${item.id}`}>
            <div>
            <span>{item.content}</span>
            <span>{item["created_date"]}</span>
            <span>{item.id}</span>
            <span>{item.name}</span>
            <span>{item.priority}</span>
            <span>{item.title}</span>
            </div>


        </Link>
    );
};

export default AdminNoticeItem;