import { Link } from "react-router-dom";

const ItemRegButton = () => {

    return (
        <Link to="/seller/item/new">
            <button>상품 등록</button>
        </Link>
    )
}

export default ItemRegButton;