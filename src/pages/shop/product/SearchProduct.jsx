import React, {useEffect, useState} from "react";
import Products from "../../../components/shop/product/Products";
import {useNavigate, useSearchParams} from "react-router-dom";
import axios from "axios";

import Pagination from "../../../components/board/Pagination";
import ProductSearchBar from "../../../components/shop/product/ProductSearchBar";
import ProductSearchHeader from "../../../components/shop/admin/ProductSearchHeader";
import Title from "../../../components/common/Title";


const SearchProduct = () => {
    const [data, setData] = useState()
    const [searchParams, setSearchParams] = useSearchParams();
    const [totalCount, setTotalCount] = useState(0)
    const keyword = searchParams.get("keyword")
    const [page, setPage] = useState(1)



    useEffect(() => {
        axios({
            url:`${process.env.REACT_APP_API}/item/search`,
            method:"get",
            params: {
                searchBy:"with",
                searchTerm: keyword,
                pageCount:20,
                page:page
            }
        }).then(res => {
            console.log(res)
            setData(res.data.itemDTOLists);
            setTotalCount(res.data.total_count)
        })

    },[keyword,page])



    return (<>

        {/*<ProductSearchBar/>*/}
        {/*<div>필터</div>*/}
        {/*<span>총 {totalCount}건의 검색 결과</span>*/}
        <Title>상품검색</Title>

        <ProductSearchHeader setQueryData={setData} setQueryDataTotal={setTotalCount}
                             queryDataTotal={totalCount} keyword={keyword} saveToCsv={()=>{}}/>


        {data&&totalCount < 1 &&<div className=" no-contents" ><span>검색 결과가 없습니다.</span></div>}
        {data &&totalCount > 0 &&<Products name={keyword} data={data}/>}
        {totalCount>=20 && <Pagination currentPage={page} handlePageChange={setPage} totalPost={totalCount} itemPerPage={20}/>}


    </>)

}
export default SearchProduct;