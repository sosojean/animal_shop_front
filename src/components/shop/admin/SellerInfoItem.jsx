import "../../../assets/styles/shop/admin/sellerInfoItem.scss"
const SellerInfoItem = (props) => {
    const item = props.item;
    // console.log(item);

    return (
        <div className="seller-info-item">
            <span className="user-name">{item.username}</span>
            <span className="email">{item.email}</span>
            <span className="phone">{item.phone}</span>
            <span className="info">{item.website}</span>
            {props.isHeader ?<span>권한 승인</span>:
                <div className="auth-buttons">
                    <button> 등록</button>
                    <button> 철회</button>
                </div>

            }


        </div>
    )
}
export default SellerInfoItem;