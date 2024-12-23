import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const FavoritePlace = ({item}) => {
    return (
        <Link to={`/map?selected=${item.map_id}`}>
            <div className="favorite-place col">
                <div className={" favorite-place-title"}>
                    <span>{item.facility_name}</span>
                    <span className={"rating"}><FontAwesomeIcon icon={faStar}/> {item.total_rating}</span>
                </div>
                <span className="description">{item.place_description}</span>
            </div>
        </Link>
    );
};

export default FavoritePlace;