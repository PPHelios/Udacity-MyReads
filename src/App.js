import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Search } from "./routes/Search";
import { HomePage } from "./routes/HomePage";
import { NoPageFound } from "./routes/NoPageFound";
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<Search />} />
        <Route path='*' element={<NoPageFound />} />
      </Routes>
    </>
  );
}

export default App;
