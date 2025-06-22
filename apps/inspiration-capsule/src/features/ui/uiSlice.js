// src/features/ui/uiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  type: 'info', // 'success' | 'error' | 'info'
  visible: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // 在 JS 中，我们直接从 action.payload 中解构出需要的数据
    showNotification(state, action) {
      state.visible = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    hideNotification(state) {
      state.visible = false;
    },
  },
});

export const { showNotification, hideNotification } = uiSlice.actions;
export default uiSlice.reducer;