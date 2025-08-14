import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    email: string | null;
    name: string | null;
    surname: string | null;
  };
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: {
    email: null,
    name: null,
    surname: null,
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ email: string, name: string, surname: string }>) {
      state.isAuthenticated = true;
      state.user.email = action.payload.email;
      state.user.name = action.payload.name;
      state.user.surname = action.payload.surname;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user.email = null;
      state.user.name = null;
      state.user.surname = null;
    }
  }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;