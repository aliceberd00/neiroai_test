import {backendUrl} from "../globalConfig";

export const createNewMessage = async (botId: number, message: string, isUserMessage: boolean) => {
    return await fetch(backendUrl+'/messages/create_new_message', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            bot_id: botId,
            message: message,
            is_user_message: isUserMessage,
        })
    })
        .then(r => r.json())
}