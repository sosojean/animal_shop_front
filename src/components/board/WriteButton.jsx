import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-regular-svg-icons";
import '../../assets/styles/board/writeButton.scss'
import {Link} from "react-router-dom";

export default function WriteButton() {
    return (
        <div className="writeButtonContainer">
            <Link to="/board/post/write"><FontAwesomeIcon icon={faPenToSquare} className="writeButtonIcon"/></Link>
        </div>
    )
}