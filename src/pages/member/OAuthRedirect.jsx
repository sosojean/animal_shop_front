import React, {useEffect} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import axios from "axios";

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
            }
            navigate("/")

        })
    }, []);


    return (
      <div>
        <span>곧 로그인이 완료됩니다.</span>

      </div>
    );
};

export default OAuthRedirect;