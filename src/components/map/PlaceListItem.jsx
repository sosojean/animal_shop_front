import React from 'react';

const PlaceListItem = ({item}) => {
    return (
        <div>
            <span>{item["facility_name"]}</span>
        </div>
    );
};

export default PlaceListItem;