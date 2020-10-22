import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "./types";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated:null,
    isLoading:false,
    user:null,
    userID:null
}

export default function  (state = initialState,action){
    switch(action.type){
        case USER_LOADING:
            return {
                ...state,
                isLoading:true
            };
        case USER_LOADED:
            return{
                ...state,
                ...action.payload,
                isAuthenticated:true,
                isLoading:false,
                user:action.payload,
                userID:action.payload.user.id
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem("token",action.payload.token);
            return{
                ...state,
                ...action.payload,
                isAuthenticated:true,
                isLoading:false,
                user:action.payload,
                userID:action.payload.user.id

            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem("token");
            return{
                ...state,
                token:null,
                user:null,
                isAuthenticated:false,
                isLoading:false,
                userID:null
            }
        default: return state
    }
}