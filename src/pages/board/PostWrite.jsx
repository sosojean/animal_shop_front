import {useCallback, useEffect, useRef, useState} from "react"
import WriteEditor from "../../components/board/WriteEditor"
import '../../assets/styles/board/postWrite.scss'
import {useLocation, useNavigate, useParams} from "react-router-dom";
import instance from "../../utils/axios";
import {toast} from "react-toastify";


export default function PostWrite(props) {
    const navigate = useNavigate();
    // 작성 내용(contents), 제목(title), 카테고리(category) 저장
    const editorRef = useRef(null);
    const {post_id}=useParams();
    const {state} = useLocation();

    const [title, setTitle] = useState('');
    // 카테고리 선택 최상단에 자유가 있으므로 디폴트 값으로 자유
    const [category, setCategory] = useState('fashion');
    const [isEdit, setIsEdit] = useState(false);


    useEffect(() => {
        if (state) {
            setIsEdit(true);
            setTitle(state.title);
            setCategory(state.category);

        } else {
            setIsEdit(false);
        }
    }, [])


    // 카테고리 선택할 때 저장
    function onSelectCategory(e) {
        //   console.log(e.target.value); // 테스트 코드
        setCategory(e.target.value);
    }

    const editSuccess = () => {
        navigate(`/board/${state.category}/${state.id}`);
        toast.success("수정이 완료되었습니다.")
    }
    const postSuccess = () => {
        navigate('/board');
        toast.success("작성이 완료되었습니다.")
    }

    // 제출할 때 db에 post
    const onClickEnrollBtn = useCallback(async () => {
        const markdown = editorRef.current.getInstance().getMarkdown(); // contents 가져오기
        // 타이틀 없을 때도 경고창
        // navigate 사용시 button의 내용이 일시적으로 사라지는 문제 발생 (추후에 해결해볼게요)
        if (!markdown) {
            alert('내용을 작성해주세요.');

        } else {
            const token = localStorage.getItem('accessToken'); // 토큰 가져오기
            const url = isEdit ? `/post/${state.category}/${state.id}/edit` : "/post/write"
            const method = isEdit ? "PUT" : "POST";
            // const finalTitle = isEdit ? state.title : title;
            // const url = "";

            // 보낼 데이터
            const data = {
                "title": title,
                "contents": markdown,
                "category": category
            }
            instance({
                method: method,
                url: url,
                data: data,
            })
                .then(() => {
                    isEdit?editSuccess():postSuccess()
                })
                .catch(error => console.error(error));
        }
    }, [category, title]);

    return (
        <div>
            <select name='category' value={category}
                    onChange={(e) => onSelectCategory(e)}
                    className="selectorCategory">

                <option value='fashion'>힙멍 힙냥</option>
                <option value='tips'>함께 키우는 꿀팁</option>
                <option value='daily'>반려동물과 함께한 하루</option>
                <option value='diy'>손으로 만드는 행복</option>
                <option value='growth'>건강하게 자라길</option>
                <option value='adoption'>새 가족 찾아요</option>
                <option value='must-try'>이건 써보셔야 해요!</option>
                <option value='memories'>걸으며 쌓는 추억</option>
                <option value='talk'>맘 속 이야기 나눠요</option>
                <option value='daily-photo'>우리 아이 사진 자랑</option>

            </select>
            <input placeholder='제목' name='title'
                   className="inputTitle"
                   value={title}
                   onChange={(e) => setTitle(e.target.value)}
            />
            <WriteEditor ref={editorRef} initialValue={state}/>
            <button onClick={onClickEnrollBtn}
                    className="submitButton">등록
            </button>
        </div>
    )
}