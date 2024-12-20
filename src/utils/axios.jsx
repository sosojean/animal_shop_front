import axios from "axios";
import {toast} from "react-toastify";


const instance = axios.create({
    baseURL: "http://localhost:8080",
});
let isInvalidToken = false;
let isTokenRefreshing = false; // 토큰 갱신 상태 플래그
let refreshSubscribers = []; // 대기 중인 요청 저장소

// 대기 중인 요청 처리 (성공/실패 분리)
const processQueue = (newToken, error) => {
    refreshSubscribers.forEach(({ resolve, reject, config }) => {
        if (newToken) {
            config.headers["Authorization"] = `Bearer ${newToken}`;
            resolve(instance(config)); // 요청 재시도
        } else {
            reject(error); // 실패 시 에러 전달
        }
    });
    refreshSubscribers = []; // 대기열 초기화
};

// 요청 인터셉터
instance.interceptors.request.use(function (config) {

    // console.log(isInvalidToken);
    // 스토리지에서 토큰을 가져온다.
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    // 토큰이 있으면 요청 헤더에 추가한다.
    if (accessToken && !isInvalidToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    if (accessToken && refreshToken && isInvalidToken) {
        config.data = {
            "accessToken": accessToken,
            "refreshToken": refreshToken
        }
    }

    // console.log("엑시오스 세팅값");
    // console.log("엑시오스 요청",config.baseURL,config.url);
    console.log("엑시오스 요청",config);

    return config;
}, function (error) {
    console.log("--요청 실패--");
    console.log(error);
});

instance.interceptors.response.use(
    response => response,
    async error => {
        const {config, response} = error;
        if (response.status === 401 && !config._retry) {
            config._retry = true;
            if (isTokenRefreshing) {
                return new Promise((resolve, reject) => {
                    refreshSubscribers.push({ resolve, reject, config });
                });
            }


                isTokenRefreshing = true;
                isInvalidToken = true;

                try {
                    const response = await instance(
                       {
                           url: '/auth/token',
                           method: "POST",
                           // refreshToken: localStorage.getItem('refreshToken')
                       }
                    );
                    console.log("액세스토큰 갱신 완료 ")
                    const newAccessToken = response.data.accessToken;
                    localStorage.setItem("accessToken", newAccessToken);
                    isInvalidToken = false;
                    isTokenRefreshing = false;
                    processQueue(newAccessToken, null);
                    return instance(config); // 원래 요청 재시도

                } catch (err) {
                    console.log("토큰 재발급 실패, 리프레시 토큰 만료");
                    isTokenRefreshing = false;
                    processQueue(null, err);

                    localStorage.setItem("accessToken", "" );
                    toast.warn("세션이 만료되었습니다. 다시 로그인 해주세요.")
                    window.location.href = "/login";

                    return Promise.reject(error);
                }

        }
        return Promise.reject(error);
    }
);


export default instance;
