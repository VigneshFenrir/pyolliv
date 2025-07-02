import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HotelSearchState {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
}

const initialState: HotelSearchState = {
  location: "",
  checkIn: "",
  checkOut: "",
  guests: 2,
  rooms: 1,
};

const hotelSearchSlice = createSlice({
  name: "hotelSearch",
  initialState,
  reducers: {
    updateField: <K extends keyof HotelSearchState>(
      state: { [x: string]: string | number; },
      action: PayloadAction<{ field: K; value: HotelSearchState[K] }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },
  },
});

export const { updateField } = hotelSearchSlice.actions;
export default hotelSearchSlice.reducer;
