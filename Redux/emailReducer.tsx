import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface EmailState {
  value: string;
}

const initialState: EmailState = {
  value: '',
};

export const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setEmail } = emailSlice.actions;

export default emailSlice.reducer;
