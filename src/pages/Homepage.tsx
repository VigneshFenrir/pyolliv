import NavBar from "@/components/navbar";
import OffersCarousel from "@/components/curousels/OffersCarousel";
import BusSearch from "@/components/searchUi/BusSearch";
import FlightSearch from "@/components/searchUi/FlightSearch";
import HotelSearch from "@/components/searchUi/HotelSearch";
import TrainSearch from "@/components/searchUi/TrainSearch";
import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
import React, { useState } from "react";
import RecommendedCarousel from "@/components/curousels/RecommendedCarousel";
import HotelCarousel from "@/components/curousels/HotelCarousel";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export type CurrentSearch = "flight" | "bus" | "train" | "hotel";

const Homepage: React.FC = () => {
  // const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [searchParams] = useSearchParams();
  const allowedSearches: CurrentSearch[] = ["flight", "hotel", "bus", "train"];
  const param = searchParams.get("search");
  const isValidSearch = allowedSearches.includes(param as CurrentSearch);

  const [currentSearch, setCurrentSearch] = useState<CurrentSearch>(
    isValidSearch ? (param as CurrentSearch) : "flight"
  );

  const flightSearch = useSelector((state: RootState) => state.flightSearch);
  const busSearch = useSelector((state: RootState) => state.busSearch);
  const trainSearch = useSelector((state: RootState) => state.trainSearch);
  const hotelSearch = useSelector((state: RootState) => state.hotelSearch);
  const navigate = useNavigate();

  const check = () => {
    console.log(flightSearch, "f");
    console.log(busSearch, "f");
    console.log(hotelSearch, "f");
    console.log(trainSearch, "f");
    if (currentSearch === "flight") {
      navigate("/flight");
    } else if (currentSearch === "bus") {
      navigate("/bus");
    } else if (currentSearch === "train") {
      navigate("/train");
    } else if (currentSearch === "hotel") {
      navigate("/hotel");
    }
  };

  return (
    <div>
      <NavBar activeItem={currentSearch} onclick={(c) => setCurrentSearch(c)} />{" "}
      {/*  hero */}
      <section
        className={`relative  container mx-auto h-full min-h-[600px] py-28 px-32 bg-cover bg-center bg-black/100 `}
        style={{
          backgroundImage: 'url("/images/bg.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-black/50 z-0 rounded-xl"></div>

        <div className="relative z-0 container mx-auto px-6 lg:px-32">
          <div className="bg-white text-black rounded-2xl p-6 md:p-10 shadow-lg">
            {currentSearch === "flight" && <FlightSearch />}
            {currentSearch === "bus" && <BusSearch />}
            {currentSearch === "train" && <TrainSearch />}
            {currentSearch === "hotel" && <HotelSearch />}
            {/* Submit Button */}
            <div className="mt-6 text-right">
              <Button
                className="  text-white font-bold  rounded-xl transition"
                onClick={check}
              >
                Search Flights
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Additional Sections */}
      <section className="container mx-auto px-6 py-16 text-white space-y-6">
        <article className="bg-gradient-to-r from-[#4b5c44] via-[#5c745c] to-[#8a9b81] p-6 rounded-xl shadow text-white">
          <h2 className="text-2xl font-bold mb-2">🧳 Exciting Offers</h2>
          <p>Get up to 50% off on domestic and international flights!</p>
        </article>
        <OffersCarousel />

        <article className="bg-gradient-to-r from-[#4b5c44] via-[#5c745c] to-[#8a9b81] p-6 rounded-xl shadow text-white">
          <h2 className="text-2xl font-bold mb-2">✨ Recommended for You</h2>
          <p>Top destinations picked just for you based on your preferences.</p>
        </article>
        <RecommendedCarousel />

        <article className="bg-gradient-to-r from-[#4b5c44] via-[#5c745c] to-[#8a9b81] p-6 rounded-xl shadow text-white">
          <h2 className="text-2xl font-bold mb-2">
            🏨 Why Book Hotels With Us
          </h2>
          <ul className="list-disc pl-6">
            <li>Best Price Guarantee</li>
            <li>24/7 Customer Support</li>
            <li>Easy Cancellation</li>
          </ul>
        </article>
        <HotelCarousel />
      </section>
      {/* ABOUT SECTION */}
      <section className="container mx-auto px-6 py-10 text-white">
        <div className="bg-gradient-to-r from-[#4b5c44] via-[#5c745c] to-[#8a9b81] p-6 rounded-xl shadow text-white">
          <h2 className="text-3xl font-bold mb-4">About Py Olliv</h2>
          <p className="text-lg leading-relaxed">
            At <strong>Py Olliv</strong>, we are redefining the travel
            experience through a unique blend of world-class comfort,
            transparency, and smart innovation. Our premium yet affordable stays
            are powered by cutting-edge technology and a straightforward,
            single-pricing model — no surprises, just simplicity.
          </p>
          <p className="mt-4 text-lg leading-relaxed">
            Whether you're a corporate professional or a modern explorer, our
            spaces are thoughtfully designed to meet your lifestyle. Expanding
            beyond traditional hospitality, we've also introduced seamless{" "}
            <strong>medical tourism</strong> services, offering holistic comfort
            and care under one roof.
          </p>
          <p className="mt-4 text-lg">
            Welcome to a new era of smart, conscious travel.
          </p>
        </div>
      </section>
      {/* FOOTER */}
      <footer className="bg-[#1a201a] text-white py-10 mt-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Branding */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">Py Olliv</h3>
            <p className="text-sm leading-relaxed">
              Smart hospitality meets transparency, comfort, and seamless care.
            </p>
          </div>

          {/* Links */}
          <div className="flex-1">
            <h4 className="text-lg font-semibold mb-2">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Our Properties
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Medical Tourism
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Corporate Bookings
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex-1">
            <h4 className="text-lg font-semibold mb-2">Get in Touch</h4>
            <p className="text-sm">Email: contact@pyolliv.com</p>
            <p className="text-sm">Phone: +1 234 567 890</p>
          </div>
        </div>

        <div className="text-center mt-8 text-xs text-gray-300">
          © {new Date().getFullYear()} Py Olliv. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
