import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AbsenSlice {
  clockIn: string | null;
  clockOut: string | null;
}

const initialState: AbsenSlice = {
  clockIn: '',
  clockOut: '',
};

export const absenSlice = createSlice({
  name: 'absen',
  initialState,
  reducers: {
    addAbsenSlice: (state, action: PayloadAction<AbsenSlice>) => {
      state.clockIn = action.payload.clockIn;
      state.clockOut = action.payload.clockOut;
    },
    removeAbsenSlice: (state) => {
      state.clockIn = '';
      state.clockOut = '';
    },
  },
});

export const { addAbsenSlice, removeAbsenSlice } = absenSlice.actions;
export default absenSlice.reducer;
