export const cuestionariosData = {
	ghq12: {
	  nombre: 'Cuestionario GHQ-12',
	  preguntas: [
		'1. ¿Ha podido concentrarse bien en lo que hace?\n    a) Mejor que lo habitual.\n    b) Igual que lo habitual.\n    c) Menos que lo habitual.\n    d) Mucho menos que lo habitual.',
		'2. ¿Sus preocupaciones le han hecho perder mucho el sueño?\n    a) No, en absoluto.\n    b) Igual que lo habitual.\n    c) Más que lo habitual.\n    d) Mucho más que lo habitual.',
		'3. ¿Ha sentido que está desempeñando un papel útil en la vida?\n    a) Más que lo habitual.\n    b) Igual que lo habitual.\n    c) Menos que lo habitual.\n    d) Mucho menos que lo habitual.',
		'4. ¿Se ha sentido capaz de tomar decisiones?\n    a) Más capaz que lo habitual.\n    b) Igual que lo habitual.\n    c) Menos capaz que lo habitual.\n    d) Mucho menos capaz que lo habitual.',
		'5. ¿Se ha sentido constantemente agobiado y en tensión?\n    a) No, en absoluto.\n    b) Igual que lo habitual.\n    c) Más que lo habitual.\n    d) Mucho más que lo habitual.',
		'6. ¿Ha sentido que no puede superar sus dificultades?\n    a) No, en absoluto.\n    b) Igual que lo habitual.\n    c) Más que lo habitual.\n    d) Mucho más que lo habitual.',
		'7. ¿Ha sido capaz de disfrutar de sus actividades normales de cada día?\n    a) Más que lo habitual.\n    b) Igual que lo habitual.\n    c) Menos que lo habitual.\n    d) Mucho menos que lo habitual.',
		'8. ¿Ha sido capaz de hacer frente adecuadamente a sus problemas?\n    a) Más capaz que lo habitual.\n    b) Igual que lo habitual.\n    c) Menos capaz que lo habitual.\n    d) Mucho menos capaz que lo habitual.',
		'9. ¿Se ha sentido poco feliz o deprimido/a?\n    a) No, en absoluto.\n    b) No más que lo habitual.\n    c) Más que lo habitual.\n    d) Mucho más que lo habitual.',
		'10. ¿Ha perdido confianza en sí mismo/a?\n    a) No, en absoluto.\n    b) No más que lo habitual.\n    c) Más que lo habitual.\n    d) Mucho más que lo habitual.',
		'11. ¿Ha pensado que usted es una persona que no vale para nada?\n    a) No, en absoluto.\n    b) No más que lo habitual.\n    c) Más que lo habitual.\n    d) Mucho más que lo habitual.',
		'12. ¿Se siente razonablemente feliz considerando todas las circunstancias?\n    a) Más feliz que lo habitual.\n    b) Igual que lo habitual.\n    c) Menos feliz que lo habitual.\n    d) Mucho menos feliz que lo habitual.'
	  ],
	  evaluacion: (respuestas) => {
		const puntuacion = respuestas.reduce((total, val) => total + val, 0);
		if (puntuacion <= 11) {
		  return 'No hay presencia de síntomas significativos de malestar psicológico 🟢';
		} else if (puntuacion >= 12 && puntuacion <= 18) {
		  return 'Hay cierto grado de preocupación emocional 🟡';
		} else {
		  return 'Hay un indicador de malestar psicológico significativo 🔴';
		}
	  }
	},
	dep: {
	  nombre: 'Cuestionario de Depresión',
	  preguntas: [
		'1. Tristeza\n    a) No me siento triste.\n    b) Me siento triste gran parte del tiempo.\n    c) Me siento triste todo el tiempo.\n    d) Me siento tan triste o soy tan infeliz que no puedo soportarlo.',
		'2. Pesimismo\n    a) No estoy desalentado respecto de mi futuro.\n    b) Me siento más desalentado respecto de mi futuro que lo que solía estarlo.\n    c) No espero que las cosas funcionen para mí.\n    d) Siento que no hay esperanza para mi futuro y que sólo puede empeorar.',
		'3. Fracaso\n    a) No me siento como un fracasado.\n    b) He fracasado más de lo que hubiera debido.\n    c) Cuando miro hacia atrás, veo muchos fracasos.\n    d) Siento que como persona soy un fracaso total.',
		'4. Pérdida de Placer\n    a) Obtengo tanto placer como siempre por las cosas de las que disfruto.\n    b) No disfruto tanto de las cosas como solía hacerlo.\n    c) Obtengo muy poco placer de las cosas que solía disfrutar.\n    d) No puedo obtener ningún placer de las cosas de las que solía disfrutar.',
		'5. Sentimientos de Culpa\n    a) No me siento particularmente culpable.\n    b) Me siento culpable respecto de varias cosas que he hecho o que debería haber hecho.\n    c) Me siento bastante culpable la mayor parte del tiempo.\n    d) Me siento culpable todo el tiempo.',
		'6. Sentimientos de Castigo\n    a) No siento que estoy siendo castigado.\n    b) Siento que tal vez pueda ser castigado.\n    c) Espero ser castigado.\n    d) Siento que estoy siendo castigado.',
		'7. Disconformidad con uno mismo\n    a) Siento acerca de mí lo mismo que siempre.\n    b) He perdido la confianza en mí mismo.\n    c) Estoy decepcionado conmigo mismo.\n    d) No me gusto a mí mismo.',
		'8. Autocrítica\n    a) No me critico ni me culpo más de lo habitual.\n    b) Estoy más crítico conmigo mismo de lo que solía estarlo.\n    c) Me critico a mí mismo por todos mis errores.\n    d) Me culpo a mí mismo por todo lo malo que sucede.',
		'9. Pensamientos o Deseos Suicidas\n    a) No tengo ningún pensamiento de matarme.\n    b) He tenido pensamientos de matarme, pero no lo haría.\n    c) Querría matarme.\n    d) Me mataría si tuviera la oportunidad de hacerlo.',
		'10. Llanto\n    a) No lloro más de lo que solía hacerlo.\n    b) Lloro más de lo que solía hacerlo.\n    c) Lloro por cualquier pequeñez.\n    d) Siento ganas de llorar pero no puedo.',
		'11. Agitación\n    a) No estoy más inquieto o tenso que lo habitual.\n    b) Me siento más inquieto o tenso que lo habitual.\n    c) Estoy tan inquieto o agitado que me es difícil quedarme quieto.\n    d) Estoy tan inquieto o agitado que tengo que estar siempre en movimiento o haciendo algo.',
		'12. Pérdida de Interés\n    a) No he perdido el interés en otras actividades o personas.\n    b) Estoy menos interesado que antes en otras personas o cosas.\n    c) He perdido casi todo el interés en otras personas o cosas.\n    d) Me es difícil interesarme por algo.',
		'13. Indecisión\n    a) Tomo mis propias decisiones tan bien como siempre.\n    b) Me resulta más difícil que de costumbre tomar decisiones.\n    c) Encuentro mucha más dificultad que antes para tomar decisiones.\n    d) Tengo problemas para tomar cualquier decisión.',
		'14. Desvalorización\n    a) No siento que yo no sea valioso.\n    b) No me considero a mí mismo tan valioso y útil como solía considerarme.\n    c) Me siento menos valioso cuando me comparo con otros.\n    d) Siento que no valgo nada.',
		'15. Pérdida de Energía\n    a) Tengo tanta energía como siempre.\n    b) Tengo menos energía que la que solía tener.\n    c) No tengo suficiente energía para hacer demasiado.\n    d) No tengo energía suficiente para hacer nada.',
		'16. Cambios en los Hábitos de Sueño\n    a) No he experimentado ningún cambio en mis hábitos de sueño.\n    b) Duermo un poco más/menos que lo habitual.\n    c) Duermo mucho más/menos que lo habitual.\n    d) Duermo la mayor parte del día o me despierto 1-2 horas más temprano y no puedo volver a dormirme.',
		'17. Irritabilidad\n    a) No estoy tan irritable que lo habitual.\n    b) Estoy más irritable que lo habitual.\n    c) Estoy mucho más irritable que lo habitual.\n    d) Estoy irritable todo el tiempo.',
		'18. Cambios en el Apetito\n    a) No he experimentado ningún cambio en mi apetito.\n    b) Mi apetito es un poco mayor/menor que lo habitual.\n    c) Mi apetito es mucho mayor/menor que antes.\n    d) No tengo o tengo mucho apetito en todo el día.',
		'19. Dificultad de Concentración\n    a) Puedo concentrarme tan bien como siempre.\n    b) No puedo concentrarme tan bien como habitualmente.\n    c) Me es difícil mantener la mente en algo por mucho tiempo.\n    d) Encuentro que no puedo concentrarme en nada.',
		'20. Cansancio o Fatiga\n    a) No estoy más cansado o fatigado que lo habitual.\n    b) Me fatigo o me canso más fácilmente que lo habitual.\n    c) Estoy demasiado fatigado o cansado para hacer muchas de las cosas que solía hacer.\n    d) Estoy demasiado fatigado o cansado para hacer la mayoría de las cosas que solía hacer.',
		'21. Pérdida de Interés en el Sexo\n    a) No he notado ningún cambio reciente en mi interés por el sexo.\n    b) Estoy menos interesado en el sexo de lo que solía estarlo.\n    c) Estoy mucho menos interesado en el sexo.\n    d) He perdido completamente el interés en el sexo.'
	  ],
	  evaluacion: (respuestas) => {
		const puntuacion = respuestas.reduce((total, val) => total + val, 0);
		if (puntuacion <= 5) {
		  return 'Estado emocional saludable 🟢';
		} else if (puntuacion >= 6 && puntuacion <= 10) {
		  return 'Posible depresión leve 🟡';
		} else {
		  return 'Posible depresión grave 🔴';
		}
	  }
	},
	ans: {
	  nombre: 'Cuestionario de Ansiedad',
	  preguntas: [
		'1. Torpe o entumecido.\n    a) En absoluto.\n    b) Levemente.\n    c) Moderadamente.\n    d) Severamente.',
		'2. Acalorado.\n    a) En absoluto.\n    b) Levemente.\n    c) Moderadamente.\n    d) Severamente.',
		'3. Con temblor en las piernas.\n    a) En absoluto.\n    b) Levemente.\n    c) Moderadamente.\n    d) Severamente.',
		'4. Incapaz de relajarse.\n    a) En absoluto.\n    b) Levemente.\n    c) Moderadamente.\n    d) Severamente.',
		'5. Con temor a que ocurra lo peor.\n    a) En absoluto.\n    b) Levemente.\n    c) Moderadamente.\n    d) Severamente.',
		'6. Mareado, o que se le va la cabeza.\n    a) En absoluto.\n    b) Levemente.\n    c) Moderadamente.\n    d) Severamente.',
		'7. Con latidos del corazón fuertes y acelerados.\n    a) En absoluto.\n    b) Levemente.\n    c) Moderadamente.\n    d) Severamente.',
		'8. Inestable.\n    a) En absoluto.\n    b) Levemente.\n    c) Moderadamente.\n    d) Severamente.',
		'9. Atemorizado o asustado.\n    a) En absoluto.\n    b) Levemente.\n    c) Moderadamente.\n    d) Severamente.',
		'10. Nervioso.\n    a) En absoluto.\n    b) Levemente.\n    c) Moderadamente.\n    d) Severamente.',
		'11. Con sensación de bloqueo.\n    a) En absoluto.\n    b) Levemente.\n    c) Moderadamente.\n    d) Severamente.',
		'12. Con temblores en las manos.\n    a) En absoluto.\n    b) Levemente.\n    c) Moderadamente.\n    d) Severamente.',
		'13. Inquieto, inseguro.\n    a) En absoluto.\n    b) Levemente.\n    c) Moderadamente.\n    d) Severamente.',
		'14. Con miedo a perder el control.\n    a) En absoluto.\n    b) Levemente.\n    c) Moderadamente.\n    d) Severamente.',
		'15. Con sensación de ahogo.\n    a) En absoluto.\n    b) Levemente.\n    c) Moderadamente.\n    d) Severamente.',
		'16. Con temor a morir.\n    a) En absoluto.\n    b) Levemente.\n    c) Moderadamente.\n    d) Severamente.',
		'17. Con miedo.\n    a) En absoluto.\n    b) Levemente.\n    c) Moderadamente.\n    d) Severamente.',
		'18. Con problemas digestivos.\n    a) En absoluto.\n    b) Levemente.\n    c) Moderadamente.\n    d) Severamente.',
		'19. Con desvanecimientos.\n    a) En absoluto.\n    b) Levemente.\n    c) Moderadamente.\n    d) Severamente.',
		'20. Con rubor facial.\n    a) En absoluto.\n    b) Levemente.\n    c) Moderadamente.\n    d) Severamente.',
		'21. Con sudores, frios o calientes.\n    a) En absoluto.\n    b) Levemente.\n    c) Moderadamente.\n    d) Severamente.'
	  ],
	  evaluacion: (respuestas) => {
		const puntuacion = respuestas.reduce((total, val) => total + val, 0);
		if (puntuacion <= 21) {
		  return 'Ansiedad saludable 🟢';
		} else if (puntuacion >= 22 && puntuacion <= 35) {
		  return 'Ansiedad moderada 🟡';
		} else {
		  return 'Ansiedad severa 🔴';
		}
	  }
	},
	estr: {
	  nombre: 'Cuestionario de Estrés',
	  preguntas: [
		'1. ¿Con qué frecuencia te has sentido afectado por algo que ocurrió inesperadamente?\n    a) Nunca.\n    b) Casi nunca.\n    c) De vez en cuando.\n    d) A menudo.\n    e) Muy a menudo.',
		'2. ¿Con qué frecuencia te has sentido incapaz de controlar las cosas importantes en tu vida?\n    a) Nunca.\n    b) Casi nunca.\n    c) De vez en cuando.\n    d) A menudo.\n    e) Muy a menudo.',
		'3. ¿Con qué frecuencia te has sentido nervioso o estresado?\n    a) Nunca.\n    b) Casi nunca.\n    c) De vez en cuando.\n    d) A menudo.\n    e) Muy a menudo.',
		'4. ¿Con qué frecuencia has manejado con éxito los pequeños problemas irritantes de la vida?\n    a) Nunca.\n    b) Casi nunca.\n    c) De vez en cuando.\n    d) A menudo.\n    e) Muy a menudo.',
		'5. ¿Con qué frecuencia has sentido que has afrontado efectivamente los cambios importantes que han estado ocurriendo en tu vida?\n    a) Nunca.\n    b) Casi nunca.\n    c) De vez en cuando.\n    d) A menudo.\n    e) Muy a menudo.',
		'6. ¿Con qué frecuencia has estado seguro sobre tu capacidad para manejar tus problemas personales?\n    a) Nunca.\n    b) Casi nunca.\n    c) De vez en cuando.\n    d) A menudo.\n    e) Muy a menudo.',
		'7. ¿Con qué frecuencia has sentido que las cosas van bien?\n    a) Nunca.\n    b) Casi nunca.\n    c) De vez en cuando.\n    d) A menudo.\n    e) Muy a menudo.',
		'8. ¿Con qué frecuencia has sentido que no podías afrontar todas las cosas que tenías que hacer?\n    a) Nunca.\n    b) Casi nunca.\n    c) De vez en cuando.\n    d) A menudo.\n    e) Muy a menudo.',
		'9. ¿Con qué frecuencia has podido controlar las dificultades de tu vida?\n    a) Nunca.\n    b) Casi nunca.\n    c) De vez en cuando.\n    d) A menudo.\n    e) Muy a menudo.',
		'10. ¿Con qué frecuencia has sentido que tenías todo bajo control?\n    a) Nunca.\n    b) Casi nunca.\n    c) De vez en cuando.\n    d) A menudo.\n    e) Muy a menudo.',
		'11. ¿Con qué frecuencia has estado enfadado porque las cosas que te han ocurrido estaban fuera de tu control?\n    a) Nunca.\n    b) Casi nunca.\n    c) De vez en cuando.\n    d) A menudo.\n    e) Muy a menudo.',
		'12. ¿Con qué frecuencia has pensado sobre las cosas que te faltan por hacer?\n    a) Nunca.\n    b) Casi nunca.\n    c) De vez en cuando.\n    d) A menudo.\n    e) Muy a menudo.',
		'13. ¿Con qué frecuencia has podido controlar la forma de pasar el tiempo?\n    a) Nunca.\n    b) Casi nunca.\n    c) De vez en cuando.\n    d) A menudo.\n    e) Muy a menudo.',
		'14. ¿Con qué frecuencia has sentido que las dificultades se acumulan tanto que no puedes superarlas?\n    a) Nunca.\n    b) Casi nunca.\n    c) De vez en cuando.\n    d) A menudo.\n    e) Muy a menudo.'
	  ],
	  evaluacion: (respuestas) => {
		const puntuacion = respuestas.reduce((total, val) => total + val, 0);
		if (puntuacion <= 19) {
		  return 'Estrés saludable 🟢';
		} else if (puntuacion >= 20 && puntuacion <= 25) {
		  return 'Estrés moderado 🟡';
		} else {
		  return 'Estrés severo 🔴';
		}
	  }
	},
	suic: {
	  nombre: 'Cuestionario de Riesgo Suicida',
	  preguntas: [
		'1. Deseo de vivir\n    a) Moderado a fuerte.\n    b) Débil.\n    c) Ninguno.',
		'2. Deseo de morir\n    a) Ninguno.\n    b) Débil.\n    c) Moderado a fuerte.',
		'3. Razones para vivir/morir\n    a) Porque seguir viviendo vale más que morir.\n    b) Aproximadamente iguales.\n    c) Porque la muerte vale más que seguir viviendo.',
		'4. Deseo de intentar activamente el suicidio\n    a) Ninguno.\n    b) Débil.\n    c) Moderado a fuerte.',
		'5. Deseos pasivos de suicidio\n    a) Puede tomar precauciones para salvaguardar la vida.\n    b) Puede dejar de vivir/morir por casualidad.\n    c) Puede evitar las etapas necesarias para seguir con vida.',
		'6. Dimensión temporal (duración de la ideación/deseo suicida)\n    a) Breve, períodos pasajeros.\n    b) Por amplios períodos de tiempo.\n    c) Continuo (crónico) o casi continuo.',
		'7. Dimensión temporal (frecuencia del suicidio)\n    a) Raro, ocasional.\n    b) Intermitente.\n    c) Persistente o continuo.',
		'8. Actitud hacia la ideación/deseo\n    a) Rechazo.\n    b) Ambivalente, indiferente.\n    c) Aceptación.',
		'9. Control sobre la actividad suicida/deseos de acting out\n    a) Tiene sentido del control.\n    b) Inseguro.\n    c) No tiene sentido del control.',
		'10. Disuasivos para un intento activo (familia, religión, irreversibilidad)\n    a) Puede no intentarlo a causa de un disuasivo.\n    b) Alguna preocupación sobre los medios puede disuadirlo.\n    c) Mínima o ninguna preocupación o interés por ellos.',
		'11. Razones para el intento contemplado\n    a) Manipular el entorno, llamar la atención, vengarse.\n    b) Combinación de a) y c).\n    c) Escapar, solucionar los problemas, finalizar de forma absoluta.',
		'12. Método (especificidad/planificación del intento contemplado)\n    a) No considerado.\n    b) Considerado, pero detalles no calculados.\n    c) Detalles calculados/bien formulados.',
		'13. Método (accesibilidad/oportunidad para el intento contemplado)\n    a) Método no disponible, inaccesible. No hay oportunidad.\n    b) El método puede tomar tiempo o esfuerzo. Oportunidad escasa.\n    c) Futura oportunidad o accesibilidad del método previsto.',
		'14. Sentido de «capacidad» para llevar adelante el intento\n    a) No tiene valor, demasiado débil, miedoso, incompetente.\n    b) Inseguridad sobre su valor.\n    c) Seguro de su valor, capacidad.',
		'15. Expectativas/espera del intento actual\n    a) No.\n    b) Incierto.\n    c) Sí.',
		'16. Preparación actual para el intento contemplado\n    a) Ninguna.\n    b) Parcial (p. ej., empieza a almacenar pastillas, etc.).\n    c) Completa (p. ej., tiene las pastillas, pistola cargada, etc.).',
		'17. Nota suicida\n    a) Ninguna.\n    b) Piensa sobre ella o comenzada y no terminada.\n    c) Nota terminada.',
		'18. Actos finales en anticipación de la muerte (p. ej., testamento, póliza de seguros, etc.)\n    a) Ninguno.\n    b) Piensa sobre ello o hace algunos arreglos.\n    c) Hace planes definitivos o terminó los arreglos finales.',
		'19. Engaño/encubrimiento del intento contemplado\n    a) Reveló las ideas abiertamente.\n    b) Frenó lo que estaba expresando.\n    c) Intentó engañar, ocultar, mentir.'
	  ],
	  evaluacion: (respuestas) => {
		const puntuacion = respuestas.reduce((total, val) => total + val, 0);
		if (puntuacion <= 1) {
		  return 'Sin indicativo de suicidio 🟢';
		} else {
		  return 'Alto riesgo de suicidio 🔴';
		}
	  }
	},
	calvida: {
	  nombre: 'Cuestionario de Calidad de Vida',
	  preguntas: [
		'1. ¿Cómo puntuaria su calidad de vida?\n    a) Nada.\n    b) Poco.\n    c) Lo normal.\n    d) Bastante.\n    e) Muchísimo.',
		'2. ¿Qué tan satisfecho está con su salud?\n    a) Nada.\n    b) Poco.\n    c) Lo normal.\n    d) Bastante.\n    e) Muchísimo.',
		'3. ¿En qué medida piensa que el dolor (físico) le impide hacer lo que necesita?\n    a) Nada.\n    b) Poco.\n    c) Lo normal.\n    d) Bastante.\n    e) Muchísimo.',
		'4. ¿Cuánto necesita de cualquier tratamiento médico para funcionar en su vida diaria?\n    a) Nada.\n    b) Poco.\n    c) Lo normal.\n    d) Bastante.\n    e) Muchísimo.',
		'5. ¿Cuánto disfrutas de la vida?\n    a) Nada.\n    b) Poco.\n    c) Lo normal.\n    d) Bastante.\n    e) Muchísimo.',
		'6. ¿En qué medida siente que su vida tiene sentido?\n    a) Nada.\n    b) Poco.\n    c) Lo normal.\n    d) Bastante.\n    e) Muchísimo.',
		'7. ¿Cuál es su capacidad de concentración?\n    a) Nada.\n    b) Poco.\n    c) Lo normal.\n    d) Bastante.\n    e) Muchísimo.',
		'8. ¿Cuánta seguridad siente en su vida diaria?\n    a) Nada.\n    b) Poco.\n    c) Lo normal.\n    d) Bastante.\n    e) Muchísimo.',
		'9. ¿Qué tan saludable es el ambiente físico a su alrededor?\n    a) Nada.\n    b) Poco.\n    c) Lo normal.\n    d) Bastante.\n    e) Muchísimo.',
		'10. ¿Tiene energía suficiente para la vida diaria?\n    a) Nada.\n    b) Poco.\n    c) Lo normal.\n    d) Bastante.\n    e) Muchísimo.',
		'11. ¿Es capaz de aceptar su apariencia física?\n    a) Nada.\n    b) Poco.\n    c) Lo normal.\n    d) Bastante.\n    e) Muchísimo.',
		'12. ¿Tiene suficiente dinero para cubrir sus necesidades?\n    a) Nada.\n    b) Poco.\n    c) Lo normal.\n    d) Bastante.\n    e) Muchísimo.',
		'13. ¿Qué disponibilidad tiene de la información que necesita en su vida diaria?\n    a) Nada.\n    b) Poco.\n    c) Lo normal.\n    d) Bastante.\n    e) Muchísimo.',
		'14. ¿Hasta qué punto tiene oportunidad para realizar actividades de ocio?\n    a) Nada.\n    b) Poco.\n    c) Lo normal.\n    d) Bastante.\n    e) Muchísimo.',
		'15. ¿Es capaz de desplazarse de un lugar a otro?\n    a) Nada.\n    b) Poco.\n    c) Lo normal.\n    d) Bastante.\n    e) Muchísimo.',
		'16. ¿Qué tan satisfecho/a está con su sueño?\n    a) Nada.\n    b) Poco.\n    c) Lo normal.\n    d) Bastante.\n    e) Muchísimo.',
		'17. ¿Qué tan satisfecho/a está con su habilidad para realizar sus actividades de la vida diaria?\n    a) Nada.\n    b) Poco.\n    c) Lo normal.\n    d) Bastante.\n    e) Muchísimo.',
		'18. ¿Qué tan satisfecho/a está con su capacidad de trabajo?\n    a) Nada.\n    b) Poco.\n    c) Lo normal.\n    d) Bastante.\n    e) Muchísimo.',
		'19. ¿Qué tan satisfecho/a está de sí mismo?\n    a) Nada.\n    b) Poco.\n    c) Lo normal.\n    d) Bastante.\n    e) Muchísimo.',
		'20. ¿Qué tan satisfecho/a está con sus relaciones personales?\n    a) Nada.\n    b) Poco.\n    c) Lo normal.\n    d) Bastante.\n    e) Muchísimo.',
		'21. ¿Qué tan satisfecho/a está con su vida sexual?\n    a) Nada.\n    b) Poco.\n    c) Lo normal.\n    d) Bastante.\n    e) Muchísimo.',
		'22. ¿Qué tan satisfecho/a está con el apoyo que obtiene de sus amigos?\n    a) Nada.\n    b) Poco.\n    c) Lo normal.\n    d) Bastante.\n    e) Muchísimo.',
		'23. ¿Qué tan satisfecho/a está de las condiciones del lugar donde vive?\n    a) Nada.\n    b) Poco.\n    c) Lo normal.\n    d) Bastante.\n    e) Muchísimo.',
		'24. ¿Qué tan satisfecho/a está con el acceso que tiene a los servicios sanitarios?\n    a) Nada.\n    b) Poco.\n    c) Lo normal.\n    d) Bastante.\n    e) Muchísimo.',
		'25. ¿Qué tan satisfecho/a está con su transporte?\n    a) Nada.\n    b) Poco.\n    c) Lo normal.\n    d) Bastante.\n    e) Muchísimo.',
		'26. ¿Con qué frecuencia tiene sentimientos negativos, tales como tristeza, desesperanza, ansiedad o depresión?\n    a) Nada.\n    b) Poco.\n    c) Lo normal.\n    d) Bastante.\n    e) Muchísimo.'
	  ],
	  evaluacion: (respuestas) => {
		const puntuacion = respuestas.reduce((total, val) => total + val, 0);
		if (puntuacion <= 33) {
		  return 'Calidad de vida baja 🔴';
		} else if (puntuacion >= 34 && puntuacion <= 68) {
		  return 'Calidad de vida estable 🟡';
		} else {
		  return 'Calidad de vida excelente 🟢';
		}
	  }
	}
  };
  