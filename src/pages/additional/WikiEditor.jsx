import WikiInput from "../../components/additional/wiki/WikiInput";
import instance from "../../utils/axios";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/shop/admin/AdminMenu";
import Title from "../../components/common/Title";
import "../../assets/styles/additional/wikiEditor.scss";

const WikiEditor = () => {
    const { wikiId } = useParams();

    const [postData, setPostData] = useState({breedName: "치와와"});
    console.log("postData", postData);

    const getWikiData = (id) => {

        instance({
            url: `/wiki/select/${id}`,
            method: "GET"
        }).then((res) => {
            setPostData(res.data.wikiDTOList[0]);
        })
        .catch((err) => {
            console.error("error", err);
        })
    }

    useEffect(() => {
        getWikiData(wikiId);
    }, [])

    return (
        <div>
            <AdminMenu/>
            <Title>{wikiId ? "위키 백과 수정" : "위키 백과 등록"}</Title>

            <WikiInput
                postData={postData}
                setPostData={setPostData}
            />
        </div>
    )
}

export default WikiEditor;