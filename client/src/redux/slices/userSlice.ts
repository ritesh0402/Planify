import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   userName: "",
   userId: "",
   userProfile: ""
}

const userSlice = createSlice({
   initialState: initialState,
   name: "user",
   reducers: {
      updateUser: (state, action) => {
         state.userName = action.payload.userName;
         state.userId = action.payload.userId;
         state.userProfile = action.payload.profile;
      },
      removeUser: (state) => {
         state.userName = "";
         state.userId = "";
         state.userProfile = "";
      },
   }
})

export default userSlice.reducer;
export const { updateUser, removeUser } = userSlice.actions