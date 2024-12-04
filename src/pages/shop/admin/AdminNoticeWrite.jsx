import {useCallback, useEffect, useRef, useState} from "react"
import {useLocation, useNavigate} from "react-router-dom";
import WriteEditor from "../../../components/board/WriteEditor";
import instance from "../../../utils/axios";


function AdminNoticeWrite(props) {
    const navigate = useNavigate();
    // 작성 내용(contents), 제목(title), 카테고리(category) 저장
    const editorRef = useRef(null);
    const {state} = useLocation();

    const [title, setTitle] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [file, setFile] = useState();
    // const [fileName, setFileName] = useState()


    useEffect(() => {
        if (state) {
            console.log(state);
            setIsEdit(true);
            setTitle(state.title);

        } else {
            setIsEdit(false);
        }
    }, [])




    const onClickEnrollBtn = useCallback(async () => {
        const markdown = editorRef.current.getInstance().getMarkdown(); // contents 가져오기

        if (!markdown) {
            alert('내용을 작성해주세요.');

        } else {

            const formData = new FormData();

            const noticesDTO = {
                "title": title,
                "content": markdown,
                "priority": 0,
            }

            let blob = new Blob([JSON.stringify(noticesDTO)], {type: 'application/json'});
            formData.append("noticesDTO", blob);

            if (file != null) {
                formData.append('file', new Blob([file], {type: 'multipart/form-data'}),file.name);
            }

            try {


                for (const value of formData.values()) {
                    console.log("formdata",value);
                };


                instance({
                    url: "/notices/register",
                    method: "post",
                    data: formData,
                }).then((response) => {
                    console.log(response)

                })
            } catch (error) {
                console.log(error)
            }


        }
    },  [title, file, navigate]);



    const fileUpload = (e) => {
        // console.log("upload",e.target.files[0]);
        setFile(e.target.files[0]);
        // setFileName(e.target.files[0]);

    }
    return (
        <div>
            <input placeholder='제목' name='title'
                   className="inputTitle"
                   value={title}
                   onChange={(e) => setTitle(e.target.value)}/>
            <WriteEditor ref={editorRef} initialValue={state}/>
            <input onChange={fileUpload} type="file"/>
            <button onClick={onClickEnrollBtn} className="submitButton">등록</button>

        </div>
    )
}

export default AdminNoticeWrite