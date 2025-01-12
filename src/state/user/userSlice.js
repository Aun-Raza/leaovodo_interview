import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: -1,
  username: '',
  firstName: '',
  lastName: '',
  gender: '',
  image: '',
  refreshToken: '',
  accessToken: '',
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
