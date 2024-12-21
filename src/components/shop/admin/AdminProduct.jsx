import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight, faStar} from "@fortawesome/free-solid-svg-icons";
import "../../../assets/styles/shop/admin/adminProduct.scss"
import InputField from "../../common/InputField";
import instance from "../../../utils/axios";
import DefaultButton from "../../common/DefaultButton";
import { allItemCategory, dogItemCategory, sellStatusCategory } from '../../../utils/categoryOption';

const AdminProduct = ({item, isEdited, setIsEdited}) => {

    const [comment, setComment] = useState("")
    const [editPendingText, setEditPendingText] = useState(false)

    const getConvertedName = (name, type) => {
        let existedIndex;

        // type = priceTrimmer
        switch(type){
            case "category":
                existedIndex = dogItemCategory.findIndex(v => v.main.name === name);
                if (existedIndex > -1) {return dogItemCategory[existedIndex].main.convert;}
                else {return "카테고리";}
            case "detail":
                existedIndex = allItemCategory.findIndex(v => v.name === name);
                if (existedIndex > -1) {return allItemCategory[existedIndex].convert;}
                else {return "세부카테고리";}
            case "status":
                existedIndex = sellStatusCategory.findIndex(v => v.name === name.toUpperCase());
                if (existedIndex > -1) {return sellStatusCategory[existedIndex].convert;}
                else {return "판매상태";}
        }
    }


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

                <td className="img"><img className="table-image" src={item["thumbnail_url"][0]} alt=""/></td>

                <td className="title">{item?.name}</td>
                <td className="detail">{item["item_detail"]}</td>

                <td className="category">
                    <span className="category-name">{getConvertedName(item?.category,"category")}</span>
                    <span>{">"}</span>
                    <span className="detail-category">
                        {getConvertedName(item["detailed_category"],"detail")}
                    </span>
                </td>

                <td className="stock">{item?.["stock_number"]}</td>
                <td className="status">{getConvertedName(item?.["sell_status"],"status")}</td>

                <td className="brand">{item?.seller}</td>
                <td className="price">{item?.options[0]?.price}원</td>

                <td>
{/*
                    <div>
*/}
                        {/*<button>옵션 보기</button>*/}
                        <button className="revoke button" onClick={() => setEditPendingText(!editPendingText)}>중단</button>
                    {/*</div>*/}
                </td>


            </tr>

            {/*</Link>*/}

            {editPendingText && <>
                <tr>
                    <td colSpan={10}>
                        <div className="reason-container">
                            <textarea className="reason"
                                      value={comment} onChange={(e) => setComment(e.target.value)}
                                      placeholder="판매 중단 사유를 기재해주세요."
                                      cols="30" rows="3"></textarea>
                            <div className={"btn-container"}>
                                <DefaultButton className="small primary" onClick={pendingHandler}> 확인</DefaultButton>
                                <DefaultButton className="small default"
                                        onClick={() => setEditPendingText(!editPendingText)}>취소
                                </DefaultButton>

                            </div>
                        </div>
                    </td>
                </tr>
            </>

            }
        </>

    );
};

export default AdminProduct;