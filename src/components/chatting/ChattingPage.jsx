import React, {useEffect, useRef, useState} from 'react';
import Chat from "./Chat";
import instance from "../../utils/axios";
import parseJwt from "../../utils/parseJwt";
import DefaultButton from "../common/DefaultButton";

const ChattingPage = ({ currentUserProfile,setIsConnected,stompClient, selectedRoom, setMessages, messages}) => {

    const token = localStorage.getItem("accessToken");


    const [data, setData] = useState()
    const [currentMessage, setCurrentMessage] = useState("")
    const scrollRef = useRef();


    useEffect(() => {
        if (scrollRef.current) {
            setTimeout(() => {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }, 100);
        }
    }, [selectedRoom, messages]);

    useEffect(() => {
        if (selectedRoom) {
            setMessages([])
            getMessage()
        }
    },[selectedRoom])

    useEffect(() => {

        return () => {
            if (stompClient&&stompClient.current?.connected) {
                disconnectChat();
                console.log("소켓통신 해제");
            } else {
                console.log("WebSocket 연결이 이미 해제되었습니다.");
            }
        };
    }, [selectedRoom]);


    function sendMessage(e) {
        e.preventDefault()
        if (stompClient && stompClient.current?.connected && selectedRoom) {
            let message = {
                message: currentMessage, // 보낼 메시지
                date: new Date().toISOString(), // ISO 8601 형식으로 날짜를 보냄
            };

            // 메시지를 /app/send/{chatRoomId} 경로로 전송
            stompClient.current.send(
                `/app/send/${selectedRoom.id}`,
                {},
                JSON.stringify(message)


            );
            console.log((message));
            setCurrentMessage("");
            // message = {...message, senderId : parseJwt(token).sub}
            // setMessages((prev)=>[...prev, message]);
        }
    }



    function disconnectChat() {
        console.log("====Disconnected start====");

        if (stompClient) {
            console.log("====Disconnected====");

            stompClient.current.disconnect(() => {
                console.log("====Disconnected====");
                setIsConnected(false)
                //////////////////////
            });
        }
    }


    function getMessage() {
        if (selectedRoom) {
        instance({
            url:`${process.env.REACT_APP_API}/chat/room/${selectedRoom.id}`,
            method:"get"

        }).then(res => {
             setData(res.data);
             console.log(res.data);
        }).catch((err) => {
            console.log(err);
        })
        }
    }

    return (
        <div  className="chat-page-container">
            <div className="chat-page" ref={scrollRef}>
                {data&&data.map((item) => {
                    // position={item.nickname ===}
                    return (<Chat key={item.date}  item={item} />)
                })}
                {messages&&messages.map((item) => {
                    // position={item.nickname ===}
                    return (<Chat key={item.date}  item={item} />)
                })}
                {/*<Chat position={"right"}/>*/}

            </div>
            <div className="message-input-field">
                {selectedRoom&&<form action="">
                    <input className="message-input" type="text"
                           value={currentMessage}
                           onChange={(e) => setCurrentMessage(e.target.value)}/>
                    <DefaultButton onClick={(e) => sendMessage(e)}
                                   className="primary-border message-send"> 전송</DefaultButton>
                </form>}
            </div>
        </div>
)
    ;
};

export default ChattingPage;