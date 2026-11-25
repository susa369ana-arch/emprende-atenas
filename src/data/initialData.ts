import { Chapter, Profile } from '../types';

export const INITIAL_CHAPTERS: Chapter[] = [
  {
    id: 'lideres-comunales',
    name: 'Líderes Comunales & Organizaciones',
    shortName: 'Líderes Comunales',
    icon: 'ShieldCheck',
    description: 'Dirigentes comunitarios, juntas de desarrollo integral (ADI), comités de deportes, comités vecinales y voceros locales.',
    tagline: 'Gestión comunal, apoyo vecinal y proyectos de bienestar social',
    isCommunityLeader: true
  },
  {
    id: 'pinta-carros',
    name: 'Pinta Carros & Enderezado',
    shortName: 'Pinta Carros',
    icon: 'Car',
    description: 'Talleres automotrices especializados en enderezado, pintura al horno, retoque de rayones y pulido general.',
    tagline: 'Expertos en chapa, pintura automotriz y acabados de vehículos'
  },
  {
    id: 'albaniles',
    name: 'Albañilería & Construcción',
    shortName: 'Albañiles',
    icon: 'Hammer',
    description: 'Maestros de obra, albañiles calificados, pegado de block, colocación de cerámica, tapias y remodelaciones.',
    tagline: 'Estructuras firmes, remodelaciones residenciales y acabados de obra'
  },
  {
    id: 'pintores',
    name: 'Pintores & Acabados',
    shortName: 'Pintores',
    icon: 'Paintbrush',
    description: 'Pintura residencial y comercial de interiores y exteriores, impermeabilización de techos y pasteado fino.',
    tagline: 'Pintura decorativa, protección contra humedad y acabados limpios'
  },
  {
    id: 'tiendas',
    name: 'Tiendas & Minisúpers',
    shortName: 'Tiendas',
    icon: 'Store',
    description: 'Comercios de barrio, minisúpers, abarrotes, pulperías y suministros diarios con atención personal.',
    tagline: 'Víveres, productos de consumo diario y abastecimiento para el hogar'
  },
  {
    id: 'sodas',
    name: 'Sodas & Comidas Caseras',
    shortName: 'Sodas',
    icon: 'UtensilsCrossed',
    description: 'Comida típica, casados completos, empanadas, desayunos tradicionales, repostería y platillos del día.',
    tagline: 'Sabor casero, comida criolla tradicional y servicio con calor de hogar'
  },
  {
    id: 'artesanos',
    name: 'Artesanos & Oficios Manuales',
    shortName: 'Artesanos',
    icon: 'Scissors',
    description: 'Creaciones a mano en madera, costura, marroquinería, cerámica, tejidos y artículos personalizados.',
    tagline: 'Piezas artesanales hechas con dedicación, talento y materiales nobles'
  },
  {
    id: 'electricistas-fontaneros',
    name: 'Electricidad & Fontanería',
    shortName: 'Servicios Técnicos',
    icon: 'Wrench',
    description: 'Instalaciones eléctricas certificadas, reparación de fugas, bombas de agua, cableado y mantenimiento urgente.',
    tagline: 'Soluciones rápidas y seguras para el hogar y comercios'
  }
];

