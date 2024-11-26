import '../../../../assets/styles/shop/product/productQnA.scss'
import {useEffect, useState} from "react";
import axios from "axios";
import instance from "../../../../utils/axios";
import {useModifyTime} from "../../../../utils/useModifyTime";

const ProductQnA = ({item,isEdited,setIsEdited,position}) => {

    const date = useModifyTime(item.createdDate)
    const [isEdit, setIsEdit] = useState(false)
    const [reply, setReply] = useState("")

    const deleteHandler = () => {
        instance({
            url:`/item/query/delete/${item['item_query_id']}`,
            method:"DELETE",

        }).then((data) => {
            setIsEdited(!isEdited)

            // console.log(data);
        }).catch((error) => {
            // console.log(error)
        })
    }

    const answerDeleteHandler = () => {
        instance({
            url:`/seller/query/reply/${item['item_query_id']}`,
            method:"PATCH",

        }).then((data) => {
            setIsEdited(!isEdited)

            // console.log(data);
        }).catch((error) => {
            console.log(error)
        })
    }

    const answerHandler = () => {
        // console.log(reply)

        instance({
            url:`/seller/query/comment/${item['item_query_id']}`,
            method:"patch",
            data:{

                option_name:item['option_name'],
                option_price:item['option_price'],
                reply:reply
            }
        }).then(res=>{
            setIsEdit(!isEdit)

            // console.log(res)
            setIsEdited(!isEdited)
        }).catch(err=>{
            console.log(err)
        })
    }



    return (
        <div className="qnaContainer">
            <div className="qnaInfoContainer">
                <p><b>{item.customer}</b></p>
                <p>{date}</p>
                <p>{item.option_name}</p>
            </div>

            <p className="qnaContent">
                {item.contents}
            </p>
            {item.reply&&<p className="answer">{item.reply}</p>}
            {position != "seller" ?
                <button onClick={deleteHandler}>삭제</button> :

                isEdit ? <>

                    <textarea class="reply"
                              onChange={e => {
                                  setReply(e.target.value)
                              }}
                              className="edit-review" cols="30" rows="10"/>
                        <button onClick={answerHandler}>확인</button>
                        <button onClick={() => {
                            setIsEdit(false)
                        }}>취소
                        </button>
                    </> :
                    <>
                        <button onClick={answerDeleteHandler}>삭제</button>
                        <button onClick={() => setIsEdit(true)}> 답변하기</button>
                    </>
            }


        </div>

    )
}

export default ProductQnA;