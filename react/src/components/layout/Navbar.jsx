import CategoryBar from "../navbar/CategoryBar";
import MainBar from "../navbar/MainBar";
import TopBar from "../navbar/TopBar";

function Navbar() {
  return (
    <header className="sticky top-0 z-50">
      <TopBar />
      <MainBar />
      <CategoryBar />
    </header>
  );
}

export default Navbar;
