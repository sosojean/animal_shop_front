import React, {useEffect, useState} from 'react';
import Chat from "./Chat";
import instance from "../../utils/axios";

const ChattingPage = () => {

    const [data, setData] = useState()
    useEffect(() => {
        getMessage()
    },[])

    function getMessage() {
        instance({
            url:`${process.env.REACT_APP_API}/chat/room/${"1353f247-0b68-49aa-aa9c-c48a07448112"}`,
            method:"get"

        }).then(res => {
             setData(res.data);
             console.log(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="chat-page-container">
            <div className="chat-page">
                {data&&data.map((item) => {
                    // position={item.nickname ===}
                    return (<Chat key={item.date}  item={item} />)
                })}
                {/*<Chat position={"right"}/>*/}



            </div>
            <div className="message-input-field">
                <form action="">
                    <input className="message-input" type="text"/>
                    <button className="message-send"></button>
                </form>
            </div>
        </div>
)
    ;
};

export default ChattingPage;