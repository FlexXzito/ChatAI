import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * @async
 * @function DeleteChat
 * @description Elimina un chat específico de la base de datos utilizando su ID.
 * Requiere el 'chatId' en el cuerpo de la solicitud para identificar el chat a eliminar.
 * @param {object} req - El objeto de la solicitud HTTP. Se espera que contenga el 'chatId' en el cuerpo (body).
 * @param {object} res - El objeto de la respuesta HTTP.
 * @returns {Promise<void>} - No retorna un valor directamente, pero responde con un JSON que indica el éxito de la eliminación (código 200)
 * junto con el ID del chat eliminado. Retorna un mensaje de error si ocurre algún problema durante la eliminación (código 500).
 */
export const DeleteChat = async (req, res) => {
  // Se extrae el 'chatId' del cuerpo (body) de la solicitud.
  const { chatId } = req.body;

  try {
    // Se utiliza Prisma para eliminar un registro de la tabla 'chats' que coincida con el 'chatId' proporcionado.
    await prisma.chats.delete({
      where: {
        // Se define la condición de eliminación utilizando el 'idchat'.
        idchat: chatId,
      },
    });
    // Se retorna una respuesta exitosa con un código de estado 200 (OK) y un JSON que incluye un mensaje de éxito y el ID del chat eliminado.
    res
      .status(200)
      .send({ message: "Chat deleted successfully", idchat: chatId });
  } catch (error) {
    // Si ocurre algún error durante la eliminación del chat, se retorna una respuesta de error 500 (Internal Server Error) con un mensaje de fallo.
    res.status(500).send({ error: "Failed to delete chat" });
  }
};
