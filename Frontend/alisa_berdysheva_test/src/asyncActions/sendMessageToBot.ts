import {backendUrl} from "../globalConfig";

export const sendMessageToBot = async (botId: number, message: string) => {
    return await fetch(backendUrl+'/bot_api/send_message_to_bot', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            bot_id: botId,
            message: message,
        })
    })
        .then(r => r.json())
}