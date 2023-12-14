import { readUser } from '@app/services/localStorage.service';
import { IUser } from '@app/types/generalTypes';
import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  profile: IUser | undefined;
}

const initialState: UserState = {
  profile: readUser(),
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem('user', JSON.stringify(action.payload));
      state.profile = action.payload;
    },
    logout: (state) => {
      localStorage.clear();
      state.profile = undefined;
    },
  },
});
export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
