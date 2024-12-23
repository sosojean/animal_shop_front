import DefaultButton from "../../common/DefaultButton";
import instance from "../../../utils/axios"
import WikiComEditor from "./WikiComEditor";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faReply, faXmark} from "@fortawesome/free-solid-svg-icons";
import {faPenToSquare} from "@fortawesome/free-regular-svg-icons";

const WikiComItem = (props) => {

    const {data, getRefresh} = props;
    const isUpdate = true;
    const [showEditor, setShowEditor] = useState(false);
    const [isMine, setIsMine] = useState(false);

    // 댓글 삭제 API
    const handleDeleteComment = () => {
        instance({
            url: `/wiki/comment/${data.id}/delete`,
            method: "DELETE"
        }).then((res) => {
            // console.log("response", res.data);
            getRefresh();
            toast.success('댓글이 성공적으로 삭제되었습니다.');
        })
        .catch((err) => {
            console.error("error", err);
            toast.error('댓글 삭제 중 오류가 발생했습니다.');
        })
    }

    const getIsMyComment = () => {
        instance({
            url: `/wiki/comment/${data.id}/myComment`,
            method: "get"
        }).then((res) => {
            console.log("getIsMyComment response", res.data);
            setIsMine(res.data);
        })
        .catch((err) => {
            console.error("getIsMyComment error", err);
        })
    }

    useEffect(() => {
        getIsMyComment();
    }, []);

    return (
        <div className="wiki-comment-item">
            {showEditor ? (
                <WikiComEditor 
                    updatedData={data} 
                    update={isUpdate} 
                    setShowEditor={setShowEditor} 
                    getRefresh={getRefresh}
                /> 
            ) : (
                <>
                    <div className="comment-main">
                        <div className="comment-content">
                            <p className="author">{data.author}</p>
                            <p className="content">{data.content}</p>
                        </div>
                        {isMine && (
                            <div className="button-group">
                                <DefaultButton onClick={handleDeleteComment} className="default-button handle-button">
                                    <FontAwesomeIcon icon={faXmark} /> <span className="button-text">삭제</span>
                                </DefaultButton>
                                <DefaultButton onClick={() => setShowEditor(!showEditor)} className="default-button handle-button">
                                    {!showEditor && (
                                        <>
                                            <FontAwesomeIcon icon={faReply} /> <span className="button-text">수정</span>
                                        </>
                                    )}
                                </DefaultButton>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default WikiComItem;