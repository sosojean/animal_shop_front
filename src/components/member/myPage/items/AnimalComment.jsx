import React from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as solidHeart, faX} from "@fortawesome/free-solid-svg-icons";
import DefaultButton from "../../../common/DefaultButton";
import {useModifyTime} from "../../../../utils/useModifyTime";
import "../../../../assets/styles/comment/comment.scss"

const AnimalComment = ({item}) => {
    const modifiedTime = useModifyTime(item.createdDate)

    return (
        <div>

            <div id={item.id} className={"comment"}>
                <Link to={`/adoption/detail/${item.abandoned_animal_id}`}>

                    <div className="info-section">
                        <div className="author-info">
                            {/*{!parentList.has(comment.parent?.id) ? <span> {idNicknameMap&&idNicknameMap[comment.parent?.id]} </span> : null}*/}
                            <span className="nickname"> {item.author} </span>
                            <span className="modified-time"> {modifiedTime} </span>
                        </div>
                        <span> {item.content} </span>

                    </div>
                </Link>

                {/*{isWritten ?*/}
                {/*    <DefaultButton onClick={() => deleteHandler()}><FontAwesomeIcon*/}
                {/*        icon={faX}/>삭제</DefaultButton>*/}

                {/*    :*/}
                {/*    <DefaultButton onClick={() => heartHandler("delete")}><FontAwesomeIcon*/}
                {/*        icon={solidHeart}/>취소</DefaultButton>}*/}
            </div>

        </div>
    );
};

export default AnimalComment;