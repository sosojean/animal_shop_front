import React, {useEffect, useRef, useState} from 'react';
import AdminMenu from "../../../components/shop/admin/AdminMenu";

import AdminProduct from "../../../components/shop/admin/AdminProduct";
import ProductSearchHeader from "../../../components/shop/admin/ProductSearchHeader";
import instance from "../../../utils/axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTable} from "@fortawesome/free-solid-svg-icons";
import * as converter from "json-2-csv";
import Title from "../../../components/common/Title";
import DefaultButton from "../../../components/common/DefaultButton";
import {toast} from "react-toastify";


const ProductManagement = () => {
    const [data, setData] = useState()
    const [queryData, setQueryData] = useState()
    const [queryDataTotal, setQueryDataTotal] = useState()
    const [page, setPage] = useState(1)
    const [isEdited, setIsEdited] = useState(false)
    const [totalPost, setTotalPost] = useState(0)
    const linkRef = useRef(null);

    useEffect(() => {
        instance({
            url:`/item/search`,
            method: "get",
        }).then(res=>{
            console.log(res.data)

            setData(res.data["itemDTOLists"]);
            setTotalPost(res.data["total_count"])

        })
    },[page])

    function saveToCsv() {
        const csvData = converter.json2csv(queryData?queryData:data, {arrayIndexesAsKeys : true});
        console.log(csvData);


        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        // Ref를 활용해 a 태그를 클릭
        if (linkRef.current) {
            linkRef.current.href = url;
            linkRef.current.download = "myData.csv";
            linkRef.current.click();
            URL.revokeObjectURL(url);
        }
        toast.success("파일이 저장되었습니다.");
    }

    return (
        <div>
            <AdminMenu/>
            <Title>판매상품관리</Title>

            <ProductSearchHeader setQueryData={setQueryData} setQueryDataTotal={setQueryDataTotal}
                                 queryDataTotal={queryDataTotal} saveToCsv={saveToCsv}/>





            <a ref={linkRef} style={{display: "none"}}>Download</a>

            <div className="product-manage-table-container">
            <table className="admin-products">

                <thead className="product">
                <tr className="product-info">
                    <th className="no"> no</th>

                    <th className="img"> 이미지</th>
                    <th className="title">상품명</th>
                    <th className="detail">상품설명</th>

                    <th className="category">카테고리</th>
                    <th className="stock">재고</th>
                    <th className="status">판매 상태</th>
                    <th className="brand">판매자</th>
                    <th className="price">가격</th>
                    <th className="revoke">중단</th>
                </tr>
                </thead>
                <tbody>

                {queryData && queryData.map(
                    item => {
                        return <AdminProduct key={item.id} item={item}
                                             isEdited={isEdited} setIsEdited={setIsEdited}/>
                    })}

                {!queryData && data && data.map(
                    item => {
                        return <AdminProduct key={item.id} item={item}
                                             isEdited={isEdited} setIsEdited={setIsEdited}/>
                    })}
                </tbody>

            </table>
            {/*<Pagination itemPerPage={20} currentPage={page} handlePageChange={setPage} totalPost={totalPost}/>*/}
        </div>
        </div>
    );
};

export default ProductManagement;