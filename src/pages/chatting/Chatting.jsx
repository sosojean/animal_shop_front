import React, {useEffect, useRef, useState} from 'react';
import ChattingRooms from "../../components/chatting/ChattingRooms";
import ChattingPage from "../../components/chatting/ChattingPage";
import "../../assets/styles/chatting/chatting.scss"
import Title from "../../components/common/Title";

const Chatting = () => {
    // let stompClient = null;

    // const [stompClient, setStompClient] = useState(null)
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [messages, setMessages] = useState([])
    const [isConnected, setIsConnected] = useState(false)
    const stompClient = useRef(null);

    const [currentUserProfile, setCurrentUserProfile] = useState("")



    useEffect(() => {
        console.log(selectedRoom);
    }, [selectedRoom]);


    return (<>
            <Title>관리자 상담</Title>
            <div className="chatting">
                <ChattingRooms stompClient = {stompClient} setCurrentUserProfile = {setCurrentUserProfile}
                               selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom}
                               messages={messages} setMessages={setMessages} isConnected={isConnected} setIsConnected={setIsConnected} />


                <ChattingPage currentUserProfile = {currentUserProfile}  stompClient = {stompClient}
                              selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom}
                              messages={messages} setMessages={setMessages}  isConnected={isConnected} setIsConnected={setIsConnected}/>

            </div>
        </>
    );
};

export default Chatting;