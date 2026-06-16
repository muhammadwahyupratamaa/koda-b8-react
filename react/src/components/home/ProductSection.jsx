import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

function ProductSection({ title, products }) {
  return (
    <section className="w-full mt-10">
      <section className="max-w-7xl p-4 mx-auto">
        <div className="flex justify-between mb-5">
          <h2 className="text-2xl font-medium">{title}</h2>

          <div className="flex gap-3">
            <Link className="cursor-pointer text-blue-600 text-sm">
              Lihat Semua
            </Link>

            <ArrowRight className="text-blue-600" />
          </div>
        </div>

        <section className="grid grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              brand={product.brand}
              name={product.name}
              rating={product.rating}
              review={product.review}
              price={product.price}
              priceDisc={product.priceDisc}
            />
          ))}
        </section>
      </section>
    </section>
  );
}

export default ProductSection;