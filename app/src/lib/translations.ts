export type Language = 'en' | 'es';

export type DotPath<T> = {
  [K in keyof T & string]: T[K] extends string
    ? `${K}`
    : T[K] extends Record<string, unknown>
      ? `${K}.${DotPath<T[K]>}`
      : never
}[keyof T & string];

export const translations = {
  en: {
    nav: {
      home: 'Home',
      services: 'Beyond the Clarity Sprint',
      sprint: 'Clarity Sprint',
      contact: 'Contact',
      toggle_es: 'ES',
      toggle_en: 'EN',
      schedule: 'Schedule a Call',
    },
    hero: {
      headline: 'AI is an amplifier.',
      subheadline: 'Understand before you amplify.',
      supporting:
        'The best outcomes emerge when people, context, and technology work together. We help organizations identify the value AI can create, uncover what should improve before automation, and build a clear path forward.',
      tagline: 'Work With AI. Not Around It.',
      cta_primary: 'Learn About the Clarity Sprint',
    },
    sprint: {
      headline: 'The Nebula Clarity Sprint',
      sub: 'Understand before you decide.',
      desc:
        'The Nebula Clarity Sprint helps organizations understand their current reality, identify friction, and uncover practical opportunities for AI, automation, and operational improvement before investing in a solution.',
      eval_label: 'What We Seek to Understand',
      eval: {
        '1': { title: 'Context & Objectives', desc: 'What the organization is trying to achieve and what matters most.' },
        '2': { title: 'Ways of Working', desc: 'How work actually flows across teams, processes, and systems.' },
        '3': { title: 'Technology & Constraints', desc: 'What capabilities exist today and what may be limiting progress.' },
        '4': { title: 'AI & Automation Opportunities', desc: 'Where AI can create meaningful value and support better decision-making.' },
      },
      deliverable_label: 'What You\'ll Gain',
      deliverable: {
        '1': 'A Clear View of the Current Situation',
        '2': 'Key Risks and Points of Friction',
        '3': 'Prioritized Opportunities',
        '4': 'Practical Recommendations for Next Steps',
        '5': 'Guidance on AI & Automation',
        '6': 'An Initial Action Plan',
      },
      deliverable_footer: 'Clarity to decide what comes next.',
      cta: 'Let\'s Talk',
    },
    services: {
      headline: 'Beyond the Clarity Sprint',
      items: {
        '1': { title: 'AI & Automation Strategy', desc: 'Clarity on where AI can create meaningful value.' },
        '2': { title: 'Architecture & Technical Assessment', desc: 'A better understanding of the constraints, risks, and opportunities within your systems.' },
        '3': { title: 'Product & Process Alignment', desc: 'Business goals, teams, and technology moving in the same direction.' },
        '4': { title: 'Engineering Leadership & Advisory', desc: 'Greater confidence in technical and organizational decision-making.' },
      },
    },
    approach: {
      sub: 'Clarity is not the destination. It\u2019s the beginning.',
      body: 'The Clarity Sprint creates a shared understanding of your current reality, opportunities, and constraints. What comes next depends on what we discover together.',
    },
    footer: {
      copyright: 'Nebula Ideas. Engineering Excellence.',
      linkedin: 'LinkedIn',
      github: 'GitHub',
    },
    seo: {
      title: 'Nebula Ideas — AI is an amplifier.',
      description:
        'Nebula Ideas helps organizations identify the value AI can create, uncover what should improve before automation, and build a clear path forward.',
      og_description:
        'A focused Clarity Sprint to help organizations understand their current reality, identify friction, and uncover practical opportunities for AI, automation, and operational improvement.',
      site_name: 'Nebula Ideas',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      services: 'M\u00e1s all\u00e1 del Clarity Sprint',
      sprint: 'Nebula Clarity Sprint',
      contact: 'Contacto',
      toggle_es: 'ES',
      toggle_en: 'EN',
      schedule: 'Hablemos',
    },
    hero: {
      headline: 'La IA es un multiplicador.',
      subheadline: 'Primero entiende. Despu\u00e9s multiplica.',
      supporting:
        'Los mejores resultados surgen cuando las personas, el contexto y la tecnolog\u00eda colaboran. Ayudamos a identificar el valor que la IA puede aportar, a descubrir qu\u00e9 se debe mejorar antes de automatizar y a construir un camino claro hacia adelante.',
      tagline: 'Trabaja con la IA. No a su alrededor.',
      cta_primary: 'Conoce el Clarity Sprint',
    },
    sprint: {
      headline: 'Nebula Clarity Sprint',
      sub: 'Entiende antes de decidir.',
      desc:
        'El Nebula Clarity Sprint ayuda a entender la situaci\u00f3n actual de una organizaci\u00f3n, identificar fricciones y descubrir oportunidades reales para la IA, la automatizaci\u00f3n y la mejora operativa antes de invertir en una soluci\u00f3n.',
      eval_label: 'Qu\u00e9 Buscamos Entender',
      eval: {
        '1': { title: 'Contexto y Objetivos', desc: 'Qu\u00e9 intenta lograr la organizaci\u00f3n y cu\u00e1les son sus prioridades.' },
        '2': { title: 'Forma de Trabajo', desc: 'C\u00f3mo fluye realmente el trabajo entre equipos, procesos y sistemas.' },
        '3': { title: 'Tecnolog\u00eda y Restricciones', desc: 'Qu\u00e9 capacidades existen hoy y qu\u00e9 limita el avance.' },
        '4': { title: 'Oportunidades para IA y Automatizaci\u00f3n', desc: 'D\u00f3nde la IA puede aportar valor real y apoyar mejores decisiones.' },
      },
      deliverable_label: 'Qu\u00e9 Obtendr\u00e1s',
      deliverable: {
        '1': 'Una visi\u00f3n clara de la situaci\u00f3n actual',
        '2': 'Los principales riesgos y puntos de fricci\u00f3n',
        '3': 'Oportunidades identificadas y priorizadas',
        '4': 'Recomendaciones pr\u00e1cticas para los siguientes pasos',
        '5': 'Un plan de acci\u00f3n inicial',
        '6': 'Orientaci\u00f3n sobre IA y automatizaci\u00f3n',
      },
      deliverable_footer: 'Claridad para decidir qu\u00e9 sigue.',
      cta: 'Hablemos',
    },
    services: {
      headline: 'M\u00e1s all\u00e1 del Clarity Sprint',
      items: {
        '1': { title: 'Estrategia de IA y Automatizaci\u00f3n', desc: 'Claridad para identificar d\u00f3nde la IA puede aportar valor real.' },
        '2': { title: 'Evaluaci\u00f3n T\u00e9cnica y de Arquitectura', desc: 'Una mejor comprensi\u00f3n de las restricciones, riesgos y oportunidades de tus sistemas.' },
        '3': { title: 'Alineaci\u00f3n de Producto y Procesos', desc: 'Objetivos, equipos y tecnolog\u00eda avanzando en la misma direcci\u00f3n.' },
        '4': { title: 'Liderazgo y Asesor\u00eda en Ingenier\u00eda', desc: 'Mayor confianza para tomar decisiones t\u00e9cnicas y organizacionales.' },
      },
    },
    approach: {
      sub: 'La claridad es solo el comienzo.',
      body: 'El Clarity Sprint nos ayuda a entender d\u00f3nde est\u00e1s hoy. Lo que sigue depende de lo que descubramos juntos.',
    },
    footer: {
      copyright: 'Nebula Ideas. Excelencia en Ingenier\u00eda.',
      linkedin: 'LinkedIn',
      github: 'GitHub',
    },
    seo: {
      title: 'Nebula Ideas — La IA es un multiplicador.',
      description:
        'Nebula Ideas ayuda a las organizaciones a identificar el valor que la IA puede aportar, descubrir qué se debe mejorar antes de automatizar y construir un camino claro hacia adelante.',
      og_description:
        'Un Clarity Sprint enfocado en ayudar a las organizaciones a entender su situación actual, identificar fricciones y descubrir oportunidades prácticas para IA, automatización y mejora operativa.',
      site_name: 'Nebula Ideas',
    },
  },
} as const;

export type TranslationKey = DotPath<(typeof translations)['en']>;
