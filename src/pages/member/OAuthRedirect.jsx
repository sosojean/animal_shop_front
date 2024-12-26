import React, {useEffect} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';

const OAuthRedirect = () => {
    const [searchParams] = useSearchParams();
    const code = searchParams.get("code")
    const state = searchParams.get("state")
    const url = `${process.env.REACT_APP_API}/auth/kakao/${state}`   //로그인
    const navigate = useNavigate()
    useEffect(() => {
        axios({
            url:url ,
            method:"POST",
            data: {
                code: code

            }
        }).then(res=>{
            if (state == "signin"){
            localStorage.setItem("accessToken",res.data.accessToken)
            localStorage.setItem("refreshToken",res.data.refreshToken)
                toast.success("로그인 되었습니다!")
                navigate("/")
            }
            if (state == "signup"){
                toast.success("회원가입이 완료 되었습니다! 로그인 해주세요.")
                navigate("/login")
            }

        }).catch((err) => {
            console.error("error", err);
            navigate("/login");
            toast.error("이미 가입 된 회원입니다. 이메일을 바꿔주세요.")
        })
    }, []);


    return (
      <div>
        <span>곧 로그인이 완료됩니다.</span>

      </div>
    );
};

export default OAuthRedirect;