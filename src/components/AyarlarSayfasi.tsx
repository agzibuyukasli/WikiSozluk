import { motion } from "motion/react";
import { X, Bell, Shield, Palette, Globe, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner@2.0.3";

interface AyarlarSayfasiProps {
  onClose: () => void;
}

export function AyarlarSayfasi({ onClose }: AyarlarSayfasiProps) {
  const [activeTab, setActiveTab] = useState<"bildirim" | "gizlilik" | "gorunum">("bildirim");
  
  // Bildirim ayarları - localStorage'dan oku
  const [bildirimler, setBildirimler] = useState(() => {
    const saved = localStorage.getItem('bildirimAyarlari');
    return saved ? JSON.parse(saved) : {
      yorumlar: true,
      begeniler: true,
      takipciler: true,
      trendler: false,
      oneriler: true,
      email: false,
    };
  });
  
  // Gizlilik ayarları - localStorage'dan oku
  const [gizlilik, setGizlilik] = useState(() => {
    const saved = localStorage.getItem('gizlilikAyarlari');
    return saved ? JSON.parse(saved) : {
      profilGizli: false,
      iletisim: "herkes",
      goruntuleme: true,
      aktivite: true,
    };
  });
  
  // Görünüm ayarları - localStorage'dan oku
  const [gorunum, setGorunum] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || 'light';
      const savedDil = localStorage.getItem('dil') || 'tr';
      const savedKompakt = localStorage.getItem('kompakt') === 'true';
      return {
        tema: savedTheme,
        dil: savedDil,
        kompakt: savedKompakt,
      };
    }
    return {
      tema: "light",
      dil: "tr",
      kompakt: false,
    };
  });

  // Tema değişikliklerini uygula
  useEffect(() => {
    const applyTheme = () => {
      const html = document.documentElement;
      
      if (gorunum.tema === 'dark') {
        html.classList.add('dark');
      } else if (gorunum.tema === 'light') {
        html.classList.remove('dark');
      } else if (gorunum.tema === 'auto') {
        // Sistem tercihini kontrol et
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
          html.classList.add('dark');
        } else {
          html.classList.remove('dark');
        }
      }
    };

    applyTheme();
    
    // Otomatik mod için sistem tercihi değişikliklerini dinle
    if (gorunum.tema === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme();
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [gorunum.tema]);

  const tabs = [
    { id: "bildirim", label: "Bildirimler", icon: Bell },
    { id: "gizlilik", label: "Gizlilik", icon: Shield },
    { id: "gorunum", label: "Görünüm", icon: Palette },
  ];

  const handleBildirimDegistir = (key: string, value: boolean) => {
    const yeniBildirimler = {
      ...bildirimler,
      [key]: value,
    };
    setBildirimler(yeniBildirimler);
    localStorage.setItem('bildirimAyarlari', JSON.stringify(yeniBildirimler));
  };

  const handleGizlilikDegistir = (key: string, value: any) => {
    const yeniGizlilik = {
      ...gizlilik,
      [key]: value,
    };
    setGizlilik(yeniGizlilik);
    localStorage.setItem('gizlilikAyarlari', JSON.stringify(yeniGizlilik));
  };

  const handleSave = () => {
    // Tüm ayarları kaydet
    localStorage.setItem('bildirimAyarlari', JSON.stringify(bildirimler));
    localStorage.setItem('gizlilikAyarlari', JSON.stringify(gizlilik));
    localStorage.setItem('theme', gorunum.tema);
    localStorage.setItem('dil', gorunum.dil);
    localStorage.setItem('kompakt', gorunum.kompakt.toString());
    
    toast.success("✅ Ayarlar kaydedildi!", {
      description: "Değişiklikleriniz başarıyla güncellendi.",
      duration: 3000,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 dark:bg-black/80 z-50 flex items-start justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="bg-white dark:bg-black rounded-3xl shadow-2xl dark:shadow-none dark:border dark:border-neutral-800 w-full max-w-4xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-[#015185] to-[#5990c0] dark:from-[#3a6ea5] dark:to-[#5990c0]">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-[#102a6b] dark:text-white">Ayarlar</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-xl transition-colors"
            >
              <X className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-6 overflow-x-auto pb-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-[#015185] to-[#5990c0] text-white shadow-lg"
                      : "bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[600px] overflow-y-auto">
          {/* Bildirim Tab */}
          {activeTab === "bildirim" && (
            <div className="space-y-4">
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                Hangi bildirimlerden haberdar olmak istediğinizi seçin
              </p>

              {[
                { key: "yorumlar", label: "Yorumlar", desc: "Başlıklarınıza yapılan yorumlar" },
                { key: "begeniler", label: "Beğeniler", desc: "İçeriklerinize yapılan beğeniler" },
                { key: "takipciler", label: "Takipçiler", desc: "Yeni takipçiler" },
                { key: "trendler", label: "Trend Başlıklar", desc: "Popüler olan başlıklar" },
                { key: "oneriler", label: "Öneriler", desc: "Size özel içerik önerileri" },
                { key: "email", label: "E-posta Bildirimleri", desc: "E-posta ile bildirim al" },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <div>
                    <p className="text-[#102a6b] dark:text-white">{item.label}</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => {
                      const newValue = !bildirimler[item.key as keyof typeof bildirimler];
                      handleBildirimDegistir(item.key, newValue);
                      toast.success(
                        newValue ? `✅ ${item.label} bildirimleri açıldı` : `🔕 ${item.label} bildirimleri kapatıldı`,
                        { duration: 2000 }
                      );
                    }}
                    className={`relative w-14 h-8 rounded-full transition-colors ${
                      bildirimler[item.key as keyof typeof bildirimler]
                        ? "bg-gradient-to-r from-[#015185] to-[#5990c0]"
                        : "bg-neutral-300 dark:bg-neutral-700"
                    }`}
                  >
                    <div
                      className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                        bildirimler[item.key as keyof typeof bildirimler]
                          ? "translate-x-6"
                          : ""
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Gizlilik Tab */}
          {activeTab === "gizlilik" && (
            <div className="space-y-4">
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                Gizlilik ve güvenlik ayarlarınızı yönetin
              </p>

              {/* Profil Gizliliği */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                <div>
                  <p className="text-[#102a6b] dark:text-white">Gizli Profil</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Sadece takipçileriniz görebilir
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newValue = !gizlilik.profilGizli;
                    handleGizlilikDegistir('profilGizli', newValue);
                    toast.success(
                      newValue ? "🔒 Profiliniz gizli olarak ayarlandı" : "🌐 Profiliniz herkese açık olarak ayarlandı",
                      { duration: 2000 }
                    );
                  }}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    gizlilik.profilGizli
                      ? "bg-gradient-to-r from-[#015185] to-[#5990c0]"
                      : "bg-neutral-300 dark:bg-neutral-700"
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                      gizlilik.profilGizli ? "translate-x-6" : ""
                    }`}
                  />
                </button>
              </div>

              {/* İletişim İzni */}
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900">
                <p className="text-[#102a6b] dark:text-white mb-3">Mesaj Gönderebilecekler</p>
                <div className="space-y-2">
                  {[
                    { value: "herkes", label: "Herkes", icon: "🌐" },
                    { value: "takipciler", label: "Sadece Takipçiler", icon: "👥" },
                    { value: "kimse", label: "Kimse", icon: "🚫" }
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="iletisim"
                        value={option.value}
                        checked={gizlilik.iletisim === option.value}
                        onChange={(e) => {
                          handleGizlilikDegistir('iletisim', e.target.value);
                          toast.success(`✉️ Mesaj izni "${option.label}" olarak ayarlandı`, { duration: 2000 });
                        }}
                        className="w-4 h-4 text-[#015185]"
                      />
                      <span className="text-2xl">{option.icon}</span>
                      <span className="text-neutral-700 dark:text-neutral-300">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Görüntülenme */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                <div>
                  <p className="text-[#102a6b] dark:text-white">Görüntülenme Sayılarını Göster</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Başlıklarınızın görüntülenme sayısını göster
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newValue = !gizlilik.goruntuleme;
                    handleGizlilikDegistir('goruntuleme', newValue);
                    toast.success(
                      newValue ? "👁️ Görüntülenme sayıları gösteriliyor" : "🙈 Görüntülenme sayıları gizlendi",
                      { duration: 2000 }
                    );
                  }}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    gizlilik.goruntuleme
                      ? "bg-gradient-to-r from-[#015185] to-[#5990c0]"
                      : "bg-neutral-300 dark:bg-neutral-700"
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                      gizlilik.goruntuleme ? "translate-x-6" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Aktivite Durumu */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                <div>
                  <p className="text-[#102a6b] dark:text-white">Aktivite Durumu</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Çevrimiçi durumunuzu göster
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newValue = !gizlilik.aktivite;
                    handleGizlilikDegistir('aktivite', newValue);
                    toast.success(
                      newValue ? "🟢 Aktivite durumu gösteriliyor" : "⚫ Aktivite durumu gizlendi",
                      { duration: 2000 }
                    );
                  }}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    gizlilik.aktivite
                      ? "bg-gradient-to-r from-[#015185] to-[#5990c0]"
                      : "bg-neutral-300 dark:bg-neutral-700"
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                      gizlilik.aktivite ? "translate-x-6" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {/* Görünüm Tab */}
          {activeTab === "gorunum" && (
            <div className="space-y-4">
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                Uygulamanın görünümünü özelleştirin
              </p>

              {/* Tema */}
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900">
                <p className="text-[#102a6b] dark:text-white mb-3">Tema</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: "light", label: "Açık", icon: "☀️" },
                    { value: "dark", label: "Koyu", icon: "🌙" },
                    { value: "auto", label: "Otomatik", icon: "🔄" },
                  ].map((tema) => (
                    <button
                      key={tema.value}
                      onClick={() => {
                        setGorunum({ ...gorunum, tema: tema.value });
                        localStorage.setItem('theme', tema.value);
                        toast.success(`${tema.icon} Tema "${tema.label}" olarak değiştirildi`, { duration: 2000 });
                      }}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        gorunum.tema === tema.value
                          ? "border-[#015185] dark:border-[#5990c0] bg-[#fcedd3]/20 dark:bg-neutral-800"
                          : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600"
                      }`}
                    >
                      <div className="text-2xl mb-2">{tema.icon}</div>
                      <div className="text-sm text-neutral-700 dark:text-neutral-300">{tema.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dil */}
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900">
                <label className="block text-[#102a6b] dark:text-white mb-3 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Dil Seçimi
                </label>
                <select
                  value={gorunum.dil}
                  onChange={(e) => {
                    const dilMap: {[key: string]: string} = {
                      tr: "Türkçe 🇹🇷",
                      en: "English 🇬🇧",
                      ar: "العربية 🇸🇦"
                    };
                    setGorunum({ ...gorunum, dil: e.target.value });
                    localStorage.setItem('dil', e.target.value);
                    toast.success(`🌐 Dil ${dilMap[e.target.value]} olarak değiştirildi`, { duration: 2000 });
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#015185] dark:focus:ring-[#5990c0] transition-all bg-white"
                >
                  <option value="tr">🇹🇷 Türkçe</option>
                  <option value="en">🇬🇧 English</option>
                  <option value="ar">🇸🇦 العربية</option>
                </select>
              </div>

              {/* Kompakt Mod */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                <div>
                  <p className="text-[#102a6b] dark:text-white">Kompakt Görünüm</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Daha az boşluk, daha fazla içerik
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newValue = !gorunum.kompakt;
                    setGorunum({ ...gorunum, kompakt: newValue });
                    localStorage.setItem('kompakt', newValue.toString());
                    toast.success(
                      newValue ? "📏 Kompakt görünüm açıldı" : "📐 Normal görünüm açıldı",
                      { duration: 2000 }
                    );
                  }}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    gorunum.kompakt
                      ? "bg-gradient-to-r from-[#015185] to-[#5990c0]"
                      : "bg-neutral-300 dark:bg-neutral-700"
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                      gorunum.kompakt ? "translate-x-6" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Bilgilendirme */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#fcedd3]/30 to-[#cea273]/20 border border-[#cea273]/30">
                <p className="text-sm text-[#102a6b] dark:text-neutral-300">
                  💡 <strong>İpucu:</strong> Ayarlarınız otomatik olarak kaydedilir ve tüm cihazlarınızda geçerli olur.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
          >
            Kapat
          </button>
          <button
            onClick={() => {
              handleSave();
              setTimeout(() => {
                onClose();
              }, 1000);
            }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#015185] to-[#5990c0] text-white hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Kaydet ve Kapat
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
