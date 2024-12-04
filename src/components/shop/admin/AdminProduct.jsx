import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight, faStar} from "@fortawesome/free-solid-svg-icons";
import "../../../assets/styles/shop/admin/adminProduct.scss"
import InputField from "../../common/InputField";
import instance from "../../../utils/axios";
const AdminProduct = ({item, isEdited, setIsEdited}) => {

    const [comment, setComment] = useState("")
    const [editPendingText, setEditPendingText] = useState(false)


    function pendingHandler() {
        console.log(comment)
        console.log(item.id)

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

    return (<>
            {/*<Link to={`http://localhost:3000/shop/detail/${item?.id}`}>*/}

            <tr className="product">
                <td className="no">{item?.id}</td>

                <td className="img"><img src={item["thumbnail_url"][0]} alt=""/></td>

                <td className="title">{item?.name}</td>
                <td className="detail">{item["item_detail"]}</td>

                <td className="category">
                    <span className="category-name">{item?.category}</span>
                    <span>{">"}</span>
                    <span className="detail-category">{item["detailed_category"]}</span>
                </td>

                <td className="stock">{item?.["stock_number"]}</td>
                <td className="status">{item?.["sell_status"]}</td>

                <td className="brand">{item?.seller}</td>
                <td className="price">{item?.options[0].price}원</td>

                <td>
                    <div>
                        {/*<button>옵션 보기</button>*/}
                        <button className="revoke" onClick={() => setEditPendingText(!editPendingText)}>중단</button>
                    </div>
                </td>


            </tr>

            {/*</Link>*/}

            {editPendingText && <>
                <tr>
                    <td colSpan={10}>
                    <textarea className="reason"
                              value={comment} onChange={(e) => setComment(e.target.value)}
                              placeholder="판매 중단 사유를 기재해주세요."
                              cols="30" rows="3"></textarea>
                    <button onClick={pendingHandler}> 확인</button>
                    </td>
                </tr>
                </>

            }
            </>

    );
};

export default AdminProduct;