import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Lock, Eye, EyeOff, User, ArrowLeft, UserPlus, Calendar, MapPin, CreditCard, AlertCircle, X } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface KayitPaneliProps {
  onKayitBasarili: () => void;
  onGeriDon: () => void;
}

export function KayitPaneli({ onKayitBasarili, onGeriDon }: KayitPaneliProps) {
  const [kayitYontemi, setKayitYontemi] = useState<"email" | "kartId">("email");
  const [formData, setFormData] = useState({
    ad: "",
    soyad: "",
    email: "",
    kartId: "",
    sifre: "",
    sifreTekrar: "",
    dogumTarihi: "",
    sehir: "",
  });
  const [sifreGoster, setSifreGoster] = useState(false);
  const [sifreTekrarGoster, setSifreTekrarGoster] = useState(false);
  const [yuklenme, setYuklenme] = useState(false);
  const [sozlesmeKabul, setSozlesmeKabul] = useState(false);
  const [emailHatasi, setEmailHatasi] = useState("");
  const [kartIdHatasi, setKartIdHatasi] = useState("");
  const [showKullanimSartlari, setShowKullanimSartlari] = useState(false);
  const [showGizlilikPolitikasi, setShowGizlilikPolitikasi] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Email validasyonu
  const validateEmail = (email: string) => {
    if (!email) {
      setEmailHatasi("");
      return false;
    }
    
    const eduTrPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.edu\.tr$/;
    
    if (!eduTrPattern.test(email)) {
      setEmailHatasi("Lütfen geçerli bir .edu.tr uzantılı e-posta adresi girin");
      return false;
    }
    
    setEmailHatasi("");
    return true;
  };

  // Kart ID validasyonu
  const validateKartId = (kartId: string) => {
    if (!kartId) {
      setKartIdHatasi("");
      return false;
    }
    
    const kartIdPattern = /^\d{16}$/;
    
    if (!kartIdPattern.test(kartId)) {
      setKartIdHatasi("Genç Kültür Kart ID 16 haneli olmalıdır");
      return false;
    }
    
    setKartIdHatasi("");
    return true;
  };

  const handleKayit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasyonlar
    if (!formData.ad || !formData.soyad || !formData.sifre || !formData.sifreTekrar) {
      toast.error("Lütfen tüm zorunlu alanları doldurun!");
      return;
    }

    // Kayıt yöntemine göre validasyon
    if (kayitYontemi === "email") {
      if (!formData.email) {
        setEmailHatasi("E-posta adresi gereklidir");
        return;
      }
      if (!validateEmail(formData.email)) {
        toast.error("Lütfen geçerli bir .edu.tr uzantılı e-posta girin!");
        return;
      }
    } else {
      if (!formData.kartId) {
        setKartIdHatasi("Genç Kültür Kart ID gereklidir");
        return;
      }
      if (!validateKartId(formData.kartId)) {
        toast.error("Lütfen 16 haneli Genç Kültür Kart ID'nizi girin!");
        return;
      }
    }

    if (formData.sifre !== formData.sifreTekrar) {
      toast.error("Şifreler eşleşmiyor!");
      return;
    }

    if (formData.sifre.length < 3) {
      toast.error("Şifre en az 3 karakter olmalıdır!");
      return;
    }

    if (!sozlesmeKabul) {
      toast.error("Kullanıcı sözleşmesini kabul etmelisiniz!");
      return;
    }

    setYuklenme(true);

    // Simüle edilmiş kayıt işlemi (şu an çalışmıyor, sadece tasarım)
    setTimeout(() => {
      toast.info("🎓 Kayıt sistemi henüz aktif değil. Demo hesap ile giriş yapabilirsiniz.", { duration: 3000 });
      setYuklenme(false);
      // onKayitBasarili(); // Gerçek implementasyonda aktif olacak
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1d2633] via-[#28374a] to-[#1d2633] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Yavaş Hareket Eden Gradient Dalgalar */}
      <motion.div
        className="absolute left-0 w-full h-80 opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(61, 79, 102, 0.5), transparent)',
        }}
        animate={{
          x: ['-100%', '100%'],
          y: ['0%', '15%', '0%'],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.div
        className="absolute left-0 w-full h-80 opacity-25 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(77, 95, 118, 0.6), transparent)',
        }}
        animate={{
          x: ['100%', '-100%'],
          y: ['0%', '20%', '0%'],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 35,
          delay: 5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Yüzen Daireler */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-0 pointer-events-none"
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            left: `${Math.random() * 100}%`,
            top: `${i % 2 === 0 ? '85%' : '90%'}`,
            background: `radial-gradient(circle at 30% 30%, ${
              i % 2 === 0 ? 'rgba(40, 55, 74, 0.4)' : 'rgba(61, 79, 102, 0.35)'
            }, transparent)`,
            filter: 'blur(20px)',
          }}
          animate={{
            y: [0, -200, -400, -600],
            x: [0, (i % 2 === 0 ? 30 : -30), (i % 2 === 0 ? -20 : 20), 0],
            scale: [0.7, 1, 0.8, 0.6],
            opacity: [0, 0.35, 0.25, 0],
          }}
          transition={{
            duration: 30 + (i % 4) * 3,
            delay: i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-2xl z-10"
      >
        {/* Kayıt Kartı */}
        <div className="bg-white/98 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-[#28374a]/30">
          {/* Geri Dön Butonu */}
          <button
            onClick={onGeriDon}
            className="flex items-center gap-2 text-neutral-600 hover:text-[#28374a] transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Geri Dön
          </button>

          {/* Logo ve Başlık */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#28374a] to-[#3d4f66] mb-4 shadow-lg"
            >
              <UserPlus className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-3xl mb-2 text-[#28374a]">Hesap Oluştur</h1>
            <p className="text-neutral-600">WikiSözlük topluluğuna katılın</p>
          </div>

          {/* Kayıt Yöntemi Seçimi */}
          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={() => {
                setKayitYontemi("email");
                setKartIdHatasi("");
                setFormData(prev => ({ ...prev, kartId: "" }));
              }}
              className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all ${
                kayitYontemi === "email"
                  ? "bg-gradient-to-r from-[#28374a] to-[#3d4f66] text-white shadow-lg"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              <Mail className="w-4 h-4" />
              <span className="text-sm">Öğrenci E-posta (.edu.tr)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setKayitYontemi("kartId");
                setEmailHatasi("");
                setFormData(prev => ({ ...prev, email: "" }));
              }}
              className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all ${
                kayitYontemi === "kartId"
                  ? "bg-gradient-to-r from-[#3d4f66] to-[#4d5f76] text-white shadow-lg"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span className="text-sm">Genç Kültür Kart ID</span>
            </button>
          </div>

          {/* Uyarı Mesajı */}
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-sm text-amber-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Kayıt sistemi yakında aktif olacaktır. Şu an sadece demo hesap ile giriş yapabilirsiniz.
            </p>
          </div>

          {/* Kayıt Formu */}
          <form onSubmit={handleKayit} className="space-y-5">
            {/* Ad ve Soyad */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2 text-[#28374a]">
                  Ad <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3d4f66]" />
                  <input
                    type="text"
                    name="ad"
                    value={formData.ad}
                    onChange={handleInputChange}
                    placeholder="Adınız"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-[#28374a] focus:outline-none transition-all text-neutral-800 placeholder:text-neutral-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2 text-[#28374a]">
                  Soyad <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="soyad"
                  value={formData.soyad}
                  onChange={handleInputChange}
                  placeholder="Soyadınız"
                  className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-[#28374a] focus:outline-none transition-all text-neutral-800 placeholder:text-neutral-400"
                />
              </div>
            </div>

            {/* Email veya Kart ID */}
            {kayitYontemi === "email" ? (
              <div>
                <label className="block text-sm mb-2 text-[#28374a]">
                  Öğrenci E-posta (.edu.tr) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    emailHatasi ? "text-red-500" : "text-[#3d4f66]"
                  }`} />
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={(e) => {
                      handleInputChange(e);
                      validateEmail(e.target.value);
                    }}
                    onBlur={(e) => validateEmail(e.target.value)}
                    placeholder="ogrenci@selcuk.edu.tr"
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border-2 focus:outline-none transition-all text-neutral-800 placeholder:text-neutral-400 ${
                      emailHatasi
                        ? "border-red-300 focus:border-red-500"
                        : "border-neutral-200 focus:border-[#28374a]"
                    }`}
                  />
                  {emailHatasi && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -bottom-6 left-0 flex items-center gap-1 text-red-500 text-xs"
                    >
                      <AlertCircle className="w-3 h-3" />
                      <span>{emailHatasi}</span>
                    </motion.div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm mb-2 text-[#28374a]">
                  Genç Kültür Kart ID <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <CreditCard className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    kartIdHatasi ? "text-red-500" : "text-[#3d4f66]"
                  }`} />
                  <input
                    type="text"
                    name="kartId"
                    value={formData.kartId}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 16);
                      setFormData(prev => ({ ...prev, kartId: value }));
                      validateKartId(value);
                    }}
                    onBlur={(e) => validateKartId(e.target.value)}
                    placeholder="1234567890123456"
                    maxLength={16}
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border-2 focus:outline-none transition-all text-neutral-800 placeholder:text-neutral-400 ${
                      kartIdHatasi
                        ? "border-red-300 focus:border-red-500"
                        : "border-neutral-200 focus:border-[#3d4f66]"
                    }`}
                  />
                  {kartIdHatasi && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -bottom-6 left-0 flex items-center gap-1 text-red-500 text-xs"
                    >
                      <AlertCircle className="w-3 h-3" />
                      <span>{kartIdHatasi}</span>
                    </motion.div>
                  )}
                </div>
              </div>
            )}

            {/* Şifreler */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2 text-[#28374a]">
                  Şifre <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3d4f66]" />
                  <input
                    type={sifreGoster ? "text" : "password"}
                    name="sifre"
                    value={formData.sifre}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-12 py-3 rounded-xl border-2 border-neutral-200 focus:border-[#28374a] focus:outline-none transition-all text-neutral-800"
                  />
                  <button
                    type="button"
                    onClick={() => setSifreGoster(!sifreGoster)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#28374a] transition-colors"
                  >
                    {sifreGoster ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2 text-[#28374a]">
                  Şifre Tekrar <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3d4f66]" />
                  <input
                    type={sifreTekrarGoster ? "text" : "password"}
                    name="sifreTekrar"
                    value={formData.sifreTekrar}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-12 py-3 rounded-xl border-2 border-neutral-200 focus:border-[#28374a] focus:outline-none transition-all text-neutral-800"
                  />
                  <button
                    type="button"
                    onClick={() => setSifreTekrarGoster(!sifreTekrarGoster)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#28374a] transition-colors"
                  >
                    {sifreTekrarGoster ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Opsiyonel Alanlar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2 text-[#28374a]">
                  Doğum Tarihi
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3d4f66]" />
                  <input
                    type="date"
                    name="dogumTarihi"
                    value={formData.dogumTarihi}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-[#28374a] focus:outline-none transition-all text-neutral-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2 text-[#28374a]">
                  Şehir
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3d4f66]" />
                  <select
                    name="sehir"
                    value={formData.sehir}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-[#28374a] focus:outline-none transition-all text-neutral-800"
                  >
                    <option value="">Seçiniz</option>
                    <option value="konya">Konya</option>
                    <option value="ankara">Ankara</option>
                    <option value="istanbul">İstanbul</option>
                    <option value="diger">Diğer</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Sözleşme Onayı */}
            <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-[#28374a]/10 via-[#3d4f66]/10 to-[#28374a]/10 rounded-xl border border-[#28374a]/30">
              <input
                type="checkbox"
                id="sozlesme"
                checked={sozlesmeKabul}
                onChange={(e) => setSozlesmeKabul(e.target.checked)}
                className="mt-1 w-4 h-4 rounded accent-[#28374a]"
              />
              <label htmlFor="sozlesme" className="text-sm text-neutral-700 cursor-pointer">
                <span className="text-red-500">*</span> 
                <button
                  type="button"
                  onClick={() => setShowKullanimSartlari(true)}
                  className="text-[#28374a] hover:underline mx-1 font-medium"
                >
                  Kullanıcı sözleşmesini
                </button>
                ve
                <button
                  type="button"
                  onClick={() => setShowGizlilikPolitikasi(true)}
                  className="text-[#28374a] hover:underline mx-1 font-medium"
                >
                  gizlilik politikasını
                </button>
                okudum, kabul ediyorum.
              </label>
            </div>

            {/* Kayıt Butonu */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={yuklenme}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#28374a] via-[#3d4f66] to-[#28374a] text-white flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#28374a]/50 transition-all disabled:opacity-50 relative overflow-hidden group"
            >
              {/* Parlama Efekti */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
                }}
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              {yuklenme ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <UserPlus className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Hesap Oluştur (Yakında)</span>
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>

      {/* Kullanım Şartları Modal */}
      <AnimatePresence>
        {showKullanimSartlari && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-neutral-200 flex items-center justify-between bg-gradient-to-r from-[#1d2633] to-[#28374a]">
                <h2 className="text-2xl text-white">Kullanıcı Sözleşmesi</h2>
                <button
                  onClick={() => setShowKullanimSartlari(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)]">
                <div className="space-y-4 text-neutral-700">
                  <section>
                    <h3 className="font-semibold text-lg text-[#28374a] mb-2">1. Genel Hükümler</h3>
                    <p className="text-sm leading-relaxed">
                      Bu platform, Konya'daki üniversite öğrencilerine yönelik bilgi paylaşım ve sosyal etkileşim platformudur. 
                      Platformu kullanarak aşağıdaki şartları kabul etmiş sayılırsınız.
                    </p>
                  </section>

                  <section>
                    <h3 className="font-semibold text-lg text-[#28374a] mb-2">2. Kullanıcı Yükümlülükleri</h3>
                    <ul className="text-sm leading-relaxed list-disc list-inside space-y-1">
                      <li>Platformda paylaşılan içeriklerin doğruluğundan kullanıcılar sorumludur.</li>
                      <li>Yanıltıcı, hakaret içeren veya yasalara aykırı içerik paylaşılamaz.</li>
                      <li>Diğer kullanıcılara saygılı davranılmalıdır.</li>
                      <li>Üniversite öğrencisi olduğunuzu doğrulayan (.edu.tr uzantılı e-posta veya Genç Kültür Kart) bilgileriniz güncel olmalıdır.</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="font-semibold text-lg text-[#28374a] mb-2">3. Coin Sistemi</h3>
                    <p className="text-sm leading-relaxed">
                      Platform üzerinde aktivite göstererek coin kazanabilirsiniz. Coinler rol seviyenizi belirler ve platform içinde 
                      ekstra özellikler sunar. Coin sistemi kötüye kullanılamaz ve manipüle edilemez.
                    </p>
                  </section>

                  <section>
                    <h3 className="font-semibold text-lg text-[#28374a] mb-2">4. İçerik Sorumluluğu</h3>
                    <p className="text-sm leading-relaxed">
                      Platform yönetimi, kullanıcılar tarafından paylaşılan içeriklerden sorumlu değildir. Ancak kurallara aykırı 
                      içerikleri kaldırma ve kullanıcı hesaplarını askıya alma hakkını saklı tutar.
                    </p>
                  </section>

                  <section>
                    <h3 className="font-semibold text-lg text-[#28374a] mb-2">5. Fikri Mülkiyet</h3>
                    <p className="text-sm leading-relaxed">
                      Platform tasarımı, logosu ve özgün içerikleri fikri mülkiyet hakları ile korunmaktadır. 
                      İzinsiz kullanım yasaktır.
                    </p>
                  </section>

                  <section>
                    <h3 className="font-semibold text-lg text-[#28374a] mb-2">6. Sözleşme Değişiklikleri</h3>
                    <p className="text-sm leading-relaxed">
                      Platform yönetimi bu sözleşmeyi önceden haber vermeksizin değiştirme hakkını saklı tutar. 
                      Değişiklikler platform üzerinden duyurulacaktır.
                    </p>
                  </section>
                </div>
              </div>
              <div className="p-4 border-t border-neutral-200 bg-neutral-50">
                <button
                  onClick={() => setShowKullanimSartlari(false)}
                  className="w-full py-3 bg-gradient-to-r from-[#1d2633] to-[#28374a] text-white rounded-xl hover:shadow-lg transition-all"
                >
                  Kapat
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Gizlilik Politikası Modal */}
      <AnimatePresence>
        {showGizlilikPolitikasi && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-neutral-200 flex items-center justify-between bg-gradient-to-r from-[#1d2633] to-[#28374a]">
                <h2 className="text-2xl text-white">Gizlilik Politikası</h2>
                <button
                  onClick={() => setShowGizlilikPolitikasi(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)]">
                <div className="space-y-4 text-neutral-700">
                  <section>
                    <h3 className="font-semibold text-lg text-[#28374a] mb-2">1. Toplanan Bilgiler</h3>
                    <p className="text-sm leading-relaxed mb-2">
                      Platformumuz aşağıdaki bilgileri toplamaktadır:
                    </p>
                    <ul className="text-sm leading-relaxed list-disc list-inside space-y-1">
                      <li>Ad, soyad bilgileriniz</li>
                      <li>.edu.tr uzantılı e-posta adresiniz veya 16 haneli Genç Kültür Kart ID'niz</li>
                      <li>Doğum tarihi ve şehir bilginiz</li>
                      <li>Platform üzerinde paylaştığınız içerikler (başlık, yorum, vb.)</li>
                      <li>Platform kullanım istatistikleriniz</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="font-semibold text-lg text-[#28374a] mb-2">2. Bilgilerin Kullanım Amacı</h3>
                    <p className="text-sm leading-relaxed">
                      Toplanan bilgiler yalnızca platform hizmetlerini sunmak, kullanıcı deneyimini iyileştirmek ve 
                      üniversite öğrencisi doğrulaması yapmak amacıyla kullanılır. Bilgileriniz üçüncü şahıslarla 
                      paylaşılmaz veya satılmaz.
                    </p>
                  </section>

                  <section>
                    <h3 className="font-semibold text-lg text-[#28374a] mb-2">3. Veri Güvenliği</h3>
                    <p className="text-sm leading-relaxed">
                      Kişisel bilgileriniz endüstri standardı güvenlik önlemleri ile korunmaktadır. Şifreleriniz 
                      şifrelenmiş olarak saklanır ve platform yöneticileri dâhil hiç kimse tarafından görüntülenemez.
                    </p>
                  </section>

                  <section>
                    <h3 className="font-semibold text-lg text-[#28374a] mb-2">4. Çerezler (Cookies)</h3>
                    <p className="text-sm leading-relaxed">
                      Platform, kullanıcı deneyimini iyileştirmek ve oturum yönetimi için çerezler kullanmaktadır. 
                      Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz, ancak bu durumda bazı özellikler 
                      çalışmayabilir.
                    </p>
                  </section>

                  <section>
                    <h3 className="font-semibold text-lg text-[#28374a] mb-2">5. Kullanıcı Hakları</h3>
                    <ul className="text-sm leading-relaxed list-disc list-inside space-y-1">
                      <li>Kişisel bilgilerinize erişim talep edebilirsiniz</li>
                      <li>Bilgilerinizin düzeltilmesini isteyebilirsiniz</li>
                      <li>Hesabınızı silme hakkına sahipsiniz</li>
                      <li>Veri işleme faaliyetlerine itiraz edebilirsiniz</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="font-semibold text-lg text-[#28374a] mb-2">6. PII ve Hassas Veri Uyarısı</h3>
                    <p className="text-sm leading-relaxed bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                      <strong>ÖNEMLİ:</strong> Bu platform, Kişisel Tanımlayıcı Bilgiler (PII) toplamak veya 
                      hassas verileri güvenli bir şekilde saklamak için tasarlanmamıştır. Lütfen TC Kimlik Numarası, 
                      kredi kartı bilgileri, sağlık kayıtları gibi hassas bilgilerinizi platform üzerinde paylaşmayınız.
                    </p>
                  </section>

                  <section>
                    <h3 className="font-semibold text-lg text-[#28374a] mb-2">7. İletişim</h3>
                    <p className="text-sm leading-relaxed">
                      Gizlilik politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz.
                    </p>
                  </section>
                </div>
              </div>
              <div className="p-4 border-t border-neutral-200 bg-neutral-50">
                <button
                  onClick={() => setShowGizlilikPolitikasi(false)}
                  className="w-full py-3 bg-gradient-to-r from-[#1d2633] to-[#28374a] text-white rounded-xl hover:shadow-lg transition-all"
                >
                  Kapat
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
