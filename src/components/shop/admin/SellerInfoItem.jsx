import "../../../assets/styles/shop/admin/sellerInfoItem.scss"
import instance from "../../../utils/axios";
import {useState} from "react";
import DefaultButton from "../../common/DefaultButton";
import {toast} from "react-toastify";
const SellerInfoItem = (props) => {
    const item = props.item;
    // console.log(item);

    const registerSeller = (e) => {
        e.preventDefault();
        instance({
            url: `/admin/seller-ok?username=${item.username}`,
            method : "patch"
        }).then((res)=>{
            toast.success(`${item.username}이 판매자로 등록되었습니다.`)
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
            toast.success(`${item.username}이 일반사용자로 변경되었습니다.`)

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
        <div className={`seller-info-item ${props.isHeader?"header":""}`}>
            <span className="user-name">{item.username}</span>
            <span className="email">{item.bln}</span>
            <span className="phone">{item.phone_number}</span>
            <span className="info">{item.contents}</span>
            <span className="info">{item.category}</span>

            {props.isHeader ? <span>권한 승인</span> :
                <div className="auth-buttons">
                    {item.state ?
                        <DefaultButton className={"mid default"} onClick={revokeSeller}> 철회</DefaultButton>:
                        <DefaultButton className={"mid default"} onClick={registerSeller}> 등록</DefaultButton>}
                    <DefaultButton className={"mid alert"} onClick={deleteSeller}> 삭제</DefaultButton>

                </div>

            }


        </div>
    )
}
export default SellerInfoItem;