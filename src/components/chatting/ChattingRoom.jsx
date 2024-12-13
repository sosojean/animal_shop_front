import React from 'react';
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import instance from "../../utils/axios";

const ChattingRoom = ({roomInfo, setIsConnected , isConnected, stompClient ,selectedRoom, setSelectedRoom, subscribeToChatRoom }) => {
    const token = localStorage.getItem("accessToken");

    const socketConnect =()=> {
        const socket = new SockJS(
            `${process.env.REACT_APP_API}/ws?token=${token}`,
        )
        const client = Stomp.over(socket)
        stompClient.current  = client
        stompClient.current.connect(
            {
                Authorization: `Bearer ${token}`, // 헤더에 Authorization 토큰 추가
            },
            (frame) => {
                // 연결 성공 시
                console.log("Connected: " + frame);
                setIsConnected(true)
            },
            (error) => {
                // 연결 실패 시
                console.error("Connection error:", error);
            }
        );

    }


    function connectToRoom() {
        setSelectedRoom(roomInfo)
        // getMessage()
        socketConnect()


    }

    return (
        <button onClick={connectToRoom} className="chatting-room">
            <img src="https://placehold.co/50/orange/white" alt=""/>
            <span>time</span>
            <span>lastMessage</span>
        </button>
    );
};

export default ChattingRoom;