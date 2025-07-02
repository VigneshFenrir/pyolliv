import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { updateField } from "@/store/trainSearchSlice"; // assume you have this
import NavBar from "@/components/navbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const allTrains = [
  {
    id: 1,
    trainName: "Express A",
    trainNumber: "EX123",
    from: "chennai",
    to: "Delhi",
    departureTime: "2025-07-10T08:00",
    arrivalTime: "2025-07-10T20:00",
    price: 300,
    travelClass: "Sleeper",
    stops: 5,
  },
  {
    id: 2,
    trainName: "Express B",
    trainNumber: "EX456",
    from: "Mumbai",
    to: "Delhi",
    departureTime: "2025-07-10T09:00",
    arrivalTime: "2025-07-10T19:00",
    price: 450,
    travelClass: "1A",
    stops: 2,
  },
  {
    id: 3,
    trainName: "Express C",
    trainNumber: "EX789",
    from: "Mumbai",
    to: "Chennai",
    departureTime: "2025-07-11T11:00",
    arrivalTime: "2025-07-11T21:00",
    price: 400,
    travelClass: "Sleeper",
    stops: 8,
  },
];

const TrainResultsPage: React.FC = () => {
  const dispatch = useDispatch();
  const trainSearch = useSelector((state: RootState) => state.trainSearch);

  const [filteredTrains, setFilteredTrains] = useState(allTrains);
  const [filters, setFilters] = useState({ maxPrice: 1000, stops: "any" });

  useEffect(() => {
    const isSearchEmpty =
      !trainSearch.from &&
      !trainSearch.to &&
      !trainSearch.departure &&
      !trainSearch.passengers &&
      (!trainSearch.travelClass ||
        trainSearch.travelClass.toLowerCase() === "");

    let results = allTrains;

    if (!isSearchEmpty) {
      results = allTrains.filter(
        (t) =>
          (!trainSearch.from ||
            t.from.toLowerCase().includes(trainSearch.from.toLowerCase())) &&
          (!trainSearch.to ||
            t.to.toLowerCase().includes(trainSearch.to.toLowerCase())) &&
          (!trainSearch.departure ||
            new Date(t.departureTime).toISOString().slice(0, 10) ===
              trainSearch.departure) &&
          (!trainSearch.travelClass ||
            t.travelClass.toLowerCase() ===
              trainSearch.travelClass.toLowerCase())
      );
    }

    // Apply price filter always
    results = results.filter((t) => t.price <= filters.maxPrice);

    // Apply stops filter
    if (filters.stops !== "any") {
      if (filters.stops === "0") {
        results = results.filter((t) => t.stops === 0);
      } else if (filters.stops === "1") {
        results = results.filter((t) => t.stops === 1);
      } else if (filters.stops === "2+") {
        results = results.filter((t) => t.stops >= 2);
      }
    }

    setFilteredTrains(results);
  }, [trainSearch, filters]);

  const handleInputChange =
    (field: keyof typeof trainSearch) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      let value: string | number = e.target.value;
      if (field === "passengers") value = Number(value);
      dispatch(updateField({ field, value }));
    };

  return (
    <>
      <NavBar activeItem={"train"} />
      <div className="min-h-screen flex bg-[#f0f4f0] p-6 gap-6">
        {/* Sidebar */}
        <aside className="w-64 bg-white rounded-lg shadow p-5 sticky top-6">
          <h2 className="text-xl font-semibold text-[#5c745c] mb-4">Filters</h2>

          {/* Price Filter */}
          <div className="mb-6">
            <label className="block font-medium text-gray-700 mb-2">
              Max Price:{" "}
              <span className="text-[#5c745c] font-semibold">
                ${filters.maxPrice}
              </span>
            </label>
            {/* Slider component same as flights */}
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
        <main className="flex-1 bg-white rounded-lg shadow p-6">
          {/* Search Details */}
          <h1 className="text-2xl font-bold text-[#5c745c] mb-6">
            Train Search
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {[
              "from",
              "to",
              "departure",
              "returnDate",
              "passengers",
              "travelClass",
            ].map((field: any) => (
              <div key={field}>
                <label className="block font-medium text-gray-700 mb-1">
                  {field === "from"
                    ? "From"
                    : field === "to"
                    ? "To"
                    : field === "departure"
                    ? "Departure"
                    : field === "returnDate"
                    ? "Return"
                    : field === "passengers"
                    ? "Passengers"
                    : "Class"}
                </label>
                {field === "travelClass" ? (
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
                ) : (
                  <input
                    type={
                      field.includes("Date")
                        ? "date"
                        : field === "passengers"
                        ? "number"
                        : "text"
                    }
                    value={(trainSearch as any)[field] as string | number}
                    onChange={handleInputChange(field)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-[#5c745c]"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Train Results */}
          <h2 className="text-xl font-semibold text-[#5c745c] mb-4">
            Available Trains
          </h2>
          {filteredTrains.length ? (
            <ul className="space-y-4">
              {filteredTrains.map((train) => (
                <li
                  key={train.id}
                  className="border-l-4 border-[#5c745c] p-4 rounded-md bg-[#f9fdf9] flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-semibold">
                      {train.trainName} {train.trainNumber}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {train.from} → {train.to}
                    </p>
                    <p className="text-sm">
                      {new Date(train.departureTime).toLocaleTimeString()} –{" "}
                      {new Date(train.arrivalTime).toLocaleTimeString()}
                    </p>
                    <p className="text-sm">
                      Stops: {train.stops}, Class: {train.travelClass}
                    </p>
                  </div>
                  <div className="text-xl font-bold text-[#5c745c]">
                    ${train.price}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">
              No trains found matching your criteria.
            </p>
          )}
        </main>
      </div>
    </>
  );
};

export default TrainResultsPage;
