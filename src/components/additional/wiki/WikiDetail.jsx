import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import instance from "../../../utils/axios";
import WikiItem from "./WikiItem";
import WikiComment from "./WikiComment";
import "../../../assets/styles/additional/wikiDetail.scss"

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
        <div className="wiki-detail-container">
            <WikiItem data={wikiData}/>
            <WikiComment id={id}/>
        </div>
    )
}

export default WikiDetail;