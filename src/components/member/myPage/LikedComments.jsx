import React, {useEffect, useState} from 'react';
import Title from "../../common/Title";
import instance from "../../../utils/axios";
import MyPageComment from "./items/myPageComment";
import Card from "../../common/Card";
import BoardItem from "../../board/BoardItem";
import Pagination from "../../board/Pagination";

const LikedComments = () => {
    const [data, setData] = useState()
    const [isEdit, setIsEdit] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)

    const selectedUrl = "/mypage/"+"like-comment"
    useEffect(() => {
        instance({
            url :selectedUrl,
            method:"get"
        }).then((res) => {
            setData(res.data)
            console.log(res.data);
        }).catch((error) => {
            console.log(error);
        })
    }, [isEdit]);
    return (
        <div>
            <Title>좋아요한 댓글</Title>

            <Card>

                {data?.comments.map(item => <MyPageComment item={item} setIsEdit={setIsEdit} isEdit={isEdit}/>)}

                {data?.totalCommentCount === 0 ?
                    <div className={"no-contents"}>
                        <span>좋아요한 댓글이 없습니다.</span>
                    </div> : ""}


                { data?.totalCommentCount >= 15 &&
                    <Pagination
                        totalPost={data?.totalCommentCount}
                        currentPage={currentPage}
                        handlePageChange={setCurrentPage}
                        itemPerPage={15}/>
                }


            </Card>
        </div>
    );
};

export default LikedComments;