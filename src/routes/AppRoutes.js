import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Homepage from "../pages/Homepage";
import Resources from "../pages/Resources";
import Itinerary from "../pages/Itinerary";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Homepage />}
        />

        <Route
          path="/resources"
          element={<Resources />}
        />

        <Route
          path="/itinerary"
          element={<Itinerary />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;