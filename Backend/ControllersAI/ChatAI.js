import OpenAI from 'openai';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { cuestionariosData } from './tests.js';


const ghq12Preguntas = cuestionariosData.ghq12.preguntas;
let contadorGhq12 = 0;
let awsGhq12 = [];
let processGhq12 = false;

const depPreguntas = cuestionariosData.dep.preguntas;
let contadorDep = 0;
let awsDep = [];
let processDep = false;

const ansPreguntas = cuestionariosData.ans.preguntas;
let contadorAns = 0;
let awsAns = [];
let processAns = false;

const estrPreguntas = cuestionariosData.estr.preguntas;
let contadorEstr = 0;
let awsEstr = [];
let processEstr = false;

const suicPreguntas = cuestionariosData.suic.preguntas;
let contadorSuic = 0;
let awsSuic = [];
let processSuic = false;

const calvidaPreguntas = cuestionariosData.calvida.preguntas;
let contadorCalvida = 0;
let awsCalvida = [];
let processCalvida = false;

async function usarGhq12(idUser) {

    if (contadorGhq12 >= ghq12Preguntas.length) {

        const newGhq12 = await prisma.ghq12.create({
            data: {
                idUsuario: idUser,
                respuestas: awsGhq12.join(','),
            }
        });

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

async function usarDep(idUser) {
    if (contadorDep >= depPreguntas.length) {

        const newDep = await prisma.dep.create({
            data: {
                idUsuario: idUser,
                respuestas: awsDep.join(','),
            }
        });
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

async function usarAns(idUser) {
    if (contadorAns >= ansPreguntas.length) {
        const newAns = await prisma.ans.create({
            data: {
                idUsuario: idUser,
                respuestas: awsAns.join(','),
            }
        });
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

async function usarEstr(idUser) {
    if (contadorEstr >= estrPreguntas.length) {
        const newEstr = await prisma.estr.create({
            data: {
                idUsuario: idUser,
                respuestas: awsEstr.join(','),
            }
        });
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

async function usarSuic(idUser) {
    if (contadorSuic >= suicPreguntas.length) {
        const newSuic = await prisma.suic.create({
            data: {
                idUsuario: idUser,
                respuestas: awsSuic.join(','),
            }
        });
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

async function usarCalvida(idUser) {
    if (contadorCalvida >= calvidaPreguntas.length) {
        const newCalvida = await prisma.calvida.create({
            data: {
                idUsuario: idUser,
                respuestas: awsCalvida.join(','),
            }
        });
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

        const usermsg = enviarhistorial[enviarhistorial.length - 1].content;
        const iamsg = response.choices[0]?.message?.content || "No hay respuesta";
        const statustool = response.choices[0].message.tool_calls?.[0]?.function?.name;
        if(statustool === "usarGhq12" || processGhq12 == true) {
            processGhq12 = true;
            if(usermsg == "a" || usermsg == "b" || usermsg == "c" || usermsg == "d" || usermsg == "e" || usermsg == "A" || usermsg == "B" || usermsg == "C" || usermsg == "D" || usermsg == "E") {
                awsGhq12.push(usermsg);
            }
            else if(iamsg.includes("Has terminado el cuestionario")) {
                processGhq12 = false;
                awsGhq12 = [];
                contadorGhq12 = 0;
            }
        }
        else if(statustool === "usarDep") {       
            processDep = true;
            if(usermsg == "a" || usermsg == "b" || usermsg == "c" || usermsg == "d" || usermsg == "e" || usermsg == "A" || usermsg == "B" || usermsg == "C" || usermsg == "D" || usermsg == "E") {
                awsDep.push(usermsg);
            }
            else if(iamsg.includes("Has terminado el cuestionario")) {
                processDep = false;
                awsDep = [];
                contadorDep = 0;
            }
        }
        else if(statustool === "usarAns") {
            processAns = true;
            if(usermsg == "a" || usermsg == "b" || usermsg == "c" || usermsg == "d" || usermsg == "e" || usermsg == "A" || usermsg == "B" || usermsg == "C" || usermsg == "D" || usermsg == "E") {
                awsAns.push(usermsg);
            }
            else if(iamsg.includes("Has terminado el cuestionario")) {
                processAns = false;
                awsAns = [];
                contadorAns = 0;
            }          
        }
        else if(statustool === "usarEstr") {
            processEstr = true;
            if(usermsg == "a" || usermsg == "b" || usermsg == "c" || usermsg == "d" || usermsg == "e" || usermsg == "A" || usermsg == "B" || usermsg == "C" || usermsg == "D" || usermsg == "E") {
                awsEstr.push(usermsg);
            }
            else if(iamsg.includes("Has terminado el cuestionario")) {
                processEstr = false;
                awsEstr = [];
                contadorEstr = 0;
            }          
        }
        else if(statustool === "usarSuic") {
            processSuic = true;
            if(usermsg == "a" || usermsg == "b" || usermsg == "c" || usermsg == "d" || usermsg == "e" || usermsg == "A" || usermsg == "B" || usermsg == "C" || usermsg == "D" || usermsg == "E") {
                awsSuic.push(usermsg);
            }
            else if(iamsg.includes("Has terminado el cuestionario")) {
                processSuic = false;
                awsSuic = [];
                contadorSuic = 0;
            }           
        }
        else if(statustool === "usarCalvida") {
            processCalvida = true;
            if(usermsg == "a" || usermsg == "b" || usermsg == "c" || usermsg == "d" || usermsg == "e" || usermsg == "A" || usermsg == "B" || usermsg == "C" || usermsg == "D" || usermsg == "E") {
                awsCalvida.push(usermsg);
            }
            else if(iamsg.includes("Has terminado el cuestionario")) {
                processCalvida = false;
                awsCalvida = [];
                contadorCalvida = 0;
            }          
        }
        
        const assistantMessage = response.choices[0].message.content;
        const toolCalls = response.choices[0].message.tool_calls;
        
        // Si el asistente llama a la herramienta usarGhq12
        if (toolCalls && toolCalls.length > 0) {
            for (const call of toolCalls) {
                if (call.type === 'function' && call.function.name === 'usarGhq12') {
                    // Obtener la pregunta actual
                    const result = await usarGhq12(idUser);
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
                    const result = await usarDep(idUser);
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
                    const result = await usarAns(idUser);
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
                    const result = await usarEstr(idUser);
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
                    const result = await usarSuic(idUser);
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
                    const result = await usarCalvida(idUser);
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