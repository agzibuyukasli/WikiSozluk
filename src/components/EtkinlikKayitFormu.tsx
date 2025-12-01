import { motion } from "motion/react";
import { X, User, Mail, Phone, MessageSquare, Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner@2.0.3";

interface EtkinlikKayitFormuProps {
  etkinlik: {
    id: number;
    baslik: string;
    tarih: string;
    konum: string;
  };
  onClose: () => void;
}

export function EtkinlikKayitFormu({ etkinlik, onClose }: EtkinlikKayitFormuProps) {
  const [formData, setFormData] = useState({
    adSoyad: "",
    email: "",
    telefon: "",
    notlar: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasyon
    if (!formData.adSoyad || !formData.email || !formData.telefon) {
      toast.error("Lütfen tüm zorunlu alanları doldurun!");
      return;
    }

    // Email validasyonu
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Geçerli bir e-posta adresi girin!");
      return;
    }

    // Telefon validasyonu
    const phoneRegex = /^[0-9]{10,11}$/;
    const cleanPhone = formData.telefon.replace(/\s/g, "");
    if (!phoneRegex.test(cleanPhone)) {
      toast.error("Geçerli bir telefon numarası girin! (10-11 haneli)");
      return;
    }

    setIsSubmitting(true);

    // Simüle edilmiş API çağrısı
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Burada gerçek bir API'ye POST request atılabilir
    // Örnek:
    // await fetch('/api/etkinlik-kayit', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     etkinlikId: etkinlik.id,
    //     ...formData
    //   })
    // });

    console.log("Etkinlik Kayıt Formu:", {
      etkinlikId: etkinlik.id,
      etkinlikAdi: etkinlik.baslik,
      ...formData,
      kayitTarihi: new Date().toISOString(),
    });

    setIsSubmitting(false);
    setIsSuccess(true);

    // Başarı mesajı
    toast.success("Etkinliğe kayıt oldunuz! +10 Coin", {
      description: "Katılım bilgileriniz organizatöre iletildi.",
    });

    // 2 saniye sonra formu kapat
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl max-w-md w-full p-8 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl text-[#102a6b] dark:text-white mb-2" style={{ fontWeight: 700 }}>
            Kayıt Başarılı!
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Etkinliğe kaydınız alınmıştır. Organizatör size kısa sürede ulaşacaktır.
          </p>
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#015185]/10 to-[#5990c0]/10 dark:bg-neutral-800">
            <p className="text-sm text-[#102a6b] dark:text-white" style={{ fontWeight: 600 }}>
              {etkinlik.baslik}
            </p>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
              {etkinlik.tarih} • {etkinlik.konum}
            </p>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto"
      onClick={onClose}
    >
      <div className="min-h-screen p-4 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative p-6 bg-gradient-to-r from-[#015185] to-[#5990c0]">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h2 className="text-2xl md:text-3xl text-white mb-2" style={{ fontWeight: 700 }}>
              Etkinliğe Katıl
            </h2>
            <p className="text-white/90">
              Katılım bilgilerinizi girin
            </p>
          </div>

          {/* Etkinlik Bilgisi */}
          <div className="p-6 bg-gradient-to-br from-[#fcedd3]/20 to-[#cea273]/10 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-700">
            <h3 className="text-lg text-[#102a6b] dark:text-white mb-1" style={{ fontWeight: 600 }}>
              {etkinlik.baslik}
            </h3>
            <div className="flex flex-wrap gap-3 text-sm text-neutral-600 dark:text-neutral-400">
              <span>{etkinlik.tarih}</span>
              <span>•</span>
              <span>{etkinlik.konum}</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Ad Soyad */}
            <div>
              <label htmlFor="adSoyad" className="flex items-center gap-2 text-[#102a6b] dark:text-white mb-2" style={{ fontWeight: 600 }}>
                <User className="w-4 h-4" />
                Ad Soyad <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="adSoyad"
                name="adSoyad"
                value={formData.adSoyad}
                onChange={handleChange}
                placeholder="Adınız ve soyadınız"
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:border-[#015185] dark:focus:border-[#5990c0] focus:outline-none transition-colors"
              />
            </div>

            {/* E-posta */}
            <div>
              <label htmlFor="email" className="flex items-center gap-2 text-[#102a6b] dark:text-white mb-2" style={{ fontWeight: 600 }}>
                <Mail className="w-4 h-4" />
                E-posta <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ornek@email.com"
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:border-[#015185] dark:focus:border-[#5990c0] focus:outline-none transition-colors"
              />
            </div>

            {/* Telefon */}
            <div>
              <label htmlFor="telefon" className="flex items-center gap-2 text-[#102a6b] dark:text-white mb-2" style={{ fontWeight: 600 }}>
                <Phone className="w-4 h-4" />
                Telefon <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="telefon"
                name="telefon"
                value={formData.telefon}
                onChange={handleChange}
                placeholder="5XX XXX XX XX"
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:border-[#015185] dark:focus:border-[#5990c0] focus:outline-none transition-colors"
              />
            </div>

            {/* Notlar */}
            <div>
              <label htmlFor="notlar" className="flex items-center gap-2 text-[#102a6b] dark:text-white mb-2" style={{ fontWeight: 600 }}>
                <MessageSquare className="w-4 h-4" />
                Ek Notlar <span className="text-xs text-neutral-500">(İsteğe bağlı)</span>
              </label>
              <textarea
                id="notlar"
                name="notlar"
                value={formData.notlar}
                onChange={handleChange}
                placeholder="Organizatöre iletmek istediğiniz özel notlar..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:border-[#015185] dark:focus:border-[#5990c0] focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Bilgilendirme */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-[#5990c0]/10 to-[#015185]/10 dark:bg-neutral-800 border border-[#5990c0]/30 dark:border-neutral-700">
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                <strong className="text-[#102a6b] dark:text-[#5990c0]">💡 Bilgi:</strong> Katılım bilgileriniz sadece etkinlik organizatörü ile paylaşılacaktır. Kayıt olduktan sonra 10 Coin kazanacaksınız.
              </p>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-xl border-2 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                style={{ fontWeight: 600 }}
              >
                İptal
              </button>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`flex-1 py-3 rounded-xl bg-gradient-to-r from-[#015185] to-[#5990c0] text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
                style={{ fontWeight: 600 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Kaydediliyor...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Katılımı Onayla</span>
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}
