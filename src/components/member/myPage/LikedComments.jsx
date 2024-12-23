import React, {useEffect, useState} from 'react';
import Title from "../../common/Title";
import instance from "../../../utils/axios";

const LikedComments = () => {
    const [data, setData] = useState()

    const selectedUrl = "/mypage/"+"like-comment"
    useEffect(() => {
        instance({
            url :selectedUrl,
            method:"get"
        }).then((res) => {
            setData(res.data)
        }).catch((error) => {
            console.log(error);
        })
    }, []);
    return (
        <div>
            <Title>좋아요한 댓글</Title>


        </div>
    );
};

export default LikedComments;