import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import BotIcon from "../../public/BotIcon.png";
import "./Components/Css.css";
import steps from "./Components/Prompts.jsx"

export function Register() {
  const [step, setStep] = useState(0);
  const [emailError, setEmailError] = useState('');

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefonoPersonal: "",
    telefonoFamiliar: "",
    tipoDocumento: "",
    documento: "",
    usuario: "",
    contrasena: "",
    edad: 0,
    sexo: "",
    genero: "",
    estadocivil: "",
    hijosnum: 0,
    personascargo: 0,
    vivienda: "",
    localidad: "",
    tipovivienda: "",
    familiaresnum: 0,
    estrato: 0,
    etnico: "",
    hacinamiento: "",
    violencia: "",
    servicios: "",
    problemas: "",
    tipozona: "",
    tipocolegio: "",
    nivelescolaridad: "",
    carrera: "",
    periodo: "",
    motivo: "",
    matedificulta: "",
    nivelingles: "",
    situacion: "",
    ingresos: "",
    sector: "",
    jornada: "",
    ascenso: "",
    enfermecronica: "",
    discapacidad: "",
    suspsicoactivas: "",
    alcohol: "",
    Internet: "",
    nicotina: "",
    eps: "",
    asispsicologo: "",
  });

  // const [formData, setFormData] = useState({
  //   // Información del usuario (informacionUsuario)
  //   nombre: "",
  //   apellido: "",
  //   correo: "",
  //   telefonoPersonal: "",
  //   documento: "",
  //   tipoDocumento: "CC", // Valor por defecto

  //   // Credencial (credencial)
  //   usuario: "",
  //   contrasena: "",

  //   // Datos sociodemográficos (informacionPersonal)
  //   edad: 0,
  //   sexo: "",
  //   estadocivil: "",
  //   hijosnum: 0,

  //   // Información académica (educacion)
  //   carrera: "",
  //   periodo: "",
  //   relacionamiento: "",
  //   jornada: "",    // Jornada de estudio
  //   apoyos: "",    // Beca o apoyo financiero

  //   // Situación económica/laboral (situacionlaboral)
  //   situacion: "",
  //   ingresos: "",
  //   jornadaLaboral: "", // Jornada laboral, diferenciada de la académica
  //   pesonashogar: "",

  //   // Salud y bienestar (salud)
  //   accesosalud: "",
  //   diagnostico: "",
  //   asispsicologo: "",
  //   nivelestres: "",
  //   pensamientosuicidas: ""
  // });

  const [response, setResponse] = useState("");

  const validateEmail = (email) => {
    // Expresión regular para validar formato de correo
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Lista de correos no válidos
    const invalidEmails = [
      'a', 'a@a', 'ya', 'test@test', 'email@',
      'example@example', 'user@domain',
      'test@email', 'mail@mail'
    ];

    if (!email) {
      return 'El correo electrónico es obligatorio';
    }

    if (!emailRegex.test(email)) {
      return 'Por favor, ingrese un correo electrónico válido';
    }

    if (invalidEmails.includes(email)) {
      return 'Por favor, ingrese un correo electrónico válido';
    }

    return ''; // Sin errores
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Limpiar error de correo al escribir
    if (name === 'correo') {
      setEmailError('');
    }

    if (type === "checkbox") {
      setFormData((prevData) => {
        let newValues = [...prevData[name]];

        if (checked) {
          newValues.push(value);
        } else {
          newValues = newValues.filter((val) => val !== value);
        }

        return {
          ...prevData,
          [name]: newValues,
        };
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/psicologia/RegistroUser`,
        formData
      );
      setResponse(res.data.message || "Datos enviados");
    } catch (error) {
      setResponse("Error al enviar datos");
      console.log(error);
    }
    navigate("/");
  };

  const nextStep = () => {
    const currentStep = steps[step];

    // Validación específica para correo electrónico
    if (currentStep.name === 'correo') {
      const error = validateEmail(formData.correo);
      if (error) {
        setEmailError(error);
        return;
      }
    }

    const currentValue = formData[currentStep?.name];

    // Asegurarse de que currentValue sea una cadena
    if (typeof currentValue === "string" && currentValue.trim() === "") {
      alert(
        `El campo "${currentStep?.label || currentStep?.name
        }" es obligatorio. Por favor complétalo.`
      );
      return;
    }

    // Si el valor es un array (como en el caso de los checkboxes), se verifica que tenga elementos seleccionados
    if (Array.isArray(currentValue) && currentValue.length === 0) {
      alert(
        `El campo "${currentStep?.label || currentStep?.name
        }" es obligatorio. Por favor complétalo.`
      );
      return;
    }

    if (step === 0) {
      setStep(step + 1);
    } else if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      nextStep();
    }
  };

  const currentStep = steps[step];

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-300 w-full h-screen flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-center w-full max-w-5xl p-6 rounded-lg bg-white shadow-xl">
        <div className="flex flex-col items-center w-full max-w-md p-6 space-y-4">
          <h2 className="text-3xl font-semibold text-blue-700 mb-6">Registro de Usuario</h2>

          <form
            className="text-gray-700 flex flex-col space-y-4 w-full"
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDown}
          >
            <div className="flex flex-col space-y-2">
              <label htmlFor={currentStep.name} className="font-medium text-blue-700">
                {currentStep.label}
              </label>

              {currentStep.type === "text" && (
                <>
                  <input
                    type="text"
                    id={currentStep.name}
                    name={currentStep.name}
                    value={formData[currentStep.name]}
                    onChange={handleChange}
                    required
                    className="p-3 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50 placeholder-gray-400"
                    placeholder={`Ingresa tu ${currentStep.label?.toLowerCase()}`}
                  />
                </>
              )}

              {currentStep.type === "email" && (
                <div>
                  <input
                    type="email"
                    id={currentStep.name}
                    name={currentStep.name}
                    value={formData[currentStep.name]}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50 placeholder-gray-400"
                    placeholder={`Ingresa tu ${currentStep.label?.toLowerCase()}`}
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm mt-1">{emailError}</p>
                  )}
                </div>
              )}

              {currentStep.type === "tel" && (
                <input
                  type="tel"
                  id={currentStep.name}
                  name={currentStep.name}
                  value={formData[currentStep.name]}
                  onChange={handleChange}
                  required
                  className="p-3 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50 placeholder-gray-400"
                  placeholder={`Ingresa tu ${currentStep.label?.toLowerCase()}`}
                />
              )}

              {currentStep.type === "password" && (
                <input
                  type="password"
                  id={currentStep.name}
                  name={currentStep.name}
                  value={formData[currentStep.name]}
                  onChange={handleChange}
                  required
                  className="p-3 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50 placeholder-gray-400"
                  placeholder={`Ingresa tu ${currentStep.label?.toLowerCase()}`}
                />
              )}

              {currentStep.type === "number" && (
                <input
                  type="number"
                  id={currentStep.name}
                  name={currentStep.name}
                  value={formData[currentStep.name]}
                  onChange={handleChange}
                  required
                  className="p-3 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50 placeholder-gray-400"
                  placeholder=""
                />
              )}

              {currentStep.type === "select" && (
                <>
                  <select
                    name={currentStep.name}
                    value={formData[currentStep.name] || ""}
                    onChange={(e) => {
                      handleChange(e);
                      if (e.target.value !== "Otro") {
                        setFormData((prevData) => ({
                          ...prevData,
                          [`${currentStep.name}Otro`]: "",
                        }));
                      }
                    }}
                    required
                    className="p-3 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50 placeholder-gray-400"
                  >
                    <option value="">Selecciona una opción</option>
                    {currentStep.options?.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  {formData[currentStep.name] === "Otro" && (
                    <input
                      type="text"
                      name={`${currentStep.name}Otro`}
                      value={formData[`${currentStep.name}Otro`] || ""}
                      onChange={handleChange}
                      placeholder={`Especifica tu ${currentStep.label?.toLowerCase()}`}
                      className="mt-3 p-3 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50 placeholder-gray-400"
                    />
                  )}
                </>
              )}

              {currentStep.type === "checkbox" && (
                <div className="flex flex-col space-y-2">
                  {currentStep.options?.map((option, index) => (
                    <label
                      key={index}
                      className="flex items-center space-x-2 text-gray-700"
                    >
                      <input
                        type="checkbox"
                        name={currentStep.name}
                        value={option.value}
                        checked={formData[currentStep.name]?.includes(option.value)}
                        onChange={handleChange}
                        className="h-5 w-5 border-gray-300 focus:ring-2 focus:ring-blue-500"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between">
              {step > 0 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                >
                  Anterior
                </button>
              )}
              {step < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                >
                  Siguiente
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md"
                >
                  Registrar
                </button>
              )}
            </div>
          </form>

          {response && <p className="text-yellow-500 mt-4">{response}</p>}
        </div>

        <div className="hidden md:flex flex-col w-full h-full items-center justify-center">
          <div className="relative bg-white p-2 rounded-lg shadow-lg border-4 border-blue-600 text-blue-800 font-semibold mb-10 z-10">
            <p className="px-8 py-6">{currentStep.comment}</p>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-6 h-6 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-blue-600"></div>
          </div>

          <img
            src={BotIcon}
            alt="Registro"
            className="w-3/6 h-auto object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}