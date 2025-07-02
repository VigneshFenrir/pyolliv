import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BusSearchState {
  from: string;
  to: string;
  departure: string;
  passengers: number;
}

const initialState: BusSearchState = {
  from: "",
  to: "",
  departure: "",
  passengers: 1,
};

export const busSearchSlice = createSlice({
  name: "busSearch",
  initialState,
  reducers: {
    updateField: <K extends keyof BusSearchState>(
      state: { [x: string]: string | number; },
      action: PayloadAction<{ field: K; value: BusSearchState[K] }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },
  },
});

export const { updateField } = busSearchSlice.actions;
export default busSearchSlice.reducer;
