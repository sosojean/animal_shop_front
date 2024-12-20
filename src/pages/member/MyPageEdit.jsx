import {faImage, faPen, faUserPen} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "../../assets/styles/layout/mypageEdit.scss"
import {useEffect, useState} from "react";
import instance from "../../utils/axios";
import {Link, useNavigate} from "react-router-dom";
import {faUser} from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import Title from "../../components/common/Title";

const MyPageEdit = (props) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    const [role, setRole] = useState("");


    const [inputEmail, setInputEmail] = useState("");
    const [inputName, setInputName] = useState("");

    const [nameInvalid, setNameInvalid] = useState(false);
    const [emailInvalid, setEmailInvalid] = useState(false);
    const [invalidRequest, setInvalidRequest] = useState(false);

    const [nameAlreadyExist, setNameAlreadyExist] = useState(false);
    const [emailAlreadyExist, setEmailAlreadyExist] = useState(false);

    const [isModified, setIsModified] = useState(false);

    const [submitted, setSubmitted] = useState(false)
    const [imgUrl, setImgUrl] = useState("");



    useEffect(() => {
        const fetchData = async () => {
            const response = await instance({
                url: "/mypage/update",
                method: "GET"
            })
            if (response && response.data) {
                setImgUrl(response.data.profile);
                setUsername(response.data.username);

                setName(response.data.nickname);
                setInputName(response.data.nickname);

                setEmail(response.data.mail);
                setInputEmail(response.data.mail);

                setRole(response.data.role);

                console.log(response.data)
            }
        }
        fetchData()

    }, [submitted])

    const editUser = (e) => {
        e.preventDefault();
        let data;

        // if (inputEmail != email && inputName != name) {
            data = {
                mail: email,
                nickname: name,
                profile:imgUrl

            }

        console.log("data",data)

        if (emailInvalid) {
            setInvalidRequest(true)
        } else {
            setInvalidRequest(false)
            instance({
                url: "/mypage/update",
                method: "POST",
                data: data,
            }).then(response => {
                setIsModified(true);
                setSubmitted(!submitted);
                console.log(response)
            })
                .catch(error => {
                    console.log(error)
                    errorHandler(error.response.data.error)
                })

        }
    }
    const errorHandler = (error) => {
        // console.log(error);
        // setInvalidRequest(true)
        if (error === "mail already exists") {
            setEmailAlreadyExist(true);
            setNameAlreadyExist(false);

        }
        if (error === "Nickname already exists") {
            setNameAlreadyExist(true);
            setEmailAlreadyExist(false);

        }
    }

    const emailChecker = (email) => {
        const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
        setEmail(email)

        if (regEmail.test(email)) {
            // console.log("이메일 유효");
            setEmailInvalid(false);

        } else {
            // console.log("이메일 무효");
            setEmailInvalid(true);
        }
    }
    const nameChecker = (name) => {
        const regName = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;
        setName(name)

        if (regName.test(name)) {
            setNameInvalid(false);
        } else {
            setNameInvalid(true);
        }

    }


    const warningCleaner = () => {
        setIsModified(false);
        setNameAlreadyExist(false);
        setEmailAlreadyExist(false);
    }


    function deleteUser() {
        instance({
            method: "DELETE",
            url: "/auth/delete",

        }).then(response => {
            localStorage.clear();
            navigate("/");

        })

    }

    const confirmUser = (e) => {
        e.preventDefault();

        // eslint-disable-next-line no-restricted-globals
        const result = confirm("정말로 탈퇴하실건가요?");
        if (result) {
            // eslint-disable-next-line no-restricted-globals
            const resultAgain = confirm("정말로 정말로 탈퇴하실건가요?");

            if (resultAgain) {
                // console.log("회원탈퇴")
                deleteUser();
            } else {
                // console.log("탈퇴안함")
            }
        } else {
            // console.log("탈퇴안함")
        }
    }

    const imageUploadHandler = (e) =>  {
        const file = e.target.files[0];
        const formData = new FormData();
        if (file != null) {
            formData.append('image', new Blob([file], {type: 'multipart/form-data'}), file.name);
        }

        axios({
            url: 'http://localhost:8080/file/profile-image-upload',
            method: 'POST',
            data: formData,
        }).then((response) => {
            console.log(response.data)
            setImgUrl(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    return (<>
            <Title>회원정보 수정</Title>

            <div className="container">

            <div className="box">
                {/*<FontAwesomeIcon className={"icon"} icon={faUserPen}/>*/}

                {imgUrl ? <img
                    src={imgUrl.includes("http://k.kakaocdn.net")?imgUrl:
                    process.env.REACT_APP_IMG_PRINT + imgUrl}
                    alt=""/>: <>
                    <label className="edit-profile-image" htmlFor="profile">
                        <FontAwesomeIcon className={"icon"} icon={faUser}/>
                        <FontAwesomeIcon icon={faPen}/>
                    </label>
                    <input onChange={imageUploadHandler} accept="image/*" id="profile" type="file"
                           style={{display: "none"}}/>

                </>

                }

                <form action="post">
                    <span>아이디</span>
                    <span>{username}</span>
                    <hr/>
                    <label htmlFor="email">이메일</label>
                    <input
                        onClick={warningCleaner}
                        onChange={e => emailChecker(e.target.value)}
                        type="text" name="email" id="email" value={email}/>
                    {emailInvalid ? <span className={"warning"}> 이메일이 적합 하지 않습니다</span> : ""}
                    {emailAlreadyExist ? <span className={"warning"}> 이미 존재하는 이메일입니다. </span> : ""}

                    <label htmlFor="name">닉네임</label>
                    <input
                        onClick={warningCleaner}
                        onChange={e => nameChecker(e.target.value)}
                        type="text" name="name" id="name" value={name}/>
                    {nameAlreadyExist ? <span className={"warning"}> 이미 존재하는 닉네임입니다. </span> : ""}
                    {nameInvalid ? <span className={"warning"}> 닉네임이 적합 하지 않습니다</span> : ""}


                    {invalidRequest ? <span className={"warning"}> 입력을 확인해주세요. </span> : ""}
                    {isModified ? <span>수정이 완료되었습니다.</span> : ""}
                    <button onClick={editUser}>저장</button>


                    <button onClick={confirmUser} className="warning-btn">회원탈퇴</button>

                    {(role&&role!="SELLER")?
                        <Link className="seller-register-link" to={"/seller/register"} >
                            판매자이신가요? 권한신청하러가기{">"}
                        </Link>:
                        <Link to={"/seller"}>
                            <span>판매자 센터로 가기 -{">"} </span>
                        </Link>
                    }
                </form>
            </div>

        </div></>
    )
}

export default MyPageEdit;