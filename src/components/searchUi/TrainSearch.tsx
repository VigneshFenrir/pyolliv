import React from "react";
import InputWithLabel from "../InputWithLabel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { updateField } from "@/store/trainSearchSlice";

import SearchableSelect from "../SearchableSelect";
import { DatePicker } from "../DatePicker";
import CommonSelect from "../CommonSelect";

const TrainSearch: React.FC = () => {
  const dispatch = useDispatch();
  const trainSearch = useSelector((state: RootState) => state.trainSearch);

  const handleChange =
    (field: keyof typeof trainSearch) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      dispatch(updateField({ field, value: e.target.value }));
    };
  const cities = ["New York", "London", "Paris", "Tokyo", "Dubai", "Delhi"];
  const trainClasses = [
    { label: "Sleeper", value: "Sleeper" },
    { label: "3rd AC (3A)", value: "3A" },
    { label: "2nd AC (2A)", value: "2A" },
    { label: "1st AC (1A)", value: "1A" },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <SearchableSelect
        label="From"
        value={trainSearch.from}
        options={cities}
        onChange={(val) => dispatch(updateField({ field: "from", value: val }))}
      />
      <SearchableSelect
        label="to"
        value={trainSearch.to}
        options={cities}
        onChange={(val) => dispatch(updateField({ field: "to", value: val }))}
      />
      <DatePicker
        label="Departure"
        selectedDate={
          trainSearch.departure ? new Date(trainSearch.departure) : undefined
        }
        onDateChange={(date) =>
          dispatch(
            updateField({
              field: "departure",
              value: date ? date.toISOString().split("T")[0] : "",
            })
          )
        }
        placeholder="Select departure date"
      />

      <DatePicker
        label="Return (Optional)"
        selectedDate={
          trainSearch.returnDate ? new Date(trainSearch.returnDate) : undefined
        }
        onDateChange={(date) =>
          dispatch(
            updateField({
              field: "returnDate",
              value: date ? date.toISOString().split("T")[0] : "",
            })
          )
        }
        placeholder="Select departure date"
      />
      <InputWithLabel
        label="Passengers"
        type="number"
        placeholder="1"
        value={trainSearch.passengers.toString()}
        onChange={handleChange("passengers")}
      />

      <CommonSelect
        label={"Class"}
        value={trainSearch.travelClass}
        onChange={(val) =>
          dispatch(updateField({ field: "travelClass", value: val }))
        }
        options={trainClasses}
      />
    </div>
  );
};

export default TrainSearch;
