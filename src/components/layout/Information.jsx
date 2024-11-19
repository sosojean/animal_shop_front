import "../../assets/styles/layout/information.scss";
import {faFolderOpen, faUser} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import {faRegistered} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";

const Information = (props) => {
    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("accessToken")
        if (token) {
            setIsLogin(true)
        }
    }, []);


    let message;
    let icon ;

    switch (props.case) {
        case 'dataNan':
            message = "데이터가 존재하지 않습니다" ;
            icon = faFolderOpen;
            break;
        case 'seller':
            message = "판매자 등록이 완료되었습니다." ;
            icon = faRegistered;

            break;
        case 'join':
            message = "회원가입이 완료 되었습니다." ;
            icon = faUser;
            break;
    }

    return (
        <div className="information">

            <div className="main-content">
                <FontAwesomeIcon className="icon" icon={icon}/>
                <p>{message}</p>

            </div>
            <div className="buttons">
                <Link to={"/"}>홈</Link>
                {isLogin ? null:<Link to={"/login"}>로그인</Link>}

            </div>


        </div>)
}
export default Information