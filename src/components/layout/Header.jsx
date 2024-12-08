import "../../assets/styles/layout/header.scss";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Category from "../../pages/board/Category";
import {
    faArrowRightFromBracket,
    faArrowRightToBracket,
    faChevronDown,
    faUserPlus,
    faCartShopping
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-regular-svg-icons";
import parseJwt from "../../utils/parseJwt";
import ToggleBtn from "../common/ToggleBtn";

const Header = (props) => {

    const [isAuth, setIsAuth] = useState(false)
    const [keyword, setKeyword] = useState()
    const [hover, setHover] = useState(false)

    const navigate = useNavigate();

    const token = localStorage.getItem("accessToken");
    useEffect(() => {
        if (token) {
            setIsAuth(true)
            console.log(parseJwt(token))
        }
    })
    const handleLogout = () => {
        navigate('/');

        localStorage.removeItem('accessToken');
        props.setReload(!(props.reload));
        setIsAuth(false)
    }

    const searchHandler = (e) => {
        e.preventDefault()
        // console.log("search");
        // props.setReload(!(props.reload));
        navigate("/search?keyword=" + keyword)
        props.setReload(!(props.reload));


    }

    const hoverCategory = () => {
        // console.log("hoverCategory");
        setHover(true);
    }

    const leaveHeader = () => {
        setHover(false);

    }

    return (<>
            <div className="headerContainer" onMouseLeave={leaveHeader}>
                <div className="headerContainer">
                    <div className="headerContentsContainer">
                        <div className="headerLnCContainer">
                            <Link to="/"><h1 className="logo" onMouseEnter={leaveHeader}>ANIMALPING</h1></Link>

                            <ul className="headerCatecoryContainer">
                                <Link onMouseEnter={leaveHeader} to="/shop">
                                    <li>스토어</li>
                                </Link>
                                <Link onMouseEnter={leaveHeader} to="/">
                                    <li>커뮤니티</li>
                                </Link>
                                <Link onMouseEnter={hoverCategory} className="category">
                                    <li>유틸리티 <FontAwesomeIcon icon={faChevronDown}/></li>
                                </Link>
                                <ToggleBtn setIsDog={props.setIsDog} isDog={props.isDog}/>


                                {/*<Link onMouseEnter={leaveHeader} to="/admin/seller">*/}
                                {/*    <li>관리자</li>*/}
                                {/*</Link>*/}
                                {/*<Link onMouseEnter={leaveHeader} to="/seller">*/}
                                {/*    <li>판매자</li>*/}
                                {/*</Link>*/}


                            </ul>
                        </div>

                        <form onMouseEnter={leaveHeader} className="searchBar" action="/search"
                              onSubmit={(e) => {
                                  searchHandler(e)
                              }}>
                            <input id="searchInput" type="text"
                                   name="keyword" maxLength="50"
                                   placeholder="글 제목, 본문 검색"
                                   onChange={(e) => {
                                       setKeyword(e.target.value)
                                   }}/>
                            {/* <button onClick={searchHandler}>검색</button> */}
                        </form>

                        <div className="headerRegisterContainer" onMouseEnter={leaveHeader}>
                            {isAuth ? <>
                                    <Link to="/cart"><FontAwesomeIcon icon={faCartShopping}/> </Link>
                                    <Link to="/mypage">
                                        {/*<img src="" alt=""/>*/}
                                        {/*{todo: 여기 프로필 이미지 넣어야됨}*/}

                                    </Link>
                                    <button className={"logout"} onClick={handleLogout}>로그아웃
                                        <FontAwesomeIcon icon={faArrowRightFromBracket}/>
                                    </button>
                                </>
                                : <>
                                    <Link to="/cart">
                                        <FontAwesomeIcon icon={faCartShopping} />
                                    </Link>
                                    <Link to="/join" className={"logout"}>
                                    <FontAwesomeIcon icon={faUserPlus}/>회원가입</Link>
                                    <Link to="/login" className={"logout"}> <FontAwesomeIcon
                                        icon={faArrowRightToBracket}/> 로그인</Link></>}

                        </div>
                    </div>

                </div>
                {hover ? <Category></Category> : null}

            </div>
            {hover ? <div className="background-blocker"></div> : null}
        </>

    )
}

export default Header;