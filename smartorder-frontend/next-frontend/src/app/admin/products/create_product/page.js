export default function CrearProducto() {
  return (
    <div className="bg-[#161617] text-white p-6 sm:p-10 rounded-2xl shadow-md w-full max-w-lg mx-auto min-h-[650px] flex flex-col justify-center mt-15">
      <h2 className="text-xl sm:text-2xl mb-8 sm:mb-10 text-center tracking-wide">
        Crear Producto
      </h2>

      <form className="flex flex-col gap-6 sm:gap-8">
        {/* Nombre */}
        <div className="flex flex-col">
          <label
            htmlFor="username"
            className="mb-2 sm:mb-2 text-sm sm:text-base "
          >
            Nombre
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="bg-[#2C2C3D] text-white p-2 sm:p-3 rounded-md border border-gray-600 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none transition-all duration-300 shadow-sm placeholder:text-gray-400 text-sm sm:text-base"
            placeholder="Nombre"
            required
          />
        </div>

        {/* Precio */}
        <div className="flex flex-col">
          <label
            htmlFor="price"
            className="mb-2 sm:mb-3 text-sm sm:text-base "
          >
            Precio
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            id="price"
            name="price"
            className="bg-[#2C2C3D] text-white p-2 sm:p-3 rounded-md border border-gray-600 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none transition-all duration-300 shadow-sm placeholder:text-gray-400 text-sm sm:text-base"
            placeholder="Precio"
            required
          />
        </div>

        {/* Categoria */}
        <div className="flex flex-col">
          <label
            htmlFor="category"
            className="mb-2 sm:mb-3 text-sm sm:text-base "
          >
            Categoria
          </label>
          <select
            id="category"
            name="category"
            defaultValue=""
            className="bg-[#2C2C3D] text-white p-2 sm:p-3 rounded-md border border-gray-600 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none transition-all duration-300 shadow-sm cursor-pointer text-sm sm:text-base"
          >
            <option value="comida">Comida</option>
            <option value="bebida">Bebida</option>
          </select>
        </div>

        {/* Botón */}
        <div className="flex justify-center mt-8 sm:mt-12">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus-visible:ring-2 focus-visible:ring-blue-300 text-white py-3 rounded-lg w-full shadow-md transition duration-300 transform hover:scale-105 text-sm sm:text-base"
          >
            Crear Producto
          </button>
        </div>
      </form>
    </div>
  );
}
