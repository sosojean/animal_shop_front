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
import {toast} from "react-toastify";

const Header = (props) => {

    const [isAuth, setIsAuth] = useState(false)
    const [keyword, setKeyword] = useState()
    const [hover, setHover] = useState(false)
    const [menuName, setMenuName] = useState("")

    const navigate = useNavigate();

    const token = localStorage.getItem("accessToken");
    const profileImg = parseJwt(token)?.profileImg || "https://placehold.co/250x250";
    const imgSrc = profileImg.startsWith("http")
        ? profileImg: process.env.REACT_APP_IMG_PRINT + profileImg;

    useEffect(() => {
        if (token) {
            setIsAuth(true)
            console.log(parseJwt(token))
            console.log("role", parseJwt(token).role)
        }
    })
    const handleLogout = () => {
        navigate('/login');
        toast.success("로그아웃되었습니다!")

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

    const hoverCategory = (e) => {
        // console.log("hoverCategory");
        setHover(true);
        setMenuName(e.target.id)
        console.log(e.target.id)
    }

    const leaveHeader = () => {
            setHover(false);
    }

    return (<>
            <div className="headerContainer user-styles " onMouseLeave={leaveHeader}>
                <div className="header-inner-Container">
                    <div className="headerContentsContainer">
                        <div className="headerLnCContainer">
                            <Link to="/"><h1 className="logo" onMouseEnter={leaveHeader}>ANIMALPING</h1></Link>

                            <ul className="headerCatecoryContainer">
                                <Link id="store" onMouseEnter={(e)=>hoverCategory(e)} to="/">
                                    <li id="store">스토어 <FontAwesomeIcon id="store" icon={faChevronDown}/></li>

                                </Link>
                                <Link id="social" onMouseEnter={(e)=>hoverCategory(e)} to="/board">
                                <li id="social">커뮤니티 <FontAwesomeIcon id="social" icon={faChevronDown}/></li>

                                </Link>
                                <Link id="util" onMouseEnter={(e)=>hoverCategory(e)} className="category">
                                <li id="util">유틸리티 <FontAwesomeIcon id="util" icon={faChevronDown}/></li>
                                </Link>
                                {/*<ToggleBtn setIsDog={props.setIsDog} isDog={props.isDog}/>*/}

                                {parseJwt(token)?.role === "ADMIN" &&
                                    <Link onMouseEnter={leaveHeader} to="/admin/seller">
                                        <li>관리자</li>
                                    </Link>                                
                                }

                                {parseJwt(token)?.role === "SELLER" &&
                                    <Link onMouseEnter={leaveHeader} to="/seller">
                                        <li>판매자</li>
                                    </Link>
                                }

                            </ul>
                        </div>



                        <div className="headerRegisterContainer" onMouseEnter={leaveHeader}>
                            {isAuth ? <>
                                    <Link to="/cart"><FontAwesomeIcon icon={faCartShopping}/> </Link>
                                    <Link to="/mypage">
                                        <img className="profile-image" src={imgSrc} alt=""/>
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
                {hover ? <Category menuName={menuName}></Category> : null}

            </div>
            {hover ? <div className="background-blocker"></div> : null}
        </>

    )
}

export default Header;