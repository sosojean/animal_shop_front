import "../../../../assets/styles/shop/product/productReview.scss"
import instance from "../../../../utils/axios";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faStar, faHeartBroken} from "@fortawesome/free-solid-svg-icons";

import ReviewImages from "./ReviewImages";
import {useModifyTime} from "../../../../utils/useModifyTime";

import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import ReviewEditor from "../../order/reviewEditor";
import {useSearchParams} from "react-router-dom";
import DefaultButton from "../../../common/DefaultButton";
import {toast} from "react-toastify";

const ProductReview = ({ isLoggedIn ,item, setIsModified, isModified}) => {


    const [isAuthor, setIsAuthor] = useState()
    const [isLiked, setIsLiked] = useState(item.heart)
    const [newComment, setNewComment] = useState(item.contents)
    const [isEdit, setIsEdit] = useState(false)
    const [reviewWriting, setReviewWriting] = useState(false)
    const modifiedTime = useModifyTime(item.createdDate)


    useEffect(() => {
        console.log(item)
        instance({
            url: `/item_comment/update/${item.id}`, // 좋아요 여부 요청
            method:'GET'

        }).then((res) => {
            setIsAuthor(res.data)
        }).catch((error) => {console.log(error)})

    }, []);

    useEffect(() => {
        setIsModified(!isModified)

    }, [isEdit]);


    const deleteHandler = () => {
        instance({
            url:`/item_comment/delete/${item.id}`,
            method:'delete',
        }).then(res=>{
            setIsModified(!isModified)
        }).catch((error) => {
            console.log(error)
        })
    }



    const commentLikeHandler = () => {
        instance({
            url:`/item_comment_like/add/${item.id}`,
            method:'GET',

        }).then(res=>{
          // console.log("res", res)
            setIsLiked(true)
            setIsModified(!isModified)
            toast.success("상품 리뷰를 좋아요 했습니다.")
        }).catch((error) => {
            console.log(error)
        })
    }

    const commentUnLikeHandler = () => {
        instance({
            url:`/item_comment_like/delete/${item.id}`,
            method:'GET',

        }).then(res=>{
            // console.log("res", res)
            setIsLiked(false)
            setIsModified(!isModified)
            toast.info("상품 리뷰 좋아요를 취소 했습니다.")


        }).catch((error) => {
            console.log(error)
        })
    }

    const renderStars = (rating) => {
        return Array.from({length: 5}, (_, index) => (
            <span key={index}>{index < rating ? '★' : ''}</span>
        ));
    };

    return (
        <div className="productReviewContainer">
            {!isEdit ? <>
                    <div className="reviewerInfoContainer">
                        {/*<img className="reviewerImage" src="https://placehold.co/70x70" />*/}
                        <div className="reviewerInfoDetail">

                            <div className="review-header">
                                <div className={"row"}>
                                    <div className="reviewerName">
                                        <p>{item?.nickname}</p>

                                    </div>
                                    <div className="reviewerStars">
                                        <div>
                                            {[...Array(5)].map((_, i) => {
                                                return (
                                                    <span key={i}
                                                          className={i < item.rating ? "selected" : "non-selected"}>
                                                        <FontAwesomeIcon icon={faStar}/>
                                                    </span>)})}
                                        </div>
                                        <p>{modifiedTime}</p>

                                    </div>
                                </div>
                                <div className="review-control-buttons">
                                    {isLoggedIn && <>
                                        {isLiked ?
                                            <button className={"review-heart-button"} onClick={commentUnLikeHandler}>
                                                <FontAwesomeIcon icon={solidHeart}/>
                                            </button>
                                            :
                                            <button className={"review-heart-button"} onClick={commentLikeHandler}>
                                                <FontAwesomeIcon icon={regularHeart}/>
                                            </button>
                                        }
                                        {isAuthor ? <>
                                            <DefaultButton onClick={() => setIsEdit(true)}> 수정</DefaultButton>
                                            <DefaultButton onClick={deleteHandler}> 삭제</DefaultButton>
                                        </> : null}</>}
                                </div>

                            </div>
                            <div className="productReview">{item.contents}</div>

                        </div>
                    </div>
                    {item.thumbnailUrl.length !== 0 ? <ReviewImages images={item.thumbnailUrl}/> : null}
                </>


                :
                <ReviewEditor item={item} setReviewWriting={setIsEdit} isEdit={isEdit} oldReview={item}/>


            }

        </div>
    )
}

export default ProductReview;