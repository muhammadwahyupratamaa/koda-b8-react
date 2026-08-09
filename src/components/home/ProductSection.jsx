import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

function ProductSection({ title, products }) {
  return (
    <section className="mx-auto mt-10 max-w-7xl px-4">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Link to="/products" className="cursor-pointer text-sm text-blue-600">
            Lihat Semua
          </Link>

          <ArrowRight className="text-blue-600" size={18} />
        </div>
      </div>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </section>
  );
}

export default ProductSection;
