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
                    let resultadoenv1 = "";
                    let resultadoenv = "";
                    for (let i = 0; i < array.length; i++) {
                        scorecount += parseInt(array[i], 10);
                    }
                    if (scorecount <= 11) {
                        resultadoenv1 = "No hay presencia de malestar psicológico 🟢";
                    } else if (scorecount >= 12 && scorecount <= 23) {
                        resultadoenv1 = "Hay cierto grado de malestar psicológico 🟡";
                    } else {
                        resultadoenv1 = "Hay un indicador alto de malestar psicológico 🔴";
                    }
                    const analisisghq12 = await openai.chat.completions.create({
                        model: 'gpt-4o-mini',
                        messages: [
                          {
                            role: 'user',
                            content: `Analiza a la persona en maximo un parrafo corto que ha respondido el test GHQ-12 que es: ${cuestionariosConfig.ghq12.preguntas}; sus respuestas son: ${array}; lo que indica que ${resultadoenv1}. ¿Qué recomendaciones puedes dar?`
                          }
                        ]
                      });
                    resultadoenv = analisisghq12.choices[0].message.content + " " + resultadoenv1; 
                    await prisma.ghq12.create({
                        data: {
                            idUsuario: idUser,
                            respuestas: array,
                            resultado: resultadoenv,
                            scoreCount: scorecount,
                        }
                    });
                    return res.json({ assistantMessage: "Gracias por responder el Test GHQ12 sus datos seran guardados y tratados para uso educativo y de investigación " + resultadoenv, logInfo: [{ function: { name: "liberartoken" } }] })
                }
                const assistantPregunta = cuestionariosConfig.ghq12.preguntas[counter]
                return res.json({ assistantMessage: assistantPregunta, logInfo: logInfo || [{ function: { name: token } }] });
            }
            else if (nameFunction == "tokenDEPresponses" || token == "tokenDEPresponses") {
                if (counter == cuestionariosConfig.dep.preguntas.length) {
                    let scorecount = 0;
                    let resultadoenv1 = "";
                    let resultadoenv = "";
                    for (let i = 0; i < array.length; i++) {
                        scorecount += parseInt(array[i], 10);
                    }
                    if (scorecount <= 4) {
                        resultadoenv1 = "Estado emocional saludable 🟢";
                    } else if (scorecount >= 5 && scorecount <= 9) {
                        resultadoenv1 = "Posible depresión leve 🟡";
                    } else {
                        resultadoenv1 = "Posible depresión grave 🔴";
                    }
                    const analisisdep = await openai.chat.completions.create({
                        model: 'gpt-4o-mini',
                        messages: [
                          {
                            role: 'user',
                            content: `Analiza al paciente en maximo un parrafo corto que ha respondido el test de Depresion que es: ${cuestionariosConfig.dep.preguntas}; sus respuestas son: ${array}; lo que indica que ${resultadoenv1}. ¿Qué recomendaciones puedes darle al paciente de forma gentil? preguntale amablemente si desea seguir hablando hacerca de eso`
                          }
                        ]
                      });
                    resultadoenv = analisisdep.choices[0].message.content;

                    await prisma.dep.create({
                        data: {
                            idUsuario: idUser,
                            respuestas: array,
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
                    let resultadoenv1 = "";
                    let resultadoenv = "";
                    for (let i = 0; i < array.length; i++) {
                        scorecount += parseInt(array[i], 10);
                    }
                    if (scorecount <= 20) {
                        resultadoenv1 = "Ansiedad saludable 🟢";
                    } else if (scorecount >= 21 && scorecount <= 34) {
                        resultadoenv1 = "Ansiedad moderada  🟡";
                    } else {
                        resultadoenv1 = "Ansiedad severa 🔴";
                    }
                    const analisisans = await openai.chat.completions.create({
                        model: 'gpt-4o-mini',
                        messages: [
                          {
                            role: 'user',
                            content: `Analiza al paciente en maximo un parrafo corto que ha respondido el test de Ansiedad que es: ${cuestionariosConfig.ans.preguntas}; sus respuestas son: ${array}; lo que indica que ${resultadoenv1}. ¿Qué recomendaciones puedes darle al paciente de forma gentil? preguntale amablemente si desea seguir hablando hacerca de eso`
                          }
                        ]
                      });
                    resultadoenv = analisisans.choices[0].message.content;

                    await prisma.ans.create({
                        data: {
                            idUsuario: idUser,
                            respuestas: array,
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
                    let resultadoenv1 = "";
                    let resultadoenv = "";

                    for (let i = 0; i < array.length; i++) {
                        scorecount += parseInt(array[i], 10);
                    }
                    if (scorecount <= 18) {
                        resultadoenv1 = "Estres saludable 🟢";
                    } else if (scorecount >= 19 && scorecount <= 24) {
                        resultadoenv1 = "Estres moderado 🟡";
                    } else {
                        resultadoenv1 = "Estres severo 🔴";
                    }
                    const analisisestr = await openai.chat.completions.create({
                        model: 'gpt-4o-mini',
                        messages: [
                          {
                            role: 'user',
                            content: `Analiza al paciente en maximo un parrafo corto que ha respondido el test de Estres que es: ${cuestionariosConfig.estr.preguntas}; sus respuestas son: ${array}; lo que indica que ${resultadoenv1}. ¿Qué recomendaciones puedes darle al paciente de forma gentil? preguntale amablemente si desea seguir hablando hacerca de eso`
                          }
                        ]
                      });
                    resultadoenv = analisisestr.choices[0].message.content;

                    await prisma.estr.create({
                        data: {
                            idUsuario: idUser,
                            respuestas: array,
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
                    let resultadoenv1 = "";
                    let resultadoenv = "";

                    for (let i = 0; i < array.length; i++) {
                        scorecount += parseInt(array[i], 10);
                    }
                    if (scorecount <= 0) {
                        resultadoenv1 = "Sin indicativo de suicido 🟢";
                    } else if (scorecount >= 1 && scorecount <= 36) {
                        resultadoenv1 = "Alto riesgo de suicido 🔴";
                    } else {
                        resultadoenv1 = "Alto riesgo de suicido 🔴";
                    }
                    const analisisuic = await openai.chat.completions.create({
                        model: 'gpt-4o-mini',
                        messages: [
                          {
                            role: 'user',
                            content: `Analiza al paciente en maximo un parrafo corto que ha respondido el test Ideacion Suicida que es: ${cuestionariosConfig.suic.preguntas}; sus respuestas son: ${array}; lo que indica que ${resultadoenv1}. ¿Qué recomendaciones puedes darle al paciente de forma gentil? preguntale amablemente si desea seguir hablando hacerca de eso`
                          }
                        ]
                      });
                    resultadoenv = analisisuic.choices[0].message.content;

                    await prisma.suic.create({
                        data: {
                            idUsuario: idUser,
                            respuestas: array,
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
                    let resultadoenv1 = "";
                    let resultadoenv = "";

                    for (let i = 0; i < array.length; i++) {
                        scorecount += parseInt(array[i], 10);
                    }
                    if (scorecount <= 32) {
                        resultadoenv1 = "Calidad de vida excelente 🟢";
                    } else if (scorecount >= 33 && scorecount <= 67) {
                        resultadoenv1 = "Calidad de vida establel 🟡";
                    } else {
                        resultadoenv1 = "Calidad de vida baja 🔴";
                    }
                    const analisiscalvida = await openai.chat.completions.create({
                        model: 'gpt-4o-mini',
                        messages: [
                          {
                            role: 'user',
                            content: `Analiza al paciente en maximo un parrafo corto que ha respondido el test Calidad de Vida que es: ${cuestionariosConfig.calvida.preguntas}; sus respuestas son: ${array}; lo que indica que ${resultadoenv1}. ¿Qué recomendaciones puedes darle al paciente de forma gentil? preguntale amablemente si desea seguir hablando hacerca de eso`
                          }
                        ]
                      });
                    resultadoenv = analisiscalvida.choices[0].message.content;

                    await prisma.calvida.create({
                        data: {
                            idUsuario: idUser,
                            respuestas: array,
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
