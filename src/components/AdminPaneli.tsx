import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Shield, Users, FileText, MessageSquare, BarChart3, Settings, 
  CheckCircle, XCircle, Eye, Edit, Trash2, TrendingUp, Clock,
  Search, Filter, Plus, LogOut, Activity, Award,
  Calendar, Flame, Hash, Star, X, Save, Flag,
  Mail, Phone, MapPin, Globe, BookOpen, Home, Target, Trophy,
  Instagram, Twitter, Facebook, Youtube, Linkedin,
  HelpCircle, FileQuestion, Scale, BadgeCheck, Crown, Gem, Zap, Rocket, GraduationCap,
  Coins, ThumbsUp, ThumbsDown, Heart, UserPlus
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { BildirilenIcerikler } from "./BildirilenIcerikler";

interface AdminPaneliProps {
  onCikis: () => void;
  onAnasayfayaGit: () => void;
  onaylananOneriler: number[];
  setOnaylananOneriler: (ids: number[]) => void;
  duzenlemOnerileri?: any[];
  setDuzenlemOnerileri?: (oneriler: any[]) => void;
}

export function AdminPaneli({ onCikis, onAnasayfayaGit, onaylananOneriler, setOnaylananOneriler, duzenlemOnerileri = [], setDuzenlemOnerileri }: AdminPaneliProps) {
  const [aktifSekme, setAktifSekme] = useState<"genel" | "basliklar" | "oneriler" | "duzenlemeler" | "kullanicilar" | "istatistikler" | "bildirilenler" | "coinayarlari">("oneriler");
  const [aramaTermi, setAramaTermi] = useState("");
  
  // Coin Kuralları State
  const [coinKurallari, setCoinKurallari] = useState(() => {
    const saved = localStorage.getItem('coinKurallari');
    return saved ? JSON.parse(saved) : {
      yeniBaslik: 20,
      bilgiDuzenleme: 10,
      yorumYazma: 2,
      yararliOy: 5,
      yararsizOy: -10,
      yorumBegeni: 1,
      arkadasDavet: 50,
      kulturkartProje: 100
    };
  });
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  const adminMenuRef = useRef<HTMLDivElement>(null);

  // Düzenleme modalları için state'ler
  const [duzenlenenOneri, setDuzenlenenOneri] = useState<any>(null);
  const [duzenlenenBaslik, setDuzenlenenBaslik] = useState<any>(null);
  const [duzenlenenYorum, setDuzenlenenYorum] = useState<any>(null);
  const [duzenlenenKullanici, setDuzenlenenKullanici] = useState<any>(null);
  const [goruntulenecekKullanici, setGoruntulenecekKullanici] = useState<any>(null);
  const [footerModal, setFooterModal] = useState<"hakkimizda" | "iletisim" | "rozetler" | "sss" | "kullanim" | "gizlilik" | "yardim" | null>(null);
  const [onaylanacakDuzenleme, setOnaylanacakDuzenleme] = useState<any>(null);
  const [duzenlenenDuzenlemOneri, setDuzenlenenDuzenlemOneri] = useState<any>(null);

  // Örnek düzenleme önerileri
  const [ornekDuzenlemeler] = useState([
    {
      id: 101,
      baslikId: 1,
      eskiBaslik: "Kampüste en iyi kahve nerede içilir?",
      yeniBaslik: "Kampüste en iyi kahve nerede içilir? ☕",
      eskiIcerik: "Kampüste kahve içmek için en iyi mekanları arıyorum.",
      yeniIcerik: "Kampüste kahve içmek için en iyi mekanları arıyorum. Özellikle sabahları erken açık olan ve fiyatları uygun olan yerler olursa çok iyi olur.",
      kategori: "Yeme & İçme",
      duzenleyen: "Mehmet T.",
      tarih: "2 saat önce",
      degisiklikAciklamasi: "Başlığa emoji eklendi ve içerik detaylandırıldı"
    },
    {
      id: 102,
      baslikId: 2,
      eskiBaslik: "Meram'da gezilecek yerler",
      yeniBaslik: "Meram'da gezilecek tarihi ve doğal yerler",
      eskiIcerik: "Meram bölgesinde gezilecek yerler hakkında bilgi arıyorum.",
      yeniIcerik: "Meram bölgesinde gezilip görülecek tarihi ve doğal yerler hakkında detaylı bilgi arıyorum. Özellikle hafta sonları gidilebilecek, ailece vakit geçirilebilecek yerler önerebilir misiniz?",
      kategori: "Gezi",
      duzenleyen: "Zeynep K.",
      tarih: "4 saat önce",
      degisiklikAciklamasi: "Başlık daha açıklayıcı hale getirildi ve içerik genişletildi"
    },
    {
      id: 103,
      baslikId: 5,
      eskiBaslik: "Konya'da öğrenci indirimi olan yerler",
      yeniBaslik: "Konya'da öğrenci indirimi olan mekanlar ve aktiviteler",
      eskiIcerik: "Öğrenci kartıyla indirim yapılan yerler var mı?",
      yeniIcerik: "Selçuk Üniversitesi öğrenci kartıyla indirim yapılan restoranlar, kafeler, kültürel mekanlar ve aktiviteler hakkında bilgi paylaşımı yapabiliriz. Sizin bildiğiniz yerler var mı?",
      kategori: "Sosyal Yaşam",
      duzenleyen: "Ahmet Y.",
      tarih: "6 saat önce",
      degisiklikAciklamasi: "İçerik daha kapsayıcı ve bilgilendirici yapıldı"
    },
  ]);

  // Eğer dışarıdan düzenleme önerileri gelmiyorsa örnek verileri kullan
  const gosterilecekDuzenlemeler = duzenlemOnerileri.length > 0 ? duzenlemOnerileri : ornekDuzenlemeler;

  // Dropdown menü dışına tıklandığında kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (adminMenuRef.current && !adminMenuRef.current.contains(event.target as Node)) {
        setIsAdminMenuOpen(false);
      }
    };

    if (isAdminMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAdminMenuOpen]);

  // Başlangıç önerileri
  const tumOneriler = [
    {
      id: 1,
      baslik: "Kampüste yeni açılan spor salonu",
      kategori: "Spor",
      gonderen: "Ahmet Y.",
      tarih: "2 saat önce",
      durum: "beklemede",
      icerik: "Yeni açılan spor salonunda modern fitness ekipmanları ve grup dersleri mevcut. Öğrencilere özel indirimli üyelik paketleri sunuluyor."
    },
    {
      id: 2,
      baslik: "Selçuklu'da vegan restoran önerisi",
      kategori: "Yeme & İçme",
      gonderen: "Zeynep K.",
      tarih: "5 saat önce",
      durum: "beklemede",
      icerik: "Selçuklu çevresinde tamamen bitki bazlı menü sunan harika bir restoran buldum. Fiyatlar öğrenci dostu ve menü çeşitliliği çok iyi."
    },
    {
      id: 3,
      baslik: "Konya'da yoga dersleri",
      kategori: "Sosyal Yaşam",
      gonderen: "Mehmet T.",
      tarih: "1 gün önce",
      durum: "beklemede",
      icerik: "Meram bölgesinde düzenlenen ücretsiz yoga derslerinden haberdar oldum. Her cumartesi sabahı parkta yapılıyor."
    },
  ];

  // Onaylanmamış önerileri filtrele
  const bekleyenOneriler = tumOneriler.filter(oneri => !onaylananOneriler.includes(oneri.id));

  // Örnek başlıklar
  const [basliklar, setBasliklar] = useState([
    {
      id: 1,
      baslik: "Kampüste en iyi kahve nerede içilir?",
      kategori: "Yeme & İçme",
      yazar: "Bey gör",
      tarih: "1 saat önce",
      yorumSayisi: 12,
      goruntulenme: 145,
      icerik: "Kampüste kahve içmek için en iyi mekanları arıyorum. Özellikle sabahları erken açık olan ve fiyatları uygun olan yerler olursa çok iyi olur. Ayrıca wifi ve çalışma ortamı olan kafeler de tercih sebebi."
    },
    {
      id: 2,
      baslik: "Meram'da gezilecek yerler",
      kategori: "Gezi",
      yazar: "Ahmet Y.",
      tarih: "3 saat önce",
      yorumSayisi: 8,
      goruntulenme: 89,
      icerik: "Meram bölgesinde gezilip görülecek tarihi ve doğal yerler hakkında bilgi arıyorum. Özellikle hafta sonları gidilebilecek, ailece vakit geçirilebilecek yerler önerebilir misiniz? Fotoğraf çekmek için güzel noktalara da açığım."
    },
    {
      id: 3,
      baslik: "Konya'da öğrenci indirimi olan yerler",
      kategori: "Sosyal Yaşam",
      yazar: "Zeynep K.",
      tarih: "5 saat önce",
      yorumSayisi: 15,
      goruntulenme: 234,
      icerik: "Selçuk Üniversitesi öğrenci kartıyla indirim yapılan restoranlar, kafeler, kültürel mekanlar ve aktiviteler hakkında bilgi paylaşımı yapabiliriz. Sizin bildiğiniz yerler var mı?"
    },
    {
      id: 4,
      baslik: "Kampüste spor salonu önerileri",
      kategori: "Spor",
      yazar: "Mehmet T.",
      tarih: "8 saat önce",
      yorumSayisi: 6,
      goruntulenme: 78,
      icerik: "Kampüs içinde veya yakınında uygun fiyatlı spor salonları arıyorum. Grup dersleri olan yerler olursa harika olur."
    },
    {
      id: 5,
      baslik: "Konya'da vegan restoranlar",
      kategori: "Yeme & İçme",
      yazar: "Ayşe M.",
      tarih: "1 gün önce",
      yorumSayisi: 10,
      goruntulenme: 156,
      icerik: "Konya'da vegan/vejetaryen menü sunan restoranlar hakkında önerileriniz neler? Özellikle öğrenci dostu fiyatları olan yerler önerebilir misiniz?"
    },
  ]);

  // Örnek yorumlar
  const [yorumlar, setYorumlar] = useState([
    {
      id: 1,
      yorum: "Kampüsteki yeni kütüphane harika!",
      baslik: "Kampüste en iyi çalışma yerleri",
      yazar: "Zeynep K.",
      tarih: "30 dk önce",
      begeniSayisi: 5
    },
    {
      id: 2,
      yorum: "Selçuklu'daki o cafenin kahvesi gerçekten çok güzel.",
      baslik: "Kampüste en iyi kahve nerede içilir?",
      yazar: "Mehmet T.",
      tarih: "1 saat önce",
      begeniSayisi: 8
    },
    {
      id: 3,
      yorum: "Meram Bağları'nı mutlaka ziyaret edin, harika bir yer!",
      baslik: "Meram'da gezilecek yerler",
      yazar: "Ahmet Y.",
      tarih: "2 saat önce",
      begeniSayisi: 12
    },
    {
      id: 4,
      yorum: "Kültür Park'ta öğrencilere %20 indirim var, öğrenci kartı göstermeniz yeterli.",
      baslik: "Konya'da öğrenci indirimi olan yerler",
      yazar: "Bey gör",
      tarih: "3 saat önce",
      begeniSayisi: 15
    },
    {
      id: 5,
      yorum: "Kampüsteki spor merkezi çok uygun fiyatlı, aylık 150 TL civarı.",
      baslik: "Kampüste spor salonu önerileri",
      yazar: "Zeynep K.",
      tarih: "5 saat önce",
      begeniSayisi: 7
    },
    {
      id: 6,
      yorum: "Vegan Cafe'nin lezzetleri harika, mutlaka deneyin!",
      baslik: "Konya'da vegan restoranlar",
      yazar: "Ayşe M.",
      tarih: "6 saat önce",
      begeniSayisi: 9
    },
  ]);

  // Kullanıcı listesi
  const [kullanicilar, setKullanicilar] = useState([
    { id: 1, ad: "Bey gör", rol: "Gezgin", coins: 5000, basliklar: 12, yorumlar: 34, durum: "aktif", kayitTarihi: "2024-01-15", email: "beygör@selcuk.edu.tr" },
    { id: 2, ad: "Ahmet Y.", rol: "Seyyah", coins: 1250, basliklar: 5, yorumlar: 23, durum: "aktif", kayitTarihi: "2023-11-20", email: "ahmet.y@selcuk.edu.tr" },
    { id: 3, ad: "Zeynep K.", rol: "Gezgin", coins: 4500, basliklar: 12, yorumlar: 67, durum: "aktif", kayitTarihi: "2023-08-10", email: "zeynep.k@selcuk.edu.tr" },
    { id: 4, ad: "Mehmet T.", rol: "Kaşif Meraklısı", coins: 15000, basliklar: 34, yorumlar: 156, durum: "aktif", kayitTarihi: "2023-03-05", email: "mehmet.t@selcuk.edu.tr" },
    { id: 5, ad: "Ayşe M.", rol: "Konya Bilgesi", coins: 67000, basliklar: 89, yorumlar: 432, durum: "aktif", kayitTarihi: "2022-09-15", email: "ayse.m@selcuk.edu.tr" },
  ]);

  // İstatistikler
  const [istatistikler] = useState({
    toplamKullanici: 1247,
    aktifKullanici: 856,
    toplamBaslik: 3421,
    toplamYorum: 12567,
    bugunYeniBaslik: 23,
    bugunYeniYorum: 145,
    bekleyenOneri: bekleyenOneriler.length,
  });

  const handleOneriOnayla = (id: number) => {
    setOnaylananOneriler([...onaylananOneriler, id]);
    toast.success("Öneri başarıyla onaylandı ve yayınlandı! ✅");
  };

  const handleOneriReddet = (id: number) => {
    setOnaylananOneriler([...onaylananOneriler, id]);
    toast.error("Öneri reddedildi");
  };

  const handleOneriDuzenle = (oneri: any) => {
    setDuzenlenenOneri({...oneri});
  };

  const handleOneriKaydet = () => {
    toast.success("Öneri başarıyla güncellendi! ✏️");
    setDuzenlenenOneri(null);
  };

  const handleDuzenlemKaydet = () => {
    toast.success("Düzenleme önerisi başarıyla güncellendi! ✏️");
    setDuzenlenenDuzenlemOneri(null);
  };

  const handleDuzenlemOnayla = (id: number) => {
    if (setDuzenlemOnerileri) {
      const guncelOneriler = duzenlemOnerileri.filter(d => d.id !== id);
      setDuzenlemOnerileri(guncelOneriler);
    }
    toast.success("Düzenleme onaylandı ve yayınlandı! ✅", {
      description: "Değişiklikler başlığa uygulandı.",
      duration: 3000,
    });
  };

  const handleDuzenlemReddet = (id: number) => {
    if (setDuzenlemOnerileri) {
      const guncelOneriler = duzenlemOnerileri.filter(d => d.id !== id);
      setDuzenlemOnerileri(guncelOneriler);
    }
    toast.error("Düzenleme reddedildi", {
      description: "Öneri gönderene bildirim gönderildi.",
      duration: 3000,
    });
  };

  const handleBaslikDuzenle = (baslik: any) => {
    setDuzenlenenBaslik({...baslik});
  };

  const handleBaslikKaydet = () => {
    setBasliklar(basliklar.map(b => 
      b.id === duzenlenenBaslik.id ? duzenlenenBaslik : b
    ));
    toast.success("Başlık başarıyla güncellendi! ✏️");
    setDuzenlenenBaslik(null);
  };

  const handleBaslikSil = (id: number) => {
    setBasliklar(basliklar.filter(b => b.id !== id));
    toast.success("Başlık silindi! 🗑️");
  };

  const handleYorumDuzenle = (yorum: any) => {
    setDuzenlenenYorum({...yorum});
  };

  const handleYorumKaydet = () => {
    setYorumlar(yorumlar.map(y => 
      y.id === duzenlenenYorum.id ? duzenlenenYorum : y
    ));
    toast.success("Yorum başarıyla güncellendi! ✏️");
    setDuzenlenenYorum(null);
  };

  const handleYorumSil = (id: number) => {
    setYorumlar(yorumlar.filter(y => y.id !== id));
    toast.success("Yorum silindi! 🗑️");
  };

  const handleKullaniciDuzenle = (kullanici: any) => {
    setDuzenlenenKullanici({...kullanici});
  };

  const handleKullaniciKaydet = () => {
    setKullanicilar(kullanicilar.map(k => 
      k.id === duzenlenenKullanici.id ? duzenlenenKullanici : k
    ));
    toast.success("Kullanıcı bilgileri güncellendi! ✏️");
    setDuzenlenenKullanici(null);
  };

  const handleCikis = () => {
    toast.info("Admin panelinden çıkış yapılıyor...");
    setTimeout(() => {
      onCikis();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fcedd3]/30 via-white to-[#fcedd3]/20 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1d2633] to-[#28374a] dark:from-neutral-900 dark:to-neutral-800 text-white shadow-xl border-b-4 border-[#28374a] dark:border-neutral-700">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center justify-between gap-2">
            {/* Logo ve Başlık */}
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-[#1d2633] to-[#28374a] flex items-center justify-center shadow-lg">
                <Shield className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg md:text-2xl flex items-center gap-1 md:gap-2">
                  Admin Paneli
                  <span className="text-sm md:text-lg">👑</span>
                </h1>
                <p className="text-xs md:text-sm text-white/70 dark:text-white/50 hidden sm:block">WikiSözlük Yönetim Paneli</p>
              </div>
            </div>

            {/* Sağ Taraf - Anasayfa ve Admin Profil */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Anasayfa Butonu */}
              <button
                onClick={onAnasayfayaGit}
                className="hidden sm:flex items-center gap-2 px-3 md:px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all"
              >
                <Activity className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-sm md:text-base">Anasayfa</span>
              </button>

              {/* Admin Profil Dropdown */}
              <div className="relative" ref={adminMenuRef}>
                <button
                  onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
                  className="flex items-center gap-2 px-2 md:px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all"
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#1d2633] to-[#28374a] dark:from-neutral-700 dark:to-neutral-800 flex items-center justify-center text-lg md:text-xl shadow-lg dark:shadow-neutral-900">
                    🛡️
                  </div>
                  <div className="hidden md:flex flex-col items-start">
                    <span className="text-sm">Admin</span>
                    <span className="text-xs text-white/70">Yönetici</span>
                  </div>
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isAdminMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-neutral-200"
                    >
                      {/* Profil Bilgileri */}
                      <div className="p-4 bg-gradient-to-r from-[#1d2633] to-[#28374a] dark:from-neutral-800 dark:to-neutral-900 text-white">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1d2633] to-[#28374a] dark:from-neutral-700 dark:to-neutral-800 flex items-center justify-center text-2xl shadow-lg dark:shadow-neutral-900">
                            🛡️
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span>Admin</span>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-[#28374a] dark:bg-neutral-700">👑</span>
                            </div>
                            <p className="text-sm text-white/80">Yönetici</p>
                          </div>
                        </div>
                      </div>

                      {/* Menü */}
                      <div className="p-2">
                        {/* Anasayfa - Sadece Mobil */}
                        <button
                          onClick={() => {
                            setIsAdminMenuOpen(false);
                            onAnasayfayaGit();
                          }}
                          className="w-full flex sm:hidden items-center gap-3 px-4 py-3 hover:bg-neutral-50 rounded-xl transition-colors text-left text-neutral-700"
                        >
                          <Activity className="w-5 h-5 text-[#5990c0]" />
                          <span>Anasayfa</span>
                        </button>

                        {/* Çıkış Yap */}
                        <button
                          onClick={() => {
                            setIsAdminMenuOpen(false);
                            handleCikis();
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-xl transition-colors text-left text-red-600"
                        >
                          <LogOut className="w-5 h-5" />
                          <span>Çıkış Yap</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigasyon - Desktop */}
      <div className="hidden md:block bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            <button
              onClick={() => setAktifSekme("oneriler")}
              className={`px-6 py-4 transition-all whitespace-nowrap border-b-2 relative ${
                aktifSekme === "oneriler"
                  ? "border-[#cea273] dark:border-neutral-500 text-[#1C2E4A] dark:text-neutral-200"
                  : "border-transparent text-neutral-600 dark:text-neutral-400 hover:text-[#1C2E4A] dark:hover:text-neutral-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Onay Bekleyen Öneriler
                {bekleyenOneriler.length > 0 && (
                  <span className="px-2 py-0.5 bg-[#cea273] text-white text-xs rounded-full">
                    {bekleyenOneriler.length}
                  </span>
                )}
              </div>
            </button>

            <button
              onClick={() => setAktifSekme("duzenlemeler")}
              className={`px-6 py-4 transition-all whitespace-nowrap border-b-2 ${
                aktifSekme === "duzenlemeler"
                  ? "border-[#cea273] dark:border-neutral-500 text-[#1C2E4A] dark:text-neutral-200"
                  : "border-transparent text-neutral-600 dark:text-neutral-400 hover:text-[#1C2E4A] dark:hover:text-neutral-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <Edit className="w-4 h-4" />
                Düzenleme Önerileri
                {duzenlemOnerileri.length > 0 && (
                  <span className="px-2 py-0.5 bg-[#cea273] text-white text-xs rounded-full">
                    {duzenlemOnerileri.length}
                  </span>
                )}
              </div>
            </button>

            <button
              onClick={() => setAktifSekme("basliklar")}
              className={`px-6 py-4 transition-all whitespace-nowrap border-b-2 ${
                aktifSekme === "basliklar"
                  ? "border-[#cea273] dark:border-neutral-500 text-[#1C2E4A] dark:text-neutral-200"
                  : "border-transparent text-neutral-600 dark:text-neutral-400 hover:text-[#1C2E4A] dark:hover:text-neutral-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Başlıklar & Yorumlar
              </div>
            </button>

            <button
              onClick={() => setAktifSekme("bildirilenler")}
              className={`px-6 py-4 transition-all whitespace-nowrap border-b-2 ${
                aktifSekme === "bildirilenler"
                  ? "border-[#cea273] dark:border-neutral-500 text-[#1C2E4A] dark:text-neutral-200"
                  : "border-transparent text-neutral-600 dark:text-neutral-400 hover:text-[#1C2E4A] dark:hover:text-neutral-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <Flag className="w-4 h-4" />
                Bildirilen İçerikler
              </div>
            </button>

            <button
              onClick={() => setAktifSekme("kullanicilar")}
              className={`px-6 py-4 transition-all whitespace-nowrap border-b-2 ${
                aktifSekme === "kullanicilar"
                  ? "border-[#cea273] dark:border-neutral-500 text-[#1C2E4A] dark:text-neutral-200"
                  : "border-transparent text-neutral-600 dark:text-neutral-400 hover:text-[#1C2E4A] dark:hover:text-neutral-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Kullanıcılar
              </div>
            </button>

            <button
              onClick={() => setAktifSekme("istatistikler")}
              className={`px-6 py-4 transition-all whitespace-nowrap border-b-2 ${
                aktifSekme === "istatistikler"
                  ? "border-[#cea273] dark:border-neutral-500 text-[#1C2E4A] dark:text-neutral-200"
                  : "border-transparent text-neutral-600 dark:text-neutral-400 hover:text-[#1C2E4A] dark:hover:text-neutral-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                İstatistikler
              </div>
            </button>

            <button
              onClick={() => setAktifSekme("coinayarlari")}
              className={`px-6 py-4 transition-all whitespace-nowrap border-b-2 ${
                aktifSekme === "coinayarlari"
                  ? "border-[#cea273] dark:border-neutral-500 text-[#1C2E4A] dark:text-neutral-200"
                  : "border-transparent text-neutral-600 dark:text-neutral-400 hover:text-[#1C2E4A] dark:hover:text-neutral-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4" />
                Coin Ayarları
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Navigasyon - Mobile */}
      <div className="md:hidden bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 shadow-sm sticky top-0 z-10">
        <div className="px-4 py-3">
          <select
            value={aktifSekme}
            onChange={(e) => setAktifSekme(e.target.value as any)}
            className="w-full px-4 py-3 rounded-xl border-2 border-[#cea273] dark:border-neutral-700 bg-white dark:bg-neutral-800 text-[#1C2E4A] dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#cea273]"
          >
            <option value="oneriler">
              🔔 Onay Bekleyen Öneriler {bekleyenOneriler.length > 0 ? `(${bekleyenOneriler.length})` : ''}
            </option>
            <option value="duzenlemeler">
              ✏️ Düzenleme Önerileri {duzenlemOnerileri.length > 0 ? `(${duzenlemOnerileri.length})` : ''}
            </option>
            <option value="basliklar">💬 Başlıklar & Yorumlar</option>
            <option value="bildirilenler">🚩 Bildirilen İçerikler</option>
            <option value="kullanicilar">👥 Kullanıcılar</option>
            <option value="istatistikler">📊 İstatistikler</option>
            <option value="coinayarlari">🪙 Coin Ayarları</option>
          </select>
        </div>
      </div>

      {/* Ana İçerik */}
      <div className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {/* Genel Bakış */}
          {aktifSekme === "genel" && (
            <motion.div
              key="genel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl text-[#1565c0] dark:text-neutral-200 mb-6">Genel Bakış</h2>

              <div className="bg-white dark:bg-neutral-800 rounded-2xl p-12 text-center shadow-lg border border-neutral-200 dark:border-neutral-700">
                <BarChart3 className="w-16 h-16 text-[#1976d2] dark:text-neutral-400 mx-auto mb-4" />
                <h3 className="text-xl text-neutral-900 dark:text-neutral-100 mb-2">Bu alan yakında doldurulacak</h3>
                <p className="text-neutral-600 dark:text-neutral-400">Genel bakış içerikleri buraya eklenecek.</p>
              </div>
            </motion.div>
          )}

          {/* Onay Bekleyen Öneriler */}
          {aktifSekme === "oneriler" && (
            <motion.div
              key="oneriler"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6 px-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-9 bg-gradient-to-b from-[#2A4461] via-[#395579] to-[#4A6A8A] rounded-full shadow-lg shadow-[#395579]/30"></div>
                  <div className="w-1.5 h-7 bg-gradient-to-b from-[#395579] to-[#5A7A9A] rounded-full opacity-80"></div>
                  <div className="w-1 h-5 bg-gradient-to-b from-[#4A6A8A] to-[#7B99B3] rounded-full opacity-60"></div>
                  <div className="w-0.5 h-3 bg-[#5A7A9A] rounded-full opacity-40"></div>
                </div>
                <h2 className="text-neutral-700 dark:text-neutral-200">Onay Bekleyen Öneriler</h2>
              </div>

              {bekleyenOneriler.length === 0 ? (
                <div className="relative bg-gradient-to-br from-[#395579]/12 via-[#4A6A8A]/10 to-[#5A7A9A]/8 dark:from-[#395579]/18 dark:via-[#4A6A8A]/15 dark:to-[#5A7A9A]/12 rounded-3xl p-12 shadow-2xl shadow-[#395579]/12 overflow-hidden text-center">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#395579]/8 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#5A7A9A]/12 rounded-full blur-3xl"></div>
                  <CheckCircle className="w-16 h-16 text-green-500 dark:text-green-400 mx-auto mb-4 relative z-10" />
                  <h3 className="text-xl text-neutral-900 dark:text-neutral-100 mb-2 relative z-10">Tüm öneriler incelendi! ✨</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 relative z-10">Şu anda onay bekleyen öneri bulunmuyor.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bekleyenOneriler.map((oneri, index) => (
                    <motion.div
                      key={oneri.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.05 }}
                      className="group relative bg-white/85 dark:bg-neutral-800/85 backdrop-blur-lg rounded-2xl p-4 md:p-6 hover:bg-gradient-to-r hover:from-[#395579]/18 hover:via-[#4A6A8A]/12 hover:to-transparent dark:hover:from-[#395579]/25 dark:hover:via-[#4A6A8A]/18 dark:hover:to-transparent hover:shadow-2xl hover:shadow-[#395579]/25 transition-all duration-300 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#395579]/0 via-[#395579]/8 to-[#395579]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#395579]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {duzenlenenOneri?.id === oneri.id ? (
                        <div className="relative flex flex-col gap-4">
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm text-[#395579] dark:text-[#7B99B3] mb-2">Kategori</label>
                              <select
                                value={duzenlenenOneri.kategori}
                                onChange={(e) => setDuzenlenenOneri({...duzenlenenOneri, kategori: e.target.value})}
                                className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-neutral-900/50 border-2 border-[#395579]/30 dark:border-[#395579]/40 text-neutral-700 dark:text-neutral-200 focus:border-[#395579] focus:outline-none transition-all"
                              >
                                <option value="Yeme & İçme">Yeme & İçme</option>
                                <option value="Barınma">Barınma</option>
                                <option value="Sosyal Yaşam">Sosyal Yaşam</option>
                                <option value="Akademik">Akademik</option>
                                <option value="Spor">Spor</option>
                                <option value="Gezi">Gezi</option>
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm text-[#395579] dark:text-[#7B99B3] mb-2">Başlık</label>
                              <input
                                type="text"
                                value={duzenlenenOneri.baslik}
                                onChange={(e) => setDuzenlenenOneri({...duzenlenenOneri, baslik: e.target.value})}
                                className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-neutral-900/50 border-2 border-[#395579]/30 dark:border-[#395579]/40 text-neutral-700 dark:text-neutral-200 focus:border-[#395579] focus:outline-none transition-all"
                              />
                            </div>

                            <div>
                              <label className="block text-sm text-[#395579] dark:text-[#7B99B3] mb-2">İçerik</label>
                              <textarea
                                value={duzenlenenOneri.icerik}
                                onChange={(e) => setDuzenlenenOneri({...duzenlenenOneri, icerik: e.target.value})}
                                rows={4}
                                className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-neutral-900/50 border-2 border-[#395579]/30 dark:border-[#395579]/40 text-neutral-700 dark:text-neutral-200 focus:border-[#395579] focus:outline-none transition-all resize-none"
                              />
                            </div>
                          </div>

                          <div className="relative flex flex-col sm:flex-row gap-2 md:gap-3">
                            <button
                              onClick={handleOneriKaydet}
                              className="flex-1 py-2 md:py-2.5 px-3 md:px-4 rounded-xl bg-gradient-to-br from-[#2A4461] via-[#395579] to-[#4A6A8A] text-white flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-[#395579]/50 transition-all text-sm"
                            >
                              <Save className="w-4 h-4" />
                              <span>Kaydet</span>
                            </button>
                            <button
                              onClick={() => setDuzenlenenOneri(null)}
                              className="flex-1 sm:flex-none py-2 md:py-2.5 px-3 md:px-4 rounded-xl border-2 border-neutral-400 dark:border-neutral-600 text-neutral-600 dark:text-neutral-400 flex items-center justify-center gap-2 hover:bg-neutral-400 hover:text-white transition-all text-sm"
                            >
                              <X className="w-4 h-4" />
                              <span>İptal</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="relative flex flex-col gap-3 mb-4">
                            <div>
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className="px-3 py-2 rounded-full text-xs bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18 text-neutral-600 dark:text-neutral-300 border border-[#395579]/20">
                                  {oneri.kategori}
                                </span>
                                <span className="px-3 py-2 rounded-full text-xs bg-gradient-to-r from-[#395579]/25 to-[#4A6A8A]/20 dark:from-[#395579]/35 dark:to-[#4A6A8A]/25 text-[#2A4461] dark:text-[#7B99B3] border border-[#395579]/30">
                                  Onay Bekliyor
                                </span>
                              </div>
                              <h3 className="text-base md:text-lg text-neutral-700 dark:text-[#e8f0ff] mb-2 group-hover:text-[#2A4461] dark:group-hover:text-[#7B99B3] transition-colors duration-300">{oneri.baslik}</h3>
                              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{oneri.icerik}</p>
                              <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                                <span className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18">
                                  <Users className="w-3.5 h-3.5 text-[#395579]" />
                                  <span className="text-neutral-600 dark:text-neutral-300">{oneri.gonderen}</span>
                                </span>
                                <span className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18">
                                  <Clock className="w-3.5 h-3.5 text-[#395579]" />
                                  <span className="text-neutral-600 dark:text-neutral-300">{oneri.tarih}</span>
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="relative flex flex-col sm:flex-row gap-2 md:gap-3">
                            <button
                              onClick={() => handleOneriOnayla(oneri.id)}
                              className="flex-1 py-2 md:py-2.5 px-3 md:px-4 rounded-xl bg-gradient-to-br from-[#2A4461] via-[#395579] to-[#4A6A8A] text-white flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-[#395579]/50 hover:scale-105 transition-all duration-300 text-sm"
                            >
                              <CheckCircle className="w-4 h-4" />
                              <span className="hidden sm:inline">Onayla & Yayınla</span>
                              <span className="sm:hidden">Onayla</span>
                            </button>

                            <button
                              onClick={() => handleOneriDuzenle(oneri)}
                              className="flex-1 sm:flex-none py-2 md:py-2.5 px-3 md:px-4 rounded-xl border-2 border-[#395579] text-[#395579] dark:text-[#7B99B3] flex items-center justify-center gap-2 hover:bg-[#395579] hover:text-white transition-all text-sm"
                            >
                              <Edit className="w-4 h-4" />
                              <span>Düzenle</span>
                            </button>

                            <button
                              onClick={() => handleOneriReddet(oneri.id)}
                              className="flex-1 sm:flex-none py-2 md:py-2.5 px-3 md:px-4 rounded-xl border-2 border-neutral-400 dark:border-neutral-600 text-neutral-600 dark:text-neutral-400 flex items-center justify-center gap-2 hover:bg-neutral-400 hover:text-white transition-all text-sm"
                            >
                              <XCircle className="w-4 h-4" />
                              <span>Reddet</span>
                            </button>
                          </div>
                        </>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Düzenleme Önerileri */}
          {aktifSekme === "duzenlemeler" && (
            <motion.div
              key="duzenlemeler"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6 px-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-9 bg-gradient-to-b from-[#2A4461] via-[#395579] to-[#4A6A8A] rounded-full shadow-lg shadow-[#395579]/30"></div>
                  <div className="w-1.5 h-7 bg-gradient-to-b from-[#395579] to-[#5A7A9A] rounded-full opacity-80"></div>
                  <div className="w-1 h-5 bg-gradient-to-b from-[#4A6A8A] to-[#7B99B3] rounded-full opacity-60"></div>
                  <div className="w-0.5 h-3 bg-[#5A7A9A] rounded-full opacity-40"></div>
                </div>
                <h2 className="text-neutral-700 dark:text-neutral-200">Düzenleme Önerileri (Seyyah Rolü)</h2>
              </div>

              {gosterilecekDuzenlemeler.length === 0 ? (
                <div className="relative bg-gradient-to-br from-[#395579]/12 via-[#4A6A8A]/10 to-[#5A7A9A]/8 dark:from-[#395579]/18 dark:via-[#4A6A8A]/15 dark:to-[#5A7A9A]/12 rounded-3xl p-12 shadow-2xl shadow-[#395579]/12 overflow-hidden text-center">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#395579]/8 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#5A7A9A]/12 rounded-full blur-3xl"></div>
                  <CheckCircle className="w-16 h-16 text-green-500 dark:text-green-400 mx-auto mb-4 relative z-10" />
                  <h3 className="text-xl text-neutral-900 dark:text-neutral-100 mb-2 relative z-10">Tüm düzenlemeler incelendi! ✨</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 relative z-10">Şu anda onay bekleyen düzenleme bulunmuyor.</p>
                </div>
              ) : (
                <div className="max-h-[600px] overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-[#395579]/30 scrollbar-track-transparent hover:scrollbar-thumb-[#395579]/50">
                  {gosterilecekDuzenlemeler.map((duzenleme, index) => (
                    <motion.div
                      key={duzenleme.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.05 }}
                      className="group relative bg-white/85 dark:bg-neutral-800/85 backdrop-blur-lg rounded-2xl p-4 md:p-6 hover:bg-gradient-to-r hover:from-[#395579]/18 hover:via-[#4A6A8A]/12 hover:to-transparent dark:hover:from-[#395579]/25 dark:hover:via-[#4A6A8A]/18 dark:hover:to-transparent hover:shadow-2xl hover:shadow-[#395579]/25 transition-all duration-300 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#395579]/0 via-[#395579]/8 to-[#395579]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#395579]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {duzenlenenDuzenlemOneri?.id === duzenleme.id ? (
                        <div className="relative flex flex-col gap-4">
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm text-[#395579] dark:text-[#7B99B3] mb-2">Kategori</label>
                              <select
                                value={duzenlenenDuzenlemOneri.kategori}
                                onChange={(e) => setDuzenlenenDuzenlemOneri({...duzenlenenDuzenlemOneri, kategori: e.target.value})}
                                className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-neutral-900/50 border-2 border-[#395579]/30 dark:border-[#395579]/40 text-neutral-700 dark:text-neutral-200 focus:border-[#395579] focus:outline-none transition-all"
                              >
                                <option value="Yeme & İçme">Yeme & İçme</option>
                                <option value="Barınma">Barınma</option>
                                <option value="Sosyal Yaşam">Sosyal Yaşam</option>
                                <option value="Akademik">Akademik</option>
                                <option value="Spor">Spor</option>
                                <option value="Gezi">Gezi</option>
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm text-[#395579] dark:text-[#7B99B3] mb-2">Yeni Başlık</label>
                              <input
                                type="text"
                                value={duzenlenenDuzenlemOneri.yeniBaslik}
                                onChange={(e) => setDuzenlenenDuzenlemOneri({...duzenlenenDuzenlemOneri, yeniBaslik: e.target.value})}
                                className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-neutral-900/50 border-2 border-[#395579]/30 dark:border-[#395579]/40 text-neutral-700 dark:text-neutral-200 focus:border-[#395579] focus:outline-none transition-all"
                              />
                            </div>

                            <div>
                              <label className="block text-sm text-[#395579] dark:text-[#7B99B3] mb-2">Yeni İçerik</label>
                              <textarea
                                value={duzenlenenDuzenlemOneri.yeniIcerik}
                                onChange={(e) => setDuzenlenenDuzenlemOneri({...duzenlenenDuzenlemOneri, yeniIcerik: e.target.value})}
                                rows={4}
                                className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-neutral-900/50 border-2 border-[#395579]/30 dark:border-[#395579]/40 text-neutral-700 dark:text-neutral-200 focus:border-[#395579] focus:outline-none transition-all resize-none"
                              />
                            </div>

                            <div>
                              <label className="block text-sm text-[#395579] dark:text-[#7B99B3] mb-2">Değişiklik Açıklaması</label>
                              <input
                                type="text"
                                value={duzenlenenDuzenlemOneri.degisiklikAciklamasi || ""}
                                onChange={(e) => setDuzenlenenDuzenlemOneri({...duzenlenenDuzenlemOneri, degisiklikAciklamasi: e.target.value})}
                                className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-neutral-900/50 border-2 border-[#395579]/30 dark:border-[#395579]/40 text-neutral-700 dark:text-neutral-200 focus:border-[#395579] focus:outline-none transition-all"
                              />
                            </div>
                          </div>

                          <div className="relative flex flex-col sm:flex-row gap-2 md:gap-3">
                            <button
                              onClick={handleDuzenlemKaydet}
                              className="flex-1 py-2 md:py-2.5 px-3 md:px-4 rounded-xl bg-gradient-to-br from-[#2A4461] via-[#395579] to-[#4A6A8A] text-white flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-[#395579]/50 transition-all text-sm"
                            >
                              <Save className="w-4 h-4" />
                              <span>Kaydet</span>
                            </button>
                            <button
                              onClick={() => setDuzenlenenDuzenlemOneri(null)}
                              className="flex-1 sm:flex-none py-2 md:py-2.5 px-3 md:px-4 rounded-xl border-2 border-neutral-400 dark:border-neutral-600 text-neutral-600 dark:text-neutral-400 flex items-center justify-center gap-2 hover:bg-neutral-400 hover:text-white transition-all text-sm"
                            >
                              <X className="w-4 h-4" />
                              <span>İptal</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="relative flex flex-col gap-4">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-2 mb-3">
                                  <span className="px-3 py-2 rounded-full text-xs bg-gradient-to-r from-[#395579]/25 to-[#4A6A8A]/20 dark:from-[#395579]/35 dark:to-[#4A6A8A]/25 text-[#2A4461] dark:text-[#7B99B3] border border-[#395579]/30">
                                    Düzenleme Önerisi
                                  </span>
                                  <span className="px-3 py-2 rounded-full text-xs bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18 text-neutral-600 dark:text-neutral-300 border border-[#395579]/20">
                                    {duzenleme.kategori}
                                  </span>
                                </div>
                                <h3 className="text-base md:text-lg text-neutral-700 dark:text-[#e8f0ff] mb-2 group-hover:text-[#2A4461] dark:group-hover:text-[#7B99B3] transition-colors duration-300">
                                  Yeni: {duzenleme.yeniBaslik}
                                </h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                                  <span className="text-neutral-500 dark:text-neutral-500">Eski:</span> {duzenleme.eskiBaslik}
                                </p>
                              </div>
                            </div>

                            <div className="bg-gradient-to-br from-[#395579]/5 via-[#4A6A8A]/3 to-transparent dark:from-[#395579]/10 dark:via-[#4A6A8A]/8 dark:to-transparent rounded-xl p-4 border border-[#395579]/15 dark:border-[#395579]/20">
                              <div className="mb-3">
                                <p className="text-xs text-[#395579] dark:text-[#7B99B3] mb-2">Yeni İçerik:</p>
                                <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-3">{duzenleme.yeniIcerik}</p>
                              </div>
                              {duzenleme.degisiklikAciklamasi && (
                                <div className="pt-3 border-t border-[#395579]/15 dark:border-[#395579]/20">
                                  <p className="text-xs text-[#395579] dark:text-[#7B99B3] mb-1">Değişiklik Açıklaması:</p>
                                  <p className="text-sm text-neutral-600 dark:text-neutral-400 italic">"{duzenleme.degisiklikAciklamasi}"</p>
                                </div>
                              )}
                            </div>

                            <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                              <span className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18">
                                <Users className="w-3.5 h-3.5 text-[#395579]" />
                                <span className="text-neutral-600 dark:text-neutral-300">{duzenleme.duzenleyen}</span>
                              </span>
                              <span className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18">
                                <Clock className="w-3.5 h-3.5 text-[#395579]" />
                                <span className="text-neutral-600 dark:text-neutral-300">{duzenleme.tarih}</span>
                              </span>
                              <span className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18">
                                <FileText className="w-3.5 h-3.5 text-[#395579]" />
                                <span className="text-neutral-600 dark:text-neutral-300">Başlık ID: {duzenleme.baslikId}</span>
                              </span>
                            </div>

                            <div className="relative flex flex-col sm:flex-row gap-2 md:gap-3 pt-3 border-t border-[#395579]/15 dark:border-[#395579]/20">
                              <button
                                onClick={() => handleDuzenlemOnayla(duzenleme.id)}
                                className="flex-1 py-2 md:py-2.5 px-3 md:px-4 rounded-xl bg-gradient-to-br from-[#2A4461] via-[#395579] to-[#4A6A8A] text-white flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-[#395579]/50 hover:scale-105 transition-all duration-300 text-sm"
                              >
                                <CheckCircle className="w-4 h-4" />
                                <span className="hidden sm:inline">Onayla & Yayınla</span>
                                <span className="sm:hidden">Onayla</span>
                              </button>
                              <button
                                onClick={() => setDuzenlenenDuzenlemOneri({...duzenleme})}
                                className="flex-1 sm:flex-none py-2 md:py-2.5 px-3 md:px-4 rounded-xl border-2 border-[#395579] text-[#395579] dark:text-[#7B99B3] flex items-center justify-center gap-2 hover:bg-[#395579] hover:text-white transition-all text-sm"
                              >
                                <Edit className="w-4 h-4" />
                                <span>Düzenle</span>
                              </button>
                              <button
                                onClick={() => setOnaylanacakDuzenleme(duzenleme)}
                                className="flex-1 sm:flex-none py-2 md:py-2.5 px-3 md:px-4 rounded-xl border-2 border-[#395579] text-[#395579] dark:text-[#7B99B3] flex items-center justify-center gap-2 hover:bg-[#395579] hover:text-white transition-all text-sm"
                              >
                                <Eye className="w-4 h-4" />
                                <span>Detay</span>
                              </button>
                              <button
                                onClick={() => handleDuzenlemReddet(duzenleme.id)}
                                className="flex-1 sm:flex-none py-2 md:py-2.5 px-3 md:px-4 rounded-xl border-2 border-neutral-400 dark:border-neutral-600 text-neutral-600 dark:text-neutral-400 flex items-center justify-center gap-2 hover:bg-neutral-400 hover:text-white transition-all text-sm"
                              >
                                <XCircle className="w-4 h-4" />
                                <span>Reddet</span>
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Bilgi Notu */}
              <div className="mt-6 bg-gradient-to-r from-[#395579]/10 to-[#4A6A8A]/8 dark:from-[#395579]/15 dark:to-[#4A6A8A]/12 rounded-2xl p-6 border border-[#395579]/30">
                <div className="flex items-start gap-3">
                  <Edit className="h-6 w-6 text-[#395579] dark:text-[#7B99B3] mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-[#2A4461] dark:text-white mb-2">Seyyah Düzenleme Sistemi</h3>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-3">
                      Seyyah rolündeki kullanıcılar içerik düzenleyebilir ancak düzenlemeleri admin onayı gerektirir. Bu sistem kaliteli ve doğru içeriğin sürdürülmesine yardımcı olur.
                    </p>
                    <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1 list-disc list-inside">
                      <li>Düzenlemeler onaylandığında direkt yayınlanır</li>
                      <li>Reddedilen düzenlemeler kullanıcıya bildirilir</li>
                      <li>Sürüm geçmişi tüm değişiklikleri saklar</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Başlıklar & Yorumlar */}
          {aktifSekme === "basliklar" && (
            <motion.div
              key="basliklar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6 px-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-9 bg-gradient-to-b from-[#2A4461] via-[#395579] to-[#4A6A8A] rounded-full shadow-lg shadow-[#395579]/30"></div>
                  <div className="w-1.5 h-7 bg-gradient-to-b from-[#395579] to-[#5A7A9A] rounded-full opacity-80"></div>
                  <div className="w-1 h-5 bg-gradient-to-b from-[#4A6A8A] to-[#7B99B3] rounded-full opacity-60"></div>
                  <div className="w-0.5 h-3 bg-[#5A7A9A] rounded-full opacity-40"></div>
                </div>
                <h2 className="text-neutral-700 dark:text-neutral-200">Başlıklar & Yorumlar Yönetimi</h2>
              </div>

              {/* Başlıklar */}
              <div className="space-y-4">
                <h3 className="text-base md:text-lg text-neutral-700 dark:text-neutral-200 px-2">Başlıklar</h3>
                {basliklar.map((baslik, index) => (
                  <motion.div
                    key={baslik.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative bg-white/85 dark:bg-neutral-800/85 backdrop-blur-lg rounded-2xl p-4 md:p-6 hover:bg-gradient-to-r hover:from-[#395579]/18 hover:via-[#4A6A8A]/12 hover:to-transparent dark:hover:from-[#395579]/25 dark:hover:via-[#4A6A8A]/18 dark:hover:to-transparent hover:shadow-2xl hover:shadow-[#395579]/25 transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#395579]/0 via-[#395579]/8 to-[#395579]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#395579]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {duzenlenenBaslik?.id === baslik.id ? (
                      <div className="relative flex flex-col gap-4">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm text-[#395579] dark:text-[#7B99B3] mb-2">Kategori</label>
                            <select
                              value={duzenlenenBaslik.kategori}
                              onChange={(e) => setDuzenlenenBaslik({...duzenlenenBaslik, kategori: e.target.value})}
                              className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-neutral-900/50 border-2 border-[#395579]/30 dark:border-[#395579]/40 text-neutral-700 dark:text-neutral-200 focus:border-[#395579] focus:outline-none transition-all"
                            >
                              <option value="Yeme & İçme">Yeme & İçme</option>
                              <option value="Barınma">Barınma</option>
                              <option value="Sosyal Yaşam">Sosyal Yaşam</option>
                              <option value="Akademik">Akademik</option>
                              <option value="Spor">Spor</option>
                              <option value="Gezi">Gezi</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm text-[#395579] dark:text-[#7B99B3] mb-2">Başlık</label>
                            <input
                              type="text"
                              value={duzenlenenBaslik.baslik}
                              onChange={(e) => setDuzenlenenBaslik({...duzenlenenBaslik, baslik: e.target.value})}
                              className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-neutral-900/50 border-2 border-[#395579]/30 dark:border-[#395579]/40 text-neutral-700 dark:text-neutral-200 focus:border-[#395579] focus:outline-none transition-all"
                            />
                          </div>

                          <div>
                            <label className="block text-sm text-[#395579] dark:text-[#7B99B3] mb-2">İçerik</label>
                            <textarea
                              value={duzenlenenBaslik.icerik}
                              onChange={(e) => setDuzenlenenBaslik({...duzenlenenBaslik, icerik: e.target.value})}
                              rows={4}
                              className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-neutral-900/50 border-2 border-[#395579]/30 dark:border-[#395579]/40 text-neutral-700 dark:text-neutral-200 focus:border-[#395579] focus:outline-none transition-all resize-none"
                            />
                          </div>
                        </div>

                        <div className="relative flex flex-col sm:flex-row gap-2 md:gap-3">
                          <button
                            onClick={handleBaslikKaydet}
                            className="flex-1 py-2 md:py-2.5 px-3 md:px-4 rounded-xl bg-gradient-to-br from-[#2A4461] via-[#395579] to-[#4A6A8A] text-white flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-[#395579]/50 transition-all text-sm"
                          >
                            <Save className="w-4 h-4" />
                            <span>Kaydet</span>
                          </button>
                          <button
                            onClick={() => setDuzenlenenBaslik(null)}
                            className="flex-1 sm:flex-none py-2 md:py-2.5 px-3 md:px-4 rounded-xl border-2 border-neutral-400 dark:border-neutral-600 text-neutral-600 dark:text-neutral-400 flex items-center justify-center gap-2 hover:bg-neutral-400 hover:text-white transition-all text-sm"
                          >
                            <X className="w-4 h-4" />
                            <span>İptal</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="relative flex flex-col gap-3 mb-4">
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className="px-3 py-2 rounded-full text-xs bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18 text-neutral-600 dark:text-neutral-300 border border-[#395579]/20">
                                {baslik.kategori}
                              </span>
                            </div>
                            <h4 className="text-base md:text-lg text-neutral-700 dark:text-[#e8f0ff] mb-2 group-hover:text-[#2A4461] dark:group-hover:text-[#7B99B3] transition-colors duration-300 break-words">{baslik.baslik}</h4>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{baslik.icerik}</p>
                            <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                              <span className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18">
                                <Users className="w-3.5 h-3.5 text-[#395579]" />
                                <span className="text-neutral-600 dark:text-neutral-300">{baslik.yazar}</span>
                              </span>
                              <span className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18">
                                <Clock className="w-3.5 h-3.5 text-[#395579]" />
                                <span className="text-neutral-600 dark:text-neutral-300">{baslik.tarih}</span>
                              </span>
                              <span className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18">
                                <MessageSquare className="w-3.5 h-3.5 text-[#395579]" />
                                <span className="text-neutral-600 dark:text-neutral-300">{baslik.yorumSayisi} yorum</span>
                              </span>
                              <span className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18">
                                <Eye className="w-3.5 h-3.5 text-[#395579]" />
                                <span className="text-neutral-600 dark:text-neutral-300">{baslik.goruntulenme} görüntülenme</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="relative flex flex-col sm:flex-row gap-2 md:gap-3">
                          <button
                            onClick={() => handleBaslikDuzenle(baslik)}
                            className="flex-1 sm:flex-none py-2 md:py-2.5 px-3 md:px-4 rounded-xl border-2 border-[#395579] text-[#395579] dark:text-[#7B99B3] flex items-center justify-center gap-2 hover:bg-[#395579] hover:text-white transition-all text-sm"
                          >
                            <Edit className="w-4 h-4" />
                            <span>Düzenle</span>
                          </button>

                          <button
                            onClick={() => handleBaslikSil(baslik.id)}
                            className="flex-1 sm:flex-none py-2 md:py-2.5 px-3 md:px-4 rounded-xl border-2 border-neutral-400 dark:border-neutral-600 text-neutral-600 dark:text-neutral-400 flex items-center justify-center gap-2 hover:bg-neutral-400 hover:text-white transition-all text-sm"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Sil</span>
                          </button>
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Yorumlar */}
              <div className="space-y-4">
                <h3 className="text-base md:text-lg text-neutral-700 dark:text-neutral-200 px-2">Yorumlar</h3>
                {yorumlar.map((yorum, index) => (
                  <motion.div
                    key={yorum.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative bg-white/85 dark:bg-neutral-800/85 backdrop-blur-lg rounded-2xl p-4 md:p-6 hover:bg-gradient-to-r hover:from-[#395579]/18 hover:via-[#4A6A8A]/12 hover:to-transparent dark:hover:from-[#395579]/25 dark:hover:via-[#4A6A8A]/18 dark:hover:to-transparent hover:shadow-2xl hover:shadow-[#395579]/25 transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#395579]/0 via-[#395579]/8 to-[#395579]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#395579]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {duzenlenenYorum?.id === yorum.id ? (
                      <div className="relative flex flex-col gap-4">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm text-[#395579] dark:text-[#7B99B3] mb-2">Yorum</label>
                            <textarea
                              value={duzenlenenYorum.yorum}
                              onChange={(e) => setDuzenlenenYorum({...duzenlenenYorum, yorum: e.target.value})}
                              rows={4}
                              className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-neutral-900/50 border-2 border-[#395579]/30 dark:border-[#395579]/40 text-neutral-700 dark:text-neutral-200 focus:border-[#395579] focus:outline-none transition-all resize-none"
                            />
                          </div>
                        </div>

                        <div className="relative flex flex-col sm:flex-row gap-2 md:gap-3">
                          <button
                            onClick={handleYorumKaydet}
                            className="flex-1 py-2 md:py-2.5 px-3 md:px-4 rounded-xl bg-gradient-to-br from-[#2A4461] via-[#395579] to-[#4A6A8A] text-white flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-[#395579]/50 transition-all text-sm"
                          >
                            <Save className="w-4 h-4" />
                            <span>Kaydet</span>
                          </button>
                          <button
                            onClick={() => setDuzenlenenYorum(null)}
                            className="flex-1 sm:flex-none py-2 md:py-2.5 px-3 md:px-4 rounded-xl border-2 border-neutral-400 dark:border-neutral-600 text-neutral-600 dark:text-neutral-400 flex items-center justify-center gap-2 hover:bg-neutral-400 hover:text-white transition-all text-sm"
                          >
                            <X className="w-4 h-4" />
                            <span>İptal</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="relative flex flex-col gap-3 mb-4">
                          <div>
                            <p className="text-sm text-neutral-700 dark:text-[#e8f0ff] mb-3 group-hover:text-[#2A4461] dark:group-hover:text-[#7B99B3] transition-colors duration-300 break-words">{yorum.yorum}</p>
                            <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                              <span className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18">
                                <Users className="w-3.5 h-3.5 text-[#395579]" />
                                <span className="text-neutral-600 dark:text-neutral-300">{yorum.yazar}</span>
                              </span>
                              <span className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18">
                                <Clock className="w-3.5 h-3.5 text-[#395579]" />
                                <span className="text-neutral-600 dark:text-neutral-300">{yorum.tarih}</span>
                              </span>
                              <span className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18 truncate max-w-[200px]">
                                <FileText className="w-3.5 h-3.5 text-[#395579] shrink-0" />
                                <span className="text-neutral-600 dark:text-neutral-300 truncate">{yorum.baslik}</span>
                              </span>
                              <span className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18">
                                <Star className="w-3.5 h-3.5 text-[#395579]" />
                                <span className="text-neutral-600 dark:text-neutral-300">{yorum.begeniSayisi} beğeni</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="relative flex flex-col sm:flex-row gap-2 md:gap-3">
                          <button
                            onClick={() => handleYorumDuzenle(yorum)}
                            className="flex-1 sm:flex-none py-2 md:py-2.5 px-3 md:px-4 rounded-xl border-2 border-[#395579] text-[#395579] dark:text-[#7B99B3] flex items-center justify-center gap-2 hover:bg-[#395579] hover:text-white transition-all text-sm"
                          >
                            <Edit className="w-4 h-4" />
                            <span>Düzenle</span>
                          </button>

                          <button
                            onClick={() => handleYorumSil(yorum.id)}
                            className="flex-1 sm:flex-none py-2 md:py-2.5 px-3 md:px-4 rounded-xl border-2 border-neutral-400 dark:border-neutral-600 text-neutral-600 dark:text-neutral-400 flex items-center justify-center gap-2 hover:bg-neutral-400 hover:text-white transition-all text-sm"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Sil</span>
                          </button>
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Bilgi Notu */}
              <div className="mt-6 bg-gradient-to-r from-[#5990c0]/10 to-[#cea273]/10 dark:from-[#015185]/10 dark:to-[#102a6b]/10 rounded-2xl p-6 border border-[#5990c0]/30">
                <div className="flex items-start gap-3">
                  <MessageSquare className="h-6 w-6 text-[#cea273] mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-[#102a6b] dark:text-white mb-2">İçerik Yönetimi</h3>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-3">
                      Admin olarak tüm başlıkları ve yorumları düzenleyebilir veya silebilirsiniz. Bu özellik platformdaki içeriklerin kalitesini ve standartlarını korumak için kullanılmalıdır.
                    </p>
                    <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1 list-disc list-inside">
                      <li>Her başlık ve yorumun yanındaki "Düzenle" butonuna tıklayarak içeriği düzenleyebilirsiniz</li>
                      <li>Uygunsuz içerikler "Sil" butonu ile kaldırılabilir</li>
                      <li>Tüm değişiklikler anında uygulanır ve kullanıcılara yansır</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Kullanıcılar */}
          {aktifSekme === "kullanicilar" && (
            <motion.div
              key="kullanicilar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6 px-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-9 bg-gradient-to-b from-[#2A4461] via-[#395579] to-[#4A6A8A] rounded-full shadow-lg shadow-[#395579]/30"></div>
                  <div className="w-1.5 h-7 bg-gradient-to-b from-[#395579] to-[#5A7A9A] rounded-full opacity-80"></div>
                  <div className="w-1 h-5 bg-gradient-to-b from-[#4A6A8A] to-[#7B99B3] rounded-full opacity-60"></div>
                  <div className="w-0.5 h-3 bg-[#5A7A9A] rounded-full opacity-40"></div>
                </div>
                <h2 className="text-neutral-700 dark:text-neutral-200">Kullanıcı Yönetimi</h2>
              </div>

              {/* Kullanıcı Kartları */}
              <div className="space-y-4">
                {kullanicilar.map((kullanici, index) => (
                  <motion.div
                    key={kullanici.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative bg-white/85 dark:bg-neutral-800/85 backdrop-blur-lg rounded-2xl p-4 md:p-6 hover:bg-gradient-to-r hover:from-[#395579]/18 hover:via-[#4A6A8A]/12 hover:to-transparent dark:hover:from-[#395579]/25 dark:hover:via-[#4A6A8A]/18 dark:hover:to-transparent hover:shadow-2xl hover:shadow-[#395579]/25 transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#395579]/0 via-[#395579]/8 to-[#395579]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#395579]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative flex flex-col gap-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h4 className="text-base md:text-lg text-neutral-700 dark:text-[#e8f0ff] group-hover:text-[#2A4461] dark:group-hover:text-[#7B99B3] transition-colors duration-300">{kullanici.ad}</h4>
                            <span className="px-3 py-1 rounded-full text-xs bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18 text-neutral-600 dark:text-neutral-300 border border-[#395579]/20">
                              {kullanici.rol}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400 mb-3">
                            <span className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18">
                              <Calendar className="w-3.5 h-3.5 text-[#395579]" />
                              <span className="text-neutral-600 dark:text-neutral-300">{kullanici.kayitTarihi}</span>
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs bg-gradient-to-r from-green-500/15 to-green-600/10 dark:from-green-500/25 dark:to-green-600/18 text-green-700 dark:text-green-400 border border-green-500/20">
                              {kullanici.durum}
                            </span>
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            <div className="px-3 py-2 rounded-xl bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18">
                              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Coins</p>
                              <div className="flex items-center gap-1 text-[#395579] dark:text-[#7B99B3]">
                                <Award className="w-3.5 h-3.5" />
                                <span className="text-sm">{kullanici.coins.toLocaleString()}</span>
                              </div>
                            </div>
                            <div className="px-3 py-2 rounded-xl bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18">
                              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Başlık</p>
                              <p className="text-sm text-neutral-700 dark:text-neutral-300">{kullanici.basliklar}</p>
                            </div>
                            <div className="px-3 py-2 rounded-xl bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18">
                              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Yorum</p>
                              <p className="text-sm text-neutral-700 dark:text-neutral-300">{kullanici.yorumlar}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="relative flex flex-col sm:flex-row gap-2 md:gap-3 pt-3 border-t border-[#395579]/20 dark:border-[#395579]/30">
                        <button
                          onClick={() => setGoruntulenecekKullanici(kullanici)}
                          className="flex-1 sm:flex-none py-2 md:py-2.5 px-3 md:px-4 rounded-xl border-2 border-[#395579] text-[#395579] dark:text-[#7B99B3] flex items-center justify-center gap-2 hover:bg-[#395579] hover:text-white transition-all text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Görüntüle</span>
                        </button>

                        <button
                          onClick={() => handleKullaniciDuzenle(kullanici)}
                          className="flex-1 sm:flex-none py-2 md:py-2.5 px-3 md:px-4 rounded-xl border-2 border-neutral-400 dark:border-neutral-600 text-neutral-600 dark:text-neutral-400 flex items-center justify-center gap-2 hover:bg-neutral-400 hover:text-white transition-all text-sm"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Düzenle</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Bildirilen İçerikler */}
          {aktifSekme === "bildirilenler" && (
            <motion.div
              key="bildirilenler"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <BildirilenIcerikler />
            </motion.div>
          )}

          {/* İstatistikler */}
          {aktifSekme === "istatistikler" && (
            <motion.div
              key="istatistikler"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6 px-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-9 bg-gradient-to-b from-[#2A4461] via-[#395579] to-[#4A6A8A] rounded-full shadow-lg shadow-[#395579]/30"></div>
                  <div className="w-1.5 h-7 bg-gradient-to-b from-[#395579] to-[#5A7A9A] rounded-full opacity-80"></div>
                  <div className="w-1 h-5 bg-gradient-to-b from-[#4A6A8A] to-[#7B99B3] rounded-full opacity-60"></div>
                  <div className="w-0.5 h-3 bg-[#5A7A9A] rounded-full opacity-40"></div>
                </div>
                <h2 className="text-neutral-700 dark:text-neutral-200">Detaylı İstatistikler</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Toplam Kullanıcı */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="group relative bg-white/85 dark:bg-neutral-800/85 backdrop-blur-lg rounded-2xl p-6 hover:bg-gradient-to-r hover:from-[#395579]/18 hover:via-[#4A6A8A]/12 hover:to-transparent dark:hover:from-[#395579]/25 dark:hover:via-[#4A6A8A]/18 dark:hover:to-transparent hover:shadow-2xl hover:shadow-[#395579]/25 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#395579]/0 via-[#395579]/8 to-[#395579]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#395579]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18 flex items-center justify-center">
                        <Users className="w-6 h-6 text-[#395579]" />
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">Toplam Kullanıcı</p>
                        <p className="text-2xl text-neutral-700 dark:text-[#e8f0ff] group-hover:text-[#2A4461] dark:group-hover:text-[#7B99B3] transition-colors duration-300">{istatistikler.toplamKullanici.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Aktif Kullanıcı */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="group relative bg-white/85 dark:bg-neutral-800/85 backdrop-blur-lg rounded-2xl p-6 hover:bg-gradient-to-r hover:from-[#395579]/18 hover:via-[#4A6A8A]/12 hover:to-transparent dark:hover:from-[#395579]/25 dark:hover:via-[#4A6A8A]/18 dark:hover:to-transparent hover:shadow-2xl hover:shadow-[#395579]/25 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#395579]/0 via-[#395579]/8 to-[#395579]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#395579]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500/15 to-green-600/10 dark:from-green-500/25 dark:to-green-600/18 flex items-center justify-center">
                        <Activity className="w-6 h-6 text-green-600 dark:text-green-500" />
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">Aktif Kullanıcı</p>
                        <p className="text-2xl text-neutral-700 dark:text-[#e8f0ff] group-hover:text-[#2A4461] dark:group-hover:text-[#7B99B3] transition-colors duration-300">{istatistikler.aktifKullanici.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Toplam Başlık */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="group relative bg-white/85 dark:bg-neutral-800/85 backdrop-blur-lg rounded-2xl p-6 hover:bg-gradient-to-r hover:from-[#395579]/18 hover:via-[#4A6A8A]/12 hover:to-transparent dark:hover:from-[#395579]/25 dark:hover:via-[#4A6A8A]/18 dark:hover:to-transparent hover:shadow-2xl hover:shadow-[#395579]/25 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#395579]/0 via-[#395579]/8 to-[#395579]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#395579]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-[#395579]" />
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">Toplam Başlık</p>
                        <p className="text-2xl text-neutral-700 dark:text-[#e8f0ff] group-hover:text-[#2A4461] dark:group-hover:text-[#7B99B3] transition-colors duration-300">{istatistikler.toplamBaslik.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Toplam Yorum */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="group relative bg-white/85 dark:bg-neutral-800/85 backdrop-blur-lg rounded-2xl p-6 hover:bg-gradient-to-r hover:from-[#395579]/18 hover:via-[#4A6A8A]/12 hover:to-transparent dark:hover:from-[#395579]/25 dark:hover:via-[#4A6A8A]/18 dark:hover:to-transparent hover:shadow-2xl hover:shadow-[#395579]/25 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#395579]/0 via-[#395579]/8 to-[#395579]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#395579]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18 flex items-center justify-center">
                        <MessageSquare className="w-6 h-6 text-[#395579]" />
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">Toplam Yorum</p>
                        <p className="text-2xl text-neutral-700 dark:text-[#e8f0ff] group-hover:text-[#2A4461] dark:group-hover:text-[#7B99B3] transition-colors duration-300">{istatistikler.toplamYorum.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Bugün Yeni Başlık */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="group relative bg-white/85 dark:bg-neutral-800/85 backdrop-blur-lg rounded-2xl p-6 hover:bg-gradient-to-r hover:from-[#395579]/18 hover:via-[#4A6A8A]/12 hover:to-transparent dark:hover:from-[#395579]/25 dark:hover:via-[#4A6A8A]/18 dark:hover:to-transparent hover:shadow-2xl hover:shadow-[#395579]/25 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#395579]/0 via-[#395579]/8 to-[#395579]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#395579]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-[#395579]" />
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">Bugün Yeni Başlık</p>
                        <p className="text-2xl text-neutral-700 dark:text-[#e8f0ff] group-hover:text-[#2A4461] dark:group-hover:text-[#7B99B3] transition-colors duration-300">{istatistikler.bugunYeniBaslik.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Bugün Yeni Yorum */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="group relative bg-white/85 dark:bg-neutral-800/85 backdrop-blur-lg rounded-2xl p-6 hover:bg-gradient-to-r hover:from-[#395579]/18 hover:via-[#4A6A8A]/12 hover:to-transparent dark:hover:from-[#395579]/25 dark:hover:via-[#4A6A8A]/18 dark:hover:to-transparent hover:shadow-2xl hover:shadow-[#395579]/25 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#395579]/0 via-[#395579]/8 to-[#395579]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#395579]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18 flex items-center justify-center">
                        <Flame className="w-6 h-6 text-[#395579]" />
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">Bugün Yeni Yorum</p>
                        <p className="text-2xl text-neutral-700 dark:text-[#e8f0ff] group-hover:text-[#2A4461] dark:group-hover:text-[#7B99B3] transition-colors duration-300">{istatistikler.bugunYeniYorum.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Coin Ayarları */}
          {aktifSekme === "coinayarlari" && (
            <motion.div
              key="coinayarlari"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6 px-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-9 bg-gradient-to-b from-[#2A4461] via-[#395579] to-[#4A6A8A] rounded-full shadow-lg shadow-[#395579]/30"></div>
                  <div className="w-1.5 h-7 bg-gradient-to-b from-[#395579] to-[#5A7A9A] rounded-full opacity-80"></div>
                  <div className="w-1 h-5 bg-gradient-to-b from-[#4A6A8A] to-[#7B99B3] rounded-full opacity-60"></div>
                  <div className="w-0.5 h-3 bg-[#5A7A9A] rounded-full opacity-40"></div>
                </div>
                <h2 className="text-neutral-700 dark:text-neutral-200">Coin Kazanma Kuralları</h2>
              </div>

              <div className="bg-white/85 dark:bg-neutral-800/85 backdrop-blur-lg rounded-2xl p-6 space-y-5">
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                  Kullanıcıların eylemlerinden kazanacakları coin miktarlarını buradan düzenleyebilirsiniz.
                </p>

                {/* Yeni Başlık Açma */}
                <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-[#395579]/10 to-transparent dark:from-[#395579]/20 border border-[#395579]/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#395579] to-[#4A6A8A] flex items-center justify-center">
                      <Plus className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-neutral-700 dark:text-white font-medium">Yeni Başlık Açma</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">Her yeni başlık için</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#395579] dark:text-[#7B99B3]">+</span>
                    <input
                      type="number"
                      value={coinKurallari.yeniBaslik}
                      onChange={(e) => setCoinKurallari({...coinKurallari, yeniBaslik: parseInt(e.target.value) || 0})}
                      className="w-20 px-3 py-2 rounded-lg border-2 border-[#395579]/30 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-white text-center focus:border-[#395579] focus:outline-none"
                    />
                    <span className="text-neutral-500 dark:text-neutral-400">coin</span>
                  </div>
                </div>

                {/* Bilgi Alanı Düzenlemesi */}
                <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-[#395579]/10 to-transparent dark:from-[#395579]/20 border border-[#395579]/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#395579] to-[#4A6A8A] flex items-center justify-center">
                      <Edit className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-neutral-700 dark:text-white font-medium">Bilgi Alanı Düzenlemesi</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">Her düzenleme için</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#395579] dark:text-[#7B99B3]">+</span>
                    <input
                      type="number"
                      value={coinKurallari.bilgiDuzenleme}
                      onChange={(e) => setCoinKurallari({...coinKurallari, bilgiDuzenleme: parseInt(e.target.value) || 0})}
                      className="w-20 px-3 py-2 rounded-lg border-2 border-[#395579]/30 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-white text-center focus:border-[#395579] focus:outline-none"
                    />
                    <span className="text-neutral-500 dark:text-neutral-400">coin</span>
                  </div>
                </div>

                {/* Yorum Yazma */}
                <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-[#395579]/10 to-transparent dark:from-[#395579]/20 border border-[#395579]/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#395579] to-[#4A6A8A] flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-neutral-700 dark:text-white font-medium">Yorum Yazma</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">Her yorum için</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#395579] dark:text-[#7B99B3]">+</span>
                    <input
                      type="number"
                      value={coinKurallari.yorumYazma}
                      onChange={(e) => setCoinKurallari({...coinKurallari, yorumYazma: parseInt(e.target.value) || 0})}
                      className="w-20 px-3 py-2 rounded-lg border-2 border-[#395579]/30 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-white text-center focus:border-[#395579] focus:outline-none"
                    />
                    <span className="text-neutral-500 dark:text-neutral-400">coin</span>
                  </div>
                </div>

                {/* Düzenlemede Yararlı Oy */}
                <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-[#395579]/10 to-transparent dark:from-[#395579]/20 border border-[#395579]/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#395579] to-[#4A6A8A] flex items-center justify-center">
                      <ThumbsUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-neutral-700 dark:text-white font-medium">Düzenlemede Yararlı Oy</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">Her yararlı oy için</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#395579] dark:text-[#7B99B3]">+</span>
                    <input
                      type="number"
                      value={coinKurallari.yararliOy}
                      onChange={(e) => setCoinKurallari({...coinKurallari, yararliOy: parseInt(e.target.value) || 0})}
                      className="w-20 px-3 py-2 rounded-lg border-2 border-[#395579]/30 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-white text-center focus:border-[#395579] focus:outline-none"
                    />
                    <span className="text-neutral-500 dark:text-neutral-400">coin</span>
                  </div>
                </div>

                {/* Düzenlemede Yararsız Oy */}
                <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-transparent dark:from-red-500/20 border border-red-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                      <ThumbsDown className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-neutral-700 dark:text-white font-medium">Düzenlemede Yararsız Oy</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">Her yararsız oy için (coin kaybı)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={coinKurallari.yararsizOy}
                      onChange={(e) => setCoinKurallari({...coinKurallari, yararsizOy: parseInt(e.target.value) || 0})}
                      className="w-20 px-3 py-2 rounded-lg border-2 border-red-500/30 bg-white dark:bg-neutral-900 text-red-600 dark:text-red-400 text-center focus:border-red-500 focus:outline-none"
                    />
                    <span className="text-neutral-500 dark:text-neutral-400">coin</span>
                  </div>
                </div>

                {/* Yorumun Beğeni Alması */}
                <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-[#395579]/10 to-transparent dark:from-[#395579]/20 border border-[#395579]/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#395579] to-[#4A6A8A] flex items-center justify-center">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-neutral-700 dark:text-white font-medium">Yorumun Beğeni Alması</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">Her beğeni için</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#395579] dark:text-[#7B99B3]">+</span>
                    <input
                      type="number"
                      value={coinKurallari.yorumBegeni}
                      onChange={(e) => setCoinKurallari({...coinKurallari, yorumBegeni: parseInt(e.target.value) || 0})}
                      className="w-20 px-3 py-2 rounded-lg border-2 border-[#395579]/30 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-white text-center focus:border-[#395579] focus:outline-none"
                    />
                    <span className="text-neutral-500 dark:text-neutral-400">coin</span>
                  </div>
                </div>

                {/* Arkadaş Daveti */}
                <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-[#395579]/10 to-transparent dark:from-[#395579]/20 border border-[#395579]/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#395579] to-[#4A6A8A] flex items-center justify-center">
                      <UserPlus className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-neutral-700 dark:text-white font-medium">Arkadaş Daveti</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">Her başarılı davet için</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#395579] dark:text-[#7B99B3]">+</span>
                    <input
                      type="number"
                      value={coinKurallari.arkadasDavet}
                      onChange={(e) => setCoinKurallari({...coinKurallari, arkadasDavet: parseInt(e.target.value) || 0})}
                      className="w-20 px-3 py-2 rounded-lg border-2 border-[#395579]/30 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-white text-center focus:border-[#395579] focus:outline-none"
                    />
                    <span className="text-neutral-500 dark:text-neutral-400">coin</span>
                  </div>
                </div>

                {/* Genç Kültürkart Projesi */}
                <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-transparent dark:from-amber-500/20 border border-amber-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-neutral-700 dark:text-white font-medium">Genç Kültürkart Projesi</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">Proje katılım bonusu</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-600 dark:text-amber-400">+</span>
                    <input
                      type="number"
                      value={coinKurallari.kulturkartProje}
                      onChange={(e) => setCoinKurallari({...coinKurallari, kulturkartProje: parseInt(e.target.value) || 0})}
                      className="w-20 px-3 py-2 rounded-lg border-2 border-amber-500/30 bg-white dark:bg-neutral-900 text-amber-600 dark:text-amber-400 text-center focus:border-amber-500 focus:outline-none"
                    />
                    <span className="text-neutral-500 dark:text-neutral-400">coin</span>
                  </div>
                </div>

                {/* Kaydet Butonu */}
                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      localStorage.setItem('coinKurallari', JSON.stringify(coinKurallari));
                      // Storage event'ini tetikle
                      window.dispatchEvent(new Event('storage'));
                      toast.success('Coin kuralları başarıyla kaydedildi!');
                    }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#395579] to-[#4A6A8A] text-white flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#395579]/30 transition-all"
                  >
                    <Save className="w-5 h-5" />
                    Değişiklikleri Kaydet
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Öneri Düzenleme Modalı */}
      <AnimatePresence>
        {duzenlenenOneri && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setDuzenlenenOneri(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-neutral-900 rounded-2xl p-4 md:p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg md:text-xl text-[#102a6b] dark:text-neutral-200">Öneri Düzenle</h3>
                <button
                  onClick={() => setDuzenlenenOneri(null)}
                  className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2 text-neutral-700 dark:text-neutral-300">Başlık</label>
                  <input
                    type="text"
                    value={duzenlenenOneri.baslik}
                    onChange={(e) => setDuzenlenenOneri({...duzenlenenOneri, baslik: e.target.value})}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 focus:border-[#5990c0] focus:outline-none transition-all text-sm md:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-neutral-700 dark:text-neutral-300">Kategori</label>
                  <input
                    type="text"
                    value={duzenlenenOneri.kategori}
                    onChange={(e) => setDuzenlenenOneri({...duzenlenenOneri, kategori: e.target.value})}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 focus:border-[#5990c0] focus:outline-none transition-all text-sm md:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-neutral-700 dark:text-neutral-300">İçerik</label>
                  <textarea
                    value={duzenlenenOneri.icerik}
                    onChange={(e) => setDuzenlenenOneri({...duzenlenenOneri, icerik: e.target.value})}
                    rows={5}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 focus:border-[#5990c0] focus:outline-none transition-all resize-none text-sm md:text-base"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    onClick={handleOneriKaydet}
                    className="flex-1 py-2.5 md:py-3 px-4 rounded-xl bg-gradient-to-r from-[#015185] to-[#5990c0] text-white flex items-center justify-center gap-2 hover:shadow-lg transition-all text-sm md:text-base"
                  >
                    <Save className="w-4 h-4" />
                    Kaydet
                  </button>
                  <button
                    onClick={() => setDuzenlenenOneri(null)}
                    className="py-2.5 md:py-3 px-4 rounded-xl border-2 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all text-sm md:text-base"
                  >
                    İptal
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Başlık Düzenleme Modalı */}
      <AnimatePresence>
        {duzenlenenBaslik && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setDuzenlenenBaslik(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-neutral-900 rounded-2xl p-4 md:p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg md:text-xl text-[#102a6b] dark:text-white">Başlık Düzenle</h3>
                <button
                  onClick={() => setDuzenlenenBaslik(null)}
                  className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2 text-neutral-700 dark:text-neutral-300">Başlık</label>
                  <input
                    type="text"
                    value={duzenlenenBaslik.baslik}
                    onChange={(e) => setDuzenlenenBaslik({...duzenlenenBaslik, baslik: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:border-[#5990c0] focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-neutral-700 dark:text-neutral-300">Kategori</label>
                  <input
                    type="text"
                    value={duzenlenenBaslik.kategori}
                    onChange={(e) => setDuzenlenenBaslik({...duzenlenenBaslik, kategori: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:border-[#5990c0] focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-neutral-700 dark:text-neutral-300">İçerik</label>
                  <textarea
                    value={duzenlenenBaslik.icerik || ""}
                    onChange={(e) => setDuzenlenenBaslik({...duzenlenenBaslik, icerik: e.target.value})}
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:border-[#5990c0] focus:outline-none transition-all resize-none"
                    placeholder="Başlık içeriğini buraya yazın..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleBaslikKaydet}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#015185] to-[#5990c0] text-white flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                  >
                    <Save className="w-4 h-4" />
                    Kaydet
                  </button>
                  <button
                    onClick={() => setDuzenlenenBaslik(null)}
                    className="py-3 px-4 rounded-xl border-2 border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all"
                  >
                    İptal
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Yorum Düzenleme Modalı */}
      <AnimatePresence>
        {duzenlenenYorum && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setDuzenlenenYorum(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-neutral-900 rounded-2xl p-6 max-w-2xl w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl text-[#102a6b] dark:text-white">Yorum Düzenle</h3>
                <button
                  onClick={() => setDuzenlenenYorum(null)}
                  className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2 text-neutral-700 dark:text-neutral-300">Yorum</label>
                  <textarea
                    value={duzenlenenYorum.yorum}
                    onChange={(e) => setDuzenlenenYorum({...duzenlenenYorum, yorum: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:border-[#5990c0] focus:outline-none transition-all resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleYorumKaydet}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#015185] to-[#5990c0] text-white flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                  >
                    <Save className="w-4 h-4" />
                    Kaydet
                  </button>
                  <button
                    onClick={() => setDuzenlenenYorum(null)}
                    className="py-3 px-4 rounded-xl border-2 border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all"
                  >
                    İptal
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Kullanıcı Düzenleme Modalı */}
      <AnimatePresence>
        {duzenlenenKullanici && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setDuzenlenenKullanici(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-neutral-900 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl text-[#102a6b] dark:text-white">Kullanıcı Düzenle</h3>
                <button
                  onClick={() => setDuzenlenenKullanici(null)}
                  className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2 text-neutral-700 dark:text-neutral-300">Ad</label>
                  <input
                    type="text"
                    value={duzenlenenKullanici.ad}
                    onChange={(e) => setDuzenlenenKullanici({...duzenlenenKullanici, ad: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:border-[#5990c0] focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-neutral-700 dark:text-neutral-300">E-posta</label>
                  <input
                    type="email"
                    value={duzenlenenKullanici.email}
                    onChange={(e) => setDuzenlenenKullanici({...duzenlenenKullanici, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:border-[#5990c0] focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-neutral-700 dark:text-neutral-300">Rol</label>
                  <select
                    value={duzenlenenKullanici.rol}
                    onChange={(e) => setDuzenlenenKullanici({...duzenlenenKullanici, rol: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:border-[#5990c0] focus:outline-none transition-all"
                  >
                    <option>Yeni Gelen</option>
                    <option>Seyyah</option>
                    <option>Gezgin</option>
                    <option>Kaşif Meraklısı</option>
                    <option>Konya Bilgesi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-neutral-700 dark:text-neutral-300">Coins</label>
                  <input
                    type="number"
                    value={duzenlenenKullanici.coins}
                    onChange={(e) => setDuzenlenenKullanici({...duzenlenenKullanici, coins: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:border-[#5990c0] focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-neutral-700 dark:text-neutral-300">Durum</label>
                  <select
                    value={duzenlenenKullanici.durum}
                    onChange={(e) => setDuzenlenenKullanici({...duzenlenenKullanici, durum: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:border-[#5990c0] focus:outline-none transition-all"
                  >
                    <option>aktif</option>
                    <option>pasif</option>
                    <option>yasaklı</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleKullaniciKaydet}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#015185] to-[#5990c0] text-white flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                  >
                    <Save className="w-4 h-4" />
                    Kaydet
                  </button>
                  <button
                    onClick={() => setDuzenlenenKullanici(null)}
                    className="py-3 px-4 rounded-xl border-2 border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all"
                  >
                    İptal
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Kullanıcı Profili Görüntüleme Modalı */}
      <AnimatePresence>
        {goruntulenecekKullanici && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setGoruntulenecekKullanici(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl text-[#1C2E4A] flex items-center gap-2">
                  <Users className="w-6 h-6 text-[#cea273]" />
                  Kullanıcı Profili
                </h3>
                <button
                  onClick={() => setGoruntulenecekKullanici(null)}
                  className="p-2 hover:bg-[#fcedd3]/50 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-[#1C2E4A]" />
                </button>
              </div>

              {/* Profil Başlığı */}
              <div className="bg-gradient-to-r from-[#1C2E4A] via-[#102a6b] to-[#015185] rounded-2xl p-6 mb-6 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl border-4 border-white/30">
                    👤
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl mb-1">{goruntulenecekKullanici.ad}</h4>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#cea273]/30 backdrop-blur-sm text-sm border border-[#fcedd3]">
                        {goruntulenecekKullanici.rol}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        goruntulenecekKullanici.durum === "aktif" 
                          ? "bg-[#fcedd3]/30 text-white border border-[#fcedd3]/50"
                          : "bg-red-500/30 text-red-100 border border-red-300/50"
                      }`}>
                        {goruntulenecekKullanici.durum}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
                  <div className="text-center">
                    <p className="text-2xl mb-1">💰 {goruntulenecekKullanici.coins}</p>
                    <p className="text-sm text-white/80">Coins</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl mb-1">📝 {goruntulenecekKullanici.basliklar}</p>
                    <p className="text-sm text-white/80">Başlık</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl mb-1">💬 {goruntulenecekKullanici.yorumlar}</p>
                    <p className="text-sm text-white/80">Yorum</p>
                  </div>
                </div>
              </div>

              {/* Detaylı Bilgiler */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-[#fcedd3]/30 to-[#fcedd3]/50 rounded-xl p-4 border border-[#cea273]/30">
                    <p className="text-sm text-neutral-600 mb-1">E-posta</p>
                    <p className="text-[#1C2E4A] flex items-center gap-2">
                      <span>📧</span>
                      {goruntulenecekKullanici.email}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-[#fcedd3]/30 to-[#fcedd3]/50 rounded-xl p-4 border border-[#cea273]/30">
                    <p className="text-sm text-neutral-600 mb-1">Kayıt Tarihi</p>
                    <p className="text-[#1C2E4A] flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {goruntulenecekKullanici.kayitTarihi}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-[#fcedd3]/30 to-[#fcedd3]/50 rounded-xl p-4 border border-[#cea273]/30">
                    <p className="text-sm text-neutral-600 mb-1">Kullanıcı ID</p>
                    <p className="text-[#1C2E4A] flex items-center gap-2">
                      <Hash className="w-4 h-4" />
                      {goruntulenecekKullanici.id}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-[#fcedd3]/30 to-[#fcedd3]/50 rounded-xl p-4 border border-[#cea273]/30">
                    <p className="text-sm text-neutral-600 mb-1">Toplam Aktivite</p>
                    <p className="text-[#1C2E4A] flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      {goruntulenecekKullanici.basliklar + goruntulenecekKullanici.yorumlar} işlem
                    </p>
                  </div>
                </div>

                {/* Rol Bilgisi */}
                <div className="bg-gradient-to-r from-[#fcedd3]/20 via-[#fcedd3]/30 to-[#fcedd3]/20 rounded-xl p-4 border-2 border-[#cea273]/30">
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-[#cea273] mt-1" />
                    <div className="flex-1">
                      <p className="text-sm text-neutral-600 mb-2">Rol Açıklaması</p>
                      <p className="text-neutral-800">
                        {goruntulenecekKullanici.rol === "Yeni Gelen" && "0-500 Coin | Yeni katılmış kullanıcı"}
                        {goruntulenecekKullanici.rol === "Seyyah" && "501-2.500 Coin | Aktif katkı sağlayan kullanıcı"}
                        {goruntulenecekKullanici.rol === "Gezgin" && "2.501-10.000 Coin | Deneyimli topluluk üyesi"}
                        {goruntulenecekKullanici.rol === "Kaşif Meraklısı" && "10.001-50.000 Coin | Uzman katkıcı"}
                        {goruntulenecekKullanici.rol === "Konya Bilgesi" && "50.001+ Coin | Elit topluluk lideri"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* İstatistikler */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="text-center p-3 rounded-xl bg-gradient-to-br from-[#1C2E4A]/5 to-[#1C2E4A]/10 border border-[#1C2E4A]/20">
                    <FileText className="w-5 h-5 text-[#1C2E4A] mx-auto mb-1" />
                    <p className="text-xs text-neutral-600">Başlık/Coin Oranı</p>
                    <p className="text-sm text-[#1C2E4A]">
                      {goruntulenecekKullanici.basliklar > 0 
                        ? Math.round(goruntulenecekKullanici.coins / goruntulenecekKullanici.basliklar)
                        : 0
                      }
                    </p>
                  </div>

                  <div className="text-center p-3 rounded-xl bg-gradient-to-br from-[#cea273]/10 to-[#cea273]/20 border border-[#cea273]/30">
                    <MessageSquare className="w-5 h-5 text-[#cea273] mx-auto mb-1" />
                    <p className="text-xs text-neutral-600">Yorum/Coin Oranı</p>
                    <p className="text-sm text-[#cea273]">
                      {goruntulenecekKullanici.yorumlar > 0 
                        ? Math.round(goruntulenecekKullanici.coins / goruntulenecekKullanici.yorumlar)
                        : 0
                      }
                    </p>
                  </div>

                  <div className="text-center p-3 rounded-xl bg-gradient-to-br from-[#5990c0]/10 to-[#5990c0]/20 border border-[#5990c0]/30">
                    <TrendingUp className="w-5 h-5 text-[#5990c0] mx-auto mb-1" />
                    <p className="text-xs text-neutral-600">Ortalama/Aktivite</p>
                    <p className="text-sm text-[#5990c0]">
                      {goruntulenecekKullanici.basliklar + goruntulenecekKullanici.yorumlar > 0 
                        ? Math.round(goruntulenecekKullanici.coins / (goruntulenecekKullanici.basliklar + goruntulenecekKullanici.yorumlar))
                        : 0
                      }
                    </p>
                  </div>

                  <div className="text-center p-3 rounded-xl bg-gradient-to-br from-[#fcedd3]/50 to-[#fcedd3]/70 border border-[#cea273]/40">
                    <Star className="w-5 h-5 text-[#cea273] mx-auto mb-1" />
                    <p className="text-xs text-neutral-600">Aktiflik Puanı</p>
                    <p className="text-sm text-[#cea273]">
                      {Math.min(100, Math.round((goruntulenecekKullanici.basliklar * 10 + goruntulenecekKullanici.yorumlar * 5) / 10))}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Alt Butonlar */}
              <div className="flex gap-3 pt-6 border-t border-[#cea273]/30 mt-6">
                <button
                  onClick={() => {
                    setGoruntulenecekKullanici(null);
                    handleKullaniciDuzenle(goruntulenecekKullanici);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#1C2E4A] via-[#102a6b] to-[#015185] text-white flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                >
                  <Edit className="w-4 h-4" />
                  Düzenle
                </button>
                <button
                  onClick={() => setGoruntulenecekKullanici(null)}
                  className="py-3 px-4 rounded-xl border-2 border-[#cea273] text-[#1C2E4A] hover:bg-[#fcedd3]/30 transition-all"
                >
                  Kapat
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Footer */}
      <footer className="bg-neutral-900 text-white py-16 border-t-4 border-[#cea273] mt-8">
        <div className="container mx-auto px-4">
          {/* Logo */}
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white mb-2">WikiSözlük</h2>
            <p className="text-neutral-400 text-sm">Admin Paneli</p>
          </div>
          
          {/* Ana Linkler */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-10">
            <button 
              onClick={() => setFooterModal("hakkimizda")}
              className="text-white hover:text-[#cea273] transition-colors text-sm font-medium"
            >
              Hakkımızda
            </button>
            <button 
              onClick={() => setFooterModal("iletisim")}
              className="text-white hover:text-[#cea273] transition-colors text-sm font-medium"
            >
              İletişim
            </button>
            <button 
              onClick={() => setFooterModal("rozetler")}
              className="text-white hover:text-[#cea273] transition-colors text-sm font-medium"
            >
              Rozetler
            </button>
            <button 
              onClick={() => setFooterModal("sss")}
              className="text-white hover:text-[#cea273] transition-colors text-sm font-medium"
            >
              S.S.S
            </button>
            <button 
              onClick={() => setFooterModal("kullanim")}
              className="text-white hover:text-[#cea273] transition-colors text-sm font-medium"
            >
              Kullanım Koşulları
            </button>
            <button 
              onClick={() => setFooterModal("gizlilik")}
              className="text-white hover:text-[#cea273] transition-colors text-sm font-medium"
            >
              Gizlilik Politikası
            </button>
            <button 
              onClick={() => setFooterModal("yardim")}
              className="text-white hover:text-[#cea273] transition-colors text-sm font-medium"
            >
              Yardım
            </button>
          </div>

          {/* Sosyal Medya */}
          <div className="flex justify-center gap-4 mb-10">
            {[
              { icon: Instagram, href: "#", label: "Instagram" },
              { icon: Twitter, href: "#", label: "Twitter" },
              { icon: Facebook, href: "#", label: "Facebook" },
              { icon: Youtube, href: "#", label: "Youtube" },
              { icon: Linkedin, href: "#", label: "Linkedin" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                title={social.label}
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#cea273] hover:scale-110 transition-all"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center border-t border-white/20 pt-8">
            <p className="text-white text-sm">
              © {new Date().getFullYear()} WikiSözlük Admin Panel. Tüm hakları saklıdır.
            </p>
            <p className="text-neutral-500 text-xs mt-2">
              Platform yönetimi ve güvenliği için tasarlandı.
            </p>
          </div>
        </div>
      </footer>

      {/* Footer Modals */}
      <AnimatePresence>
        {footerModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setFooterModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-neutral-900 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-black text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
                <h2 className="text-xl font-bold">
                  {footerModal === "hakkimizda" && "Hakkımızda"}
                  {footerModal === "iletisim" && "İletişim"}
                  {footerModal === "rozetler" && "Kullanıcı Rozetleri"}
                  {footerModal === "sss" && "Sıkça Sorulan Sorular"}
                  {footerModal === "kullanim" && "Kullanım Koşulları"}
                  {footerModal === "gizlilik" && "Gizlilik Politikası"}
                  {footerModal === "yardim" && "Yardım Merkezi"}
                </h2>
                <button 
                  onClick={() => setFooterModal(null)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Hakkımızda */}
                {footerModal === "hakkimizda" && (
                  <div className="space-y-4 text-neutral-700 dark:text-neutral-300">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#395579] to-[#4A6A8A] flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">WikiSözlük</h3>
                        <p className="text-sm text-neutral-500">Admin Panel v2.0.0</p>
                      </div>
                    </div>
                    <p>WikiSözlük, öğrencilerin bilgi paylaşımı ve etkileşim platformudur. 2024 yılında kurulan platformumuz, akademik başarı, sosyal yaşam ve kariyer gelişimi için güvenilir bir kaynak olmayı hedeflemektedir.</p>
                    <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mt-6">Misyonumuz</h4>
                    <p>Öğrencilerin birbirlerinden öğrenmesini kolaylaştırmak, deneyimlerin paylaşılmasını teşvik etmek ve kampüs yaşamını daha verimli hale getirmek.</p>
                    <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mt-6">Vizyonumuz</h4>
                    <p>Türkiye'nin en büyük öğrenci bilgi paylaşım platformu olmak ve her öğrencinin ihtiyaç duyduğu bilgiye kolayca ulaşmasını sağlamak.</p>
                  </div>
                )}

                {/* İletişim */}
                {footerModal === "iletisim" && (
                  <div className="space-y-6">
                    <div className="grid gap-4">
                      <div className="flex items-center gap-4 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
                        <div className="w-12 h-12 rounded-full bg-[#395579] flex items-center justify-center">
                          <Mail className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">E-posta</p>
                          <a href="mailto:admin@wikisozluk.com" className="text-neutral-900 dark:text-white font-medium hover:text-[#395579]">admin@wikisozluk.com</a>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
                        <div className="w-12 h-12 rounded-full bg-[#395579] flex items-center justify-center">
                          <Phone className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">Telefon</p>
                          <a href="tel:+902121234568" className="text-neutral-900 dark:text-white font-medium hover:text-[#395579]">+90 (212) 123 45 68</a>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
                        <div className="w-12 h-12 rounded-full bg-[#395579] flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">Adres</p>
                          <p className="text-neutral-900 dark:text-white font-medium">Teknokent, İstanbul Teknik Üniversitesi, Maslak, İstanbul</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Rozetler */}
                {footerModal === "rozetler" && (
                  <div className="space-y-4">
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6">Platformda aktif olarak katkı sağladıkça coin kazanır ve seviye atlarsınız. Her rozet farklı ayrıcalıklar sunar.</p>
                    {[
                      { icon: Star, label: "Yeni Gelen", color: "from-slate-400 to-slate-500", range: "0-50 Coin", desc: "Platforma yeni katılan kullanıcılar için başlangıç rozeti." },
                      { icon: Zap, label: "Aktif Üye", color: "from-blue-400 to-blue-600", range: "50-200 Coin", desc: "Düzenli olarak içerik paylaşan ve yorum yapan kullanıcılar." },
                      { icon: Gem, label: "Katkı Sağlayıcı", color: "from-purple-400 to-purple-600", range: "200-500 Coin", desc: "Topluluk için değerli içerikler üreten kullanıcılar." },
                      { icon: Crown, label: "Uzman", color: "from-amber-400 to-amber-600", range: "500-1000 Coin", desc: "Belirli alanlarda uzmanlık gösteren deneyimli kullanıcılar." },
                      { icon: Rocket, label: "Lider", color: "from-red-400 to-red-600", range: "1000+ Coin", desc: "Platformun en aktif ve etkili kullanıcıları." },
                      { icon: GraduationCap, label: "Moderatör", color: "from-emerald-400 to-emerald-600", range: "Özel Yetki", desc: "Platform yönetimi tarafından atanan içerik moderatörleri." },
                    ].map((rozet, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${rozet.color} flex items-center justify-center shadow-lg shrink-0`}>
                          <rozet.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-neutral-900 dark:text-white">{rozet.label}</h4>
                            <span className="text-xs px-2 py-0.5 bg-neutral-200 dark:bg-neutral-700 rounded-full text-neutral-600 dark:text-neutral-400">{rozet.range}</span>
                          </div>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">{rozet.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* S.S.S */}
                {footerModal === "sss" && (
                  <div className="space-y-4">
                    {[
                      { q: "Nasıl coin kazanabilirim?", a: "Başlık oluşturarak (+20), yorum yaparak (+5), içerik beğenerek (+1-3) ve etkinliklere katılarak (+10) coin kazanabilirsiniz." },
                      { q: "Coinleri ne için kullanabilirim?", a: "Coinlerinizi paraya çevirebilir veya platformdaki özel özelliklere erişim için kullanabilirsiniz." },
                      { q: "Rozet sistemi nasıl çalışır?", a: "Toplam coin miktarınıza göre otomatik olarak rozet seviyeniz belirlenir. Her rozet farklı ayrıcalıklar sunar." },
                      { q: "İçeriklerim neden onay bekliyor?", a: "Kaliteli içerik için tüm paylaşımlar moderatör onayından geçer. Genellikle 24 saat içinde değerlendirilir." },
                      { q: "Hesabımı nasıl silebilirim?", a: "Ayarlar > Hesap bölümünden hesap silme talebinde bulunabilirsiniz. İşlem 7 gün içinde tamamlanır." },
                    ].map((item, index) => (
                      <div key={index} className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
                        <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">{item.q}</h4>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">{item.a}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Kullanım Koşulları */}
                {footerModal === "kullanim" && (
                  <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-sm">
                    <h4 className="text-lg font-semibold text-neutral-900 dark:text-white">1. Genel Koşullar</h4>
                    <p>WikiSözlük platformunu kullanarak bu koşulları kabul etmiş sayılırsınız. Platform, öğrencilerin bilgi paylaşımı amacıyla tasarlanmıştır.</p>
                    <h4 className="text-lg font-semibold text-neutral-900 dark:text-white">2. Kullanıcı Sorumlulukları</h4>
                    <p>Paylaştığınız içeriklerden tamamen siz sorumlusunuz. Telif hakkı ihlali, hakaret, spam ve yanıltıcı bilgi paylaşımı yasaktır.</p>
                    <h4 className="text-lg font-semibold text-neutral-900 dark:text-white">3. İçerik Politikası</h4>
                    <p>Tüm içerikler moderasyon sürecinden geçer. Uygunsuz bulunan içerikler kaldırılabilir ve kullanıcı hesabı askıya alınabilir.</p>
                    <h4 className="text-lg font-semibold text-neutral-900 dark:text-white">4. Fikri Mülkiyet</h4>
                    <p>Platform üzerinde paylaştığınız içeriklerin fikri mülkiyet hakları size aittir. Ancak platforma içerik paylaşarak, bu içeriğin platformda gösterilmesine izin vermiş olursunuz.</p>
                  </div>
                )}

                {/* Gizlilik Politikası */}
                {footerModal === "gizlilik" && (
                  <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-sm">
                    <h4 className="text-lg font-semibold text-neutral-900 dark:text-white">1. Toplanan Veriler</h4>
                    <p>Ad, e-posta, profil bilgileri ve platform kullanım verileri toplanmaktadır. Bu veriler hizmet kalitesini artırmak için kullanılır.</p>
                    <h4 className="text-lg font-semibold text-neutral-900 dark:text-white">2. Veri Güvenliği</h4>
                    <p>Verileriniz şifrelenmiş sunucularda saklanır ve üçüncü taraflarla paylaşılmaz. SSL sertifikası ile güvenli bağlantı sağlanır.</p>
                    <h4 className="text-lg font-semibold text-neutral-900 dark:text-white">3. Çerezler</h4>
                    <p>Platform, kullanıcı deneyimini iyileştirmek için çerezler kullanır. Tarayıcı ayarlarından çerezleri yönetebilirsiniz.</p>
                    <h4 className="text-lg font-semibold text-neutral-900 dark:text-white">4. Haklarınız</h4>
                    <p>KVKK kapsamında verilerinize erişim, düzeltme ve silme haklarına sahipsiniz. admin@wikisozluk.com adresinden talepte bulunabilirsiniz.</p>
                  </div>
                )}

                {/* Yardım */}
                {footerModal === "yardim" && (
                  <div className="space-y-4">
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">Yardıma mı ihtiyacınız var? Aşağıdaki kanallardan bize ulaşabilirsiniz.</p>
                    <div className="grid gap-3">
                      <a href="mailto:admin@wikisozluk.com" className="flex items-center gap-3 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                        <Mail className="w-5 h-5 text-[#395579]" />
                        <div>
                          <p className="font-medium text-neutral-900 dark:text-white">E-posta Desteği</p>
                          <p className="text-sm text-neutral-500">24 saat içinde yanıt</p>
                        </div>
                      </a>
                      <button className="flex items-center gap-3 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors text-left">
                        <MessageSquare className="w-5 h-5 text-[#395579]" />
                        <div>
                          <p className="font-medium text-neutral-900 dark:text-white">Canlı Destek</p>
                          <p className="text-sm text-neutral-500">Hafta içi 09:00 - 18:00</p>
                        </div>
                      </button>
                      <button className="flex items-center gap-3 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors text-left">
                        <FileQuestion className="w-5 h-5 text-[#395579]" />
                        <div>
                          <p className="font-medium text-neutral-900 dark:text-white">Bilgi Bankası</p>
                          <p className="text-sm text-neutral-500">Detaylı rehberler ve videolar</p>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
