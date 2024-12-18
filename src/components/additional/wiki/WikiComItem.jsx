import DefaultButton from "../../common/DefaultButton";
import instance from "../../../utils/axios"
import WikiComEditor from "./WikiComEditor";
import { useState } from "react";

const WikiComItem = (props) => {

    const {data, getRefresh} = props;
    const isUpdate = true;
    const [showEditor, setShowEditor] = useState(false);

    // 댓글 삭제 API
    const handleDeleteComment = () => {
        instance({
            url: `/wiki/comment/${data.id}/delete`,
            method: "DELETE"
        }).then((res) => {
            console.log("response", res.data);
            getRefresh();
        })
        .catch((err) => {
            console.error("error", err);
        })
    }

    return (
        <div>
            {showEditor ? 
                <WikiComEditor updatedData={data} update={isUpdate} 
                    setShowEditor={setShowEditor} getRefresh={getRefresh}/> : 
                <>
                    <div>
                        <p>{data.author}</p>
                        <p>{data.content}</p>                
                    </div>
                    <div>
                        <DefaultButton onClick={handleDeleteComment}>삭제</DefaultButton>
                    </div>                
                </>           
            }
            <DefaultButton onClick={() => setShowEditor(!showEditor)}>
                {showEditor ? "수정창 끄기" : "수정창 열기"}
            </DefaultButton>
        </div>
    )
}

export default WikiComItem;