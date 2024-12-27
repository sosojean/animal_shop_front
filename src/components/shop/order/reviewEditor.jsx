import {useEffect, useRef, useState} from "react";
import "../../../assets/styles/comment/commentEditor.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage, faStar} from "@fortawesome/free-solid-svg-icons";


import instance from "../../../utils/axios";
import axios from "axios";


const ReviewEditor = ({item, setReviewWriting,  isEdit}) => {
    const [newComment, setNewComment] = useState("")
    const [rating, setRating] = useState(5)
    const [images, setImages] = useState([]);
    const imageUrl = `${process.env.REACT_APP_API}/file/image-print?filename=`;
    useEffect(() => {
        console.log(item);
        if (isEdit){
            setNewComment(item.contents)
            setRating(item.rating)
            setImages(item.thumbnailUrl)

        }

    }, [])

    const editConfirmHandler = (e) => {
        e.preventDefault();

        instance({
            url:`/item_comment/update/${item.id}`,
            method:'patch',
            data:{
                contents:newComment,
                rating: rating,
                thumbnailUrls:images
            }
        }).then(res=>{
            setReviewWriting(false)
        }).catch((error) => {
            console.log(error)
        })
    }


    const onSubmitHandler = (e) => {
        e.preventDefault();
        instance({
            url: `/item_comment/create/${item.itemId}`,
            method: "Post",
            data: {
                contents: newComment,
                rating: rating,
                thumbnailUrls:images
            }
        }).then((data) => {
            console.log(data);
            setReviewWriting(false)

        })
    }

    const ImgUploadHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        if (file != null) {
            formData.append('image', new Blob([file], {type: 'multipart/form-data'}), file.name);

            axios({
                url: `${process.env.REACT_APP_API}/file/item-comment-image-upload`,
                method: 'POST',
                data: formData,
            }).then((response) => {
                console.log(response.data);
                setImages([...images,response.data]);


            }).catch((error) => {
                console.log(error)
            })
        }
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

    const deleteImage = (e,i) => {
        e.preventDefault();
        const newImages = [...images];
        newImages.splice(i, 1);
        setImages(newImages)
    }

    return (<div className="review-editor">

            <div className="star-rating">

                {[...Array(5)].map((_, i) => {
                    return (
                        <button key={"btn" + i} className={i < rating ? "selected" : ""}
                                onClick={() => setRating(i + 1)}>
                            <FontAwesomeIcon icon={faStar}/>
                        </button>
                    )
                })}

            </div>

            <span className="rating-comment">{ratingComment()}</span>

            <form className="input-comment" onSubmit={(e) => isEdit?editConfirmHandler(e):onSubmitHandler(e)}>

                <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)}/>
                <div className="btn-section">
                    <div className="img-upload-section">
                        <label className="input-file-button" htmlFor="input-file"><FontAwesomeIcon
                            icon={faImage}/></label>
                        <div className="images">
                            {images && images.map((filename, i) => {
                                return (<><img className="review-image" src={imageUrl + filename} alt=""/>
                                    <button className="delete-image" onClick={(e) => deleteImage(e, i)}>x</button>
                                </>)
                            })}
                        </div>
                    </div>
                    <input id="input-file" onChange={(e) => ImgUploadHandler(e)} type="file"
                           accept="image/*"/>
                    <div className="row">
                    <button type="reset" className="submit-button" onClick={()=>setReviewWriting(false)}>취소</button>

                    {isEdit ?
                        <button className="submit-button">수정</button>:
                        <button className="submit-button">등록</button>}
                    </div>
                </div>
            </form>


        </div>

    )
}
export default ReviewEditor