import { FiEdit2, FiTrash2 } from "react-icons/fi";

function AddressCard({ title, isPrimary = false, name, phone, address, city }) {
  return (
    <article className="border border-gray-200 rounded-xl p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-lg font-semibold">{title}</h3>

          {isPrimary && (
            <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
              Utama
            </span>
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            className="text-gray-500 hover:text-blue-600 transition cursor-pointer"
          >
            <FiEdit2 className="w-5 h-5" />
          </button>

          <button
            type="button"
            className="text-gray-500 hover:text-red-500 transition cursor-pointer"
          >
            <FiTrash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <p className="text-base break-words">
          {name} • {phone}
        </p>

        <p className="text-gray-500 text-sm">{address}</p>

        <p className="text-gray-500 text-sm">{city}</p>
      </div>

      {!isPrimary && (
        <button
          type="button"
          className="mt-5 w-full rounded-lg border border-blue-600 py-2 text-sm text-blue-600 hover:bg-blue-50 sm:w-auto sm:border-0 sm:p-0"
        >
          Jadikan Alamat Utama
        </button>
      )}
    </article>
  );
}

export default AddressCard;
