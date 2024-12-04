import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../assets/styles/additional/adoptAnimal.scss"
import AdoptList from "../../components/additional/AdoptList";
import AdoptFilterMax from "../../components/additional/AdoptFilterMax";
import AdoptFilterMini from "../../components/additional/AdoptFilterMini";
import Pagination from "../../components/board/Pagination";

const AdoptAnimal = () => {

    const [data, setData] = useState();
    const [dataCount, setDataCount] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]);
    const [subSelectedItems, setSubSelectedItems] = useState([]);
    const [update, setUpdate] = useState(false);
    console.log("selectedItems", selectedItems);
    // console.log("subSelectedItems", subSelectedItems);


    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const currentPage = parseInt(queryParams.get("page")) || 1; // 현재 페이지 확인

    const getRefreshData = () => {
        setUpdate(!update);
        console.log("업데이트 됐습니다");
    }

    const getApiData = (page) => {

        const breedList = selectedItems.breed?.map(v => {
            return v.name
        })

        console.log("selectedItems", selectedItems);
        console.log("subSelectedItems", subSelectedItems);
        
        let data = {
            species: selectedItems.species,
            breed: breedList,
            location: selectedItems.location,
            sex: subSelectedItems.sex
        }

        console.log("data", data)

        axios({
            url: `http://localhost:8080/abandoned_animal/search?page=${page}`,
            method: "POST",
            data: data
        }).then((res) => {
            console.log("response", res.data.animalListDTOList);
            // console.log("data", res.data.response.body.items.item);
            setData(res.data.animalListDTOList);
            setDataCount(res.data.total_count);
        })
        .catch((err) => {
            console.error("error", err);
        })
    };

    const handlePageChange = (newPage) => {
        navigate(`/adoption?page=${newPage}`); // 페이지 변화
    };

    useEffect(()=>{
        getApiData(currentPage);
    }, [currentPage, update]);

    return (
        <div>
            <AdoptFilterMax
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                getRefreshData={getRefreshData}
            />
            <AdoptFilterMini
                subSelectedItems={subSelectedItems}
                setSubSelectedItems={setSubSelectedItems}
                getRefreshData={getRefreshData}
            />
            {data &&
                <AdoptList data={data}/>
            }
            <Pagination
                currentPage={currentPage}
                totalPost={dataCount}
                handlePageChange={handlePageChange}
            />
        </div>
    )
}

export default AdoptAnimal;