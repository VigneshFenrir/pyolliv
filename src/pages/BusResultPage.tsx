import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { updateField } from "@/store/busSearchSlice"; // New slice
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

const allBuses = [
  {
    id: 1,
    operator: "BusExpress",
    busNumber: "BX123",
    from: "chennai",
    to: "Bangalore",
    departureTime: "2025-07-10T08:00",
    arrivalTime: "2025-07-10T14:00",
    price: 350,
    busType: "AC Sleeper",
    seatsAvailable: 20,
  },
  {
    id: 2,
    operator: "Super Travels",
    busNumber: "ST456",
    from: "chennai",
    to: "Bangalore",
    departureTime: "2025-07-10T09:00",
    arrivalTime: "2025-07-10T15:00",
    price: 300,
    busType: "Non-AC Seater",
    seatsAvailable: 10,
  },
  {
    id: 3,
    operator: "NightRide",
    busNumber: "NR789",
    from: "chennai",
    to: "Hyderabad",
    departureTime: "2025-07-10T22:00",
    arrivalTime: "2025-07-11T06:00",
    price: 450,
    busType: "AC Sleeper",
    seatsAvailable: 5,
  },
];

const BusResultsPage: React.FC = () => {
  const dispatch = useDispatch();
  const busSearch = useSelector((state: RootState) => state.busSearch); // replace accordingly

  const [filteredBuses, setFilteredBuses] = useState(allBuses);
  const [filters, setFilters] = useState({ maxPrice: 1000, busType: "any" });

  useEffect(() => {
    const isSearchEmpty =
      !busSearch.from &&
      !busSearch.to &&
      !busSearch.departure &&
      !busSearch.passengers;

    let results = allBuses;

    if (!isSearchEmpty) {
      results = allBuses.filter(
        (b) =>
          (!busSearch.from ||
            b.from.toLowerCase().includes(busSearch.from.toLowerCase())) &&
          (!busSearch.to ||
            b.to.toLowerCase().includes(busSearch.to.toLowerCase())) &&
          (!busSearch.departure ||
            new Date(b.departureTime).toISOString().slice(0, 10) ===
              busSearch.departure)
      );
    }

    // Apply filters regardless of search
    results = results.filter((b) => b.price <= filters.maxPrice);
    if (filters.busType !== "any") {
      results = results.filter((b) => b.busType === filters.busType);
    }

    setFilteredBuses(results);
  }, [busSearch, filters]);

  const handleChange =
    (field: keyof typeof busSearch) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(updateField({ field, value: e.target.value }));
    };

  const cities = ["New York", "London", "Paris", "Tokyo", "Dubai", "Delhi"];

  return (
    <>
      <NavBar activeItem={"bus"} />
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
        />
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

          {/* Bus Type Filter */}
          <div className="mb-2">
            <label className="block font-medium text-gray-700 mb-2">
              Bus Type
            </label>
            <Select
              value={filters.busType}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, busType: value }))
              }
            >
              <SelectTrigger className="w-full border border-gray-300 focus:ring-2 focus:ring-[#5c745c]">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="AC Sleeper">AC Sleeper</SelectItem>
                <SelectItem value="Non-AC Seater">Non-AC Seater</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white rounded-lg shadow p-6 relative">
          <h1 className="text-2xl font-bold text-[#5c745c] mb-6">Bus Search</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {["from", "to", "departure", "returnDate", "passengers"].map(
              (field) => {
                if (field === "from") {
                  return (
                    <div key={field}>
                      <SearchableSelect
                        label="From"
                        value={busSearch.from}
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
                        value={busSearch.to}
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
                          busSearch.departure
                            ? new Date(busSearch.departure)
                            : undefined
                        }
                        onDateChange={(date) =>
                          dispatch(
                            updateField({
                              field: "departure",
                              value: date
                                ? date.toISOString().split("T")[0]
                                : "",
                            })
                          )
                        }
                        placeholder="Select departure date"
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
                        value={busSearch.passengers.toString()}
                        onChange={handleChange("passengers")}
                        placeholder={""}
                      />
                    </div>
                  );
                }
              }
            )}
          </div>
          {/* Bus Results */}
          <h2 className="text-xl font-semibold text-[#5c745c] mb-4">
            Available Buses
          </h2>
          {filteredBuses.length ? (
            <ul className="space-y-4">
              {filteredBuses.map((bus) => (
                <li
                  key={bus.id}
                  className="border-l-4 border-[#5c745c] p-4 rounded-md bg-[#f9fdf9] flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-semibold">
                      {bus.operator} {bus.busNumber}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {bus.from} → {bus.to}
                    </p>
                    <p className="text-sm">
                      {new Date(bus.departureTime).toLocaleTimeString()} –{" "}
                      {new Date(bus.arrivalTime).toLocaleTimeString()}
                    </p>
                    <p className="text-sm">
                      Type: {bus.busType}, Seats: {bus.seatsAvailable}
                    </p>
                  </div>
                  <div className="text-xl font-bold text-[#5c745c]">
                    ${bus.price}
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
                No buses found matching your criteria.
              </p>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default BusResultsPage;
