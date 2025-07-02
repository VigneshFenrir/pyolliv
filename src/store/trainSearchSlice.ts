import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TrainSearchState {
  from: string;
  to: string;
  departure: string;
  returnDate: string;
  passengers: number;
  travelClass: string;
}

const initialState: TrainSearchState = {
  from: "",
  to: "",
  departure: "",
  returnDate: "",
  passengers: 1,
  travelClass: "Sleeper",
};

const trainSearchSlice = createSlice({
  name: "trainSearch",
  initialState,
  reducers: {
    updateField: <K extends keyof TrainSearchState>(
      state: { [x: string]: string | number; },
      action: PayloadAction<{ field: K; value: TrainSearchState[K] }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },
  },
});

export const { updateField } = trainSearchSlice.actions;
export default trainSearchSlice.reducer;
