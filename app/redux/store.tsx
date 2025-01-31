import {combineReducers, configureStore} from '@reduxjs/toolkit'
import loginSlice from "./auth/loginSlice";
import forgotPswSlice from "./auth/forgotPswSlice";


const rootReducer = combineReducers({
    // Configure: ConfigureSlice
    login: loginSlice,
    forgotPsw: forgotPswSlice,
})

const mainRootReducer = (state: any, action: any) => {
    // if (action.type === '/Auth/logout/fulfilled') {
    //     state = {
    //         ...state
    //     };
    // }
    return rootReducer(state, action);
};

const store = configureStore({
    reducer: mainRootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;

