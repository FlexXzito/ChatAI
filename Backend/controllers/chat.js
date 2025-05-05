import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * @async
 * @function Chat
 * @description Crea un nuevo chat si no se proporciona un 'idchat', o actualiza la conversación de un chat existente si se proporciona el 'idchat'.
 * Requiere 'idUsuario' y 'conversacion' en el cuerpo de la solicitud para la creación. Para la actualización, requiere 'idchat' y 'conversacion'.
 * @param {object} req - El objeto de la solicitud HTTP. Se espera que contenga 'idchat' (opcional), 'idUsuario' (requerido para la creación),
 * y 'conversacion' (requerido para la creación y actualización) en el cuerpo (body).
 * @param {object} res - El objeto de la respuesta HTTP.
 * @returns {Promise<void>} - No retorna un valor directamente, pero responde con un JSON que indica el éxito de la creación (código 201)
 * o actualización (código 200) del chat, junto con los datos del chat creado o actualizado. Retorna un mensaje de error si faltan datos (código 400)
 * o si ocurre un error interno del servidor (código 500).
 */
export const Chat = async (req, res) => {
  // Se extraen 'idchat', 'idUsuario' y 'conversacion' del cuerpo (body) de la solicitud.
  const { idchat, idUsuario, conversacion } = req.body;

  // console.log("Datos recibidos:", req.body);

  // Se verifica si 'conversacion' e 'idUsuario' están presentes en el cuerpo de la solicitud (requeridos para la creación).
  if (!conversacion || !idUsuario) {
    // Si faltan 'conversacion' o 'idUsuario', se retorna una respuesta de error 400 indicando que faltan datos incompletos.
    return res.status(400).json({ message: "Datos incompletos" });
  }

  // Se verifica si no se proporcionó un 'idchat', lo que indica una solicitud para crear un nuevo chat.
  if (!idchat) {
    try {
      // Se utiliza Prisma para crear un nuevo registro en la tabla 'chats' con los datos proporcionados.
      const chats = await prisma.chats.create({
        data: {
          idUsuario,
          conversacion,
        },
        select: {
          idchat: true,
          idUsuario: true,
          fechaHora: true,
          conversacion: true,
        },
      });

      // console.log("Chat creado:", chats);

      // Se retorna una respuesta exitosa con un código de estado 201 (Created) y un JSON que incluye un mensaje de éxito y los datos del chat creado.
      return res
        .status(201)
        .json({ message: "Chat creado exitosamente", chat: chats });
    } catch (error) {
      // Si ocurre algún error durante la creación del chat, se registra el error en la consola y se retorna una respuesta de error 500 (Internal Server Error).
      console.error("Error en la creación del chat:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  } else {
    // Si se proporcionó un 'idchat', se interpreta como una solicitud para actualizar la conversación de un chat existente.
    try {
      // Se utiliza Prisma para actualizar el registro en la tabla 'chats' que coincide con el 'idchat' proporcionado, actualizando la 'conversacion'.
      const chatupdate = await prisma.chats.update({
        where: { idchat },
        data: { conversacion },
      });

      // Se retorna una respuesta exitosa con un código de estado 200 (OK) y un JSON que incluye un mensaje de éxito y los datos del chat actualizado.
      return res
        .status(200)
        .json({ message: "Chat actualizado exitosamente", chat: chatupdate });
    } catch (error) {
      // Si ocurre algún error durante la actualización del chat, se registra el error en la consola y se retorna una respuesta de error 500 (Internal Server Error).
      console.error("Error al actualizar el chat:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }
};
