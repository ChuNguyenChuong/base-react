import { DefaultDelegate } from '@app/constants/tableColumns';
import { createSlice } from '@reduxjs/toolkit';
import { IDelegate } from '@app/types/generalTypes';

export interface IDelegateSlice {
  focusData: IDelegate;
}

const initialState: IDelegateSlice = {
  focusData: DefaultDelegate,
};

const delegateSlice = createSlice({
  name: 'delegate',
  initialState,
  reducers: {
    setDataFocus(state, action: { payload: IDelegate }) {
      state.focusData = action.payload;
    },
  },
});
export const { setDataFocus } = delegateSlice.actions;
export default delegateSlice.reducer;
