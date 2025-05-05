import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/*
 
 function CargarChat: description Recupera la conversación de un chat específico por su ID desde la base de datos.
 Retorna el contenido de la conversación.
 
 No retorna un valor directamente, pero responde con un JSON que contiene
 la conversación del chat si la consulta es exitosa (código 201), un mensaje de error si falta el 'idchat' (código 400),
 o un mensaje de error interno del servidor si ocurre algún problema durante la consulta (código 500).
 */
export const CargarChat = async (req, res) => {
  // Se extrae el 'idchat' del cuerpo (body) de la solicitud.
  const { idchat } = req.body;

  // Se verifica si el 'idchat' está presente en el cuerpo de la solicitud.
  if (!idchat) {
    // Si falta el 'idchat', se retorna una respuesta de error 400 indicando que faltan datos requeridos.
    return res.status(400).json({ message: "Faltan datos requeridos" });
  }

  try {
    // Se utiliza Prisma para buscar un único registro en la tabla 'chats' que coincida con el 'idchat' proporcionado.
    const Cargar = await prisma.chats.findUnique({
      where: {
        // Se define la condición de búsqueda para encontrar el chat por su 'idchat'.
        idchat: idchat,
      },
      select: {
        // Se especifica qué campos se deben incluir en la respuesta.
        idchat: false, // Se excluye el campo 'idchat'.
        fechaHora: false, // Se excluye el campo 'fechaHora'.
        conversacion: true, // Se incluye el campo 'conversacion'.
      },
    });
    // Se retorna una respuesta exitosa con un código de estado 201 (Created) y un JSON que contiene la conversación del chat encontrado.
    return res.status(201).json({ Cargar });
  } catch (error) {
    // Si ocurre algún error durante la búsqueda del chat, se registra el error en la consola y se retorna una respuesta de error 500 (Internal Server Error).
    console.error("Error en la busqueda de chats:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
