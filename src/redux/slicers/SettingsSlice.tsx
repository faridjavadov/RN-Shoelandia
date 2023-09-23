import { createSlice } from "@reduxjs/toolkit"

interface SettingsState {
    theme: 'Dark' | 'Light',
    language: 'Azerbaijani' | 'English' | 'Turkish',
    status: null | 'pending' | 'fulfilled' | 'rejected',
    error: any,
}

const InitialState: SettingsState = {
    theme: 'Light',
    language: 'English',
    status: null,
    error: null
}

const SettingsSlice = createSlice({
    name: 'SettingsSlice',
    initialState: InitialState,
    reducers: {
        handleTheme: (state, action) => {
            if(state.theme=='Light'){
                state.theme = 'Dark'
            }
            else{
                state.theme = 'Light'
            }
        },
        handleLanguage:(state,action)=>{
            state.language = action.payload
        }
    }
})

export default SettingsSlice.reducer

export const {handleLanguage,handleTheme } = SettingsSlice.actions