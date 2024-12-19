import DefaultButton from "../../common/DefaultButton";
import instance from "../../../utils/axios";
import { useState, useEffect } from "react";

const AdoptComEditor = (props) => {

    const {id, updatedData, update, setShowEditor, getRefresh} = props;
    const [comment, setComment] = useState("")
    const isUpdate = update || false;

    // 댓글 등록 api
    const handleRegisterComment = () => {

        const postData = {"content":comment};

        instance({
            url: `/abandoned_animal/${id}/comments/register`,
            method: "post",
            data: postData
        }).then((res) => {
            console.log("response", res);
            getRefresh();
        })
        .catch((err) => {
            console.error("error", err);
        })
    }

    // 댓글 수정 api
    const handleUpdateComment = () => {

        const postData = {"content":comment, "author": updatedData.author};

        instance({
            url: `/abandoned_animal/${updatedData.id}/comments/update`,
            method: "PATCH",
            data: postData
        }).then((res) => {
            console.log("response", res);
            getRefresh();
        })
        .catch((err) => {
            console.error("error", err);
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

export default AdoptComEditor;