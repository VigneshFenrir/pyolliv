import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { updateField } from "@/store/flightSearchSlice";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NavBar from "@/components/NavBar";
import SearchableSelect from "@/components/SearchableSelect";
import { DatePicker } from "@/components/DatePicker";
import InputWithLabel from "@/components/InputWithLabel";
import CommonSelect from "@/components/CommonSelect";

const allFlights = [
  {
    id: 1,
    airline: "Airways A",
    flightNumber: "AA123",
    from: "chennai",
    to: "London",
    departureTime: "2025-07-10T08:00",
    arrivalTime: "2025-07-10T20:00",
    price: 500,
    travelClass: "Economy",
    stops: 1,
  },
  {
    id: 2,
    airline: "Airways B",
    flightNumber: "BB456",
    from: "New York",
    to: "London",
    departureTime: "2025-07-10T09:00",
    arrivalTime: "2025-07-10T19:00",
    price: 700,
    travelClass: "Business",
    stops: 0,
  },
  {
    id: 3,
    airline: "Airways A",
    flightNumber: "AA789",
    from: "New York",
    to: "Paris",
    departureTime: "2025-07-10T11:00",
    arrivalTime: "2025-07-10T21:00",
    price: 450,
    travelClass: "Economy",
    stops: 2,
  },
];

const FlightResultsPage: React.FC = () => {
  const dispatch = useDispatch();
  const flightSearch = useSelector((state: RootState) => state.flightSearch);

  const [filteredFlights, setFilteredFlights] = useState(allFlights);
  const [filters, setFilters] = useState({ maxPrice: 1000, stops: "any" });

  useEffect(() => {
    // Check if all main search fields are empty or default
    const isSearchEmpty =
      !flightSearch.from &&
      !flightSearch.to &&
      !flightSearch.departure &&
      !flightSearch.passengers &&
      (!flightSearch.travelClass ||
        flightSearch.travelClass.toLowerCase() === "");

    let results = allFlights;

    if (!isSearchEmpty) {
      results = allFlights.filter(
        (f) =>
          (!flightSearch.from ||
            f.from.toLowerCase().includes(flightSearch.from.toLowerCase())) &&
          (!flightSearch.to ||
            f.to.toLowerCase().includes(flightSearch.to.toLowerCase())) &&
          (!flightSearch.departure ||
            new Date(f.departureTime).toISOString().slice(0, 10) ===
              flightSearch.departure) &&
          (!flightSearch.travelClass ||
            f.travelClass.toLowerCase() ===
              flightSearch.travelClass.toLowerCase())
      );
    }

    // Always apply filters
    results = results.filter((f) => f.price <= filters.maxPrice);

    if (filters.stops !== "any") {
      if (filters.stops === "0") {
        results = results.filter((f) => f.stops === 0);
      } else if (filters.stops === "1") {
        results = results.filter((f) => f.stops === 1);
      } else if (filters.stops === "2+") {
        results = results.filter((f) => f.stops >= 2);
      }
    }

    setFilteredFlights(results);
  }, [flightSearch, filters]);

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
      <NavBar activeItem={"flight"} />
      <div
        className="min-h-screen flex bg-[#f0f4f0] p-6 gap-6"
        style={{
          background: `url("/images/resultbg.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: "blur(4px)",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            zIndex: 0,
          }}
        />{" "}
        {/* Sidebar */}
        <aside className="w-64 bg-white rounded-lg shadow p-5 sticky top-6 md:block hidden">
          <h2 className="text-xl font-semibold text-[#5c745c] mb-4">Filters</h2>

          {/* Price Filter */}
          <div className="mb-6">
            <label className="block font-medium text-gray-700 mb-2">
              Max Price:{" "}
              <span className="text-[#5c745c] font-semibold">
                ${filters.maxPrice}
              </span>
            </label>
            <Slider
              defaultValue={[filters.maxPrice]}
              max={2000}
              min={100}
              step={50}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, maxPrice: value[0] }))
              }
              className="text-[#5c745c]"
            />
          </div>

          {/* Stops Filter */}
          <div className="mb-2">
            <label className="block font-medium text-gray-700 mb-2">
              Stops
            </label>
            <Select
              value={filters.stops}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, stops: value }))
              }
            >
              <SelectTrigger className="w-full border border-gray-300 focus:ring-2 focus:ring-[#5c745c]">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="0">Nonstop</SelectItem>
                <SelectItem value="1">1 Stop</SelectItem>
                <SelectItem value="2+">2+ Stops</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </aside>
        {/* Main Content */}
        <main className="flex-1 bg-white rounded-lg shadow p-6 relative">
          {/* Search Details */}
          <h1 className="text-2xl font-bold text-[#5c745c] mb-6">
            Flight Search
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {[
              "from",
              "to",
              "departure",
              "returnDate",
              "passengers",
              "travelClass",
            ].map((field) => {
              if (field === "from") {
                return (
                  <div key={field}>
                    <SearchableSelect
                      label="From"
                      value={flightSearch.from}
                      options={cities}
                      onChange={(val) =>
                        dispatch(updateField({ field: "from", value: val }))
                      }
                    />
                  </div>
                );
              }
              if (field === "to") {
                return (
                  <div key={field}>
                    <SearchableSelect
                      label="To"
                      value={flightSearch.to}
                      options={cities}
                      onChange={(val) =>
                        dispatch(updateField({ field: "to", value: val }))
                      }
                    />
                  </div>
                );
              }
              if (field === "departure") {
                return (
                  <div key={field}>
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
                  </div>
                );
              }
              if (field === "returnDate") {
                return (
                  <div key={field}>
                    <DatePicker
                      label="Return Date"
                      selectedDate={
                        flightSearch.departure
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
                      placeholder="Select Return Date"
                    />
                  </div>
                );
              }
              if (field === "passengers") {
                return (
                  <div key={field}>
                    <InputWithLabel
                      label="Passengers"
                      type="number"
                      value={flightSearch.passengers.toString()}
                      onChange={handleChange("passengers")}
                      placeholder={""}
                    />
                  </div>
                );
              }
              if (field === "travelClass") {
                return (
                  <div key={field}>
                    <CommonSelect
                      label="Class"
                      value={flightSearch.travelClass}
                      onChange={(val) =>
                        dispatch(
                          updateField({ field: "travelClass", value: val })
                        )
                      }
                      options={flightClasses}
                    />
                  </div>
                );
              }
            })}
          </div>

          {/* Flight Results */}
          <h2 className="text-xl font-semibold text-[#5c745c] mb-4">
            Available Flights
          </h2>
          {filteredFlights.length ? (
            <ul className="space-y-4">
              {filteredFlights.map((flight) => (
                <li
                  key={flight.id}
                  className="border-l-4 border-[#5c745c] p-4 rounded-md bg-[#f9fdf9] flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-semibold">
                      {flight.airline} {flight.flightNumber}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {flight.from} → {flight.to}
                    </p>
                    <p className="text-sm">
                      {new Date(flight.departureTime).toLocaleTimeString()} –{" "}
                      {new Date(flight.arrivalTime).toLocaleTimeString()}
                    </p>
                    <p className="text-sm">
                      Stops: {flight.stops}, Class: {flight.travelClass}
                    </p>
                  </div>
                  <div className="text-xl font-bold text-[#5c745c]">
                    ${flight.price}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-600 flex flex-col gap-3 justify-center items-center">
              <div className="flex w-40 items-center mx-auto  ">
                {" "}
                <img src={"/images/notfound.svg"} alt="" />
              </div>
              <p className="font-semibold text-3xl">
                {" "}
                No flights found matching your criteria.
              </p>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default FlightResultsPage;
