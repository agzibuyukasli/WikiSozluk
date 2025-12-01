import { motion } from "motion/react";
import { X, User, Mail, Phone, Calendar, Users, CheckCircle, Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner@2.0.3";

interface EtkinlikKatilimFormuProps {
  onClose: () => void;
  etkinlikBaslik: string;
  etkinlikTarih: string;
  etkinlikKonum: string;
  isSocialResponsibility?: boolean;
}

export function EtkinlikKatilimFormu({ 
  onClose, 
  etkinlikBaslik, 
  etkinlikTarih,
  etkinlikKonum,
  isSocialResponsibility = false
}: EtkinlikKatilimFormuProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    ad: "",
    soyad: "",
    email: "",
    telefon: "",
    ogrenciNo: "",
    universite: "",
    bolum: "",
    notlar: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Doğrulama
    if (!formData.ad || !formData.soyad || !formData.email || !formData.telefon) {
      toast.error("Lütfen zorunlu alanları doldurun");
      return;
    }

    // Email doğrulama
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Geçerli bir email adresi girin");
      return;
    }

    // Telefon doğrulama (basit)
    if (formData.telefon.length < 10) {
      toast.error("Geçerli bir telefon numarası girin");
      return;
    }

    setLoading(true);

    // Simüle edilmiş kayıt işlemi
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      
      // localStorage'a kaydet
      const kayitlar = JSON.parse(localStorage.getItem('etkinlikKayitlari') || '[]');
      kayitlar.push({
        ...formData,
        etkinlikBaslik,
        etkinlikTarih,
        etkinlikKonum,
        kayitTarihi: new Date().toISOString(),
      });
      localStorage.setItem('etkinlikKayitlari', JSON.stringify(kayitlar));
      
      const coinKazanc = isSocialResponsibility ? 20 : 10;
      toast.success(`🎉 Etkinliğe başarıyla kaydoldunuz! +${coinKazanc} Coin${isSocialResponsibility ? ' (2x Bonus!)' : ''}`, {
        duration: 4000,
      });
    }, 1500);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 20 }}
          className="bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl max-w-md w-full p-8 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 mx-auto mb-6 flex items-center justify-center"
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>
          
          <h2 className="text-2xl text-[#102a6b] dark:text-white mb-3">
            Kayıt Başarılı!
          </h2>
          
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            <strong>{etkinlikBaslik}</strong> etkinliğine başarıyla kaydoldunuz. 
            Size bir onay e-postası gönderdik.
          </p>

          <div className={`rounded-xl p-4 mb-6 ${isSocialResponsibility ? 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30' : 'bg-gradient-to-br from-[#fcedd3]/30 to-[#cea273]/20'}`}>
            <p className={`text-sm ${isSocialResponsibility ? 'text-green-700 dark:text-green-400' : 'text-[#102a6b] dark:text-neutral-300'}`}>
              ✨ <strong>+{isSocialResponsibility ? '20' : '10'} Coin</strong> kazandınız!
              {isSocialResponsibility && <span className="block mt-1 text-xs">🌟 Sosyal Sorumluluk Bonusu (2x)</span>}
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#015185] to-[#5990c0] text-white hover:shadow-lg transition-all"
          >
            Tamam
          </motion.button>
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
          <div className="relative bg-gradient-to-r from-[#015185] via-[#5990c0] to-[#cea273] p-6">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-white">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-6 h-6" />
                <h2 className="text-2xl">Etkinlik Kayıt Formu</h2>
              </div>
              <p className="text-white/90 text-sm">{etkinlikBaslik}</p>
              <div className="flex items-center gap-4 mt-3 text-sm text-white/80">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {etkinlikTarih}
                </span>
                {isSocialResponsibility && (
                  <span className="px-3 py-1 rounded-full bg-green-500/30 backdrop-blur-sm border border-green-400/30 text-white text-xs flex items-center gap-1">
                    ✨ 2x Coin Kazanın
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Ad Soyad */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#102a6b] dark:text-white mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Ad <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="ad"
                  value={formData.ad}
                  onChange={handleInputChange}
                  placeholder="Adınız"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#015185] dark:focus:ring-[#5990c0] transition-all"
                />
              </div>

              <div>
                <label className="block text-[#102a6b] dark:text-white mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Soyad <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="soyad"
                  value={formData.soyad}
                  onChange={handleInputChange}
                  placeholder="Soyadınız"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#015185] dark:focus:ring-[#5990c0] transition-all"
                />
              </div>
            </div>

            {/* Email ve Telefon */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#102a6b] dark:text-white mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  E-posta <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="ornek@email.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#015185] dark:focus:ring-[#5990c0] transition-all"
                />
              </div>

              <div>
                <label className="block text-[#102a6b] dark:text-white mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Telefon <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="telefon"
                  value={formData.telefon}
                  onChange={handleInputChange}
                  placeholder="05XX XXX XX XX"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#015185] dark:focus:ring-[#5990c0] transition-all"
                />
              </div>
            </div>

            {/* Öğrenci Bilgileri */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#102a6b] dark:text-white mb-2">
                  Öğrenci Numarası
                </label>
                <input
                  type="text"
                  name="ogrenciNo"
                  value={formData.ogrenciNo}
                  onChange={handleInputChange}
                  placeholder="Öğrenci numaranız"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#015185] dark:focus:ring-[#5990c0] transition-all"
                />
              </div>

              <div>
                <label className="block text-[#102a6b] dark:text-white mb-2">
                  Üniversite
                </label>
                <select
                  name="universite"
                  value={formData.universite}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#015185] dark:focus:ring-[#5990c0] transition-all"
                >
                  <option value="">Seçiniz</option>
                  <option value="Selçuk Üniversitesi">Selçuk Üniversitesi</option>
                  <option value="Necmettin Erbakan Üniversitesi">Necmettin Erbakan Üniversitesi</option>
                  <option value="KTO Karatay Üniversitesi">KTO Karatay Üniversitesi</option>
                  <option value="Konya Teknik Üniversitesi">Konya Teknik Üniversitesi</option>
                  <option value="Diğer">Diğer</option>
                </select>
              </div>
            </div>

            {/* Bölüm */}
            <div>
              <label className="block text-[#102a6b] dark:text-white mb-2">
                Bölüm
              </label>
              <input
                type="text"
                name="bolum"
                value={formData.bolum}
                onChange={handleInputChange}
                placeholder="Bölümünüz"
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#015185] dark:focus:ring-[#5990c0] transition-all"
              />
            </div>

            {/* Notlar */}
            <div>
              <label className="block text-[#102a6b] dark:text-white mb-2">
                Ek Notlar (İsteğe Bağlı)
              </label>
              <textarea
                name="notlar"
                value={formData.notlar}
                onChange={handleInputChange}
                placeholder="Belirtmek istediğiniz özel durumlar..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#015185] dark:focus:ring-[#5990c0] transition-all resize-none"
              />
            </div>

            {/* Bilgilendirme */}
            <div className="bg-gradient-to-br from-[#fcedd3]/30 to-[#cea273]/20 rounded-xl p-4 border border-[#cea273]/30">
              <p className="text-sm text-[#102a6b] dark:text-neutral-300">
                ℹ️ <strong>Bilgi:</strong> Kişisel bilgileriniz sadece etkinlik organizasyonu için kullanılacaktır. 
                Kayıt olarak <a href="#" className="text-[#015185] dark:text-[#5990c0] underline">gizlilik politikamızı</a> kabul etmiş olursunuz.
              </p>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all"
              >
                İptal
              </button>
              
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="py-3 rounded-xl bg-gradient-to-r from-[#015185] to-[#5990c0] text-white hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Kaydediliyor...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Kaydı Tamamla</span>
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
