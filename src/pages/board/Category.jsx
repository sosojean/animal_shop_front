import "../../assets/styles/layout/category.scss";
import {Link} from "react-router-dom";

const Category = (props) => {

    return (

        <div>
            <div className="category-background"></div>
            <div className="category-container">

                <div className="category-menu">
                    <ul className="category-menu-item">
                        <Link to="/map">
                            <li>🐶 지도</li>
                        </Link>
                        <Link to="/adoption">
                            <li>🐱 입양</li>
                        </Link>
                        <Link to="/ootd">
                            <li>🐰 반려동물 백과</li>
                        </Link>
                        <Link to="/calculator">
                            <li>🐹 건강 계산기</li>
                        </Link>
                        <Link to="/graduate">
                            <li>🎓 졸업생 커뮤니티</li>
                        </Link>
                        <Link to="/comment">
                            <li>💬 강사님께 한마디</li>
                        </Link>
                        <Link to="/daily">
                            <li>💻 데일리 코테</li>
                        </Link>


                    </ul>


                </div>
            </div>
        </div>
    )
}
export default Category