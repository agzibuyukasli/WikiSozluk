import { motion } from "motion/react";
import { X, Flag, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner@2.0.3";

interface BildirmeFormuProps {
  onClose: () => void;
  baslikAdi?: string;
}

export function BildirmeFormu({ onClose, baslikAdi }: BildirmeFormuProps) {
  const [secilenNeden, setSecilenNeden] = useState("");
  const [aciklama, setAciklama] = useState("");

  const bildirimNedenleri = [
    { id: "spam", label: "Spam veya Yanıltıcı İçerik", icon: "🚫" },
    { id: "hakaret", label: "Hakaret veya Küfür", icon: "😤" },
    { id: "yanlis", label: "Yanlış veya Eksik Bilgi", icon: "❌" },
    { id: "uygunsuz", label: "Uygunsuz İçerik", icon: "⚠️" },
    { id: "telif", label: "Telif Hakkı İhlali", icon: "©️" },
    { id: "diger", label: "Diğer", icon: "📝" },
  ];

  const handleGonder = () => {
    if (!secilenNeden) {
      toast.error("Lütfen bir bildirim nedeni seçin");
      return;
    }

    if (!aciklama.trim()) {
      toast.error("Lütfen açıklama girin");
      return;
    }

    // Bildirimi gönder (backend entegrasyonu yapılacak)
    toast.success("Bildiriminiz alındı!", {
      description: "İnceleme ekibimiz en kısa sürede değerlendirecektir.",
      duration: 3000,
    });

    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-[#2A4461] rounded-2xl sm:rounded-3xl shadow-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden border border-neutral-200 dark:border-[#4A6A8A]/30 flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#395579] to-[#4A6A8A] p-4 sm:p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }} />
          </div>
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Flag className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h2 className="text-white text-base sm:text-xl">İçerik Bildir</h2>
                {baslikAdi && (
                  <p className="text-white/80 text-xs sm:text-sm mt-0.5 line-clamp-1">{baslikAdi}</p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors flex items-center justify-center text-white shrink-0"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {/* Uyarı */}
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 rounded-xl flex items-start gap-2 sm:gap-3">
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-200">
                <span className="font-semibold">Lütfen dikkat:</span> Yanlış veya kötü niyetli bildirimler hesabınızı olumsuz etkileyebilir.
              </p>
            </div>
          </div>

          {/* Bildirim Nedeni */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-sm sm:text-base text-[#395579] dark:text-white mb-2 sm:mb-3">
              Bildirim Nedeni <span className="text-[#395579]">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {bildirimNedenleri.map((neden) => (
                <motion.button
                  key={neden.id}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSecilenNeden(neden.id)}
                  className={`p-3 sm:p-4 rounded-xl border-2 transition-all text-left ${
                    secilenNeden === neden.id
                      ? "border-[#395579] bg-[#395579]/10 dark:bg-[#4A6A8A]/20"
                      : "border-neutral-200 dark:border-[#4A6A8A]/30 hover:border-[#7B99B3] dark:hover:border-[#5A7A9A]"
                  }`}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-xl sm:text-2xl">{neden.icon}</span>
                    <span className={`text-xs sm:text-sm ${
                      secilenNeden === neden.id
                        ? "text-[#395579] dark:text-white"
                        : "text-neutral-700 dark:text-neutral-300"
                    }`}>
                      {neden.label}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Açıklama */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-sm sm:text-base text-[#395579] dark:text-white mb-2 sm:mb-3">
              Açıklama <span className="text-[#395579]">*</span>
            </label>
            <textarea
              value={aciklama}
              onChange={(e) => setAciklama(e.target.value)}
              placeholder="Lütfen bildirdiğiniz içerikle ilgili detaylı açıklama yazın..."
              rows={4}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl border-2 border-neutral-200 dark:border-[#4A6A8A]/30 dark:bg-[#395579]/20 dark:text-white text-sm sm:text-base focus:border-[#395579] focus:outline-none focus:ring-2 focus:ring-[#395579]/20 transition-all resize-none"
            />
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
              Minimum 10 karakter
            </p>
          </div>

          {/* İpucu */}
          <div className="p-3 sm:p-4 bg-[#7B99B3]/10 dark:bg-[#4A6A8A]/20 border border-[#7B99B3]/30 dark:border-[#4A6A8A]/30 rounded-xl">
            <p className="text-xs sm:text-sm text-[#395579] dark:text-neutral-200">
              💡 <span className="font-semibold">İpucu:</span> Bildiriminiz gizli kalacak ve içerik sahibi bildirim yapan kişiyi göremeyecektir.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-neutral-50 dark:bg-[#2A4461] border-t border-neutral-200 dark:border-[#4A6A8A]/30 flex gap-2 sm:gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl border-2 border-neutral-300 dark:border-[#4A6A8A]/30 text-sm sm:text-base text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-[#395579]/30 transition-all"
          >
            İptal
          </button>
          <button
            onClick={handleGonder}
            className="flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl bg-gradient-to-r from-[#395579] to-[#4A6A8A] text-sm sm:text-base text-white hover:shadow-lg transition-all disabled:opacity-50"
            disabled={!secilenNeden || aciklama.trim().length < 10}
          >
            Bildir
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}