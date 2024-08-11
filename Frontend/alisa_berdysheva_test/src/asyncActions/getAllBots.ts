

import {siteOrigin, backendUrl} from "../globalConfig";

export const getAllBots = async () => {
    return await fetch(backendUrl+'/bot/get_all_bots' , {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': siteOrigin
        }
    })
        .then(r => r.json())
}


