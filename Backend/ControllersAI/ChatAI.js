import OpenAI from 'openai';
import { cuestionariosConfig } from './tests.js';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const tools = [
    {
        type: "function",
        function: {
            name: "tokenGHQ12responses",
            description: "aplicar el cuestionario GHQ-12 para identificar indicios de malestar psicológico general",
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
    const { enviarhistorial, idUser, counter, token, array } = req.body;
    const apiKey = process.env.OPENAI_API_KEY;
    const openai = new OpenAI({ apiKey: apiKey });
    try {
        let response
        let logInfo
        let assistantMessage
        let nameFunction;
        console.log(token)
        if (!token) {
            response = await openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: enviarhistorial,
                tools: tools,
            });
            logInfo = response.choices[0].message.tool_calls;
            assistantMessage = response.choices[0].message.content;
        }
        if (logInfo != undefined || token != "") {
            if (logInfo != undefined) {
                nameFunction = logInfo[0].function.name;
            }
            if (nameFunction == "tokenGHQ12responses" || token == "tokenGHQ12responses") {
                if (counter == cuestionariosConfig.ghq12.preguntas.length) {
                    let scorecount = 0;
                    let resultadoenv = "";
                    for (let i = 0; i < array.length; i++) {
                        scorecount += parseInt(array[i], 10);
                    }
                    if (scorecount <= 10) {
                        resultadoenv = "No hay presencia de síntomas significativos de malestar psicológico 🟢";
                    } else if (scorecount >= 11 && scorecount <= 17) {
                        resultadoenv = "Hay cierto grado de preocupación emocional 🟡";
                    } else {
                        resultadoenv = "Hay un indicador de malestar psicológico significativo 🔴";
                    }
                    await prisma.ghq12.create({
                        data: {
                            idUsuario: idUser,
                            respuestas: JSON.stringify(array),
                            resultado: resultadoenv,
                        }
                    });
                    return res.json({ assistantMessage: "Gracias por responder el Test GHQ12 sus datos seran guardados y tratados para uso educativo y de investigación" + resultadoenv, logInfo: [{ function: { name: "liberartoken" } }] })
                }
                const assistantPregunta = cuestionariosConfig.ghq12.preguntas[counter]
                return res.json({ assistantMessage: assistantPregunta, logInfo: logInfo || [{ function: { name: token } }] });
            }
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
                    return res.json({ assistantMessage: "Gracias por responder el Test de depresion sus datos seran guardados y tratados para uso educativo y de investigación"+resultadoenv, logInfo: [{ function: { name: "liberartoken" } }] })
                }
                const assistantPregunta = cuestionariosConfig.dep.preguntas[counter]
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
                        resultadoenv = "Ansiedad moderada  🟡";
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
                    return res.json({ assistantMessage: "Gracias por responder el Test de ansiedad sus datos seran guardados y tratados para uso educativo y de investigación"+resultadoenv, logInfo: [{ function: { name: "liberartoken" } }] })
                }
                const assistantPregunta = cuestionariosConfig.ans.preguntas[counter]
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
                    return res.json({ assistantMessage: "Gracias por responder el Test de estres sus datos seran guardados y tratados para uso educativo y de investigación"+resultadoenv, logInfo: [{ function: { name: "liberartoken" } }] })
                }
                const assistantPregunta = cuestionariosConfig.estr.preguntas[counter]
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
                    return res.json({ assistantMessage: "Gracias por responder el Test de estres sus datos seran guardados y tratados para uso educativo y de investigación"+resultadoenv, logInfo: [{ function: { name: "liberartoken" } }] })
                }
                const assistantPregunta = cuestionariosConfig.suic.preguntas[counter]
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
                    return res.json({ assistantMessage: "Gracias por responder el Test de estres sus datos seran guardados y tratados para uso educativo y de investigación"+resultadoenv, logInfo: [{ function: { name: "liberartoken" } }] })
                }
                const assistantPregunta = cuestionariosConfig.calvida.preguntas[counter]
                return res.json({ assistantMessage: assistantPregunta, logInfo: logInfo || [{ function: { name: token } }] });
            }
        }

        return res.json({ assistantMessage: assistantMessage, logInfo: logInfo })

    } catch (error) {
        console.error('Error al obtener la respuesta de OpenAI:', error);
        res.status(500).json({ error: 'Hubo un error al procesar la solicitud.' });
        return;
    }
};
