import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import instance from "../../../utils/axios";
import WikiItem from "./WikiItem";
import Comment from "../../comment/Comment";

const WikiDetail = () => {

    const { id } = useParams();
    const [wikiData, setWikiData] = useState(null);

    const getWikiData = () => {
        instance({
            url: `/wiki/select/${id}`,
            method: "GET"
        }).then((res) => {
            console.log("response", res.data.wikiDTOList);
            setWikiData(res.data.wikiDTOList[0]);
        })
        .catch((err) => {
            console.error("error", err);
        })
    }

    useEffect(() => {
        getWikiData();
      }, []);

    return (
        <div>
            <WikiItem data={wikiData}/>
            {/* <Comment/> */}
        </div>
    )
}

export default WikiDetail;