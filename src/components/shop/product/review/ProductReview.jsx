import "../../../../assets/styles/shop/product/productReview.scss"
import instance from "../../../../utils/axios";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faHeartBroken} from "@fortawesome/free-solid-svg-icons";
import ReviewImages from "./ReviewImages";
import {useModifyTime} from "../../../../utils/useModifyTime";

const ProductReview = ({ isLoggedIn ,item, setIsModified, isModified, setIsEdit, isEdit}) => {

    const [isAuthor, setIsAuthor] = useState()
    const [isLiked, setIsLiked] = useState(item.heart)
    const [newComment, setNewComment] = useState(item.contents)
    const modifiedTime = useModifyTime(item.createdDate)


    useEffect(() => {
        instance({
            url: `/item_comment/update/${item.id}`, // 좋아요 여부 요청
            method:'GET'

        }).then((res) => {
            setIsAuthor(res.data)
        }).catch((error) => {console.log(error)})

    }, []);



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


    const editConfirmHandler = () => {
        instance({
            url:`/item_comment/update/${item.id}`,
            method:'patch',
            data:{
                contents:newComment
            }
        }).then(res=>{
             setIsEdit(!isEdit)
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

        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className="productReviewContainer">
            <div className="reviewerInfoContainer">
                <img className="reviewerImage" src="https://placehold.co/70x70" />
                <div className="reviewerInfoDetail">
                    <div className="reviewerStars">
                        <div>
                            {/*todo 별 숫자 -> 갯수로 바꾸기*/}
                            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                        </div>
                        <p>5</p>
                    </div>
                    <div className="review-header">
                        <div className="reviewerName">
                            <p>{item?.nickname}</p>
                            <p>{modifiedTime}</p>

                        </div>
                        <div className="review-control-buttons">
                            {isLoggedIn &&<>
                            {isLiked ?

                                <button onClick={commentUnLikeHandler}><FontAwesomeIcon icon={faHeartBroken}/></button>
                                : <button onClick={commentLikeHandler}><FontAwesomeIcon icon={faHeart}/></button>
                            }
                            {isAuthor && <>
                                {isEdit?
                                    <button onClick={editConfirmHandler}>완료</button> :
                                    <button onClick={() => setIsEdit(true)}> 수정 </button>}
                                    <button onClick={deleteHandler}> 삭제</button></>}</>}
                        </div>
                    </div>
                </div>
            </div>

            {isEdit ?
                <textarea value={newComment}
                          onChange={e=>{setNewComment(e.target.value)}}
                          className="edit-review" cols="30" rows="10"/> :
                <div className="productReview">{item.contents}</div>
            }

            {item.thumbnailUrl.length!=0 && <ReviewImages images ={item.thumbnailUrl}/>  }
        </div>
    )
}

export default ProductReview;