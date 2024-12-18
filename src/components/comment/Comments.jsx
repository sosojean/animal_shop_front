import axios from "axios";
import {useEffect, useState} from "react";
import Comment from "./Comment";
import {useParams} from "react-router-dom";
import CommentEditor from "./CommentEditor";
import instance from "../../utils/axios";

const Comments = () => {
    const {post_id} = useParams()
    const [data, setData] = useState("")
    const [commentSummited, setCommentSummited] = useState(false);
    const [parent, setParent] = useState(null)

    const [sortedData, setSortedData] = useState()
    const [idNicknameMap, setIdNicknameMap] = useState()
    useEffect(() => {
        // console.log("postid =" + post_id);
        instance({
            method: 'get',
            url: `/comment/${post_id}`,
        }).then(({data}) => {
            // console.log(data)
            setData(data.comments)
            const { sortedData, idToNickname } = replySort(data.comments); // **replySort 반환값 구조분해**

            setSortedData(sortedData)
            setIdNicknameMap(idToNickname)
        }).catch((error) => {
            console.log(error)
        });
        setCommentSummited(false);
    }, [commentSummited])

    const replySort = (data) => {
        const map = new Map();
        const finalList = new Set();
        const parentList = new Set();
        const idToNickname = {}; // **ID와 닉네임 매핑 저장용** (추가)


        data.forEach((item) => {
            map.set(item.id, []);
            idToNickname[item.id] = item.nickname; // **id와 nickname을 매핑** (추가)

            if (item.parent?.id) {
                const children = map.get(item.parent.id) || [];
                children.push(item.id);
                map.set(item.parent.id, children);
            } else {
                parentList.add(item.id);
            }
        });

        const addToFinalList = (id) => {
            if (finalList.has(id)) return;
            finalList.add(id);
            const children = map.get(id) || [];
            children.forEach((childId) => addToFinalList(childId));
        };

        data.forEach((item) => {
            if (!item.parent) {
                addToFinalList(item.id);
            }
        });

        const order = Array.from(finalList);
        const sortedData = data.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
        setParent(parentList);

        return {sortedData, idToNickname};
    };


    return (<>
        {data ? data.map((comment) => {
            return (<Comment key={comment.id} commentSummited={commentSummited} setCommentSummited={setCommentSummited}
                             parentList={parent} comment={comment} idNicknameMap={idNicknameMap}/>)
        }) : null}

        <CommentEditor commentSummited={commentSummited} setCommentSummited={setCommentSummited}></CommentEditor>


    </>)
}

export default Comments;