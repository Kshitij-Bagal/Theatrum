import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch all channels
export const fetchChannels = createAsyncThunk('channels/fetchChannels', async () => {
    const response = await axios.get('/api/channels');
    return response.data;
});

// Create a new channel
export const createChannel = createAsyncThunk('channels/createChannel', async (channelData) => {
    const response = await axios.post('/api/channels', channelData);
    return response.data;
});

// Update a channel
export const updateChannel = createAsyncThunk('channels/updateChannel', async ({ id, updatedData }) => {
    const response = await axios.put(`/api/channels/${id}`, updatedData);
    return response.data;
});

// Delete a channel
export const deleteChannel = createAsyncThunk('channels/deleteChannel', async (channelId) => {
    await axios.delete(`/api/channels/${channelId}`);
    return channelId;
});

// Subscribe to a channel
export const subscribeChannel = createAsyncThunk('channels/subscribeChannel', async (channelId) => {
    const response = await axios.post(`/api/channels/${channelId}/subscribe`);
    return response.data;
});

// Unsubscribe from a channel
export const unsubscribeChannel = createAsyncThunk('channels/unsubscribeChannel', async (channelId) => {
    const response = await axios.post(`/api/channels/${channelId}/unsubscribe`);
    return response.data;
});
//Fetch channels created by a specific user
export const fetchUserChannels = createAsyncThunk('channels/fetchUserChannels', async (userId) => {
    const response = await axios.get(`/api/channels/${userId}`);
    return response.data;
});


const channelSlice = createSlice({
    name: 'channel',
    initialState: {
        channels: [],
        userChannels: [],  // Store user-specific channels separately
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChannels.pending, (state) => {
                state.status = 'loading';
            })
            // Normalizing channel data in Redux slice
            .addCase(fetchChannels.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.channels = action.payload.map(channel => ({
                    ...channel,
                    id: channel._id,    // Add an `id` field
                    videos: channel.videos.map(video => ({
                        ...video,
                        id: video._id   // Add an `id` field to videos too
                    }))
                }));
            })
            .addCase(fetchChannels.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createChannel.fulfilled, (state, action) => {
                state.channels.push(action.payload);
            })
            .addCase(updateChannel.fulfilled, (state, action) => {
                const index = state.channels.findIndex((ch) => ch._id === action.payload._id);
                if (index !== -1) state.channels[index] = action.payload;
            })
            .addCase(deleteChannel.fulfilled, (state, action) => {
                state.channels = state.channels.filter((ch) => ch._id !== action.payload);
            })
            .addCase(subscribeChannel.fulfilled, (state, action) => {
                const index = state.channels.findIndex((ch) => ch._id === action.payload._id);
                if (index !== -1) state.channels[index] = action.payload;
            })
            .addCase(unsubscribeChannel.fulfilled, (state, action) => {
                const index = state.channels.findIndex((ch) => ch._id === action.payload._id);
                if (index !== -1) state.channels[index] = action.payload;
            })
            .addCase(fetchUserChannels.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserChannels.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userChannels = action.payload;
            })
            .addCase(fetchUserChannels.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default channelSlice.reducer;
