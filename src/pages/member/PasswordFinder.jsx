import { useState } from "react";
import AuthSender from "../../components/member/password/AuthSender";


const PasswordFinder = () => {

    const [authEmail, setAuthEmail] = useState({email: ""});
    console.log(authEmail);

    return (
        <div>
            <div>
                <h1>비밀번호 찾기</h1>
            </div>
            <div>
                <p>인증번호를 받을 이메일을 작성해주세요</p>
                <AuthSender authEmail={authEmail} setAuthEmail={setAuthEmail}/>
            </div>
        </div>
    )
}

export default PasswordFinder;