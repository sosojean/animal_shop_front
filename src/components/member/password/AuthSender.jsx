// import InputField from "../common/InputField";
import axios from "axios";
import Card from "../../common/Card";
import { useState } from "react";


const AuthSender = (props) => {

    const status = ["none", "waiting", "response", "error"];
    const [response, setResponse] = useState({email: status[0], auth: status[0]});

    const {authEmail, setAuthEmail,
        authText, setAuthText, setAuthCheck
    } = props;

    const updateResponseStatus = (type, newStatus) => {
        
        if (type === "email")
            setResponse(prevState => ({
                ...prevState,
                email: newStatus
            }));
        else if (type === "auth")
            setResponse(prevState => ({
                ...prevState,  // 기존 상태를 복사
                auth: newStatus
            }));
    };

    const postAuthFindPassword = () => {

        updateResponseStatus("email", status[1]);

        axios({
            url: `${process.env.REACT_APP_API}/auth/findPassword`,
            method: 'POST',
            data: {
                toMailAddr: authEmail
            }
        })
        .then(response => {
            updateResponseStatus("email", status[2]);
            console.log('Response:', response.data);
        })
        .catch(error => {
            updateResponseStatus("email", status[3]);
            console.error('Error:', error.response ? error.response.data : error.message);
        });
    };

    const postAuthVerify = () => {

        updateResponseStatus("auth", status[1]);

        axios({
            url: `${process.env.REACT_APP_API}/auth/verify`,
            method: 'POST',
            data: {
                mail : authEmail,
                authentication : authText
            }
        })
        .then(response => {
            updateResponseStatus("auth", status[2]);
            setAuthCheck(true);
            console.log('Response:', response.data);
        })
        .catch(error => {
            updateResponseStatus("auth", status[3]);
            console.error('Error:', error.response ? error.response.data : error.message);
        });
    }
    
    return(
        <>
            <Card className={"default-card email-container"}>
                <div>
                    <p className="description"><b>가입 했던 이메일을 작성해주세요</b></p>
                    {/* <label htmlFor="email">email</label> */}
                    <input value={authEmail} onChange={e=>{setAuthEmail(e.target.value)}}
                        type="email" id="email" placeholder="이메일"  />
                    <button onClick={postAuthFindPassword}>
                        인증번호 발송
                    </button>
                    {response.email === status[1] && <p>잠시만 기다려주세요</p>}
                    {response.email === status[2] && <p>인증번호를 발송했습니다</p>}
                    {response.email === status[3] &&
                        <div style={{color:"red"}}>
                            <p style={{color:"red"}}><b>인증번호 발송에 실패했습니다</b></p>
                            <p>가입한 이메일이 맞는지 확인하세요</p>
                        </div> 
                    }                    
                </div>
                
                
                <div>
                    {response.email === status[2] &&
                        <div>
                            <p className="description"><b>인증 번호를 작성해주세요</b></p>
                            {/* <label htmlFor="authText">인증번호</label> */}
                            <input value={authText} onChange={e=>{setAuthText(e.target.value)}}
                                type="text" id="authText" placeholder="인증번호"  />
                            <button onClick={postAuthVerify}>
                                확인
                            </button>
                            {response.auth === status[1] && <p>잠시만 기다려주세요</p>}
                            {response.auth === status[2] && <p>인증번호가 확인됐습니다</p>}
                            {response.auth === status[3] && <p style={{color:"red"}}>
                                <b>인증번호를 다시 작성해주세요</b>
                            </p>}
                        </div>
                    }                       
                </div>
        
            </Card>

        </>
    )
}

export default AuthSender;