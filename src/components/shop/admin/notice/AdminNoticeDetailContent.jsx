import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import instance from "../../../../utils/axios";
import {Viewer} from "@toast-ui/react-editor";
import "../../../../assets/styles/board/contentViewer.scss"
import AdminMenu from "../AdminMenu";
import {useModifyTime} from "../../../../utils/useModifyTime";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-regular-svg-icons";
import {faFloppyDisk, faShare, faXmark} from "@fortawesome/free-solid-svg-icons";
import DefaultButton from "../../../common/DefaultButton";


const AdminNoticeDetailContent = ({isSeller}) => {
    const [data, setData] = useState()
    const [isAuth, setIsAuth] = useState(true)
    const modifiedTime = useModifyTime(data?.created_date);
    const navigate = useNavigate()
    const [fileName, setFileName] = useState(null)

    useEffect(() => {
        console.log(fileName)
    }, [fileName]);

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
            console.log(res.data["noticesDTOList"][0]["attachmentUrl"]);
            const fileName = (() => {
                const attachmentUrl = res.data?.noticesDTOList?.[0]?.attachmentUrl;
                if (attachmentUrl) {
                    const parts = attachmentUrl.split("_");
                    return parts[2] || ""; // split 결과에서 2번째 요소를 반환하거나 빈 문자열
                }
                return ""; // attachmentUrl이 없으면 빈 문자열
            })();
            setFileName(fileName)
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



            const extension = fileName.split(".").pop().toLowerCase(); // 확장자 추출

            const mimeType = extensionToMimeType[extension] || "application/octet-stream";
            const url = URL.createObjectURL(new Blob([response.data], { type: mimeType }));
            const a = document.createElement("a");
            a.download = fileName; // 다운로드할 파일 이름

            a.href = url;

            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);


        }).catch((error) => {
            console.log(error);
        })

    }

    const editHandler = () => {
        const trimmedData = {...data}
        trimmedData.contents = trimmedData.content;
        delete trimmedData.content;
        console.log(trimmedData);

        navigate("/admin/notice/write", {state: trimmedData});
    }

    const deleteHandler = () => {
        instance({
            method: "DELETE",
            url: `/notices/delete/${data.id}`

        }).then(response => {
            console.log(response)
            navigate("/admin/notice");
        }).catch(error => console.error(error));

    }


    return ( <>

            {data &&
                <div>

                    <div className="content-container">
                        <div className="content-info-container">
                            <div className="info-box">
                                <div className="content-info">
                                    {/*<h2> {data.category}</h2>*/}
                                    <span>{data.priority == 0 ? <span className="important">필독</span> : ''}</span>
                                    <h1> {data.title}</h1>
                                </div>
                                <div className="content-author-info">
                                    <span className="user-name">{data.name}{" "}</span>

                                    <span className="modified-time">{" "}·{" "} {modifiedTime}</span>
                                    {/*<span className="hits">조회 {data.hits}</span>*/}
                                </div>
                            </div>

                            <div className="content-modify-button">
                                {isAuth ? (<>
                                    {!isSeller && <>
                                        <button onClick={editHandler}><FontAwesomeIcon icon={faPenToSquare}/>수정</button>
                                        <button onClick={deleteHandler}>
                                            <FontAwesomeIcon className="fa-xmark" icon={faXmark}/>삭제</button></>
                                    }
                                </>) : null}
                                <button><FontAwesomeIcon icon={faShare}/>공유</button>
                            </div>

                        </div>

                        <hr/>

                        {(fileName===""||null)
                            ?"":


                            <div className="row file-download">
                                <label className="download" htmlFor="download">첨부파일 다운로드 {fileName}</label>
                                <button id="download" name="download"  onClick={fileDownloadHandler}>
                                    <FontAwesomeIcon icon={faFloppyDisk}/>
                                </button>
                            </div>
                        }

                        <div className="view-content">
                            <Viewer initialValue={data.content}/>
                        </div>




                        <hr/>
                        <div className="list-button-container">
                            <Link to={"/admin/notice"}>
                            <DefaultButton className="primary long">목록보기</DefaultButton>
                            </Link>
                        </div>
                    </div>
                </div>
            }</>
    );
};

export default AdminNoticeDetailContent;