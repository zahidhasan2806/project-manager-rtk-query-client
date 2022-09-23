import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    user: {},
    accessToken: '',
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.user = action?.payload?.user
            state.accessToken = action.payload.accessToken;
        },
        userLoggedOut: (state) => {
            state.user = {};
            state.accessToken = ''
        }
    }
});

export default authSlice.reducer
export const { userLoggedIn, userLoggedOut } = authSlice.actions;