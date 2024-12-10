import AdoptInterestList from "../../components/additional/AdoptInterestList";
import Card from "../../components/common/Card";
import "../../assets/styles/additional/adoptAnimal.scss"
import instance from "../../utils/axios";
import { useEffect, useState } from "react";

const AdoptInterestAnimal = () => {

    const [data, setData] = useState();
    const [dataCount, setDataCount] = useState();

    console.log("AdoptInterestAnimal data", data);
    console.log("AdoptInterestAnimal dataCount", dataCount);

    // TODO 페이지네이션 필요

    const getApiData = () => {
        instance({
            url: `/abandoned_animal/list-interest`,
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
        getApiData();
    }

    useEffect(() => {
        getApiData();
    }, []);

    return (
        <div>
            <Card>
                <p>총 {dataCount} 마리의 아이들을 눈여겨 보고 있어요!</p>
            </Card>
            <AdoptInterestList data={data} getRefreshData={getRefreshData}/>
        </div>
    )
}

export default AdoptInterestAnimal;