import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function SearchBar({ className = "", placeholder = "Cari produk..." }) {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    const search = keyword.trim();

    if (!search) return;

    navigate(`/products?search=${encodeURIComponent(search)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={`relative ${className}`}>
      <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

      <input
        type="text"
        aria-label="search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full rounded-full border border-slate-200 bg-slate-50 py-3 pl-11 pr-12 text-sm outline-none transition-all duration-200 focus:border-emerald-500 focus:bg-white"
      />

      <button
        onClick={handleSearch}
        className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-emerald-600 text-white transition hover:bg-emerald-700"
      >
        <FaSearch size={13} />
      </button>
    </div>
  );
}

export default SearchBar;
