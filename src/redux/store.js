import { configureStore } from '@reduxjs/toolkit';
import videoReducer from './videoSlice.js';
import channelReducer from './channelSlice';
import userReducer from './userSlice';

export const store = configureStore({
    reducer: {
        videos: videoReducer,
        users: userReducer,
        channel: channelReducer,
    },
});
