import WikiInput from "../../components/additional/wiki/WikiInput";
import instance from "../../utils/axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const WikiEditor = () => {
    const { wikiId } = useParams();

    const [postData, setPostData] = useState({});
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
            <h1>{wikiId ? "위키 백과 수정" : "위키 백과 등록"}</h1>
            <WikiInput
                postData={postData}
                setPostData={setPostData}
            />
        </div>
    )
}

export default WikiEditor;