import {siteOrigin, backendUrl} from "../globalConfig";

export const getUserBotMessages = async (botID: number) => {
    const params = new URLSearchParams({
        bot_id: botID.toString(),
    }).toString()
    return await fetch(backendUrl+'/messages/get_user_bot_messages?' + params, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': siteOrigin
        }
    })
        .then(r => r.json())
}
