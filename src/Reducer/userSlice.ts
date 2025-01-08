import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User{   
    uuid: any,
    name: string,   
    email: string,
    profilePic: string,
}
//State
interface UserState{
    userDetails: User | null   
}
const initialState: UserState = {
    userDetails: null,
}


export const userSlice =  createSlice({
    name: 'user',
    initialState,
    reducers:{
        addUser: (state, action : PayloadAction<User>) =>{
            state.userDetails = {
                ... state.userDetails,
                uuid: action.payload.uuid, 
                name: action.payload.name, 
                email: action.payload.email, 
                profilePic: action.payload.profilePic
            }
        },
    }
})

export default  userSlice.reducer
export const {addUser} = userSlice.actions