import { motion } from "motion/react";
import { X, Trophy, TrendingUp, Flame, Crown, Award, Star, Zap, Users, MessageSquare, Eye, ThumbsUp, Coins } from "lucide-react";
import { useState } from "react";

interface LeaderboardProps {
  onClose: () => void;
  onKullaniciClick?: (kullanici: any) => void;
}

export function Leaderboard({ onClose, onKullaniciClick }: LeaderboardProps) {
  const [activeTab, setActiveTab] = useState<"kullanicilar">("kullanicilar");

  const enAktifKullanicilar = [
    {
      sira: 1,
      ad: "Can B.",
      rol: "Konya Bilgesi",
      avatar: "CB",
      coin: 52340,
      baslik: 145,
      yorum: 892,
      begeni: 3421,
      rozet: "👑",
    },
    {
      sira: 2,
      ad: "Zeynep A.",
      rol: "Kaşif Meraklısı",
      avatar: "ZA",
      coin: 38750,
      baslik: 98,
      yorum: 654,
      begeni: 2156,
      rozet: "🏆",
    },
    {
      sira: 3,
      ad: "Ahmet K.",
      rol: "Kaşif Meraklısı",
      avatar: "AK",
      coin: 29430,
      baslik: 76,
      yorum: 512,
      begeni: 1843,
      rozet: "🥉",
    },
    {
      sira: 4,
      ad: "Mehmet Y.",
      rol: "Gezgin",
      avatar: "MY",
      coin: 18920,
      baslik: 54,
      yorum: 423,
      begeni: 1234,
      rozet: "⭐",
    },
    {
      sira: 5,
      ad: "Elif S.",
      rol: "Gezgin",
      avatar: "ES",
      coin: 15680,
      baslik: 47,
      yorum: 398,
      begeni: 1089,
      rozet: "⭐",
    },
    {
      sira: 6,
      ad: "Barış T.",
      rol: "Gezgin",
      avatar: "BT",
      coin: 12340,
      baslik: 39,
      yorum: 321,
      begeni: 892,
      rozet: "💫",
    },
    {
      sira: 7,
      ad: "Selin Y.",
      rol: "Seyyah",
      avatar: "SY",
      coin: 9870,
      baslik: 32,
      yorum: 267,
      begeni: 723,
      rozet: "✨",
    },
    {
      sira: 8,
      ad: "Kemal R.",
      rol: "Seyyah",
      avatar: "KR",
      coin: 7650,
      baslik: 28,
      yorum: 234,
      begeni: 645,
      rozet: "✨",
    },
    {
      sira: 9,
      ad: "Cem Ö.",
      rol: "Seyyah",
      avatar: "CÖ",
      coin: 6420,
      baslik: 24,
      yorum: 198,
      begeni: 534,
      rozet: "🌟",
    },
    {
      sira: 10,
      ad: "Derya H.",
      rol: "Seyyah",
      avatar: "DH",
      coin: 5230,
      baslik: 21,
      yorum: 176,
      begeni: 467,
      rozet: "🌟",
    },
  ];

  const enPopulerBasliklar = [
    {
      sira: 1,
      baslik: "Kütüphane çalışma saatleri güncelleme",
      kategori: "Akademik Destek",
      yazar: "Kemal R.",
      goruntulenme: 4521,
      yorum: 143,
      begeni: 892,
      trendPuan: 98,
    },
    {
      sira: 2,
      baslik: "Öğrenci kulüpleri tanıtım günü",
      kategori: "Sosyal Yaşam",
      yazar: "Onur V.",
      goruntulenme: 3876,
      yorum: 127,
      begeni: 756,
      trendPuan: 94,
    },
    {
      sira: 3,
      baslik: "Part-time iş fırsatı",
      kategori: "Kariyer",
      yazar: "Alp K.",
      goruntulenme: 3542,
      yorum: 119,
      begeni: 689,
      trendPuan: 91,
    },
    {
      sira: 4,
      baslik: "Konya'da gezilecek gizli yerler",
      kategori: "Keşif Rehberi",
      yazar: "Berk S.",
      goruntulenme: 3298,
      yorum: 108,
      begeni: 634,
      trendPuan: 88,
    },
    {
      sira: 5,
      baslik: "Uluslararası Mevlana Festivali",
      kategori: "Etkinlikler",
      yazar: "Zehra P.",
      goruntulenme: 2987,
      yorum: 98,
      begeni: 578,
      trendPuan: 85,
    },
    {
      sira: 6,
      baslik: "Film akşamları başlıyor",
      kategori: "Sosyal Yaşam",
      yazar: "Ece B.",
      goruntulenme: 2743,
      yorum: 89,
      begeni: 512,
      trendPuan: 82,
    },
    {
      sira: 7,
      baslik: "Mevlana Müzesi ziyaret rehberi",
      kategori: "Keşif Rehberi",
      yazar: "Sinan L.",
      goruntulenme: 2534,
      yorum: 81,
      begeni: 478,
      trendPuan: 79,
    },
    {
      sira: 8,
      baslik: "LinkedIn profil optimizasyonu",
      kategori: "Kariyer",
      yazar: "Merve A.",
      goruntulenme: 2321,
      yorum: 74,
      begeni: 445,
      trendPuan: 76,
    },
    {
      sira: 9,
      baslik: "Hafta sonu Sille'ye gezi planı",
      kategori: "Sosyal Yaşam",
      yazar: "Derya H.",
      goruntulenme: 2187,
      yorum: 69,
      begeni: 412,
      trendPuan: 73,
    },
    {
      sira: 10,
      baslik: "Kampüs Bahar Şenliği hazırlıkları",
      kategori: "Etkinlikler",
      yazar: "Can H.",
      goruntulenme: 2043,
      yorum: 63,
      begeni: 389,
      trendPuan: 70,
    },
  ];

  const getRankColor = (sira: number) => {
    if (sira === 1) return "from-amber-400 to-amber-600";
    if (sira === 2) return "from-slate-300 to-slate-500";
    if (sira === 3) return "from-orange-400 to-orange-600";
    return "from-[#395579] to-[#4A6A8A]";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center p-2 md:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="bg-white dark:bg-gradient-to-br dark:from-neutral-900 dark:via-neutral-900 dark:to-[#1d2633]/50 rounded-2xl md:rounded-3xl shadow-2xl border border-neutral-200 dark:border-[#395579]/20 w-full max-w-5xl my-4 md:my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-neutral-200 dark:border-[#4A6A8A]/30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-[#2A4461] via-[#395579] to-[#4A6A8A] shadow-lg shadow-[#395579]/30">
                <Trophy className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h2 className="text-sm md:text-base text-[#1d2633] dark:text-white font-semibold">Lider Tablosu</h2>
                <p className="text-xs md:text-sm text-neutral-500 dark:text-[#7B99B3]">En aktif katkı sağlayanlar</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#395579]/10 dark:hover:bg-[#395579]/20 rounded-xl transition-colors"
            >
              <X className="w-5 h-5 md:w-6 md:h-6 text-neutral-600 dark:text-neutral-400" />
            </button>
          </div>

          {/* Title */}
          <div className="px-3 md:px-4 py-2 md:py-3 rounded-xl bg-gradient-to-r from-[#2A4461] via-[#395579] to-[#4A6A8A] text-white shadow-lg shadow-[#395579]/30">
            <div className="flex items-center justify-center gap-2">
              <Users className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span className="text-xs md:text-sm">En Aktif Kullanıcılar</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-h-[500px] md:max-h-[600px] overflow-y-auto p-3 md:p-6 scrollbar-thin">
          <div className="space-y-2 md:space-y-3">
              {enAktifKullanicilar.map((kullanici, index) => (
                <motion.div
                  key={kullanici.sira}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => onKullaniciClick?.(kullanici)}
                  className={`relative p-3 md:p-4 rounded-xl md:rounded-2xl border transition-all hover:shadow-lg cursor-pointer ${
                    kullanici.sira <= 3
                      ? "bg-gradient-to-br from-[#395579]/10 via-[#4A6A8A]/5 to-transparent dark:from-[#395579]/20 dark:via-[#4A6A8A]/10 dark:to-transparent border-[#395579]/30 dark:border-[#4A6A8A]/40 hover:shadow-[#395579]/20"
                      : "bg-white dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 hover:border-[#395579]/50 dark:hover:border-[#4A6A8A]/50 hover:bg-[#395579]/5"
                  }`}
                >
                  {/* Sıra İkonu - Sol Üst */}
                  <div
                    className={`absolute top-2 left-2 w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gradient-to-br ${getRankColor(
                      kullanici.sira
                    )} flex items-center justify-center text-white text-xs md:text-sm font-medium shadow-md`}
                  >
                    {kullanici.sira <= 3 ? kullanici.rozet : kullanici.sira}
                  </div>

                  {/* Avatar - Sol Alt */}
                  <div className="absolute bottom-2 left-2 w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-[#2A4461] via-[#395579] to-[#4A6A8A] flex items-center justify-center text-white text-[10px] md:text-xs font-medium shadow-md">
                    {kullanici.avatar}
                  </div>

                  {/* İçerik - Ortada */}
                  <div className="flex flex-col gap-1.5 md:gap-2 pl-10 md:pl-12 pr-2">
                    {/* Kullanıcı Adı ve Rol */}
                    <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
                      <h3 className="text-[#1d2633] dark:text-white text-sm md:text-base font-medium">{kullanici.ad}</h3>
                      <span className="text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 rounded-full bg-[#395579]/10 dark:bg-[#395579]/20 text-[#395579] dark:text-[#7B99B3]">
                        {kullanici.rol}
                      </span>
                    </div>

                    {/* İstatistikler */}
                    <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs text-neutral-500 dark:text-neutral-400 flex-wrap">
                      <div className="flex items-center gap-1">
                        <Coins className="w-3 h-3 text-[#cea273]" />
                        <span>{kullanici.coin.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3 text-[#395579]" />
                        <span>{kullanici.baslik}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3 text-[#4A6A8A]" />
                        <span>{kullanici.begeni.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
