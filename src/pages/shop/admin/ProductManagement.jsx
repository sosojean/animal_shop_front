import React from 'react';
import AdminMenu from "../../../components/shop/admin/AdminMenu";
import {Link} from "react-router-dom";
import ItemDelButton from "../../../components/shop/seller/itemList/itemDelButton";
import Chart from "../../../components/common/Chart";

const ProductManagement = () => {

    return (
        <div>
            <AdminMenu/>
            <Chart/>

        </div>
    );
};

export default ProductManagement;