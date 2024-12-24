import React, {useEffect, useState} from 'react';
import Title from "../../common/Title";
import instance from "../../../utils/axios";
import Card from "../../common/Card";
import MyPageComment from "./items/myPageComment";
import Pagination from "../../board/Pagination";
import AnimalComment from "./items/AnimalComment";

const AnimalCommentList = () => {
    const selectedUrl = "/mypage/mycomment-animal";
    const [data, setData] = useState()
    const [totalCount, setTotalCount] = useState(0)
    const [isEdit, setIsEdit] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)

    // 데이터 가져오기
    useEffect(() => {
        instance({
            url: selectedUrl,
            method: "get",
        })
            .then((res) => {
                setData(res.data.abandonedCommentDTOList);
                setTotalCount(res.data.total_count);
                console.log(res.data);

                // setData(res.data.interestAnimalDTOList || []);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <>
        <Title>나의 동물 댓글</Title>
        <Card>


            {data?.map(item => <AnimalComment id={item.id} item={item} setIsEdit={setIsEdit} isEdit={isEdit}/>)}

            {totalCount === 0 ?
                <div className={"no-contents"}>
                    <span>좋아요한 댓글이 없습니다.</span>
                </div> : ""}


            { totalCount >= 15 &&
                <Pagination
                    totalPost={data?.totalCommentCount}
                    currentPage={currentPage}
                    handlePageChange={setCurrentPage}
                    itemPerPage={15}/>
            }
        </Card>
        </>
    );
};

export default AnimalCommentList;