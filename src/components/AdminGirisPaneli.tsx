import React, { useState } from "react";
import { motion } from "motion/react";
import { Shield, Lock, Eye, EyeOff, LogIn, ArrowLeft, User, Star, Sparkles, Crown, Sun } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface AdminGirisPaneliProps {
  onGirisBasarili: () => void;
  onGeriDon: () => void;
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

export function AdminGirisPaneli({ onGirisBasarili, onGeriDon }: AdminGirisPaneliProps) {
  const [kullaniciAdi, setKullaniciAdi] = useState("");
  const [sifre, setSifre] = useState("");
  const [sifreGoster, setSifreGoster] = useState(false);
  const [yuklenme, setYuklenme] = useState(false);

  const handleGiris = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!kullaniciAdi || !sifre) {
      toast.error("Lütfen tüm alanları doldurun!");
      return;
    }

    setYuklenme(true);

    setTimeout(() => {
      if (kullaniciAdi === "admin" && sifre === "admin") {
        toast.success("Admin girişi başarılı! Hoş geldiniz 👑", { duration: 2000 });
        onGirisBasarili();
      } else {
        toast.error("Kullanıcı adı veya şifre hatalı!");
      }
      setYuklenme(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Arka Plan - Gündemde Mavi Teması */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2A4461] via-[#395579] to-[#2A4461]"></div>
      
      {/* Derinlik Katmanları */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-bl from-[#4A6A8A]/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-gradient-to-tr from-[#4A6A8A]/30 to-transparent"></div>
      </div>

      {/* Yavaş Hareket Eden Dalgalar */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <WaveEffect delay={0} color="rgba(57, 85, 121, 0.5)" />
        <WaveEffect delay={10} color="rgba(74, 106, 138, 0.4)" />
        <WaveEffect delay={20} color="rgba(57, 85, 121, 0.6)" />
      </div>

      {/* Yüzen Daireler - Büyük */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingCircle delay={0} duration={40} startX="8%" startY="85%" size={250} color="rgba(57, 85, 121, 0.6)" blur="40px" />
        <FloatingCircle delay={6} duration={42} startX="28%" startY="90%" size={220} color="rgba(74, 106, 138, 0.5)" blur="45px" />
        <FloatingCircle delay={12} duration={38} startX="52%" startY="88%" size={270} color="rgba(57, 85, 121, 0.7)" blur="50px" />
        <FloatingCircle delay={18} duration={44} startX="72%" startY="86%" size={240} color="rgba(74, 106, 138, 0.6)" blur="42px" />
        <FloatingCircle delay={24} duration={40} startX="88%" startY="92%" size={260} color="rgba(57, 85, 121, 0.5)" blur="48px" />
      </div>

      {/* Yüzen Daireler - Orta */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingCircle delay={3} duration={36} startX="18%" startY="82%" size={150} color="rgba(57, 85, 121, 0.5)" blur="28px" />
        <FloatingCircle delay={9} duration={38} startX="42%" startY="85%" size={130} color="rgba(74, 106, 138, 0.4)" blur="30px" />
        <FloatingCircle delay={15} duration={35} startX="62%" startY="87%" size={160} color="rgba(57, 85, 121, 0.6)" blur="32px" />
        <FloatingCircle delay={21} duration={39} startX="80%" startY="84%" size={140} color="rgba(74, 106, 138, 0.5)" blur="29px" />
      </div>

      {/* Parlayan Partiküller */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <Particle 
            key={i}
            delay={i * 1.2} 
            x={`${Math.random() * 100}%`} 
            y={`${Math.random() * 100}%`} 
            color={i % 3 === 0 ? "rgba(74, 106, 138, 0.8)" : i % 3 === 1 ? "rgba(90, 122, 154, 0.7)" : "rgba(57, 85, 121, 0.6)"}
          />
        ))}
      </div>

      {/* Büyük Işık Blobları */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/5 w-[800px] h-[800px] rounded-full blur-3xl"
          style={{ background: "rgba(57, 85, 121, 0.25)" }}
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
          style={{ background: "rgba(74, 106, 138, 0.22)" }}
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
          style={{ background: "rgba(90, 122, 154, 0.15)" }}
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
        <div className="bg-white/98 backdrop-blur-3xl rounded-3xl shadow-2xl border border-[#395579]/50 overflow-hidden">
          {/* Üst Dekoratif Alan */}
          <div className="relative h-44 bg-gradient-to-r from-[#2A4461] via-[#395579] to-[#2A4461] overflow-hidden">
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
                <Crown className="absolute w-7 h-7 text-white/70 top-12 right-16 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
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
              <div className="inline-flex items-center justify-center w-36 h-36 rounded-3xl bg-gradient-to-br from-[#395579] via-[#4A6A8A] to-[#395579] shadow-2xl shadow-[#395579]/70 border-4 border-white mb-5 relative overflow-hidden">
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
                
                <Crown className="w-20 h-20 text-white relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" strokeWidth={2.5} />
              </div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-4xl mb-2 bg-gradient-to-r from-[#2A4461] via-[#395579] to-[#2A4461] bg-clip-text text-transparent" 
                style={{ fontWeight: 700 }}
              >
                Admin Paneli
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-[#395579]/80" 
                style={{ fontSize: "15px", fontWeight: 500 }}
              >
                Yönetici Girişi
              </motion.p>
            </motion.div>

            {/* Giriş Formu */}
            <motion.form
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              onSubmit={handleGiris}
              className="space-y-5"
            >
              {/* Kullanıcı Adı */}
              <div>
                <label className="block text-sm mb-2 text-[#395579]" style={{ fontWeight: 600 }}>
                  Kullanıcı Adı
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A6A8A] group-focus-within:text-[#395579] transition-colors" />
                  <input
                    type="text"
                    value={kullaniciAdi}
                    onChange={(e) => setKullaniciAdi(e.target.value)}
                    placeholder="admin"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-neutral-200 bg-white focus:border-[#395579] focus:outline-none focus:ring-2 focus:ring-[#395579]/20 transition-all text-neutral-800 placeholder:text-neutral-400"
                    style={{ fontSize: "15px" }}
                  />
                </div>
              </div>

              {/* Şifre */}
              <div>
                <label className="block text-sm mb-2 text-[#395579]" style={{ fontWeight: 600 }}>
                  Şifre
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A6A8A] group-focus-within:text-[#395579] transition-colors" />
                  <input
                    type={sifreGoster ? "text" : "password"}
                    value={sifre}
                    onChange={(e) => setSifre(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl border-2 border-neutral-200 bg-white focus:border-[#395579] focus:outline-none focus:ring-2 focus:ring-[#395579]/20 transition-all text-neutral-800"
                    style={{ fontSize: "15px" }}
                  />
                  <button
                    type="button"
                    onClick={() => setSifreGoster(!sifreGoster)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#395579] transition-colors"
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
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#2A4461] via-[#395579] to-[#2A4461] text-white flex items-center justify-center gap-2 shadow-xl shadow-[#395579]/50 hover:shadow-2xl hover:shadow-[#395579]/60 transition-all disabled:opacity-50 relative overflow-hidden group"
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

              {/* Geri Dön Butonu */}
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={onGeriDon}
                  className="flex items-center gap-2 text-[#4A6A8A] hover:text-[#395579] transition-colors text-sm group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Geri Dön
                </button>
              </div>

              {/* Demo Bilgisi */}
              <div className="mt-4 p-3 bg-gradient-to-r from-[#395579]/10 via-[#4A6A8A]/10 to-[#395579]/10 rounded-xl border border-[#395579]/30">
                <p className="text-xs text-[#395579] text-center">
                  <strong>Demo:</strong> Kullanıcı Adı: admin | Şifre: admin
                </p>
              </div>
            </motion.form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}