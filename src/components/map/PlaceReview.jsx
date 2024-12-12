import React, {useEffect} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";

const PlaceReview = ({item}) => {
    const ratingStar = [...Array(item.rating).keys()];
    const remainStar =[...Array(5-item.rating).keys()]
    const imgurl = "http://localhost:8080/file/image-print?filename=";
    useEffect(() => {
        console.log(item);
        console.log(ratingStar);
    }, []);
    return (
        <div className="place-review-item">
            <div className="review-header">
                <span>{item.nickname}</span>
                <span className="rating">
                    {ratingStar.map(() => {
                        return <span className="star"><FontAwesomeIcon icon={faStar}/></span>
                    })}
                    {remainStar.map(() => {
                        return <span className="remains"><FontAwesomeIcon icon={faStar}/></span>
                    })}
                </span>


            </div>
            thumbnail
            <span>{item.contents}</span>
            <div>
            {item&&item.map_comment_thumbnail_url.map(
                (thumbnail, index) => (<img className={"review-image"} src={imgurl+thumbnail} alt=""/>))}
            </div>
        </div>
    );
};

export default PlaceReview;