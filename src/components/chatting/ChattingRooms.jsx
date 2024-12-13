import React, {useEffect, useState} from 'react';
import ChattingRoom from "./ChattingRoom";
import "../../assets/styles/chatting/chattingRooms.scss"
import {Stomp} from "@stomp/stompjs";
import instance from "../../utils/axios";
import SockJS from 'sockjs-client';


const ChattingRooms = () => {

    const token = localStorage.getItem("accessToken");
    let stompClient = null;
    const [id, setId] = useState("")

    const socketConnect =()=> {
        const socket = new SockJS(
            `${process.env.REACT_APP_API}/ws?token=${token}`,
        )
        stompClient = Stomp.over(socket);
        stompClient.connect(
            {
                Authorization: `Bearer ${token}`, // 헤더에 Authorization 토큰 추가
            },
            (frame) => {
                // 연결 성공 시
                console.log("Connected: " + frame);
            },
            (error) => {
                // 연결 실패 시
                console.error("Connection error:", error);
            }
        );
    }


    function createChat() {
        instance({
            url: `${process.env.REACT_APP_API}/chat/room`,
            method: "GET",
        }).then(res => {
            setId(res.data.id);
            subscribeToChatRoom("1353f247-0b68-49aa-aa9c-c48a07448112")
        }).catch((err) => {
            console.log(err);
        })
    }

    function subscribeToChatRoom(chatRoomId) {
        if (!stompClient || !stompClient.connected) {
            console.error("Not connected to WebSocket.");
            return;
        }

        console.log("subscribeToChatRoom success")
        // 채팅방 ID에 맞는 경로로 구독
        stompClient.subscribe(`/topic/chat/${chatRoomId}`,
            (messageOutput) => {
            const message = JSON.parse(messageOutput.body);
            console.log("Received: " + JSON.stringify(message));
        });
    }


    function sendMessage() {
        if (stompClient && stompClient.connected && id) {
            const message = {
                message: "Hello, this is a message!", // 보낼 메시지
                date: new Date().toISOString(), // ISO 8601 형식으로 날짜를 보냄
            };

            // 메시지를 /app/send/{chatRoomId} 경로로 전송
            stompClient.send(
                `/app/send/${"1353f247-0b68-49aa-aa9c-c48a07448112"}`,
                {},
                JSON.stringify(message)
            );
            console.log("Sent: " + JSON.stringify(message));
        }
    }

    function disconnectChat() {
        if (stompClient) {
            stompClient.disconnect(() => {
                console.log("Disconnected");
            });
        }
    }

    function getMessage() {
        instance({
            url:`${process.env.REACT_APP_API}/chat/room/${"1353f247-0b68-49aa-aa9c-c48a07448112"}`,
            method:"get"

        }).then(res => {
            console.log("Received: " + JSON.stringify(res));
        }).catch((err) => {
            console.log(err);
        })
    }

    // function getRoom() {
    //     instance({
    //         url:`${process.env.REACT_APP_API}/chat-room/${"9e83d47f-ac8b-4c94-939c-b925bf11158c"}`,
    //         method:"get"
    //
    //     }).then(res => {
    //         console.log("Received: " + JSON.stringify(res));
    //     }).catch((err) => {
    //         console.log(err);
    //     })
    // }

    return (
        <div className="chatting-rooms">

            <button onClick={socketConnect}>test connection</button>
            <button onClick={createChat}>create chat</button>
            <button onClick={sendMessage}>sendMessage</button>
            <button onClick={disconnectChat}>disconnect chat</button>


            {/*<button onClick={getRoom}>getRoom</button>*/}
            <button onClick={getMessage}>getMessage</button>


            <ChattingRoom/>
            <ChattingRoom/>
            <ChattingRoom/>
            <ChattingRoom/>
            <ChattingRoom/>
            <ChattingRoom/>
            <ChattingRoom/>
            <ChattingRoom/>
            <ChattingRoom/>
            <ChattingRoom/>
            <ChattingRoom/>
            <ChattingRoom/>
            <ChattingRoom/>
            <ChattingRoom/>
            <ChattingRoom/>
            <ChattingRoom/>
            <ChattingRoom/>
            <ChattingRoom/>
            <ChattingRoom/>
            <ChattingRoom/>
            <ChattingRoom/>
            <ChattingRoom/>
            <ChattingRoom/>
            <ChattingRoom/>
            <ChattingRoom/>


        </div>
    );
};

export default ChattingRooms;