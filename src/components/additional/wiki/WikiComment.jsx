import WikiComEditor from "./WikiComEditor";
import WikiComments from "./WikiComments";
import Pagination from "../../board/Pagination";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const WikiComment = (props) => {

    const {id} = props;

    const [data, setData] = useState();
    const [dataCount, setDataCount] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const getCommentData = (page = currentPage) => {
        console.log("comment page", page);

        axios({
            url: `${process.env.REACT_APP_API}/wiki/comment/${id}/list?page=${page}`,
            method: "get"
        }).then((res) => {
            // console.log("response", res.data.wikiCommentDTOList);
            setData(res.data.wikiCommentDTOList)
            setDataCount(res.data.total_count)
        })
        .catch((err) => {
            console.error("error", err);
        })
    }

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        getCommentData(newPage);
    };

    useEffect(() => {
        getCommentData(currentPage);
    }, [id, currentPage]);

    return (
        <div>
            <WikiComments id={id} data={data} getRefresh={getCommentData}/>
            <WikiComEditor id={id} getRefresh={getCommentData}/>
            <Pagination
                currentPage={currentPage}
                totalPost={dataCount}
                handlePageChange={handlePageChange}
                itemPerPage={itemsPerPage}
            />
        </div>
    )
}

export default WikiComment;