import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SharedLayout from "./components/SharedLayout";
import City from "./pages/City";
import Result from "./pages/Result";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="result" element={<Result />} />
          <Route path="city" element={<City />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
