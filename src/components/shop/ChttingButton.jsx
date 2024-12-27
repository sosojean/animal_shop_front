import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import {faComments} from "@fortawesome/free-solid-svg-icons";

import "../../assets/styles/chatting/chattingButton.scss"

export default function ChattingButton() {
  return (
      <div className="chattingButtonContainer">
        <Link to="/shop/chatting">
          <FontAwesomeIcon icon={faComments} className="chattingButtonIcon"/>
        </Link>
      </div>
  )
}