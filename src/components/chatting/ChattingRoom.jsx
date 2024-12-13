import React from 'react';
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import instance from "../../utils/axios";

const ChattingRoom = ({ socketConnect,roomInfo, setIsConnected , isConnected, stompClient ,selectedRoom, setSelectedRoom, subscribeToChatRoom }) => {
    const token = localStorage.getItem("accessToken");




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