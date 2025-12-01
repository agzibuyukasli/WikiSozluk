import { ArrowLeft, Mail, MessageSquare, Phone, MapPin, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner@2.0.3";

interface IletisimSayfasiProps {
  onGeriDon: () => void;
}

export function IletisimSayfasi({ onGeriDon }: IletisimSayfasiProps) {
  const [formData, setFormData] = useState({
    ad: "",
    email: "",
    konu: "",
    mesaj: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.ad || !formData.email || !formData.konu || !formData.mesaj) {
      toast.error("Lütfen tüm alanları doldurun");
      return;
    }

    // Form gönderim simülasyonu
    toast.success("Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.");
    
    // Formu temizle
    setFormData({
      ad: "",
      email: "",
      konu: "",
      mesaj: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-[#0a1835] dark:via-[#0d2350] dark:to-[#102a6b] pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-[#102a6b]/80 backdrop-blur-xl border-b border-neutral-200 dark:border-[#1e4a7a]/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onGeriDon}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-[#015185]/50 rounded-xl transition-colors"
            >
              <ArrowLeft className="h-6 w-6 text-[#5990c0]" />
            </button>
            <h1 className="text-[#102a6b] dark:text-[#e8f0ff]">İletişim</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gradient-to-br dark:from-[#102a6b] dark:via-[#0d2350] dark:to-[#0a1835] border border-neutral-200 dark:border-[#1e4a7a]/50 rounded-3xl p-8 shadow-xl dark:shadow-[#5990c0]/20"
          >
            <h2 className="text-[#102a6b] dark:text-[#e8f0ff] mb-2">Bize Ulaşın</h2>
            <p className="text-neutral-600 dark:text-[#9fb5d4] mb-6">
              Sorularınız, önerileriniz veya geri bildirimleriniz için formu doldurun.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-[#102a6b] dark:text-[#e8f0ff] mb-2">
                  Adınız Soyadınız *
                </label>
                <input
                  type="text"
                  name="ad"
                  value={formData.ad}
                  onChange={handleChange}
                  placeholder="Adınızı girin"
                  className="w-full px-4 py-3 bg-neutral-50 dark:bg-[#015185]/20 border border-neutral-200 dark:border-[#5990c0]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5990c0] dark:focus:ring-[#5990c0]/50 text-[#102a6b] dark:text-[#e8f0ff] placeholder:text-neutral-400 dark:placeholder:text-[#9fb5d4]/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm text-[#102a6b] dark:text-[#e8f0ff] mb-2">
                  E-posta Adresiniz *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ornek@email.com"
                  className="w-full px-4 py-3 bg-neutral-50 dark:bg-[#015185]/20 border border-neutral-200 dark:border-[#5990c0]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5990c0] dark:focus:ring-[#5990c0]/50 text-[#102a6b] dark:text-[#e8f0ff] placeholder:text-neutral-400 dark:placeholder:text-[#9fb5d4]/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm text-[#102a6b] dark:text-[#e8f0ff] mb-2">
                  Konu *
                </label>
                <select
                  name="konu"
                  value={formData.konu}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-neutral-50 dark:bg-[#015185]/20 border border-neutral-200 dark:border-[#5990c0]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5990c0] dark:focus:ring-[#5990c0]/50 text-[#102a6b] dark:text-[#e8f0ff] transition-all"
                >
                  <option value="">Konu seçin</option>
                  <option value="oneri">Öneri</option>
                  <option value="sikayet">Şikayet</option>
                  <option value="teknik">Teknik Destek</option>
                  <option value="isbirligi">İş Birliği</option>
                  <option value="diger">Diğer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-[#102a6b] dark:text-[#e8f0ff] mb-2">
                  Mesajınız *
                </label>
                <textarea
                  name="mesaj"
                  value={formData.mesaj}
                  onChange={handleChange}
                  placeholder="Mesajınızı buraya yazın..."
                  rows={5}
                  className="w-full px-4 py-3 bg-neutral-50 dark:bg-[#015185]/20 border border-neutral-200 dark:border-[#5990c0]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5990c0] dark:focus:ring-[#5990c0]/50 text-[#102a6b] dark:text-[#e8f0ff] placeholder:text-neutral-400 dark:placeholder:text-[#9fb5d4]/50 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#015185] to-[#5990c0] text-white px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                <span>Gönder</span>
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-[#015185] to-[#102a6b] rounded-3xl p-8 text-white shadow-2xl"
            >
              <h3 className="text-white mb-4">İletişim Bilgileri</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-white/70 mb-1">E-posta</p>
                    <p className="text-white">iletisim@genckonya.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-white/70 mb-1">Telefon</p>
                    <p className="text-white">+90 332 XXX XX XX</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-white/70 mb-1">Adres</p>
                    <p className="text-white">Konya, Türkiye</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gradient-to-br dark:from-[#102a6b] dark:via-[#0d2350] dark:to-[#0a1835] border border-neutral-200 dark:border-[#1e4a7a]/50 rounded-2xl p-6 shadow-lg dark:shadow-[#5990c0]/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#cea273] to-[#fcedd3] rounded-xl flex items-center justify-center shadow-lg">
                  <MessageSquare className="h-6 w-6 text-[#102a6b]" />
                </div>
                <h3 className="text-[#102a6b] dark:text-[#e8f0ff]">Hızlı Yanıt</h3>
              </div>
              <p className="text-neutral-600 dark:text-[#9fb5d4]">
                Mesajlarınıza genellikle 24 saat içinde yanıt veriyoruz. Acil durumlar için 
                lütfen e-posta üzerinden bize ulaşın.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-[#cea273] to-[#fcedd3] rounded-2xl p-6 shadow-xl"
            >
              <h3 className="text-[#102a6b] mb-2">Çalışma Saatleri</h3>
              <div className="space-y-2 text-[#102a6b]/80">
                <p>Pazartesi - Cuma: 09:00 - 18:00</p>
                <p>Cumartesi: 10:00 - 16:00</p>
                <p>Pazar: Kapalı</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
