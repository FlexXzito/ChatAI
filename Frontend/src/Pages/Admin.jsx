import React, { useState } from 'react'; // Importa la funcionalidad useState de la librería React para manejar el estado local del componente.
import axios from 'axios'; // Importa la librería axios para realizar peticiones HTTP al servidor.
import { useNavigate } from "react-router-dom"; // Importa la función useNavigate de React Router para navegar entre rutas en la aplicación.
import Cookies from "js-cookie"; // Importa la librería js-cookie para la manipulación de cookies en el navegador.

// Define el componente funcional Admin. Este componente probablemente representa la página de administración de la aplicación.
export function Admin() {

    // Inicializa la función navigate utilizando el hook useNavigate de React Router.
    // Esto permite la navegación programática entre diferentes rutas de la aplicación.
    const navigate = useNavigate();

    // Define una función asíncrona para verificar si el usuario ha iniciado sesión como administrador.
    const verificacionLogin = async () => {
        // Comprueba si existe una cookie llamada 'rol' y si su valor es estrictamente igual a 'admin'.
        // Las cookies se utilizan aquí para mantener la información de la sesión del usuario.
        if (!Cookies.get("rol") || Cookies.get("rol") !== "admin") {
            // Si la cookie 'rol' no existe o su valor no es 'admin', redirige al usuario a la página principal ('/').
            navigate("/");
        }
      };

    // Llama a la función verificacionLogin al renderizar el componente.
    // Esto asegura que la verificación del rol se realice cada vez que se accede a la página de administración.
    verificacionLogin();

    // Define un estado local 'search' utilizando el hook useState.
    // 'search' almacena el valor del término de búsqueda ingresado por el usuario, inicializado como una cadena vacía.
    const [search, setSearch] = useState('');
    // Define otro estado local 'data' para almacenar la información del usuario obtenida de la búsqueda.
    // Inicialmente, no hay datos, por lo que se establece en null.
    const [data, setData] = useState(null);

    // Define una función asíncrona para manejar la búsqueda de usuarios.
    const handleSearch = async () => {
        // Inicializa un objeto vacío 'params' que se utilizará para construir los parámetros de la consulta a la API.
        const params = {};
        // Si el estado 'search' tiene un valor (es decir, el usuario ha ingresado un término de búsqueda),
        // añade propiedades al objeto 'params' para buscar por 'idUsuario', 'correo' o 'documento' que coincidan con el término de búsqueda.
        if (search) {
            params.idUsuario = search;
            params.correo = search;
            params.documento = search;
        }

        try {
            // Realiza una petición HTTP GET a la API utilizando axios.
            // La URL de la API se obtiene de una variable de entorno llamada VITE_URL.
            // Se envían los 'params' construidos como parámetros de la consulta.
            const response = await axios.get(`${import.meta.env.VITE_URL}/psicologia/ConsultaUser`, { params });
            // Si la petición es exitosa, la respuesta contiene los datos del usuario.
            // Actualiza el estado 'data' con la propiedad 'user' de la respuesta.
            setData(response.data.user);
        } catch (error) {
            // Si ocurre algún error durante la petición (por ejemplo, la API no responde o devuelve un error),
            // se captura el error y se muestra un mensaje en la consola.
            console.error('Error fetching data:', error);
        }
    };

    // Define una función para manejar el cierre de sesión del administrador.
    const handleLogout = () => {
        // Limpia el almacenamiento local del navegador (localStorage).
        localStorage.clear();
        // Elimina las cookies 'idUsuario', 'usuario' y 'rol' utilizando la librería js-cookie.
        Cookies.remove("idUsuario");
        Cookies.remove("usuario");
        Cookies.remove("rol");
        // Después de limpiar el almacenamiento y las cookies, redirige al usuario a la página de inicio de sesión ('/Login').
        navigate("/Login");
      };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="bg-white rounded-xl shadow-lg mb-8 p-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Asistente Psicológico</h1>
              <p className="text-slate-500 mt-1">Sistema de Administración</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-lg transition-colors duration-200 flex items-center gap-2 font-medium"
            >
              Cerrar Sesión
            </button>
          </div>
  
          {/* Search Section */}
          <div className="bg-white rounded-xl shadow-lg mb-8 p-6">
            <div className="flex gap-4">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por correo o cédula"
                className="flex-1 border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              />
              <button
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg transition-colors duration-200 font-medium"
              >
                Buscar
              </button>
            </div>
          </div>
  
          {data && (
            <div className="space-y-8">
              {/* User Information Card */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-blue-600 mb-6 pb-4 border-b">Información Usuario</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(data)
                    .filter(([key, value]) => typeof value !== 'object')
                    .map(([key, value]) => (
                      <div key={key} className="flex flex-col">
                        <span className="text-sm font-medium text-slate-500 mb-1">{key}</span>
                        <span className="text-slate-800">{value}</span>
                      </div>
                    ))}
                </div>
              </div>
  
              {/* Personal Information Section */}
              {data.informacionPersonal && (
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-blue-600 mb-6 pb-4 border-b">Información Personal</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.informacionPersonal.map((info, index) => (
                      Object.entries(info).map(([key, value]) => (
                        <div key={`${index}-${key}`} className="flex flex-col">
                          <span className="text-sm font-medium text-slate-500 mb-1">{key}</span>
                          <span className="text-slate-800">{value}</span>
                        </div>
                      ))
                    ))}
                  </div>
                </div>
              )}
  
              {/* Living Conditions Section */}
              {data.condicionesVivienda && (
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-blue-600 mb-6 pb-4 border-b">Condiciones de Vivienda</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.condicionesVivienda.map((condicion, index) => (
                      Object.entries(condicion).map(([key, value]) => (
                        <div key={`${index}-${key}`} className="flex flex-col">
                          <span className="text-sm font-medium text-slate-500 mb-1">{key}</span>
                          <span className="text-slate-800">
                            {Array.isArray(value) ? value.join(', ') : value}
                          </span>
                        </div>
                      ))
                    ))}
                  </div>
                </div>
              )}
  
              {/* Education Section */}
              {data.educacion && (
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-blue-600 mb-6 pb-4 border-b">Educación</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.educacion.map((edu, index) => (
                      Object.entries(edu).map(([key, value]) => (
                        <div key={`${index}-${key}`} className="flex flex-col">
                          <span className="text-sm font-medium text-slate-500 mb-1">{key}</span>
                          <span className="text-slate-800">
                            {Array.isArray(value) ? value.join(', ') : value}
                          </span>
                        </div>
                      ))
                    ))}
                  </div>
                </div>
              )}
  
              {/* Work Situation Section */}
              {data.situacionlaboral && (
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-blue-600 mb-6 pb-4 border-b">Situación Laboral</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.situacionlaboral.map((situacion, index) => (
                      Object.entries(situacion).map(([key, value]) => (
                        <div key={`${index}-${key}`} className="flex flex-col">
                          <span className="text-sm font-medium text-slate-500 mb-1">{key}</span>
                          <span className="text-slate-800">{value}</span>
                        </div>
                      ))
                    ))}
                  </div>
                </div>
              )}
  
              {/* Health Section */}
              {data.salud && (
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-blue-600 mb-6 pb-4 border-b">Salud</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.salud.map((salud, index) => (
                      Object.entries(salud).map(([key, value]) => (
                        <div key={`${index}-${key}`} className="flex flex-col">
                          <span className="text-sm font-medium text-slate-500 mb-1">{key}</span>
                          <span className="text-slate-800">{value}</span>
                        </div>
                      ))
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
}
