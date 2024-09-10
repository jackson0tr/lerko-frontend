import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: "",
    user: ""
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        userRegistration: (state,action:PayloadAction<{token:string}>)=>{
            state.token = action.payload.token;
        },
        userActivation:(state,action:PayloadAction<{activateToken:string}>)=>{
            state.token = action.payload.activateToken;
        },
        userLoggedIn: (state,action:PayloadAction<{accessToken:string,user:string}>)=>{
            state.token = action.payload.accessToken;
            state.user = action.payload.user;
        },
        userResetPassword: (state,action:PayloadAction<{accessToken:string}>)=>{
            state.token = action.payload.accessToken;
        },
        userLoggedOut:(state)=>{
            state.token = "";
            state.user = "";
        },
    },
});


export const {userRegistration,userLoggedIn,userLoggedOut,userActivation,userResetPassword} = authSlice.actions;


export default authSlice.reducer;