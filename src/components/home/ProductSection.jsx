import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

function ProductSection({ title, products }) {
  return (
    <section className="w-full mt-10">
      <section className="max-w-7xl p-4 mx-auto">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-medium sm:text-2xl">{title}</h2>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Link className="cursor-pointer text-blue-600 text-sm">
              Lihat Semua
            </Link>

            <ArrowRight className="text-blue-600" />
          </div>
        </div>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </section>
    </section>
  );
}

export default ProductSection;
