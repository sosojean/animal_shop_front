import React, {useEffect, useState} from 'react';
import Title from "../../common/Title";
import instance from "../../../utils/axios";
import FavoritePlace from "./items/FavoritePlace";
import "../../../assets/styles/member/favoritePlaces.scss"
import Card from "../../common/Card";
import ProductQnA from "../../shop/product/QnA/ProductQnA";
import Pagination from "../../board/Pagination";


const FavoritePlaces = () => {
    const [data, setData] = useState()
    const [page, setPage] = useState(1)
    const [totalCount, setTotalCount] = useState(0)

    const selectedUrl = "/mypage/"+"like-place"
    useEffect(() => {
        instance({
            url :selectedUrl,
            method:"get",
            params:{page}
        }).then((res) => {
            setData(res.data.mapPositionDTOList)
            setTotalCount(res.data.total_count)
            console.log(res.data);

        }).catch((error) => {
            console.log(error);
        })
    }, [page]);


    return (
        <div className="favorite-places">
            <Title>나의 관심 장소</Title>

            <Card className="default-card">
            {data&&data.map(item=>
                <FavoritePlace item={item}/>
            )}
            {data?.length===0&&<div className="no-contents"><span>좋아요한 장소가 없습니다.</span></div>}
            {totalCount>10&&<Pagination currentPage={page} handlePageChange={setPage} totalPost={totalCount} />}
            </Card>






        </div>
    );
};

export default FavoritePlaces;