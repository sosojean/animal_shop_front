import React, {useState} from 'react';
import instance from "../../utils/axios";
import DetailInfoWindow from "./DetailInfoWindow";

const PlaceListItem = ({item, setSelectedItemId}) => {


    const selectPosition = ()=>{
        setSelectedItemId(item["map_id"]);
    }

    return (
        <>
            <button onClick={selectPosition} className="get_detail_info">
                <span>{item["facility_name"]}</span>
            </button>

        </>

    );
};

export default PlaceListItem;