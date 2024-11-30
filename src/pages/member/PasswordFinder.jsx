import { useState } from "react";
import AuthSender from "../../components/member/password/AuthSender";
import NewPassword from "../../components/member/password/NewPassword";


const PasswordFinder = () => {

    const [authEmail, setAuthEmail] = useState("");
    const [authText, setAuthText] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");

    return (
        <div>
            <div>
                <h1>비밀번호 찾기</h1>
            </div>
            <div>
                <AuthSender authEmail={authEmail} setAuthEmail={setAuthEmail}
                authText={authText} setAuthText={setAuthText}
                />
            </div>
            <div>
                <NewPassword
                authEmail={authEmail}
                newPassword={newPassword} setNewPassword={setNewPassword}
                checkPassword={checkPassword} setCheckPassword={setCheckPassword}/>
            </div>
        </div>
    )
}

export default PasswordFinder;