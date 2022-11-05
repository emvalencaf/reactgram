import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../services/user.service';

const initialState = {
    user:{},
    error: false,
    success: false,
    loading: false,
    message: null
};

// Get user details
export const profile = createAsyncThunk("user/profile", async (user, thunkAPI) =>{

    // get user token
    const token = thunkAPI.getState().auth.user.token;

    const data = await userService.profile(user, token);

    return data;

});

// Update user details
export const updateProfile = createAsyncThunk("user/update", async (user, thunkAPI) => {
    console.log("entramos no slice update");    
    const token = thunkAPI.getState().auth.user.token;
    console.log('Conseguimos o token de acesso');
    const data = await userService.updateProfile(user, token);
    console.log("voltamos ao slice update")
    // Check for errors
    if(data.errors) return thunkAPI.rejectWithValue(data.errors[0]);
    console.log('saímos do slice update')
    return data;
});

// Get user details
export const getUserDetails = createAsyncThunk('user/get', async (id, thunkAPI) => {

    const data = await userService.getUserDetails(id);

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
                state.error = false;
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
                state.user = {};
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