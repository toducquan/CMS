import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    room: {}
};

const room = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setRoomList(state, action) {
            state.room = action.payload.room;
        },
        removeRoom(state, action) {
            state.room = {};
        }
    }
});

export default room.reducer;

export const { setRoomList, removeRoom } = room.actions;
