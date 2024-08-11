import {siteOrigin, backendUrl} from "../globalConfig";

export const getOneBotInfo = async (botID: number) => {
    const params = new URLSearchParams({
        bot_id: botID.toString(),
    }).toString()
    return await fetch(backendUrl+'/bot/get_one_bot_info?' + params, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': siteOrigin
        }
    })
        .then(r => r.json())
}
