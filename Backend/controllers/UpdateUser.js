import bcrypt from 'bcrypt';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * @async
 * @function UpdateUser
 * @description Actualiza la información de un usuario existente en la base de datos, incluyendo detalles en múltiples tablas relacionadas.
 * Permite actualizar información personal, credenciales, condiciones de vivienda, educación, situación laboral y salud.
 * Si se proporciona una nueva contraseña, se realiza el hash antes de actualizarla.
 * @param {object} req - El objeto de la solicitud HTTP. Se espera que contenga en el cuerpo (body) los datos a actualizar, incluyendo el `idUsuario`
 * para identificar al usuario. Los demás campos son opcionales y representan la información a actualizar en las diferentes tablas:
 * - `idUsuario`: Identificador único del usuario (obligatorio).
 * - Datos personales básicos: `nombre`, `apellido`, `correo`, `telefonoPersonal`, `telefonoFamiliar`, `tipoDocumento`, `documento`.
 * - Credenciales de acceso: `usuario`, `contrasena` (si se proporciona, se actualizará).
 * - Información personal detallada: `edad`, `sexo`, `genero`, `estadocivil`, `hijosnum`, `personascargo`, `vivienda`, `localidad`,
 * `tipovivienda`, `familiaresnum`, `estrato`, `etnico`.
 * - Condiciones de vivienda: `hacinamiento`, `violencia`, `servicios`, `problemas`, `tipozona`.
 * - Información educativa: `tipocolegio`, `nivelescolaridad`, `carrera`, `periodo`, `motivo`, `matedificulta`, `nivelingles`.
 * - Situación laboral: `situacion`, `ingresos`, `sector`, `jornada`, `ascenso`.
 * - Información de salud: `enfermecronica`, `discapacidad`, `suspsicoactivas`, `alcohol`, `Internet`, `nicotina`, `eps`, `asispsicologo`.
 * @param {object} res - El objeto de la respuesta HTTP.
 * @returns {Promise<void>} - No retorna un valor directamente, pero responde con un JSON que indica el éxito de la actualización (código 200)
 * y contiene los datos del usuario actualizados en las diferentes tablas. En caso de error, responde con un código 400 si falta el `idUsuario`
 * o datos requeridos, o con un código 500 si ocurre un error interno del servidor durante el proceso de actualización.
 */
export const UpdateUser = async (req, res) => {
    // Se extraen los datos del cuerpo de la solicitud.
    const {
        idUsuario,
        nombre, apellido, correo, telefonoPersonal, telefonoFamiliar, tipoDocumento, documento,
        usuario, contrasena,
        edad, sexo, genero, estadocivil, hijosnum, personascargo, vivienda, localidad, tipovivienda, familiaresnum, estrato, etnico,
        hacinamiento, violencia, servicios, problemas, tipozona,
        tipocolegio, nivelescolaridad, carrera, periodo, motivo, matedificulta, nivelingles,
        situacion, ingresos, sector, jornada, ascenso,
        enfermecronica, discapacidad, suspsicoactivas, alcohol, Internet, nicotina, eps, asispsicologo
    } = req.body;

    // Validación de datos obligatorios para la actualización.
    if (!idUsuario || !nombre || !correo || !telefonoPersonal || !usuario) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    // Función para convertir de forma segura un valor a entero. Si no es un número, retorna null.
    const parseIntSafe = (value) => {
        const parsed = parseInt(value);
        return isNaN(parsed) ? null : parsed;
    };

    // Si se proporciona una contraseña, se realiza el hash antes de la actualización.
    const hashedPassword = contrasena ? await bcrypt.hash(contrasena, 10) : undefined;

    try {
        // Función para formatear el número de teléfono añadiendo el prefijo '57' si no lo tiene.
        const formatPhoneNumber = (phoneNumber) => {
            return phoneNumber.startsWith('57') ? phoneNumber : '57' + phoneNumber;
        };
        // Actualizar la información básica del usuario en la tabla 'informacionUsuario'.
        const updatedUser = await prisma.informacionUsuario.update({
            where: { idUsuario: idUsuario },
            data: {
                nombre,
                apellido,
                correo,
                telefonoPersonal: formatPhoneNumber(telefonoPersonal),
                telefonoFamiliar,
                documento,
                tipoDocumento,
            }
        });

        // Actualizar las credenciales del usuario en la tabla 'credencial'.
        // Si se proporciona una nueva contraseña, se actualiza el hash.
        const updatedCredential = contrasena
            ? await prisma.credencial.update({
                where: { idUsuario: idUsuario },
                data: {
                    usuario,
                    contrasena: hashedPassword,
                }
            })
            : await prisma.credencial.update({
                where: { idUsuario: idUsuario },
                data: {
                    usuario,
                }
            });

        // Actualizar la información personal del usuario en la tabla 'informacionPersonal'.
        const updatedInformacionPersonal = await prisma.informacionPersonal.update({
            where: { idUsuario },
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
            }
        });

        // Actualizar las condiciones de vivienda del usuario en la tabla 'condicionesVivienda'.
        const updatedCondicionesVivienda = await prisma.condicionesvivienda.update({
            where: { idUsuario },
            data: {
                hacinamiento,
                violencia,
                servicios,
                problemas,
                tipozona,
            }
        });

        // Actualizar la información educativa del usuario en la tabla 'educacion'.
        const updatedEducacion = await prisma.educacion.update({
            where: { idUsuario },
            data: {
                tipocolegio,
                nivelescolaridad,
                carrera,
                periodo,
                motivo,
                matedificulta,
                nivelingles,
            }
        });

        // Actualizar la situación laboral del usuario en la tabla 'situacionlaboral'.
        const updatedSituacionLaboral = await prisma.situacionlaboral.update({
            where: { idUsuario },
            data: {
                situacion,
                ingresos,
                sector,
                jornada,
                ascenso,
            }
        });

        // Actualizar la información de salud del usuario en la tabla 'salud'.
        const updatedSalud = await prisma.salud.update({
            where: { idUsuario },
            data: {
                enfermecronica,
                discapacidad,
                suspsicoactivas,
                alcohol,
                Internet,
                nicotina,
                eps,
                asispsicologo,
            }
        });

        // Se retorna una respuesta exitosa con los datos actualizados del usuario en todas las tablas.
        return res.status(200).json({
            message: 'Usuario y credencial actualizados correctamente',
            user: updatedUser,
            credential: updatedCredential,
            informacionPersonal: updatedInformacionPersonal,
            condicionesvivienda: updatedCondicionesVivienda,
            educacion: updatedEducacion,
            situacionlaboral: updatedSituacionLaboral,
            salud: updatedSalud,
        });

    } catch (error) {
        // Se manejan los errores que puedan ocurrir durante el proceso de actualización.
        console.error('Error al actualizar los datos: ', error);
        return res.status(500).json({
            error: 'Error al actualizar los datos',
            details: error.message,
        });
    }
};