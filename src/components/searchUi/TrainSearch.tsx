import React from "react";
import InputWithLabel from "../InputWithLabel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { updateField } from "@/store/trainSearchSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const TrainSearch: React.FC = () => {
  const dispatch = useDispatch();
  const trainSearch = useSelector((state: RootState) => state.trainSearch);

  const handleChange =
    (field: keyof typeof trainSearch) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      dispatch(updateField({ field, value: e.target.value }));
    };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <InputWithLabel
        label="From"
        type="text"
        placeholder="City or Station"
        value={trainSearch.from}
        onChange={handleChange("from")}
      />
      <InputWithLabel
        label="To"
        type="text"
        placeholder="Destination"
        value={trainSearch.to}
        onChange={handleChange("to")}
      />
      <InputWithLabel
        label="Departure"
        type="date"
        placeholder=""
        value={trainSearch.departure}
        onChange={handleChange("departure")}
      />
      <InputWithLabel
        label="Return (Optional)"
        type="date"
        placeholder=""
        value={trainSearch.returnDate}
        onChange={handleChange("returnDate")}
      />
      <InputWithLabel
        label="Passengers"
        type="number"
        placeholder="1"
        value={trainSearch.passengers.toString()}
        onChange={handleChange("passengers")}
      />
      <div className="flex flex-col gap-1">
        <label
          htmlFor="travelClass"
          className="text-sm font-semibold text-gray-700"
        >
          Class
        </label>
        <Select
          value={trainSearch.travelClass}
          onValueChange={(value) =>
            dispatch(updateField({ field: "travelClass", value }))
          }
        >
          <SelectTrigger id="travelClass" className="w-full">
            <SelectValue placeholder="Select class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Sleeper">Sleeper</SelectItem>
            <SelectItem value="3A">3rd AC (3A)</SelectItem>
            <SelectItem value="2A">2nd AC (2A)</SelectItem>
            <SelectItem value="1A">1st AC (1A)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TrainSearch;
