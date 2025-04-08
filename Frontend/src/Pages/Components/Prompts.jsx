import Cookies from "js-cookie";

const name = () => {
  return Cookies.get("usuario") || "Usuario desconocido";
};

export const getPrompt = () => {
  const usuario = name();
  return { 
    role: "system", 
    content: ` 
    🎭 **Rol Exclusivo - Acompañante Virtual Psicológico** 
  
    Eres un **acompañante psicológico virtual** de la universidad *Universitaria de Colombia*, desarrollado por el grupo *Valle del Software*. Tu misión es brindar **apoyo emocional, escucha activa y evaluación psicológica estructurada** a los usuarios.
  
    🚫 **Límites de tu rol**: 
    - RESTRICCIÓN PRINCIPAL: SOLO puedes utilizar los tests psicológicos incluidos en las TOOLS proporcionadas (tokenGHQ12responses, tokenDEPresponses, tokenANSresponses, tokenESTRresponses, tokenSUICresponses, tokenCALVIDAresponses).
    - NO debes crear, modificar ni improvisar ningún test psicológico bajo ninguna circunstancia.
    - Solo puedes ayudar en temas de apoyo psicológico y bienestar emocional.
    - Si el usuario pregunta sobre otros temas (recetas, programación, historia, política, etc.), responde con cortesía que solo puedes asistir en cuestiones emocionales.
    - Evita groserías, insultos o lenguaje ofensivo.
    - Únicamente te referirás a los usuarios por su nombre: ${usuario}.
  
    --- 
  
    🧠 **Personalidad y estilo de comunicación** 
    - Saluda de forma cálida y amigable. Ejemplo: "Hola ${usuario}, ¿cómo te sientes hoy? ¿Hay algo de lo que quieras hablar?" 
    - Actúa como un profesional cercano, similar a un psicólogo empático.
    - Comunica de forma auténtica, natural y directa.
    - Emplea un lenguaje juvenil, amigable y respetuoso.
  
    --- 
  
    💬 **Principios clave de comunicación** 
  
    1️⃣ **Empatía Profunda** 
       - Conéctate con las emociones del usuario. 
       - Utiliza un tono coloquial y accesible. 
       - Valida los sentimientos sin juzgar.
  
    2️⃣ **Diálogo Estratégico** 
       - Emplea frases cortas y directas. 
       - Formula preguntas reflexivas en lugar de dar consejos directos. 
       - Prioriza el bienestar emocional en cada respuesta.
  
    3️⃣ **Manejo de Situaciones Sensibles** 
       - Normaliza las emociones sin minimizar las experiencias. 
       - Ofrece perspectivas alternativas de forma sutil. 
       - Ayuda a procesar los sentimientos de manera saludable.
  
    --- 
  
    📊 **Protocolo de Evaluación Psicológica**
  
    ⚠️ **REGLA OBLIGATORIA PARA TODOS LOS TESTS**
       - SIEMPRE debes obtener consentimiento explícito del usuario antes de iniciar cualquier test.
       - Ejemplo: "${usuario}, ¿te parece bien si realizamos un breve cuestionario para entender mejor cómo te sientes? Podemos iniciarlo cuando estés listo/a."
       - SOLO inicia el test después de recibir confirmación positiva del usuario.
  
    1️⃣ **Evaluación Inicial Obligatoria**
       - Después del saludo inicial y la primera interacción, sugiere aplicar el cuestionario GHQ-12 usando ÚNICAMENTE la herramienta "tokenGHQ12responses".
       - Explica al usuario que es necesario realizar una breve evaluación para entender mejor su estado emocional.
       - Menciona que responder a estas preguntas ayudará a brindarle un mejor acompañamiento.
       - RECUERDA: Siempre pregunta si está listo antes de iniciar el test.
  
    2️⃣ **Evaluación Secundaria Basada en GHQ-12**
       - Después de completar el GHQ-12, determina qué test secundario aplicar según los síntomas predominantes:
          * Síntomas de tristeza, desánimo o desesperanza → Test DEPS (ÚNICAMENTE tokenDEPresponses)
          * Síntomas de preocupación, nerviosismo o tensión → Escala ANS (ÚNICAMENTE tokenANSresponses)
          * Síntomas de sobrecarga, agotamiento o tensión continua → Test ESTR (ÚNICAMENTE tokenESTRresponses)
          * Indicadores de desesperanza o pensamientos de muerte → Evaluación SUIC (ÚNICAMENTE tokenSUICresponses)
          * Insatisfacción general con la vida o problemas en varias áreas → Test CALVIDA (ÚNICAMENTE tokenCALVIDAresponses)
       - IMPORTANTE: Antes de aplicar cualquier test secundario, explica brevemente su propósito y pregunta al usuario si está de acuerdo en realizarlo.
  
    3️⃣ **Manejo de la Continuidad**
       - Al iniciar cada nueva conversación, pregunta si desea continuar con alguna evaluación pendiente.
       - Si identificas que se interrumpió un test previamente, dile al usuario: "Parece que estábamos realizando el test [nombre del test]. Es importante que lo realices nuevamente desde el principio para asegurar una evaluación completa y correcta. ¿Te gustaría iniciar el test de nuevo cuando te sientas listo/a?"
       - Si el usuario acepta, usa nuevamente la herramienta correspondiente, pero SOLO después de confirmar que está listo.
  
    --- 
  
    🚨 **Atención a señales emocionales**
    - Detecta signos de sufrimiento o vulnerabilidad.
    - Identifica posibles riesgos emocionales en la conversación.
    - Mantén siempre el enfoque en el bienestar y la seguridad del usuario.
    - Si detectas señales de riesgo alto, sugiere amablemente recursos de ayuda profesional inmediata.
  
    --- 
  
    ❌ **Lo que NO debes hacer**
    - NUNCA crees tus propios tests ni modifiques los existentes - SOLO usa las tools específicas disponibles.
    - NUNCA inicies un test sin el consentimiento explícito del usuario.
    - No des consejos directos ni soluciones cerradas sin realizar primero las evaluaciones.
    - No minimices los sentimientos del usuario.
    - No uses respuestas genéricas o fuera de contexto.
    - No ignores señales de vulnerabilidad.
    - No abordes temas que no sean estrictamente de apoyo emocional.
  
    --- 
  
    📝 **Notas sobre la aplicación de tests**
    - Durante la aplicación de tests, el sistema externo tomará el control de la conversación.
    - Cuando recuperes el control después de un test, debes revisar el historial de chat para identificar qué test se estaba realizando.
    - Si el test quedó incompleto, informa al usuario que es necesario reiniciarlo desde cero para que Open AI pueda volver a llamar a la tool correspondiente y asegurar la correcta ejecución.
    - Al interpretar los resultados, utiliza un enfoque claro pero delicado, evitando etiquetas diagnósticas formales.
    - Siempre agradece al usuario por responder las preguntas y valida su esfuerzo.
    - RECORDATORIO CRÍTICO: ÚNICAMENTE puedes usar las herramientas (tools) oficiales disponibles para los tests. Si el usuario pide aplicar un test, ÚNICAMENTE usa las tools mencionadas.
  
    --- 
  
    💡 **Estrategias de apoyo emocional**
    - Promueve la expresión emocional libre y sin juicios.
    - Enseña técnicas básicas de respiración y relajación cuando detectes ansiedad.
    - Fomenta la identificación y reconocimiento de los logros personales, por pequeños que sean.
    - Ayuda a identificar patrones de pensamiento negativos sin caer en interpretaciones diagnósticas.
    - Refuerza la importancia del autocuidado y la búsqueda de ayuda profesional cuando sea necesario.
    `, 
  }
  
};



 export const steps = [
    {
      label: "Al pulzar **SIGUIENTE** autorizas el tratamiento de tus datos personales para uso educativo y de investigación. Si no esta de acuerdo no siga adelante.",
      comment: "⚠ Leee Esto detalladamente antes de continuar. ⚠",
    },
  
    // Datos personales
    {
      label: "Nombres",
      name: "nombre",
      type: "text",
      comment:
        "Por favor escribe tus dos nombres completos y pulsa 'Siguiente' 😊",
    },
    {
      label: "Apellidos",
      name: "apellido",
      type: "text",
      comment: "Escribe tus dos apellidos completos y pulsa 'Siguiente' 😁",
    },
    {
      label: "Correo Electrónico",
      name: "correo",
      type: "email",
      comment:
        "Ingresa tu dirección de correo electrónico 📫 y pulsa 'Siguiente'",
    },
    {
      label: "Número de Teléfono Personal",
      name: "telefonoPersonal",
      type: "tel",
      comment:
        "Por favor, escribe tu número de teléfono 📱 y continúa con 'Siguiente'",
    },
    {
      label: "Tipo de Documento",
      name: "tipoDocumento",
      type: "select",
      comment: "Selecciona tu tipo de documento 📄 y pulsa 'Siguiente'",
      options: [
        { label: "Cédula de Ciudadanía", value: "cedula_ciudadania" },
        { label: "Tarjeta de Identidad", value: "tarjeta_identidad" },
        { label: "Cédula de Extranjería", value: "cedula_extranjeria" },
        { label: "Pasaporte", value: "pasaporte" },
        { label: "Permiso Especial de Permanencia", value: "permiso_permanencia" },
      ],
    },
    {
      label: "Número de Documento",
      name: "documento",
      type: "text",
      comment: "Escribe tu número de documento 📄 y pulsa 'Siguiente'",
    },
    // Información personal adicional
    {
      label: "Edad",
      name: "edad",
      type: "number",
      comment: "Indica tu edad actual 🎂 y pulsa 'Siguiente'",
    },
    {
      label: "sexo",
      name: "sexo",
      type: "select",
      comment: "Especifica tu sexo ⚧️ y pulsa 'Siguiente'",
      options: [
        { label: "Hombre", value: "Hombre" },
        { label: "Mujer", value: "Mujer" },
      ],
    },
    {
      label: "Género",
      name: "genero",
      type: "select",
      comment: "Especifica tu género ⚧️ y pulsa 'Siguiente'",
      options: [
        { label: "Heterosexual", value: "heterosexual" },
        { label: "Homosexual", value: "homosexual" },
        { label: "Bisexual", value: "bisexual" },
        { label: "Asexual", value: "asexual" },
        { label: "Otro", value: "Otro" },
        { label: "Prefiero no decirlo", value: "prefiero_no_decirlo" },
      ],
    },
    {
      label: "Estado Civil",
      name: "estadocivil",
      type: "select",
      comment:
        "¿Cuál es tu estado civil actual? 💍 Por favor escribe y pulsa 'Siguiente'",
      options: [
        { label: "Solter@", value: "Soltero" },
        { label: "Casad@", value: "Casado" },
        { label: "Viud@", value: "Viudo" },
        { label: "Separad@", value: "Separado" },
        { label: "Divorciad@", value: "Divorciado" },
      ],
    },
    {
      label: "Número de Hijos",
      name: "hijosnum",
      type: "number",
      comment: "Indica cuántos hijos tienes 👶 y pulsa 'Siguiente'",
    },
    {
      label: "Personas a Cargo",
      name: "personascargo",
      type: "number",
      comment:
        "Especifica cuántas personas están bajo tu cuidado 👨‍👩‍👧 y pulsa 'Siguiente'",
    },
    {
      label: "Tipo de Vivienda",
      name: "vivienda",
      type: "select",
      comment:
        "Describe tu tipo de vivienda actual (ejemplo: casa o apartamento) 🏡 y pulsa 'Siguiente'",
      options: [
        { label: "Casa", value: "Casa" },
        { label: "Apartamento", value: "Apartamento" },
        { label: "Pieza", value: "Pieza" },
      ],
    },
    {
      label: "Localidad de Residencia",
      name: "localidad",
      type: "select",
      comment:
        "Indica la localidad donde resides actualmente 🗺️ y pulsa 'Siguiente'",
      options: [
        { label: "Usaquén", value: "Usaquén" },
        { label: "Chapinero", value: "Chapinero" },
        { label: "Santa Fe", value: "Santa Fe" },
        { label: "San Cristóbal", value: "San Cristóbal" },
        { label: "Usme", value: "Usme" },
        { label: "Tunjuelito", value: "Tunjuelito" },
        { label: "Bosa", value: "Bosa" },
        { label: "Kennedy", value: "Kennedy" },
        { label: "Fontibón", value: "Fontibón" },
        { label: "Engativá", value: "Engativá" },
        { label: "Suba", value: "Suba" },
        { label: "Barrios Unidos", value: "Barrios Unidos" },
        { label: "Teusaquillo", value: "Teusaquillo" },
        { label: "Los Mártires", value: "Los Mártires" },
        { label: "Antonio Nariño", value: "Antonio Nariño" },
        { label: "Puente Aranda", value: "Puente Aranda" },
        { label: "La Candelaria", value: "La Candelaria" },
        { label: "Rafael Uribe Uribe", value: "Rafael Uribe Uribe" },
        { label: "Ciudad Bolívar", value: "Ciudad Bolívar" },
        { label: "Sumapaz", value: "Sumapaz" },
        { label: "Soacha", value: "Soacha" },
      ],
    },
    {
      label: "Propiedad de Vivienda",
      name: "tipovivienda",
      type: "select",
      comment:
        "¿Tu vivienda es propia, rentada u otro tipo? 🏠 y pulsa 'Siguiente'",
      options: [
        { label: "Propia", value: "Propia" },
        { label: "Arrendada", value: "Arrendada" },
        { label: "Cedido / En comodato", value: "Cedido / En comodato" },
        { label: "Otro", value: "Otro" },
      ],
    },
    {
      label: "Número de Familiares en el Hogar",
      name: "familiaresnum",
      type: "number",
      comment:
        "Especifica cuántos familiares viven contigo 👫👭 y pulsa 'Siguiente'",
    },
    {
      label: "Estrato Social",
      name: "estrato",
      type: "select",
      comment: "Indica el estrato social de tu hogar 🏡 y pulsa 'Siguiente'",
      options: [
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4" },
        { label: "5", value: "5" },
        { label: "6", value: "6" },
      ],
    },
    {
      label: "Pertenencia Étnica",
      name: "etnico",
      type: "select",
      comment:
        "Indica si perteneces a un grupo étnico (escribe NA si no aplica) 🌍 y pulsa 'Siguiente'",
      options: [
        { label: "Indígena", value: "Indígena" },
        { label: "Afrocolombiano", value: "Afrocolombiano" },
        { label: "Raizal", value: "Raizal" },
        { label: "Palenquero", value: "Palenquero" },
        { label: "Rom", value: "Rom" },
        { label: "Otro", value: "Otro" },
        { label: "Ninguna", value: "Ninguna" },
      ],
    },
  
    // Vivienda
    {
      label: "Condiciones de Espacio",
      name: "hacinamiento",
      type: "select",
      comment: (
        <>
          {" "}
          ¿Consideras que hay{" "}
          <a
            href="https://es.wikipedia.org/wiki/Hacinamiento"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            hacinamiento
          </a>{" "}
          en tu hogar? (pulsa el texto azul para consultar) 🏘️ Pulsa 'Siguiente'
          para continuar.{" "}
        </>
      ),
      options: [
        { label: "Sí", value: "si" },
        { label: "No", value: "no" },
      ],
    },
    {
      label: "Violencia Familiar",
      name: "violencia",
      type: "select",
      comment:
        "Indica si has experimentado violencia familiar en tu hogar 💔  y pulsa 'Siguiente'",
      options: [
        { label: "Sí", value: "si" },
        { label: "No", value: "no" },
      ],
    },
    {
      label: "Servicios Básicos Disponibles",
      name: "servicios",
      type: "checkbox",
      comment:
        "Describe los servicios básicos con los que cuentas (ejemplo: agua, luz, internet) 💡  y pulsa 'Siguiente'",
      options: [
        { label: "Agua", value: "agua" },
        { label: "Luz", value: "luz" },
        { label: "Gas", value: "gas" },
        { label: "Alcantarillado y saneamiento", value: "Alcantarillado y saneamiento" },
        { label: "Internet", value: "Internet" },
        { label: "Teléfonia Movil", value: "Teléfonia Movil" },
        { label: "Ninguno de los anteriores", value: "NA" },
      ],
    },
    {
      label: "Problemas Habitacionales",
      name: "problemas",
      type: "checkbox",
      comment:
        "Especifica si has enfrentado problemas de vivienda (ejemplo: inseguridad o inundaciones) 📋  y pulsa 'Siguiente'",
      options: [
        { label: "Inseguridad", value: "inseguridad" },
        { label: "Basuras", value: "basuras" },
        { label: "Ruidos molestos", value: "ruidos_molestos" },
        { label: "Acceso limitado a transporte", value: "acceso_transporte" },
        { label: "Contaminación ambiental", value: "contaminacion" },
        {label: "Deficiencias estructurales",value: "deficiencias_estructurales"},
        { label: "Vivienda en mal estado", value: "vivienda_mal_estado" },
        { label: "Problemas de humedad", value: "problemas_humedad" },
        { label: "Falta de espacio", value: "falta_espacio" },
        {label: "Falta de acceso a servicios básicos",value: "falta_servicios"},
        { label: "Inundaciones", value: "inundaciones" },      
        { label: "Deslizamientos de tierra", value: "deslizamientos" }, 
        { label: "Ninguno de los anteriores", value: "NA" },   
      ],
    },
    {
      label: "Zona de Residencia",
      name: "tipozona",
      type: "select",
      comment:
        "¿Tu vivienda está en zona rural o urbana? 🏡  y pulsa 'Siguiente'",
      options: [
        { label: "Urbana", value: "Urbana" },
        { label: "Rural", value: "Rural" },
      ],
    },
  
    // Educación
    {
      label: "Tipo de Colegio",
      name: "tipocolegio",
      type: "select",
      comment:
        "¿Asististe a un colegio público o privado? (escribe NA si no aplica) 🏫  y pulsa 'Siguiente'",
      options: [
        { label: "Público", value: "Público" },
        { label: "Privado", value: "Privado" },
        { label: "NA", value: "NA" },
      ],
    },
    {
      label: "Nivel de Escolaridad",
      name: "nivelescolaridad",
      type: "select",
      comment:
        "Indica el nivel educativo más alto que alcanzaste (escribe NA si no aplica) 🎓  y pulsa 'Siguiente'",
      options: [
        { label: "Primaria", value: "Primaria" },
        { label: "Secundaria", value: "Secundaria" },
        { label: "Técnico", value: "Técnico" },
        { label: "Tecnológico", value: "Tecnológico" },
        { label: "Profesional", value: "Profesional" },
        { label: "Posgrado", value: "Posgrado" },
        { label: "NA", value: "NA" },
      ],
    },
    {
      label: "Carrera Universitaria",
      name: "carrera",
      type: "select",
      comment:
        "Si estudiaste o estudias una carrera, indícala aquí (escribe NA si no aplica) 📚  y pulsa 'Siguiente'",
      options: [
        { label: "Ingeniería de Sistemas", value: "IngenieriaDeSistemas" },
        { label: "Ingeniería Industrial", value: "IngenieriaIndustrial" },
        { label: "Ingeniería de Software", value: "IngenieriaDeSoftware" },
        { label: "Administración de Empresas", value: "AdministracionDeEmpresas" },
        { label: "Derecho", value: "Derecho" },
        { label: "Medicina", value: "Medicina" },
        { label: "Medicina Veterinaria", value: "MedicinaVeterinaria" },  
        { label: "Contaduría Pública", value: "ContaduriaPublica" },
        { label: "Psicología", value: "Psicologia" },
        { label: "Arquitectura", value: "Arquitectura" },
        { label: "Comunicación Social", value: "ComunicacionSocial" },
        { label: "Diseño Gráfico", value: "DisenoGrafico" },
        { label: "Comunicacion social", value: "ComunicacionSocial" },
        { label: "NA", value: "NA" },
      ],
    },
    {
      label: "Estado de la Carrera",
      name: "periodo",
      type: "select",
      comment:
        "¿En qué semestre estás o ya la terminaste? (escribe NA si no aplica) y pulsa 'Siguiente'",
      options: [
        { label: "1er semestre", value: "1er semestre" },
        { label: "2do semestre", value: "2do semestre" },
        { label: "3er semestre", value: "3er semestre" },
        { label: "4to semestre", value: "4to semestre" },
        { label: "5to semestre", value: "5to semestre" },
        { label: "6to semestre", value: "6to semestre" },
        { label: "7mo semestre", value: "7mo semestre" },
        { label: "8vo semestre", value: "8vo semestre" },
        { label: "9no semestre", value: "9no semestre" },
        { label: "10mo semestre", value: "10mo semestre" },
        { label: "11vo semestre", value: "11vo semestre" },
        { label: "12vo semestre", value: "12vo semestre" },
        { label: "Finalizada", value: "finalizada" },
        { label: "Suspendida", value: "suspendida" },
        { label: "NA", value: "NA" },
      ],
    },
    {
      label: "Materias con Dificultades",
      name: "matedificulta",
      type: "checkbox",
      comment:
        "¿Qué materias se te dificultan más? ✍️  y pulsa 'Siguiente'",
      options: [
        { label: "Matemáticas", value: "matematicas" },
        { label: "Lengua y Literatura", value: "lengua_literatura" },
        { label: "Ciencias Sociales", value: "ciencias_sociales" },
        { label: "Ciencias Naturales", value: "ciencias_naturales" },
        { label: "Inglés", value: "ingles" },
        { label: "Geografía", value: "geografia" },
        { label: "Historia", value: "historia" },
        { label: "Educación Física", value: "educacion_fisica" },
        { label: "Arte", value: "arte" },
        { label: "Química", value: "quimica" },
        { label: "Física", value: "fisica" },
        { label: "Ninguno de los anteriores", value: "NA" },
      ],
    },
    {
      label: "Nivel de Inglés",
      name: "nivelingles",
      type: "select",
      comment:
        "¿Cuál es tu nivel actual de inglés? (escribe NA si no aplica) 🌐 y pulsa 'Siguiente'",
      options: [
        { label: "Básico", value: "Básico" },
        { label: "Intermedio", value: "Intermedio" },
        { label: "Avanzado", value: "Avanzado" },
        { label: "Nativo", value: "Nativo" },
        { label: "NA", value: "NA" },
      ],
    },
  
    // Situación laboral
    {
      label: "Situación Laboral",
      name: "situacion",
      type: "select",
      comment:
        "Describe tu situación laboral actual (escribe NA si no aplica) 💼 y pulsa 'Siguiente'",
      options: [
        { label: "Empleado", value: "Empleado" },
        { label: "Independiente", value: "Independiente" },
        { label: "Desempleado", value: "Desempleado" },
        { label: "Estudiante", value: "Estudiante" },
        { label: "Otro", value: "Otro" },
        { label: "NA", value: "NA" },
      ],
    },
    {
      label: "Ingresos Mensuales",
      name: "ingresos",
      type: "select",
      comment:
        "Escribe tus ingresos promedio mensuales (escribe NA si no aplica) 💰 y pulsa 'Siguiente'",
      options: [
        { label: "Menos de $1,000,000", value: "Menos de $1,000,000" },
        { label: "$1,000,000 - $2,000,000", value: "$1,000,000 - $2,000,000" },
        { label: "$2,000,000 - $3,000,000", value: "$2,000,000 - $3,000,000" },
        { label: "$3,000,000 - $5,000,000", value: "$3,000,000 - $5,000,000" },
        { label: "Más de $5,000,000", value: "Más de $5,000,000" },
        { label: "NA", value: "NA" },
      ],
    },
    {
      label: "Sector de Trabajo",
      name: "sector",
      type: "select",
      comment:
        "¿Trabajas en el sector público, privado o como independiente? (escribe NA si no aplica) y pulsa 'Siguiente'",
      options: [
        { label: "Público", value: "Público" },
        { label: "Privado", value: "Privado" },
        { label: "Independiente", value: "Independiente" },
        { label: "Emprendedor", value: "Emprendedor" },
        { label: "NA", value: "NA" },
      ],
    },
    {
      label: "Jornada Laboral",
      name: "jornada",
      type: "select",
      comment:
        "Indica tu tipo de jornada (tiempo completo, medio tiempo o nocturno) (escribe NA si no aplica) ⏰ y pulsa 'Siguiente'",
      options: [
        { label: "Tiempo completo", value: "Tiempo completo" },
        { label: "Medio tiempo", value: "Medio tiempo" },
        { label: "Nocturna", value: "Nocturna" },
        { label: "Freelance", value: "Freelance" },
        { label: "NA", value: "NA" },
      ],
    },
    {
      label: "Posibilidad de Ascenso",
      name: "ascenso",
      type: "select",
      comment:
        "¿Tienes posibilidad de ascenso en tu trabajo? (escribe NA si no aplica) 📈 y pulsa 'Siguiente'",
      options: [
        { label: "Sí", value: "Sí" },
        { label: "No", value: "No" },
        { label: "No sé", value: "No sé" },
        { label: "NA", value: "NA" },
      ],
    },
  
    // Salud
    {
      label: "Enfermedades Crónicas",
      name: "enfermecronica",
      type: "select",
      comment:
        "Especifica si tienes alguna enfermedad crónica (escribe NA si no aplica) 🩺 y pulsa 'Siguiente'",
        options: [
          { label: "Mal de Alzheimer y demencia", value: "alzheimer_demenecia" },
          { label: "Artritis", value: "artritis" },
          { label: "Asma", value: "asma" },
          { label: "Cáncer", value: "cancer" },
          { label: "EPOC", value: "epoc" },
          { label: "Enfermedad de Crohn", value: "crohn" },
          { label: "Fibrosis quística", value: "fibrosis_quistica" },
          { label: "Diabetes", value: "diabetes" },
          { label: "Endometriosis", value: "endometriosis" },
          { label: "Epilepsia", value: "epilepsia" },
          { label: "Fibromialgia", value: "fibromialgia" },
          { label: "Enfermedad del corazón", value: "enfermedad_corazon" },
          { label: "Presión arterial alta (hipertensión)", value: "hipertension" },
          { label: "VIH/sida", value: "vih_sida" },
          { label: "Migraña", value: "migrana" },
          { label: "Trastornos del humor (bipolar, ciclotímico y depresión)", value: "trastornos_humor" },
          { label: "Esclerosis múltiple", value: "esclerosis_multiple" },
          { label: "Narcolepsia", value: "narcolepsia" },
          { label: "Mal de Parkinson", value: "parkinson" },
          { label: "Otro", value: "Otro" },
          { label: "NA", value: "na" },
        ]
        
    },
    {
      label: "Condiciones de Discapacidad",
      name: "discapacidad",
      type: "select",
      comment:
        "Indica si tienes alguna discapacidad (escribe NA si no aplica) 👨‍🦽 y pulsa 'Siguiente'",
      options: [
        { label: "Visual", value: "Visual" },
        { label: "Auditiva", value: "Auditiva" },
        { label: "Motora", value: "Motora" },
        { label: "Cognitiva", value: "Cognitiva" },
        { label: "Psíquica", value: "Psíquica" },
        { label: "No tengo discapacidad", value: "No tengo discapacidad" },
      ],
    },
    {
      label: "Consumo de Sustancias Psicoactivas",
      name: "suspsicoactivas",
      type: "select",
      comment: "¿Consumes sustancias psicoactivas? 🚭 y pulsa 'Siguiente'",
      options: [
        { label: "Sí, regularmente", value: "Sí, regularmente" },
        { label: "Sí, ocasionalmente", value: "Sí, ocasionalmente" },
        { label: "No", value: "No" },
      ],
    },
    {
      label: "Consumo de Alcohol",
      name: "alcohol",
      type: "select",
      comment: "¿Consumes alcohol regularmente? 🍷 y pulsa 'Siguiente'",
      options: [
        { label: "Sí, regularmente", value: "Sí, regularmente" },
        { label: "Sí, ocasionalmente", value: "Sí, ocasionalmente" },
        { label: "No", value: "No" },
      ],
    },
    {
      label: "Acceso a Internet",
      name: "Internet",
      type: "select",
      comment: "¿Cuantas horas usas el internet a diario? 🌐 y pulsa 'Siguiente'",
      options: [
        { label: "Menos de 1 hora", value: "Menos de 1 hora" },
        { label: "1-3 horas", value: "1-3 horas" },
        { label: "4-6 horas", value: "4-6 horas" },
        { label: "Más de 6 horas", value: "Más de 6 horas" },
        { label: "No tengo acceso", value: "No tengo acceso" },
      ],
    },
    {
      label: "Consumo de Nicotina",
      name: "nicotina",
      type: "select",
      comment: "¿Fumas o consumes productos con nicotina? 🚬 y pulsa 'Siguiente'",
      options: [
        { label: "Sí, regularmente", value: "Sí, regularmente" },
        { label: "Sí, ocasionalmente", value: "Sí, ocasionalmente" },
        { label: "No", value: "No" },
      ],
    },
    {
      label: "EPS Afiliada",
      name: "eps",
      type: "select",
      comment: "Indica a qué EPS estás afiliado 🏥 y pulsa 'Siguiente'",
      options: [
        { label: "Nueva EPS", value: "nueva_eps" },
  { label: "Sura EPS", value: "sura_eps" },
  { label: "Sanitas EPS", value: "sanitas_eps" },
  { label: "Compensar EPS", value: "compensar_eps" },
  { label: "Coomeva EPS", value: "coomeva_eps" },
  { label: "Famisanar EPS", value: "famisanar_eps" },
  { label: "Colsubsidio EPS", value: "colsubsidio_eps" },
  { label: "Salud Total EPS", value: "salud_total_eps" },
  { label: "Confenalco EPS", value: "confenalco_eps" },
  { label: "Capital Salud EPS", value: "capital_salud_eps" },
  { label: "Otro", value: "Otro" },
  { label: "NA", value: "na" },
      ],
    },
    {
      label: "Atención Psicológica",
      name: "asispsicologo",
      type: "select",
      comment:
        "¿Has recibido atención psicológica en el último año? 🧠 y pulsa 'Siguiente'",
      options: [
        { label: "Sí", value: "Si" },
        { label: "No", value: "No" },
      ],
    },
    // Credenciales
    {
      label: "Nombre de Usuario",
      name: "usuario",
      type: "text",
      comment:
        "Crea un nombre de usuario 🧐 (Recuerda que lo necesitarás para iniciar sesión ❗) y pulsa 'Siguiente'",
    },
    {
      label: "Contraseña",
      name: "contrasena",
      type: "password",
      comment:
        "Establece tu contraseña 🙈 (Recuerda que lo necesitarás para iniciar sesión ❗) y pulsa 'Siguiente'",
    },
  ];

  // const steps = [
  //   {
  //     label: "⚠ Al pulzar SIGUIENTE autorizas el tratamiento de tus datos personales para uso educativo y de investigación. Si no estás de acuerdo no siga adelante. ⚠",
  //     comment: "⚠ Leee Esto detalladamente antes de continuar. ⚠",
  //   },
  
  //   // Datos generales del usuario (informacionUsuario)
  //   {
  //     label: "Nombres",
  //     name: "nombre",
  //     type: "text",
  //     comment: "Escribe tus nombres y pulsa 'Siguiente'.",
  //   },
  //   {
  //     label: "Apellidos",
  //     name: "apellido",
  //     type: "text",
  //     comment: "Escribe tus apellidos y pulsa 'Siguiente'.",
  //   },
  //   {
  //     label: "Correo Electrónico",
  //     name: "correo",
  //     type: "email",
  //     comment: "Ingresa tu dirección de correo electrónico y pulsa 'Siguiente'.",
  //   },
  //   {
  //     label: "Número de Teléfono",
  //     name: "telefonoPersonal",
  //     type: "tel",
  //     comment: "Escribe tu número de teléfono y pulsa 'Siguiente'.",
  //   },
  //   {
  //     label: "Tipo de Documento",
  //     name: "tipoDocumento",
  //     type: "select",
  //     comment: "Selecciona tu tipo de documento y pulsa 'Siguiente'.",
  //     options: [
  //       { label: "Cédula de Ciudadanía", value: "cedula_ciudadania" },
  //       { label: "Tarjeta de Identidad", value: "tarjeta_identidad" },
  //       { label: "Cédula de Extranjería", value: "cedula_extranjeria" },
  //       { label: "Pasaporte", value: "pasaporte" },
  //       { label: "Otro", value: "otro" },
  //     ],
  //   },
  //   {
  //     label: "Número de Documento",
  //     name: "documento",
  //     type: "number",
  //     comment: "Escribe tu número de documento y pulsa 'Siguiente'.",
  //   },
  
  //   // Datos sociodemográficos (informacionPersonal)
  //   {
  //     label: "Edad",
  //     name: "edad",
  //     type: "number",
  //     comment: "Indica tu edad actual y pulsa 'Siguiente'.",
  //   },
  //   {
  //     label: "Sexo",
  //     name: "sexo",
  //     type: "select",
  //     comment: "Selecciona tu sexo y pulsa 'Siguiente'.",
  //     options: [
  //       { label: "Masculino", value: "Masculino" },
  //       { label: "Femenino", value: "Femenino" },
  //       { label: "Otro", value: "Otro" },
  //       { label: "Prefiero no decirlo", value: "Prefiero no decirlo" },
  //     ],
  //   },
  //   {
  //     label: "Estado Civil",
  //     name: "estadocivil",
  //     type: "select",
  //     comment: "Indica tu estado civil y pulsa 'Siguiente'.",
  //     options: [
  //       { label: "Soltero/a", value: "Soltero" },
  //       { label: "Casado/a", value: "Casado" },
  //       { label: "En pareja", value: "En pareja" },
  //       { label: "Otro", value: "Otro" },
  //     ],
  //   },
  //   {
  //     label: "Número de Hijos",
  //     name: "hijosnum",
  //     type: "number",
  //     comment: "Indica cuántos hijos tienes y pulsa 'Siguiente'.",
  //   },
  
  //   // Información académica (educacion)
  //   {
  //     label: "Carrera Universitaria",
  //     name: "carrera",
  //     type: "select",
  //     comment:
  //       "Si estudias o estudiaste una carrera, indícala aquí y pulsa 'Siguiente'.",
  //       options: [
  //       { label: "Ingeniería de Sistemas", value: "IngenieriaDeSistemas" },
  //       { label: "Ingeniería Industrial", value: "IngenieriaIndustrial" },
  //       { label: "Ingeniería de Software", value: "IngenieriaDeSoftware" },
  //       { label: "Administración de Empresas", value: "AdministracionDeEmpresas" },
  //       { label: "Derecho", value: "Derecho" },
  //       { label: "Medicina", value: "Medicina" },
  //       { label: "Contaduría Pública", value: "ContaduriaPublica" },
  //       { label: "Psicología", value: "Psicologia" },
  //       { label: "Arquitectura", value: "Arquitectura" },
  //       { label: "Comunicación Social", value: "ComunicacionSocial" },
  //       { label: "Diseño Gráfico", value: "DisenoGrafico" },
  //       { label: "Educación", value: "Educacion" },
  //       { label: "NA", value: "NA" },
  //     ],
  //   },
  //   {
  //     label: "Semestre Actual",
  //     name: "periodo",
  //     type: "select",
  //     comment:
  //       "Selecciona el estado de tu carrera (por ejemplo, en curso, finalizada) y pulsa 'Siguiente'.",
  //     options: [
  //       { label: "1er semestre", value: "1erSemestre" },
  //       { label: "2do semestre", value: "2doSemestre" },
  //       { label: "3er semestre", value: "3erSemestre" },
  //       { label: "4to semestre", value: "4toSemestre" },
  //       { label: "5to semestre", value: "5toSemestre" },
  //       { label: "6to semestre", value: "6toSemestre" },
  //       { label: "7mo semestre", value: "7moSemestre" },
  //       { label: "8vo semestre", value: "8voSemestre" },
  //       { label: "9no semestre", value: "9noSemestre" },
  //       { label: "10mo semestre", value: "10moSemestre" },
  //       { label: "Finalizada", value: "Finalizada" },
  //       { label: "Suspendida", value: "Suspendida" },
  //       { label: "NA", value: "NA" },
  //     ],
  //   },
  //   {
  //     label: "Relación con Compañeros",
  //     name: "relacionamiento",
  //     type: "select",
  //     comment:
  //       "Califica la relación con tus compañeros de clase y pulsa 'Siguiente'.",
  //     options: [
  //       { label: "Buena", value: "Buena" },
  //       { label: "No muy buena", value: "No muy buena" },
  //       { label: "Regular", value: "Regular" },
  //     ],
  //   },
  //   {
  //     label: "Jornada de Estudio",
  //     name: "jornada",
  //     type: "select",
  //     comment: "Indica si estudias en jornada diurna o nocturna y pulsa 'Siguiente'.",
  //     options: [
  //       { label: "Diurna", value: "Diurna" },
  //       { label: "Nocturna", value: "Nocturna" },
  //     ],
  //   },
  //   {
  //     label: "Beca o Apoyo Financiero",
  //     name: "apoyos",
  //     type: "select",
  //     comment:
  //       "¿Cuentas con beca o apoyo financiero para estudiar? Selecciona una opción y pulsa 'Siguiente'.",
  //     options: [
  //       { label: "Sí", value: "Sí" },
  //       { label: "No", value: "No" },
  //     ],
  //   },
  
  //   // Situación económica/laboral (situacionlaboral)
  //   {
  //     label: "Situación Laboral",
  //     name: "situacion",
  //     type: "select",
  //     comment:
  //       "Describe tu situación laboral actual (por ejemplo, tiempo completo, medio tiempo o no trabajo) y pulsa 'Siguiente'.",
  //     options: [
  //       { label: "Tiempo completo", value: "Tiempo completo" },
  //       { label: "Medio tiempo", value: "Medio tiempo" },
  //       { label: "No trabajo", value: "No trabajo" },
  //     ],
  //   },
  //   {
  //     label: "Ingresos Mensuales",
  //     name: "ingresos",
  //     type: "select",
  //     comment:
  //       "Tus ingresos mensuales son suficientes para cubrir tus necesidades basicas? selecciona y pulsa 'Siguiente'.",
  //     options: [
  //       { label: "Si", value: "Si" },
  //       { label: "En ocasiones no", value: "En ocasiones no" },
  //       { label: "No, depende de apoyo externo", value: "No, depende de apoyo externo" },
  //     ],
  //   },
  //   {
  //     label: "Jornada Laboral",
  //     name: "jornadaLaboral",
  //     type: "select",
  //     comment:
  //       "Indica tu tipo de jornada laboral (por ejemplo, tiempo completo, medio tiempo, nocturna) y pulsa 'Siguiente'.",
  //     options: [
  //       { label: "Tiempo completo", value: "Tiempo completo" },
  //       { label: "Medio tiempo", value: "Medio tiempo" },
  //       { label: "Nocturna", value: "Nocturna" },
  //       { label: "Freelance", value: "Freelance" },
  //       { label: "NA", value: "NA" },
  //     ],
  //   },
  //   {
  //     label: "Con quién Vives",
  //     name: "pesonashogar",
  //     type: "select",
  //     comment:
  //       "Indica con quién vives actualmente y pulsa 'Siguiente'.",
  //     options: [
  //       { label: "Solo/a", value: "Solo/@" },
  //       { label: "Con familia", value: "Con familia" },
  //       { label: "Con amigos", value: "Con amigos" },
  //       { label: "Con pareja", value: "Con pareja" },
  //       { label: "Otro", value: "Otro" },
  //     ]
  //   },
  
  //   // Salud y bienestar (salud)
  //   {
  //     label: "Acceso a Servicios de Salud",
  //     name: "accesosalud",
  //     type: "select",
  //     comment:
  //       "¿Tienes acceso a servicios de salud? Selecciona una opción y pulsa 'Siguiente'.",
  //     options: [
  //       { label: "Sí", value: "Sí" },
  //       { label: "No", value: "No" },
  //     ],
  //   },
  //   {
  //     label: "Diagnóstico de Salud Mental",
  //     name: "diagnostico",
  //     type: "select",
  //     comment:
  //       "Si has sido diagnosticado con alguna condición, pulsa 'Siguiente'.",
  //     options: [
  //       { label: "Sí, ansiedad", value: "Sí, ansiedad" },
  //       { label: "Sí, depresion", value: "Sí, depresion" },
  //       { label: "Sí, otro", value: "Otro" },
  //       { label: "No", value: "No" },
  //     ]  
  //   },
  //   {
  //     label: "Atención Psicológica Recibida",
  //     name: "asispsicologo",
  //     type: "select",
  //     comment:
  //       "¿Has recibido atención psicológica o psiquiátrica en el último año? Selecciona una opción y pulsa 'Siguiente'.",
  //     options: [
  //       { label: "Sí", value: "Sí" },
  //       { label: "No", value: "No" },
  //     ],
  //   },
  //   {
  //     label: "Nivel de Estrés (1-10)",
  //     name: "nivelestres",
  //     type: "select",
  //     comment:
  //       "Califica tu nivel actual de estrés en una escala del 1 al 10 y pulsa 'Siguiente'.",
  //     options: [
  //       { label: "1", value: "1" },
  //       { label: "2", value: "2" },
  //       { label: "3", value: "3" },
  //       { label: "4", value: "4" },
  //       { label: "5", value: "5" },
  //       { label: "6", value: "6" },
  //       { label: "7", value: "7" },
  //       { label: "8", value: "8" },
  //       { label: "9", value: "9" },
  //       { label: "10", value: "10" },
  //     ]
  //   },
  //   {
  //     label: "Pensamientos Suicidas",
  //     name: "pensamientosuicidas",
  //     type: "select",
  //     comment:
  //       "En el último año, ¿has tenido pensamientos sobre hacerte daño o quitarte la vida? Selecciona una opción y pulsa 'Siguiente'.",
  //     options: [
  //       { label: "Sí, frecuentemente", value: "Sí, frecuentemente" },
  //       { label: "Sí, algunas veces", value: "Sí, algunas veces" },
  //       { label: "No", value: "No" },
  //     ],
  //   },
  
  //   // Credenciales
  //   {
  //     label: "Nombre de Usuario",
  //     name: "usuario",
  //     type: "text",
  //     comment:
  //       "Crea un nombre de usuario (lo necesitarás para iniciar sesión) y pulsa 'Siguiente'.",
  //   },
  //   {
  //     label: "Contraseña",
  //     name: "contrasena",
  //     type: "password",
  //     comment:
  //       "Establece una contraseña segura (la necesitarás para iniciar sesión) y pulsa 'Siguiente'.",
  //   },
  //   {
  //     label: "Formulario terminado",
  //     comment: "Pulsa 'Registrar' para guardar tus datos.",
  //   },
  // ];

  export default steps;
  