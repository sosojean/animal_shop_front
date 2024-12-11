import React from 'react';

const DetailInfoWindow = ({item ,setSelectedItemId}) => {



    return (
        <div className="detail-info-window">
            <button onClick={() => setSelectedItemId(null)}> 뒤로</button>
            <h2>{item.facility_name}</h2>
            <span>{item.latitude}</span>
            <span>{item.longitude}</span>
            <span>{item.additional_pet_fee}</span>
            <span>{item.admission_fee}</span>
            <span>{item.allowed_pet_size}</span>
            <span>{item.category}</span>
            <span>{item.indoor_available}</span>
            <span>{item.outdoor_available}</span>
            <span>{item.operating_hours}</span>
            <span>{item.parking_available}</span>
            <span>{item.pet_restrictions}</span>
            <span>{item.phone_number}</span>
            <span>{item.place_description}</span>
            <span>{item.road_address}</span>
            <span>{item.homepage}</span>
            <span>{item.closed_days}</span>
            <span>{item.rating}</span>
            <span>{item.comment_count}</span>

            detail
        </div>
    );
};

export default DetailInfoWindow;