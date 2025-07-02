import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FlightSearchState {
  from: string;
  to: string;
  departure: string;
  returnDate: string;
  passengers: number;
  travelClass: string;
}

const initialState: FlightSearchState = {
  from: '',
  to: '',
  departure: '',
  returnDate: '',
  passengers: 1,
  travelClass: 'Economy',
};

const flightSearchSlice = createSlice({
  name: 'flightSearch',
  initialState,
  reducers: {
    updateField: <K extends keyof FlightSearchState>(
      state: { [x: string]: string | number; },
      action: PayloadAction<{ field: K; value: FlightSearchState[K] }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },
    resetFields: () => initialState,
  },
});

export const { updateField, resetFields } = flightSearchSlice.actions;
export default flightSearchSlice.reducer;
