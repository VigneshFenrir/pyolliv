import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { updateField } from "@/store/hotelSearchSlice"; // your hotel search slice
import NavBar from "@/components/navbar";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const allHotels = [
  {
    id: 1,
    name: "Hotel Greenview",
    location: "New York",
    availableFrom: "2025-07-10",
    availableTo: "2025-07-20",
    pricePerNight: 150,
    starRating: 3,
  },
  {
    id: 2,
    name: "Luxury Stay",
    location: "London",
    availableFrom: "2025-07-05",
    availableTo: "2025-07-15",
    pricePerNight: 300,
    starRating: 5,
  },
  {
    id: 3,
    name: "Budget Inn",
    location: "New York",
    availableFrom: "2025-07-01",
    availableTo: "2025-07-30",
    pricePerNight: 80,
    starRating: 2,
  },
];

const HotelResultsPage: React.FC = () => {
  const dispatch = useDispatch();
  const hotelSearch = useSelector((state: RootState) => state.hotelSearch);

  const [filteredHotels, setFilteredHotels] = useState(allHotels);
  const [filters, setFilters] = useState({ maxPrice: 1000, starRating: "any" });

  useEffect(() => {
    const isSearchEmpty =
      !hotelSearch.location &&
      !hotelSearch.checkIn &&
      !hotelSearch.checkOut &&
      !hotelSearch.guests;

    let results = allHotels;

    if (!isSearchEmpty) {
      results = allHotels.filter((h) => {
        const locationMatch =
          !hotelSearch.location ||
          h.location.toLowerCase().includes(hotelSearch.location.toLowerCase());

        const checkInMatch =
          !hotelSearch.checkIn || h.availableFrom <= hotelSearch.checkIn;

        const checkOutMatch =
          !hotelSearch.checkOut || h.availableTo >= hotelSearch.checkOut;

        return locationMatch && checkInMatch && checkOutMatch;
      });
    }

    // Filter by price
    results = results.filter((h) => h.pricePerNight <= filters.maxPrice);

    // Filter by star rating
    if (filters.starRating !== "any") {
      if (filters.starRating === "5") {
        results = results.filter((h) => h.starRating === 5);
      } else if (filters.starRating === "4") {
        results = results.filter((h) => h.starRating === 4);
      } else if (filters.starRating === "3") {
        results = results.filter((h) => h.starRating === 3);
      } else if (filters.starRating === "2") {
        results = results.filter((h) => h.starRating === 2);
      } else if (filters.starRating === "1") {
        results = results.filter((h) => h.starRating === 1);
      }
    }

    setFilteredHotels(results);
  }, [hotelSearch, filters]);

  const handleInputChange =
    (field: keyof typeof hotelSearch) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      let value: string | number = e.target.value;
      if (field === "guests") value = Number(value);
      dispatch(updateField({ field, value }));
    };

  return (
    <>
      <NavBar activeItem={"hotel"} />
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
            <Slider
              defaultValue={[filters.maxPrice]}
              max={1000}
              min={50}
              step={10}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, maxPrice: value[0] }))
              }
              className="text-[#5c745c]"
            />
          </div>

          {/* Star Rating Filter */}
          <div className="mb-2">
            <label className="block font-medium text-gray-700 mb-2">
              Star Rating
            </label>
            <Select
              value={filters.starRating}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, starRating: value }))
              }
            >
              <SelectTrigger className="w-full border border-gray-300 focus:ring-2 focus:ring-[#5c745c]">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </aside>
        {/* Main Content */}
        <main className="flex-1 bg-white rounded-lg shadow p-6 relative">
          {/* Search Details */}
          <h1 className="text-2xl font-bold text-[#5c745c] mb-6">
            Hotel Search
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {["location", "checkIn", "checkOut", "guests"].map((field: any) => (
              <div key={field}>
                <label className="block font-medium text-gray-700 mb-1">
                  {field === "location"
                    ? "location"
                    : field === "checkIn"
                    ? "Check-In"
                    : field === "checkOut"
                    ? "Check-Out"
                    : "Guests"}
                </label>
                <input
                  type={
                    field.includes("checkIn") || field.includes("checkOut")
                      ? "date"
                      : field === "guests"
                      ? "number"
                      : "text"
                  }
                  value={(hotelSearch as any)[field] as string | number}
                  onChange={handleInputChange(field)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-[#5c745c]"
                />
              </div>
            ))}
          </div>

          {/* Hotel Results */}
          <h2 className="text-xl font-semibold text-[#5c745c] mb-4">
            Available Hotels
          </h2>
          {filteredHotels.length ? (
            <ul className="space-y-4">
              {filteredHotels.map((hotel) => (
                <li
                  key={hotel.id}
                  className="border-l-4 border-[#5c745c] p-4 rounded-md bg-[#f9fdf9] flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-semibold">{hotel.name}</h3>
                    <p className="text-sm text-gray-600">{hotel.location}</p>
                    <p className="text-sm">
                      Available: {hotel.availableFrom} to {hotel.availableTo}
                    </p>
                    <p className="text-sm">Star Rating: {hotel.starRating}</p>
                  </div>
                  <div className="text-xl font-bold text-[#5c745c]">
                    ${hotel.pricePerNight} / night
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">
              No hotels found matching your criteria.
            </p>
          )}
        </main>
      </div>
    </>
  );
};

export default HotelResultsPage;
