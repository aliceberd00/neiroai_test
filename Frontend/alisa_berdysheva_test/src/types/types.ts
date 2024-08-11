export interface ILogin {
    id: number
    email: string,
    password: string,
    is_active: boolean,
    is_superuser: false,
    is_verified: false,
    username: string,
    isError: boolean,
    nextPage: string,
    isNeedsNavigate: number,
}



export interface IOneBot{
    id: number,
    bot_name: string,
    bot_type: string,
    bot_model_name: string,
    api_key: string,
    api_img_url: string,
    last_message_time: string,
    last_message: string
}

export interface IOneMessage{
    "id": number,
    "created_at": string,
    "message": string,
    "is_user_message": boolean
}