import React, {useEffect, useState} from 'react';
import Title from "../../common/Title";
import instance from "../../../utils/axios";
import BoardItem from "../../board/BoardItem";

const WrittenComments = () => {
    const [data, setData] = useState()

    const selectedUrl = "/mypage/"+"mycomment"
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
    }, []);
    return (
        <div>
            <Title>작성한 댓글</Title>

                {/*{data && data.comments.map((data, index) => (*/}
                {/*    <BoardItem data={data} key={index}/>*/}
                {/*))}*/}



        </div>
    );
};

export default WrittenComments;