import React, { useState } from "react";
import InputWithLabel from "../InputWithLabel";
import TripTypeOption from "../TripTypeOption";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { updateField } from "@/store/flightSearchSlice";
import SearchableSelect from "../SearchableSelect";
import { DatePicker } from "../DatePicker";

import CommonSelect from "../CommonSelect";

export type TripType = "oneway" | "roundtrip" | "multicity";

const FlightSearch: React.FC = () => {
  const dispatch = useDispatch();
  const flightSearch = useSelector((state: RootState) => state.flightSearch);
  const [triptype, setTripType] = useState<TripType>("oneway");

  const handleChange =
    (field: keyof typeof flightSearch) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(updateField({ field, value: e.target.value }));
    };
  const cities = ["New York", "London", "Paris", "Tokyo", "Dubai", "Delhi"];
  const flightClasses = [
    { label: "Basic Economy", value: "Basic Economy" },
    { label: "Economy", value: "Economy" },
    { label: "Premium Economy", value: "Premium Economy" },
    { label: "First Class", value: "First Class" },
  ];
  return (
    <>
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <TripTypeOption
          label="One way"
          selected={triptype === "oneway"}
          value={"oneway"}
          onclick={(v) => setTripType(v)}
        />
        <TripTypeOption
          label="Round trip"
          selected={triptype === "roundtrip"}
          value={"roundtrip"}
          onclick={(v) => setTripType(v)}
        />
        <TripTypeOption
          label="Multi city"
          selected={triptype === "multicity"}
          value={"multicity"}
          onclick={(v) => setTripType(v)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <SearchableSelect
          label="From"
          value={flightSearch.from}
          options={cities}
          onChange={(val) =>
            dispatch(updateField({ field: "from", value: val }))
          }
        />

        <SearchableSelect
          label="To"
          value={flightSearch.to}
          options={cities}
          onChange={(val) => dispatch(updateField({ field: "to", value: val }))}
        />

        <DatePicker
          label="Departure"
          selectedDate={
            flightSearch.departure
              ? new Date(flightSearch.departure)
              : undefined
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
          label="Return Date"
          selectedDate={
            flightSearch.returnDate
              ? new Date(flightSearch.returnDate)
              : undefined
          }
          onDateChange={(date) =>
            dispatch(
              updateField({
                field: "returnDate",
                value: date ? date.toISOString().split("T")[0] : "",
              })
            )
          }
          placeholder="Select Return date"
        />

        <InputWithLabel
          label="Passengers"
          type="number"
          value={flightSearch.passengers.toString()}
          onChange={handleChange("passengers")}
          placeholder={""}
        />

        <CommonSelect
          label="Class"
          value={flightSearch.travelClass}
          onChange={(val) =>
            dispatch(updateField({ field: "travelClass", value: val }))
          }
          options={flightClasses}
        />
      </div>
    </>
  );
};

export default FlightSearch;
