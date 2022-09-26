import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    assignedProjectsQuery: '',
    searchString: '',
}

const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        setAssignedProjectsQuery: (state, action) => {
            state.assignedProjectsQuery = action.payload;
        },
        search: (state, action) => {
            state.searchString = action.payload;
        },
    }
});

export const { setAssignedProjectsQuery, search } = projectsSlice.actions;
export default projectsSlice.reducer