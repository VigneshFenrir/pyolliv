import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import FlightResult from "./pages/FlightResultPage";
import BusResult from "./pages/BusResultPage";
import TrainResultsPage from "./pages/TrainResultPage";
import HotelResultsPage from "./pages/HotelResultPage";

function App() {
  return (
    <>
      {" "}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/flight" element={<FlightResult />} />
        <Route path="/bus" element={<BusResult />} />
        <Route path="/train" element={<TrainResultsPage />} />
        <Route path="/hotel" element={<HotelResultsPage />} />
      </Routes>
    </>
  );
}

export default App;
