import { Route, Routes } from "react-router-dom";

import { lazy, Suspense } from "react";

const Flight = lazy(() => import("./pages/FlightResultPage"));
const Bus = lazy(() => import("./pages/BusResultPage"));
const Hotel = lazy(() => import("./pages/HotelResultPage"));
const Train = lazy(() => import("./pages/TrainResultPage"));
const Home = lazy(() => import("./pages/Homepage"));

function Loader() {
  return (
    <div className="flex items-center justify-center h-32 space-x-2">
      <span
        className="w-3 h-3 bg-[#5c745c] rounded-full animate-bounce"
        style={{ animationDelay: "0s" }}
      ></span>
      <span
        className="w-3 h-3 bg-[#5c745c] rounded-full animate-bounce"
        style={{ animationDelay: "0.2s" }}
      ></span>
      <span
        className="w-3 h-3 bg-[#5c745c] rounded-full animate-bounce"
        style={{ animationDelay: "0.4s" }}
      ></span>
    </div>
  );
}

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        {" "}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flight" element={<Flight />} />
          <Route path="/bus" element={<Bus />} />
          <Route path="/train" element={<Train />} />
          <Route path="/hotel" element={<Hotel />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
