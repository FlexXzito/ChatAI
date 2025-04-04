import OpenAI from 'openai';
import { PrismaClient } from "@prisma/client";
const Prisma = new PrismaClient();

import { cuestionariosData } from './tests.js';

const ghq12Preguntas = cuestionariosData.ghq12.preguntas;
let contadorGhq12 = 0;

const depPreguntas = cuestionariosData.dep.preguntas;
let contadorDep = 0;

const ansPreguntas = cuestionariosData.ans.preguntas;
let contadorAns = 0;

const estrPreguntas = cuestionariosData.estr.preguntas;
let contadorEstr = 0;

const suicPreguntas = cuestionariosData.suic.preguntas;
let contadorSuic = 0;

const calvidaPreguntas = cuestionariosData.calvida.preguntas;
let contadorCalvida = 0;

async function usarGhq12() {

    if (contadorGhq12 >= ghq12Preguntas.length) {
        return {
            mensaje: "¡Has terminado el cuestionario GHQ-12! Gracias por tu participación. 🧠💚",
        };
    }

    const preguntaActual = ghq12Preguntas[contadorGhq12];
    contadorGhq12++;
    
    return {
        mensaje: preguntaActual, 
    };
    
}

async function usarDep() {
    if (contadorDep >= depPreguntas.length) {
        return {
            mensaje: "¡Has terminado el cuestionario de depresión! Gracias por tu participación. 🧠💚",
        };
    }

    const preguntaActual = depPreguntas[contadorDep];
    contadorDep++;
    
    return {
        mensaje: preguntaActual, 
    };
    
}

async function usarAns() {
    if (contadorAns >= ansPreguntas.length) {
        return {
            mensaje: "¡Has terminado el cuestionario de ansiedad! Gracias por tu participación. 🧠💚",
        };
    }

    const preguntaActual = ansPreguntas[contadorAns];
    contadorAns++;
    
    return {
        mensaje: preguntaActual, 
    };
}

async function usarEstr() {
    if (contadorEstr >= estrPreguntas.length) {
        return {
            mensaje: "¡Has terminado el cuestionario de estrés! Gracias por tu participación. 🧠💚",
        };
    }

    const preguntaActual = estrPreguntas[contadorEstr];
    contadorEstr++;
    
    return {
        mensaje: preguntaActual, 
    };
}

async function usarSuic() {
    if (contadorSuic >= suicPreguntas.length) {
        return {
            mensaje: "¡Has terminado el cuestionario de suicidio! Gracias por tu participación. 🧠💚",
        };
    }

    const preguntaActual = suicPreguntas[contadorSuic];
    contadorSuic++;
    
    return {
        mensaje: preguntaActual, 
    };
}

async function usarCalvida() {
    if (contadorCalvida >= calvidaPreguntas.length) {
        return {
            mensaje: "¡Has terminado el cuestionario de calidad de vida! Gracias por tu participación. 🧠💚",
        };
    }

    const preguntaActual = calvidaPreguntas[contadorCalvida];
    contadorCalvida++;
    
    return {
        mensaje: preguntaActual, 
    };
}

