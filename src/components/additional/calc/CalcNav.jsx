import "../../../assets/styles/shop/admin/adminMenu.scss"
import { Link } from "react-router-dom";

const CalcNav = () => {

    return (
        <nav className="adminMenu">
            <ul className="menu">
                <Link to="/calculator/age">
                    <li>나이</li>
                </Link>
                <Link to="/calculator/calorie">
                    <li>권장 칼로리</li>
                </Link>
                <Link to="/calculator/nutrient">
                    <li>사료 영양성분</li>
                </Link>  
            </ul>
        </nav>
    )
}

export default CalcNav;