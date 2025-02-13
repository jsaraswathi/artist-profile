import { useState } from "react";
import BookList from "./Components/BookList/BookList";
import Navbar from "./Components/Navbar/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import ArtistProfile from "./Components/Artist/ArtistProfile";

function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== "/artist-profile" && (
        <Navbar
          setActiveCategory={setActiveCategory}
          activeCategory={activeCategory}
        />
      )}
      {location.pathname !== "/artist-profile" && (
        <BookList activeCategory={activeCategory} />
      )}
      <Routes>
        <Route path="artist-profile" element={<ArtistProfile />} />
      </Routes>
    </div>
  );
}

export default App;
