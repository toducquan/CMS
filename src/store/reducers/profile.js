import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    profile: {}
};

const profile = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        raiseProfile(state, action) {
            state.profile = action.payload.profile;
        },
        removeProfile(state, action) {
            state.profile = {};
        }
    }
});

export default profile.reducer;

export const { raiseProfile, removeProfile } = profile.actions;
