import { ArrowRight, Zap, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

function FlashDealSection({ title, products, isFlashDeal = false }) {
  return (
    <section className="w-full mt-8 lg:mt-10">
      <section className="max-w-7xl px-4 py-6 mx-auto">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {isFlashDeal ? (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
              <div className="bg-red-600 p-1 rounded-lg">
                <p className="flex justify-center text-white text-sm gap-2 items-center">
                  <Zap />
                  Flash Deal
                </p>
              </div>

              <p className="flex items-center gap-2 text-xs sm:text-sm">
                <Clock className="w-5 h-5" />
                Berakhir dalam: 05 : 21 : 38
              </p>
            </div>
          ) : (
            <h2 className="text-2xl font-bold">{title}</h2>
          )}

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Link className="cursor-pointer text-blue-600 text-sm">
              Lihat Semua
            </Link>
            <ArrowRight className="text-blue-600" />
          </div>
        </div>

        <section className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </section>
    </section>
  );
}

export default FlashDealSection;
