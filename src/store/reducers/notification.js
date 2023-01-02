import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    visible: false,
    content: undefined,
    severity: undefined
};

const notification = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        raiseNotification(state, action) {
            state.visible = action.payload.visible;
            state.content = action.payload.content;
            state.severity = action.payload.severity;
        },
        removeNotification(state, action) {
            state.visible = false;
            // state.content = undefined;
            // state.severity = undefined;
        }
    }
});

export default notification.reducer;

export const { raiseNotification, removeNotification } = notification.actions;
