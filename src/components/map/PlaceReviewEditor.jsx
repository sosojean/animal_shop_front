import {useEffect, useRef, useState} from "react";
import "../../assets/styles/map/placeReviewEditor.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage, faStar} from "@fortawesome/free-solid-svg-icons";


import axios from "axios";
import instance from "../../utils/axios";


const PlaceReviewEditor = ({mapId, setReviewWriting, isEdited, setIsEdited, isModify, item}) => {
    const [newComment, setNewComment] = useState("")
    const [rating, setRating] = useState(5)
    const [images, setImages] = useState([]);
    const inputRef = useRef(null);

    const [id, setId] = useState()
    const imageUrl = "http://localhost:8080/file/image-print?filename=";

    useEffect(() => {
        if (item) {
            console.log(item);
            setNewComment(item.contents || "");
            setRating(item.rating || 5);
            setImages(item.map_comment_thumbnail_url || []);
            setId(item.id || null);
        }
    }, [item]);



    const onSubmitHandler = (e) => {
        e.preventDefault();
        instance({
            url: `/map/comment/register`,
            method: "post",
            data: {
                map_id:mapId,
                contents: newComment,
                rating: rating,
                map_comment_thumbnail_url:images
            }
        }).then((data) => {
            console.log(data);
            setReviewWriting(false)
            setIsEdited((prev) => !prev);

        })
    }

    const onModifyHandler = (e) => {
        e.preventDefault();
        instance({
            url: `/map/comment/update`,
            method: "PATCH",
            data: {
                id:id,
                map_id:mapId,
                contents: newComment,
                rating: rating,
                map_comment_thumbnail_url:images
            }
        }).then((data) => {
            console.log(data);
            setReviewWriting(false)
            setIsEdited(!isEdited);

        }).catch((error) => {
            console.log(error)
        })
        console.log(item);
    }

    const ImgUploadHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        if (file != null) {
            formData.append('image', new Blob([file], {type: 'multipart/form-data'}), file.name);

            axios({
                url: `http://localhost:8080/file/map-comment-image-upload`,
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

                <div className="stars">
                {[...Array(5)].map((_, i) => {
                    return (
                        <button key={"btn" + i} className={i < rating ? "selected" : ""}
                                onClick={() => setRating(i + 1)}>
                            <FontAwesomeIcon icon={faStar}/>
                        </button>
                    )
                })}
                </div>
                 <span className="rating-comment">{ratingComment}</span>


            </div>


            <form className="input-place-review" onSubmit={(e) => {
                isModify?onModifyHandler(e):onSubmitHandler(e)
            }}>

                <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)}/>
                <div className="btn-section">
                    <div className="img-upload-section">
                        <label className="input-file-button" htmlFor="input-file"><FontAwesomeIcon
                            icon={faImage}/></label>
                        <div className="images">
                            {images && images.slice(0, 2).map((filename, i) => {
                                return (<div className={`image  ${i == 1 ? "last-image " : ""}`}>
                                    <img className={`review-image ${i == 1 ? "dark" : ""}`} src={imageUrl + filename}
                                         alt=""/>
                                    <button className="delete-image" onClick={(e) => deleteImage(e, i)}>x</button>
                                    {(i == 1) && <span className={"count-text"}>{`+${images.length - 1}`}</span>}

                                </div>)
                            })}

                        </div>
                    </div>
                    <input id="input-file" ref={inputRef} onChange={(e) => ImgUploadHandler(e)} type="file"
                           accept="image/*"/>
                    <div className="buttons">
                        <button className="submit-button" onClick={()=>setReviewWriting(false)}>취소</button>

                        <button className="submit-button">등록</button>
                    </div>
                </div>
            </form>


        </div>

    )
}
export default PlaceReviewEditor