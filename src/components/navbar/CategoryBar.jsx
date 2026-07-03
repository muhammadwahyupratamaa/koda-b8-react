import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineCategory } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import {
  FaLaptop,
  FaTshirt,
  FaHome,
  FaSpa,
  FaDumbbell,
  FaBook,
  FaFire,
} from "react-icons/fa";

const categories = [
  {
    name: "Elektronik",
    value: "electronic",
    icon: FaLaptop,
  },
  {
    name: "Fashion",
    value: "fashion",
    icon: FaTshirt,
  },
  {
    name: "Rumah & Dapur",
    value: "furniture",
    icon: FaHome,
  },
  {
    name: "Kecantikan",
    value: "beauty",
    icon: FaSpa,
  },
  {
    name: "Olahraga",
    value: "lifestyle",
    icon: FaDumbbell,
  },
  {
    name: "Buku & Alat Tulis",
    value: "book",
    icon: FaBook,
  },
];

function CategoryBar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Semua Kategori");

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (category) => {
    setSelected(category.name);
    setOpen(false);

    navigate(`/products?category=${category.value}`);
  };

  return (
    <nav className="border-b border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
        <div className="flex flex-col gap-3 lg:hidden">
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-all hover:border-emerald-500"
            >
              <div className="flex items-center gap-3">
                <MdOutlineCategory className="text-xl text-emerald-600" />

                <span className="font-medium text-slate-700">{selected}</span>
              </div>

              <IoIosArrowDown
                className={`transition duration-300 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>

            {open && (
              <div className="absolute left-0 top-16 z-50 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                {categories.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.name}
                      onClick={() => handleSelect(item)}
                      className={`flex w-full items-center gap-3 px-5 py-3 text-left transition ${
                        selected === item.name
                          ? "bg-emerald-50"
                          : "hover:bg-emerald-50"
                      }`}
                    >
                      <div className="rounded-lg bg-emerald-100 p-2">
                        <Icon className="text-emerald-600" size={15} />
                      </div>

                      <span className="text-sm font-medium text-slate-700">
                        {item.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1">
            {categories.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.name}
                  onClick={() => handleSelect(item)}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm transition-all ${
                    selected === item.name
                      ? "bg-emerald-600 text-white"
                      : "bg-white text-slate-600 hover:bg-emerald-100 hover:text-emerald-600"
                  }`}
                >
                  <Icon size={14} />
                  {item.name}
                </button>
              );
            })}

            <button
              onClick={() => navigate("/products?promo=true")}
              className="flex shrink-0 items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-100"
            >
              <FaFire size={14} />
              Promo
            </button>
          </div>
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-2.5 shadow-sm transition hover:border-emerald-500"
            >
              <MdOutlineCategory className="text-xl text-emerald-600" />

              <span className="font-medium text-slate-700">{selected}</span>

              <IoIosArrowDown
                className={`transition duration-300 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>

            {open && (
              <div className="absolute left-0 top-14 z-50 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                {categories.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.name}
                      onClick={() => handleSelect(item)}
                      className={`flex w-full items-center gap-3 px-5 py-3 text-left transition ${
                        selected === item.name
                          ? "bg-emerald-50"
                          : "hover:bg-emerald-50"
                      }`}
                    >
                      <div className="rounded-lg bg-emerald-100 p-2">
                        <Icon className="text-emerald-600" size={15} />
                      </div>

                      <span className="text-sm font-medium text-slate-700">
                        {item.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="scrollbar-hide flex flex-1 items-center gap-2 overflow-x-auto">
            {categories.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.name}
                  onClick={() => handleSelect(item)}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm transition-all ${
                    selected === item.name
                      ? "bg-emerald-600 text-white"
                      : "text-slate-600 hover:bg-emerald-100 hover:text-emerald-600"
                  }`}
                >
                  <Icon size={14} />
                  {item.name}
                </button>
              );
            })}

            <button
              onClick={() => navigate("/products?promo=true")}
              className="flex shrink-0 items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-100"
            >
              <FaFire size={14} />
              Promo
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default CategoryBar;
