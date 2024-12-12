import React, {useState} from 'react';
import Card from "../common/Card";

const PlaceListItem = ({item, setSelectedItemId}) => {


    const selectPosition = ()=>{
        setSelectedItemId(item["map_id"]);
    }

    return (
        <>
            <Card className={"bottom-flat detail-info-card"}>
            <button onClick={selectPosition} className="detail-info">
                <h3>{item["facility_name"]}</h3>
                <span>{item["place_description"].split(",")[0]}</span>
            </button>
            </Card>

        </>

    );
};

export default PlaceListItem;