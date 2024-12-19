import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import instance from "../../utils/axios";
import DefaultButton from "../common/DefaultButton";
import PlaceReviewEditor from "./PlaceReviewEditor";
import {useModifyTime} from "../../utils/useModifyTime";

const PlaceReview = ({item, mapId, setIsEdited, isEdited}) => {
    const ratingStar = [...Array(item.rating).keys()];
    const remainStar =[...Array(5-item.rating).keys()]
    const imgurl = "http://localhost:8080/file/image-print?filename=";
    const [isAuthor, setIsAuthor] = useState(false)
    const [reviewWriting, setReviewWriting] = useState(false)
    const modifiedTime = useModifyTime(item.created_date);

    useEffect(() => {

        instance({
            url:`/map/comment/check?commentId=${item.id}`,
            method:"get"
        }).then(res=>{
            console.log(item)
            console.log("item.id",item.id,res.data)

            setIsAuthor(res.data)
        }).catch(err=>{
            console.log(err)
        })

    }, [isEdited]);

    const deleteHandler = ()=>{
        instance({
            url:`/map/comment/delete?commentId=${item.id}`,
            method:"delete"

        }).then(res=>{
            console.log(res)
            setIsEdited(!isEdited)
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <div className="place-review-item">
            {!reviewWriting &&
                <>
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
                        <span>{modifiedTime}</span>

                        {isAuthor && <>
                            <DefaultButton onClick={() => {
                                setReviewWriting(true)
                            }} className="primary">수정</DefaultButton>
                            <DefaultButton onClick={deleteHandler}>삭제</DefaultButton>
                        </>}


                    </div>


                    <span>{item.contents}</span>

                    <div>
                        {item && item.map_comment_thumbnail_url.map(
                            (thumbnail, index) => (<img className={"review-image"} src={imgurl + thumbnail} alt=""/>))}
                    </div>


                </>}

            {reviewWriting && <PlaceReviewEditor setIsEdited={setIsEdited} isEdited={isEdited} mapId={mapId} item={item}
                                                setReviewWriting={setReviewWriting} isModify = {true}/>
            }

        </div>
    );
};

export default PlaceReview;