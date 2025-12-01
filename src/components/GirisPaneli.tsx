import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, Lock, Eye, EyeOff, LogIn, UserPlus, Shield, BookOpen, Sparkles, Star, Coffee, Sun, CreditCard, AlertCircle } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface GirisPaneliProps {
  onGirisBasarili: (kullaniciTipi: "kullanici" | "admin" | "misafir") => void;
  onKayitaGec: () => void;
  onAdminGirisineGec: () => void;
}

// Yüzen daire animasyonları
function FloatingCircle({ 
  delay, 
  duration, 
  startX, 
  startY,
  size,
  color,
  blur = "0px"
}: { 
  delay: number; 
  duration: number; 
  startX: string; 
  startY: string;
  size: number;
  color: string;
  blur?: string;
}) {
  return (
    <motion.div
      className="absolute rounded-full opacity-0"
      style={{
        left: startX,
        top: startY,
        width: size,
        height: size,
        background: `radial-gradient(circle at 30% 30%, ${color}, transparent)`,
        filter: `blur(${blur})`,
      }}
      animate={{
        y: [0, -200, -400, -600],
        x: [0, 50, -40, 0],
        scale: [0.8, 1.2, 0.9, 0.7],
        opacity: [0, 0.4, 0.3, 0],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// Yavaş hareket eden dalga
function WaveEffect({ delay, color }: { delay: number; color: string }) {
  return (
    <motion.div
      className="absolute left-0 w-full h-64"
      style={{
        background: `radial-gradient(ellipse at center, ${color}, transparent)`,
        opacity: 0.2,
      }}
      animate={{
        x: ["-100%", "100%"],
        y: ["0%", "20%", "0%"],
        scale: [1, 1.3, 1],
      }}
      transition={{
        duration: 25,
        delay: delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

// Parlayan partikül
function Particle({ delay, x, y, color }: { delay: number; x: string; y: string; color: string }) {
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full"
      style={{
        left: x,
        top: y,
        background: color,
        boxShadow: `0 0 15px ${color}`,
      }}
      animate={{
        scale: [0, 2, 0],
        opacity: [0, 0.7, 0],
      }}
      transition={{
        duration: 4,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export function GirisPaneli({ onGirisBasarili, onKayitaGec, onAdminGirisineGec }: GirisPaneliProps) {
  const [girisYontemi, setGirisYontemi] = useState<"email" | "kartId">("email");
  const [email, setEmail] = useState("");
  const [kartId, setKartId] = useState("");
  const [sifre, setSifre] = useState("");
  const [sifreGoster, setSifreGoster] = useState(false);
  const [yuklenme, setYuklenme] = useState(false);
  const [emailHatasi, setEmailHatasi] = useState("");
  const [kartIdHatasi, setKartIdHatasi] = useState("");

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
    
    // Genç Kültür Kart ID format: 16 haneli sayı
    const kartIdPattern = /^\d{16}$/;
    
    if (!kartIdPattern.test(kartId)) {
      setKartIdHatasi("Genç Kültür Kart ID 16 haneli olmalıdır");
      return false;
    }
    
    setKartIdHatasi("");
    return true;
  };

  const handleGiris = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validasyonu
    if (!sifre) {
      toast.error("Lütfen şifrenizi girin!");
      return;
    }

    let gecerli = false;

    if (girisYontemi === "email") {
      if (!email) {
        setEmailHatasi("E-posta adresi gereklidir");
        return;
      }
      gecerli = validateEmail(email);
      if (!gecerli) {
        toast.error("Lütfen geçerli bir .edu.tr uzantılı e-posta girin!");
        return;
      }
    } else {
      if (!kartId) {
        setKartIdHatasi("Genç Kültür Kart ID gereklidir");
        return;
      }
      gecerli = validateKartId(kartId);
      if (!gecerli) {
        toast.error("Lütfen 16 haneli Genç Kültür Kart ID'nizi girin!");
        return;
      }
    }

    setYuklenme(true);

    // Demo hesap kontrolü ve happy path yönlendirme
    setTimeout(() => {
      // Herhangi bir .edu.tr mail veya 16 haneli kart ID ile giriş başarılı (happy path)
      if (gecerli && sifre) {
        toast.success("Giriş başarılı! Hoş geldiniz 🎉", { duration: 2000 });
        onGirisBasarili("kullanici");
      } else {
        toast.error("Giriş bilgileri hatalı!");
      }
      setYuklenme(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Arka Plan - Monokromatik #28374a */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1d2633] via-[#28374a] to-[#1d2633]"></div>
      
      {/* Derinlik Katmanları */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-bl from-[#3d4f66]/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-gradient-to-tr from-[#3d4f66]/30 to-transparent"></div>
      </div>

      {/* Yavaş Hareket Eden Dalgalar */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <WaveEffect delay={0} color="rgba(40, 55, 74, 0.5)" />
        <WaveEffect delay={10} color="rgba(61, 79, 102, 0.4)" />
        <WaveEffect delay={20} color="rgba(40, 55, 74, 0.6)" />
      </div>

      {/* Yüzen Daireler - Büyük */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingCircle delay={0} duration={40} startX="8%" startY="85%" size={250} color="rgba(40, 55, 74, 0.6)" blur="40px" />
        <FloatingCircle delay={6} duration={42} startX="28%" startY="90%" size={220} color="rgba(61, 79, 102, 0.5)" blur="45px" />
        <FloatingCircle delay={12} duration={38} startX="52%" startY="88%" size={270} color="rgba(40, 55, 74, 0.7)" blur="50px" />
        <FloatingCircle delay={18} duration={44} startX="72%" startY="86%" size={240} color="rgba(61, 79, 102, 0.6)" blur="42px" />
        <FloatingCircle delay={24} duration={40} startX="88%" startY="92%" size={260} color="rgba(40, 55, 74, 0.5)" blur="48px" />
      </div>

      {/* Yüzen Daireler - Orta */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingCircle delay={3} duration={36} startX="18%" startY="82%" size={150} color="rgba(40, 55, 74, 0.5)" blur="28px" />
        <FloatingCircle delay={9} duration={38} startX="42%" startY="85%" size={130} color="rgba(61, 79, 102, 0.4)" blur="30px" />
        <FloatingCircle delay={15} duration={35} startX="62%" startY="87%" size={160} color="rgba(40, 55, 74, 0.6)" blur="32px" />
        <FloatingCircle delay={21} duration={39} startX="80%" startY="84%" size={140} color="rgba(61, 79, 102, 0.5)" blur="29px" />
      </div>

      {/* Parlayan Partiküller */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <Particle 
            key={i}
            delay={i * 1.2} 
            x={`${Math.random() * 100}%`} 
            y={`${Math.random() * 100}%`} 
            color={i % 3 === 0 ? "rgba(61, 79, 102, 0.8)" : i % 3 === 1 ? "rgba(77, 95, 118, 0.7)" : "rgba(40, 55, 74, 0.6)"}
          />
        ))}
      </div>

      {/* Büyük Işık Blobları */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/5 w-[800px] h-[800px] rounded-full blur-3xl"
          style={{ background: "rgba(40, 55, 74, 0.25)" }}
          animate={{
            scale: [1, 1.6, 1],
            x: [0, 120, 0],
            y: [0, -70, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/5 w-[800px] h-[800px] rounded-full blur-3xl"
          style={{ background: "rgba(61, 79, 102, 0.22)" }}
          animate={{
            scale: [1.6, 1, 1.6],
            x: [0, -120, 0],
            y: [0, 70, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{ background: "rgba(77, 95, 118, 0.15)" }}
          animate={{
            scale: [1.2, 1.4, 1.2],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Ana İçerik */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative w-full max-w-md z-10"
      >
        {/* Giriş Kartı */}
        <div className="bg-white/98 backdrop-blur-3xl rounded-3xl shadow-2xl border border-[#28374a]/50 overflow-hidden">
          {/* Üst Dekoratif Alan */}
          <div className="relative h-44 bg-gradient-to-r from-[#1d2633] via-[#28374a] to-[#1d2633] overflow-hidden">
            {/* Animasyonlu Işık Çizgileri */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(135deg, transparent 40%, rgba(255, 255, 255, 0.1) 50%, transparent 60%)",
              }}
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            
            {/* Nokta Grid Deseni */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="20" cy="20" r="1.5" fill="white" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Üst ve Alt Işık Çizgileri */}
            <motion.div
              className="absolute top-0 left-0 w-full h-0.5"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)",
              }}
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 1,
              }}
            />
            
            {/* Dekoratif Elemanlar */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                <Star className="absolute w-8 h-8 text-white/80 top-10 left-14 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Coffee className="absolute w-7 h-7 text-white/70 top-12 right-16 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
              </motion.div>
              
              <motion.div
                animate={{ 
                  scale: [1, 1.4, 1], 
                  rotate: [0, 180, 360],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <Sparkles className="absolute w-9 h-9 text-white/90 bottom-10 right-12 drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
              </motion.div>

              <motion.div
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Sun className="absolute w-8 h-8 text-white/80 bottom-11 left-14 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
              </motion.div>
            </div>
          </div>

          <div className="p-8 pt-0 relative -mt-16">
            {/* Logo */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-center mb-7"
            >
              <div className="inline-flex items-center justify-center w-36 h-36 rounded-3xl bg-gradient-to-br from-[#28374a] via-[#3d4f66] to-[#28374a] shadow-2xl shadow-[#28374a]/70 border-4 border-white mb-5 relative overflow-hidden">
                {/* İç Glow Efekti */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent"></div>
                
                {/* Dönen Gradient Halka */}
                <motion.div
                  className="absolute inset-2 rounded-2xl"
                  style={{
                    background: "linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
                  }}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                
                {/* Parıldama Efekti */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.6), transparent)",
                  }}
                  animate={{
                    x: ["-150%", "150%"],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 2.5,
                  }}
                />
                
                {/* Pulse Efekti */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: "radial-gradient(circle at center, rgba(255, 255, 255, 0.15), transparent 70%)",
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                <BookOpen className="w-20 h-20 text-white relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" strokeWidth={2.5} />
              </div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-4xl mb-2 bg-gradient-to-r from-[#1d2633] via-[#28374a] to-[#1d2633] bg-clip-text text-transparent" 
                style={{ fontWeight: 700 }}
              >
                WikiSözlük
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-[#28374a]/80" 
                style={{ fontSize: "15px", fontWeight: 500 }}
              >
                Keşfet, Paylaş, Öğren
              </motion.p>
            </motion.div>

            {/* Giriş Yöntemi Seçimi */}
            <div className="flex gap-2 mb-6">
              <button
                type="button"
                onClick={() => {
                  setGirisYontemi("email");
                  setKartIdHatasi("");
                }}
                className={`flex-1 py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${
                  girisYontemi === "email"
                    ? "bg-gradient-to-r from-[#28374a] to-[#3d4f66] text-white shadow-lg shadow-[#28374a]/40"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:scale-[1.02]"
                }`}
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">E-posta</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setGirisYontemi("kartId");
                  setEmailHatasi("");
                }}
                className={`flex-1 py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${
                  girisYontemi === "kartId"
                    ? "bg-gradient-to-r from-[#3d4f66] to-[#4d5f76] text-white shadow-lg shadow-[#3d4f66]/40"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:scale-[1.02]"
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span className="text-sm">Kart ID</span>
              </button>
            </div>

            {/* Giriş Formu */}
            <motion.form
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              onSubmit={handleGiris}
              className="space-y-5"
            >
              {/* Email veya Kart ID */}
              {girisYontemi === "email" ? (
                <div>
                  <label className="block text-sm mb-2 text-[#1d2633]" style={{ fontWeight: 600 }}>
                    Öğrenci E-posta Adresi (.edu.tr)
                  </label>
                  <div className="relative group">
                    <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                      emailHatasi ? "text-red-500" : "text-[#28374a] group-focus-within:text-[#1d2633]"
                    }`} />
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        validateEmail(e.target.value);
                      }}
                      onBlur={(e) => validateEmail(e.target.value)}
                      placeholder="ogrenci@selcuk.edu.tr"
                      className={`w-full pl-12 pr-4 py-3.5 rounded-xl border-2 bg-[#f8f9fa] focus:bg-white focus:outline-none focus:ring-2 transition-all text-[#1d2633] placeholder:text-[#28374a]/40 ${
                        emailHatasi
                          ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                          : "border-[#28374a]/20 focus:border-[#28374a] focus:ring-[#28374a]/20"
                      }`}
                      style={{ fontSize: "15px" }}
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
                  <label className="block text-sm mb-2 text-[#1d2633]" style={{ fontWeight: 600 }}>
                    Genç Kültür Kart ID
                  </label>
                  <div className="relative group">
                    <CreditCard className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                      kartIdHatasi ? "text-red-500" : "text-[#28374a] group-focus-within:text-[#1d2633]"
                    }`} />
                    <input
                      type="text"
                      value={kartId}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "").slice(0, 16);
                        setKartId(value);
                        validateKartId(value);
                      }}
                      onBlur={(e) => validateKartId(e.target.value)}
                      placeholder="1234567890123456"
                      maxLength={16}
                      className={`w-full pl-12 pr-4 py-3.5 rounded-xl border-2 bg-[#f8f9fa] focus:bg-white focus:outline-none focus:ring-2 transition-all text-[#1d2633] placeholder:text-[#28374a]/40 ${
                        kartIdHatasi
                          ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                          : "border-[#28374a]/20 focus:border-[#28374a] focus:ring-[#28374a]/20"
                      }`}
                      style={{ fontSize: "15px" }}
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

              {/* Şifre */}
              <div>
                <label className="block text-sm mb-2 text-[#1d2633]" style={{ fontWeight: 600 }}>
                  Şifre
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#28374a] group-focus-within:text-[#1d2633] transition-colors" />
                  <input
                    type={sifreGoster ? "text" : "password"}
                    value={sifre}
                    onChange={(e) => setSifre(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl border-2 border-[#28374a]/20 bg-[#f8f9fa] focus:bg-white focus:border-[#28374a] focus:outline-none focus:ring-2 focus:ring-[#28374a]/20 transition-all text-[#1d2633]"
                    style={{ fontSize: "15px" }}
                  />
                  <button
                    type="button"
                    onClick={() => setSifreGoster(!sifreGoster)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#28374a]/60 hover:text-[#1d2633] transition-colors"
                  >
                    {sifreGoster ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Giriş Butonu */}
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={yuklenme}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#1d2633] via-[#28374a] to-[#1d2633] text-white flex items-center justify-center gap-2 shadow-xl shadow-[#28374a]/50 hover:shadow-2xl hover:shadow-[#28374a]/60 transition-all disabled:opacity-50 relative overflow-hidden group"
              >
                {/* Parlama Sweep */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
                  }}
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                
                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                </div>

                {yuklenme ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin relative z-10"></div>
                ) : (
                  <>
                    <LogIn className="w-5 h-5 relative z-10" />
                    <span className="relative z-10" style={{ fontSize: "16px", fontWeight: 600 }}>
                      Giriş Yap
                    </span>
                  </>
                )}
              </motion.button>

              {/* Alt Linkler */}
              <div className="flex items-center justify-between text-sm pt-2">
                <button
                  type="button"
                  onClick={onKayitaGec}
                  className="text-[#3d4f66] hover:text-[#28374a] transition-colors flex items-center gap-1 group"
                >
                  <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Hesap Oluştur
                </button>
                <button
                  type="button"
                  onClick={onAdminGirisineGec}
                  className="text-[#4d5f76] hover:text-[#28374a] transition-colors flex items-center gap-1 group"
                >
                  <Shield className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Admin Girişi
                </button>
              </div>

              {/* Demo Bilgisi */}
              <div className="mt-4 p-3 bg-gradient-to-r from-[#28374a]/10 via-[#3d4f66]/10 to-[#28374a]/10 rounded-xl border border-[#28374a]/30">
                <p className="text-xs text-[#28374a] text-center">
                  <strong>Demo:</strong> Herhangi bir .edu.tr maili veya 16 haneli kart ID ile giriş yapabilirsiniz
                </p>
              </div>
            </motion.form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}