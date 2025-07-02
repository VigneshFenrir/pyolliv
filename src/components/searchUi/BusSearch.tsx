// BusSearch.tsx
import InputWithLabel from "../InputWithLabel";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { updateField } from "@/store/busSearchSlice";
import SearchableSelect from "../SearchableSelect";
import { DatePicker } from "../DatePicker";

const BusSearch: React.FC = () => {
  const dispatch = useDispatch();
  const busSearch = useSelector((state: RootState) => state.busSearch);

  const handleChange =
    (field: keyof typeof busSearch) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(updateField({ field, value: e.target.value }));
    };
  const cities = ["New York", "London", "Paris", "Tokyo", "Dubai", "Delhi"];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <SearchableSelect
        label={"From"}
        value={busSearch.from}
        options={cities}
        onChange={(val) => dispatch(updateField({ field: "from", value: val }))}
      />
      <SearchableSelect
        label={"To"}
        value={busSearch.to}
        options={cities}
        onChange={(val) => dispatch(updateField({ field: "to", value: val }))}
      />

      <DatePicker
        label={"departure"}
        selectedDate={
          busSearch.departure ? new Date(busSearch.departure) : undefined
        }
        onDateChange={(date) =>
          dispatch(
            updateField({
              field: "departure",
              value: date ? date.toISOString().split("T")[0] : "",
            })
          )
        }
      />
      <InputWithLabel
        label="Passengers"
        type="number"
        placeholder="1"
        value={busSearch.passengers.toString()}
        onChange={handleChange("passengers")}
      />
    </div>
  );
};

export default BusSearch;
