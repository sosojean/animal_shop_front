import React, {useEffect, useState} from 'react';
import Title from "../../common/Title";
import instance from "../../../utils/axios";
import BoardItem from "../../board/BoardItem";
import WriteButton from "../../board/WriteButton";
import Information from "../../layout/Information";
import Pagination from "../../board/Pagination";
import Card from "../../common/Card";

const WrittenPosts = () => {
    const [data, setData] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [totalCount, setTotalCount] = useState(0)

    const selectedUrl = "/mypage/"+"mypost"
    useEffect(() => {
        instance({
            url :selectedUrl,
            method:"get",
            params:{page:currentPage}
        }).then((res) => {
            setData(res.data)
            setTotalCount(res.data.totalCount)
            console.log(res.data);

        }).catch((error) => {
            console.log(error);
        })
    }, [currentPage]);
    return (
        <>
        <Title>작성한 게시물</Title>
        <Card>
            {data && data.posts.map((data) => {
                return (
                    // <BoardItem key={data.id} id={data.id} userId={data.userId} itemTitle={data.title}/>
                    <BoardItem key={data.id} data={data}/>
                );
            })}
            {/*{totalCount == 0 && <Information case = "dataNan"/>}*/}
            {totalCount === 0 ?
                <div className={"no-contents"}>
                    <span>작성한 게시물이 없습니다.</span>
                </div> : ""}

            {totalCount >= 15 &&
                <Pagination
                totalPost={totalCount}
                currentPage={currentPage}
                handlePageChange={setCurrentPage}
                itemPerPage={15}/>
            }
        </Card>
        </>
    );
};

export default WrittenPosts;