import {LoginSlice} from "../redux/LoginReducer";
import {AppDispatch} from "../redux/store";
import {siteOrigin, backendUrl} from "../globalConfig";
import {PayloadAction} from "@reduxjs/toolkit";

export const loginUserAsync = (v_email: string, v_password: string) => async (dispatch: AppDispatch) => {
    fetch(backendUrl+'/auth/login', {
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
    ).then(() => {return fetch(backendUrl+'/user/me', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': siteOrigin
        }
    })
        .then((r) =>  {
            if(r.status==200){
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
    })
        .catch((error) => {
            dispatch(LoginSlice.actions.setNextPage("/login"));
            dispatch(LoginSlice.actions.setNeedsNavigate(1));
            console.log(error);
        });
}

