import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as regularHeart, faPenToSquare} from "@fortawesome/free-regular-svg-icons";
import {faHeart as solidHeart, faReply, faX, faXmark} from "@fortawesome/free-solid-svg-icons";
import CommentEditor from "../../../comment/CommentEditor";
import "../../../../assets/styles/comment/comment.scss"
import {useModifyTime} from "../../../../utils/useModifyTime";
import {Link} from "react-router-dom";
import instance from "../../../../utils/axios";
import DefaultButton from "../../../common/DefaultButton";

const MyPageComment = ({item ,setIsEdit ,isEdit, isWritten}) => {

    const modifiedTime = useModifyTime(item.createdDate)
    let url;
    if (item.imageUrl) {
        url = `${process.env.REACT_APP_API}/file/comment?filename=` + item.imageUrl[0]
    }
    const heartHandler = (method) => {
        instance({
            url: `/comment_heart/${method}/${item.id}`,
            method:"get"

        }).then((response) => {
            console.log(response.data)
            setIsEdit(!isEdit)
        })
            .catch((error) => {console.log(error)})
    }

    const deleteHandler = () => {
        instance({
            url: `${process.env.REACT_APP_API}/comment/delete/${item.id}`,
            method: "DELETE"
        }).then(() => {
            setIsEdit(!isEdit)
        }).catch((error) => {
            console.log(error)
        })
    }


    return (


            <div id={item.id} className={"comment"}>
                <Link to={`/${item.postCategory}/${item.postId}`}>

                <div className="info-section">
                    <div className="author-info">
                        {/*{!parentList.has(comment.parent?.id) ? <span> {idNicknameMap&&idNicknameMap[comment.parent?.id]} </span> : null}*/}
                        <span className="nickname"> {item.nickname} </span>
                        <span className="modified-time"> {modifiedTime} </span>
                        <span className="heart"> <FontAwesomeIcon icon={solidHeart}/>{" " + item.countHeart} </span>
                    </div>
                    <span> {item.content} </span>

                    {item.imageUrl && <img className="commentImg" src={url}/>}
                </div>
                </Link>

                {isWritten ?
                    <DefaultButton onClick={() => deleteHandler()}><FontAwesomeIcon
                        icon={faX}/>삭제</DefaultButton>

                    :
                    <DefaultButton onClick={() => heartHandler("delete")}><FontAwesomeIcon
                        icon={solidHeart}/>취소</DefaultButton>}
            </div>


    );
};

export default MyPageComment;