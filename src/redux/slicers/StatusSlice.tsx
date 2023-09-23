import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';



export const fetchLoginStatus = createAsyncThunk(
    'StatusSlice/fetchLoginStatus',
    async (_, { dispatch }) => {
      try {
        const loginStatus = await AsyncStorage.getItem('loggedIn');
        
        if (loginStatus === 'true') {
          dispatch(handleLogin(true));
        }
      } catch (error) {
        // Handle error if needed
      }
    }
  );


interface StatusSlice { 
    loginStatus:boolean,
    status: 'pending'|'fulfilled'|'rejected'|null,
    error:any,
}


const InitialState : StatusSlice = {
    loginStatus:false,
    status:null,
    error:null
}

const StatusSlice = createSlice({
    name:'StatusSlice',
    initialState:InitialState,
    reducers:{
        handleLogin:(state,action)=>{
            state.loginStatus = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchLoginStatus.pending, (state) => {
          state.status = 'pending';
        });
        builder.addCase(fetchLoginStatus.fulfilled, (state) => {
          state.status = 'fulfilled';
        });
        builder.addCase(fetchLoginStatus.rejected, (state, action) => {
          state.status = 'rejected';
          state.error = action.error.message;
        });
      },

})

export default StatusSlice.reducer

export const {handleLogin} = StatusSlice.actions