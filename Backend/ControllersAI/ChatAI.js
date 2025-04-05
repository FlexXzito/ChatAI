import OpenAI from 'openai';
import { cuestionariosConfig } from './tests.js';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

let token = "";
let count1 = 0;
let count2 = 0;
let count3 = 0;
let count4 = 0;
let count5 = 0;
let count6 = 0;

let array1 = [];
let array2 = [];
let array3 = [];
let array4 = [];
let array5 = [];
let array6 = [];

const tools = [
    {
        type: "function",
        function: {
            name: "tokenGHQ12responses",
            description: "Aplicar el cuestionario GHQ-12 para identificar indicios de malestar psicológico general. Este test detecta cambios emocionales, dificultades para concentrarse, insomnio, y otros síntomas relacionados con la salud mental.",
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


export const ChatAI = async (req, res) => {
    const { enviarhistorial, idUser } = req.body;
    const apiKey = process.env.OPENAI_API_KEY;
    const openai = new OpenAI({ apiKey: apiKey });

    if (enviarhistorial.length <= 2) {
        token = "";
        count1 = 0;
        count2 = 0;
        count3 = 0;
        count4 = 0;
        count5 = 0;
        count6 = 0;
        array1 = [];
        array2 = [];
        array3 = [];
        array4 = [];
        array5 = [];
        array6 = [];
    }

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: enviarhistorial,
            tools: tools,
        });

        const logInfo = response.choices[0].message.tool_calls;

        if ((!logInfo || logInfo.length === 0) && token === "") {
            const assistantMessage = response.choices[0].message.content;
            res.json({ message: assistantMessage });
            return;
        }

        if (logInfo && logInfo.length > 0) {
            const functionName = logInfo[0].function.name;
            token = functionName;
        }
    } catch (error) {
        console.error('Error al obtener la respuesta de OpenAI:', error);
        res.status(500).json({ error: 'Hubo un error al procesar la solicitud.' });
        return;
    }

    switch (token) {
        case "tokenGHQ12responses": {
            const userResponse = enviarhistorial[enviarhistorial.length - 1].content;
            if (array1.length === count1 && count1 < cuestionariosConfig.ghq12.preguntas.length) {
                if (["0", "1", "2", "3"].includes(userResponse)) {
                    array1.push(userResponse);
                    count1++;
                } else if (count1 > 0) {
                    res.json({ message: "Por favor, ingresa solo 0, 1, 2 o 3. " + cuestionariosConfig.ghq12.preguntas[count1 - 1] });
                    return;
                }
            }
            if (count1 < cuestionariosConfig.ghq12.preguntas.length) {
                const pregunta = cuestionariosConfig.ghq12.preguntas[count1];
                res.json({ message: pregunta });
            } else if (count1 === cuestionariosConfig.ghq12.preguntas.length) {
                await prisma.ghq12.create({
                    data: {
                        idUsuario: idUser,
                        respuestas: JSON.stringify(array1),
                    }
                });
                res.json({ message: "Cuestionario GHQ-12 completado. ¿Hay algo mas de lo que quieras hablar?" });
                token = "";
                count1 = 0;
                array1 = [];
            }
            return;
        }
        case "tokenDEPresponses": {
            const userResponse = enviarhistorial[enviarhistorial.length - 1].content;
            if (array2.length === count2 && count2 < cuestionariosConfig.deps.preguntas.length) {
                if (["0", "1", "2", "3"].includes(userResponse)) {
                    array2.push(userResponse);
                    count2++;
                } else if (count2 > 0) {
                    res.json({ message: "Por favor, ingresa solo 0, 1, 2 o 3. " + cuestionariosConfig.deps.preguntas[count2 - 1] });
                    return;
                }
            }
            if (count2 < cuestionariosConfig.deps.preguntas.length) {
                const pregunta = cuestionariosConfig.deps.preguntas[count2];
                res.json({ message: pregunta });
            } else if (count2 === cuestionariosConfig.deps.preguntas.length) {
                await prisma.deps.create({
                    data: {
                        idUsuario: idUser,
                        respuestas: JSON.stringify(array2),
                    }
                });
                res.json({ message: "Cuestionario DEPS completado. ¿Hay algo mas de lo que quieras hablar?" });
                token = "";
                count2 = 0;
                array2 = [];
            }
            return;
        }
        case "tokenANSresponses": {
            const userResponse = enviarhistorial[enviarhistorial.length - 1].content;
            if (array3.length === count3 && count3 < cuestionariosConfig.ans.preguntas.length) {
                if (["0", "1", "2", "3"].includes(userResponse)) {
                    array3.push(userResponse);
                    count3++;
                } else if (count3 > 0) {
                    res.json({ message: "Por favor, ingresa solo 0, 1, 2 o 3. " + cuestionariosConfig.ans.preguntas[count3 - 1] });
                    return;
                }
            }
            if (count3 < cuestionariosConfig.ans.preguntas.length) {
                const pregunta = cuestionariosConfig.ans.preguntas[count3];
                res.json({ message: pregunta });
            } else if (count3 === cuestionariosConfig.ans.preguntas.length) {
                await prisma.ans.create({
                    data: {
                        idUsuario: idUser,
                        respuestas: JSON.stringify(array3),
                    }
                });
                res.json({ message: "Cuestionario ANS completado. ¿Hay algo mas de lo que quieras hablar?" });
                token = "";
                count3 = 0;
                array3 = [];
            }
            return;
        }
        case "tokenESTRresponses": {
            const userResponse = enviarhistorial[enviarhistorial.length - 1].content;
            if (array4.length === count4 && count4 < cuestionariosConfig.estr.preguntas.length) {
                if (["0", "1", "2", "3"].includes(userResponse)) {
                    array4.push(userResponse);
                    count4++;
                } else if (count4 > 0) {
                    res.json({ message: "Por favor, ingresa solo 0, 1, 2 o 3. " + cuestionariosConfig.estr.preguntas[count4 - 1] });
                    return;
                }
            }
            if (count4 < cuestionariosConfig.estr.preguntas.length) {
                const pregunta = cuestionariosConfig.estr.preguntas[count4];
                res.json({ message: pregunta });
            } else if (count4 === cuestionariosConfig.estr.preguntas.length) {
                await prisma.estr.create({
                    data: {
                        idUsuario: idUser,
                        respuestas: JSON.stringify(array4),
                    }
                });
                res.json({ message: "Cuestionario ESTR completado. ¿Hay algo mas de lo que quieras hablar?" });
                token = "";
                count4 = 0;
                array4 = [];
            }
            return;
        }
        case "tokenSUICresponses": {
            const userResponse = enviarhistorial[enviarhistorial.length - 1].content;
            if (array5.length === count5 && count5 < cuestionariosConfig.suic.preguntas.length) {
                if (["0", "1", "2", "3"].includes(userResponse)) {
                    array5.push(userResponse);
                    count5++;
                } else if (count5 > 0) {
                    res.json({ message: "Por favor, ingresa solo 0, 1, 2 o 3. " + cuestionariosConfig.suic.preguntas[count5 - 1] });
                    return;
                }
            }
            if (count5 < cuestionariosConfig.suic.preguntas.length) {
                const pregunta = cuestionariosConfig.suic.preguntas[count5];
                res.json({ message: pregunta });
            } else if (count5 === cuestionariosConfig.suic.preguntas.length) {
                await prisma.suic.create({
                    data: {
                        idUsuario: idUser,
                        respuestas: JSON.stringify(array5),
                    }
                });
                res.json({ message: "Cuestionario SUIC completado. ¿Hay algo mas de lo que quieras hablar?" });
                token = "";
                count5 = 0;
                array5 = [];
            }
            return;
        }
        case "tokenCALVIDAresponses": {
            const userResponse = enviarhistorial[enviarhistorial.length - 1].content;
            if (array6.length === count6 && count6 < cuestionariosConfig.calvida.preguntas.length) {
                if (["0", "1", "2", "3"].includes(userResponse)) {
                    array6.push(userResponse);
                    count6++;
                } else if (count6 > 0) {
                    res.json({ message: "Por favor, ingresa solo 0, 1, 2 o 3. " + cuestionariosConfig.calvida.preguntas[count6 - 1] });
                    return;
                }
            }
            if (count6 < cuestionariosConfig.calvida.preguntas.length) {
                const pregunta = cuestionariosConfig.calvida.preguntas[count6];
                res.json({ message: pregunta });
            } else if (count6 === cuestionariosConfig.calvida.preguntas.length) {
                await prisma.calvida.create({
                    data: {
                        idUsuario: idUser,
                        respuestas: JSON.stringify(array6),
                    }
                });
                res.json({ message: "Cuestionario CALIDAD DE VIDA completado. ¿Hay algo mas de lo que quieras hablar?" });
                token = "";
                count6 = 0;
                array6 = [];
            }
            return;
        }
        default:
            res.status(400).json({ error: 'Token no reconocido.' });
            return;
    }
};
