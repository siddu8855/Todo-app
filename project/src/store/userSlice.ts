import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types';

const initialState: User = {
  email: '',
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.email = '';
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;