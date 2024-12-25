import React, {useEffect} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import instance from "../../utils/axios";




const OAuthRedirect = () => {
    const [searchParams] = useSearchParams();
    const code = searchParams.get("code")
    const state = searchParams.get("state")
    const url = `${process.env.REACT_APP_API}/auth/kakao/${state.includes("signin")?"signin":"signup"}`   //로그인
    const navigate = useNavigate()


    const getSellerInfo = () =>{
        const storedData = localStorage.getItem("userInfo");
        if (storedData) {
            return(JSON.parse(storedData));
        }
        else {
            return({})
        }
    }



    useEffect(() => {
        const requestData = state === "signupSeller"
            ? { code: code, ...getSellerInfo() }
            : { code: code };

// 요청 데이터 로그
        console.log("Request will be sent:");
        console.log("URL:", url);
        console.log("Method:", "POST");
        console.log("Data:", requestData);


        axios({
            url:url ,
            method:"POST",
            data: state==="signupSeller"?
                {code: code , ...getSellerInfo()}:
                {code: code}
        }).then(res=>{
            if (state === "signin"){
            localStorage.setItem("accessToken",res.data.accessToken)
            localStorage.setItem("refreshToken",res.data.refreshToken)
            }

            navigate("/")
        }).catch((err) => {
            console.error("error", err);
            // navigate("/login");
            // toast.error("이미 가입 된 회원입니다. 로그인 해주세요")
            // todo : 에러 status 메시지 확인하고 띄워주기 -> 이미 등록된 회원/ 회원가입 오류 / 상태에 따라 다른 동작
        })
    }, []);


    return (
      <div>
        <span>곧 로그인이 완료됩니다.</span>

      </div>
    );
};

export default OAuthRedirect;