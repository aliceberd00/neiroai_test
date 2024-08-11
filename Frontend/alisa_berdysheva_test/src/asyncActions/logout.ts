import {LoginSlice} from "../redux/LoginReducer";
import {AppDispatch} from "../redux/store";
import {siteOrigin, backendUrl} from "../globalConfig";

export const logoutUserAsync = () => async (dispatch: AppDispatch) => {
    fetch(backendUrl+'/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': siteOrigin
        }})
        .then(() => dispatch(LoginSlice.actions.redux_logout()))
}