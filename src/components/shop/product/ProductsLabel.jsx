import {Link} from "react-router-dom";

const ProductsLabel = (props) => {

    return(<div className="label">
        <span className="title">{props.name}</span>
       {props?.url&&
        <Link to={props.url} ><span>더보기</span></Link>}
        </div>
    )
}
export default ProductsLabel