export const INITIAL_PROFILES: Profile[] = [
  // 0. Líderes Comunales & Organizaciones
  {
    id: 'p-lid-1',
    name: 'Don Hernán Solano Valverde',
    businessName: 'Asociación de Desarrollo Integral (ADI Santa Teresita)',
    chapterId: 'lideres-comunales',
    jobTitle: 'Presidente de la ADI & Gestor de Proyectos Comunales',
    specialties: ['Gestiones Municipales', 'Mantenimiento de Caminos y Vías', 'Salón Comunal & Eventos', 'Apoyo Social Familiar', 'Alianzas DINADECO'],
    address: 'Salón Comunal de Santa Teresita, costado este de la plaza de deportes',
    locality: 'Santa Teresita Centro',
    phone: '8733-4455',
    whatsapp: '50687334455',
    schedule: 'Atención a vecinos: Lunes a Viernes 4:00 PM - 7:00 PM | Sábados 9:00 AM - 12:00 MD',
    experienceYears: 12,
    pricingNote: 'Servicio Comunitario y Voluntario sin costo para los vecinos.',
    description: 'Trabajamos por el desarrollo y bienestar de toda la comunidad. Canalizamos peticiones para mejoras en alumbrado público, recolección de basura, arreglo de calles y uso del salón comunal para actividades familiares o benéficas.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    portfolioImages: [
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80'
    ],
    isAvailable: true,
    createdAt: '2025-01-02',
    pin: '1234',
    categoryType: 'lider_comunal',
    communityOrg: 'Asociación de Desarrollo Integral (ADI)',
    reviews: [
      {
        id: 'rev-lid-101',
        author: 'Manuel Cordero',
        rating: 5,
        comment: 'Don Hernán siempre está atento a los problemas del barrio. Gracias a su gestión con la municipalidad nos pavimentaron el tramo de la escuela.',
        serviceRendered: 'Gestión de pavimentación comunal',
        date: '2025-02-14',
        helpfulCount: 16
      },
      {
        id: 'rev-lid-102',
        author: 'Silvia Madrigal',
        rating: 5,
        comment: 'Excelente disposición y transparencia. Nos facilitó el salón comunal para la feria de emprendedores del barrio con todo el apoyo.',
        serviceRendered: 'Coordinación de salón comunal para feria',
        date: '2025-03-01',
        helpfulCount: 9
      }
    ]
  },
  {
    id: 'p-lid-2',
    name: 'Doña Carmen Monge Brenes',
    businessName: 'Comité Comunal de Deportes & Recreación',
    chapterId: 'lideres-comunales',
    jobTitle: 'Coordinadora de Deporte Infantil, Escuelitas y Salud Vecinal',
    specialties: ['Torneos de Fútbol Infantil', 'Zumba y Ejercicio para Adultos Mayores', 'Mantenimiento de Cancha de Deportes', 'Caminatas Comunales'],
    address: 'Costado sur de la plaza de deportes, oficina anexa al gimnasio',
    locality: 'Sector Plaza de Deportes',
    phone: '8899-2211',
    whatsapp: '50688992211',
    schedule: 'Lunes a Domingo: 8:00 AM - 6:00 PM',
    experienceYears: 9,
    pricingNote: 'Actividades recreativas gratuitas o con aporte solidario voluntario.',
    description: 'Fomentamos el deporte y la sana recreación para niños, jóvenes y adultos mayores del barrio. Organizamos torneos barriales, clases de baile y velamos por el cuido de la plaza y áreas verdes.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    portfolioImages: [
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=800&q=80'
    ],
    isAvailable: true,
    createdAt: '2025-01-04',
    pin: '1234',
    categoryType: 'lider_comunal',
    communityOrg: 'Comité de Deportes y Recreación',
    reviews: [
      {
        id: 'rev-lid-201',
        author: 'Tatiana Navarro',
        rating: 5,
        comment: 'Las clases de ejercicio para las mamás y la escuelita de fútbol para los chiquitos le han cambiado la vida al barrio. Doña Carmen tiene un corazón de oro.',
        serviceRendered: 'Escuelita de fútbol comunal',
        date: '2025-02-20',
        helpfulCount: 12
      }
    ]
  },

  // 1. Pinta Carros
  {
    id: 'p-1',
    name: 'Don Carlos Alvarado Castro',
    businessName: 'Taller & Pintura Automotriz Alvarado',
    chapterId: 'pinta-carros',
    jobTitle: 'Pintor automotriz especializado en bicapa, poliuretano y enderezado',
    specialties: ['Pintura en cabina', 'Enderezado de chasis', 'Pulido 3M', 'Restauración de focos', 'Retoques express'],
    address: 'Del cruce principal de Santa Teresita, 250 metros este, frente al taller mecánico La Esquina',
    locality: 'Santa Teresita, Sector Este',
    phone: '+506 8841-2390',
    whatsapp: '50688412390',
    schedule: 'Lunes a Viernes: 7:00 AM - 5:30 PM | Sábados: 7:00 AM - 1:00 PM',
    experienceYears: 18,
    pricingNote: 'Presupuestos detallados sin costo previo diagnóstico en taller.',
    description: 'Contamos con cabina cerrada de pintura para garantizar un acabado sin polvo ni imperfecciones. Trabajamos con pinturas bicapa y tricapa de marcas de primera calidad (Glasurit y Axalta). Enderezado en frío y calor. Garantía por escrito en tonalidad y brillo.',
    avatarUrl: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=400&q=80',
    portfolioImages: [
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=800&q=80'
    ],
    isAvailable: true,
    createdAt: '2025-01-15',
    pin: '1234',
    reviews: [
      {
        id: 'rev-101',
        author: 'Guillermo Montero',
        rating: 5,
        comment: 'Le llevé mi pickup con un golpe feo en la compuerta trasera y pintura descolorida por el sol. Quedó idéntico al color original de agencia. Don Carlos es muy serio y puntual con la entrega.',
        serviceRendered: 'Enderezado de batea y pintura completa',
        date: '2025-02-18',
        helpfulCount: 7
      },
      {
        id: 'rev-102',
        author: 'Maricruz Brenes',
        rating: 5,
        comment: 'Excelente atención. Me pulió los dos focos delanteros y arregló un raspón en el bómper en solo 24 horas. Precios muy razonables.',
        serviceRendered: 'Pulido de focos y retoque de bumper',
        date: '2025-03-02',
        helpfulCount: 4
      }
    ]
  },

  // 2. Albañiles
  {
    id: 'p-2',
    name: 'Maestro Miguel Ángel Rojas',
    businessName: 'Construcciones & Remodelaciones Rojas',
    chapterId: 'albaniles',
    jobTitle: 'Maestro de obras, albañilería general, losas y enchapes finos',
    specialties: ['Pegado de block', 'Enchape porcelanato y cerámica', 'Fundición de losas', 'Tapias perimetrales', 'Cielos rasos'],
    address: 'Barrio El Carmen, 100 metros sur de la Iglesia Católica, casa esquinera color terracota',
    locality: 'Barrio El Carmen',
    phone: '+506 8712-4589',
    whatsapp: '50687124589',
    schedule: 'Lunes a Sábado: 6:30 AM - 5:00 PM',
    experienceYears: 24,
    pricingNote: 'Trabajos por contrato llave en mano o por día con cuadrilla completa.',
    description: 'Más de dos décadas levantando casas, tapias de seguridad y remodelando baños y cocinas. Cuadrilla responsable, puntual y limpia al entregar cada proyecto. Se realizan visitas para cubicación y lista exacta de materiales para evitar desperdicios.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    portfolioImages: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80'
    ],
    isAvailable: true,
    createdAt: '2025-01-20',
    pin: '1234',
    reviews: [
      {
        id: 'rev-201',
        author: 'Roberto Fallas',
        rating: 5,
        comment: 'Don Miguel nos hizo la remodelación completa del baño principal y el cambio de piso de la sala a porcelanato. Los cortes impecables, nivelación perfecta y dejaron todo limpio al terminar.',
        serviceRendered: 'Enchape de baño y piso de porcelanato 60x60',
        date: '2025-02-10',
        helpfulCount: 9
      },
      {
        id: 'rev-202',
        author: 'Sonia Cordero',
        rating: 5,
        comment: 'Muy honesto y trabajador. Nos construyó la tapia trasera de 15 metros en tiempo récord y con muy buen precio. 100% recomendado.',
        serviceRendered: 'Construcción de tapia de block',
        date: '2025-03-12',
        helpfulCount: 5
      }
    ]
  },

  // 3. Pintores
  {
    id: 'p-3',
    name: 'Andrés Mora Navarro',
    businessName: 'Pinturas & Mantenimiento Mora',
    chapterId: 'pintores',
    jobTitle: 'Pintor profesional de residencias, comercios e impermeabilización',
    specialties: ['Pintura interior y exterior', 'Sellado de goteras y techos', 'Pasteado y lijado', 'Tratamiento antihongos', 'Esmaltes en verjas'],
    address: 'Residencial Las Palmas, calle 3, 75 metros oeste del parque infantil',
    locality: 'Las Palmas',
    phone: '+506 8399-1044',
    whatsapp: '50683991044',
    schedule: 'Lunes a Sábado: 7:00 AM - 4:30 PM',
    experienceYears: 12,
    pricingNote: 'Presupuesto gratis a domicilio con catálogo de colores incluido.',
    description: 'Servicio de pintura limpio y detallista. Protegemos muebles y pisos con plástico y cinta antes de iniciar. Especialistas en sellado de techos para temporada de lluvias y aplicación de pinturas antihongos de alta durabilidad.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    portfolioImages: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80'
    ],
    isAvailable: true,
    createdAt: '2025-02-01',
    pin: '1234',
    reviews: [
      {
        id: 'rev-301',
        author: 'Lorena Vargas',
        rating: 5,
        comment: 'Pintó toda la fachada de la casa y el techo con impermeabilizante antes del invierno. Cero manchas en los vidrios ni en el piso. Andrés es un muchacho muy educado y cuidadoso.',
        serviceRendered: 'Pintura de fachada e impermeabilización de zinc',
        date: '2025-03-05',
        helpfulCount: 6
      }
    ]
  },

  // 4. Tiendas & Minisúpers
  {
    id: 'p-4',
    name: 'Doña Elena Ramírez y Familia',
    businessName: 'Minisúper y Abarrotes Santa Teresita',
    chapterId: 'tiendas',
    jobTitle: 'Comercio local, abarrotes, verduras frescas y productos para el hogar',
    specialties: ['Abarrotes de primera necesidad', 'Lácteos frescos y quesos artesanales', 'Verduras del día', 'Recargas telefónicas', 'Servicio a domicilio local'],
    address: 'Costado norte de la plaza de deportes de Santa Teresita, local esquinero con rejas verdes',
    locality: 'Santa Teresita Centro',
    phone: '+506 2289-5510',
    whatsapp: '50689201144',
    schedule: 'Lunes a Domingo: 6:00 AM - 9:00 PM (Jornada continua)',
    experienceYears: 15,
    pricingNote: 'Aceptamos SINPE Móvil, tarjetas de débito/crédito y efectivo.',
    description: 'El minisúper de confianza de la comunidad. Siempre con pan fresco de la mañana, lácteos de la zona, frutas y verduras seleccionadas. Hacemos entregas a domicilio en el barrio por WhatsApp sin costo adicional para pedidos familiares.',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    portfolioImages: [
      'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=800&q=80'
    ],
    isAvailable: true,
    createdAt: '2025-01-10',
    pin: '1234',
    reviews: [
      {
        id: 'rev-401',
        author: 'Carlos Eduardo Méndez',
        rating: 5,
        comment: 'Siempre tienen todo fresco y bien surtido. El servicio por WhatsApp para pedir los víveres es rapidísimo y doña Elena siempre regala una sonrisa. Un pilar en el barrio.',
        serviceRendered: 'Compra de despensa semanal y entrega a domicilio',
        date: '2025-02-22',
        helpfulCount: 8
      },
      {
        id: 'rev-402',
        author: 'Valeria Castro',
        rating: 5,
        comment: 'El queso palmito y el pan caliente de las 3:00 PM son inigualables. Da gusto apoyar a los negocios del vecindario.',
        serviceRendered: 'Abarrotes y panadería',
        date: '2025-03-14',
        helpfulCount: 3
      }
    ]
  },

  // 5. Sodas & Comidas Caseras (incluye el ejemplo exacto de la guía MiBarrio)
  {
    id: 'p-5-mirador',
    name: 'Don Carlos & Doña Marta',
    businessName: 'Soda El Mirador',
    chapterId: 'sodas',
    jobTitle: 'Comidas típicas caseras, casados al carbón, tortillas con queso y café chorreado',
    specialties: ['Casados con lomo o chuleta', 'Tortillas palmeadas con queso fresco', 'Desayunos con gallo pinto', 'Olla de carne', 'Empanadas de chicharrón'],
    address: 'Alto de la colina, 300 metros este de la delegación, local de madera con vista panorámica',
    locality: 'Sector El Mirador',
    phone: '8888-8888',
    whatsapp: '50688888888',
    schedule: 'Lunes a Domingo: 6:30 AM - 6:00 PM',
    experienceYears: 16,
    pricingNote: 'Casados completos desde ₡3.000 con fresco natural. Acepta SINPE Móvil y efectivo.',
    description: 'La auténtica cuchara típica con una vista inigualable del valle. Tortillas palmeadas a mano al momento, natilla casera, café chorreado en chuspa y desayunos tradicionales. Almuerzos para llevar o para disfrutar en terraza.',
    avatarUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80',
    portfolioImages: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'
    ],
    isAvailable: true,
    createdAt: '2025-01-05',
    pin: '1234',
    reviews: [
      {
        id: 'rev-mir-1',
        author: 'Esteban Morales',
        rating: 5,
        comment: 'Las tortillas con queso y el pinto con huevo son de lo mejor. Escribí por el WhatsApp de MiBarrio para encargar 4 almuerzos y ya los tenían listos al llegar. Atención excelente.',
        serviceRendered: 'Desayunos típicos y casados para llevar',
        date: '2025-02-15',
        helpfulCount: 14
      },
      {
        id: 'rev-mir-2',
        author: 'Jessica Brenes',
        rating: 5,
        comment: 'La vista es preciosa y el casado con carne en salsa estaba súper tierno y abundante. Muy recomendado.',
        serviceRendered: 'Almuerzo familiar en terraza',
        date: '2025-03-04',
        helpfulCount: 7
      }
    ]
  },
  {
    id: 'p-5',
    name: 'Doña María Eugenia Solano',
    businessName: 'Soda Típica La Cazuela de Doña Mari',
    chapterId: 'sodas',
    jobTitle: 'Cocina criolla tradicional, casados con leña, empanadas y desayunos',
    specialties: ['Casados con carne en salsa o chuleta', 'Gallo pinto con huevos y natilla', 'Empanadas arregladas de chicharrón', 'Olla de carne los fines de semana', 'Frescos naturales de fruta'],
    address: 'Frente a la parada central de buses, 50 metros oeste, rotulo de madera tallada',
    locality: 'Sector Central',
    phone: '+506 2253-9080',
    whatsapp: '50685449900',
    schedule: 'Lunes a Sábado: 6:00 AM - 4:00 PM | Domingos: 7:00 AM - 2:00 PM (Olla de carne)',
    experienceYears: 20,
    pricingNote: 'Casados completos desde ₡3.200 con fresco natural incluido.',
    description: 'Comida hecha con sazón de abuela, frijoles tiernos preparados al día, plátanos maduros en su punto y picadillos tradicionales de papa con carne o chayote. Ambiente familiar y acogedor. Almuerzos para llevar o para disfrutar en el salón.',
    avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80',
    portfolioImages: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80'
    ],
    isAvailable: true,
    createdAt: '2025-01-08',
    pin: '1234',
    reviews: [
      {
        id: 'rev-501',
        author: 'Fabio Hernández',
        rating: 5,
        comment: 'El mejor casado con carne mechada de toda la zona. Porciones muy generosas, los frijoles con caldo espeso y la ensalada bien fresca. El fresco de cas con hierbabuena estaba delicioso.',
        serviceRendered: 'Almuerzo casado con fresco natural',
        date: '2025-02-28',
        helpfulCount: 11
      },
      {
        id: 'rev-502',
        author: 'Patricia Chacón',
        rating: 5,
        comment: 'La olla de carne de los domingos es una tradición imperdible. Las verduras suaves y la costilla tierna. Servicio rápido y muy aseado.',
        serviceRendered: 'Olla de carne familiar de fin de semana',
        date: '2025-03-10',
        helpfulCount: 8
      }
    ]
  },

  // 6. Artesanos & Oficios Manuales
  {
    id: 'p-6',
    name: 'Don Jorge Quesada Murillo',
    businessName: 'Taller Artesanal & Maderas El Roble',
    chapterId: 'artesanos',
    jobTitle: 'Ebanista artesanal y tallador de piezas en maderas nobles',
    specialties: ['Tablas de asados curadas', 'Muebles de cocina a medida', 'Relojes de pared rústicos', 'Restauración de antigüedades', 'Bandejas personalizadas con grabado'],
    address: 'Entrada a Calle Los Mangos, 300 metros norte, portón de madera con buzón rústico',
    locality: 'Calle Los Mangos',
    phone: '+506 8633-7712',
    whatsapp: '50686337712',
    schedule: 'Lunes a Viernes: 8:00 AM - 5:00 PM | Sábados: 8:00 AM - 12:00 MD',
    experienceYears: 28,
    pricingNote: 'Trabajos sobre pedido y catálogo de piezas exclusivas listas para entrega.',
    description: 'Transformamos madera de teca, cedro y laurel provenientes de fuentes sostenibles en piezas únicas para el hogar. Cada tabla y mueble recibe acabados de aceites naturales y ceras de abeja de grado alimenticio. Grabado con pirógrafo disponible para regalos y empresas.',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    portfolioImages: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80'
    ],
    isAvailable: true,
    createdAt: '2025-01-25',
    pin: '1234',
    reviews: [
      {
        id: 'rev-601',
        author: 'Esteban Monge',
        rating: 5,
        comment: 'Le encargué una tabla grande de picar en madera de teca con el apellido familiar grabado para un regalo de bodas. La calidad del acabado y los encastres es de nivel maestro artesano.',
        serviceRendered: 'Tabla de asados de teca personalizada con grabado',
        date: '2025-03-01',
        helpfulCount: 5
      }
    ]
  },

  // 7. Electricistas & Fontaneros
  {
    id: 'p-7',
    name: 'Javier Solís Granados',
    businessName: 'Servicios Técnicos & Fontanería Express Solís',
    chapterId: 'electricistas-fontaneros',
    jobTitle: 'Técnico certificado en fontanería residencial y circuitos eléctricos',
    specialties: ['Detección y reparación de fugas', 'Instalación de calentadores y duchas', 'Cambio de breakers y tomacorrientes', 'Mantenimiento de bombas de agua', 'Atención de emergencias'],
    address: 'Barrio San Martín, 150 metros sur del abastecedor La Pradera, casa azul',
    locality: 'Barrio San Martín',
    phone: '+506 8905-6677',
    whatsapp: '50689056677',
    schedule: 'Lunes a Domingo: 7:00 AM - 7:00 PM (Urgencias 24/7 con previa confirmación)',
    experienceYears: 14,
    pricingNote: 'Tarifa básica de revisión desde ₡15.000 (se abona al costo del arreglo si se ejecuta).',
    description: 'Diagnóstico rápido y con herramientas modernas para evitar romper paredes innecesariamente. Solución definitiva a fugas en tuberías PVC y CPVC, llaves de paso atoradas y bajantes pluviales. Instalación segura de termos y duchas para evitar cortocircuitos.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    portfolioImages: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80'
    ],
    isAvailable: true,
    createdAt: '2025-02-12',
    pin: '1234',
    reviews: [
      {
        id: 'rev-701',
        author: 'Mauricio Arroyo',
        rating: 5,
        comment: 'Tuvimos una fuga escondida debajo del fregadero un sábado por la noche que nos inundó la cocina. Javier llegó en 35 minutos, cambió el niple roto y purgó la línea. Salvó el fin de semana.',
        serviceRendered: 'Reparación urgente de fuga de agua bajo fregadero',
        date: '2025-03-08',
        helpfulCount: 10
      }
    ]
  }
];
