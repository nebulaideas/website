export type Language = 'en' | 'es';

export const translations = {
  en: {
    // Navigation
    nav_home: 'Home',
    nav_services: 'Beyond the Clarity Sprint',
    nav_sprint: 'Clarity Sprint',
    nav_blog: 'Blog',
    nav_contact: 'Contact',
    nav_toggle_es: 'ES',
    nav_toggle_en: 'EN',
    nav_schedule: 'Schedule a Call',

    // Hero
    hero_headline: 'AI is an amplifier.',
    hero_subheadline: 'Understand before you amplify.',
    hero_supporting:
      'The best outcomes emerge when human judgment, organizational context, and technology work together. We help organizations identify where AI creates meaningful value, understand what should be improved before automation, and build practical paths to adoption.',
    hero_tagline: 'Work With AI. Not Around It.',
    hero_cta_primary: 'Explore the Clarity Sprint',
    hero_cta_secondary: 'Contact Us',

    // Why Organizations Struggle With AI
    struggle_headline: 'Why Organizations Struggle With AI',
    struggle_lede1: 'Most organizations do not have an AI problem.',
    struggle_lede2: 'They have a clarity problem.',
    struggle_body:
      'Teams are moving fast, tools keep multiplying, priorities compete for attention, and pressure to \u201cadopt AI\u201d grows every day.',
    struggle_results_label: 'The result is often predictable:',
    struggle_result1: 'Automation applied to inefficient processes',
    struggle_result2: 'AI initiatives without measurable outcomes',
    struggle_result3: 'Teams working toward different goals',
    struggle_result4: 'Growing technical and operational complexity',
    struggle_result5: 'Increasing costs without proportional value',
    struggle_amplify: 'Technology amplifies systems.',
    struggle_amplify_result: 'If the system lacks clarity, technology amplifies confusion.',

    // Nebula Clarity Sprint
    sprint_headline: 'The Nebula Clarity Sprint',
    sprint_sub: 'Clarity before commitment.',
    sprint_desc:
      'The Nebula Clarity Sprint helps organizations identify friction, evaluate technology constraints, and uncover practical opportunities for AI, automation, and operational improvement before investing in implementation.',
    sprint_eval_label: 'What we evaluate',
    sprint_eval1_title: 'Business Context',
    sprint_eval1_desc: 'Objectives, priorities, stakeholders, constraints, and desired outcomes.',
    sprint_eval2_title: 'Operational Reality',
    sprint_eval2_desc: 'How work flows across teams, processes, and systems.',
    sprint_eval3_title: 'Technology Landscape',
    sprint_eval3_desc: 'Architecture, integrations, dependencies, technical constraints, and scalability considerations.',
    sprint_eval4_title: 'AI & Automation Potential',
    sprint_eval4_desc:
      'Where AI and automation can create meaningful value, reduce friction, and support decision-making.',
    sprint_deliverable_label: 'What you receive',
    sprint_deliverable1: 'Current-state assessment',
    sprint_deliverable2: 'Key risks and bottlenecks',
    sprint_deliverable3: 'Opportunity map',
    sprint_deliverable4: 'Prioritized recommendations',
    sprint_deliverable5: 'AI & automation guidance',
    sprint_deliverable6: 'Implementation roadmap',
    sprint_deliverable_footer: 'A clear path forward based on your reality\u2014not industry hype.',
    sprint_cta: 'Schedule a Discovery Call',

    // What We Help With
    services_label: 'SERVICES',
    services_headline: 'Beyond the Clarity Sprint',
    service1_title: 'AI & Automation Strategy',
    service1_desc: 'Identify where AI can create meaningful value, support decision-making, and improve the way people work before investing in implementation.',
    service2_title: 'Architecture & Technical Assessment',
    service2_desc:
      'Evaluate technical constraints, architectural risks, scalability concerns, and modernization opportunities.',
    service3_title: 'Product & Process Alignment',
    service3_desc: 'Connect business goals, team execution, and technology decisions to improve focus, alignment, and delivery.',
    service4_title: 'Engineering Leadership & Advisory',
    service4_desc: 'Support organizational growth, technical decision-making, team effectiveness, and operational maturity.',

    // Our Approach
    approach_sub: 'Clarity is usually where the work begins.',
    approach_body1: 'The Nebula Clarity Sprint helps create a shared understanding of your current reality, opportunities, and constraints.',
    approach_body2: 'What happens next depends on what we discover together.',
    approach_body3: 'Some organizations need guidance on AI adoption. Others need help navigating technical complexity, aligning teams, improving delivery, or making strategic technology decisions.',
    approach_body4: 'These are some of the areas where we frequently help.',

    // Principles That Guide Us
    principles_label: 'PRINCIPLES',
    principles_headline: 'Principles That Guide Us',
    principle1_title: 'Understand Before Amplifying',
    principle1_desc: 'Technology amplifies existing systems. Improve understanding first.',
    principle2_title: 'Outcomes Over Activity',
    principle2_desc: 'Measure impact, not motion.',
    principle3_title: 'Human-Centered Automation',
    principle3_desc: 'Keep people where judgment creates value.',
    principle4_title: 'Continuous Evolution',
    principle4_desc: 'Prefer practical progress over large-scale disruption.',

    // About Nebula
    about_label: 'ABOUT',
    about_headline: 'About Nebula',
    about_intro:
      'Nebula Ideas was founded by experienced technology leaders who have spent decades building products, scaling systems, leading teams, and navigating organizational complexity.',
    about_detail:
      'We have worked across startups, enterprise organizations, product companies, consulting environments, and engineering leadership roles.',
    about_perspectives_label: 'Our perspective combines:',
    about_perspective1: 'Software Engineering',
    about_perspective2: 'Product Thinking',
    about_perspective3: 'Organizational Design',
    about_perspective4: 'AI & Automation',
    about_perspective5: 'Technical Leadership',
    about_insight:
      'Most importantly, we understand that technology only creates value when people can successfully adopt and use it.',
    founder1_name: 'Ismael Marin',
    founder1_role: 'Head of AI Infrastructure & Co-Founder',
    founder1_bio:
      'As a technical leader and AI infrastructure engineer, I specialize in bringing software engineering discipline\u2014TDD, Domain-Driven Design, and rigorous evaluation\u2014to the bleeding edge of Agentic AI.\n\nI build high-performance, cross-platform CLI tools and safe Rust agent runtimes that transform unpredictable LLMs into secure, production-grade engineering workflows.\n\nMy approach is grounded in decades of battle-tested backend architecture and a strict focus on pragmatic integration, ensuring that AI operates not as a hype-driven shortcut, but as a reliable multiplier that delivers measurable, strategic value to core business systems.',
    founder2_name: 'Carlos (Mumo) Muniz',
    founder2_role: 'Managing Partner / Head of Engineering & Delivery',
    founder2_bio:
      'As a technical leader and team architect, I specialize in eliminating architectural bottlenecks and designing high-impact, resilient systems.\n\nI have built integration architectures that collapsed enterprise onboarding timelines from months to days, migrated complex platform authentication with zero downstream code changes, and pioneered disciplined, team-level AI workflows that drastically accelerate time-to-market.\n\nMy engineering approach and leadership philosophy are inseparable: I build on a foundation of psychological safety and a "Care to Deliver" principle, proving that high-trust human conditions and exceptional technical outcomes are the exact same thing.',
    partnership_title: 'Partnership',
    partnership_desc:
      "We've worked together since 2014. We've delivered critical integrations for companies in Mexico and the USA. We met as engineer and manager; today we're partners.",

    // Social Proof
    stat_radio: 'Regular contributors on Radio Formula Baj\u00edo',
    stat_downloads_label: 'downloads across our open source tools',
    stat_downloads_number: '2,000+',
    stat_years_number: '10',
    stat_years_label: 'years building together',
    stat_geo: 'We work with companies in Mexico and the USA',

    // Blog
    blog_label: 'INSIGHTS',
    blog_headline: 'What we think',
    blog_cta: 'View all articles',
    blog1_category: 'AI & Code Quality',
    blog1_title: 'How we measure the quality of AI-generated code',
    blog1_excerpt:
      'A deep dive into our Ruby Skill Bench methodology and why automated validation matters for production code.',
    blog2_category: 'AI & Teams',
    blog2_title: 'AI as a team companion: lessons from Radio Formula Baj\u00edo',
    blog2_excerpt:
      "What we've learned about integrating AI tools alongside human teams without replacing the people that matter.",
    blog3_category: 'Process',
    blog3_title: 'From idea to MVP: our 4-week process',
    blog3_excerpt:
      'How we use Design Sprints and validated development to take a concept to a working product in one month.',

    // Contact / Footer CTA
    footer_cta_headline: 'Ready to understand what technology is amplifying in your organization?',
    footer_cta_desc:
      'Before your next AI initiative, automation project, or architectural investment, start with clarity.',
    footer_cta_body: "Let's identify where the real opportunities are.",
    footer_cta_button: 'Schedule a Discovery Call',

    // Footer
    footer_copyright: 'Nebula Ideas. Engineering Excellence.',
    footer_privacy: 'Privacy Policy',
    footer_linkedin: 'LinkedIn',
    footer_github: 'GitHub',

    // SEO
    seo_title: 'Nebula Clarity Sprint \u2014 AI & Technology Strategy',
    seo_description:
      'Understand where technology creates friction, align teams around outcomes, and identify practical AI and automation opportunities before you build.',
    seo_og_description:
      'A focused assessment to uncover friction, align teams, and turn AI, automation, and technology decisions into measurable outcomes.',
    seo_site_name: 'Nebula Ideas',
  },
  es: {
    // Navigation
    nav_home: 'Inicio',
    nav_services: 'M\u00e1s All\u00e1 del Clarity Sprint',
    nav_sprint: 'Sprint de Claridad',
    nav_blog: 'Blog',
    nav_contact: 'Contacto',
    nav_toggle_es: 'ES',
    nav_toggle_en: 'EN',
    nav_schedule: 'Agendar una Llamada',

    // Hero
    hero_headline: 'La IA es un amplificador.',
    hero_subheadline: 'Entiende antes de amplificar.',
    hero_supporting:
      'Los mejores resultados surgen cuando el juicio humano, el contexto organizacional y la tecnolog\u00eda trabajan juntos. Ayudamos a las organizaciones a identificar donde la IA crea valor significativo, entender qu\u00e9 debe mejorarse antes de automatizar y construir caminos pr\u00e1cticos hacia la adopci\u00f3n.',
    hero_tagline: 'Trabaja con IA. No al rev\u00e9s.',
    hero_cta_primary: 'Explora el Clarity Sprint',
    hero_cta_secondary: 'Cont\u00e1ctanos',

    // Why Organizations Struggle With AI
    struggle_headline: 'Por qu\u00e9 las Organizaciones Luchan con la IA',
    struggle_lede1: 'La mayor\u00eda de las organizaciones no tienen un problema de IA.',
    struggle_lede2: 'Tienen un problema de claridad.',
    struggle_body:
      'Los equipos se mueven r\u00e1pido, las herramientas se multiplican, las prioridades compiten por atenci\u00f3n y la presi\u00f3n de \u201cadoptar IA\u201d crece cada d\u00eda.',
    struggle_results_label: 'El resultado suele ser predecible:',
    struggle_result1: 'Automatizaci\u00f3n aplicada a procesos ineficientes',
    struggle_result2: 'Iniciativas de IA sin resultados medibles',
    struggle_result3: 'Equipos trabajando hacia objetivos diferentes',
    struggle_result4: 'Complejidad t\u00e9cnica y operativa creciente',
    struggle_result5: 'Costos crecientes sin valor proporcional',
    struggle_amplify: 'La tecnolog\u00eda amplifica los sistemas.',
    struggle_amplify_result: 'Si el sistema carece de claridad, la tecnolog\u00eda amplifica la confusi\u00f3n.',

    // Nebula Clarity Sprint
    sprint_headline: 'Nebula Clarity Sprint',
    sprint_sub: 'Claridad antes de comprometerse.',
    sprint_desc:
      'El Nebula Clarity Sprint ayuda a las organizaciones a identificar fricci\u00f3n, evaluar restricciones tecnol\u00f3gicas y descubrir oportunidades pr\u00e1cticas para IA, automatizaci\u00f3n y mejora operativa antes de invertir en implementaci\u00f3n.',
    sprint_eval_label: 'Qu\u00e9 evaluamos',
    sprint_eval1_title: 'Contexto de Negocio',
    sprint_eval1_desc: 'Objetivos, prioridades, stakeholders, restricciones y resultados deseados.',
    sprint_eval2_title: 'Realidad Operativa',
    sprint_eval2_desc: 'C\u00f3mo fluye el trabajo entre equipos, procesos y sistemas.',
    sprint_eval3_title: 'Panorama Tecnol\u00f3gico',
    sprint_eval3_desc:
      'Arquitectura, integraciones, dependencias, restricciones t\u00e9cnicas y consideraciones de escalabilidad.',
    sprint_eval4_title: 'Potencial de IA y Automatizaci\u00f3n',
    sprint_eval4_desc:
      'Donde la IA y la automatizaci\u00f3n pueden crear valor significativo, reducir fricci\u00f3n y apoyar la toma de decisiones.',
    sprint_deliverable_label: 'Qu\u00e9 recibes',
    sprint_deliverable1: 'Evaluaci\u00f3n del estado actual',
    sprint_deliverable2: 'Riesgos clave y cuellos de botella',
    sprint_deliverable3: 'Mapa de oportunidades',
    sprint_deliverable4: 'Recomendaciones priorizadas',
    sprint_deliverable5: 'Gu\u00eda de IA y automatizaci\u00f3n',
    sprint_deliverable6: 'Hoja de ruta de implementaci\u00f3n',
    sprint_deliverable_footer: 'Un camino claro basado en tu realidad, no en el hype de la industria.',
    sprint_cta: 'Agenda una Llamada de Descubrimiento',

    // What We Help With
    services_label: 'SERVICIOS',
    services_headline: 'M\u00e1s All\u00e1 del Clarity Sprint',
    service1_title: 'Estrategia de IA y Automatizaci\u00f3n',
    service1_desc: 'Identifica donde la IA puede crear valor significativo, apoyar la toma de decisiones y mejorar la forma en que las personas trabajan antes de invertir en implementaci\u00f3n.',
    service2_title: 'Evaluaci\u00f3n de Arquitectura y Tecnolog\u00eda',
    service2_desc:
      'Eval\u00faa restricciones t\u00e9cnicas, riesgos arquitect\u00f3nicos, preocupaciones de escalabilidad y oportunidades de modernizaci\u00f3n.',
    service3_title: 'Alineaci\u00f3n de Producto y Procesos',
    service3_desc: 'Conecta objetivos de negocio, ejecuci\u00f3n del equipo y decisiones tecnol\u00f3gicas para mejorar enfoque, alineaci\u00f3n y entrega.',
    service4_title: 'Liderazgo y Asesor\u00eda en Ingenier\u00eda',
    service4_desc: 'Apoya el crecimiento organizacional, la toma de decisiones t\u00e9cnicas, la efectividad del equipo y la madurez operativa.',

    // Our Approach
    approach_sub: 'La claridad es usualmente donde comienza el trabajo.',
    approach_body1: 'El Nebula Clarity Sprint ayuda a crear un entendimiento compartido de tu realidad actual, oportunidades y restricciones.',
    approach_body2: 'Lo que sucede despu\u00e9s depende de lo que descubramos juntos.',
    approach_body3: 'Algunas organizaciones necesitan orientaci\u00f3n sobre adopci\u00f3n de IA. Otras necesitan ayuda navegando complejidad t\u00e9cnica, alineando equipos, mejorando la entrega o tomando decisiones tecnol\u00f3gicas estrat\u00e9gicas.',
    approach_body4: 'Estas son algunas de las \u00e1reas donde frecuentemente ayudamos.',

    // Principles That Guide Us
    principles_label: 'PRINCIPIOS',
    principles_headline: 'Principios que nos Gu\u00edan',
    principle1_title: 'Entender Antes de Amplificar',
    principle1_desc: 'La tecnolog\u00eda amplifica sistemas existentes. Mejora la comprensi\u00f3n primero.',
    principle2_title: 'Resultados sobre Actividad',
    principle2_desc: 'Mide impacto, no movimiento.',
    principle3_title: 'Automatizaci\u00f3n Centrada en Humanos',
    principle3_desc: 'Mant\u00e9n a las personas donde el juicio crea valor.',
    principle4_title: 'Evoluci\u00f3n Continua',
    principle4_desc: 'Prefiere progreso pr\u00e1ctico sobre disrupci\u00f3n a gran escala.',

    // About Nebula
    about_label: 'NOSOTROS',
    about_headline: 'Sobre Nebula',
    about_intro:
      'Nebula Ideas fue fundada por l\u00edderes tecnol\u00f3gicos con experiencia que han pasado d\u00e9cadas construyendo productos, escalando sistemas, liderando equipos y navegando la complejidad organizacional.',
    about_detail:
      'Hemos trabajado en startups, empresas, compa\u00f1\u00edas de producto, entornos de consultor\u00eda y roles de liderazgo en ingenier\u00eda.',
    about_perspectives_label: 'Nuestra perspectiva combina:',
    about_perspective1: 'Ingenier\u00eda de Software',
    about_perspective2: 'Pensamiento de Producto',
    about_perspective3: 'Dise\u00f1o Organizacional',
    about_perspective4: 'IA y Automatizaci\u00f3n',
    about_perspective5: 'Liderazgo T\u00e9cnico',
    about_insight:
      'Lo m\u00e1s importante es que entendemos que la tecnolog\u00eda solo crea valor cuando las personas pueden adoptarla y usarla exitosamente.',
    founder1_name: 'Ismael Marin',
    founder1_role: 'Director de Infraestructura de IA y Co-Fundador',
    founder1_bio:
      'Como l\u00edder t\u00e9cnico e ingeniero de infraestructura de IA, me especializo en llevar la disciplina de la ingenier\u00eda de software \u2014TDD, Dise\u00f1o Guiado por el Dominio (DDD) y evaluaci\u00f3n rigurosa\u2014 a la vanguardia de la IA Ag\u00e9ntica.\n\nConstruyo herramientas CLI multiplataforma de alto rendimiento y entornos de ejecuci\u00f3n de agentes seguros en Rust que transforman LLMs impredecibles en flujos de trabajo de ingenier\u00eda seguros y de nivel de producci\u00f3n.\n\nMi enfoque est\u00e1 arraigado en d\u00e9cadas de arquitectura backend probada en batalla y un enfoque estricto en la integraci\u00f3n pragm\u00e1tica, asegurando que la IA funcione no como un atajo impulsado por el hype, sino como un multiplicador confiable que ofrece un valor estrat\u00e9gico y medible para los sistemas de negocio principales.',
    founder2_name: 'Carlos (Mumo) Muniz',
    founder2_role: 'Socio Director / Director de Ingenier\u00eda y Entrega',
    founder2_bio:
      'Como l\u00edder t\u00e9cnico y arquitecto de equipos, me especializo en eliminar cuellos de botella arquitect\u00f3nicos y dise\u00f1ar sistemas resilientes de alto impacto.\n\nHe construido arquitecturas de integraci\u00f3n que redujeron los tiempos de incorporaci\u00f3n de empresas de meses a d\u00edas, migr\u00e9 autenticaci\u00f3n de plataformas complejas sin cambios en el c\u00f3digo descendente y fui pionero en flujos de trabajo de IA disciplinados a nivel de equipo que aceleran dr\u00e1sticamente el time-to-market.\n\nMi enfoque de ingenier\u00eda y filosof\u00eda de liderazgo son inseparables: construyo sobre una base de seguridad psicol\u00f3gica y el principio de "Cuidado al Entregar" (Care to Deliver), demostrando que las condiciones humanas de alta confianza y los resultados t\u00e9cnicos excepcionales son exactamente la misma cosa.',
    partnership_title: 'Alianza',
    partnership_desc:
      'Trabajamos juntos desde 2014. Hemos entregado integraciones cr\u00edticas para empresas en M\u00e9xico y USA. Nos conocimos como ingeniero y manager; hoy somos socios.',

    // Social Proof
    stat_radio: 'Contribuidores regulares en Radio F\u00f3rmula Baj\u00edo',
    stat_downloads_label: 'descargas en nuestras herramientas open source',
    stat_downloads_number: '2,000+',
    stat_years_number: '10',
    stat_years_label: 'a\u00f1os construyendo juntos',
    stat_geo: 'Trabajamos con empresas en M\u00e9xico y USA',

    // Blog
    blog_label: 'INSIGHTS',
    blog_headline: 'Lo que pensamos',
    blog_cta: 'Ver todos los art\u00edculos',
    blog1_category: 'IA y Calidad de C\u00f3digo',
    blog1_title: 'C\u00f3mo medimos la calidad del c\u00f3digo generado por IA',
    blog1_excerpt:
      'Un an\u00e1lisis profundo de nuestra metodolog\u00eda Ruby Skill Bench y por qu\u00e9 la validaci\u00f3n automatizada importa para c\u00f3digo en producci\u00f3n.',
    blog2_category: 'IA y Equipos',
    blog2_title: 'La IA como compa\u00f1era de equipo: lecciones de Radio F\u00f3rmula Baj\u00edo',
    blog2_excerpt:
      'Lo que hemos aprendido sobre la integraci\u00f3n de herramientas de IA junto a equipos humanos sin reemplazar a las personas que importan.',
    blog3_category: 'Proceso',
    blog3_title: 'De la idea al MVP: nuestro proceso en 4 semanas',
    blog3_excerpt:
      'C\u00f3mo usamos Design Sprints y desarrollo validado para llevar un concepto a un producto funcional en un mes.',

    // Contact / Footer CTA
    footer_cta_headline: '\u00bfListo para entender lo que la tecnolog\u00eda est\u00e1 amplificando en tu organizaci\u00f3n?',
    footer_cta_desc:
      'Antes de tu pr\u00f3xima iniciativa de IA, proyecto de automatizaci\u00f3n o inversi\u00f3n arquitect\u00f3nica, empieza con claridad.',
    footer_cta_body: 'Identifiquemos d\u00f3nde est\u00e1n las oportunidades reales.',
    footer_cta_button: 'Agendar una Llamada de Descubrimiento',

    // Footer
    footer_copyright: 'Nebula Ideas. Excelencia en Ingenier\u00eda.',
    footer_privacy: 'Aviso de privacidad',
    footer_linkedin: 'LinkedIn',
    footer_github: 'GitHub',

    // SEO
    seo_title: 'Nebula Clarity Sprint \u2014 Estrategia de IA y Tecnolog\u00eda',
    seo_description:
      'Entiende d\u00f3nde la tecnolog\u00eda crea fricci\u00f3n, alinea equipos alrededor de resultados e identifica oportunidades pr\u00e1cticas de IA y automatizaci\u00f3n antes de construir.',
    seo_og_description:
      'Un diagn\u00f3stico enfocado para descubrir fricci\u00f3n, alinear equipos y convertir decisiones de IA, automatizaci\u00f3n y tecnolog\u00eda en resultados medibles.',
    seo_site_name: 'Nebula Ideas',
  },
} as const;

export type TranslationKey = keyof (typeof translations)['en'];
