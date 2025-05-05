import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/*
    function ConsultaUser: Consulta la información de un usuario en la base de datos utilizando Prisma.
    Permite buscar usuarios por correo electrónico, número de documento o ID de usuario.
    Retorna la información del usuario incluyendo detalles de información personal, condiciones de vivienda,
    educación, situación laboral, salud y credenciales. Excluye información de chats, citas, historial de agendamiento,
    GHQ12 y tests.

    returns No retorna un valor directamente, pero responde con un JSON que contiene
    la información del usuario si se encuentra, un mensaje de error si falta el parámetro de búsqueda o no se encuentra el usuario,
    o un mensaje de error si ocurre algún problema durante la consulta.
 */
export const ConsultaUser = async (req, res) => {
  // Se extraen los parámetros de búsqueda (correo, documento, idUsuario) de la query de la solicitud.
  const { correo, documento, idUsuario } = req.query;

  // Se verifica si al menos un parámetro de búsqueda está presente.
  if (!correo && !documento && !idUsuario) {
    // Si ningún parámetro de búsqueda es proporcionado, se retorna una respuesta de error 400.
    return res.status(400).json({ message: "Falta el parámetro de búsqueda" });
  }

  try {
    // Se utiliza Prisma para buscar un usuario en la tabla 'informacionUsuario' que coincida con alguno de los parámetros de búsqueda.
    const user = await prisma.informacionUsuario.findFirst({
      where: {
        // Se construye una condición 'OR' para buscar por cualquiera de los parámetros proporcionados.
        OR: [
          // Si 'idUsuario' existe, se agrega una condición para buscar por 'idUsuario'.
          idUsuario ? { idUsuario: idUsuario } : undefined,
          // Si 'correo' existe, se agrega una condición para buscar por 'correo'.
          correo ? { correo: correo } : undefined,
          // Si 'documento' existe, se agrega una condición para buscar por 'documento'.
          documento ? { documento: documento } : undefined,
        ].filter(Boolean), // Se filtran los elementos 'undefined' del array 'OR'.
      },
      // Se especifica qué relaciones (tablas relacionadas) se deben incluir en la respuesta.
      include: {
        informacionPersonal: true,
        condicionesVivienda: true,
        educacion: true,
        situacionlaboral: true,
        salud: true,
        chats: false, // Se excluye la relación 'chats'.
        citas: false, // Se excluye la relación 'citas'.
        historialAgendamiento: false, // Se excluye la relación 'historialAgendamiento'.
        ghq12: false, // Se excluye la relación 'ghq12'.
        tests: false, // Se excluye la relación 'tests'.
        credenciales: true,
      },
    });

    // Se verifica si se encontró un usuario.
    if (!user) {
      // Si no se encuentra ningún usuario, se retorna una respuesta de error 404.
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Si se encuentra el usuario, se retorna una respuesta exitosa 200 con los datos del usuario.
    return res.status(200).json({
      message: "Datos del usuario consultados correctamente",
      user,
    });
  } catch (error) {
    // Si ocurre algún error durante la consulta, se registra el error en la consola y se retorna una respuesta de error 500.
    console.error("Error al consultar los datos: ", error);
    return res.status(500).json({
      error: "Error al consultar los datos",
      details: error.message,
    });
  }
};
