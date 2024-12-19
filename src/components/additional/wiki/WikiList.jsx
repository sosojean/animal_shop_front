import instance from "../../../utils/axios"
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import WikiItem from "./WikiItem";
import Pagination from "../../board/Pagination";

const WikiList = () => {

    const [wikiData, setWikiData] = useState(null);
    const [wikiCount, setWikiCount] = useState(1);

    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const currentPage = parseInt(queryParams.get("page")) || 1; // 현재 페이지 확인

    const getWikiData = (page = 1) => {

        axios({
            method: 'get',
            url: `http://localhost:8080/wiki/select?page=${page}`, // 페이징처리
          })
          .then((res) => {
            // console.log("response", res.data);
            setWikiData(res.data.wikiDTOList)
            setWikiCount(res.data.total_count);
            })
    }

    const handlePageChange = (newPage) => {
        navigate(`/wiki?page=${newPage}`); // 페이지 변화
    };

    useEffect(() => {
        getWikiData(currentPage);
    }, [currentPage]);

    return (
        <div>
            {wikiData?.map(data =>
                <Link to={`/wiki/${data.id}`} key={data.id}>
                    <WikiItem data={data} key={data.id}/>   
                </Link>
            )}
            <Pagination
                currentPage={currentPage}
                totalPost={wikiCount}
                handlePageChange={handlePageChange}
            />
        </div>
    )
}

export default WikiList;