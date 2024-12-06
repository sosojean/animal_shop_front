import { useState, useEffect } from "react";
import AdoptDetail from "../../components/additional/AdoptDetail";
import AdoptList from "../../components/additional/AdoptList";
import axios from "axios";


const AdoptAnimalDetail = () => {

    const [isCat, setIsCat] = useState(false);
    const [data, setData] = useState();

    const getApiListData = () => {
        
        let data = {
            species: isCat ? "고양이" : "개"
        }

        console.log("data", data)

        axios({
            url: `http://localhost:8080/abandoned_animal/search`,
            method: "POST",
            data: data
        }).then((res) => {
            console.log("response", res.data.animalListDTOList);
            setData(res.data.animalListDTOList);
        })
        .catch((err) => {
            console.error("error", err);
        })
    };

    useEffect(()=>{
        getApiListData();
    }, []);

    return (
    <>
        <AdoptDetail
            setIsCat={setIsCat}
        />
        <AdoptList
            data={data}
            className="adopt-inside-list"
        />
    </>
    )
}

export default AdoptAnimalDetail;