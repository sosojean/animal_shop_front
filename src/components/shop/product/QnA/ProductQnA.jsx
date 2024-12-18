import '../../../../assets/styles/shop/product/productQnA.scss'
import {useEffect, useState} from "react";
import axios from "axios";
import instance from "../../../../utils/axios";
import {useModifyTime} from "../../../../utils/useModifyTime";
import DefaultButton from "../../../common/DefaultButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faA, faQ} from "@fortawesome/free-solid-svg-icons";
import {toast} from "react-toastify";

const ProductQnA = ({item,isEdited,setIsEdited,position}) => {

    const date = useModifyTime(item.createdDate)
    const [isEdit, setIsEdit] = useState(false)
    const [reply, setReply] = useState("")

    const deleteHandler = () => {
        instance({
            url:`/item/query/delete/${item['item_query_id']}`,
            method:"DELETE",

        }).then((data) => {
            toast.success("삭제 성공")
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

    const nameMaskingMaker = (name) => {
        const maskingCount = Math.ceil(name.length / 2); // Number of characters to mask
        const start = Math.ceil((name.length - maskingCount) / 2); // Start position for masking
        const end = start + maskingCount; // End position for masking

        // Replace the masked portion with '*'
        const maskedName = name.slice(0, start) + '*'.repeat(maskingCount) + name.slice(end);

        return maskedName; // Return the masked name
    };



    return (
        <div className="qnaContainer">
            <div className="qnaInfoContainer">
                <span><b>{nameMaskingMaker(item.customer)}</b></span>
                <span>{date}</span>
                <span>{item.option_name}</span>
            </div>

            <p className="qnaContent">
                <FontAwesomeIcon icon={faQ}/>{" "+ item.contents}
            </p>
            {item.reply ? <p className="answer"><FontAwesomeIcon icon={faA}></FontAwesomeIcon> {item.reply}</p> :
                !isEdit&&<p className="placeholder">아직 답변이 등록되지 않았습니다.</p>}
            {position != "seller" ?
                <div className={"btn-container"}>
                <DefaultButton className={"small default delete"} onClick={deleteHandler}>삭제</DefaultButton>
                </div>:

                isEdit ? <>

                    <textarea onChange={e => {
                                  setReply(e.target.value)
                              }}
                              className="edit-review" cols="30" rows="10"/>
                        <button onClick={answerHandler}>확인</button>
                        <button onClick={() => {
                            setIsEdit(false)
                        }}>취소
                        </button>
                    </> :
                    <div className={"btn-container"}>
                        {item.reply&&
                            <DefaultButton className={"small primary"} onClick={answerDeleteHandler}>삭제</DefaultButton>
                        }
                        {!item.reply&&<DefaultButton  className={"small default"} onClick={() => setIsEdit(true)}> 답변</DefaultButton>
                        }
                    </div>
            }


        </div>

    )
}

export default ProductQnA;