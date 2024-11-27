import React, {useEffect, useState} from 'react';
import instance from "../../../utils/axios";
import PetInfo from "./PetInfo";

const PetInfoList = () => {
    const [data, setData] = useState()
    const [isEdited, setIsEdited] = useState(false)

    useEffect(() => {
        instance({
            url:"/pet/list",
            method:"get",

        }).then((response) => {
            console.log(response);
            setData(response.data["petProfileList"]);
        }).catch((error) => {
            console.log(error);
        })


    },[isEdited])



    return (<>
            {data && data.map((item, index) => {
                    return <PetInfo item={item} setIsEdited={setIsEdited} isEdited={isEdited}/>
                }
            )}</>
    );
};

export default PetInfoList;