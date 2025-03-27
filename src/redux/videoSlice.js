import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const baseUrl = import.meta.env.VITE_SERVER_URL;


// Fetch all videos
export const fetchVideos = createAsyncThunk('videos/fetchVideos', async () => {
    const response = await axios.get(`${baseUrl}/api/videos`);
    return response.data;
});

// Create a video
export const createVideo = createAsyncThunk('videos/createVideo', async (videoData) => {
    const response = await axios.post(`${baseUrl}/api/videos`, videoData);
    return response.data;
});

// Update a video
export const updateVideo = createAsyncThunk('videos/updateVideo', async ({ id, updatedData }) => {
    const response = await axios.put(`${baseUrl}/api/videos/${id}`, updatedData);
    return response.data;
});

// Delete a video
export const deleteVideo = createAsyncThunk('videos/deleteVideo', async (videoId) => {
    await axios.delete(`${baseUrl}/api/videos/${videoId}`);
    return videoId;
});

// Like a video
export const likeVideo = createAsyncThunk('videos/likeVideo', async (videoId) => {
    const response = await axios.post(`${baseUrl}/api/videos/${videoId}/like`);
    return response.data;
});

const videoSlice = createSlice({
    name: 'videos',
    initialState: {
        videos: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVideos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchVideos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.videos = action.payload;
            })
            .addCase(fetchVideos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createVideo.fulfilled, (state, action) => {
                state.videos.push(action.payload);
            })
            .addCase(updateVideo.fulfilled, (state, action) => {
                const index = state.videos.findIndex((v) => v._id === action.payload._id);
                if (index !== -1) state.videos[index] = action.payload;
            })
            .addCase(deleteVideo.fulfilled, (state, action) => {
                state.videos = state.videos.filter((v) => v._id !== action.payload);
            })
            .addCase(likeVideo.fulfilled, (state, action) => {
                const index = state.videos.findIndex((v) => v._id === action.payload._id);
                if (index !== -1) state.videos[index] = action.payload;
            });
    },
});

export default videoSlice.reducer;
