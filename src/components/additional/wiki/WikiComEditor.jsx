import DefaultButton from "../../common/DefaultButton";
import instance from "../../../utils/axios";
import { useState } from "react";

const WikiComEditor = (props) => {

    const {id} = props;
    const [comment, setComment] = useState("")

    const handleRegisterComment = () => {

        const postData = {"content":comment};

        instance({
            url: `/wiki/comment/${id}/register`,
            method: "post",
            data: postData
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
            <div>
                <DefaultButton onClick={handleRegisterComment}>등록</DefaultButton>              
            </div>
        </div>
    )
}

export default WikiComEditor;