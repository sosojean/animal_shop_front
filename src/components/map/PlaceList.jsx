import React from 'react';
import PlaceListItem from "./PlaceListItem";

const PlaceList = ({data}) => {
    return (
        <div>

            {data&&data.map((item, index) => (
                <PlaceListItem key={index} item={item} />
            ))}
        </div>
    );
};

export default PlaceList;