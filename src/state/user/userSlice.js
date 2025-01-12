import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.username = action.payload.username;
      state.isAuthenticated = true;
    },
  },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
