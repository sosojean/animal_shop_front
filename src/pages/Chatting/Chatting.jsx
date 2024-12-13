import React from 'react';
import ChattingRooms from "../../components/chatting/ChattingRooms";
import ChattingPage from "../../components/chatting/ChattingPage";
import "../../assets/styles/chatting/chatting.scss"

const Chatting = () => {
    return (
        <div className="chatting">
            <ChattingRooms/>

            <ChattingPage/>

        </div>
    );
};

export default Chatting;