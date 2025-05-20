export default function CrearUsuario() {
  return (
    <div className="bg-[#161617] text-white p-6 sm:p-10 rounded-2xl shadow-md w-full max-w-lg mx-auto min-h-[650px] flex flex-col justify-center mt-15">
      <h2 className="text-xl sm:text-2xl mb-8 sm:mb-10 text-center tracking-wide">
        Crear Usuario
      </h2>

      <form className="flex flex-col gap-6 sm:gap-8">
        {/* Username */}
        <div className="flex flex-col">
          <label
            htmlFor="username"
            className="mb-2 sm:mb-2 text-sm sm:text-base "
          >
            Nombre de Usuario
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="bg-[#2C2C3D] text-white p-2 sm:p-3 rounded-md border border-gray-600 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none transition-all duration-300 shadow-sm placeholder:text-gray-400 text-sm sm:text-base"
            placeholder="Ingrese nombre de usuario"
            required
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="mb-2 sm:mb-3 text-sm sm:text-base "
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="bg-[#2C2C3D] text-white p-2 sm:p-3 rounded-md border border-gray-600 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none transition-all duration-300 shadow-sm placeholder:text-gray-400 text-sm sm:text-base"
            placeholder="Ingrese contraseña"
            required
          />
        </div>

        {/* Rol */}
        <div className="flex flex-col">
          <label
            htmlFor="rol"
            className="mb-2 sm:mb-3 text-sm sm:text-base "
          >
            Rol
          </label>
          <select
            id="rol"
            name="rol"
            defaultValue="mozo"
            className="bg-[#2C2C3D] text-white p-2 sm:p-3 rounded-md border border-gray-600 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none transition-all duration-300 shadow-sm cursor-pointer text-sm sm:text-base"
          >
            <option value="mozo">Mozo</option>
            <option value="cocina">Cocina</option>
            <option value="barra">Barra</option>
            <option value="caja">Caja</option>
          </select>
        </div>

        {/* Botón */}
        <div className="flex justify-center mt-8 sm:mt-12">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus-visible:ring-2 focus-visible:ring-blue-300 text-white py-3 rounded-lg w-full shadow-md transition duration-300 transform hover:scale-105 text-sm sm:text-base"
          >
            Crear Usuario
          </button>
        </div>
      </form>
    </div>
  );
}
