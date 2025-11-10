import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListEmployees from "./components/ListEmployees";
import FormEmployee from "./components/FormEmployee";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListEmployees />} />
          <Route path="/add-employee" element={<FormEmployee />} />
          <Route path="/edit-employee/:id" element={<FormEmployee />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
