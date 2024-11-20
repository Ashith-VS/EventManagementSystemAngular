import { userModel } from './../../models/user.model';
import { createReducer, on } from "@ngrx/store";
import { authenticationAction, logoutAction } from "../actions/authentication.action";

export interface InitialState {
    userState:userModel
}

const initialState: InitialState={
    userState: new Object() as userModel,
}

export const authenticationReducer=createReducer(
    initialState,
    on(authenticationAction,(state,payload)=>{
        // console.log('payload78: ', payload);
        return{
            ...state,
            userState:payload
        }})
        ,on(logoutAction, () => initialState)
            
)