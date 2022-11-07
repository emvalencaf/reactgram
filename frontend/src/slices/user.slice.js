import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserService } from '../services/user.service';

const initialState = {
    user:{},
    error: false,
    success: false,
    loading: false,
    message: null
};

// Get user details
export const profile = createAsyncThunk(
    "user/profile",
    async (user, thunkAPI) =>{

    // get user token
    const token = thunkAPI.getState().auth.user.token;

    const data = await UserService.getUserProfile(user, token);

    return data;

});

// Update user details
 
export const updateProfile = createAsyncThunk(
    "user/update",
    async (user, thunkAPI) => {
        
    const token = thunkAPI.getState().auth.user.token;
    
    const data = await UserService.updateProfile(user, token);
    

    // Check for errors
    if(data.errors) return thunkAPI.rejectWithValue(data.errors[0]);
    

    return data;
});

// Get user details
export const getUserDetails = createAsyncThunk(
    'user/get',
    async (id, thunkAPI) => {
    
    const token = thunkAPI.getState().auth.user.token;

    const data = await UserService.getUserDetails(id, token);

    return data;

})

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        resetMessage: (state) => {
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(profile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(profile.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.user = action.payload;
            })
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.user = action.payload;
                state.message = "Usuário atualizado com sucesso!"
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.user = null;
            })
            .addCase(getUserDetails.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getUserDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.user = action.payload;
            })
    }

});


export const { resetMessage } = userSlice.actions;

export default userSlice.reducer;