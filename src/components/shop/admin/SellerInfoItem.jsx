import "../../../assets/styles/shop/admin/sellerInfoItem.scss"
import instance from "../../../utils/axios";
import {useState} from "react";
const SellerInfoItem = (props) => {
    const item = props.item;
    // console.log(item);

    const registerSeller = (e) => {
        e.preventDefault();
        instance({
            url: `/admin/seller-ok?username=${item.username}`,
            method : "patch"
        }).then((res)=>{
            props.setIsEdited(!props.isEdited)
        })
    }

    const revokeSeller = (e) => {
        e.preventDefault();
        instance({
            url: `/admin/seller-revoke?username=${item.username}`,
            method : "patch"
        }).then((res) => {
            console.log(res)
            props.setIsEdited(!props.isEdited)
        })
    }
    const deleteSeller = (e) => {
        e.preventDefault();
        instance({
            url: `/admin/seller-delete?username=${item.username}`,
            method : "delete"
        }).then((res) => {
            props.setIsEdited(!props.isEdited)
        })
    }


    return (
        <div className="seller-info-item">
            <span className="user-name">{item.username}</span>
            <span className="email">{item.bln}</span>
            <span className="phone">{item.phone_number}</span>
            <span className="info">{item.contents}</span>
            <span className="info">{item.category}</span>

            {props.isHeader ? <span>권한 승인</span> :
                <div className="auth-buttons">
                    {item.state ?
                        <button onClick={revokeSeller}> 철회</button>:
                        <button onClick={registerSeller}> 등록</button>}
                    <button onClick={deleteSeller}> 삭제</button>

                </div>

            }


        </div>
    )
}
export default SellerInfoItem;