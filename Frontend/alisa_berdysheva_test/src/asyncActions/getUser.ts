
import {AppDispatch} from "../redux/store";
import {siteOrigin, backendUrl} from "../globalConfig";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {LoginSlice} from "../redux/LoginReducer";

//. Сделать, чтобы в функции, где логинится через fetch - в случае ошибки
// вызывалась функция из п.2 с одним параметром, а в случае успеха - другой адрес страницы передавался.


export const getUser = () => async (dispatch: AppDispatch) => {
    fetch(backendUrl+'/user/me', {
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
        .then((data) => {
            if (data.status ==200){
                dispatch(LoginSlice.actions.redux_login(data.json))
            } else {
                dispatch(LoginSlice.actions.redux_logout())
            }
        })
        .catch((e) => {
            console.log('Error: ' + e.message);
        })
}
