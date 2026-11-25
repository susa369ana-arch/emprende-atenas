/**
 * Utilidades para limpieza de números telefónicos y generación automática
 * de enlaces directos a WhatsApp basados en las fórmulas de Google Sheets / Glide / MiBarrio.
 */

export interface WhatsAppLinkResult {
  rawPhone: string;
  cleanNumber: string;
  countryCode: string;
  businessName: string;
  encodedMessage: string;
  fullUrl: string;
  isReady: boolean;
}

/**
 * Limpia cualquier caracter no numérico (espacios, guiones, paréntesis)
 * y asegura el código de país (Costa Rica: 506 por defecto).
 * Replica la fórmula: =SI(ESBLANCO(H2);"";CONCATENAR("506";REGEXREPLACE(TEXTO(H2;"0");"[^0-9]";"")))
 */
export function cleanWhatsAppNumber(
  inputPhone: string,
  defaultCountryCode: string = '506'
): string {
  if (!inputPhone) return '';

  // Eliminar cualquier caracter que no sea dígito
  let digitsOnly = inputPhone.replace(/[^0-9]/g, '');

  if (!digitsOnly) return '';

  // Si ya empieza con el código de país ingresado
  if (digitsOnly.startsWith(defaultCountryCode) && digitsOnly.length > defaultCountryCode.length + 6) {
    return digitsOnly;
  }

  // En Costa Rica los números locales tienen 8 dígitos (ej. 8888-8888)
  if (digitsOnly.length === 8) {
    return `${defaultCountryCode}${digitsOnly}`;
  }

  // Si el usuario ingresó un número internacional con más de 9 dígitos que empieza por código distinto
  if (digitsOnly.length >= 10 && !digitsOnly.startsWith(defaultCountryCode)) {
    return digitsOnly;
  }

  // Por defecto anteponer código local si faltaba
  return `${defaultCountryCode}${digitsOnly}`;
}

/**
 * Genera el enlace directo a WhatsApp con texto codificado para URL.
 * Replica la fórmula: =SI(ESBLANCO(M2);"";CONCATENAR("https://wa.me/";M2;"?text=";ENCODEURL(CONCATENAR("Hola, vi *";E2;"* en la app MiBarrio y quisiera consultar..."))))
 */
export function buildWhatsAppLink(
  rawPhone: string,
  businessName: string,
  countryCode: string = '506',
  serviceJob?: string
): WhatsAppLinkResult {
  const cleanNumber = cleanWhatsAppNumber(rawPhone, countryCode);

  let messageText = `Hola, vi *${businessName}* en la app MiBarrio`;
  if (serviceJob) {
    messageText += ` (${serviceJob})`;
  }
  messageText += ` y quisiera consultar sobre sus servicios.`;

  const encodedMessage = encodeURIComponent(messageText);
  const fullUrl = cleanNumber ? `https://wa.me/${cleanNumber}?text=${encodedMessage}` : '';

  return {
    rawPhone,
    cleanNumber,
    countryCode,
    businessName,
    encodedMessage,
    fullUrl,
    isReady: Boolean(cleanNumber && fullUrl)
  };
}

/**
 * Fórmulas oficiales para Google Sheets mostradas en la guía MiBarrio
 */
export const SHEETS_FORMULAS = {
  limpiezaNumero: (cellInput = 'H2', countryCode = '506') =>
    `=SI(ESBLANCO(${cellInput}); ""; CONCATENAR("${countryCode}"; REGEXREPLACE(TEXTO(${cellInput}; "0"); "[^0-9]"; "")))`,

  generadorEnlace: (cellCleanNumber = 'M2', cellBusiness = 'E2') =>
    `=SI(ESBLANCO(${cellCleanNumber}); ""; CONCATENAR("https://wa.me/"; ${cellCleanNumber}; "?text="; ENCODEURL(CONCATENAR("Hola, vi *"; ${cellBusiness}; "* en la app MiBarrio y quisiera consultar sobre sus servicios."))))`
};

/**
 * Obtiene la URL canónica para compartir, dando prioridad al origen actual
 * o al enlace público compartido.
 */
export function getBaseShareUrl(): string {
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    const origin = window.location.origin;
    const pathname = window.location.pathname.replace(/\/$/, '');
    return `${origin}${pathname}`;
  }
  return 'https://ais-pre-6udvkynefx2a57yaxm3gcz-783040697655.us-east1.run.app';
}

/**
 * Genera el enlace directo para una ficha o para la app completa
 */
export function getShareUrl(profileId?: string): string {
  const base = getBaseShareUrl();
  return profileId ? `${base}?p=${encodeURIComponent(profileId)}` : base;
}

/**
 * Genera el texto listo para compartir la app comunitaria completa por WhatsApp
 */
export function getAppShareMessage(url: string): string {
  return `📢 *Emprendimiento y Líderes Comunales*\n\n¡Hola! Te invito a conocer el directorio comunitario oficial. Apoyemos el trabajo local, oficios de vecinos (pinta carros, albañiles, sodas, pintores, tiendas, artesanos) y contactemos a nuestros líderes comunales.\n\n👉 Accede a la app aquí:\n${url}`;
}

/**
 * Genera el texto listo para compartir una ficha o negocio individual
 */
export function getProfileShareMessage(
  businessName: string,
  jobTitle: string,
  locality: string,
  phone: string,
  url: string,
  isLeader: boolean = false
): string {
  const headerIcon = isLeader ? '🏛️' : '🛍️';
  const roleLabel = isLeader ? 'Líder Comunal' : 'Oficio / Emprendimiento';

  return `${headerIcon} *${businessName}* (${roleLabel})\n_${jobTitle}_\n\n📍 Ubicación: ${locality}\n📞 Contacto: ${phone}\n\nConoce sus servicios, fotos, opiniones y contacta directo por WhatsApp aquí:\n👉 ${url}`;
}
