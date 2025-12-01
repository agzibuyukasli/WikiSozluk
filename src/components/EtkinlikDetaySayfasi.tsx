import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, MapPin, Clock, Users, Share2, Heart, Smile, ThumbsUp, Star, Zap, PartyPopper, ExternalLink, Instagram, Twitter, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner@2.0.3";
import { EtkinlikKatilimFormu } from "./EtkinlikKatilimFormu";
import { PaylasmaModal } from "./PaylasmaModal";

interface Etkinlik {
  id: number;
  baslik: string;
  aciklama: string;
  detay: string;
  tarih: string;
  saat: string;
  konum: string;
  konumDetay: string;
  kategori: string;
  organizator: string;
  katilimciSayisi: number;
  maxKatilimci?: number;
  ucret: string;
  kapakGorseli: string;
  etiketler?: string[];
  isSocialResponsibility?: boolean;
  iletisim?: {
    telefon?: string;
    email?: string;
    instagram?: string;
    twitter?: string;
  };
}

interface EtkinlikDetaySayfasiProps {
  etkinlik: Etkinlik;
  onClose: () => void;
  onKayitOl?: () => void;
}

export function EtkinlikDetaySayfasi({ etkinlik, onClose, onKayitOl }: EtkinlikDetaySayfasiProps) {
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [katilimFormuAcik, setKatilimFormuAcik] = useState(false);
  const [paylasmaModalAcik, setPaylasmaModalAcik] = useState(false);
  const [emojiCounts, setEmojiCounts] = useState({
    "❤️": 142,
    "😍": 89,
    "🔥": 67,
    "👍": 124,
    "⭐": 53,
    "🎉": 98,
  });

  const emojiler = [
    { emoji: "❤️", label: "Sevdim", icon: Heart },
    { emoji: "😍", label: "Harika", icon: Smile },
    { emoji: "🔥", label: "Muhteşem", icon: Zap },
    { emoji: "👍", label: "Beğendim", icon: ThumbsUp },
    { emoji: "⭐", label: "Favorim", icon: Star },
    { emoji: "🎉", label: "Heyecanlıyım", icon: PartyPopper },
  ];

  const handleEmojiClick = (emoji: string) => {
    if (selectedEmoji === emoji) {
      setSelectedEmoji(null);
      setEmojiCounts(prev => ({
        ...prev,
        [emoji]: prev[emoji as keyof typeof prev] - 1
      }));
      toast.success("Reaksiyonun geri alındı");
    } else {
      if (selectedEmoji) {
        setEmojiCounts(prev => ({
          ...prev,
          [selectedEmoji]: prev[selectedEmoji as keyof typeof prev] - 1
        }));
      }
      setSelectedEmoji(emoji);
      setEmojiCounts(prev => ({
        ...prev,
        [emoji]: prev[emoji as keyof typeof prev] + 1
      }));
      toast.success("Reaksiyonun kaydedildi! +2 Coin");
    }
  };

  const handleShare = () => {
    setPaylasmaModalAcik(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="min-h-screen bg-gradient-to-br from-white via-[#28374a]/10 to-white dark:from-neutral-950 dark:via-[#1d2633]/20 dark:to-neutral-950"
    >
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800"
        >
          {/* Header with Cover Image */}
          <div className="relative h-72 overflow-hidden">
            <div
              className="absolute inset-0 bg-gradient-to-br from-[#1d2633] via-[#28374a] to-[#3d4f66]"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-9xl opacity-20">{etkinlik.kapakGorseli}</span>
            </div>
            
            {/* Back Button */}
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Geri</span>
            </motion.button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-all"
            >
              <Share2 className="w-5 h-5" />
            </button>

            {/* Category Badge */}
            <div className="absolute bottom-4 left-4 px-4 py-2 rounded-full bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm">
              <span className="text-sm text-[#1d2633] dark:text-[#3d4f66]" style={{ fontWeight: 600 }}>
                {etkinlik.kategori}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl text-[#1d2633] dark:text-white mb-4" style={{ fontWeight: 700 }}>
              {etkinlik.baslik}
            </h1>

            {/* Sosyal Sorumluluk Badge */}
            {etkinlik.isSocialResponsibility && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white mb-4">
                <Star className="w-4 h-4" />
                <span className="text-sm" style={{ fontWeight: 600 }}>Sosyal Sorumluluk Etkinliği</span>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-xs" style={{ fontWeight: 700 }}>2x Coin</span>
              </div>
            )}

            {/* Quick Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-[#1d2633]/10 to-[#28374a]/10 dark:bg-neutral-800">
                <Calendar className="w-5 h-5 text-[#1d2633] dark:text-[#3d4f66] mt-0.5" />
                <div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Tarih</p>
                  <p className="text-[#1d2633] dark:text-white" style={{ fontWeight: 600 }}>
                    {etkinlik.tarih}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-[#28374a]/10 to-[#3d4f66]/10 dark:bg-neutral-800">
                <Clock className="w-5 h-5 text-[#28374a] mt-0.5" />
                <div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Saat</p>
                  <p className="text-[#1d2633] dark:text-white" style={{ fontWeight: 600 }}>
                    {etkinlik.saat}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-[#1d2633]/10 to-[#28374a]/10 dark:bg-neutral-800">
                <MapPin className="w-5 h-5 text-[#1d2633] dark:text-[#3d4f66] mt-0.5" />
                <div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Konum</p>
                  <p className="text-[#1d2633] dark:text-white" style={{ fontWeight: 600 }}>
                    {etkinlik.konum}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    {etkinlik.konumDetay}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-[#3d4f66]/10 to-[#28374a]/10 dark:bg-neutral-800">
                <Users className="w-5 h-5 text-[#28374a] mt-0.5" />
                <div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Katılımcı</p>
                  <p className="text-[#1d2633] dark:text-white" style={{ fontWeight: 600 }}>
                    {etkinlik.katilimciSayisi} kişi
                    {etkinlik.maxKatilimci && (
                      <span className="text-sm text-neutral-500 dark:text-neutral-400"> / {etkinlik.maxKatilimci}</span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-xl text-[#1d2633] dark:text-white mb-3" style={{ fontWeight: 600 }}>
                Etkinlik Hakkında
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                {etkinlik.aciklama}
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                {etkinlik.detay}
              </p>
            </div>

            {/* Organizer & Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl border-2 border-[#1d2633]/20 dark:border-neutral-700">
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Organizatör</p>
                <p className="text-[#1d2633] dark:text-white" style={{ fontWeight: 600 }}>
                  {etkinlik.organizator}
                </p>
              </div>

              <div className="p-4 rounded-xl border-2 border-[#28374a]/20 dark:border-neutral-700">
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Ücret</p>
                <p className="text-[#28374a] dark:text-[#3d4f66]" style={{ fontWeight: 700, fontSize: '1.25rem' }}>
                  {etkinlik.ucret}
                </p>
              </div>
            </div>

            {/* Tags */}
            {etkinlik.etiketler && etkinlik.etiketler.length > 0 && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {etkinlik.etiketler.map((etiket, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-gradient-to-r from-[#1d2633]/10 to-[#28374a]/10 dark:bg-neutral-800 text-[#1d2633] dark:text-[#3d4f66] text-sm"
                  >
                    #{etiket}
                  </span>
                ))}
              </div>
            </div>
            )}

            {/* Contact Info */}
            {etkinlik.iletisim && (
              <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-800/50">
                <h3 className="text-lg text-[#1d2633] dark:text-white mb-3" style={{ fontWeight: 600 }}>
                  İletişim Bilgileri
                </h3>
                <div className="space-y-2">
                  {etkinlik.iletisim.telefon && (
                    <a href={`tel:${etkinlik.iletisim.telefon}`} className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 hover:text-[#1d2633] dark:hover:text-[#3d4f66] transition-colors">
                      <span className="text-sm">📞 {etkinlik.iletisim.telefon}</span>
                    </a>
                  )}
                  {etkinlik.iletisim.email && (
                    <a href={`mailto:${etkinlik.iletisim.email}`} className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 hover:text-[#1d2633] dark:hover:text-[#3d4f66] transition-colors">
                      <span className="text-sm">📧 {etkinlik.iletisim.email}</span>
                    </a>
                  )}
                  <div className="flex gap-3 mt-3">
                    {etkinlik.iletisim.instagram && (
                      <a
                        href={`https://instagram.com/${etkinlik.iletisim.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-gradient-to-br from-[#f58529]/10 via-[#dd2a7b]/10 to-[#8134af]/10 hover:from-[#f58529]/20 hover:via-[#dd2a7b]/20 hover:to-[#8134af]/20 text-[#dd2a7b] transition-all flex items-center gap-2"
                      >
                        <Instagram className="w-4 h-4" />
                        <span className="text-sm">Instagram</span>
                      </a>
                    )}
                    {etkinlik.iletisim.twitter && (
                      <a
                        href={`https://twitter.com/${etkinlik.iletisim.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2] transition-all flex items-center gap-2"
                      >
                        <Twitter className="w-4 h-4" />
                        <span className="text-sm">Twitter</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Emoji Reactions */}
            <div className="border-t-2 border-neutral-200 dark:border-neutral-800 pt-6">
              <h3 className="text-xl text-[#1d2633] dark:text-white mb-4" style={{ fontWeight: 600 }}>
                Bu etkinlik hakkında ne düşünüyorsun?
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {emojiler.map(({ emoji, label, icon: Icon }) => (
                  <motion.button
                    key={emoji}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEmojiClick(emoji)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedEmoji === emoji
                        ? "border-[#1d2633] dark:border-[#3d4f66] bg-gradient-to-br from-[#1d2633]/20 to-[#28374a]/20 dark:from-[#1d2633]/30 dark:to-[#28374a]/30"
                        : "border-neutral-200 dark:border-neutral-700 hover:border-[#28374a] dark:hover:border-[#28374a]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{emoji}</span>
                      <div className="flex-1 text-left">
                        <p className={`text-sm ${selectedEmoji === emoji ? "text-[#1d2633] dark:text-[#3d4f66]" : "text-neutral-700 dark:text-neutral-300"}`} style={{ fontWeight: 600 }}>
                          {label}
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          {emojiCounts[emoji as keyof typeof emojiCounts]} kişi
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setKatilimFormuAcik(true);
                }}
                className="py-4 rounded-xl bg-gradient-to-r from-[#1d2633] to-[#28374a] text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                style={{ fontWeight: 600, fontSize: '1.125rem' }}
              >
                <Users className="w-5 h-5" />
                <span>Katılacağım</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleShare}
                className="py-4 rounded-xl bg-gradient-to-r from-[#1d2633] to-[#28374a] text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                style={{ fontWeight: 600, fontSize: '1.125rem' }}
              >
                <Share2 className="w-5 h-5" />
                <span>Paylaş</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Katılım Formu Modal */}
      <AnimatePresence>
        {katilimFormuAcik && (
          <EtkinlikKatilimFormu
            onClose={() => setKatilimFormuAcik(false)}
            etkinlikBaslik={etkinlik.baslik}
            etkinlikTarih={etkinlik.tarih}
            etkinlikKonum={etkinlik.konum}
            isSocialResponsibility={etkinlik.isSocialResponsibility}
          />
        )}
      </AnimatePresence>

      {/* Paylaşma Modal */}
      <AnimatePresence>
        {paylasmaModalAcik && (
          <PaylasmaModal
            onClose={() => setPaylasmaModalAcik(false)}
            baslikAdi={etkinlik.baslik}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}