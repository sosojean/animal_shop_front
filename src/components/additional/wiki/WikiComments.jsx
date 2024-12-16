import { useEffect, useState } from "react";
import axios from "axios";
import WikiComItem from "./WikiComItem";

const WikiComments = (props) => {

    const {id} = props;
    const [data, setData] = useState();

    const getCommentData = () => {
        axios({
            url: `http://localhost:8080/wiki/comment/${id}/list`,
            method: "get"
        }).then((res) => {
            console.log("response", res.data.wikiCommentDTOList);
            setData(res.data.wikiCommentDTOList)
        })
        .catch((err) => {
            console.error("error", err);
        })
    }

    useEffect(() => {
        getCommentData();
    }, []);

    return (
        <div>
            {data?.map((d, i) => {return <WikiComItem data={d} key={i}/>})}
        </div>
    )
}

export default WikiComments;