import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    buildingManager: {},
    floorManager: {}
};

const manager = createSlice({
    name: 'manager',
    initialState,
    reducers: {
        setBuildingManager(state, action) {
            state.buildingManager = action.payload.buildingManager;
        },
        setFloorManager(state, action) {
            state.floorManager = action.payload.floorManager;
        }
    }
});

export default manager.reducer;

export const { setBuildingManager, setFloorManager } = manager.actions;
