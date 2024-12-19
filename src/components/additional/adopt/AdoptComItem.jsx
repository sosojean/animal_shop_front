import DefaultButton from "../../common/DefaultButton";
import instance from "../../../utils/axios"
import { useEffect, useState } from "react";
import AdoptComEditor from "./AdooptComEditor";

const AdoptComItem = (props) => {

    const {data, getRefresh} = props;
    const isUpdate = true;
    const [showEditor, setShowEditor] = useState(false);
    const [isMine, setIsMine] = useState(false);

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

    const getIsMyComment = () => {
        instance({
            url: `/abandoned_animal/${data.id}/myComment`,
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
                <AdoptComEditor updatedData={data} update={isUpdate} 
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
                    {showEditor ? "수정 취소" : "댓글 수정"}
                </DefaultButton>            
            }
        </div>
    )
}

export default AdoptComItem;