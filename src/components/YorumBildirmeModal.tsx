import { motion, AnimatePresence } from "motion/react";
import { X, Flag, AlertTriangle, MessageSquare, User as UserIcon, Ban, Zap } from "lucide-react";
import { useState } from "react";

interface YorumBildirmeModalProps {
  onClose: () => void;
  onGonder: (neden: string, aciklama: string) => void;
  yorumIcerik: string;
  yorumKullanici: string;
}

export function YorumBildirmeModal({ onClose, onGonder, yorumIcerik, yorumKullanici }: YorumBildirmeModalProps) {
  const [secilenNeden, setSecilenNeden] = useState<string>("");
  const [aciklama, setAciklama] = useState("");

  const bildirimNedenleri = [
    {
      id: "spam",
      baslik: "Spam veya Reklam",
      aciklama: "İstenmeyen ticari içerik veya tekrarlayan mesajlar",
      ikon: Zap,
    },
    {
      id: "hakaret",
      baslik: "Hakaret veya Küfür",
      aciklama: "Kaba dil kullanımı veya saldırgan ifadeler",
      ikon: Ban,
    },
    {
      id: "yanlis-bilgi",
      baslik: "Yanlış Bilgi",
      aciklama: "Doğru olmayan veya yanıltıcı bilgiler içeriyor",
      ikon: AlertTriangle,
    },
    {
      id: "konuyla-ilgisiz",
      baslik: "Konuyla İlgisiz",
      aciklama: "Başlıkla alakası olmayan içerik",
      ikon: MessageSquare,
    },
    {
      id: "diger",
      baslik: "Diğer",
      aciklama: "Yukarıdaki kategorilere girmeyen bir sorun",
      ikon: Flag,
    }
  ];

  const handleGonder = () => {
    if (!secilenNeden) {
      return;
    }
    onGonder(secilenNeden, aciklama);
  };

  const getRenkSinifi = (renk: string) => {
    const renkler: Record<string, string> = {
      orange: "border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20 hover:border-orange-400 dark:hover:border-orange-600",
      red: "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 hover:border-red-400 dark:hover:border-red-600",
      yellow: "border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20 hover:border-yellow-400 dark:hover:border-yellow-600",
      blue: "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 hover:border-blue-400 dark:hover:border-blue-600",
      gray: "border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600"
    };
    return renkler[renk] || renkler.gray;
  };

  const getSecilenRenk = (renk: string) => {
    const renkler: Record<string, string> = {
      orange: "border-orange-500 dark:border-orange-500 bg-orange-100 dark:bg-orange-900/40",
      red: "border-red-500 dark:border-red-500 bg-red-100 dark:bg-red-900/40",
      yellow: "border-yellow-500 dark:border-yellow-500 bg-yellow-100 dark:bg-yellow-900/40",
      blue: "border-blue-500 dark:border-blue-500 bg-blue-100 dark:bg-blue-900/40",
      gray: "border-neutral-500 dark:border-neutral-400 bg-neutral-100 dark:bg-neutral-700"
    };
    return renkler[renk] || renkler.gray;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-2 sm:p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-[#2A4461] rounded-2xl sm:rounded-3xl shadow-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden border border-neutral-200 dark:border-[#4A6A8A]/30 flex flex-col"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-[#2A4461] border-b border-neutral-200 dark:border-[#4A6A8A]/30 p-4 sm:p-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-[#7B99B3]/20 dark:bg-[#4A6A8A]/30">
              <Flag className="w-5 h-5 sm:w-6 sm:h-6 text-[#395579] dark:text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl text-[#395579] dark:text-white">Yorumu Bildir</h2>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-300 hidden sm:block">Sorunu belirtmemize yardımcı olun</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-[#4A6A8A]/30 transition-colors"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600 dark:text-neutral-300" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto flex-1">
          {/* Bildirilen Yorum Önizleme */}
          <div className="p-3 sm:p-4 rounded-xl bg-neutral-50 dark:bg-[#395579]/20 border border-neutral-200 dark:border-[#4A6A8A]/30">
            <div className="flex items-center gap-2 mb-2">
              <UserIcon className="w-4 h-4 text-neutral-500 dark:text-neutral-300" />
              <span className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">{yorumKullanici}</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-200 line-clamp-3">{yorumIcerik}</p>
          </div>

          {/* Bildirim Nedeni Seçimi */}
          <div>
            <h3 className="text-base sm:text-lg text-[#395579] dark:text-white mb-3">Bildirim Nedeni</h3>
            <div className="space-y-2 sm:space-y-3">
              {bildirimNedenleri.map((neden) => {
                const Ikon = neden.ikon;
                const secilenMi = secilenNeden === neden.id;
                return (
                  <motion.button
                    key={neden.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSecilenNeden(neden.id)}
                    className={`w-full p-3 sm:p-4 rounded-xl border-2 transition-all text-left ${
                      secilenMi
                        ? 'border-[#395579] bg-[#395579]/10 dark:border-[#5A7A9A] dark:bg-[#4A6A8A]/20'
                        : 'border-neutral-200 bg-white dark:border-[#4A6A8A]/30 dark:bg-[#395579]/10 hover:border-[#7B99B3] dark:hover:border-[#5A7A9A]'
                    }`}
                  >
                    <div className="flex items-start gap-2 sm:gap-3">
                      <Ikon className={`w-4 h-4 sm:w-5 sm:h-5 mt-0.5 ${
                        secilenMi 
                          ? 'text-[#395579] dark:text-white' 
                          : 'text-neutral-600 dark:text-neutral-300'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm sm:text-base text-[#395579] dark:text-white">
                            {neden.baslik}
                          </span>
                          {secilenMi && (
                            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#395579] dark:bg-[#5A7A9A] flex items-center justify-center shrink-0 ml-2">
                              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-neutral-600 dark:text-neutral-300">{neden.aciklama}</p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Ek Açıklama (Opsiyonel) */}
          <div>
            <label className="block text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mb-2">
              Ek Açıklama (Opsiyonel)
            </label>
            <textarea
              value={aciklama}
              onChange={(e) => setAciklama(e.target.value)}
              placeholder="Sorunu daha detaylı açıklamak isterseniz buraya yazabilirsiniz..."
              rows={3}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl border border-neutral-200 dark:border-[#4A6A8A]/30 bg-white dark:bg-[#395579]/20 text-sm sm:text-base text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-400 focus:ring-2 focus:ring-[#395579] focus:border-transparent transition-all resize-none"
            />
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
              Detaylı açıklama, moderatörlerin sorunu daha hızlı çözmesine yardımcı olur
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white dark:bg-[#2A4461] border-t border-neutral-200 dark:border-[#4A6A8A]/30 p-4 sm:p-6 flex items-center justify-end gap-2 sm:gap-3">
          <button
            onClick={onClose}
            className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-neutral-100 dark:bg-[#395579]/30 text-sm sm:text-base text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-[#395579]/50 transition-all"
          >
            İptal
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGonder}
            disabled={!secilenNeden}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all ${
              secilenNeden
                ? "bg-[#395579] dark:bg-[#4A6A8A] text-white hover:bg-[#2A4461] dark:hover:bg-[#5A7A9A] hover:shadow-lg"
                : "bg-neutral-200 dark:bg-neutral-700 text-neutral-400 dark:text-neutral-500 cursor-not-allowed"
            }`}
          >
            <div className="flex items-center gap-2">
              <Flag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="text-sm sm:text-base">Bildirimi Gönder</span>
            </div>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}