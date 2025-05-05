import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/*
 function AllChats: description Recupera todos los chats asociados a un ID de usuario específico desde la base de datos.
 Retorna una lista de chats, incluyendo el ID del chat y la fecha y hora, pero excluyendo la conversación completa.
 
 No retorna un valor directamente, pero responde con un JSON que contiene
 un array de chats si la consulta es exitosa (código 201), un mensaje de error si falta el 'idUsuario' (código 400),
 o un mensaje de error interno del servidor si ocurre algún problema durante la consulta (código 500).
 */
export const AllChats = async (req, res) => {
    // Se extrae el 'idUsuario' del cuerpo (body) de la solicitud.
    const { idUsuario } = req.body;

    // Se verifica si el 'idUsuario' está presente en el cuerpo de la solicitud.
    if(!idUsuario){
        // Si falta el 'idUsuario', se retorna una respuesta de error 400 indicando que faltan datos requeridos.
        return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    try{
        // Se utiliza Prisma para buscar todos los registros en la tabla 'chats' que coincidan con el 'idUsuario' proporcionado.
        const Allchats = await prisma.chats.findMany({
            where:{
                // Se define la condición de búsqueda para filtrar los chats por el 'idUsuario'.
                idUsuario: idUsuario
            },
            select:{
                // Se especifica qué campos se deben incluir en la respuesta.
                idchat: true,
                fechaHora: true,
                conversacion: false // Se excluye el campo 'conversacion'.
            },
        })

        // Se retorna una respuesta exitosa con un código de estado 201 (Created) y un JSON que contiene el array de chats encontrados.
        return res.status(201).json({Allchats});
        // console.log(Allchats)
    }

    catch(error){
        // Si ocurre algún error durante la búsqueda de chats, se registra el error en la consola y se retorna una respuesta de error 500 (Internal Server Error).
        console.error("Error en la busqueda de chats:", error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}