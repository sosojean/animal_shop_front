import {useCallback, useEffect, useRef, useState} from "react"
import {useLocation, useNavigate} from "react-router-dom";
import WriteEditor from "../../../components/board/WriteEditor";
import instance from "../../../utils/axios";
import AdminMenu from "../../../components/shop/admin/AdminMenu";
import {toast} from "react-toastify";


function AdminNoticeWrite(props) {
    const navigate = useNavigate();
    // 작성 내용(contents), 제목(title), 카테고리(category) 저장
    const editorRef = useRef(null);
    const {state} = useLocation();

    const [title, setTitle] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState()
    const [isNotImportant, setIsNotImportant] = useState(false)

    useEffect(() => {
        if (state) {
            console.log(state);
            setIsEdit(true);
            setTitle(state.title);
            setIsNotImportant(state.priority === 0);
            // const fileName = state.attachmentUrl.split("_")[2] || "download";

            const fileName = (() => {
                if (state.attachmentUrl) {
                    const parts = state.attachmentUrl.split("_");
                    return parts[2] || ""; // split 결과에서 2번째 요소를 반환하거나 빈 문자열
                }
                return ""; // attachmentUrl이 없으면 빈 문자열
            })();
            setFileName(fileName)

            console.log(state)

        } else {
            setIsEdit(false);
        }
    }, [])

    const onClickEnrollBtn = useCallback(async () => {
        const url = isEdit?`/notices/update/${state.id}`:"/notices/register"
        const method = isEdit?"PATCH":"POST";

        const markdown = editorRef.current.getInstance().getMarkdown(); // contents 가져오기

        if (!markdown) {
            alert('내용을 작성해주세요.');
            return
        }
        const formData = new FormData();
        const noticesDTO = {
            "title": title,
            "content": markdown,
            "priority": isNotImportant?0:1,
        }

        let blob = new Blob([JSON.stringify(noticesDTO)], {type: 'application/json'});
        formData.append("noticesDTO", blob);

        if (file != null) {
            formData.append('file', new Blob([file], {type: 'multipart/form-data'}),file.name);
        }


        instance({
            url: url,
            method: method,
            data: formData,
        }).then((response) => {
            console.log(response)
            toast.success("공지가 등록되었습니다.")
            navigate("/admin/notice")

        }).catch((error) => {
            console.log(error);
        })
    },  [title, file, navigate, isNotImportant]);

    const fileUpload = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name)
    }

    const onClickDeleteFile = (e)=>{
        setFile(null)
        setFileName(null)
    }

    return (

        <div>
            <AdminMenu/>
            <div>
                <input placeholder='제목' name='title'
                       className="inputTitle"
                       value={title}
                       onChange={(e) => setTitle(e.target.value)}/>
            </div>

            <WriteEditor ref={editorRef} initialValue={state}/>

            <div>
                <label htmlFor="file">파일{fileName} </label>
                <button onClick={onClickDeleteFile}>x</button>
            </div>

            <input name="file" id="file" onChange={fileUpload} type="file"/>
            <div>
                <label htmlFor="important">중요</label>
                <input onChange={e=>{setIsNotImportant(e.target.checked)}}
                       checked={isNotImportant}
                       name="important" id="important" type="checkbox"/>


                <button onClick={onClickEnrollBtn} className="submitButton">{isEdit?"수정":"등록"}</button>
            </div>


        </div>
    )
}

export default AdminNoticeWrite