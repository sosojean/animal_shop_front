import AdoptComEditor from "../../components/additional/adopt/AdooptComEditor";
import AdoptComments from "../../components/additional/adopt/AdoptComments";
import Pagination from "../../components/board/Pagination";
import axios from "axios";
import { useState, useEffect } from "react";

const AdoptAnimalComment = (props) => {

    const { id } = props;

    const [data, setData] = useState();
    const [dataCount, setDataCount] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    const getCommentData = (page = currentPage) => {
        axios({
            url: `${process.env.REACT_APP_API}/abandoned_animal/${id}/findAll?page=${page}`,
            method: "get"
        }).then((res) => {
            console.log("response", res.data.abandonedCommentDTOList);
            setData(res.data.abandonedCommentDTOList);
            setDataCount(res.data.total_count);
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
            <AdoptComments id={id} data={data} getRefresh={getCommentData}/>
            <AdoptComEditor id={id} getRefresh={getCommentData}/>
            <Pagination
                currentPage={currentPage}
                totalPost={dataCount}
                handlePageChange={handlePageChange}
            />
        </div>
    )
}

export default AdoptAnimalComment;