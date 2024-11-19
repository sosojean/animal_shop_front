import "../../../assets/styles/shop/admin/sellerInfoItem.scss"
import instance from "../../../utils/axios";
const SellerInfoItem = (props) => {
    const item = props.item;
    // console.log(item);

    const registerSeller = (e) => {
        e.preventDefault();
        instance({
            url: `/admin/seller-ok?username=${item.username}`,
            method : "patch"
        })
    }

    const revokeSeller = (e) => {
        e.preventDefault();
        instance({
            url: `/admin/seller-revoke?username=${item.username}`,
            method : "patch"
        })
    }
    const deleteSeller = (e) => {
        e.preventDefault();
        instance({
            url: `/admin/seller-delete?username=${item.username}`,
            method : "delete"
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
                    <button onClick={registerSeller}> 등록</button>
                    <button onClick={revokeSeller}> 철회</button>
                    <button onClick={deleteSeller}> 삭제</button>

                </div>

            }


        </div>
    )
}
export default SellerInfoItem;