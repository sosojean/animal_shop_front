import DefaultButton from "../../common/DefaultButton";
import instance from "../../../utils/axios"
import { useState } from "react";
import AdoptComEditor from "./AdooptComEditor";

const AdoptComItem = (props) => {

    const {data, getRefresh} = props;
    const isUpdate = true;
    const [showEditor, setShowEditor] = useState(false);

    console.log("adoptcomitem data", data);

    // 댓글 삭제 API
    const handleDeleteComment = () => {
        instance({
            url: `/abandoned_animal/${data.id}/comments/delete`,
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
                <AdoptComEditor updatedData={data} update={isUpdate} 
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
                {showEditor ? "수정 취소" : "댓글 수정"}
            </DefaultButton>
        </div>
    )
}

export default AdoptComItem;