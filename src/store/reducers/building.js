import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    building: {}
};

const building = createSlice({
    name: 'building',
    initialState,
    reducers: {
        setBuildingList(state, action) {
            state.building = action.payload.building;
        },
        removeBuilding(state, action) {
            state.building = {};
        }
    }
});

export default building.reducer;

export const { setBuildingList, removeBuilding } = building.actions;
