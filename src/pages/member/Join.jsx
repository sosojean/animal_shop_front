import React from 'react';
import "../../assets/styles/layout/login.scss";
import {Link} from "react-router-dom";
const Join = () => {

  const K_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_KEY;
  const K_REDIRECT_URI = `http://localhost:3000/oauth`;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URI}&response_type=code`;



  return (
      <div className={"container"}>
        <div className={"box"}>
          <form className={"login-form"} >


            {/*<Link to="/join/oAuth">*/}
            <button onClick={(e)=>{   e.preventDefault(); window.location.href = kakaoURL;}}>카카오로 시작하기</button>
            {/*</Link>*/}

            <Link to="/join/email">
              <button>이메일 회원가입</button>
            </Link>

            <Link to="/login">
              <button>로그인</button>
            </Link>


            <Link to="/password">
              <div>
                <span>비밀번호 찾기</span>
              </div>
            </Link>


          </form>
        </div>
      </div>
  );
};

export default Join;