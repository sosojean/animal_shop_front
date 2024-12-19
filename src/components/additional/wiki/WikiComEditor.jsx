import DefaultButton from "../../common/DefaultButton";
import instance from "../../../utils/axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const WikiComEditor = (props) => {

    const {id, updatedData, update, setShowEditor, getRefresh} = props;
    const [comment, setComment] = useState("")
    const isUpdate = update || false;

    // 댓글 등록 api
    const handleRegisterComment = () => {

        const postData = {"content":comment};

        instance({
            url: `/wiki/comment/${id}/register`,
            method: "post",
            data: postData
        }).then((res) => {
            // console.log("response", res);
            getRefresh();
            toast.success('댓글이 성공적으로 등록되었습니다.');
        })
        .catch((err) => {
            console.error("error", err);
            toast.error('댓글 등록 중 오류가 발생했습니다.');
        })
    }

    // 댓글 수정 api
    const handleUpdateComment = () => {

        const postData = {"content":comment, "author": updatedData.author};

        instance({
            url: `/wiki/comment/${updatedData.id}/update`,
            method: "PATCH",
            data: postData
        }).then((res) => {
            // console.log("response", res);
            toast.success('댓글이 성공적으로 수정되었습니다.');
            getRefresh();
        })
        .catch((err) => {
            console.error("error", err);
            toast.error('댓글 수정 중 오류가 발생했습니다.');
        })
    }

    const handleChooseApi = () => {
        if (isUpdate) {
            handleUpdateComment();
            setShowEditor(false);
        }
        else {
            handleRegisterComment();
            setComment("");
        }
            
    }

    useEffect(() => {
        if (isUpdate)
            setComment(updatedData.content);
      }, []);
    
    return (
        <div>
            <textarea 
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                placeholder="댓글을 작성해주세요"/> 
            <DefaultButton onClick={handleChooseApi}>등록</DefaultButton>
        </div>
    )
}

export default WikiComEditor;