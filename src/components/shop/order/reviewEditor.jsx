import {useEffect, useRef, useState} from "react";
import "../../../assets/styles/comment/commentEditor.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage, faStar} from "@fortawesome/free-solid-svg-icons";


import instance from "../../../utils/axios";


const ReviewEditor = ({item}) => {
    const [newComment, setNewComment] = useState("")
    const [rating, setRating] = useState(0)


    useEffect(() => {

    }, [])



    const onSubmitHandler = (e) => {
        instance({
            url: `/item_comment/create/${item.itemId}`,
            method: "Post",
            data: {
                rating:10,
                contents: newComment
            }
        }).then((data) => {
            console.log(data);
        })
    }

    const ImgUploadHandler = async (e) => {

    }

    const clearInput = () => {



    }

    const ratingComment = () => {
        let comment = "별점을 남겨주세요."
        switch (rating) {
            case 1: return comment = "별로에요"
            case 2: return comment = "그냥 그래요"
            case 3: return comment = "평범해요"
            case 4: return comment = "좋아요"
            case 5: return comment = "최고에요"
            default: return comment = "별점을 남겨주세요"
        }
    }
    return (<>

            <div className="star-rating">
                {[...Array(5)].map((_, i) => {
                    return (
                        <button key={"btn" + i} className={i < rating ? "selected" : ""}
                                onClick={() => setRating(i + 1)}>
                            <FontAwesomeIcon icon={faStar}/>
                        </button>
                    )
                })}
                <span className="rating-comment">{ratingComment()}</span>

            </div>

            <form className="input-comment" onSubmit={(e) => onSubmitHandler(e)}>

                    <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)}/>
                    <div className="btn-section">
                        <label className="input-file-button" htmlFor="input-file"><FontAwesomeIcon
                            icon={faImage}/></label>
                        <input id="input-file" onChange={(e) => ImgUploadHandler(e)} type="file"
                               accept="image/*"/>
                        <button className="submit-button">등록</button>
                    </div>
                </form>



        </>

    )
}
export default ReviewEditor