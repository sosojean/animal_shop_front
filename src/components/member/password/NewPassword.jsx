import axios from "axios";
import { useState } from "react";
import Card from "../../common/Card";
import { useNavigate } from "react-router-dom";

const NewPassword = (props) => {

    const navigate = useNavigate();

    // 비밀번호 검증용 state
    const [pwdInvalid, setPwdInvalid] = useState(false);
    const [pwdDiff, setPwdDiff] = useState(false);

    const {
        newPassword, setNewPassword,
        checkPassword, setCheckPassword,
        authEmail, authCheck
    } = props;

    const authChangePassword = () => {
        console.log("authEmail", authEmail);
        axios({
            url: `${process.env.REACT_APP_API}/auth/changePassword`,
            method: 'PATCH',
            data: {
                mail : authEmail,
                newPassword: newPassword,
                checkPassword : checkPassword
            }
        })
        .then(response => {
            console.log('authChangePassword:', response.data);
        })
        .catch(error => {
            console.error('Error:', error.response ? error.response.data : error.message);
        });
    }

    const passwordValidChecker = (password) => {
        let regPass = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/
        if (regPass.test(password)) {
            // console.log("비밀번호 유효");
            setNewPassword(password);
            setPwdInvalid(false);

        } else {
            // console.log("비밀번호 무효");
            setPwdInvalid(true);
        }
    }

    const passwordEqualChecker = (password2) => {
        if (newPassword === password2) {
            // console.log("비밀번호 일치");
            setCheckPassword(newPassword);
            setPwdDiff(false);
        } else {
            // console.log("비밀번호 불일치");
            setPwdDiff(true);
        }
    }

    return (
        <>
        {authCheck &&
            <Card>
                <label htmlFor="newPassword">새 비밀번호</label>
                <input onChange={e=>{passwordValidChecker(e.target.value)}}
                    type="password" id="newPassword" placeholder="새 비밀번호" />
                {pwdInvalid ? <span style={{color:"red"}}> 영문/숫자를 조합하여 8~20자 이내로 작성해주세요. </span> : ""}

                <label htmlFor="checkPassword">새 비밀번호 확인</label>
                <input onChange={e=>{passwordEqualChecker(e.target.value)}}
                    type="password" id="checkPassword" placeholder="비밀번호 확인" />
                {pwdDiff ? <span style={{color:"red"}}> 패스워드가 일치 하지 않습니다</span> : ""}

                <button onClick={() => {
                    authChangePassword();
                    navigate("/login");
                    }}>
                        변경
                </button>        
            </Card>
        }
        </>
    )
}

export default NewPassword;