import { createStore } from "redux";
import {configureStore, } from "@reduxjs/toolkit";
import StatusSlice from "../slicers/StatusSlice";
import ShoesSlice from "../slicers/ShoesSlice";
import CartSlice from "../slicers/CartSlice";
import SettingsSlice from "../slicers/SettingsSlice";
import UserSlice from "../slicers/UserSlice";

export const store = configureStore({
    reducer:{
        StatusSlice:StatusSlice,
        ShoesSlice:ShoesSlice,
        CartSlice:CartSlice,
        SettingsSlice:SettingsSlice,
        UserSlice:UserSlice
    }
})
export type AppDispatch = typeof store.dispatch
export type StateType = ReturnType<typeof store.getState>