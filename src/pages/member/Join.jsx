import React from 'react';
import "../../assets/styles/layout/login.scss";
import {Link} from "react-router-dom";
import kakaoSignup from "../../assets/img/kakao_signup.png";


const Join = () => {

  const K_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_KEY;
  const K_REDIRECT_URI = `${process.env.REACT_APP_LOCATION}/oauth`;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URI}&response_type=code&state=signup`;



  return (
      <div className={"container"}>
        <div className={"box"}>
          <form className={"login-form"} >


            {/*<Link to="/join/oAuth">*/}
            <button className={"kakao-signup"}
                    onClick={(e)=>
                    {e.preventDefault(); window.location.href = kakaoURL;}}
                    style={{
                      backgroundImage: `url(${kakaoSignup})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center" /* 이미지 가운데 정렬 */

                    }}
            >
            </button>
            {/*</Link>*/}

            <Link to="/join/email">
              <button className={"main-button"}>이메일 회원가입</button>
            </Link>

            <Link to="/login">
              <button >로그인</button>
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