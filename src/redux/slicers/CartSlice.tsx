import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

interface CartState {

    cart: any,
    totalPrice: any,
    size:any,
    status: 'pending' | 'fulfilled' | 'rejected' | null,
    error: any,
}

const InitialState: CartState = {
    cart: [],
    totalPrice: 0,
    size:36,
    status: null,
    error: null,

}




export const getCartData = createAsyncThunk('get/cart', async (email: any) => {


    const response = await axios.post('http://172.16.0.76:8080/api/product/getcart', { email: email });
    return response.data
})
export const addCart = createAsyncThunk('add/cart', async ({ email, item,size }: any) => {
    const obj = {
        id: item.id,
        brand: item.brand,
        name: item.name,
        image: item.image,
        price: item.price,
        description: item.description,
        rating: item.rating,
        size:size,
        count: 1,
    }
    const response = await axios.put('http://172.16.0.76:8080/api/product/addcart', { email: email, item: obj });
    return response.data
})
export const removeCart = createAsyncThunk('remove/cart', async ({ email, item ,size}: any) => {
    const obj = {
        id: item.id,
        brand: item.brand,
        name: item.name,
        image: item.image,
        price: item.price,
        description: item.description,
        rating: item.rating,
        size:size,
        count: 1,
    }

    const response = await axios.put('http://172.16.0.76:8080/api/product/removecart', { email: email, item: obj });
    return response.data
})






const CartSlice = createSlice({
    name: 'CartSlice',
    initialState: InitialState,
    reducers: {
        addProduct: (state, action) => {
            if (state.cart.find((c: any) => c.id == action.payload.id)) {
                console.log('You have already added');
            }
            else {
                state.cart.push(action.payload)
                state.totalPrice += Number(action.payload.price)
            }
        },
        removeProduct: (state, action) => {
            state.cart = state.cart.filter((c: any) => c.id != action.payload.id)
            state.totalPrice -= Number(action.payload.price)

        },
        increaseProduct:(state,action)=>{
            state.totalPrice += Number(action.payload.price)
        },
        decreaseProduct:(state,action)=>{
            state.totalPrice -= Number(action.payload.price)
        },
        handleSize:(state,action)=>{
            
            state.size = action.payload
        }
        
        
    },
    extraReducers: (builder) => {
        builder.addCase(getCartData.pending, (state) => {
            state.status = 'pending'
        }).addCase(getCartData.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.cart = action.payload;
            

            state.totalPrice = state.cart.reduce((total: any, item: any) => {
                return total + Number(item.price) * Number(item.count);
            }, 0);
        }).addCase(getCartData.rejected, (state) => {
            state.status = 'rejected'
        })

    }
})
export default CartSlice.reducer

export const { addProduct, removeProduct,increaseProduct,decreaseProduct ,handleSize} = CartSlice.actions