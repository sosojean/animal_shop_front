import React, {useEffect, useRef, useState} from 'react';
import ChattingRoom from "./ChattingRoom";
import "../../assets/styles/chatting/chattingRooms.scss"
import {Stomp} from "@stomp/stompjs";
import instance from "../../utils/axios";
import SockJS from 'sockjs-client';


const ChattingRooms = ({ isConnected, setIsConnected, stompClient,selectedRoom,setSelectedRoom, messages, setMessages}) => {

    const token = localStorage.getItem("accessToken");
    // const [id, setId] = useState("")
    const [roomInfos, setRoomInfos] = useState([])
    const [subscription, setSubscription] = useState(null)




    useEffect(() => {
        instance({
            url: `${process.env.REACT_APP_API}/chat-room/mine`,
            method: "GET",
        }).then(res => {
            setRoomInfos(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, []);

    useEffect(() => {

        if (stompClient.current && stompClient.current.connected) {
            console.log('Connected');
        } else {
            console.log('Not connected');
        }
        if (subscription && selectedRoom) {
            unsubscribeFromChatRoom();
        }

        if (selectedRoom && isConnected) {
            console.log("selectedRoom.id", selectedRoom.id);
            try {
                subscribeToChatRoom(selectedRoom.id);
                console.log("Subscribed to", selectedRoom);
            } catch (error) {
                console.error("Subscription failed:", error);
                // 재시도
                setTimeout(() => {
                    subscribeToChatRoom(selectedRoom.id);
                }, 100); // 3초 후 재시도
            }
        }
        return () => {
            unsubscribeFromChatRoom(); // Clean-up on component unmount or dependency change
        };
    }, [selectedRoom, stompClient, isConnected]);





    function createChat() {
        instance({
            url: `${process.env.REACT_APP_API}/chat/room`,
            method: "GET",
        }).then(res => {
            // setId(res.data.id);
            // subscribeToChatRoom("1353f247-0b68-49aa-aa9c-c48a07448112")
        }).catch((err) => {
            console.log(err);
        })
    }


    function subscribeToChatRoom(chatRoomId) {
        console.log(stompClient)
        if (!stompClient || !stompClient.current?.connected) {
            console.error("Not connected to WebSocket.");
            throw new Error("Not connected to WebSocket")
            // return;
        }

        // 이미 해당 채팅방에 구독 중인지 확인
        if (subscription && subscription.id === `/topic/chat/${chatRoomId}`) {
            console.log("Already subscribed to this chat room:", chatRoomId);
            return;
        }

        // 이전 구독 해제
        unsubscribeFromChatRoom();

        // 새로운 채팅방 구독
        const sub = stompClient.current?.subscribe(`/topic/chat/${chatRoomId}`, (messageOutput) => {
            const message = JSON.parse(messageOutput.body);
            console.log("Received: ", message);

            setMessages((prev) => [...prev, message]);
        });

        console.log("Subscribed to chat room:", chatRoomId);
        setSubscription(sub);
    }



    function unsubscribeFromChatRoom() {
        if (subscription) {
            subscription.unsubscribe();
            console.log("Unsubscribed from chat room.");
            setSubscription(null)
        } else {
            console.log("No active subscription to unsubscribe.");
        }
    }


    return (
        <div className="chatting-rooms">

            {roomInfos&&
                roomInfos.map((roomInfo,index)=> {
                return <ChattingRoom key={index} roomInfo={roomInfo}
                                     isConnected={isConnected}
                                     setIsConnected={setIsConnected}
                                     selectedRoom={selectedRoom}
                                     setSelectedRoom={setSelectedRoom}
                                     stompClient={stompClient}
                                     subscribeToChatRoom={subscribeToChatRoom}
                />})
        }



        </div>
    );
};

export default ChattingRooms;