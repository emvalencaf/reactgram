// modules
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import photoService from '../services/photo.service';


const initialState = {
    photos: [],
    photo: {},
    error: false,
    success: false,
    loading: false,
    message: null
};


// functions
// Publish user photo
export const publishPhoto = createAsyncThunk(
    "photo/publish",
    async (photo, thunkAPI) => {

    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.publishPhoto(photo, token);

    // Check for errors
    if (data.errors) return thunkAPI.rejectWithValue(data.errors[0]);

    return data;

});
// Get user photos
export const getUserPhotos = createAsyncThunk(
    "photo/userphotos",
    async (id, thunkAPI) => {

        const token = thunkAPI.getState().auth.user.token;

        const data = await photoService.getUserPhotos(id, token);

        // Check for errors
        if (data.errors) return thunkAPI.rejectWithValue(data.errors[0]);

        return data;

    }
);
// Delete a photo
export const deletePhoto = createAsyncThunk(
    'photo/delete',
    async (id, thunkAPI) => {

    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.deletePhoto(id, token);

    // Check for errors
    if (data.errors) return thunkAPI.rejectWithValue(data.errors[0]);


    return data;

})

// Update a photo
export const updatePhoto = createAsyncThunk(
    'photo/update',
    async (photoData, thunkAPI) => {

        const token = thunkAPI.getState().auth.user.token;

        const data = await photoService.updatePhoto(
            {title: photoData.title},
            photoData.id,
            token
        );

        // Check for errors
        if(data.errors) return thunkAPI.rejectWithValue(data.errors[0]);

        return data;

    }
);

// Get a photo by id
export const getPhotoById = createAsyncThunk(
    'photo/getPhoto',
    async (id, thunkAPI) =>{

        const token = thunkAPI.getState().auth.user.token;

        const data = await photoService.getPhotoById(id, token);

        return data;
    }
);

// Like a photo
export const like = createAsyncThunk(
    'photo/like',
    async (id, thunkAPI) => {

        const token = thunkAPI.getState().auth.usesr.token;

        const data = await photoService.like(id, token);

        // Check for errors
        if(data.errors) return thunkAPI.rejectWithValue(data.errors[0]);

        return data;
    }
);

export const photoSlice = createSlice({
    name: "photo",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(publishPhoto.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(publishPhoto.fulfilled, (state, action) => {

                state.loading = false;
                state.success = true;
                state.error = null;
                state.photo = action.payload;
                state.photos.unshift(state.photo);
                state.message = "Foto publicada com sucesso!"
            })
            .addCase(publishPhoto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.photo = null;
            })
            .addCase(getUserPhotos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserPhotos.fulfilled, (state, action) => {

                state.loading = false;
                state.success = true;
                state.error = null;
                state.photos = action.payload;
            })
            .addCase(deletePhoto.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(deletePhoto.fulfilled, (state, action) => {

                state.loading = false;
                state.success = true;
                state.error = null;
                state.photos.filter(photo => photo._id !== action.payload.id);
                state.message = action.payload.message;
            })
            .addCase(deletePhoto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.photo = null;
            })
            .addCase(updatePhoto.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(updatePhoto.fulfilled, (state, action) => {

                state.loading = false;
                state.success = true;
                state.error = null;
                state.photos.map(photo => {
                    if(photo._id === action.payload.photo._id) return photo.title = action.payload.hoto.title;
                    
                    return photo;
                });

                state.message = action.payload.message;
            })
            .addCase(updatePhoto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.photo = null;
            })
            .addCase(getPhotoById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPhotoById.fulfilled, (state, action) => {

                state.loading = false;
                state.success = true;
                state.error = null;
                state.photo = action.payload;
            })
            .addCase(like.fulfilled, (state, action) => {

                state.loading = false;
                state.success = true;
                state.error = null;

                if(state.photo.likes) state.photo.likes.push(action.payload.userId);
                
                state.photos.map(photo => {
                    if(photo._id === action.payload.photo.photoId) return photo.likes.push(action.payload.userId);
                    
                    return photo;
                });

                state.message = action.payload.message;
            })
            .addCase(like.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.photo = null;
            })
    }

});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;