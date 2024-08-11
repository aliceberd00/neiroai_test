import React, {useEffect, useState, useRef } from 'react';
import HeaderGoBack from "../../Components/header/HeaderGoBack";
import TextType from "../../Components/TextType/TextType";
import MessageCard from "../../Components/Card/MessageCard/MessageCard";
import { useParams } from "react-router-dom";
import {IOneMessage} from "../../types/types";
import {Box, Grid} from "@mui/material";
import {sendMessageToBot} from "../../asyncActions/sendMessageToBot";
import {createNewMessage} from "../../asyncActions/createNewMessage";
import {getUserBotMessages} from "../../asyncActions/getUserBotMessages";

export default function MyDialogPage() {
    const [messages, setMessages] = useState<IOneMessage[]>([]);
    const params = useParams();
    const scrollToRef = useRef<null | HTMLParagraphElement>( null );


    const handleSendMessage = async (message: string) => {
        const botMessage = await sendMessageToBot(Number(params.botId), message)
        const userMessage = await createNewMessage(Number(params.botId), message, true)
        const botMessageForArray = await createNewMessage(Number(params.botId), botMessage.message, false)
        setMessages([...messages, userMessage, botMessageForArray]);
    }

    useEffect(() => {
        const fetchData = async () => {
            const allMessages = await getUserBotMessages(Number(params.botId));
            setMessages(allMessages);
        };
        fetchData();
    },[]);

    useEffect( () => {
        // If `scrollToRef` points to an element, then scroll it into view.
        if( scrollToRef.current ) {
            scrollToRef.current.scrollIntoView();
        }
    }, [messages]);

    return(
        <>
            <Box
                sx={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    minHeight: '80vh',
                    textAlign: 'center',
                }}
            >
            <HeaderGoBack/>
            <Grid container>
            {messages.map((message, index) => (<>
                    <Grid item xs={message.is_user_message ? 5 : 0} sm={message.is_user_message ? 5 : 0} md={message.is_user_message ? 5 : 0}></Grid>
                    <Grid item xs={7} sm={7} md={7}>
                    <MessageCard
                        key={message.id}
                        message={message.message}
                        is_user_message={message.is_user_message}
                    />
                    </Grid>
                    <Grid item xs={message.is_user_message ? 0 : 5} sm={message.is_user_message ? 0 : 5} md={message.is_user_message ? 0 : 5}></Grid>
                </>
            ))}
            <TextType onSendMessage={handleSendMessage}/>
            </Grid>
                <p ref={scrollToRef}></p>
            </Box>
        </>
    )
}
