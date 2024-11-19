import "../../../assets/styles/shop/admin/adminMenu.scss"
import {Link, useNavigate} from "react-router-dom";
const AdminMenu = (props) => {


    return (<nav className="adminMenu">
            <ul className="menu">
                <Link to="/admin/seller">
                <li className="menu-item">판매자 관리</li>
                </Link>

                <Link to="/admin/product">
                <li className="menu-item">상품관리</li>
                </Link>

                <li className="menu-item">상품관리</li>
                <li className="menu-item">상품관리</li>
                <li className="menu-item">상품관리</li>
                <li className="menu-item">상품관리</li>

            </ul>
        </nav>
    )
}

export default AdminMenu