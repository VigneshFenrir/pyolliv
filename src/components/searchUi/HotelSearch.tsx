import React from "react";
import InputWithLabel from "../InputWithLabel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { updateField } from "@/store/hotelSearchSlice";

const HotelSearch: React.FC = () => {
  const dispatch = useDispatch();
  const hotelSearch = useSelector((state: RootState) => state.hotelSearch);

  const handleChange =
    (field: keyof typeof hotelSearch) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(updateField({ field, value: e.target.value }));
    };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <InputWithLabel
        label="Location"
        type="text"
        placeholder="City or Hotel"
        value={hotelSearch.location}
        onChange={handleChange("location")}
      />
      <InputWithLabel
        label="Check-In"
        type="date"
        placeholder=""
        value={hotelSearch.checkIn}
        onChange={handleChange("checkIn")}
      />
      <InputWithLabel
        label="Check-Out"
        type="date"
        placeholder=""
        value={hotelSearch.checkOut}
        onChange={handleChange("checkOut")}
      />
      <InputWithLabel
        label="Guests"
        type="number"
        placeholder="2"
        value={hotelSearch.guests.toString()}
        onChange={handleChange("guests")}
      />
      <InputWithLabel
        label="Rooms"
        type="number"
        placeholder="1"
        value={hotelSearch.rooms.toString()}
        onChange={handleChange("rooms")}
      />
    </div>
  );
};

export default HotelSearch;
