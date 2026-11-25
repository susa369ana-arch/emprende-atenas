import React, { useState } from 'react';
import { useDirectory } from '../context/DirectoryContext';
import {
  cleanWhatsAppNumber,
  buildWhatsAppLink,
  SHEETS_FORMULAS
} from '../utils/whatsapp';
import {
  X,
  FileSpreadsheet,
  Copy,
  Check,
  ExternalLink,
  Download,
  Smartphone,
  Sparkles,
  Info,
  CheckCircle2,
  Table,
  Eye,
  ShieldCheck,
  Building2,
  Users
} from 'lucide-react';

export const GoogleSheetsIntegrationModal: React.FC = () => {
  const { isSheetsModalOpen, setIsSheetsModalOpen, exportToGoogleSheetsCSV, profiles } = useDirectory();

  const [activeTab, setActiveTab] = useState<'simulator' | 'lideres' | 'formulas' | 'glide' | 'reference'>('simulator');

  // Interactive Live Simulator
  const [inputH2, setInputH2] = useState('8888-8888');
  const [inputE2, setInputE2] = useState('Soda El Mirador');
  const [countryCode, setCountryCode] = useState('506');

  // Copy state feedbacks
  const [copiedFormula1, setCopiedFormula1] = useState(false);
  const [copiedFormula2, setCopiedFormula2] = useState(false);
  const [copiedGeneratedLink, setCopiedGeneratedLink] = useState(false);

  if (!isSheetsModalOpen) return null;

  const simulatedLink = buildWhatsAppLink(inputH2, inputE2, countryCode);
  const formula1 = SHEETS_FORMULAS.limpiezaNumero('H2', countryCode);
  const formula2 = SHEETS_FORMULAS.generadorEnlace('M2', 'E2');

  const handleCopy = (text: string, type: 'f1' | 'f2' | 'link') => {
    navigator.clipboard.writeText(text);
    if (type === 'f1') {
      setCopiedFormula1(true);
      setTimeout(() => setCopiedFormula1(false), 2000);
    } else if (type === 'f2') {
      setCopiedFormula2(true);
      setTimeout(() => setCopiedFormula2(false), 2000);
    } else {
      setCopiedGeneratedLink(true);
      setTimeout(() => setCopiedGeneratedLink(false), 2000);
    }
  };

  const handleTestLink = () => {
    if (simulatedLink.fullUrl) {
      window.open(simulatedLink.fullUrl, '_blank');
    }
  };

  const leadersCount = profiles.filter((p) => p.chapterId === 'lideres-comunales').length;
  const businessCount = profiles.length - leadersCount;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div
        className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-stone-200 my-8 text-[#2B2B2B] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header in Brand Red with Shield Logo */}
        <div className="bg-[#C8102E] text-white px-6 py-5 flex items-center justify-between border-b border-[#8E1220]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shrink-0 bg-white shadow-xs">
              <img
                src="/assets/aistudio/IMG-20261104-WA0003_849a84ef.jpg"
                alt="Logo Escudo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-xl font-extrabold">
                  Estructuración Excel, Google Sheets & Glide
                </h2>
                <span className="hidden sm:inline text-[11px] font-bold text-[#C8102E] bg-white px-2 py-0.5 rounded-full">
                  Emprendimiento & Líderes Comunales
                </span>
              </div>
              <p className="text-xs text-white/90 mt-0.5">
                Generador automático de WhatsApp, limpieza de teléfono y ajuste de hojas para la comunidad.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSheetsModalOpen(false)}
            className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-[#F5F5F5] border-b border-stone-200 px-6 flex items-center gap-2 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'simulator'
                ? 'border-[#C8102E] text-[#C8102E] bg-white'
                : 'border-transparent text-stone-600 hover:text-[#C8102E]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simulador de Enlaces en Vivo</span>
          </button>

          <button
            onClick={() => setActiveTab('lideres')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'lideres'
                ? 'border-[#C8102E] text-[#C8102E] bg-white'
                : 'border-transparent text-stone-600 hover:text-[#C8102E]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Hoja de Líderes Comunales (Excel)</span>
          </button>

          <button
            onClick={() => setActiveTab('formulas')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'formulas'
                ? 'border-[#C8102E] text-[#C8102E] bg-white'
                : 'border-transparent text-stone-600 hover:text-[#C8102E]'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>Fórmulas Sheets (H2, M2, N2)</span>
          </button>

          <button
            onClick={() => setActiveTab('glide')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'glide'
                ? 'border-[#C8102E] text-[#C8102E] bg-white'
                : 'border-transparent text-stone-600 hover:text-[#C8102E]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Configuración en Glide</span>
          </button>

          <button
            onClick={() => setActiveTab('reference')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'reference'
                ? 'border-[#C8102E] text-[#C8102E] bg-white'
                : 'border-transparent text-stone-600 hover:text-[#C8102E]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Guía Original Subida</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 max-h-[calc(85vh-10rem)] overflow-y-auto space-y-6">
          {/* TAB 1: SIMULATOR */}
          {activeTab === 'simulator' && (
            <div className="space-y-6">
              <div className="bg-[#C8102E]/5 border border-[#C8102E]/20 rounded-2xl p-4 text-xs text-[#2B2B2B]">
                <p className="font-bold text-[#C8102E] flex items-center gap-1.5 mb-1 text-sm">
                  <Info className="w-4 h-4 text-[#C8102E]" />
                  Simulación de Fórmulas y Enlaces para la Comunidad
                </p>
                <p className="leading-relaxed">
                  Prueba ingresando cualquier formato de número en la <strong>Celda H2</strong> (ej. 8888-8888 o con espacios) y el nombre de un emprendimiento u organización comunal en la <strong>Celda E2</strong>. Se limpiará con el código de Costa Rica (+506) y generará el enlace que Glide abrirá en WhatsApp con tu botón rojo.
                </p>
              </div>

              {/* Input Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                    Celda H2 (Número ingresado):
                  </label>
                  <input
                    type="text"
                    value={inputH2}
                    onChange={(e) => setInputH2(e.target.value)}
                    placeholder="ej. 8888-8888"
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-sm font-mono focus:outline-none focus:border-[#C8102E]"
                  />
                  <span className="text-[11px] text-stone-500 mt-0.5 block">
                    Admite guiones, espacios y paréntesis
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                    Celda E2 (Nombre Negocio u Organización):
                  </label>
                  <input
                    type="text"
                    value={inputE2}
                    onChange={(e) => setInputE2(e.target.value)}
                    placeholder="ej. Soda El Mirador / ADI Santa Teresita"
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-sm font-medium focus:outline-none focus:border-[#C8102E]"
                  />
                  <span className="text-[11px] text-stone-500 mt-0.5 block">
                    Se colocará entre asteriscos *negrita* en WhatsApp
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                    Código de País (+506 Costa Rica):
                  </label>
                  <input
                    type="text"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    placeholder="506"
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-sm font-mono focus:outline-none focus:border-[#C8102E]"
                  />
                  <span className="text-[11px] text-stone-500 mt-0.5 block">
                    Por defecto 506
                  </span>
                </div>
              </div>

              {/* Output Table Representation */}
              <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-2xs">
                <div className="bg-[#2B2B2B] text-white text-xs font-semibold px-4 py-2.5 flex items-center justify-between">
                  <span>Resultado generado en la Hoja de Cálculo:</span>
                  <span className="text-white bg-[#C8102E] font-mono text-[10px] px-2 py-0.5 rounded-full font-bold">
                    Listo para Glide
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-stone-50 border-b border-stone-200 text-[#2B2B2B] font-bold uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-2.5">Celda H2 (Ingresado)</th>
                        <th className="px-4 py-2.5">Celda E2 (Nombre)</th>
                        <th className="px-4 py-2.5 bg-[#C8102E]/5 text-[#C8102E]">
                          Celda M2 (Número Limpio)
                        </th>
                        <th className="px-4 py-2.5 bg-stone-100 text-[#2B2B2B]">
                          Celda N2 (Enlace_WhatsApp generado)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200 font-mono">
                      <tr className="bg-white">
                        <td className="px-4 py-3 text-[#2B2B2B]">{inputH2 || '—'}</td>
                        <td className="px-4 py-3 font-sans font-bold text-[#2B2B2B]">
                          {inputE2 || '—'}
                        </td>
                        <td className="px-4 py-3 bg-[#C8102E]/5 text-[#C8102E] font-bold">
                          {simulatedLink.cleanNumber || '—'}
                        </td>
                        <td className="px-4 py-3 bg-stone-50 text-stone-700 max-w-xs truncate">
                          {simulatedLink.fullUrl || '—'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* WhatsApp Action with Red Button */}
              <div className="p-4 bg-white border border-stone-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                <div className="min-w-0">
                  <span className="text-xs font-bold text-[#C8102E] block">
                    Mensaje que se redacta en WhatsApp automáticamente:
                  </span>
                  <p className="text-xs text-[#2B2B2B] font-medium italic mt-0.5 truncate">
                    "Hola, vi *{inputE2 || 'Nombre'}* en la app MiBarrio y quisiera consultar sobre sus servicios."
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleCopy(simulatedLink.fullUrl, 'link')}
                    className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-[#2B2B2B] text-xs font-semibold rounded-xl transition-colors"
                  >
                    {copiedGeneratedLink ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#C8102E]" />
                        <span>¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-stone-600" />
                        <span>Copiar Enlace</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleTestLink}
                    disabled={!simulatedLink.fullUrl}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#C8102E] hover:bg-[#8E1220] active:scale-95 text-white text-xs font-bold rounded-xl shadow-xs transition-all disabled:opacity-50"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Escribir por WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Export Full Directory Database to Sheets */}
              <div className="pt-2 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-xs font-bold text-[#2B2B2B]">
                    Exportar Base de Datos Completa ({profiles.length} fichas: {businessCount} emprendimientos + {leadersCount} líderes comunales)
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    Descarga un archivo CSV listo para importar en Excel o Google Sheets con las dos categorías.
                  </p>
                </div>

                <button
                  onClick={exportToGoogleSheetsCSV}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#C8102E] hover:bg-[#8E1220] active:scale-95 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Descargar CSV para Excel / Sheets</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: HOJA DE LÍDERES COMUNALES */}
          {activeTab === 'lideres' && (
            <div className="space-y-6">
              <div className="bg-[#C8102E]/5 border border-[#C8102E]/20 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#C8102E]" />
                  <h3 className="text-sm font-bold text-[#2B2B2B]">
                    Estructura de la Hoja de Líderes Comunales para Excel / Google Sheets
                  </h3>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Para que tu app en Glide tenga tanto emprendedores como dirigentes comunales organizados, la hoja incluye las siguientes columnas estándar:
                </p>
              </div>

              <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-2xs">
                <div className="bg-stone-50 px-4 py-3 border-b border-stone-200">
                  <h4 className="text-xs font-bold text-[#2B2B2B]">
                    Columnas recomendadas para la Hoja "Lideres_Comunales":
                  </h4>
                </div>
                <div className="p-4 space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                      <span className="font-bold text-[#C8102E] block mb-1">
                        1. Nombre_Lider & Organizacion (Col E)
                      </span>
                      <p className="text-[11px] text-stone-600">
                        Ej: Don Hernán Solano Valverde - Asociación de Desarrollo Integral (ADI).
                      </p>
                    </div>

                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                      <span className="font-bold text-[#C8102E] block mb-1">
                        2. Cargo_o_Rol_Comunal
                      </span>
                      <p className="text-[11px] text-stone-600">
                        Ej: Presidente ADI, Gestor de Caminos, Comité de Deportes, Vocero Barrial.
                      </p>
                    </div>

                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                      <span className="font-bold text-[#C8102E] block mb-1">
                        3. Telefono_Contacto (Col H)
                      </span>
                      <p className="text-[11px] text-stone-600">
                        Teléfono ingresado por el líder para canalizar dudas de los vecinos.
                      </p>
                    </div>

                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                      <span className="font-bold text-[#C8102E] block mb-1">
                        4. Enlace_WhatsApp (Col N)
                      </span>
                      <p className="text-[11px] text-stone-600">
                        Generado con la fórmula para que el vecino le escriba directamente.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs text-stone-600 font-medium">
                  ¿Deseas descargar la plantilla con los datos actuales de los líderes y emprendimientos?
                </span>
                <button
                  onClick={exportToGoogleSheetsCSV}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#C8102E] hover:bg-[#8E1220] text-white text-xs font-bold rounded-xl transition-colors shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Descargar Archivo CSV</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: FORMULAS SHEETS */}
          {activeTab === 'formulas' && (
            <div className="space-y-6">
              {/* Formula 1 */}
              <div className="border border-stone-200 rounded-2xl p-5 bg-white shadow-2xs space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-[#2B2B2B] flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#C8102E] text-white flex items-center justify-center text-xs font-bold">
                        1
                      </span>
                      Limpieza de Número de WhatsApp
                    </h3>
                    <p className="text-xs text-stone-600 mt-1">
                      Si los usuarios escriben el número con espacios, guiones o paréntesis (ej. 8888-8888), esta fórmula elimina los caracteres no numéricos y le añade el código de país (ejemplo Costa Rica: 506).
                    </p>
                  </div>

                  <button
                    onClick={() => handleCopy(formula1, 'f1')}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-[#2B2B2B] text-xs font-semibold rounded-xl transition-colors shrink-0"
                  >
                    {copiedFormula1 ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#C8102E]" />
                        <span>¡Copiada!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-stone-600" />
                        <span>Copiar Fórmula</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-[11px] text-stone-500">
                  Coloca esta fórmula en la columna <strong className="text-stone-800">Numero_WhatsApp_Limpio</strong> (asumiendo que el número ingresado por el usuario está en la celda H2):
                </div>

                <div className="bg-[#2B2B2B] text-white p-3.5 rounded-xl font-mono text-xs overflow-x-auto selection:bg-[#C8102E] selection:text-white">
                  {formula1}
                </div>
              </div>

              {/* Formula 2 */}
              <div className="border border-stone-200 rounded-2xl p-5 bg-white shadow-2xs space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-[#2B2B2B] flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#C8102E] text-white flex items-center justify-center text-xs font-bold">
                        2
                      </span>
                      Generador Automático del Enlace de WhatsApp
                    </h3>
                    <p className="text-xs text-stone-600 mt-1">
                      Esta fórmula combina el número limpio con un mensaje personalizado codificado para URL (reemplaza espacios por <code className="bg-stone-100 px-1 py-0.5 rounded text-stone-800">%20</code> automáticamente para que el enlace no se rompa).
                    </p>
                  </div>

                  <button
                    onClick={() => handleCopy(formula2, 'f2')}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-[#2B2B2B] text-xs font-semibold rounded-xl transition-colors shrink-0"
                  >
                    {copiedFormula2 ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#C8102E]" />
                        <span>¡Copiada!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-stone-600" />
                        <span>Copiar Fórmula</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-[11px] text-stone-500">
                  Coloca esta fórmula en la columna <strong className="text-stone-800">Enlace_WhatsApp</strong> (asumiendo que el número limpio está en M2 y el nombre del negocio en E2):
                </div>

                <div className="bg-[#2B2B2B] text-white p-3.5 rounded-xl font-mono text-xs overflow-x-auto selection:bg-[#C8102E] selection:text-white">
                  {formula2}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: GLIDE CONFIG */}
          {activeTab === 'glide' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#C8102E]/5 border border-[#C8102E]/20 rounded-2xl text-xs space-y-2">
                <h4 className="font-bold text-[#C8102E] text-sm">
                  Configuración del Botón en Glide:
                </h4>
                <ol className="list-decimal list-inside space-y-1.5 text-stone-700">
                  <li>Agrega un componente <strong>Button</strong> en la pantalla de detalle del negocio.</li>
                  <li>En la propiedad <strong>Action</strong>, selecciona <strong>Open Link</strong>.</li>
                  <li>En la casilla <strong>Target / URL</strong>, selecciona la columna <strong>Enlace_WhatsApp</strong>.</li>
                </ol>
                <p className="text-stone-600 pt-1">
                  Al tocar el botón en el celular, la app abrirá directamente el chat de WhatsApp con el dueño del negocio o líder y el mensaje de saludo ya escrito.
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: REFERENCE IMAGE */}
          {activeTab === 'reference' && (
            <div className="space-y-4">
              <div className="border border-stone-200 rounded-2xl overflow-hidden bg-stone-100 p-2 max-h-[500px] overflow-y-auto">
                <img
                  src="/assets/aistudio/IMG-20261104-WA0002_cd4d533a.jpg"
                  alt="Guía Fórmulas WhatsApp Google Sheets Glide"
                  className="w-full object-contain mx-auto rounded-xl shadow-xs"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#F5F5F5] px-6 py-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-stone-500">
            Compatible con Google Sheets, Excel y Glide Apps
          </span>

          <button
            onClick={() => setIsSheetsModalOpen(false)}
            className="px-4 py-2 bg-[#2B2B2B] hover:bg-black text-white font-bold rounded-xl transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
