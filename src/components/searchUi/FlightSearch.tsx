import React, { useState } from "react";
import InputWithLabel from "../InputWithLabel";
import TripTypeOption from "../TripTypeOption";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { updateField } from "@/store/flightSearchSlice";

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
        <InputWithLabel
          label="From"
          type="text"
          placeholder="City or Airport"
          value={flightSearch.from}
          onChange={handleChange("from")}
        />
        <InputWithLabel
          label="To"
          type="text"
          placeholder="Destination"
          value={flightSearch.to}
          onChange={handleChange("to")}
        />
        <InputWithLabel
          label="Departure"
          type="date"
          value={flightSearch.departure}
          onChange={handleChange("departure")}
          placeholder={""}
        />
        <InputWithLabel
          label="Return"
          type="date"
          value={flightSearch.returnDate}
          onChange={handleChange("returnDate")}
          placeholder={""}
        />
        <InputWithLabel
          label="Passengers"
          type="number"
          value={flightSearch.passengers.toString()}
          onChange={handleChange("passengers")}
          placeholder={""}
        />
        <InputWithLabel
          label="Class"
          type="text"
          value={flightSearch.travelClass}
          onChange={handleChange("travelClass")}
          placeholder={""}
        />
      </div>
    </>
  );
};

export default FlightSearch;
