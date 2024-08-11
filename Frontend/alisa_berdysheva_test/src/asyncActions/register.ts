import {AppDispatch} from "../redux/store";
import {siteOrigin, backendUrl} from "../globalConfig";
import {LoginSlice} from "../redux/LoginReducer";
export const registerUser = ( v_email: string, v_password: string, v_userName: string) => async (dispatch: AppDispatch) => {
    fetch(backendUrl+'/auth/register', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Access-Control-Allow-Origin': siteOrigin
        },
        body: JSON.stringify({
            email: v_email,
            username: v_userName,
            password: v_password,
            // is_active: true,
            // is_superuser: false,
            // is_verified: false
        })
    })
        .then(() => {return fetch(backendUrl+'/auth/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Access-Control-Allow-Origin': siteOrigin
                },
                body: new URLSearchParams({
                    'username': v_email,
                    'password': v_password,
                })
            }
        )
    })
        .then((r) =>  {
            if(r.status===200){
                return r.json().then(data => ({status: r.status, json: data}))
            } else {
                let error = new Error(r.statusText);
                throw error
            }
        })
        .then(response => {
            dispatch(LoginSlice.actions.redux_login(response.json));
            dispatch(LoginSlice.actions.setNextPage('/chats'));
            dispatch(LoginSlice.actions.setNeedsNavigate(1));
        })
        .catch((error) => {
            dispatch(LoginSlice.actions.setNextPage("/login"));
            dispatch(LoginSlice.actions.setNeedsNavigate(1));
            console.log(error);
        });
}