const tools = [
    {
        type: "function",
        function: {
            name: "usarGhq12",
            description: "Inicia el test de bienestar GHQ-12, enviando las preguntas una a una hasta completarlo. ÚSALO CUANDO EL USUARIO EXPRIME INTERÉS EN EVALUAR SU BIENESTAR GENERAL O MENCIONA SENTIRSE MAL EMOCIONALMENTE. La herramienta debe activarse únicamente si se detectan patrones claros de evaluación del estado de ánimo o estrés diario.",
            parameters: {
                type: "object",
                properties: {
                    idUser: { type: "string", description: "ID del usuario" }
                },
                required: ["idUser"]
            }
        }
    },
    {
        type: "function",
        function: {
            name: "usarDep",
            description: "Inicia el test de depresión, enviando las preguntas una a una hasta completarlo. ÚSALO CUANDO EL USUARIO EXPRESE SENTIMIENTOS DE TRISTEZA, PESIMISMO O INDICIOS DE DEPRESIÓN. Activa esta herramienta solo si se detectan patrones o palabras clave relacionadas con síntomas depresivos.",
            parameters: {
                type: "object",
                properties: {
                    idUser: { type: "string", description: "ID del usuario" }
                },
                required: ["idUser"]
            }
        }
    },
    {
        type: "function",
        function: {
            name: "usarAns",
            description: "Inicia el test de ansiedad, enviando las preguntas una a una hasta completarlo. ÚSALO CUANDO EL USUARIO MANIFIESTE PREOCUPACIÓN POR SENTIR ANSIEDAD, NERVIOSISMO O TENSIÓN. Activa esta herramienta solo si se identifican patrones o menciones específicas de ansiedad en la conversación.",
            parameters: {
                type: "object",
                properties: {
                    idUser: { type: "string", description: "ID del usuario" }
                },
                required: ["idUser"]
            }
        }
    },
    {
        type: "function",
        function: {
            name: "usarEstr",
            description: "Inicia el test de estrés, enviando las preguntas una a una hasta completarlo. ÚSALO CUANDO EL USUARIO EXPRESE QUE SE SIENTE SOBRECARGADO, CON DIFÍCULTAD PARA MANEJAR PRESIONES DIARIAS O EXPERIMENTE SÍNTOMAS DE ESTRÉS. Activa esta herramienta cuando se detecten patrones claros relacionados con el estrés.",
            parameters: {
                type: "object",
                properties: {
                    idUser: { type: "string", description: "ID del usuario" }
                },
                required: ["idUser"]
            }
        }
    },
    {
        type: "function",
        function: {
            name: "usarSuic",
            description: "Inicia el test de ideación suicida, enviando las preguntas una a una hasta completarlo. ÚSALO CUANDO EL USUARIO EXPRESE PREOCUPACIÓN POR SU RIESGO DE IDEACIÓN SUICIDA, O SI SE IDENTIFICAN PATTERNS Y PALABRAS CLAVE QUE SUGIEREN ALTOS NIVELES DE RIESGO. Activa esta herramienta solo si el análisis contextual muestra indicios críticos de riesgo.",
            parameters: {
                type: "object",
                properties: {
                    idUser: { type: "string", description: "ID del usuario" }
                },
                required: ["idUser"]
            }
        }
    },
    {
        type: "function",
        function: {
            name: "usarCalvida",
            description: "Inicia el test de calidad de vida, enviando las preguntas una a una hasta completarlo. ÚSALO CUANDO EL USUARIO QUIERA EVALUAR SU CALIDAD DE VIDA, ABARCANDO ASPECTOS COMO SALUD, BIENESTAR EMOCIONAL Y FUNCIONAMIENTO DIARIO. Activa esta herramienta cuando se identifiquen patrones que indiquen interés por analizar el nivel general de satisfacción con la vida.",
            parameters: {
                type: "object",
                properties: {
                    idUser: { type: "string", description: "ID del usuario" }
                },
                required: ["idUser"]
            }
        }
    }
];


