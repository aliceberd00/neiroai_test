import { configureStore, combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./LoginReducer";

// Комбинируем редьюсеры
const rootReducer = combineReducers({
    user: loginReducer,
    // card: cardReducer,
    // payment: paymentReducer,
});

// Настраиваем и создаем store
const store = configureStore({
    reducer: rootReducer,
});

export const setupStore = () => {
    return store;
};

export default store;
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>

export type AppDispatch = AppStore['dispatch']
