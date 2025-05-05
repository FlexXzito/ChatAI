import OpenAI from 'openai';
import { cuestionariosConfig } from './tests.js';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Definición de las herramientas (funciones) que el modelo de OpenAI puede invocar.
const tools = [
    {
        type: "function",
        function: {
            name: "tokenGHQ12responses",
            description: "Aplicar el cuestionario GHQ-12 para identificar indicios de malestar psicológico general",
        }
    },
    {
        type: "function",
        function: {
            name: "tokenDEPresponses",
            description: "Ejecutar el test DEPS cuando el paciente menciona tristeza persistente, pérdida de interés o fatiga. Evalúa síntomas depresivos y su posible intensidad clínica.",
        }
    },
    {
        type: "function",
        function: {
            name: "tokenANSresponses",
            description: "Usar la escala ANS si se detectan expresiones de preocupación excesiva, nerviosismo o tensión. Este instrumento mide el nivel de ansiedad y su impacto funcional.",
        }
    },
    {
        type: "function",
        function: {
            name: "tokenESTRresponses",
            description: "Aplicar el cuestionario ESTR cuando se perciban indicadores de sobrecarga emocional, tensión continua o agotamiento. Evalúa la severidad del estrés psicológico.",
        }
    },
    {
        type: "function",
        function: {
            name: "tokenSUICresponses",
            description: "Ejecutar esta herramienta si el paciente expresa pensamientos de desesperanza, ideas de muerte o conductas de riesgo. Evalúa el nivel de riesgo suicida con base en indicadores clínicos y conductuales.",
        }
    },
    {
        type: "function",
        function: {
            name: "tokenCALVIDAresponses",
            description: "Activar este cuestionario si el paciente menciona insatisfacción con su vida, problemas en relaciones o falta de bienestar. Evalúa la calidad de vida percibida en distintas dimensiones como salud, entorno, relaciones y satisfacción general.",
        }
    }
];

/**
 * @async
 * @function ChatAI
 * @description Interactúa con el modelo de lenguaje de OpenAI para mantener una conversación y, potencialmente,
 * invocar funciones basadas en el contenido del diálogo. Utiliza las herramientas definidas para aplicar cuestionarios
 * psicológicos y guardar las respuestas en la base de datos.
 * @param {object} req - El objeto de la solicitud HTTP. Se espera que contenga en el cuerpo (body):
 * - `enviarhistorial`: Un array de mensajes que representan el historial de la conversación.
 * - `idUser`: El identificador del usuario actual.
 * - `counter`: Un contador para llevar el seguimiento de las preguntas dentro de un cuestionario.
 * - `token`: Un token que indica qué cuestionario se está aplicando actualmente (puede estar vacío al inicio).
 * - `array`: Un array para almacenar las respuestas del usuario a las preguntas del cuestionario.
 * @param {object} res - El objeto de la respuesta HTTP.
 * @returns {Promise<void>} - No retorna un valor directamente, pero responde con un JSON que contiene:
 * - `assistantMessage`: El mensaje generado por el asistente de OpenAI o la siguiente pregunta del cuestionario.
 * - `logInfo`: Información sobre las funciones invocadas por el asistente (tool_calls).
 * En caso de finalización de un cuestionario, guarda las respuestas en la base de datos y envía un mensaje de agradecimiento
 * junto con el resultado. En caso de error al interactuar con OpenAI, responde con un código 500.
 */
