import React from 'react';
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import instance from "../../utils/axios";
import {useModifyTime} from "../../utils/useModifyTime";

const ChattingRoom = ({ setCurrentUserProfile,socketConnect,roomInfo, isAdmin, setIsConnected , isConnected, stompClient ,selectedRoom, setSelectedRoom, subscribeToChatRoom }) => {
    const token = localStorage.getItem("accessToken");
    const modifiedTime = useModifyTime(roomInfo.lastMessageTime)
    const profileImage = isAdmin?roomInfo.buyerProfile:roomInfo.sellerProfile
    const profileImageSrc = profileImage
        ? (profileImage.startsWith("http")
            ? profileImage
            : `${process.env.REACT_APP_IMG_PRINT}${profileImage}`)
        : "https://placehold.co/50/orange/white";


    setCurrentUserProfile(profileImageSrc)
    // setCurrentUserProfile(profileImageSrc)

    console.log(roomInfo);



    function connectToRoom() {
        setSelectedRoom(roomInfo)
        // getMessage()
        socketConnect()


    }

    return (
        <button onClick={connectToRoom} className="chatting-room">

            <img className={"chatting-room-profile"} src={profileImageSrc} alt=""/>

            <div className="room-info">
                <div className="room-header">
                    {isAdmin ?
                        <span className={"nickname"}>{roomInfo.buyerNickname}</span>
                        :<span className={"nickname"}>{roomInfo.sellerNickname}</span>}
                    <span className={"time"}>{modifiedTime}</span>
                </div>

                <p>{roomInfo.lastMessage}</p>

            </div>

        </button>
    );
};

export default ChattingRoom;