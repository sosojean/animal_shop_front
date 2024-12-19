import AdoptInterestList from "../../components/additional/adopt/AdoptInterestList";
import Card from "../../components/common/Card";
import Pagination from "../../components/board/Pagination";
import "../../assets/styles/additional/adoptAnimal.scss"
import instance from "../../utils/axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AdoptInterestAnimal = () => {

    const [data, setData] = useState();
    const [dataCount, setDataCount] = useState();

    console.log("AdoptInterestAnimal data", data);
    console.log("AdoptInterestAnimal dataCount", dataCount);

    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const currentPage = parseInt(queryParams.get("page")) || 1; // 현재 페이지 확인

    const getApiData = (page) => {
        instance({
            url: `/abandoned_animal/list-interest?page=${page}`,
            method: "GET"
        }).then((res) => {
            console.log("AdoptInterestAnimal response", res.data);
            setData(res.data.interestAnimalDTOList);
            setDataCount(res.data.total_count);
        })
        .catch((err) => {
            console.error("AdoptInterestAnimal error", err);
        })
    }

    const getRefreshData = () => {
        getApiData(currentPage);
    }

    const handlePageChange = (newPage) => {
        navigate(`/adoption/interest?page=${newPage}`); // 페이지 변화
    };

    useEffect(() => {
        getApiData(currentPage);
    }, [currentPage]);

    return (
        <div>
            <Card>
                <p>총 {dataCount} 마리의 아이들을 눈여겨 보고 있어요!</p>
            </Card>
            <AdoptInterestList data={data} getRefreshData={getRefreshData}/>
            <Pagination
                currentPage={currentPage}
                totalPost={dataCount}
                handlePageChange={handlePageChange}
            />
        </div>
    )
}

export default AdoptInterestAnimal;