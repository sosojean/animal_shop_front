import DefaultButton from "../../common/DefaultButton";
import instance from "../../../utils/axios";
import { useState } from "react";

const WikiComEditor = (props) => {

    const {id} = props;
    const [comment, setComment] = useState("")

    const handleRegisterComment = () => {
        instance({
            url: `/wiki/comment/${id}/comment`,
            method: "post",
            // data: data
        }).then((res) => {
            console.log("response", res);
        })
        .catch((err) => {
            console.error("error", err);
        })
    }
    
    return (
        <div>
            <textarea 
                onChange={(e) => setComment(e.target.value)} 
                placeholder="댓글을 작성해주세요"/>
            <DefaultButton>등록</DefaultButton>
        </div>
    )
}

export default WikiComEditor;