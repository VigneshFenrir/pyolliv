// BusSearch.tsx
import InputWithLabel from "../InputWithLabel";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { updateField } from "@/store/busSearchSlice";

const BusSearch: React.FC = () => {
  const dispatch = useDispatch();
  const busSearch = useSelector((state: RootState) => state.busSearch);

  const handleChange =
    (field: keyof typeof busSearch) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(updateField({ field, value: e.target.value }));
    };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <InputWithLabel
        label="From"
        type="text"
        placeholder="City"
        value={busSearch.from}
        onChange={handleChange("from")}
      />
      <InputWithLabel
        label="To"
        type="text"
        placeholder="City"
        value={busSearch.to}
        onChange={handleChange("to")}
      />
      <InputWithLabel
        label="Departure"
        type="date"
        placeholder=""
        value={busSearch.departure}
        onChange={handleChange("departure")}
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
