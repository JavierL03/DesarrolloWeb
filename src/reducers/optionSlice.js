import { createSlice } from '@reduxjs/toolkit';

export const optionsSlice = createSlice({
    name: 'options',
    initialState: {
        value: 'tasks',
    },
    reducers: {
        changeOption: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { changeOption } = optionsSlice.actions;
export default optionsSlice.reducer;