export const ChatAI = async (req, res) => {
    // Se extraen los datos necesarios del cuerpo de la solicitud.
    const { enviarhistorial, idUser, counter, token, array } = req.body;
    // Se obtiene la clave de API de OpenAI desde las variables de entorno.
    const apiKey = process.env.OPENAI_API_KEY;
    // Se crea una instancia del cliente de OpenAI.
    const openai = new OpenAI({ apiKey: apiKey });

    try {
        let response;
        let logInfo;
        let assistantMessage;
        let nameFunction;

        // Se realiza una consulta al modelo de OpenAI si no hay un token activo (al inicio de la conversación).
        if (!token) {
            response = await openai.chat.completions.create({
                model: 'gpt-4o-mini', // Se especifica el modelo a utilizar.
                messages: enviarhistorial, // Se envía el historial de la conversación.
                tools: tools, // Se proporcionan las herramientas que el modelo puede usar.
            });
            // Se extrae la información de las funciones invocadas (si las hay).
            logInfo = response.choices[0].message.tool_calls;
            // Se extrae el contenido del mensaje del asistente.
            assistantMessage = response.choices[0].message.content;
        }

        // Si hay información de funciones invocadas o un token activo, se procede con la lógica de los cuestionarios.
        if (logInfo != undefined || token != "") {
            // Se obtiene el nombre de la función invocada si existe información de la función.
            if (logInfo != undefined) {
                nameFunction = logInfo[0].function.name;
            }

            // Lógica para el cuestionario GHQ-12.
            if (nameFunction == "tokenGHQ12responses" || token == "tokenGHQ12responses") {
                // Si se han respondido todas las preguntas del cuestionario.
                if (counter == cuestionariosConfig.ghq12.preguntas.length) {
                    let scorecount = 0;
                    let resultadoenv = "";
                    // Se calcula la puntuación total sumando las respuestas.
                    for (let i = 0; i < array.length; i++) {
                        scorecount += parseInt(array[i], 10);
                    }
                    // Se determina el resultado basado en la puntuación.
                    if (scorecount <= 10) {
                        resultadoenv = "No hay presencia de síntomas significativos de malestar psicológico 🟢";
                    } else if (scorecount >= 11 && scorecount <= 17) {
                        resultadoenv = "Hay cierto grado de preocupación emocional 🟡";
                    } else {
                        resultadoenv = "Hay un indicador de malestar psicológico significativo 🔴";
                    }
                    // Se guarda el resultado del cuestionario en la base de datos.
                    await prisma.ghq12.create({
                        data: {
                            idUsuario: idUser,
                            respuestas: JSON.stringify(array),
                            resultado: resultadoenv,
                        }
                    });
                    // Se envía una respuesta de agradecimiento y el resultado, liberando el token.
                    return res.json({ assistantMessage: "Gracias por responder el Test GHQ12 sus datos seran guardados y tratados para uso educativo y de investigación" + resultadoenv, logInfo: [{ function: { name: "liberartoken" } }] });
                }
                // Si aún quedan preguntas, se envía la siguiente pregunta.
                const assistantPregunta = cuestionariosConfig.ghq12.preguntas[counter];
                return res.json({ assistantMessage: assistantPregunta, logInfo: logInfo || [{ function: { name: token } }] });
            }
            // Lógica similar para los demás cuestionarios (DEP, ANS, ESTR, SUIC, CALVIDA).
            else if (nameFunction == "tokenDEPresponses" || token == "tokenDEPresponses") {
                if (counter == cuestionariosConfig.dep.preguntas.length) {
                    let scorecount = 0;
                    let resultadoenv = "";
                    for (let i = 0; i < array.length; i++) {
                        scorecount += parseInt(array[i], 10);
                    }
                    if (scorecount <= 4) {
                        resultadoenv = "Estado emocional saludable 🟢";
                    } else if (scorecount >= 5 && scorecount <= 9) {
                        resultadoenv = "Posible depresión leve 🟡";
                    } else {
                        resultadoenv = "Posible depresión grave 🔴";
                    }

                    await prisma.dep.create({
                        data: {
                            idUsuario: idUser,
                            respuestas: JSON.stringify(array),
                            resultado: resultadoenv,
                        }
                    });
                    return res.json({ assistantMessage: "Gracias por responder el Test de depresion sus datos seran guardados y tratados para uso educativo y de investigación"+resultadoenv, logInfo: [{ function: { name: "liberartoken" } }] });
                }
                const assistantPregunta = cuestionariosConfig.dep.preguntas[counter];
                return res.json({ assistantMessage: assistantPregunta, logInfo: logInfo || [{ function: { name: token } }] });
            }
            else if (nameFunction == "tokenANSresponses" || token == "tokenANSresponses") {
                if (counter == cuestionariosConfig.ans.preguntas.length) {
                    let scorecount = 0;
                    let resultadoenv = "";
                    for (let i = 0; i < array.length; i++) {
                        scorecount += parseInt(array[i], 10);
                    }
                    if (scorecount <= 20) {
                        resultadoenv = "Ansiedad saludable 🟢";
                    } else if (scorecount >= 21 && scorecount <= 34) {
                        resultadoenv = "Ansiedad moderada  🟡";
                    } else {
                        resultadoenv = "Ansiedad severa 🔴";
                    }
                    await prisma.ans.create({
                        data: {
                            idUsuario: idUser,
                            respuestas: JSON.stringify(array),
                            resultado: resultadoenv,
                        }
                    });
                    return res.json({ assistantMessage: "Gracias por responder el Test de ansiedad sus datos seran guardados y tratados para uso educativo y de investigación"+resultadoenv, logInfo: [{ function: { name: "liberartoken" } }] });
                }
                const assistantPregunta = cuestionariosConfig.ans.preguntas[counter];
                return res.json({ assistantMessage: assistantPregunta, logInfo: logInfo || [{ function: { name: token } }] });
            }
            else if (nameFunction == "tokenESTRresponses" || token == "tokenESTRresponses") {
                if (counter == cuestionariosConfig.estr.preguntas.length) {
                    let scorecount = 0;
                    let resultadoenv = "";
                    for (let i = 0; i < array.length; i++) {
                        scorecount += parseInt(array[i], 10);
                    }
                    if (scorecount <= 18) {
                        resultadoenv = "Estres saludable 🟢";
                    } else if (scorecount >= 19 && scorecount <= 24) {
                        resultadoenv = "Estres moderado 🟡";
                    } else {
                        resultadoenv = "Estres severo 🔴";
                    }
                    await prisma.estr.create({
                        data: {
                            idUsuario: idUser,
                            respuestas: JSON.stringify(array),
                            resultado: resultadoenv,
                        }
                    });
                    return res.json({ assistantMessage: "Gracias por responder el Test de estres sus datos seran guardados y tratados para uso educativo y de investigación"+resultadoenv, logInfo: [{ function: { name: "liberartoken" } }] });
                }
                const assistantPregunta = cuestionariosConfig.estr.preguntas[counter];
                return res.json({ assistantMessage: assistantPregunta, logInfo: logInfo || [{ function: { name: token } }] });
            }
            else if (nameFunction == "tokenSUICresponses" || token == "tokenSUICresponses") {
                if (counter == cuestionariosConfig.suic.preguntas.length) {
                    let scorecount = 0;
                    let resultadoenv = "";
                    for (let i = 0; i < array.length; i++) {
                        scorecount += parseInt(array[i], 10);
                    }
                    if (scorecount <= 0) {
                        resultadoenv = "Sin indicativo de suicido 🟢";
                    } else if (scorecount >= 1 && scorecount <= 36) {
                        resultadoenv = "Alto riesgo de suicido 🔴";
                    } else {
                        resultadoenv = "Alto riesgo de suicido 🔴";
                    }
                    await prisma.suic.create({
                        data: {
                            idUsuario: idUser,
                            respuestas: JSON.stringify(array),
                            resultado: resultadoenv,
                        }
                    });
                    return res.json({ assistantMessage: "Gracias por responder el Test de estres sus datos seran guardados y tratados para uso educativo y de investigación"+resultadoenv, logInfo: [{ function: { name: "liberartoken" } }] });
                }
                const assistantPregunta = cuestionariosConfig.suic.preguntas[counter];
                return res.json({ assistantMessage: assistantPregunta, logInfo: logInfo || [{ function: { name: token } }] });
            }
            else if (nameFunction == "tokenCALVIDAresponses" || token == "tokenCALVIDAresponses") {
                if (counter == cuestionariosConfig.calvida.preguntas.length) {
                    let scorecount = 0;
                    let resultadoenv = "";
                    for (let i = 0; i < array.length; i++) {
                        scorecount += parseInt(array[i], 10);
                    }
                    if (scorecount <= 32) {
                        resultadoenv = "Calidad de vida excelente 🟢";
                    } else if (scorecount >= 33 && scorecount <= 67) {
                        resultadoenv = "Calidad de vida establel 🟡";
                    } else {
                        resultadoenv = "Calidad de vida baja 🔴";
                    }
                    await prisma.calvida.create({
                        data: {
                            idUsuario: idUser,
                            respuestas: JSON.stringify(array),
                            resultado: resultadoenv,
                        }
                    });
                    return res.json({ assistantMessage: "Gracias por responder el Test de estres sus datos seran guardados y tratados para uso educativo y de investigación"+resultadoenv, logInfo: [{ function: { name: "liberartoken" } }] });
                }
                const assistantPregunta = cuestionariosConfig.calvida.preguntas[counter];
                return res.json({ assistantMessage: assistantPregunta, logInfo: logInfo || [{ function: { name: token } }] });
            }
        }

        // Si no se invocó ninguna función, se devuelve el mensaje del asistente.
        return res.json({ assistantMessage: assistantMessage, logInfo: logInfo });

    } catch (error) {
        // Se manejan los errores que puedan ocurrir durante la interacción con OpenAI.
        console.error('Error al obtener la respuesta de OpenAI:', error);
        res.status(500).json({ error: 'Hubo un error al procesar la solicitud.' });
        return;
    }
};