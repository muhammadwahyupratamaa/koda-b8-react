import { useNavigate } from "react-router-dom";
import { star } from "../../assets";

function ProductCard({
  id,
  brand,
  name,
  image,
  rating,
  review,
  price,
  priceDisc,
}) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/detail/${id}`)}
      className="border border-gray-400 rounded-lg cursor-pointer hover:shadow-lg transition"
    >
      <div className="mb-5">
        <img src={image} className="w-full rounded-t-lg" />
      </div>

      <div className="flex flex-col gap-2 pl-2 mb-5">
        <p className="text-xs text-gray-500">{brand}</p>
        <p className="text-sm ">{name}</p>
        <div className="flex gap-2 ">
          <div className="flex">
            {[...Array(5)].map((item, index) => (
              <img key={index} src={star} className="w-5 h-5" alt="star" />
            ))}
          </div>

          <div className="flex gap-2 text-sm text-gray-400">
            <p>{rating}</p>
            <p>{review}</p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-blue-600 text-base">{price}</p>

          <p className="line-through text-sm text-gray-500">{priceDisc}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
