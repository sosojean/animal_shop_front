import React, {useEffect, useState} from 'react';
import PlaceListItem from "./PlaceListItem";
import instance from "../../utils/axios";
import DetailInfoWindow from "./DetailInfoWindow";

const PlaceList = ({data, selectedItemId, setSelectedItemId}) => {
// const PlaceList = ({data}) => {

    // const [selectedItemId, setSelectedItemId] = useState(null)
    const [detailInfoWindow, setDetailInfoWindow] = useState(false)
    const [detailInfo, setDetailInfo] = useState(null)


    useEffect(() => {
        if (selectedItemId){
        instance({
            url: `/map/detail?mapId=${selectedItemId}`,
            method: "POST",
        }).then((response) => {



            // console.log(selectedItemId, response.data)
            setDetailInfo(response.data)

            // setDetailInfoWindow(true)
        }).catch((error) => {
            console.log(error);
        })}
    },[selectedItemId])

    return (
        <div>


            {data&&data.map((item, index) => (
                <div key={index}>
                    {!selectedItemId&&<PlaceListItem  item={item}  setSelectedItemId={setSelectedItemId}/>}
                </div>
            ))}
            {selectedItemId&&detailInfo&&<DetailInfoWindow setSelectedItemId={setSelectedItemId} item={detailInfo}/>}

        </div>
    );
};

export default PlaceList;