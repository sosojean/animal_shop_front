// globalWebSocket.js
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const token = localStorage.getItem("accessToken");

export const stompClient = Stomp.over(() => new SockJS(
    `${process.env.REACT_APP_API}/ws?token=${token}`,));
export let isConnected = false;

export const connectWebSocket = () => {
    stompClient.connect(
        { Authorization: `Bearer ${token}` },
        () => {
            console.log("WebSocket connected.");
            isConnected = true;
        },
        (error) => {
            console.error("WebSocket connection error:", error);
            isConnected = false;
        }
    );
};

export const disconnectWebSocket = () => {
    if (isConnected) {
        stompClient.disconnect(() => {
            console.log("WebSocket disconnected.");
            isConnected = false;
        });
    }
};
