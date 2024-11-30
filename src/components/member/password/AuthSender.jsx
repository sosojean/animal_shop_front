// import InputField from "../common/InputField";
import axios from "axios";


const AuthSender = (props) => {

    const {authEmail, setAuthEmail} = props;

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
    
    return(
        <div>
            <div>
                <label htmlFor="email">email</label>
                <input value={authEmail} onChange={e=>{setAuthEmail(e.target.value)}}
                    type="email" id="email" placeholder="이메일"  />
            </div>
            <button onClick={postAuthFindPassword}>인증번호 발송</button>
        </div>
    )
}

export default AuthSender;

// const {
//     name,
//     placeholder="",
//     title,
//     className ="default-input",
//     type = "text",
//     input,
//     value,
//     setInput


// } = props;