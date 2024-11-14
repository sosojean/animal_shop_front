import {Link} from "react-router-dom";

const ProductsLabel = (props) => {

    return(<div className="label">
        <span className="title">신상품</span>
        <Link to={"#"} ><span>더보기</span></Link>
        </div>
    )
}
export default ProductsLabel