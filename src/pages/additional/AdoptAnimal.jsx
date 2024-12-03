import axios from "axios";
import { useEffect, useState } from "react";
import "../../assets/styles/additional/adoptAnimal.scss"
import AdoptList from "../../components/additional/AdoptList";
import AdoptFilterMax from "../../components/additional/AdoptFilterMax";
import AdoptFilterMini from "../../components/additional/AdoptFilterMini";

const AdoptAnimal = () => {

    const [data, setData] = useState();
    const [selectedItems, setSelectedItems] = useState([]);

    const URL = "http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic";
    const URLTEST = "http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic/sido";

    const getApiData = () => {
        axios({
            url: URL,
            method: "get",
            params: {
                serviceKey: process.env.REACT_APP_ADOPT_ANIMAL_KEY,
                numOfRows: 10,
                pageNo: 2,
                _type: "json",
            }
        }).then((res) => {
            console.log("response", res.data);
            // console.log("data", res.data.response.body.items.item);
            setData(res.data.response.body.items.item);
        })
        .catch((err) => {
            console.error("error", err);
        })
    };

    useEffect(()=>{
        getApiData();
    }, []);

    return (
        <div>
            <AdoptFilterMax
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
            />
            <AdoptFilterMini
            />
            {data &&
                <AdoptList data={data}/>
            }
        </div>
    )
}

export default AdoptAnimal;