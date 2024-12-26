import {useParams} from 'react-router-dom';
import instance from '../../utils/axios.jsx';
import '../../assets/styles/board/heartButton.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faHeartCrack} from "@fortawesome/free-solid-svg-icons";

import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import {toast} from "react-toastify";

export default function HeartButton({heartStatus, setHeartStatus, setCountHeart, countHeart}) {
    const {post_id} = useParams();
    const haveToken = localStorage.getItem('accessToken');

    function handleAlertLogin() {
        if (haveToken === null) {
            alert('로그인 하세요');
        }
    }

    function handleUpDownHeart() {
        if (haveToken === null) return;

        const url = heartStatus ? `/heart/delete/${post_id}` : `/heart/add/${post_id}`;
        const successMessage = heartStatus ? '게시물을 추천 취소 했습니다' : '게시물을 추천 했습니다';

        instance({
            method: "GET",
            url: url
        })
            .then(response => {
                setHeartStatus(!heartStatus);
                setCountHeart(countHeart + (heartStatus ? -1 : 1));
                toast.success(successMessage)
            })
            .catch(error => console.error(error));
    }

    const handleButtonClick = () => {
        handleAlertLogin();
        handleUpDownHeart();
    };

    return (
        <button className="heart-button" onClick={handleButtonClick}>
            {heartStatus ? <span className="icon"><FontAwesomeIcon icon={solidHeart}/>취소</span> :
                <span className="icon"><FontAwesomeIcon icon={regularHeart}/>추천</span>}
        </button>
    );
}