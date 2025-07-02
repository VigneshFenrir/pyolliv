import { configureStore } from "@reduxjs/toolkit";
import flightSearchReducer from "./flightSearchSlice";
import busSearchReducer from "./busSearchSlice";
import trainSearchReducer from "./trainSearchSlice";
import hotelSearchReducer from "./hotelSearchSlice";

export const store = configureStore({
  reducer: {
    flightSearch: flightSearchReducer,
    busSearch: busSearchReducer,
    trainSearch: trainSearchReducer,
    hotelSearch: hotelSearchReducer,
  },
});

// Types for useSelector and useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Optional: export default if you want to use default import
export default store;
