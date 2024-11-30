import axios from "axios";

const NewPassword = (props) => {

    const {
        newPassword, setNewPassword,
        checkPassword, setCheckPassword,
        authEmail
    } = props;

    const authChangePassword = () => {
        console.log("authEmail", authEmail);
        axios({
            url: 'http://localhost:8080/auth/changePassword',
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

    return (
        <div>
            <label htmlFor="newPassword">새 비밀번호</label>
            <input value={newPassword} onChange={e=>{setNewPassword(e.target.value)}}
                type="password" id="newPassword" placeholder="새 비밀번호" />

            <label htmlFor="checkPassword">새 비밀번호 확인</label>
            <input value={checkPassword} onChange={e=>{setCheckPassword(e.target.value)}}
                type="password" id="checkPassword" placeholder="비밀번호 확인" />

            <button onClick={authChangePassword}>
                    변경
            </button>        
        </div>
    )
}

export default NewPassword;