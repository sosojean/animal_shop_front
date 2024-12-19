import DefaultButton from "../../common/DefaultButton";
import instance from "../../../utils/axios"
import WikiComEditor from "./WikiComEditor";
import { useState, useEffect } from "react";

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
            console.log("response", res.data);
            getRefresh();
        })
        .catch((err) => {
            console.error("error", err);
        })
    }

    const getIsMyComment = () => {
        instance({
            url: `/wiki/comment/${data.id}/myComment`,
            method: "get"
        }).then((res) => {
            console.log("getIsMyComment response", res.data);
            setIsMine(res.data);
            // getRefresh();
        })
        .catch((err) => {
            console.error("getIsMyComment error", err);
        })
    }

    useEffect(() => {
        getIsMyComment();
    }, []);

    return (
        <div>
            {showEditor ? 
                <WikiComEditor updatedData={data} update={isUpdate} 
                    setShowEditor={setShowEditor} getRefresh={getRefresh}/> : 
                <>
                    <div>
                        <p><b>{data.author}</b></p>
                        <p>{data.content}</p>                
                    </div>
                    {isMine &&
                        <div>
                            <DefaultButton onClick={handleDeleteComment}>삭제</DefaultButton>
                        </div>                      
                    }
                </>           
            }
            {isMine &&
                <DefaultButton onClick={() => setShowEditor(!showEditor)}>
                    {showEditor ? "수정창 끄기" : "수정창 열기"}
                </DefaultButton>            
            }
        </div>
    )
}

export default WikiComItem;