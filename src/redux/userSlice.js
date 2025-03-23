import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch all users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get('/api/users');
    return response.data;
});

// User login
export const loginUser = createAsyncThunk('users/loginUser', async (loginData, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/users/login', loginData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data || 'Login failed');
    }
});

// Logout user
export const logoutUser = createAsyncThunk('users/logoutUser', async () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    return null;
});

const userSlice = createSlice({
    name: 'users',
    initialState: {
        user: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user') || '{}') : null,
        token: sessionStorage.getItem('token') || null,    
        status: 'idle',
        error: null,
    },
    reducers: {
        logoutUser: (state) => {
            state.user = null;
            state.token = null;
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.status = 'succeeded';
                state.error = null;
                sessionStorage.setItem('user', JSON.stringify(action.payload.user));
                sessionStorage.setItem('token', action.payload.token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Login failed';
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.token = null;
            });
    },
});

export const { setUser, logoutUser: logoutAction } = userSlice.actions;
export default userSlice.reducer;