export const ChatAI = async (req, res) => {
    const apiKey = process.env.OPENAI_API_KEY;
    const { enviarhistorial, idUser,} = req.body;

    try {
        const openai = new OpenAI({
            apiKey: apiKey,
        });

        // Petición inicial a OpenAI
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: enviarhistorial,
            tools: tools
        });
        
        const assistantMessage = response.choices[0].message.content;
        const toolCalls = response.choices[0].message.tool_calls;
        
        // Si el asistente llama a la herramienta usarGhq12
        if (toolCalls && toolCalls.length > 0) {
            for (const call of toolCalls) {
                if (call.type === 'function' && call.function.name === 'usarGhq12') {
                    // Obtener la pregunta actual
                    const result = await usarGhq12(contadorGhq12);
                    // Si es una pregunta (no es el mensaje final)
                    if (!result.mensaje.includes("Has terminado el cuestionario")) {
                        res.json({ 
                            message: result.mensaje,
                        });
                    } else {
                        // Si es el mensaje final del cuestionario
                        const followUpResponse = await openai.chat.completions.create({
                            model: 'gpt-4o-mini',
                            messages: [
                                ...enviarhistorial,
                                { role: 'assistant', content: result.mensaje }
                            ]
                        });
                        
                        const followUpMessage = followUpResponse.choices[0].message.content;
                        res.json({ 
                            message: followUpMessage,
                            terminado: true
                        });
                    }
                    
                }
                else if (call.type === 'function' && call.function.name === 'usarDep') {
                    // Obtener la pregunta actual
                    const result = await usarDep(contadorDep);
                    // Si es una pregunta (no es el mensaje final)
                    if (!result.mensaje.includes("Has terminado el cuestionario")) {
                        res.json({ 
                            message: result.mensaje,
                        });
                    } else {
                        // Si es el mensaje final del cuestionario
                        const followUpResponse = await openai.chat.completions.create({
                            model: 'gpt-4o-mini',
                            messages: [
                                ...enviarhistorial,
                                { role: 'assistant', content: result.mensaje }
                            ]
                        });
                        
                        const followUpMessage = followUpResponse.choices[0].message.content;
                        res.json({ 
                            message: followUpMessage,
                            terminado: true
                        });
                    }
                }
                else if (call.type === 'function' && call.function.name === 'usarAns') {
                    // Obtener la pregunta actual
                    const result = await usarAns(contadorAns);
                    // Si es una pregunta (no es el mensaje final)
                    if (!result.mensaje.includes("Has terminado el cuestionario")) {
                        res.json({ 
                            message: result.mensaje,
                        });
                    } else {
                        // Si es el mensaje final del cuestionario
                        const followUpResponse = await openai.chat.completions.create({
                            model: 'gpt-4o-mini',
                            messages: [
                                ...enviarhistorial,
                                { role: 'assistant', content: result.mensaje }
                            ]
                        });
                        
                        const followUpMessage = followUpResponse.choices[0].message.content;
                        res.json({ 
                            message: followUpMessage,
                            terminado: true
                        });
                    }
                }
                else if (call.type === 'function' && call.function.name === 'usarEstr') {
                    // Obtener la pregunta actual
                    const result = await usarEstr(contadorEstr);
                    // Si es una pregunta (no es el mensaje final)
                    if (!result.mensaje.includes("Has terminado el cuestionario")) {
                        res.json({ 
                            message: result.mensaje,
                        });
                    } else {
                        // Si es el mensaje final del cuestionario
                        const followUpResponse = await openai.chat.completions.create({
                            model: 'gpt-4o-mini',
                            messages: [
                                ...enviarhistorial,
                                { role: 'assistant', content: result.mensaje }
                            ]
                        });
                        
                        const followUpMessage = followUpResponse.choices[0].message.content;
                        res.json({ 
                            message: followUpMessage,
                            terminado: true
                        });
                    }
                }
                else if (call.type === 'function' && call.function.name === 'usarSuic') {
                    // Obtener la pregunta actual
                    const result = await usarSuic(contadorSuic);
                    // Si es una pregunta (no es el mensaje final)
                    if (!result.mensaje.includes("Has terminado el cuestionario")) {
                        res.json({ 
                            message: result.mensaje,
                        });
                    } else {
                        // Si es el mensaje final del cuestionario
                        const followUpResponse = await openai.chat.completions.create({
                            model: 'gpt-4o-mini',
                            messages: [
                                ...enviarhistorial,
                                { role: 'assistant', content: result.mensaje }
                            ]
                        });
                        
                        const followUpMessage = followUpResponse.choices[0].message.content;
                        res.json({ 
                            message: followUpMessage,
                            terminado: true
                        });
                    }
                }
                else if (call.type === 'function' && call.function.name === 'usarCalvida') {
                    // Obtener la pregunta actual
                    const result = await usarCalvida(contadorCalvida);
                    // Si es una pregunta (no es el mensaje final)
                    if (!result.mensaje.includes("Has terminado el cuestionario")) {
                        res.json({ 
                            message: result.mensaje,
                        });
                    } else {
                        // Si es el mensaje final del cuestionario
                        const followUpResponse = await openai.chat.completions.create({
                            model: 'gpt-4o-mini',
                            messages: [
                                ...enviarhistorial,
                                { role: 'assistant', content: result.mensaje }
                            ]
                        });
                        
                        const followUpMessage = followUpResponse.choices[0].message.content;
                        res.json({ 
                            message: followUpMessage,
                            terminado: true
                        });
                    }
                }
            }
        } 
        else {
            // Respuesta normal sin usar herramientas
            res.json({ message: assistantMessage });
        }
    } catch (error) {
        console.error('Error al obtener la respuesta de OpenAI:', error);
        res.status(500).json({ 
            error: 'Hubo un error al procesar la solicitud.',
            message: error.message
        });
    }
};