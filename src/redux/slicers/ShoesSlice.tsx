import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { sneakers } from "../../data/Sneakers"
import axios from "axios";
import { useSelector } from "react-redux";
import { StateType } from "../store/Store";

interface ShoesSlice {
    data: any,
    favorites: any,
    cart: any,
    status: 'pending' | 'fulfilled' | 'rejected' | null,
    error: any,
}

const InitialState: ShoesSlice = {
    data: sneakers,
    favorites: [],
    cart: [],
    status: null,
    error: null
}







export const getFavoriteData = createAsyncThunk('get/favorite', async (email: any) => {
    console.log(email);
    
    const response = await axios.post('http://172.16.0.76:8080/api/product/getfavorite', { email: email });
    return response.data
})
export const addFavorite = createAsyncThunk('remove/favorite', async ({email,item}:any) => {
    
    const response = await axios.put('http://172.16.0.76:8080/api/product/addfavorite', { email: email ,item:item});
    return response.data
})
export const removeFavorite = createAsyncThunk('remove/favorite', async  ({email,item}:any) => {

    const response = await axios.put('http://172.16.0.76:8080/api/product/removefavorite', { email: email,item:item });
    return response.data
})



const ShoesSlice = createSlice({
    name: 'ShoesSlice',
    initialState: InitialState,
    reducers: {
        handleFavorite: (state, action) => {
            if (state.favorites.find((c: any) => c.id == action.payload.id)) {


                state.favorites = state.favorites.filter((c: any) => c.id != action.payload.id)

            }
            else {
                state.favorites.push(action.payload)
            }
        },
    },
    extraReducers: (builder) => {
       
        builder.addCase(getFavoriteData.pending, (state) => {
            state.status = 'pending'
        }).addCase(getFavoriteData.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.favorites = action.payload
        }).addCase(getFavoriteData.rejected, (state) => {
            state.status = 'rejected'
        })

    }
})
export default ShoesSlice.reducer

export const { handleFavorite, } = ShoesSlice.actions