// import InputField from "../common/InputField";
import axios from "axios";


const AuthSender = (props) => {

    const {authEmail, setAuthEmail,
        authText, setAuthText
    } = props;

    const postAuthFindPassword = () => {
        axios({
            url: 'http://localhost:8080/auth/findPassword',
            method: 'POST',
            data: {
                toMailAddr: authEmail
            }
        })
        .then(response => {
            console.log('Response:', response.data);
        })
        .catch(error => {
            console.error('Error:', error.response ? error.response.data : error.message);
        });
    };

    const postAuthVerify = () => {
        axios({
            url: 'http://localhost:8080/auth/verify',
            method: 'POST',
            data: {
                mail : authEmail,
                authentication : authText
            }
        })
        .then(response => {
            console.log('Response:', response.data);
        })
        .catch(error => {
            console.error('Error:', error.response ? error.response.data : error.message);
        });
    }
    
    return(
        <div>
            <div>
                <p>가입 했던 이메일을 작성해주세요</p>
                <label htmlFor="email">email</label>
                <input value={authEmail} onChange={e=>{setAuthEmail(e.target.value)}}
                    type="email" id="email" placeholder="이메일"  />
                <button onClick={postAuthFindPassword}>
                    인증번호 발송
                </button>
                {/* 발송 뒤에 나오도록 */}
                <p>인증번호를 발송했습니다</p>
            </div>
            <div>
                <p>인증 번호를 작성해주세요</p>
                <label htmlFor="authText">인증번호</label>
                <input value={authText} onChange={e=>{setAuthText(e.target.value)}}
                    type="text" id="authText" placeholder="인증번호"  />
                <button onClick={postAuthVerify}>
                    확인
                </button>
            </div>
        </div>
    )
}

export default AuthSender;