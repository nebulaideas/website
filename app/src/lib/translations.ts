export type Language = 'en' | 'es';

export const translations = {
  en: {
    // Navigation
    nav_vision: 'Our Vision',
    nav_whatwedo: 'What We Do',
    nav_sprint: 'Clarity Sprint',
    nav_dna: 'Our DNA',
    nav_blog: 'Blog',
    nav_contact: 'Contact',
    nav_toggle_es: 'ES',
    nav_toggle_en: 'EN',
    nav_schedule: 'Schedule a Call',

    // Hero
    hero_label: 'Strategic Engineering',
    hero_headline: 'Measurable technology for businesses that grow.',
    hero_subheadline:
      'We reduce the risk of your technology investment with validated processes, clear metrics, and functional deliverables. We design technology that amplifies your team, not replaces it.',
    hero_cta_primary: 'Schedule a Clarity Call',
    hero_cta_secondary: 'Explore Our Stack',

    // Market Reality
    vision_label_hype: 'The Hype',
    vision_title_hype: 'Visual Noise & Saturation',
    vision_desc_hype:
      'The current landscape is flooded with superficial wrappers and disconnected features. Organizations are drowning in disjointed tools that lack a cohesive architectural strategy, leading to systemic fragility.',
    vision_label_friction: 'The Friction',
    vision_title_friction: 'Architectural Debt',
    vision_silo_title: 'Isolated Data Silos',
    vision_silo_desc: 'Models deployed without secure access to unified organizational truth.',
    vision_fragile_title: 'Fragile Integrations',
    vision_fragile_desc: 'Ad-hoc connections that break under scale or minor schema changes.',
    vision_gov_title: 'Governance Void',
    vision_gov_desc: 'Lack of auditable pipelines and controlled execution environments.',
    vision_quote: '"Before scaling automation, you must first understand the system it intends to amplify."',
    vision_quote_label: 'Core Principle 00',

    // Architectural Pillars
    pillars_label: 'Methodology',
    pillars_headline: 'Architectural Pillars',
    pillar1_label: 'Pillar 01',
    pillar1_title: 'Structural Design',
    pillar1_desc: 'We design systems from the ground up, prioritizing robust data modeling and clean component boundaries over rapid, disposable prototyping.',
    pillar2_label: 'Pillar 02',
    pillar2_title: 'Deterministic Execution',
    pillar2_desc: 'Replacing probabilistic black boxes with auditable, deterministic pipelines where control flow is explicit and predictable.',
    pillar3_label: 'Pillar 03',
    pillar3_title: 'Immutable Security',
    pillar3_desc: 'Security is not an overlay. It is baked into the infrastructure layer, ensuring data provenance and isolation at scale.',
    pillar4_label: 'Pillar 04',
    pillar4_title: 'Scalable Pathways',
    pillar4_desc: 'Building clear migration and scaling paths, ensuring the architecture can absorb new operational requirements without fundamental rewrites.',

    // Engineering DNA
    dna_label: 'Stack',
    dna_headline: 'Our Engineering DNA',
    dna_desc:
      'We select tools for their performance, safety, and operational maturity. Our stack reflects a commitment to building systems that endure.',
    dna_metrics: 'System metrics: 99.99% Uptime SLA capable infrastructure.',
    dna_filename: 'nebula_core_stack.yml',
    dna_layer_app: 'Application Layer',
    dna_layer_infra: 'Infrastructure & Cloud',
    dna_layer_edge: 'Edge & Security',

    // Services (combined into DNA context)
    service1_title: 'Technology Context Assessment',
    service1_desc:
      "One-week audit. We understand your workflows, measure your baseline, and deliver a prioritized plan. You'll know exactly where to invest first.",
    service2_title: 'Workflow Implementation',
    service2_desc:
      'Validated development. We build the systems, integrate the tools, and validate with metrics. We deliver working code, not presentations.',
    service3_title: 'Continuous Support',
    service3_desc:
      "Monthly optimization. We improve costs, quality, and adoption based on real data. Your technology improves over time, it doesn't depreciate.",

    // Clarity Sprint
    sprint_headline: 'The Nebula Clarity Sprint',
    sprint_desc:
      'A concentrated diagnostic engagement designed to cut through operational fog. We map your current architecture, identify systemic friction points, and deliver a rigorous technical blueprint for intelligent scaling.',
    sprint_step1_num: '01',
    sprint_step1_title: 'Audit & Discovery',
    sprint_step1_desc: 'Deep-dive analysis of existing infrastructure, data flow, and bottlenecks.',
    sprint_step2_num: '02',
    sprint_step2_title: 'Structural Mapping',
    sprint_step2_desc: 'Designing the target architecture focusing on stability and integration points.',
    sprint_step3_num: '03',
    sprint_step3_title: 'Execution Blueprint',
    sprint_step3_desc: 'Delivery of a deterministic technical roadmap with clear phased implementation.',
    sprint_cta: 'Book Your Clarity Sprint',

    // About
    about_label: 'WHO WE ARE',
    about_headline: 'About Us',
    founder1_name: 'Ismael Marin',
    founder1_role: 'Senior Product Manager & Engineering Manager',
    founder1_bio:
      '20 years of experience in product and engineering. Senior Product Manager and Engineering Manager at US companies. Creator of open source tools with 2,000+ downloads. Regular voice on [Radio Station] about responsible technology and AI.',
    founder2_name: 'Carlos (Mumo) Muniz',
    founder2_role: 'Engineering Manager & People Lead',
    founder2_bio:
      'Specialist in operations, team growth, and implementation. Former Engineering Manager and People Lead. 10 years working with Ismael on critical deliveries for companies in Mexico and the USA.',
    partnership_title: 'Partnership',
    partnership_desc:
      "We've worked together since 2014. We've delivered critical integrations for companies in Mexico and the USA. We met as engineer and manager; today we're partners.",

    // Philosophy
    philosophy_headline: 'Technology should amplify your team',
    philosophy_body:
      "We believe AI and automation should be companions to your team, not their replacements. As we say on [Radio Station]: a support chatbot doesn't replace your people \u2014 it enables them to serve after hours, gather useful information, and hand it to the next shift ready to resolve. Well-designed technology reduces friction, not human talent.",
    philosophy_attribution: '\u2014 Nebula Ideas',

    // Technology / Stack
    tech_opensource_title: 'Open Source',
    tech_opensource_desc:
      'Rails AI Bridge \u2014 2,000+ downloads for AI context in Rails. Ruby Skill Bench \u2014 automated validation of AI-generated code quality.',
    tech_stack_title: 'Languages & Frameworks',
    tech_stack_desc: 'Ruby on Rails, Go. Continuous learning: Rust for embedded systems and high performance.',
    tech_infra_title: 'Infrastructure',
    tech_infra_desc: 'Google Cloud, Cloudflare. AWS when the client requires it.',

    // Blog
    blog_label: 'INSIGHTS',
    blog_headline: 'What we think',
    blog_cta: 'View all articles',
    blog1_category: 'AI & Code Quality',
    blog1_title: 'How we measure the quality of AI-generated code',
    blog1_excerpt:
      'A deep dive into our Ruby Skill Bench methodology and why automated validation matters for production code.',
    blog2_category: 'AI & Teams',
    blog2_title: 'AI as a team companion: lessons from [Radio Station]',
    blog2_excerpt:
      "What we've learned about integrating AI tools alongside human teams without replacing the people that matter.",
    blog3_category: 'Process',
    blog3_title: 'From idea to MVP: our 4-week process',
    blog3_excerpt:
      'How we use Design Sprints and validated development to take a concept to a working product in one month.',

    // Social Proof
    stat_radio: 'Regular contributors on [Radio Station]',
    stat_downloads_label: 'downloads on our open source tools',
    stat_downloads_number: '2,000+',
    stat_years_number: '10',
    stat_years_label: 'years building together',
    stat_geo: 'We work with companies in Mexico and the USA',

    // Process
    process_step1_title: 'We understand your product and workflows',
    process_step1_desc:
      'We use Design Thinking and Design Sprint to align the team and objectives before writing code.',
    process_step2_title: 'We measure your current baseline',
    process_step2_desc: 'We apply benchmarks to know exactly where you are today. No guesses.',
    process_step3_title: 'We design and implement improvements',
    process_step3_desc: 'We build with TDD, functional deliverables, and continuous validation.',
    process_step4_title: 'We validate results with metrics',
    process_step4_desc: 'We measure real impact: adoption, costs, quality, team velocity.',

    // Contact / Footer CTA
    footer_cta_headline: 'Ready to engineer the future?',
    footer_cta_desc:
      "Stop accumulating architectural debt with superficial solutions. Let's build a foundation of calm confidence.",
    footer_cta_button: 'Book a Discovery Call',

    // Footer
    footer_copyright: '\u00a9 2024 Nebula Ideas. Engineering Excellence.',
    footer_privacy: 'Privacy Policy',
    footer_linkedin: 'LinkedIn',
    footer_github: 'GitHub',

    // SEO
    seo_title: 'Nebula Ideas | Engineering Excellence',
    seo_description:
      'We architect intelligent, scalable systems that solve complex business problems. Eschewing the hype, we build structural foundations for decision-makers who demand precision and system reliability.',
  },
  es: {
    // Navigation
    nav_vision: 'Nuestra Visión',
    nav_whatwedo: 'Qué Hacemos',
    nav_sprint: 'Sprint de Claridad',
    nav_dna: 'Nuestro ADN',
    nav_blog: 'Blog',
    nav_contact: 'Contacto',
    nav_toggle_es: 'ES',
    nav_toggle_en: 'EN',
    nav_schedule: 'Agendar una Llamada',

    // Hero
    hero_label: 'Ingeniería Estratégica',
    hero_headline: 'Tecnología medible para negocios que crecen.',
    hero_subheadline:
      'Reducimos el riesgo de tu inversión tecnológica con procesos validados, métricas claras y entregables funcionales. Diseñamos tecnología que amplifica a tu equipo, no que lo reemplaza.',
    hero_cta_primary: 'Agenda una Llamada de Claridad',
    hero_cta_secondary: 'Explora Nuestro Stack',

    // Market Reality
    vision_label_hype: 'El Hype',
    vision_title_hype: 'Ruido Visual y Saturación',
    vision_desc_hype:
      'El panorama actual está inundado de envoltorios superficiales y características desconectadas. Las organizaciones se ahogan en herramientas disjuntas que carecen de una estrategia arquitectónica cohesiva, llevando a fragilidad sistémica.',
    vision_label_friction: 'La Fricción',
    vision_title_friction: 'Deuda Arquitectónica',
    vision_silo_title: 'Silos de Datos Aislados',
    vision_silo_desc: 'Modelos desplegados sin acceso seguro a la verdad organizacional unificada.',
    vision_fragile_title: 'Integraciones Frágiles',
    vision_fragile_desc: 'Conexiones ad-hoc que se rompen bajo escala o cambios menores de esquema.',
    vision_gov_title: 'Vacío de Gobernanza',
    vision_gov_desc: 'Falta de pipelines auditables y entornos de ejecución controlados.',
    vision_quote: '"Antes de escalar la automatización, primero debes entender el sistema que pretende amplificar."',
    vision_quote_label: 'Principio Core 00',

    // Architectural Pillars
    pillars_label: 'Metodología',
    pillars_headline: 'Pilares Arquitectónicos',
    pillar1_label: 'Pilar 01',
    pillar1_title: 'Diseño Estructural',
    pillar1_desc: 'Diseñamos sistemas desde cero, priorizando el modelado robusto de datos y límites de componentes limpios sobre la prototipación rápida y desechable.',
    pillar2_label: 'Pilar 02',
    pillar2_title: 'Ejecución Determinista',
    pillar2_desc: 'Reemplazando cajas negras probabilísticas con pipelines auditables y deterministas donde el flujo de control es explícito y predecible.',
    pillar3_label: 'Pilar 03',
    pillar3_title: 'Seguridad Inmutable',
    pillar3_desc: 'La seguridad no es una capa superpuesta. Está integrada en la capa de infraestructura, asegurando procedencia de datos y aislamiento a escala.',
    pillar4_label: 'Pilar 04',
    pillar4_title: 'Caminos Escalables',
    pillar4_desc: 'Construyendo rutas claras de migración y escalado, asegurando que la arquitectura pueda absorber nuevos requisitos operacionales sin reescrituras fundamentales.',

    // Engineering DNA
    dna_label: 'Stack',
    dna_headline: 'Nuestro ADN de Ingeniería',
    dna_desc:
      'Seleccionamos herramientas por su rendimiento, seguridad y madurez operacional. Nuestro stack refleja un compromiso de construir sistemas que perduren.',
    dna_metrics: 'Métricas del sistema: infraestructura capaz de 99.99% Uptime SLA.',
    dna_filename: 'nebula_core_stack.yml',
    dna_layer_app: 'Capa de Aplicación',
    dna_layer_infra: 'Infraestructura y Cloud',
    dna_layer_edge: 'Edge y Seguridad',

    // Services
    service1_title: 'Evaluación de Contexto Tecnológico',
    service1_desc:
      'Auditoría de una semana. Entendemos tus workflows, medimos tu baseline y entregamos un plan priorizado. Sabrás exactamente dónde invertir primero.',
    service2_title: 'Implementación de Flujos de Trabajo',
    service2_desc:
      'Desarrollo validado. Construimos los sistemas, integramos las herramientas y validamos con métricas. Entregamos código funcionando, no presentaciones.',
    service3_title: 'Acompañamiento Continuo',
    service3_desc:
      'Optimización mensual. Mejoramos costos, calidad y adopción basándonos en datos reales. Tu tecnología mejora con el tiempo, no se depreca.',

    // Clarity Sprint
    sprint_headline: 'El Nebula Clarity Sprint',
    sprint_desc:
      'Una intervención diagnóstica concentrada diseñada para disipar la niebla operativa. Mapeamos tu arquitectura actual, identificamos puntos de fricción sistémica y entregamos un blueprint técnico riguroso para el escalado inteligente.',
    sprint_step1_num: '01',
    sprint_step1_title: 'Auditoría y Descubrimiento',
    sprint_step1_desc: 'Análisis profundo de la infraestructura existente, flujo de datos y cuellos de botella.',
    sprint_step2_num: '02',
    sprint_step2_title: 'Mapeo Estructural',
    sprint_step2_desc: 'Diseño de la arquitectura objetivo enfocándose en estabilidad y puntos de integración.',
    sprint_step3_num: '03',
    sprint_step3_title: 'Blueprint de Ejecución',
    sprint_step3_desc: 'Entrega de un roadmap técnico determinista con implementación faseada y clara.',
    sprint_cta: 'Reserva tu Clarity Sprint',

    // About
    about_label: 'QUIENES SOMOS',
    about_headline: 'Nosotros',
    founder1_name: 'Ismael Marin',
    founder1_role: 'Senior Product Manager y Engineering Manager',
    founder1_bio:
      '20 años de experiencia en producto e ingeniería. Senior Product Manager y Engineering Manager en empresas de USA. Creador de herramientas open source con 2,000+ descargas. Voz regular en [Radio Station] sobre tecnología e IA responsable.',
    founder2_name: 'Carlos (Mumo) Muniz',
    founder2_role: 'Engineering Manager y People Lead',
    founder2_bio:
      'Especialista en operaciones, crecimiento de equipos e implementación. Ex Engineering Manager y People Lead. 10 años trabajando con Ismael en entregas críticas para empresas en México y USA.',
    partnership_title: 'Alianza',
    partnership_desc:
      'Trabajamos juntos desde 2014. Hemos entregado integraciones críticas para empresas en México y USA. Nos conocimos como ingeniero y manager; hoy somos socios.',

    // Philosophy
    philosophy_headline: 'La tecnología debe amplificar a tu equipo',
    philosophy_body:
      'Creemos que la IA y la automatización deben ser compañeras de tu equipo, no sus sustitutas. Como decimos en [Radio Station]: un chatbot de soporte no reemplaza a tu gente — les permite atender después de horas, recopilar información útil y entregarla al siguiente turno listo para resolver. La tecnología bien diseñada reduce la fricción, no el talento humano.',
    philosophy_attribution: '\u2014 Nebula Ideas',

    // Technology
    tech_opensource_title: 'Open Source',
    tech_opensource_desc:
      'Rails AI Bridge — 2,000+ descargas para contexto de IA en Rails. Ruby Skill Bench — validación automatizada de calidad de código generado por IA.',
    tech_stack_title: 'Lenguajes y Frameworks',
    tech_stack_desc:
      'Ruby on Rails, Go. En formación continua: Rust para sistemas embebidos y alto rendimiento.',
    tech_infra_title: 'Infraestructura',
    tech_infra_desc: 'Google Cloud, Cloudflare. AWS cuando el cliente lo requiere.',

    // Blog
    blog_label: 'INSIGHTS',
    blog_headline: 'Lo que pensamos',
    blog_cta: 'Ver todos los artículos',
    blog1_category: 'IA y Calidad de Código',
    blog1_title: 'Cómo medimos la calidad del código generado por IA',
    blog1_excerpt:
      'Un análisis profundo de nuestra metodología Ruby Skill Bench y por qué la validación automatizada importa para código en producción.',
    blog2_category: 'IA y Equipos',
    blog2_title: 'La IA como compañera del equipo: lecciones de [Radio Station]',
    blog2_excerpt:
      'Lo que hemos aprendido sobre integrar herramientas de IA junto a equipos humanos sin reemplazar a las personas que importan.',
    blog3_category: 'Proceso',
    blog3_title: 'De la idea al MVP: nuestro proceso en 4 semanas',
    blog3_excerpt:
      'Cómo usamos Design Sprints y desarrollo validado para llevar un concepto a un producto funcional en un mes.',

    // Social Proof
    stat_radio: 'Contribuidores regulares en [Radio Station]',
    stat_downloads_label: 'descargas en nuestras herramientas open source',
    stat_downloads_number: '2,000+',
    stat_years_number: '10',
    stat_years_label: 'años construyendo juntos',
    stat_geo: 'Trabajamos con empresas en México y USA',

    // Process
    process_step1_title: 'Entendemos tu producto y workflows',
    process_step1_desc:
      'Usamos Design Thinking y Design Sprint para alinear equipo y objetivos antes de escribir código.',
    process_step2_title: 'Medimos tu baseline actual',
    process_step2_desc: 'Aplicamos benchmarks para saber exactamente dónde estás hoy. Sin adivinanzas.',
    process_step3_title: 'Diseñamos e implementamos mejoras',
    process_step3_desc: 'Construimos con TDD, entregables funcionales y validación continua.',
    process_step4_title: 'Validamos resultados con métricas',
    process_step4_desc: 'Medimos impacto real: adopción, costos, calidad, velocidad del equipo.',

    // Contact / Footer CTA
    footer_cta_headline: '¿Listo para diseñar el futuro?',
    footer_cta_desc:
      'Deja de acumular deuda arquitectónica con soluciones superficiales. Construyamos una base de confianza serena.',
    footer_cta_button: 'Agendar una Llamada de Descubrimiento',

    // Footer
    footer_copyright: '\u00a9 2024 Nebula Ideas. Excelencia en Ingeniería.',
    footer_privacy: 'Aviso de privacidad',
    footer_linkedin: 'LinkedIn',
    footer_github: 'GitHub',

    // SEO
    seo_title: 'Nebula Ideas | Excelencia en Ingeniería',
    seo_description:
      'Diseñamos sistemas inteligentes y escalables que resuelven problemas complejos de negocio. Evitando el hype, construimos bases estructurales para líderes que exigen precisión y confiabilidad.',
  },
} as const;

export type TranslationKey = keyof (typeof translations)['en'];
