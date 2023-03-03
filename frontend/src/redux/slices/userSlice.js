import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auth: false,
    userId: "",
    user: {}
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        initialize: (state, action) => {
            state.auth = action.payload.auth
            state.user = action.payload.user
            state.userId = action.payload.user._id

            return state
        }
    }
})

export const { initialize } = userSlice.actions
export default userSlice.reducer