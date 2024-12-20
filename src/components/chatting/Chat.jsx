import React, {useEffect} from 'react';
import "../../assets/styles/chatting/chat.scss"
import parseJwt from "../../utils/parseJwt";

const Chat = ({currentUserProfile,item}) => {
    const token = localStorage.getItem("accessToken");
    const isME =item.senderId&&( parseJwt(token).sub.toString() === item.senderId.toString());
    useEffect(() => {
        // console.log("isme", isME)
        // console.log("isme", parseJwt(token).sub, item.senderId)
    }, []);


    return (
        item &&<>
        <div className={`chat ${ isME? "right" : "left"}`}>

            {!isME && <>
                <img className="profile"
                     src={currentUserProfile&&currentUserProfile!==""?`${currentUserProfile}`
                         :`https://placehold.co/50`} alt=""/>
            </>}
                <div className="message-container">
                    {!isME && <span className="sender">{item.senderNickname}</span>}
                    <div className="message">

                        <span>{item.message}</span>

                    </div>
                </div>
            </div>
        </>


            );
            };

            export default Chat;