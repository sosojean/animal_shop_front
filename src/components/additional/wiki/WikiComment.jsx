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

    const location = useLocation();
    const navigate = useNavigate();
    // const queryParams = new URLSearchParams(location.search);
    // const currentPage = parseInt(queryParams.get("page")) || 1; // 현재 페이지 확인

    const getCommentData = (page = currentPage) => {
        axios({
            url: `http://localhost:8080/wiki/comment/${id}/list?page=${page}`,
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
        getCommentData(newPage);
        setCurrentPage(newPage);
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
            />
        </div>
    )
}

export default WikiComment;