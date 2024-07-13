import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   username: "",
   userId: "",
   userProfile: "",
   isAuthenticated: false
}

const userSlice = createSlice({
   initialState: initialState,
   name: "user",
   reducers: {
      updateUser: (state, action) => {
         state.username = action.payload.username;
         // state.userId = action.payload.userId;
         state.userProfile = action.payload.profile;
         state.isAuthenticated = action.payload.isAuthenticated;
      },
      removeUser: (state) => {
         state.username = "";
         // state.userId = "";
         state.userProfile = "";
         state.isAuthenticated = false;
      },
   }
})

export default userSlice.reducer;
export const { updateUser, removeUser } = userSlice.actions