import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '@app/store/slices/userSlice';
import nightModeReducer from '@app/store/slices/nightModeSlice';
import themeReducer from '@app/store/slices/themeSlice';
import pwaReducer from '@app/store/slices/pwaSlice';
import delegateReducer from '@app/store/slices/delegateSlide';

export default combineReducers({
  user: userReducer,
  nightMode: nightModeReducer,
  theme: themeReducer,
  pwa: pwaReducer,
  delegate: delegateReducer,
});
