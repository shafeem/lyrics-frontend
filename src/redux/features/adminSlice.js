import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token :null,
    email :null
}

export const adminSlice = createSlice({
    name : 'admin',
    initialState,
    reducers:{
        setLogin:(state,action) =>{
            state.token = action.payload.token;
            state.email = action.payload.email;
        },
        setLogout:(state) =>{
            state.token = null;
            state.email = null;
        }
    }
})

export const {setLogin,setLogout} = adminSlice.actions;

export default adminSlice.reducer;