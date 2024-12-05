import React, {useEffect, useState} from 'react';
import AdminMenu from "../../../components/shop/admin/AdminMenu";

import AdminProduct from "../../../components/shop/admin/AdminProduct";
import Pagination from "../../../components/board/Pagination";
import instance from "../../../utils/axios";
import ProductSearchHeader from "../../../components/shop/admin/ProductSearchHeader";

const PendingProductManagement = () => {
    const [data, setData] = useState()
    const [page, setPage] = useState(1)
    const [isEdited, setIsEdited] = useState(false)
    const [totalPost, setTotalPost] = useState(0)


    useEffect(() => {
        instance({
            url:`/admin/stop_list`,
            method: "get",
        }).then(res=>{
            console.log(res.data)
            console.log(res.data["goods"][0])

            setData(res.data["goods"]);
            setTotalPost(res.data["total_count"])

        })
    },[page])

    return (
        <div>

            <AdminMenu/>
            <span>중단 상품 관리</span>
            <ProductSearchHeader/>
            <div className="admin-product">

                <div className="product">

                    <span> 이미지 </span>
                    <div className="product-info">
                        <span className="title">상품명</span>
                        <span className="brand">판매자</span>
                        <span className="price">가격</span>

                    </div>
                    <span>판매중단</span>
                </div>
            </div>
            <div className="admin-products">
                {data && data.map(
                    item => {
                        return <AdminProduct key={item.id} item={item}
                                             isEdited={isEdited} setIsEdited={setIsEdited}/>
                    }
                )}
            </div>
            <Pagination itemPerPage={20} currentPage={page} handlePageChange={setPage} totalPost={totalPost}/>
        </div>
    );
};

export default PendingProductManagement;