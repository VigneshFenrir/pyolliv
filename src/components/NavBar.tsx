import React, { useState } from "react";
import { Button } from "./ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import {
  BadgePercent,
  BusFront,
  Hotel,
  LogIn,
  Plane,
  TrainFront,
} from "lucide-react";
import { CurrentSearch } from "@/pages/Homepage";
import AuthModal from "./AuthModal";

const NavBar: React.FC<{
  activeItem: CurrentSearch;
  onclick?: (current: CurrentSearch) => void;
}> = ({ activeItem, onclick }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleNavigate = (type: CurrentSearch) => {
    if (onclick) {
      onclick(type); // if on homepage, call local state
    } else {
      navigate(`/?search=${type}`); // else redirect to homepage with query param
    }
  };

  return (
    <div className="bg-white p-5  flex gap-6 items-center justify-between  rounded relative z-10">
      <div className="flex w-40" onClick={() => navigate("/")}>
        <img src="/images/logo.jpg" alt="logo" />
      </div>
      <nav className="w-full">
        <ul className="flex gap-5 font-semibold items-center  justify-center">
          <li
            className={`flex gap-2 items-center p-1.5 cursor-pointer ${
              activeItem === "flight" && "text-[#B99470] border-2  rounded-lg"
            }`}
            onClick={() => handleNavigate("flight")}
          >
            <Plane /> Flights
          </li>
          <li
            className={`flex gap-2 items-center p-1.5 cursor-pointer ${
              activeItem === "hotel" && "text-[#B99470] border-2  rounded-lg"
            }`}
            onClick={() => handleNavigate("hotel")}
          >
            {" "}
            <Hotel />
            Hotels
          </li>
          <li
            className={`flex gap-2 items-center p-1.5 cursor-pointer ${
              activeItem === "bus" && "text-[#B99470] border-2  rounded-lg"
            }`}
            onClick={() => handleNavigate("bus")}
          >
            {" "}
            <BusFront />
            Bus
          </li>
          <li
            className={`flex gap-2 items-center p-1.5 cursor-pointer ${
              activeItem === "train" && "text-[#B99470] border-2  rounded-lg"
            }`}
            onClick={() => handleNavigate("train")}
          >
            {" "}
            <TrainFront />
            Train
          </li>
        </ul>
      </nav>
      <div className="flex items-center gap-8">
        <NavLink to={""} className="flex gap-2 items-center">
          {" "}
          <BadgePercent />
          Offers
        </NavLink>
        <Button
          className="p-2 items-center flex gap-3 "
          onClick={() => {
            setShowAuthModal(true);
            setIsLogin(true);
          }}
        >
          <LogIn />
          <p>Login</p>
        </Button>
      </div>
      {showAuthModal && (
        <AuthModal
          isLogin={isLogin}
          onClose={() => setShowAuthModal(false)}
          switchMode={() => setIsLogin((prev) => !prev)}
        />
      )}
    </div>
  );
};

export default NavBar;
