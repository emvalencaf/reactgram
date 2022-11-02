// modules
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import photoService from '../services/auth.service';


const initialState = {
    photos: [],
    photo:{},
    error: false,
    success: false,
    loading: false,
    message: null
};


// functions
export const photoSlice = createSlice({
    name: "photo",
    initialState,
    reducers:{
        resetMessage:(state) =>{
            state.message = null;
        }
    }

});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;
