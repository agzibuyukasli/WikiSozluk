import { motion } from "motion/react";
import { ArrowLeft, Coins, MessageSquare, ThumbsUp, Trophy, Calendar, TrendingUp, Bookmark, Edit3, Eye } from "lucide-react";
import { useState } from "react";

interface KullaniciProfilSayfasiProps {
  kullanici: {
    ad: string;
    rol: string;
    avatar: string;
    coin: number;
    baslik: number;
    yorum: number;
    begeni: number;
    rozet: string;
  };
  onGeriDon: () => void;
  onBaslikClick?: (baslikId: number, kategori: string) => void;
}

export function KullaniciProfilSayfasi({ kullanici, onGeriDon, onBaslikClick }: KullaniciProfilSayfasiProps) {
  const [activeTab, setActiveTab] = useState<"basliklar" | "yorumlar" | "duzenlemeler">("basliklar");
  const [gorunenBaslikSayisi, setGorunenBaslikSayisi] = useState(3);
  const [gorunenYorumSayisi, setGorunenYorumSayisi] = useState(3);
  const [gorunenDuzenlemeSayisi, setGorunenDuzenlemeSayisi] = useState(3);

  // Dummy data - Başlıklar
  const basliklar = [
    {
      id: 1,
      icerik: "KTO Karatay Kampüs Rehberi - Yeni Öğrenciler İçin",
      kategori: "Akademik Destek",
      tarih: "2 saat önce",
      goruntulenme: 234,
      yorumSayisi: 12,
      begeniSayisi: 45,
    },
    {
      id: 5,
      icerik: "Konya'da Bisiklet Rotaları ve Güvenli Yollar",
      kategori: "Keşif Rehberi",
      tarih: "3 gün önce",
      goruntulenme: 456,
      yorumSayisi: 28,
      begeniSayisi: 67,
    },
    {
      id: 6,
      icerik: "Kampüste Ücretsiz Wi-Fi Erişim Noktaları",
      kategori: "Akademik Destek",
      tarih: "5 gün önce",
      goruntulenme: 189,
      yorumSayisi: 15,
      begeniSayisi: 38,
    },
    {
      id: 7,
      icerik: "Konya'nın En İyi Etliekmek Mekanları",
      kategori: "Keşif Rehberi",
      tarih: "1 hafta önce",
      goruntulenme: 672,
      yorumSayisi: 45,
      begeniSayisi: 123,
    },
    {
      id: 8,
      icerik: "Yaz Okulu Kayıt Rehberi 2025",
      kategori: "Akademik Destek",
      tarih: "2 hafta önce",
      goruntulenme: 543,
      yorumSayisi: 34,
      begeniSayisi: 89,
    },
  ];

  // Dummy data - Yorumlar
  const yorumlar = [
    {
      id: 2,
      baslikId: 20,
      icerik: "Harika bir başlık olmuş! Ben de eklemek istediğim birkaç detay var...",
      baslik: "Meram'da En İyi Kahve Mekanları",
      kategori: "Keşif Rehberi",
      tarih: "5 saat önce",
      begeniSayisi: 23,
    },
    {
      id: 4,
      baslikId: 15,
      icerik: "Bu konuda çok detaylı bilgi var, teşekkürler!",
      baslik: "Selçuk Hukuk Final Notları",
      kategori: "Akademik Destek",
      tarih: "2 gün önce",
      begeniSayisi: 34,
    },
    {
      id: 9,
      baslikId: 16,
      icerik: "Ben de geçen hafta gittim, gerçekten muhteşem bir yer!",
      baslik: "Alaaddin Tepesi Gün Batımı Manzarası",
      kategori: "Keşif Rehberi",
      tarih: "4 gün önce",
      begeniSayisi: 12,
    },
    {
      id: 10,
      baslikId: 8,
      icerik: "Ek olarak şunu da belirtmek isterim ki...",
      baslik: "KTO Kariyer Günleri 2025",
      kategori: "Etkinlikler",
      tarih: "6 gün önce",
      begeniSayisi: 19,
    },
    {
      id: 11,
      baslikId: 12,
      icerik: "Çok işime yaradı, harika bir paylaşım!",
      baslik: "Final Hazırlık Stratejileri",
      kategori: "Akademik Destek",
      tarih: "1 hafta önce",
      begeniSayisi: 27,
    },
  ];

  // Dummy data - Düzenlemeler
  const duzenlemeler = [
    {
      id: 3,
      baslikId: 5,
      icerik: "Güncellenen kütüphane saatlerini ekledim",
      baslik: "Kütüphane Çalışma Saatleri",
      kategori: "Akademik Destek",
      tarih: "1 gün önce",
      begeniSayisi: 18,
    },
    {
      id: 12,
      baslikId: 22,
      icerik: "Yeni açılan kafenin adresini güncelledim",
      baslik: "Selçuklu'da Öğrenci Dostu Kafeler",
      kategori: "Keşif Rehberi",
      tarih: "3 gün önce",
      begeniSayisi: 14,
    },
    {
      id: 13,
      baslikId: 9,
      icerik: "Etkinlik tarihlerini ve saatlerini düzelttim",
      baslik: "Kampüs Bahar Şenliği 2025",
      kategori: "Etkinlikler",
      tarih: "5 gün önce",
      begeniSayisi: 21,
    },
    {
      id: 14,
      baslikId: 17,
      icerik: "İletişim bilgilerini ve haritayı ekledim",
      baslik: "Mevlana Müzesi Ziyaret Rehberi",
      kategori: "Keşif Rehberi",
      tarih: "1 hafta önce",
      begeniSayisi: 16,
    },
  ];

  // Rol rengini belirle
  const getRolColor = (rol: string) => {
    if (rol.includes("Konya Bilgesi")) return "from-yellow-400 to-yellow-600";
    if (rol.includes("Kaşif Meraklısı")) return "from-purple-500 to-purple-600";
    if (rol.includes("Gezgin")) return "from-blue-500 to-blue-600";
    if (rol.includes("Seyyah")) return "from-green-500 to-green-600";
    return "from-gray-400 to-gray-500";
  };

  // Aktif tab'a göre veri getir
  const getActiveData = () => {
    if (activeTab === "basliklar") {
      return basliklar.slice(0, gorunenBaslikSayisi);
    } else if (activeTab === "yorumlar") {
      return yorumlar.slice(0, gorunenYorumSayisi);
    } else {
      return duzenlemeler.slice(0, gorunenDuzenlemeSayisi);
    }
  };

  // Daha fazla göster
  const dahaFazlaGoster = () => {
    if (activeTab === "basliklar") {
      setGorunenBaslikSayisi(prev => prev + 3);
    } else if (activeTab === "yorumlar") {
      setGorunenYorumSayisi(prev => prev + 3);
    } else {
      setGorunenDuzenlemeSayisi(prev => prev + 3);
    }
  };

  // Daha fazla var mı kontrol et
  const dahaFazlaVarMi = () => {
    if (activeTab === "basliklar") {
      return gorunenBaslikSayisi < basliklar.length;
    } else if (activeTab === "yorumlar") {
      return gorunenYorumSayisi < yorumlar.length;
    } else {
      return gorunenDuzenlemeSayisi < duzenlemeler.length;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onGeriDon}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-[#fcedd3]/20 via-white to-[#cea273]/10 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800 shadow-sm rounded-t-3xl">
          <div className="px-6 py-4">
            <button
              onClick={onGeriDon}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#015185] to-[#5990c0] text-white hover:shadow-lg transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Geri Dön</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 py-8 max-w-6xl mx-auto">
          {/* Profil Kartı */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-neutral-900 rounded-3xl shadow-xl border border-neutral-200 dark:border-neutral-800 p-8 mb-8"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#015185] to-[#5990c0] flex items-center justify-center text-white text-4xl shadow-2xl">
                  {kullanici.avatar}
                </div>
                <div className="absolute -bottom-2 -right-2 text-4xl">{kullanici.rozet}</div>
              </div>

              {/* Kullanıcı Bilgileri */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl text-[#102a6b] dark:text-white mb-3">
                  {kullanici.ad}
                </h1>
                <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${getRolColor(kullanici.rol)} text-white text-sm mb-4 shadow-lg`}>
                  {kullanici.rol}
                </div>

                {/* İstatistikler Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-[#fcedd3]/30 to-[#cea273]/20 dark:bg-neutral-800 border border-[#cea273]/30 dark:border-neutral-700">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                      <Coins className="w-5 h-5 text-[#cea273] dark:text-[#fcedd3]" />
                      <span className="text-xs text-neutral-600 dark:text-neutral-400">Coin</span>
                    </div>
                    <p className="text-2xl text-[#102a6b] dark:text-white text-center md:text-left">
                      {kullanici.coin.toLocaleString()}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:bg-neutral-800 border border-blue-200 dark:border-neutral-700">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                      <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-xs text-neutral-600 dark:text-neutral-400">Başlık</span>
                    </div>
                    <p className="text-2xl text-[#102a6b] dark:text-white text-center md:text-left">
                      {kullanici.baslik}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:bg-neutral-800 border border-green-200 dark:border-neutral-700">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                      <MessageSquare className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <span className="text-xs text-neutral-600 dark:text-neutral-400">Yorum</span>
                    </div>
                    <p className="text-2xl text-[#102a6b] dark:text-white text-center md:text-left">
                      {kullanici.yorum}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-br from-rose-50 to-rose-100 dark:bg-neutral-800 border border-rose-200 dark:border-neutral-700">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                      <ThumbsUp className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                      <span className="text-xs text-neutral-600 dark:text-neutral-400">Beğeni</span>
                    </div>
                    <p className="text-2xl text-[#102a6b] dark:text-white text-center md:text-left">
                      {kullanici.begeni.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Son Katkılar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-neutral-900 rounded-3xl shadow-xl border border-neutral-200 dark:border-neutral-800 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-br from-[#015185] to-[#5990c0] shadow-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl text-[#102a6b] dark:text-white">Son Katkılar</h2>
            </div>

            {/* Tab Butonları */}
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              <button
                onClick={() => setActiveTab("basliklar")}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeTab === "basliklar"
                    ? "bg-gradient-to-r from-[#015185] to-[#5990c0] text-white shadow-lg"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Başlıklar</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    activeTab === "basliklar"
                      ? "bg-white/20"
                      : "bg-neutral-200 dark:bg-neutral-700"
                  }`}>
                    {basliklar.length}
                  </span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("yorumlar")}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeTab === "yorumlar"
                    ? "bg-gradient-to-r from-[#015185] to-[#5990c0] text-white shadow-lg"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Yorumlar</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    activeTab === "yorumlar"
                      ? "bg-white/20"
                      : "bg-neutral-200 dark:bg-neutral-700"
                  }`}>
                    {yorumlar.length}
                  </span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("duzenlemeler")}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeTab === "duzenlemeler"
                    ? "bg-gradient-to-r from-[#015185] to-[#5990c0] text-white shadow-lg"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Edit3 className="w-4 h-4" />
                  <span>Düzenlemeler</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    activeTab === "duzenlemeler"
                      ? "bg-white/20"
                      : "bg-neutral-200 dark:bg-neutral-700"
                  }`}>
                    {duzenlemeler.length}
                  </span>
                </div>
              </button>
            </div>

            {/* İçerik Listesi */}
            <div className="space-y-3">
              {activeTab === "basliklar" && getActiveData().map((katki: any, index: number) => (
                <motion.div
                  key={katki.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onBaslikClick && onBaslikClick(katki.id, katki.kategori)}
                  className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-[#015185] dark:hover:border-[#5990c0] hover:shadow-lg transition-all bg-white dark:bg-neutral-900 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    {/* Tip İkonu */}
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shrink-0">
                      <MessageSquare className="w-5 h-5" />
                    </div>

                    {/* İçerik */}
                    <div className="flex-1 min-w-0">
                      {/* Kategori */}
                      <span className="inline-block px-3 py-1 rounded-full bg-[#015185]/10 dark:bg-[#5990c0]/20 text-[#015185] dark:text-[#5990c0] text-xs mb-2">
                        {katki.kategori}
                      </span>
                      
                      {/* İçerik */}
                      <p className="text-[#102a6b] dark:text-white mb-2 break-words">
                        {katki.icerik}
                      </p>

                      {/* Alt Bilgiler */}
                      <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400 flex-wrap">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{katki.tarih}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{katki.goruntulenme}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          <span>{katki.yorumSayisi}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" />
                          <span>{katki.begeniSayisi}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {activeTab === "yorumlar" && getActiveData().map((katki: any, index: number) => (
                <motion.div
                  key={katki.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onBaslikClick && onBaslikClick(katki.baslikId, katki.kategori)}
                  className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-[#015185] dark:hover:border-[#5990c0] hover:shadow-lg transition-all bg-white dark:bg-neutral-900 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    {/* Tip İkonu */}
                    <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 shrink-0">
                      <MessageSquare className="w-5 h-5" />
                    </div>

                    {/* İçerik */}
                    <div className="flex-1 min-w-0">
                      {/* İçerik */}
                      <p className="text-[#102a6b] dark:text-white mb-2 break-words">
                        {katki.icerik}
                      </p>

                      {/* Bağlantılı Başlık */}
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                        <span className="text-neutral-500 dark:text-neutral-500">→ </span>
                        {katki.baslik}
                      </p>

                      {/* Alt Bilgiler */}
                      <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400 flex-wrap">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{katki.tarih}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" />
                          <span>{katki.begeniSayisi}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {activeTab === "duzenlemeler" && getActiveData().map((katki: any, index: number) => (
                <motion.div
                  key={katki.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onBaslikClick && onBaslikClick(katki.baslikId, katki.kategori)}
                  className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-[#015185] dark:hover:border-[#5990c0] hover:shadow-lg transition-all bg-white dark:bg-neutral-900 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    {/* Tip İkonu */}
                    <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 shrink-0">
                      <Edit3 className="w-5 h-5" />
                    </div>

                    {/* İçerik */}
                    <div className="flex-1 min-w-0">
                      {/* İçerik */}
                      <p className="text-[#102a6b] dark:text-white mb-2 break-words">
                        {katki.icerik}
                      </p>

                      {/* Bağlantılı Başlık */}
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                        <span className="text-neutral-500 dark:text-neutral-500">→ </span>
                        {katki.baslik}
                      </p>

                      {/* Alt Bilgiler */}
                      <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400 flex-wrap">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{katki.tarih}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" />
                          <span>{katki.begeniSayisi}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Daha Fazla Göster Butonu */}
            {dahaFazlaVarMi() && (
              <div className="mt-6 text-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={dahaFazlaGoster}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#015185] to-[#5990c0] text-white hover:shadow-lg transition-all"
                >
                  Daha Fazla Göster
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}