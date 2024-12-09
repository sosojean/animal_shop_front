import "../../../assets/styles/shop/admin/adminMenu.scss"
import {Link, useNavigate} from "react-router-dom";
const AdminMenu = (props) => {


    return (<nav className="adminMenu">
            <ul className="menu">
                <Link to="/admin/seller">
                <li className="menu-item">판매자 관리</li>
                </Link>

                <Link to="/admin/product">
                <li className="menu-item">판매상품관리</li>
                </Link>

                <Link to="/admin/analysis">
                <li className="menu-item">사이트 통계</li>
                </Link>

                <Link to="/admin/notice">
                    <li className="menu-item">판매자 공지</li>
                </Link>

                <Link to="/admin/point/withdraw">
                    <li className="menu-item">판매자 정산</li>
                </Link>
            </ul>
        </nav>
    )
}

export default AdminMenu