import "../../assets/styles/layout/information.scss";
import {faFolderOpen, faUser} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link, useSearchParams} from "react-router-dom";
import {faMoneyBill, faRegistered} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import instance from "../../utils/axios";

const Information = (props) => {
    const [isLogin, setIsLogin] = useState(false)
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const token = localStorage.getItem("accessToken")
        if (token) {
            setIsLogin(true)
        }
        if (props.case == "orderSuccess"){

            const pgToken = searchParams.get("pg_token")
            const partnerUserId = searchParams.get("partner_user_id")
            const partnerOrderId = searchParams.get("partner_order_id")

            orderChecker(pgToken,partnerUserId, partnerOrderId)


        }
    }, []);


    let message;
    let icon ;

    const orderChecker = (pgToken,partnerUserId, partnerOrderId) =>{
        instance({
            url:`/pay/kakaoSuccess`,
            method:'post',
            data:{
                pg_token:pgToken,
                partner_order_id:partnerOrderId,
                partner_user_id:partnerUserId
            }
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error)
        })

    }

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

        case 'orderSuccess':
            message = "결제가 완료 되었습니다." ;
            icon = faMoneyBill;
            break;
        case 'refundSuccess':
            message = "주문취소가 완료 되었습니다." ;
            icon = faMoneyBill;
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