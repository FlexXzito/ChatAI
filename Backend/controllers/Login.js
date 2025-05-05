import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

/**
 * @async
 * @function Login
 * @description Realiza el proceso de inicio de sesión de un usuario verificando sus credenciales
 * (nombre de usuario y contraseña) con la información almacenada en la base de datos.
 * Utiliza bcrypt para comparar la contraseña proporcionada con la contraseña hasheada almacenada.
 * @param {object} req - El objeto de la solicitud HTTP. Se espera que contenga 'usuario' y 'contrasena' en el cuerpo (body).
 * @param {object} res - El objeto de la respuesta HTTP.
 * @returns {Promise<void>} - No retorna un valor directamente, pero responde con un JSON que indica el éxito del inicio de sesión (código 200)
 * junto con la información del usuario (excluyendo la contraseña). Retorna un mensaje de error si faltan datos (código 400),
 * si el usuario no se encuentra (código 404), si la contraseña es incorrecta (código 401),
 * o si ocurre un error interno del servidor (código 500).
 */
export const Login = async (req, res) => {
  // Se extraen el 'usuario' y la 'contrasena' del cuerpo (body) de la solicitud.
  const { usuario, contrasena } = req.body;

  // Se verifica si tanto el 'usuario' como la 'contrasena' están presentes en el cuerpo de la solicitud.
  if (!usuario || !contrasena) {
    // Si falta alguno de los datos requeridos, se retorna una respuesta de error 400 indicando que faltan datos.
    return res.status(400).json({ message: "Faltan datos requeridos" });
  }

  try {
    // Se utiliza Prisma para buscar todas las credenciales que coincidan con el 'usuario' proporcionado en la tabla 'credencial'.
    const credenciales = await prisma.credencial.findMany({
      where: {
        usuario: usuario,
      },
    });

    // Se verifica si se encontraron credenciales para el usuario proporcionado.
    if (credenciales.length === 0) {
      // Si no se encuentra ningún usuario con ese nombre de usuario, se retorna una respuesta de error 404.
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    let credencialValida = null;
    // Se itera sobre las credenciales encontradas (en caso de que haya múltiples, aunque lo ideal sería que 'usuario' fuera único).
    for (const credencial of credenciales) {
      // Se utiliza bcrypt.compare para comparar la contraseña proporcionada con la contraseña hasheada almacenada en la base de datos.
      const isPasswordValid = await bcrypt.compare(
        contrasena,
        credencial.contrasena
      );
      // Si la contraseña es válida, se almacena la credencial válida y se rompe el bucle.
      if (isPasswordValid) {
        credencialValida = credencial;
        break;
      }
    }

    // Se verifica si se encontró una credencial válida (es decir, si la contraseña coincide).
    if (!credencialValida) {
      // Si no se encuentra una credencial válida, se retorna una respuesta de error 401 indicando que la contraseña es incorrecta.
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Se extraen todos los campos de la credencial válida excepto la contraseña para no enviarla en la respuesta.
    const { contrasena: _, ...userWithoutPassword } = credencialValida;
    // Se retorna una respuesta exitosa con un código de estado 200 y un JSON que incluye un mensaje de éxito y la información del usuario (sin la contraseña).
    res.json({
      message: "Inicio de sesión exitoso",
      usuario: userWithoutPassword,
    });
  } catch (error) {
    // Si ocurre algún error durante el proceso de inicio de sesión, se registra el error en la consola y se retorna una respuesta de error 500 (Internal Server Error).
    console.error("Error en el login:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
