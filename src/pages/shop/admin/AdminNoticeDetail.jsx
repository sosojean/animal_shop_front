import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import instance from "../../../utils/axios";

const AdminNoticeDetail = () => {
    const [data, setData] = useState()
    const extensionToMimeType = {
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        gif: "image/gif",
        pdf: "application/pdf",
        csv: "text/csv",
        txt: "text/plain",
        json: "application/json",
    };


    const {noticeId} = useParams();
    useEffect(() => {
        instance({
            url:`/notices/select/${noticeId}`,
            method:"GET",
        }).then(res => {
            console.log(res);
            setData(res.data["noticesDTOList"][0])
            console.log(res.data["noticesDTOList"]);

        }).catch((error) => {
            console.log(error);
        })
    }, []);


    const fileDownloadHandler = ()=> {
        instance({
            url:`/file/download`,
            method:"post",
            data: {filePath: data.attachmentUrl},
            responseType: "arraybuffer"

        }).then((response) => {
            console.log(data["attachmentUrl"].split("_") )


            const fileName = data["attachmentUrl"].split("_")[2] || "download";
            const extension = fileName.split(".").pop().toLowerCase(); // 확장자 추출

            const mimeType = extensionToMimeType[extension] || "application/octet-stream";
            const url = URL.createObjectURL(new Blob([response.data], { type: mimeType }));
            const a = document.createElement("a");
            a.download = fileName; // 다운로드할 파일 이름

            a.href = url;
            // a.download = creatorDetailData.file_src.split("/").pop() || "download";

            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);


        }).catch((error) => {
            console.log(error);
        })

    }

    return ( <>
            {data &&
                <div>
                    <span>{data.content}</span>
                    <span>{data["created_date"]}</span>
                    <span>{data.id}</span>
                    <span>{data.name}</span>
                    <span>{data.priority}</span>
                    <span>{data.title}</span>
                    <span>{data.attachmentUrl}</span>

                    <button onClick={fileDownloadHandler}>다운</button>
                </div>
            }</>
    );
};

export default AdminNoticeDetail;