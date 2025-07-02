import React from "react";
import InputWithLabel from "../InputWithLabel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { updateField } from "@/store/hotelSearchSlice";
import SearchableSelect from "../SearchableSelect";
import { DatePicker } from "../DatePicker";

const HotelSearch: React.FC = () => {
  const dispatch = useDispatch();
  const hotelSearch = useSelector((state: RootState) => state.hotelSearch);

  const handleChange =
    (field: keyof typeof hotelSearch) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(updateField({ field, value: e.target.value }));
    };

  const cities = ["New York", "London", "Paris", "Tokyo", "Dubai", "Delhi"];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <SearchableSelect
        label="Location"
        value={hotelSearch.location}
        options={cities}
        onChange={(val) =>
          dispatch(updateField({ field: "location", value: val }))
        }
      />

      <DatePicker
        label="Check-In"
        selectedDate={
          hotelSearch.checkIn ? new Date(hotelSearch.checkIn) : undefined
        }
        onDateChange={(date) =>
          dispatch(
            updateField({
              field: "checkIn",
              value: date ? date.toISOString().split("T")[0] : "",
            })
          )
        }
        placeholder="Select Check-In date"
      />
      <DatePicker
        label="Check-Out"
        selectedDate={
          hotelSearch.checkOut ? new Date(hotelSearch.checkOut) : undefined
        }
        onDateChange={(date) =>
          dispatch(
            updateField({
              field: "checkOut",
              value: date ? date.toISOString().split("T")[0] : "",
            })
          )
        }
        placeholder="Select Check-In date"
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
