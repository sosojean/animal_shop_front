import "../../assets/styles/layout/category.scss";
import {Link} from "react-router-dom";

const Category = ({menuName}) => {

    return (

        <div>
            {/*<div className="category-background"></div>*/}
            <div className="category-container">

                <div className="category-menu">
                    {menuName==="store"&&
                        <ul className="category-menu-item">
                            <li>
                                <h3>스토어</h3>
                                <span className={"description"}> 반려동물용품이 다 모여있어요.</span>
                            </li>
                            <Link to="/map">
                                <li>📍 반려동물 시설찾기</li>
                            </Link>
                            <Link to="/adoption">
                                <li>🏠 유기동물 입양정보</li>
                            </Link>
                            <Link to="/wiki">
                                <li>📖 반려동물 백과</li>
                            </Link>
                            <Link to="/calculator/age">
                                <li>🩺 건강 계산기</li>
                            </Link>

                        </ul>}
                    {menuName==="social"&&
                        <ul className="category-menu-item">
                            <li>
                                <h3>커뮤니티</h3>
                                <span className={"description"}> 반려동물과의 일상을 공유하세요.</span>
                            </li>
                            <div className="row category-menu-item-container">
                                <div className="category-menu-item">
                                    <Link to="/board/fashion">
                                        <li>🎩 힙멍 힙냥</li>
                                    </Link>
                                    <Link to="/board/tips">
                                        <li>💡 함께 키우는 꿀팁</li>
                                    </Link>
                                    <Link to="/board/daily">
                                        <li>📅 반려동물과 함께한 하루</li>
                                    </Link>
                                    <Link to="/board/diy">
                                        <li>🧵 손으로 만드는 행복</li>
                                    </Link>

                                    <Link to="/board/growth">
                                        <li>🌱 건강하게 자라길</li>
                                    </Link>
                                </div>
                                <div className="category-menu-item">
                                    <Link to="/board/adoption">
                                        <li>🤝 새 가족 찾아요</li>
                                    </Link>
                                    <Link to="/board/must-try">
                                        <li>✨ 이건 써보셔야 해요!</li>
                                    </Link>
                                    <Link to="/board/memories">
                                        <li>📸 걸으며 쌓는 추억</li>
                                    </Link>
                                    <Link to="/board/talk">
                                        <li>💬 맘 속 이야기 나눠요</li>
                                    </Link>
                                    <Link to="/board/daily-photo">
                                        <li>📷 우리 아이 사진 자랑</li>
                                    </Link>
                                </div>
                            </div>

                        </ul>}
                    {menuName==="util"&&

                        <ul className="category-menu-item">
                            <li>
                                <h3>유틸리티</h3>
                                <span className={"description"}>집사생활에 유용한 도구모음! </span>

                            </li>
                            <Link to="/map">
                                <li>📍 반려동물 시설찾기</li>
                            </Link>
                            <Link to="/adoption">
                                <li>🏠 유기동물 입양정보</li>
                            </Link>
                            <Link to="/wiki">
                                <li>📖 반려동물 백과</li>
                            </Link>
                            <Link to="/calculator/age">
                                <li>🩺 건강 계산기</li>
                            </Link>

                        </ul>}


                </div>
            </div>
        </div>
    )
}
export default Category;
