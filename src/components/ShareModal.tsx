import React, { useState, useEffect, useRef } from 'react';
import { useDirectory } from '../context/DirectoryContext';
import {
  X,
  Share2,
  Copy,
  Check,
  QrCode,
  Download,
  MessageCircle,
  Facebook,
  Send,
  Mail,
  Smartphone,
  ExternalLink,
  ShieldCheck,
  Store,
  Sparkles
} from 'lucide-react';
import QRCode from 'qrcode';
import {
  getShareUrl,
  getAppShareMessage,
  getProfileShareMessage
} from '../utils/whatsapp';

export const ShareModal: React.FC = () => {
  const { isShareModalOpen, setIsShareModalOpen, shareTarget, setShareTarget } = useDirectory();

  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [shareMode, setShareMode] = useState<'profile' | 'app'>('app');
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [qrDownloading, setQrDownloading] = useState(false);

  useEffect(() => {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      setCanNativeShare(true);
    }
  }, []);

  useEffect(() => {
    if (shareTarget?.type === 'profile' && shareTarget.profile) {
      setShareMode('profile');
    } else {
      setShareMode('app');
    }
  }, [shareTarget]);

  const profile = shareTarget?.profile;
  const isProfileMode = shareMode === 'profile' && Boolean(profile);

  // Compute final share URL
  const currentShareUrl = getShareUrl(isProfileMode && profile ? profile.id : undefined);

  // Compute message
  const shareMessage = isProfileMode && profile
    ? getProfileShareMessage(
        profile.businessName,
        profile.jobTitle,
        `${profile.locality}`,
        profile.phone,
        currentShareUrl,
        profile.chapterId === 'lideres-comunales'
      )
    : getAppShareMessage(currentShareUrl);

  const shareTitle = isProfileMode && profile
    ? `${profile.businessName} - Emprendimiento y Líderes Comunales`
    : 'Emprendimiento y Líderes Comunales';

  // Generate QR Code data URL when currentShareUrl changes
  useEffect(() => {
    if (!isShareModalOpen) return;

    let isMounted = true;
    QRCode.toDataURL(currentShareUrl, {
      width: 400,
      margin: 2,
      color: {
        dark: '#2B2B2B',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'H'
    })
      .then((url) => {
        if (isMounted) setQrDataUrl(url);
      })
      .catch((err) => console.error('Error al generar QR:', err));

    return () => {
      isMounted = false;
    };
  }, [currentShareUrl, isShareModalOpen]);

  if (!isShareModalOpen) return null;

  // Actions
  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(currentShareUrl);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = currentShareUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopyMessage = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareMessage);
      }
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const handleWhatsAppShare = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
    window.open(waUrl, '_blank');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareMessage,
          url: currentShareUrl
        });
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('Error al compartir nativo:', err);
        }
      }
    } else {
      handleWhatsAppShare();
    }
  };

  const handleFacebookShare = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentShareUrl)}`;
    window.open(fbUrl, '_blank', 'width=600,height=400');
  };

  const handleTelegramShare = () => {
    const tgUrl = `https://t.me/share/url?url=${encodeURIComponent(currentShareUrl)}&text=${encodeURIComponent(
      isProfileMode && profile ? `¡Te recomiendo a ${profile.businessName}!` : 'Emprendimiento y Líderes Comunales'
    )}`;
    window.open(tgUrl, '_blank');
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(shareTitle);
    const body = encodeURIComponent(shareMessage);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_self');
  };

  const handleDownloadQR = () => {
    if (!qrDataUrl) return;
    setQrDownloading(true);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = 600;
      canvas.height = 740;

      if (!ctx) return;

      // Background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Top Red Brand Header
      ctx.fillStyle = '#C8102E';
      ctx.fillRect(0, 0, canvas.width, 100);

      // Title in Header
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 26px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Emprendimiento y Líderes Comunales', 300, 48);

      ctx.font = '16px sans-serif';
      ctx.fillText('Apoya lo local, conecta con tu comunidad', 300, 78);

      // Sub-banner if profile
      if (isProfileMode && profile) {
        ctx.fillStyle = '#2B2B2B';
        ctx.font = 'bold 22px sans-serif';
        ctx.fillText(profile.businessName, 300, 140);

        ctx.fillStyle = '#666666';
        ctx.font = '15px sans-serif';
        ctx.fillText(profile.jobTitle, 300, 168);
      } else {
        ctx.fillStyle = '#2B2B2B';
        ctx.font = 'bold 20px sans-serif';
        ctx.fillText('¡Escanea para acceder al Directorio Comunitario!', 300, 150);
      }

      // Draw QR Code centered
      const qrY = isProfileMode && profile ? 185 : 175;
      ctx.drawImage(img, 110, qrY, 380, 380);

      // Footer callout
      ctx.fillStyle = '#C8102E';
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText('📱 Escanea con tu cámara o WhatsApp', 300, qrY + 415);

      ctx.fillStyle = '#888888';
      ctx.font = '13px sans-serif';
      ctx.fillText(currentShareUrl, 300, qrY + 445);

      const downloadLink = document.createElement('a');
      const filename = isProfileMode && profile
        ? `QR_${profile.businessName.replace(/[^a-zA-Z0-9]/g, '_')}.png`
        : 'QR_Emprendimiento_y_Lideres_Comunales.png';

      downloadLink.download = filename;
      downloadLink.href = canvas.toDataURL('image/png');
      downloadLink.click();

      setQrDownloading(false);
    };

    img.src = qrDataUrl;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5"
    >
      <div
        className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-stone-200 my-8 animate-in fade-in zoom-in-95 duration-150 text-[#2B2B2B]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header in Brand Red #C8102E */}
        <div className="bg-[#C8102E] text-white p-5 flex items-center justify-between border-b border-[#8E1220]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white p-0.5 shrink-0 shadow-sm overflow-hidden">
              <img
                src="/assets/aistudio/IMG-20261104-WA0003_849a84ef.jpg"
                alt="Logo Escudo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <h3 id="share-modal-title" className="text-base sm:text-lg font-extrabold leading-tight">
                Compartir Directorio
              </h3>
              <p className="text-[11px] sm:text-xs text-white/90">
                Llega a más vecinos y apoya el comercio de la comunidad
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsShareModalOpen(false)}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 active:bg-[#8E1220] text-white transition-colors"
            title="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch if a specific profile was selected */}
        {shareTarget?.type === 'profile' && shareTarget.profile && (
          <div className="bg-stone-100 p-1.5 flex gap-1 border-b border-stone-200 text-xs">
            <button
              onClick={() => setShareMode('profile')}
              className={`flex-1 py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
                shareMode === 'profile'
                  ? 'bg-white text-[#C8102E] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span className="truncate">Ficha de {shareTarget.profile.businessName}</span>
            </button>
            <button
              onClick={() => setShareMode('app')}
              className={`flex-1 py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
                shareMode === 'app'
                  ? 'bg-white text-[#C8102E] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>App Completa</span>
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[calc(90vh-10rem)] overflow-y-auto">
          {/* Target preview card */}
          <div className="bg-[#F5F5F5] rounded-xl p-3.5 border border-stone-200 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-white border border-stone-300 shrink-0">
              {isProfileMode && profile ? (
                <img
                  src={profile.portfolioImages[0] || profile.avatarUrl}
                  alt={profile.businessName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src="/assets/aistudio/IMG-20261104-WA0003_849a84ef.jpg"
                  alt="App Escudo"
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold text-[#C8102E] uppercase tracking-wide">
                {isProfileMode && profile ? 'Compartiendo Ficha Individual' : 'Compartiendo Directorio General'}
              </span>
              <h4 className="text-sm font-bold text-[#2B2B2B] truncate">
                {isProfileMode && profile ? profile.businessName : 'Emprendimiento y Líderes Comunales'}
              </h4>
              <p className="text-xs text-stone-500 truncate">
                {isProfileMode && profile ? profile.jobTitle : 'Apoya lo local, conecta con tu comunidad'}
              </p>
            </div>
          </div>

          {/* Primary Action 1: Official WhatsApp Share Button in SOLID RED with WHITE letters */}
          <button
            type="button"
            onClick={handleWhatsAppShare}
            className="w-full flex items-center justify-center gap-2.5 bg-[#C8102E] hover:bg-[#8E1220] active:scale-98 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all text-sm sm:text-base"
          >
            <MessageCircle className="w-5 h-5 fill-white stroke-[#C8102E]" />
            <span>Compartir por WhatsApp</span>
          </button>

          {/* Native Mobile Share Sheet if supported */}
          {canNativeShare && (
            <button
              type="button"
              onClick={handleNativeShare}
              className="w-full flex items-center justify-center gap-2 bg-[#2B2B2B] hover:bg-black active:scale-98 text-white font-semibold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-all"
            >
              <Smartphone className="w-4 h-4" />
              <span>Compartir con otras aplicaciones del celular</span>
            </button>
          )}

          {/* 1-Click Copy Link Box */}
          <div>
            <label className="block text-xs font-bold text-[#2B2B2B] mb-1.5">
              Enlace directo para enviar o pegar:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={currentShareUrl}
                className="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-[#2B2B2B] font-mono truncate focus:outline-none"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  copiedLink
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#F5F5F5] hover:bg-stone-200 text-[#2B2B2B] border border-stone-300'
                }`}
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>
            {copiedLink && (
              <p className="text-[11px] text-emerald-700 font-medium mt-1">
                ✓ Enlace copiado al portapapeles. ¡Pégalo donde gustes!
              </p>
            )}
          </div>

          {/* QR Code Section */}
          <div className="bg-[#F5F5F5] rounded-2xl p-4 border border-stone-200 text-center space-y-3">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#2B2B2B]">
              <QrCode className="w-4 h-4 text-[#C8102E]" />
              <span>Código QR Comunitario</span>
            </div>

            <p className="text-[11px] text-stone-500">
              Ideal para que tus clientes o vecinos lo escaneen directo con la cámara de su teléfono:
            </p>

            <div className="flex justify-center">
              <div className="p-3 bg-white rounded-2xl shadow-sm border border-stone-200 inline-block">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="Código QR para compartir"
                    className="w-44 h-44 sm:w-48 sm:h-48 object-contain"
                  />
                ) : (
                  <div className="w-44 h-44 flex items-center justify-center text-xs text-stone-400">
                    Generando QR...
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleDownloadQR}
                disabled={!qrDataUrl || qrDownloading}
                className="flex items-center gap-1.5 bg-white hover:bg-stone-100 text-[#2B2B2B] border border-stone-300 text-xs font-bold px-3 py-1.5 rounded-xl shadow-2xs transition-colors"
                title="Descargar imagen PNG para imprimir en volantes o mostrar en el local"
              >
                <Download className="w-3.5 h-3.5 text-[#C8102E]" />
                <span>{qrDownloading ? 'Generando imagen...' : 'Descargar QR para Imprimir'}</span>
              </button>
            </div>
          </div>

          {/* Social Channels Row */}
          <div>
            <label className="block text-xs font-bold text-[#2B2B2B] mb-2">
              Compartir también en:
            </label>
            <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
              <button
                type="button"
                onClick={handleFacebookShare}
                className="flex flex-col items-center justify-center gap-1 p-2 bg-[#F5F5F5] hover:bg-blue-50 text-[#2B2B2B] hover:text-[#1877F2] rounded-xl border border-stone-200 transition-colors"
              >
                <Facebook className="w-5 h-5 text-[#1877F2]" />
                <span>Facebook</span>
              </button>

              <button
                type="button"
                onClick={handleTelegramShare}
                className="flex flex-col items-center justify-center gap-1 p-2 bg-[#F5F5F5] hover:bg-sky-50 text-[#2B2B2B] hover:text-[#229ED9] rounded-xl border border-stone-200 transition-colors"
              >
                <Send className="w-5 h-5 text-[#229ED9]" />
                <span>Telegram</span>
              </button>

              <button
                type="button"
                onClick={handleEmailShare}
                className="flex flex-col items-center justify-center gap-1 p-2 bg-[#F5F5F5] hover:bg-amber-50 text-[#2B2B2B] hover:text-amber-800 rounded-xl border border-stone-200 transition-colors"
              >
                <Mail className="w-5 h-5 text-[#C8102E]" />
                <span>Correo</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  window.open(`sms:?body=${encodeURIComponent(shareMessage)}`, '_self');
                }}
                className="flex flex-col items-center justify-center gap-1 p-2 bg-[#F5F5F5] hover:bg-emerald-50 text-[#2B2B2B] hover:text-emerald-800 rounded-xl border border-stone-200 transition-colors"
              >
                <Smartphone className="w-5 h-5 text-emerald-600" />
                <span>SMS</span>
              </button>
            </div>
          </div>

          {/* Message Preview Box */}
          <div className="bg-stone-50 rounded-xl p-3 border border-stone-200 text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-[#2B2B2B] text-[11px] uppercase tracking-wide">
                Mensaje predefinido:
              </span>
              <button
                type="button"
                onClick={handleCopyMessage}
                className="text-[11px] text-[#C8102E] hover:text-[#8E1220] font-semibold flex items-center gap-1"
              >
                {copiedMessage ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedMessage ? 'Copiado' : 'Copiar texto'}</span>
              </button>
            </div>
            <p className="text-stone-600 text-[11px] whitespace-pre-line leading-relaxed font-sans bg-white p-2.5 rounded-lg border border-stone-200/80">
              {shareMessage}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#F5F5F5] border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <span>Juntos fortalecemos nuestra comunidad</span>
          <button
            type="button"
            onClick={() => setIsShareModalOpen(false)}
            className="font-bold text-[#2B2B2B] hover:text-[#C8102E] px-3 py-1.5 rounded-lg hover:bg-stone-200 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
