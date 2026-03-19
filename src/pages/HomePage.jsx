import React, { useState } from "react";
import { shops } from "../data/shops";
import "../styles/HomePage.css";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    const query = searchQuery.toLowerCase();

    if (!query) {
      setResults([]);
      setSearched(false);
      return;
    }

    const filtered = shops.filter((shop) => {
      const name = shop.name.toLowerCase();
      const specialties = shop.specialties.join(" ").toLowerCase();
      const categories = shop.categories.join(" ").toLowerCase();

      return (
        name.includes(query) ||
        specialties.includes(query) ||
        categories.includes(query)
      );
    });

    setResults(filtered);
    setSearched(true);
  };

  return (
    <div className="home-page">
      <header className="header">
        <h1>🔨 CraftsLink</h1>
        <p>Find supplies. Build projects. Join makers.</p>
      </header>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search supplies: beads, motors, yarn..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />

        <button className="search-button">Search</button>
      </form>

      {searched && (
        <div className="results">
          <h2>{results.length} shops found</h2>

          {results.length === 0 ? (
            <p>No shops found.</p>
          ) : (
            <div className="shops-grid">
              {results.map((shop) => (
                <div key={shop.id} className="shop-card">
                  <h3 className="shop-title">{shop.name}</h3>

                  <p className="shop-area">📍 {shop.area}</p>

                  <p className="shop-known">{shop.knownFor}</p>

                  <div className="tags">
                    {shop.specialties.slice(0, 3).map((spec, i) => (
                      <span key={i} className="tag">
                        {spec}
                      </span>
                    ))}
                  </div>

                  <p className="shop-price">💰 {shop.priceRange}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
