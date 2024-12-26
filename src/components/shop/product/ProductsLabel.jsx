import {Link} from "react-router-dom";
import PetSelector from "../petSelector";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight} from "@fortawesome/free-solid-svg-icons";

const ProductsLabel = (props) => {

    return(
        <div className="label">
        <div>
            <span className="title">{props.name}</span>
            {props.isCustom&&
                <PetSelector />}
        </div>
       {props?.url&&
        <Link to={props.url} ><span>더보기 <FontAwesomeIcon icon={faAngleRight}/> </span></Link>}
        </div>
    )
}
export default ProductsLabel