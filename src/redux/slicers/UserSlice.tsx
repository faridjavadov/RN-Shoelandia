import {createSlice} from '@reduxjs/toolkit'


interface UserState { 
    userEmail:String,
    userPassword:String,
    status: 'pending'|'fulfilled'|'rejected'|null,
    error:any,
}

const InitialState : UserState = {
    userEmail:'',
    userPassword:'',
    status:null,
    error:null
}


const UserSlice = createSlice({
    name:'StatusSlice',
    initialState:InitialState,
    reducers:{
        handleEmail:(state,action)=>{
            state.userEmail = action.payload
        },
        handlePassword:(state,action)=>{
            state.userPassword = action.payload
        }
    }

})

export default UserSlice.reducer

export const {handleEmail,handlePassword} = UserSlice.actions