import bcrypt from 'bcrypt';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/*
// export const RegistroUser = async (req, res) => {
//   // Desestructuramos los datos del body
//   const {
//     // Datos generales
//     nombre,
//     apellido,
//     correo,
//     telefonoPersonal,
//     documento,
//     tipoDocumento, // Opcional, por defecto en el modelo es "CC"

//     // Credenciales
//     usuario,
//     contrasena,

//     // Información personal (sociodemográfica)
//     edad,
//     sexo,
//     estadocivil,
//     hijosnum,

//     // Educación
//     carrera,
//     periodo,
//     relacionamiento,
//     jornada,       // Jornada de estudio
//     apoyos,      // Beca o apoyo financiero

//     // Situación laboral/económica
//     situacion,   // ¿Trabajas? (tiempo completo, medio tiempo, no)
//     ingresos,    // Ingreso mensual
//     jornadaLaboral, // Jornada laboral (podría diferir de la académica)
//     pesonashogar,   // Con quién vives

//     // Salud y bienestar
//     accesosalud,      // Acceso a servicios de salud
//     diagnostico,      // Diagnóstico de salud mental
//     asispsicologo,    // Atención psicológica o psiquiátrica
//     nivelestres,      // Nivel de estrés (escala 1-10)
//     pensamientosuicidas // Pensamientos suicidas en el último año
//   } = req.body;

//   // Validamos campos mínimos requeridos
//   if (
//     !nombre ||
//     !correo ||
//     !telefonoPersonal ||
//     !documento ||
//     !usuario ||
//     !contrasena
//   ) {
//     return res.status(400).json({ message: 'Faltan datos requeridos' });
//   }

//   // Función para parsear enteros de forma segura
//   const parseIntSafe = (value) => {
//     const parsed = parseInt(value, 10);
//     return isNaN(parsed) ? null : parsed;
//   };

//   try {
//     // Hasheamos la contraseña
//     const hashedPassword = await bcrypt.hash(contrasena, 10);

//     // Formateamos el número de teléfono si es necesario (opcional)
//     const formatPhoneNumber = (phone) => (phone.startsWith('57') ? phone : '57' + phone);
    
//     // Creamos el usuario (informacionUsuario)
//     const newUser = await prisma.informacionUsuario.create({
//       data: {
//         nombre,
//         apellido,
//         correo,
//         telefonoPersonal: formatPhoneNumber(telefonoPersonal),
//         documento,
//         tipoDocumento, // Si no se envía, se usará el default "CC"
//       }
//     });

//     // Creamos la credencial del usuario
//     const newCredential = await prisma.credencial.create({
//       data: {
//         usuario,
//         contrasena: hashedPassword,
//         idUsuario: newUser.idUsuario,
//       }
//     });

//     // Guardamos la información sociodemográfica
//     const newInformacionPersonal = await prisma.informacionPersonal.create({
//       data: {
//         edad: parseIntSafe(edad),
//         sexo,
//         estadocivil,
//         hijosnum: parseIntSafe(hijosnum),
//         idUsuario: newUser.idUsuario,
//       }
//     });

//     // Guardamos la información académica
//     const newEducacion = await prisma.educacion.create({
//       data: {
//         carrera,
//         periodo,
//         relacionamiento,
//         jornada,   // Jornada de estudio
//         apoyos,   // Beca o apoyo financiero
//         idUsuario: newUser.idUsuario,
//       }
//     });

//     // Guardamos la situación laboral y económica
//     const newSituacionLaboral = await prisma.situacionlaboral.create({
//       data: {
//         situacion,
//         ingresos,
//         jornada: jornadaLaboral, // Se diferencia de la jornada académica
//         pesonashogar,
//         idUsuario: newUser.idUsuario,
//       }
//     });

//     // Guardamos la información de salud y bienestar
//     const newSalud = await prisma.salud.create({
//       data: {
//         accesosalud,
//         diagnostico,
//         asispsicologo,
//         nivelestres,
//         pensamientosuicidas,
//         idUsuario: newUser.idUsuario,
//       }
//     });

//     return res.status(201).json({
//       message: 'Usuario y datos registrados correctamente',
//       user: newUser,
//       credential: newCredential,
//       informacionPersonal: newInformacionPersonal,
//       educacion: newEducacion,
//       situacionlaboral: newSituacionLaboral,
//       salud: newSalud,
//     });
//   } catch (error) {
//     console.error('Error al guardar los datos: ', error);
//     return res.status(500).json({
//       error: 'Error al guardar los datos',
//       details: error.message,
//     });
//   }
// };
*/

/**
 * @async
 * @function RegistroUser
 * @description Registra un nuevo usuario en la base de datos, almacenando información en múltiples tablas relacionadas.
 * Realiza el hash de la contraseña antes de guardar las credenciales.
 * @param {object} req - El objeto de la solicitud HTTP. Se espera que contenga en el cuerpo (body) los siguientes datos:
 * - Datos personales básicos: `nombre`, `apellido`, `correo`, `telefonoPersonal`, `tipoDocumento` (opcional), `documento`.
 * - Credenciales de acceso: `usuario`, `contrasena`.
 * - Información personal detallada: `edad`, `sexo`, `genero`, `estadocivil`, `hijosnum`, `personascargo`, `vivienda`, `localidad`,
 * `tipovivienda`, `familiaresnum`, `estrato`, `etnico`.
 * - Condiciones de vivienda: `hacinamiento`, `violencia`, `servicios`, `problemas`, `tipozona`.
 * - Información educativa: `tipocolegio`, `nivelescolaridad`, `carrera`, `periodo`, `matedificulta`, `nivelingles`.
 * - Situación laboral: `situacion`, `ingresos`, `sector`, `jornada`, `ascenso`.
 * - Información de salud: `enfermecronica`, `discapacidad`, `suspsicoactivas`, `alcohol`, `Internet`, `nicotina`, `eps`, `asispsicologo`.
 * @param {object} res - El objeto de la respuesta HTTP.
 * @returns {Promise<void>} - No retorna un valor directamente, pero responde con un JSON que indica el éxito del registro (código 201)
 * y contiene los datos del usuario creados en las diferentes tablas. En caso de error, responde con un código 400 si faltan datos requeridos
 * o con un código 500 si ocurre un error interno del servidor durante el proceso de registro.
 */
