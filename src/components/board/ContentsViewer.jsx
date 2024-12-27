import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import instance from '../../utils/axios.jsx'
import {Viewer} from '@toast-ui/react-editor';
import HeartButton from './HeartButton.jsx';
import Comments from "../comment/Comments";
import {useModifyTime} from '../../utils/useModifyTime.jsx';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFaceGrinTears, faPenToSquare} from "@fortawesome/free-regular-svg-icons";
import {faHeart, faShare, faXmark} from "@fortawesome/free-solid-svg-icons";
import {categoryTrimmer} from "../../utils/categoryTrimmer";
import CopyUrlButton from "../common/CopyUrlButton";

import "../../assets/styles/board/contentViewer.scss"


const ContentsViewer = ({props}) => {


    const {category, post_id} = useParams();
    const [contentInfo, setContentInfo] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [heartStatus, setHeartStatus] = useState(contentInfo?.heart);
    const [countHeart, setCountHeart] = useState(contentInfo?.count_heart);
    const modifiedTime = useModifyTime(contentInfo?.createdDate);

    useEffect(() => {
        instance({
            method: "GET",
            url: `/post/${category}/${post_id}`
        })
            .then(response => {
                setContentInfo(response.data)
                setHeartStatus(response.data.heart)
                setCountHeart(response.data.count_heart)
            })
            .catch(error => console.error(error));

        instance({
            method: "GET",
            url: `/post/${category}/${post_id}/edit`
        })
            .then(response => {
                // console.log(response.data);
                if (response.data === true) {
                    setIsAuth(true)
                } else {
                    setIsAuth(false)
                }
            })
            .catch(error => console.error(error));

    }, [category, post_id]);
    const navigate = useNavigate();

    if (!contentInfo) {
        return (<p>데이터가 없습니다</p>)
    }


    // console.log('데이터: ', contentInfo);

    const editHandler = () => {
        navigate("/board/post/write", {state: contentInfo});
    }

    const deleteHandler = () => {
        instance({
            method: "DELETE",
            url: `/post/${category}/${post_id}/delete`

        }).then(response => {
            navigate("/post");
        }).catch(error => console.error(error));

    }

    return (
        <div>
            <div className="content-info-container">
                <div className="info-box">
                    <div className="content-info">
                        <h2> {categoryTrimmer(contentInfo.category)}</h2>
                        <h1> {contentInfo.title}</h1>
                    </div>
                    <div className="content-author-info">
                        <span className="user-name">{contentInfo.nickname}{" "}</span>
                        <FontAwesomeIcon icon={faHeart} className="faFaceGrinTears"/><span
                        className="hearts">{countHeart}</span>
                        <span className="modified-time"> {modifiedTime}{" "}·{" "}</span>
                        <span className="hits">조회 {contentInfo.hits}</span>
                    </div>
                </div>
                <div className="content-modify-button">
                    {isAuth ? (<>
                        <button onClick={editHandler}><FontAwesomeIcon icon={faPenToSquare}/>수정</button>
                        <button onClick={deleteHandler}><FontAwesomeIcon className="fa-xmark" icon={faXmark}/>삭제
                        </button>
                    </>) : null}
                    <CopyUrlButton/>
                </div>

            </div>

            <hr/>

            <div className="view-content">
                <Viewer
                    initialValue={contentInfo.contents}
                />
            </div>


            <div className="heart-button-container">
                <HeartButton
                    heartStatus={heartStatus}
                    setHeartStatus={setHeartStatus}
                    setCountHeart={setCountHeart}
                    countHeart={countHeart}
                />
            </div>


            <hr/>
            <Comments/>
        </div>
    );
};

export default ContentsViewer;