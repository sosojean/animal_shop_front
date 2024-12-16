import instance from "../../../utils/axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WikiItem from "./WikiItem";

const WikiList = () => {

    const [wikiData, setWikiData] = useState(null);

    const getWikiData = () => {

        instance({
            method: 'get',
            url: '/wiki/select', // 페이징처리
          })
          .then((res) => {
            // console.log("response", res.data.wikiDTOList);
            setWikiData(res.data.wikiDTOList)
            })
    }

    useEffect(() => {
        getWikiData();
    }, []);

    return (
        <div>
            {wikiData?.map(data =>
                <Link to={`/wiki/${data.id}`} key={data.id}>
                    <WikiItem data={data} key={data.id}/>   
                </Link>
            )}
        </div>
    )
}

export default WikiList;