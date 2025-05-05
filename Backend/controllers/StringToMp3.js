import gTTS from "gtts";

/**
 * @async
 * @function StringToMp3Controller
 * @description Convierte un texto proporcionado en el cuerpo de la solicitud a un archivo de audio MP3
 * utilizando la librería gTTS (Google Text-to-Speech) con el idioma español.
 * El archivo de audio se transmite directamente en la respuesta HTTP.
 * @param {object} req - El objeto de la solicitud HTTP. Se espera que contenga el 'text' a convertir en el cuerpo (body).
 * @param {object} res - El objeto de la respuesta HTTP.
 * @returns {Promise<void>} - No retorna un valor directamente, pero responde con un stream de audio MP3
 * con el tipo de contenido 'audio/mpeg' si la conversión es exitosa (código 200 implícito).
 * Retorna un mensaje de error con código 500 si ocurre algún problema durante la conversión.
 */
export const StringToMp3Controller = async (req, res) => {
    // Se extrae el 'text' del cuerpo (body) de la solicitud que se va a convertir a audio.
    const { text } = req.body;
    try {
        // Se crea una nueva instancia de gTTS con el texto proporcionado y el idioma establecido en español ('es').
        const gtts = new gTTS(`${text}`, "es");
        // Se establece el encabezado de la respuesta HTTP para indicar que el contenido es un archivo de audio MP3.
        res.setHeader("Content-Type", "audio/mpeg");
        // Se obtiene un stream del objeto gTTS y se redirige (pipe) directamente a la respuesta HTTP,
        // lo que permite transmitir el audio a medida que se genera.
        gtts.stream().pipe(res);
    } catch (err) {
        // Si ocurre algún error durante la creación o transmisión del audio, se captura el error
        // y se responde con un código de estado 500 (Internal Server Error) y un JSON que contiene el mensaje del error.
        return res.status(500).json({ message: err.message });
    }
};