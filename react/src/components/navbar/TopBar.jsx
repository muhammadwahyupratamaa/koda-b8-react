import { MapPin, Phone, Rocket } from "lucide-react";

function TopBar() {
  return (
    <header className="w-full bg-blue-600 sticky top-0 left-0 z-50  shadow-md text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-5 h-5" />
          <p>Kirim ke Jakarta Selatan</p>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            <span>0800-1234-5678</span>
          </div>

          <div className="flex items-center gap-2">
            <Rocket className="w-5 h-5" />
            <span>Gratis Ongkir di atas Rp100.000</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default TopBar;
