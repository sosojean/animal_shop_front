import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import "../../../assets/styles/shop/admin/adminProduct.scss"
import InputField from "../../common/InputField";
import instance from "../../../utils/axios";
const AdminProduct = ({item, isEdited, setIsEdited}) => {

    const [comment, setComment] = useState("")
    const [editPendingText, setEditPendingText] = useState(false)


    function pendingHandler() {
        console.log(comment)
        console.log(item.id)
        // {
        //     "itemId" : 44,
        //     "suspensionReason" : " 이 아이템은 너무 비쌉니다. "
        // }

        instance({
            url:`/admin/item_stop`,
            method:'POST',
            data:{
                itemId: item.id,
                suspensionReason:comment
            }
        }).then(res=>{
            setEditPendingText(false)
            setIsEdited(!isEdited)
            console.log(res)
        }).catch((error) => {
            console.log(error)
        })

    }

    return (
        <div className="admin-product">
            {/*<Link to={`http://localhost:3000/shop/detail/${item?.id}`}>*/}

                <div className="product">

                    <img src={item["thumbnail_url"]} alt=""/>
                    <div className="product-info">
                        <span className="title">{item?.name}</span>
                        <span className="brand">{item?.nickname}</span>
                        <span className="price">{item?.price}원</span>

                    </div>
                    <button onClick={()=>setEditPendingText(!editPendingText)}>판매 중단</button>

                </div>

            {/*</Link>*/}

            {editPendingText && <>
                    <textarea className="reason"
                              value={comment} onChange={(e) => setComment(e.target.value)}
                              placeholder="판매 중단 사유를 기재해주세요."
                              cols="30" rows="3"></textarea>
                    <button onClick={pendingHandler}> 확인</button>
                </>

            }
            <hr/>
        </div>

    );
};

export default AdminProduct;