export const RegistroUser = async (req, res) => {

    // Se extraen los datos del cuerpo de la solicitud.
    const {
        nombre, apellido, correo, telefonoPersonal, tipoDocumento,documento,
        usuario, contrasena,
        edad, sexo, genero, estadocivil, hijosnum, personascargo, vivienda, localidad, tipovivienda, familiaresnum, estrato, etnico,
        hacinamiento, violencia, servicios, problemas, tipozona,
        tipocolegio, nivelescolaridad, carrera, periodo, matedificulta, nivelingles,
        situacion, ingresos, sector, jornada, ascenso,
        enfermecronica, discapacidad, suspsicoactivas, alcohol, Internet, nicotina, eps, asispsicologo
    } = req.body;

    // Se validan los campos obligatorios para el registro.
    if (!nombre || !correo || !telefonoPersonal || !usuario || !contrasena) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    // Función para convertir de forma segura un valor a entero. Si no es un número, retorna null.
    const parseIntSafe = (value) => {
        const parsed = parseInt(value);
        return isNaN(parsed) ? null : parsed;
    };

    // Se realiza el hash de la contraseña utilizando bcrypt con un salt rounds de 10.
    const hashedPassword = await bcrypt.hash(contrasena,10);

    try {
        // Función para formatear el número de teléfono añadiendo el prefijo '57' si no lo tiene.
        const formatPhoneNumber = (phoneNumber) => {
            return phoneNumber.startsWith('57') ? phoneNumber : '57' + phoneNumber;
        };

        // Se crea el registro en la tabla 'informacionUsuario'.
        const newUser = await prisma.informacionUsuario.create({
            data: {
                nombre,
                apellido,
                correo,
                telefonoPersonal: formatPhoneNumber(telefonoPersonal),
                documento,
                tipoDocumento,
            }
        });

        // Se crea el registro en la tabla 'credencial', vinculándolo al 'idUsuario' recién creado.
        const newCredential = await prisma.credencial.create({
            data: {
                usuario,
                contrasena: hashedPassword,
                idUsuario: newUser.idUsuario,
            }
        });

        // Se crea el registro en la tabla 'informacionPersonal', vinculándolo al 'idUsuario'.
        const newinformacionPersonal = await prisma.informacionPersonal.create({
            data: {
                edad: parseIntSafe(edad),
                sexo,
                genero,
                estadocivil,
                hijosnum: parseIntSafe(hijosnum),
                personascargo: parseIntSafe(personascargo),
                vivienda,
                localidad,
                tipovivienda,
                familiaresnum: parseIntSafe(familiaresnum),
                estrato: parseIntSafe(estrato),
                etnico,
                idUsuario: newUser.idUsuario,
            }
        });

        // Se crea el registro en la tabla 'condicionesVivienda', vinculándolo al 'idUsuario'.
        const newcondicionesvivienda = await prisma.condicionesvivienda.create({
            data: {
                hacinamiento: hacinamiento,
                violencia: violencia,
                servicios: servicios,
                problemas: problemas,
                tipozona: tipozona,
                idUsuario: newUser.idUsuario,
            }
        });

        // Se crea el registro en la tabla 'educacion', vinculándolo al 'idUsuario'.
        const neweducacion = await prisma.educacion.create({
            data: {
                tipocolegio,
                nivelescolaridad,
                carrera,
                periodo,
                matedificulta,
                nivelingles,
                idUsuario: newUser.idUsuario,
            }
        });

        // Se crea el registro en la tabla 'situacionlaboral', vinculándolo al 'idUsuario'.
        const newsituacionlaboral = await prisma.situacionlaboral.create({
            data: {
                situacion,
                ingresos,
                sector,
                jornada,
                ascenso,
                idUsuario: newUser.idUsuario,
            }
        });

        // Se crea el registro en la tabla 'salud', vinculándolo al 'idUsuario'.
        const newsalud = await prisma.salud.create({
            data: {
                enfermecronica,
                discapacidad,
                suspsicoactivas,
                alcohol,
                Internet,
                nicotina,
                eps,
                asispsicologo,
                idUsuario: newUser.idUsuario,
            }
        });

        // Se retorna una respuesta exitosa con los datos del usuario registrado en todas las tablas.
        return res.status(201).json({
            message: 'Usuario y credencial registrados correctamente',
            user: newUser,
            credential: newCredential,
            informacionPersonal: newinformacionPersonal,
            condicionesvivienda: newcondicionesvivienda,
            educacion: neweducacion,
            situacionlaboral: newsituacionlaboral,
            salud: newsalud,
        });

    } catch (error) {
        // Se manejan los errores que puedan ocurrir durante el proceso de registro.
        console.error('Error al guardar los datos: ', error);
        return res.status(500).json({
            error: 'Error al guardar los datos',
            details: error.message,
        });
    }
};