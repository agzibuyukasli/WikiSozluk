import { X, Send, Lightbulb, Tag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { toast } from "sonner@2.0.3";

interface OneriGonderSayfasiProps {
  isOpen: boolean;
  onClose: () => void;
  kullaniciRolu?: string;
}

export function OneriGonderSayfasi({ isOpen, onClose, kullaniciRolu = "Yeni Gelen" }: OneriGonderSayfasiProps) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [oneriMetni, setOneriMetni] = useState("");

  // Rol bazlı yetkilendirme
  const rolSeviyeleri: Record<string, number> = {
    "Yeni Gelen": 1,
    "Seyyah": 2,
    "Gezgin": 3,
    "Kaşif Meraklısı": 4,
    "Konya Bilgesi": 5
  };

  const oneriGonderebilirMi = () => {
    const seviye = rolSeviyeleri[kullaniciRolu] || 0;
    return seviye >= 2; // Seyyah (2) ve üstü
  };

  const kategoriler = [
    "Akademik Destek",
    "Sosyal Yaşam",
    "Kariyer",
    "Keşif Rehberi",
    "Etkinlikler",
    "Yeme & İçme",
    "Spor",
    "Sanat & Kültür",
    "Diğer"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!oneriGonderebilirMi()) {
      toast.error("Öneri gönderme yetkiniz yok! 🔒", {
        description: `Öneri gönderebilmek için en az "Seyyah" seviyesinde olmalısınız. Şu anki rolünüz: ${kullaniciRolu}.`,
        duration: 5000,
      });
      return;
    }
    
    if (!selectedCategory) {
      toast.error("Lütfen bir kategori seçin!");
      return;
    }
    
    if (!oneriMetni.trim()) {
      toast.error("Lütfen öneri metnini giriniz!");
      return;
    }

    // Coin kazanma bildirimi
    toast.success("🎉 Tebrikler! +15 Coin Kazandınız", {
      description: "Öneriniz başarıyla gönderildi! Öneri ekibimiz en kısa sürede değerlendirecektir.",
      duration: 4000,
      style: {
        background: "linear-gradient(135deg, #cea273 0%, #fcedd3 100%)",
        border: "2px solid #cea273",
        color: "#102a6b",
      },
    });
    
    // Reset form
    setSelectedCategory("");
    setOneriMetni("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] md:w-full max-w-lg max-h-[92vh] md:max-h-[90vh] bg-white rounded-2xl md:rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header - Sabit */}
            <div className="flex-shrink-0 p-4 md:p-6 border-b border-neutral-200" style={{ background: '#102a6b' }}>
              <div className="flex items-center justify-between">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-2 md:gap-3"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center" style={{ background: '#cea273' }}>
                    <Lightbulb className="h-5 w-5 md:h-6 md:w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white text-lg md:text-xl">Yeni Kategori Önerisi</h3>
                    <p className="text-white/80 text-xs md:text-sm mt-0.5">Fikrini bizimle paylaş!</p>
                  </div>
                </motion.div>
                <motion.button
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-xl backdrop-blur-sm transition-colors"
                >
                  <X className="h-5 w-5 text-white" />
                </motion.button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Form */}
              <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4 md:space-y-6">
                {/* Rol Uyarısı */}
                {!oneriGonderebilirMi() && (
                  <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200"
                  >
                    <div className="flex items-start gap-2 md:gap-3">
                      <div className="p-1.5 md:p-2 bg-amber-100 rounded-lg">
                        <span className="text-xl md:text-2xl">🔒</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm md:text-base font-semibold text-amber-900 mb-1">Öneri Gönderme Yetkiniz Yok</h4>
                        <p className="text-xs md:text-sm text-amber-700 mb-1 md:mb-2">
                          Öneri gönderebilmek için <span className="font-semibold">"Seyyah"</span> seviyesine ulaşmalısınız.
                        </p>
                        <p className="text-xs text-amber-600">
                          💡 Şu anki rolünüz: <span className="font-semibold">{kullaniciRolu}</span> • Daha fazla aktivite gösterin!
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Kategori Seçimi */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className={!oneriGonderebilirMi() ? 'opacity-50 pointer-events-none' : ''}
                >
                  <label className="flex items-center gap-2 mb-2 md:mb-3 text-sm md:text-base text-neutral-800">
                    <Tag className="h-4 w-4 md:h-5 md:w-5" style={{ color: '#5990c0' }} />
                    <span>İlgili Kategori</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {kategoriler.map((kategori, index) => (
                      <motion.button
                        key={kategori}
                        type="button"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 + index * 0.03 }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setSelectedCategory(kategori)}
                        className={`p-2 md:p-3 rounded-lg md:rounded-xl text-xs md:text-sm transition-all border-2 ${
                          selectedCategory === kategori
                            ? "border-[#102a6b] shadow-md"
                            : "border-neutral-200 hover:border-[#5990c0]"
                        }`}
                        style={{
                          background: selectedCategory === kategori 
                            ? 'linear-gradient(135deg, #102a6b 0%, #5990c0 100%)'
                            : 'white',
                          color: selectedCategory === kategori ? 'white' : '#102a6b'
                        }}
                      >
                        {kategori}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Öneri Metni */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className={!oneriGonderebilirMi() ? 'opacity-50 pointer-events-none' : ''}
                >
                  <label className="flex items-center gap-2 mb-2 md:mb-3 text-sm md:text-base text-neutral-800">
                    <Lightbulb className="h-4 w-4 md:h-5 md:w-5" style={{ color: '#cea273' }} />
                    <span>Önerin</span>
                  </label>
                  <textarea
                    disabled={!oneriGonderebilirMi()}
                    value={oneriMetni}
                    onChange={(e) => setOneriMetni(e.target.value)}
                    placeholder="Eklemek istediğin yeni kategoriyi veya mevcut kategorilerle ilgili önerilerini buraya yaz..."
                    className="w-full h-28 md:h-32 p-3 md:p-4 rounded-xl border-2 border-neutral-200 focus:border-[#5990c0] focus:outline-none resize-none transition-colors text-sm md:text-base"
                    style={{ fontFamily: 'inherit' }}
                  />
                  <p className="text-xs text-neutral-500 mt-1 md:mt-2">
                    {oneriMetni.length} / 500 karakter
                  </p>
                </motion.div>

                {/* Gönder Butonu */}
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 md:py-4 rounded-xl text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #cea273 0%, #fcedd3 100%)' }}
                >
                  <Send className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="text-base md:text-lg">Öneriyi Gönder</span>
                </motion.button>

                {/* Info Footer */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.35 }}
                >
                  <div className="rounded-xl p-3 md:p-4 text-center text-xs md:text-sm" style={{ background: 'rgba(89, 144, 192, 0.1)' }}>
                    <p className="text-neutral-700">
                      💡 Tüm öneriler incelenir ve uygun olanlar sisteme eklenir.
                    </p>
                  </div>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
