import { motion, AnimatePresence } from "motion/react";
import { X, User, Award, MessageSquare, TrendingUp, Edit, Settings, LogOut, Trophy, Star, Flame, Crown, Eye, ThumbsUp, Plus, Shield, Compass, Map, Telescope, Sparkles, Coins, ArrowRightLeft, AlertCircle, FileEdit, Trash2, UserPlus, Upload, Mail, Phone, MapPin, Save, Copy, Check, Share2, Gift, Facebook, Twitter as TwitterIcon, Instagram, Send as TelegramIcon, PlusCircle, ThumbsDown, Heart, ChevronRight, Bookmark } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner@2.0.3";
import { ProfilDuzenleSayfasi } from "./ProfilDuzenleSayfasi";

interface ProfilSayfasiProps {
  onClose: () => void;
  onOpenSettings?: () => void;
  onBaslikClick?: (baslikId: number, kategori: string, yorumId?: number) => void;
  onOpenYeniBaslik?: () => void;
  onCikis?: () => void;
  onCoinsUpdate?: (newCoins: number) => void;
  kullaniciBilgileri?: {
    ad: string;
    rol: string;
    coins: number;
    avatar: string;
    baslikSayisi: number;
    yorumSayisi: number;
    goruntulemeSayisi: number;
    begeniSayisi: number;
  };
  kullaniciYorumlari?: Array<{
    baslikId: number;
    baslik: string;
    kategori: string;
    yorum: string;
    tarih: string;
    begeniSayisi: number;
  }>;
  kullaniciBegenilenYorumlar?: Array<any>;
  kullaniciKayitliBasliklar?: Array<any>;
}

export function ProfilSayfasi({ onClose, onOpenSettings, onBaslikClick, onOpenYeniBaslik, onCikis, onCoinsUpdate, kullaniciBilgileri, kullaniciYorumlari: propYorumlar, kullaniciBegenilenYorumlar: propBegeniler, kullaniciKayitliBasliklar: propKayitlar }: ProfilSayfasiProps) {
  const [showFeatureSelector, setShowFeatureSelector] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [expandedRole, setExpandedRole] = useState<number | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showProfilDuzenle, setShowProfilDuzenle] = useState(false);
  const [activeTab, setActiveTab] = useState<"basliklar" | "yorumlar" | "begeniler" | "kaydedilenler">("basliklar");
  const [showTransferInput, setShowTransferInput] = useState(false);
  const [transferAmount, setTransferAmount] = useState("");
  const [isTransferring, setIsTransferring] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [transferredAmount, setTransferredAmount] = useState(0);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showCoinInfoModal, setShowCoinInfoModal] = useState(false);
  const [inviteCode] = useState(() => {
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `KONYA-${randomPart}`;
  });
  const [invitedFriends] = useState(3);
  const [showSettings, setShowSettings] = useState(false);
  
  // Coin Kuralları - Admin tarafından düzenlenebilir
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
  
  // Ayarlar State'leri
  const [profilGorunurlugu, setProfilGorunurlugu] = useState(() => {
    return localStorage.getItem('profilGorunurlugu') !== 'false';
  });
  const [aktiviteDurumu, setAktiviteDurumu] = useState(() => {
    return localStorage.getItem('aktiviteDurumu') !== 'false';
  });
  const [yeniYanitBildirimleri, setYeniYanitBildirimleri] = useState(() => {
    return localStorage.getItem('yeniYanitBildirimleri') !== 'false';
  });
  const [begenieBildirimleri, setBegenieBildirimleri] = useState(() => {
    return localStorage.getItem('begenieBildirimleri') !== 'false';
  });
  const [etkinlikBildirimleri, setEtkinlikBildirimleri] = useState(() => {
    return localStorage.getItem('etkinlikBildirimleri') !== 'false';
  });
  const [epostaBildirimleri, setEpostaBildirimleri] = useState(() => {
    return localStorage.getItem('epostaBildirimleri') === 'true';
  });
  const [mesajIstekleri, setMesajIstekleri] = useState(() => {
    return localStorage.getItem('mesajIstekleri') !== 'false';
  });
  const [profilGoruntulemeGecmisi, setProfilGoruntulemeGecmisi] = useState(() => {
    return localStorage.getItem('profilGoruntulemeGecmisi') === 'true';
  });
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [yaziBoyu, setYaziBoyu] = useState(() => {
    return localStorage.getItem('yaziBoyu') || 'medium';
  });
  
  const [profilFoto, setProfilFoto] = useState("figma:asset/4566f69b2ed73af1db8ca8eaaf8d4ca66f0ec0ff.png");
  const [ad, setAd] = useState(kullaniciBilgileri?.ad || "Bey gör");
  const [bio, setBio] = useState("Akademik başarı, sosyal aktiviteler ve kahve keşifleri konularında aktif paylaşımlar yapıyorum. Konya'nın genç topluluğuna katkıda bulunmaktan mutluluk duyuyorum!");
  const [email, setEmail] = useState("kullanici@email.com");
  const [telefon, setTelefon] = useState("+90 555 123 4567");
  const [konum, setKonum] = useState("Selçuk Üniversitesi Hukuk Fakültesi");

  // Ayarları Kaydetme Fonksiyonları
  const handleSaveSettings = () => {
    localStorage.setItem('profilGorunurlugu', String(profilGorunurlugu));
    localStorage.setItem('aktiviteDurumu', String(aktiviteDurumu));
    localStorage.setItem('yeniYanitBildirimleri', String(yeniYanitBildirimleri));
    localStorage.setItem('begenieBildirimleri', String(begenieBildirimleri));
    localStorage.setItem('etkinlikBildirimleri', String(etkinlikBildirimleri));
    localStorage.setItem('epostaBildirimleri', String(epostaBildirimleri));
    localStorage.setItem('mesajIstekleri', String(mesajIstekleri));
    localStorage.setItem('profilGoruntulemeGecmisi', String(profilGoruntulemeGecmisi));
    localStorage.setItem('darkMode', String(darkMode));
    localStorage.setItem('yaziBoyu', yaziBoyu);
    
    const changedSettings = [];
    if (darkMode) changedSettings.push('Karanlık Mod');
    if (!profilGorunurlugu) changedSettings.push('Profil Gizlendi');
    if (epostaBildirimleri) changedSettings.push('E-posta Bildirimleri');
    
    toast.success("✅ Ayarlar kaydedildi!", {
      description: `${changedSettings.length > 0 ? changedSettings.join(', ') + ' aktif' : 'Tüm tercihleriniz güncellendi'}`,
      duration: 3000,
    });
    setShowSettings(false);
  };

  const handleDownloadData = () => {
    const userData = {
      ad,
      email,
      telefon,
      konum,
      bio,
      rol: kullaniciBilgileri?.rol,
      coins: kullaniciBilgileri?.coins,
      baslikSayisi: kullaniciBilgileri?.baslikSayisi,
      yorumSayisi: kullaniciBilgileri?.yorumSayisi,
      ayarlar: {
        profilGorunurlugu,
        aktiviteDurumu,
        yeniYanitBildirimleri,
        begenieBildirimleri,
        etkinlikBildirimleri,
        epostaBildirimleri,
        mesajIstekleri,
        profilGoruntulemeGecmisi,
        darkMode,
        yaziBoyu
      }
    };
    
    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `konya-veri-yedek-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast.success("Verileriniz indiriliyor!", {
      description: "JSON dosyası olarak kaydedilecek",
    });
  };

  const handleDeleteAccount = () => {
    toast.error("Hesap silme onayı gerekli", {
      description: "Bu işlemi gerçekleştirmek için lütfen admin ile iletişime geçin",
      duration: 5000,
    });
  };

  const handleOpenEditForm = () => {
    setShowProfilDuzenle(true);
  };

  const handleProfilKaydet = (data: { ad: string; bio: string; email: string; telefon: string; konum: string }) => {
    setAd(data.ad);
    setBio(data.bio);
    setEmail(data.email);
    setTelefon(data.telefon);
    setKonum(data.konum);
  };

  // Dark Mode ve Yazı Boyutu Etkisi
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Coin kurallarını dinle (admin değiştirdiğinde güncelle)
  useEffect(() => {
    const checkCoinRules = () => {
      const saved = localStorage.getItem('coinKurallari');
      if (saved) {
        setCoinKurallari(JSON.parse(saved));
      }
    };
    
    window.addEventListener('storage', checkCoinRules);
    checkCoinRules();
    
    return () => window.removeEventListener('storage', checkCoinRules);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    switch (yaziBoyu) {
      case 'small':
        root.style.fontSize = '14px';
        break;
      case 'large':
        root.style.fontSize = '18px';
        break;
      default:
        root.style.fontSize = '16px';
    }
  }, [yaziBoyu]);

  const userCoins = kullaniciBilgileri?.coins || 5000;

  const checkPermission = (requiredRole: string, action: string) => {
    const roleHierarchy = ["Yeni Gelen", "Seyyah", "Gezgin", "Kaşif Meraklısı", "Konya Bilgesi"];
    const currentRoleIndex = roleHierarchy.indexOf(currentRole?.name || "");
    const requiredRoleIndex = roleHierarchy.indexOf(requiredRole);
    
    if (currentRoleIndex < requiredRoleIndex) {
      toast.error(`Bu işlem için "${requiredRole}" rolüne ihtiyacınız var!`, {
        description: `${action} yapabilmek için ${roles[requiredRoleIndex].minCoins.toLocaleString()} coin'e ulaşmalısınız. Şu anki durumunuz: ${userCoins.toLocaleString()} coin`,
        duration: 4000,
      });
      return false;
    }
    return true;
  };

  const availableFeatures = [
    "🎯 Akademi Tutkunu",
    "☕ Kahve Sever",
    "📚 Kitap Kurdu",
    "🎵 Müzik Meraklısı",
    "🎨 Sanat Sever",
    "💻 Teknoloji Tutkunu",
    "🏃‍♂️ Spor Sever",
    "🎬 Film Hayranı",
    "🌍 Gezgin",
    "🍕 Yemek Sever"
  ];

  const stats = [
    { icon: TrendingUp, label: `${kullaniciBilgileri?.coins?.toLocaleString() || '5000'} Coin`, color: "from-[#2A4461] to-[#395579]" },
    { icon: MessageSquare, label: `${kullaniciBilgileri?.baslikSayisi || 12} Başlık`, color: "from-[#395579] to-[#4A6A8A]" },
    { icon: Award, label: `${kullaniciBilgileri?.yorumSayisi || 34} Yorum`, color: "from-[#4A6A8A] to-[#5A7A9A]" },
    { icon: Eye, label: `${kullaniciBilgileri?.goruntulemeSayisi ? (kullaniciBilgileri.goruntulemeSayisi / 1000).toFixed(1) + 'k' : '245'} Görüntüleme`, color: "from-[#5A7A9A] to-[#7B99B3]" },
    { icon: ThumbsUp, label: `${kullaniciBilgileri?.begeniSayisi || 78} Beğeni`, color: "from-[#7B99B3] to-[#395579]" },
  ];

  const kullaniciBasliklari = [
    { id: 16, baslik: "Alaaddin Tepesi'nde en iyi manzara noktaları", kategori: "Keşif Rehberi", yorumSayisi: 34, begeniSayisi: 93, tarih: "1 gün önce" },
    { id: 6, baslik: "Kampüs yakınında yeni açılan kafe", kategori: "Sosyal Yaşam", yorumSayisi: 15, begeniSayisi: 52, tarih: "6 saat önce" },
    { id: 5, baslik: "Kütüphane çalışma saatleri güncelleme", kategori: "Akademik Destek", yorumSayisi: 31, begeniSayisi: 67, tarih: "3 gün önce" },
  ];

  const kullaniciYorumlari = propYorumlar || [
    { baslikId: 34, yorumId: 16, baslik: "Meram'da en iyi kahvaltı mekanları", kategori: "Keşif Rehberi", yorum: "Kesinlikle Tiritçi Mithat'ı deneyin, fiyatlar uygun ve lezzet harika!", tarih: "1 gün önce", begeniSayisi: 8 },
    { baslikId: 45, yorumId: 18, baslik: "Kampüste wifi sorunları", kategori: "Akademik Destek", yorum: "Merkez kütüphanenin 2. katında wifi daha stabil çalışıyor, oradan deneyebilirsiniz.", tarih: "3 gün önce", begeniSayisi: 5 },
    { baslikId: 46, yorumId: 20, baslik: "Konya'da açık olan 24 saat marketler", kategori: "Sosyal Yaşam", yorum: "Alaaddin'in yanındaki Migros 24 saat açık, acil durumlar için ideal.", tarih: "4 gün önce", begeniSayisi: 12 },
  ];

  const kullaniciBegenileri = propBegeniler || [];
  const kullaniciKaydetmeleri = propKayitlar || [];

  const roles = [
    {
      id: 1,
      icon: Sparkles,
      name: "Yeni Gelen",
      minCoins: 0,
      maxCoins: 500,
      multiplier: "1.0x",
      persona: "Meraklı Gözlemci",
      shortDesc: "Platformu keşfediyor",
      fullDesc: "Yorum yapabilir, düzenleme teklifi gönderebilir. Platform ile tanışma aşamasında.",
      abilities: ["✅ Yorum Alanına yorum yapabilir", "✅ Bilgi Alanı için düzenleme teklifi gönderebilir", "🔒 Başlık açamaz", "⚠️ Saatte 5 yorum limiti", "📝 Düzenleme teklifleri Rol 4'e düşer"]
    },
    {
      id: 2,
      icon: Map,
      name: "Seyyah",
      minCoins: 501,
      maxCoins: 2500,
      multiplier: "1.2x",
      persona: "Katkıda Bulunan",
      shortDesc: "Deneyimlerini paylaşıyor",
      fullDesc: "Yorum limitleri kalkar, Bilgi Alanını direkt düzenleyebilir.",
      abilities: ["✅ Yorum limitleri kalkar", "✅ Bilgi Alanını direkt düzenleyebilir", "🔒 Başlık açamaz", "⚠️ Düzenlemeler denetime tabidir"]
    },
    {
      id: 3,
      icon: Compass,
      name: "Gezgin",
      minCoins: 2501,
      maxCoins: 10000,
      multiplier: "1.5x",
      persona: "Güvenilir İçerik Üretici",
      shortDesc: "Yeni başlıklar açabilir",
      fullDesc: "Yeni başlık açabilir, tüm düzenlemeleri yapabilir. Platformun ufkunu genişletir.",
      abilities: ["✅ Yeni başlık açabilir", "✅ Tüm düzenlemeleri yapabilir", "⚠️ Açtığı başlıklar Kullanım Sözleşmesi denetimine tabidir"]
    },
    {
      id: 4,
      icon: Telescope,
      name: "Kaşif Meraklısı",
      minCoins: 10001,
      maxCoins: 50000,
      multiplier: "2.0x",
      persona: "Topluluk Lideri / Moderatör",
      shortDesc: "Moderasyon yetkilerine sahip",
      fullDesc: "Rol 1'in düzenleme tekliflerini onaylayabilir, spam/uygunsuz yorumları silebilir.",
      abilities: ["✅ Rol 1'in düzenleme tekliflerini onaylayabilir", "✅ Spam veya uygunsuz yorumları silebilir", "✅ Bayraklanan içerikleri inceleyip çözebilir"]
    },
    {
      id: 5,
      icon: Crown,
      name: "Konya Bilgesi",
      minCoins: 50001,
      maxCoins: Infinity,
      multiplier: "2.5x",
      persona: "Usta Rehber / Elit Katılımcı",
      shortDesc: "Platformun zirvesi",
      fullDesc: "Üst düzey moderasyon yetkileri, KBB denetim paneline erişim.",
      abilities: ["✅ Üst düzey moderasyon yetkileri", "✅ KBB denetim panelinde Bayraklanan İçerik Akışını görebilir", "✅ KBB'ye tavsiye notu bırakabilir", "🎁 Yeni özellik toplantılarına davet"]
    }
  ];

  const currentRole = roles.find(role => userCoins >= role.minCoins && userCoins <= role.maxCoins) || roles[0];
  const nextRole = roles.find(role => role.minCoins > userCoins);

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const toggleRoleExpansion = (roleId: number) => {
    setExpandedRole(expandedRole === roleId ? null : roleId);
  };

  const handleCoinTransferClick = () => {
    setShowTransferInput(true);
  };

  const handleTransferConfirm = () => {
    const amount = parseInt(transferAmount);
    
    if (!transferAmount || isNaN(amount) || amount <= 0) {
      toast.error("Lütfen geçerli bir miktar giriniz!");
      return;
    }
    
    if (amount > userCoins) {
      toast.error("Yetersiz bakiye!", {
        description: `Maksimum ${userCoins.toLocaleString()} coin transfer edebilirsiniz.`,
      });
      return;
    }
    
    setShowTransferInput(false);
    setTransferredAmount(amount);
    setIsTransferring(true);
    
    setTimeout(() => {
      setIsTransferring(false);
      setShowSuccessModal(true);
      setTransferAmount("");
      
      // Coin'leri düş - parent component'e bildir
      const newCoins = userCoins - amount;
      if (onCoinsUpdate) {
        onCoinsUpdate(newCoins);
      }
      
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
    }, 2000);
  };

  const handleCopyInviteCode = () => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = inviteCode;
      
      textArea.style.position = "fixed";
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.width = "2em";
      textArea.style.height = "2em";
      textArea.style.padding = "0";
      textArea.style.border = "none";
      textArea.style.outline = "none";
      textArea.style.boxShadow = "none";
      textArea.style.background = "transparent";
      
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      textArea.setSelectionRange(0, 99999);
      
      let successful = false;
      
      try {
        successful = document.execCommand('copy');
      } catch (err) {
        console.error('execCommand hatası:', err);
      }
      
      document.body.removeChild(textArea);
      
      if (successful) {
        toast.success("Davet kodu kopyalandı! 📋", {
          description: "Arkadaşlarınla paylaşabilirsin!",
          duration: 2000,
        });
      } else {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(inviteCode).then(() => {
            toast.success("Davet kodu kopyalandı! 📋", {
              description: "Arkadaşlarınla paylaşabilirsin!",
              duration: 2000,
            });
          }).catch(() => {
            toast.error("Kopyalama başarısız!", {
              description: "Lütfen kodu manuel olarak kopyalayın.",
              duration: 3000,
            });
          });
        } else {
          toast.error("Kopyalama başarısız!", {
            description: "Lütfen kodu manuel olarak kopyalayın.",
            duration: 3000,
          });
        }
      }
    } catch (error) {
      console.error("Kopyalama hatası:", error);
      toast.error("Kopyalama başarısız!", {
        description: "Lütfen kodu manuel olarak kopyalayın.",
        duration: 3000,
      });
    }
  };

  return (
    <>
      {/* Modal Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#395579]/12 via-[#4A6A8A]/10 to-[#5A7A9A]/8 dark:from-[#395579]/18 dark:via-[#4A6A8A]/15 dark:to-[#5A7A9A]/12 rounded-3xl shadow-2xl shadow-[#395579]/20 backdrop-blur-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Glassmorphism Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#395579]/8 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#5A7A9A]/12 rounded-full blur-3xl pointer-events-none"></div>

          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="absolute top-6 right-6 z-20 p-3 bg-white/90 dark:bg-neutral-800/90 hover:bg-white dark:hover:bg-neutral-700 rounded-xl shadow-xl backdrop-blur-sm transition-colors"
          >
            <X className="h-5 w-5 text-neutral-700 dark:text-white" />
          </motion.button>

          {/* Header with gradient */}
          <div className="relative rounded-t-3xl p-8 md:p-12 overflow-hidden bg-gradient-to-br from-[#2A4461] via-[#395579] to-[#4A6A8A]">
            {/* Background Animation */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => {
                const colors = ['rgba(57, 85, 121, 0.1)', 'rgba(74, 106, 138, 0.1)', 'rgba(90, 122, 154, 0.1)', 'rgba(123, 153, 179, 0.1)'];
                return (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: Math.random() * 120 + 40,
                      height: Math.random() * 120 + 40,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      backgroundColor: colors[i % colors.length],
                    }}
                    animate={{
                      y: [0, -15, 0],
                      x: [0, Math.random() * 10 - 5, 0],
                    }}
                    transition={{
                      duration: Math.random() * 4 + 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                );
              })}
            </div>

            {/* Profile Header */}
            <div className="relative text-center">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block mb-6 w-full max-w-3xl"
              >
                {/* Clean White Card */}
                <div className="bg-white rounded-3xl p-8 shadow-2xl border border-neutral-200 relative overflow-hidden">
                  {/* Subtle Top Accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#395579] via-[#5A7A9A] to-[#7B99B3]"></div>
                  
                  <div className="relative flex flex-col md:flex-row items-center gap-6">
                    {/* Avatar with animated ring */}
                    <div className="relative group">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#395579] via-[#5A7A9A] to-[#7B99B3] opacity-75 blur-sm"
                      ></motion.div>
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#7B99B3] via-[#4A6A8A] to-[#395579] opacity-50 blur-md"
                      ></motion.div>
                      
                      <div className="relative w-28 h-28 md:w-36 md:h-36 bg-gradient-to-br from-[#395579] to-[#7B99B3] rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden text-5xl md:text-6xl text-white transform transition-transform group-hover:scale-105">
                        {kullaniciBilgileri?.avatar || "B"}
                      </div>
                      
                      {/* Edit Button */}
                      <button
                        onClick={handleOpenEditForm}
                        className="absolute -bottom-3 -right-3 p-3 bg-gradient-to-br from-[#395579] to-[#4A6A8A] rounded-2xl shadow-xl hover:shadow-2xl transition-all group/btn"
                      >
                        <Edit className="h-5 w-5 text-white" />
                        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none z-50">
                          <div className="bg-neutral-900 text-white px-3 py-2 rounded-xl text-sm whitespace-nowrap shadow-xl">
                            Profili Düzenle
                          </div>
                        </div>
                      </button>
                    </div>
                    
                    {/* Info Section */}
                    <div className="text-center md:text-left flex-1">
                      <motion.h2
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-neutral-900 text-3xl md:text-4xl mb-2"
                      >
                        {ad}
                      </motion.h2>
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.35 }}
                        className="flex items-center gap-2 text-neutral-600 text-base md:text-lg mb-4 justify-center md:justify-start"
                      >
                        <MapPin className="h-5 w-5 text-[#395579]" />
                        <span>{konum}</span>
                      </motion.div>
                      
                      {/* Quick Stats */}
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex gap-3 justify-center md:justify-start flex-wrap"
                      >
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            const roleElement = document.getElementById('role-system');
                            if (roleElement) {
                              roleElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                              toast.info("Rol sistemi detayları", {
                                description: "Aşağıda tüm roller ve yeteneklerini görebilirsiniz",
                              });
                            }
                          }}
                          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-br from-[#395579] to-[#4A6A8A] rounded-xl shadow-lg hover:shadow-xl transition-all"
                        >
                          <Trophy className="h-5 w-5 text-white" />
                          <span className="text-white">{currentRole.name}</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowCoinInfoModal(true)}
                          className="flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-[#395579] rounded-xl shadow-md hover:shadow-xl transition-all"
                        >
                          <Coins className="h-5 w-5 text-[#395579]" />
                          <span className="text-neutral-900">{userCoins.toLocaleString()}</span>
                        </motion.button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Content */}
          <div className="relative p-6 md:p-8">
            {/* Coin Cards */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6"
            >
              {/* Coin Dönüştür */}
              <motion.button
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCoinTransferClick}
                disabled={isTransferring}
                className="bg-white rounded-2xl p-5 shadow-xl shadow-[#395579]/15 text-left relative overflow-hidden disabled:opacity-70"
              >
                {isTransferring && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 border-4 border-[#395579]/30 border-t-[#395579] rounded-full animate-spin"></div>
                      <span className="text-sm text-[#395579]">Transfer ediliyor...</span>
                    </div>
                  </motion.div>
                )}
                
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-neutral-700 mb-1">
                      <ArrowRightLeft className="h-5 w-5" />
                      <span className="text-lg">Coin'leri Karta Aktar</span>
                    </div>
                    <p className="text-neutral-600 text-sm">
                      ₺{(userCoins * 0.1).toFixed(2)}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#395579]/15 flex items-center justify-center">
                    <Star className="h-6 w-6 text-[#395579]" />
                  </div>
                </div>
              </motion.button>

              {/* Arkadaşını Davet Et */}
              <motion.button
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowInviteModal(true)}
                className="bg-gradient-to-br from-[#2A4461] via-[#395579] to-[#4A6A8A] rounded-2xl p-5 shadow-xl shadow-[#395579]/20 backdrop-blur-lg text-left relative overflow-hidden"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-white/80 text-sm mb-1">Arkadaşını Davet Et</p>
                    <div className="flex items-center gap-2 text-white">
                      <UserPlus className="h-5 w-5" />
                      <span className="text-lg">+50 Coin Kazan</span>
                    </div>
                    <p className="text-white/70 text-xs mt-1.5">
                      {invitedFriends} arkadaş davet edildi
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <Gift className="h-6 w-6 text-white" />
                  </div>
                </div>
              </motion.button>
            </motion.div>

            {/* About Section */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mb-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white text-lg flex items-center gap-2">
                  <User className="h-5 w-5 text-white" />
                  Hakkında
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowFeatureSelector(!showFeatureSelector)}
                  className="p-2 rounded-xl bg-gradient-to-br from-[#395579] to-[#4A6A8A] shadow-lg"
                >
                  <Plus className="h-5 w-5 text-white" />
                </motion.button>
              </div>

              <AnimatePresence>
                {showFeatureSelector && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mb-4"
                  >
                    <div className="rounded-2xl p-4 mb-4 bg-white shadow-lg">
                      <p className="text-neutral-700 mb-3 text-sm">Özelliklerini seç:</p>
                      <div className="flex gap-2 flex-wrap">
                        {availableFeatures.map((feature, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => toggleFeature(feature)}
                            className={`px-3 py-2 rounded-lg text-sm transition-all ${
                              selectedFeatures.includes(feature)
                                ? 'bg-gradient-to-br from-[#395579] to-[#4A6A8A] text-white shadow-lg'
                                : 'bg-white text-neutral-700 hover:shadow-lg shadow-md'
                            }`}
                          >
                            {feature}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="bg-white rounded-2xl p-5 shadow-xl shadow-[#395579]/10">
                <p className="text-neutral-700 text-sm mb-4">{bio}</p>
                {selectedFeatures.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {selectedFeatures.map((feature, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-lg bg-gradient-to-br from-[#395579]/15 to-[#4A6A8A]/10 text-[#395579] text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Content Tabs */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {["basliklar", "yorumlar", "begeniler", "kaydedilenler"].map((tab) => (
                  <motion.button
                    key={tab}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-all ${
                      activeTab === tab
                        ? 'bg-gradient-to-br from-[#395579] to-[#4A6A8A] text-white shadow-lg'
                        : 'bg-white text-neutral-700 hover:shadow-lg'
                    }`}
                  >
                    {tab === "basliklar" && "Başlıklar"}
                    {tab === "yorumlar" && "Yorumlar"}
                    {tab === "begeniler" && "Beğeniler"}
                    {tab === "kaydedilenler" && "Kaydedilenler"}
                  </motion.button>
                ))}
              </div>

              <div className="space-y-3">
                {activeTab === "basliklar" && kullaniciBasliklari.map((baslik, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => onBaslikClick && onBaslikClick(baslik.id, baslik.kategori)}
                    className="bg-white rounded-2xl p-4 hover:shadow-xl hover:shadow-[#395579]/15 transition-all cursor-pointer"
                  >
                    <h4 className="text-neutral-700 mb-2">{baslik.baslik}</h4>
                    <div className="flex items-center gap-4 text-sm text-neutral-500">
                      <span className="px-2 py-1 rounded-lg bg-[#395579]/15 text-[#395579] text-xs">{baslik.kategori}</span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {baslik.yorumSayisi}
                      </span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        {baslik.begeniSayisi}
                      </span>
                      <span className="ml-auto text-xs">{baslik.tarih}</span>
                    </div>
                  </motion.div>
                ))}

                {activeTab === "yorumlar" && kullaniciYorumlari.map((yorum, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => onBaslikClick && onBaslikClick(yorum.baslikId, yorum.kategori)}
                    className="bg-white rounded-2xl p-4 hover:shadow-xl hover:shadow-[#395579]/15 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h4 className="text-neutral-700 text-sm">{yorum.baslik}</h4>
                      <span className="px-2 py-1 rounded-lg bg-[#395579]/15 text-[#395579] text-xs whitespace-nowrap">{yorum.kategori}</span>
                    </div>
                    <p className="text-neutral-600 text-sm mb-3">{yorum.yorum}</p>
                    <div className="flex items-center gap-3 text-xs text-neutral-500">
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3" />
                        {yorum.begeniSayisi}
                      </span>
                      <span>{yorum.tarih}</span>
                    </div>
                  </motion.div>
                ))}

                {activeTab === "begeniler" && kullaniciBegenileri.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-2xl">
                    <Heart className="h-12 w-12 text-neutral-300 mx-auto mb-3" />
                    <p className="text-neutral-500">Henüz beğeni yok</p>
                  </div>
                )}

                {activeTab === "begeniler" && kullaniciBegenileri.length > 0 && kullaniciBegenileri.map((begeni: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => onBaslikClick && onBaslikClick(begeni.baslikId, begeni.kategori)}
                    className="bg-white rounded-2xl p-4 hover:shadow-xl hover:shadow-[#395579]/15 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h4 className="text-neutral-700 text-sm">{begeni.baslik}</h4>
                      <span className="px-2 py-1 rounded-lg bg-[#395579]/15 text-[#395579] text-xs whitespace-nowrap">{begeni.kategori}</span>
                    </div>
                    <p className="text-neutral-600 text-sm mb-3">{begeni.yorum}</p>
                    <div className="flex items-center gap-3 text-xs text-neutral-500">
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3" />
                        {begeni.begeniSayisi}
                      </span>
                      <span>{begeni.tarih}</span>
                    </div>
                  </motion.div>
                ))}

                {activeTab === "kaydedilenler" && kullaniciKaydetmeleri.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-2xl">
                    <Bookmark className="h-12 w-12 text-neutral-300 mx-auto mb-3" />
                    <p className="text-neutral-500">Henüz kayıtlı başlık yok</p>
                  </div>
                )}

                {activeTab === "kaydedilenler" && kullaniciKaydetmeleri.length > 0 && kullaniciKaydetmeleri.map((kayit: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => onBaslikClick && onBaslikClick(kayit.id, kayit.kategori)}
                    className="bg-white rounded-2xl p-4 hover:shadow-xl hover:shadow-[#395579]/15 transition-all cursor-pointer"
                  >
                    <h4 className="text-neutral-700 mb-2">{kayit.baslik}</h4>
                    <div className="flex items-center gap-4 text-sm text-neutral-500">
                      <span className="px-2 py-1 rounded-lg bg-[#395579]/15 text-[#395579] text-xs">{kayit.kategori}</span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {kayit.yorumSayisi}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {kayit.goruntulenme}
                      </span>
                      <span className="ml-auto text-xs">{kayit.tarih}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Rol Sistemi */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-6"
              id="role-system"
            >
              <h3 className="text-white mb-4 text-lg flex items-center gap-2">
                <Trophy className="h-5 w-5 text-white" />
                Rol Sistemi
              </h3>

              {/* Current Role */}
              <div className="mb-4 p-5 bg-white rounded-2xl shadow-xl shadow-[#395579]/15">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#395579] to-[#4A6A8A] flex items-center justify-center">
                    <currentRole.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-neutral-700">{currentRole.name}</h4>
                    <p className="text-neutral-600 text-sm">{currentRole.shortDesc}</p>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-gradient-to-br from-[#395579] to-[#4A6A8A] text-white text-sm">
                    {currentRole.multiplier}
                  </span>
                </div>
                {nextRole && (
                  <div className="mt-3 pt-3 border-t border-[#395579]/20">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-neutral-600">Sonraki Rol</span>
                      <span className="text-[#395579]">{nextRole.name}</span>
                    </div>
                    <div className="w-full h-2 bg-[#395579]/15 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(userCoins / nextRole.minCoins) * 100}%` }}
                        transition={{ delay: 1, duration: 1 }}
                        className="h-full bg-gradient-to-r from-[#395579] to-[#4A6A8A]"
                      />
                    </div>
                    <p className="text-xs text-neutral-500 mt-1">
                      {(nextRole.minCoins - userCoins).toLocaleString()} coin kaldı
                    </p>
                  </div>
                )}
              </div>

              {/* All Roles */}
              <div className="space-y-2">
                {roles.map((role) => (
                  <motion.div
                    key={role.id}
                    whileHover={{ scale: 1.01 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-[#395579]/10 transition-all"
                  >
                    <button
                      onClick={() => toggleRoleExpansion(role.id)}
                      className="w-full p-4 flex items-center justify-between gap-3 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          currentRole.id === role.id 
                            ? 'bg-gradient-to-br from-[#395579] to-[#4A6A8A]' 
                            : 'bg-[#395579]/15'
                        }`}>
                          <role.icon className={`h-5 w-5 ${currentRole.id === role.id ? 'text-white' : 'text-[#395579]'}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-neutral-700 text-sm">{role.name}</h4>
                            {currentRole.id === role.id && (
                              <span className="px-2 py-0.5 rounded-full bg-[#395579]/15 text-[#395579] text-xs">Aktif</span>
                            )}
                          </div>
                          <p className="text-neutral-500 text-xs">{role.shortDesc}</p>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedRole === role.id ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight className="h-5 w-5 text-neutral-400 rotate-90" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {expandedRole === role.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 space-y-3 border-t border-[#395579]/10">
                            <div className="pt-3">
                              <p className="text-neutral-600 text-sm mb-2">{role.fullDesc}</p>
                              <div className="space-y-1.5">
                                {role.abilities.map((ability, i) => (
                                  <p key={i} className="text-xs text-neutral-500 pl-2">
                                    {ability}
                                  </p>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <span className="px-2 py-1 rounded-lg bg-[#395579]/15 text-[#395579]">
                                {role.minCoins.toLocaleString()} - {role.maxCoins === Infinity ? '∞' : role.maxCoins.toLocaleString()} coin
                              </span>
                              <span className="px-2 py-1 rounded-lg bg-[#395579]/15 text-[#395579]">
                                {role.multiplier}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              {/* Ayarlar ve Çıkış Yap Butonları */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Ayarlar Butonu */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowSettings(true);
                  }}
                  className="flex items-center justify-center gap-3 bg-white text-neutral-700 px-5 py-4 rounded-2xl hover:shadow-xl hover:shadow-[#395579]/15 transition-all"
                >
                  <Settings className="h-5 w-5 text-[#395579]" />
                  <span>Ayarlar</span>
                </motion.button>

                {/* Çıkış Yap Butonu */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    toast.warning("Çıkış yapılıyor...", {
                      description: "Hesabınızdan çıkış yapmak üzeresiniz",
                      duration: 2000,
                    });
                    if (onCikis) {
                      onCikis();
                    }
                  }}
                  className="flex items-center justify-center gap-3 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 px-5 py-4 rounded-2xl transition-all border-2 border-red-500/20 hover:border-red-500/40"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Çıkış Yap</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Transfer Input Modal */}
      <AnimatePresence>
        {showTransferInput && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowTransferInput(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-gradient-to-br from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/20 rounded-3xl p-6 max-w-md w-full shadow-2xl backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-neutral-700 dark:text-white text-lg">Coin Transfer</h3>
                <button onClick={() => setShowTransferInput(false)}>
                  <X className="h-5 w-5 text-neutral-500" />
                </button>
              </div>
              <input
                type="number"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                placeholder="Miktar girin"
                className="w-full px-4 py-3 rounded-xl bg-white/90 dark:bg-neutral-800/90 text-neutral-700 dark:text-white mb-4 outline-none focus:ring-2 focus:ring-[#395579]"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setShowTransferInput(false)}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/90 dark:bg-neutral-700/90 text-neutral-700 dark:text-white hover:shadow-lg transition-all"
                >
                  İptal
                </button>
                <button
                  onClick={handleTransferConfirm}
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-br from-[#395579] to-[#4A6A8A] text-white hover:shadow-lg transition-all"
                >
                  Onayla
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gradient-to-br from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/20 rounded-3xl p-8 max-w-sm w-full shadow-2xl backdrop-blur-xl text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-[#395579] to-[#4A6A8A] mx-auto mb-4 flex items-center justify-center"
              >
                <Check className="h-10 w-10 text-white" />
              </motion.div>
              <h3 className="text-neutral-700 dark:text-white text-xl mb-2">Transfer Başarılı!</h3>
              <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                {transferredAmount} coin başarıyla transfer edildi
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Tutar: ₺{(transferredAmount * 0.1).toFixed(2)}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Coin Info Modal */}
      <AnimatePresence>
        {showCoinInfoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowCoinInfoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-gradient-to-br from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/20 rounded-3xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white text-xl flex items-center gap-2">
                  <Coins className="h-6 w-6 text-[#395579]" />
                  Coin Kazanma Yolları
                </h3>
                <button onClick={() => setShowCoinInfoModal(false)}>
                  <X className="h-6 w-6 text-neutral-500" />
                </button>
              </div>

              <div className="space-y-3">
                {/* Yeni Başlık Açma */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/90 dark:bg-neutral-800/90 rounded-2xl p-4 backdrop-blur-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#395579] to-[#4A6A8A] flex items-center justify-center">
                          <Plus className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-neutral-700 dark:text-white">Yeni Başlık Açma</span>
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 ml-10">Her yeni başlık açtığında coin kazanırsın</p>
                    </div>
                    <div className="bg-gradient-to-br from-[#395579] to-[#4A6A8A] text-white px-3 py-1 rounded-lg text-sm">
                      +{coinKurallari.yeniBaslik}
                    </div>
                  </div>
                </motion.div>

                {/* Bilgi Alanı Düzenlemesi */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                  className="bg-white/90 dark:bg-neutral-800/90 rounded-2xl p-4 backdrop-blur-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#395579] to-[#4A6A8A] flex items-center justify-center">
                          <FileEdit className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-neutral-700 dark:text-white">Bilgi Alanı Düzenlemesi</span>
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 ml-10">Başlık içeriği düzenleyerek coin kazanırsın</p>
                    </div>
                    <div className="bg-gradient-to-br from-[#395579] to-[#4A6A8A] text-white px-3 py-1 rounded-lg text-sm">
                      +{coinKurallari.bilgiDuzenleme}
                    </div>
                  </div>
                </motion.div>

                {/* Yorum Yazma */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/90 dark:bg-neutral-800/90 rounded-2xl p-4 backdrop-blur-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#395579] to-[#4A6A8A] flex items-center justify-center">
                          <MessageSquare className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-neutral-700 dark:text-white">Yorum Yazma</span>
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 ml-10">Her yorum için coin kazanırsın</p>
                    </div>
                    <div className="bg-gradient-to-br from-[#395579] to-[#4A6A8A] text-white px-3 py-1 rounded-lg text-sm">
                      +{coinKurallari.yorumYazma}
                    </div>
                  </div>
                </motion.div>

                {/* Düzenlemede Yararlı Oy Alma */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                  className="bg-white/90 dark:bg-neutral-800/90 rounded-2xl p-4 backdrop-blur-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#395579] to-[#4A6A8A] flex items-center justify-center">
                          <ThumbsUp className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-neutral-700 dark:text-white">Düzenlemede Yararlı Oy</span>
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 ml-10">Düzenlemeniz yararlı bulunduğunda coin kazanırsın</p>
                    </div>
                    <div className="bg-gradient-to-br from-[#395579] to-[#4A6A8A] text-white px-3 py-1 rounded-lg text-sm">
                      +{coinKurallari.yararliOy}
                    </div>
                  </div>
                </motion.div>

                {/* Düzenlemede Yararsız Oy Alma */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/90 dark:bg-neutral-800/90 rounded-2xl p-4 backdrop-blur-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                          <ThumbsDown className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-neutral-700 dark:text-white">Düzenlemede Yararsız Oy</span>
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 ml-10">Düzenlemeniz yararsız bulunduğunda coin kaybedersin</p>
                    </div>
                    <div className="bg-gradient-to-br from-red-500 to-red-600 text-white px-3 py-1 rounded-lg text-sm">
                      {coinKurallari.yararsizOy}
                    </div>
                  </div>
                </motion.div>

                {/* Yorumun Beğeni Alması */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                  className="bg-white/90 dark:bg-neutral-800/90 rounded-2xl p-4 backdrop-blur-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#395579] to-[#4A6A8A] flex items-center justify-center">
                          <Heart className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-neutral-700 dark:text-white">Yorumun Beğeni Alması</span>
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 ml-10">Yorumun her beğeni aldığında coin kazanırsın</p>
                    </div>
                    <div className="bg-gradient-to-br from-[#395579] to-[#4A6A8A] text-white px-3 py-1 rounded-lg text-sm">
                      +{coinKurallari.yorumBegeni}
                    </div>
                  </div>
                </motion.div>

                {/* Arkadaş Daveti */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/90 dark:bg-neutral-800/90 rounded-2xl p-4 backdrop-blur-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#395579] to-[#4A6A8A] flex items-center justify-center">
                          <UserPlus className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-neutral-700 dark:text-white">Arkadaş Daveti</span>
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 ml-10">Her davet için bonus coin kazanırsın</p>
                    </div>
                    <div className="bg-gradient-to-br from-[#395579] to-[#4A6A8A] text-white px-3 py-1 rounded-lg text-sm">
                      +{coinKurallari.arkadasDavet}
                    </div>
                  </div>
                </motion.div>

                {/* Genç Kültürkart Projesi */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 }}
                  className="bg-gradient-to-br from-[#395579]/20 to-[#4A6A8A]/15 dark:from-[#395579]/30 dark:to-[#4A6A8A]/25 rounded-2xl p-4 backdrop-blur-lg border border-[#395579]/30"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#395579] to-[#4A6A8A] flex items-center justify-center">
                          <Award className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-white font-medium">Genç Kültürkart Projesi</span>
                      </div>
                      <p className="text-xs text-neutral-400 ml-10">Genç Kültürkart ile yapılan projelere katılım bonusu</p>
                    </div>
                    <div className="bg-gradient-to-br from-[#395579] to-[#4A6A8A] text-white px-4 py-1 rounded-lg font-medium">
                      +{coinKurallari.kulturkartProje}
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                onClick={() => setShowCoinInfoModal(false)}
                className="w-full mt-6 py-3 rounded-xl bg-gradient-to-br from-[#395579] to-[#4A6A8A] text-white hover:shadow-lg transition-all"
              >
                Anladım
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Invite Modal */}
      <AnimatePresence>
        {showInviteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowInviteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-gradient-to-br from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/20 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl overflow-hidden backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-[#395579]/30"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-neutral-700 dark:text-white text-xl">Arkadaşını Davet Et</h3>
                  <button onClick={() => setShowInviteModal(false)}>
                    <X className="h-6 w-6 text-neutral-500" />
                  </button>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/90 dark:bg-neutral-800/90 rounded-2xl p-5 mb-4 backdrop-blur-lg"
                >
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">Davet Kodun</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-br from-[#395579]/15 to-[#4A6A8A]/10 text-neutral-700 dark:text-white text-center text-lg tracking-wider">
                      {inviteCode}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCopyInviteCode}
                      className="p-3 rounded-xl bg-gradient-to-br from-[#395579] to-[#4A6A8A] text-white hover:shadow-lg transition-all"
                    >
                      <Copy className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/20 rounded-2xl p-5 mb-4 backdrop-blur-lg"
                >
                  <div className="flex items-center justify-around text-center">
                    <div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Davet Edilen</p>
                      <p className="text-3xl text-[#395579]">
                        {invitedFriends}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">arkadaş</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Kazanılan</p>
                      <p className="text-3xl text-[#395579]">
                        {invitedFriends * 50}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">coin</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowShareOptions(!showShareOptions)}
                    className="w-full py-4 rounded-xl bg-gradient-to-br from-[#395579] to-[#4A6A8A] text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-5 h-5" />
                    <span className="text-lg">Arkadaşlarına Gönder</span>
                  </motion.button>

                  <AnimatePresence>
                    {showShareOptions && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute bottom-full left-0 right-0 mb-2 bg-white/90 dark:bg-neutral-800/90 rounded-2xl shadow-2xl p-3 backdrop-blur-lg"
                      >
                        <div className="grid grid-cols-2 gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              window.open(`https://wa.me/?text=GençKonya%20Bilgi%20Bankası%27na%20katıl!%20Davet%20kodum:%20${inviteCode}%20-%20${window.location.origin}`, '_blank');
                              setShowShareOptions(false);
                              toast.success("WhatsApp'ta paylaş");
                            }}
                            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-all"
                          >
                            <Phone className="w-5 h-5 text-[#25D366]" />
                            <span className="text-sm text-neutral-700 dark:text-white">WhatsApp</span>
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              window.open(`https://t.me/share/url?url=${window.location.origin}&text=GençKonya%20Bilgi%20Bankası%27na%20katıl!%20Davet%20kodum:%20${inviteCode}`, '_blank');
                              setShowShareOptions(false);
                              toast.success("Telegram'da paylaş");
                            }}
                            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#0088cc]/10 hover:bg-[#0088cc]/20 transition-all"
                          >
                            <TelegramIcon className="w-5 h-5 text-[#0088cc]" />
                            <span className="text-sm text-neutral-700 dark:text-white">Telegram</span>
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              window.open(`https://twitter.com/intent/tweet?text=GençKonya%20Bilgi%20Bankası%27na%20katıl!%20Davet%20kodum:%20${inviteCode}&url=${window.location.origin}`, '_blank');
                              setShowShareOptions(false);
                              toast.success("X'te paylaş");
                            }}
                            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 transition-all"
                          >
                            <TwitterIcon className="w-5 h-5 text-[#1DA1F2]" />
                            <span className="text-sm text-neutral-700 dark:text-white">Twitter</span>
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}&quote=GençKonya%20Bilgi%20Bankası%27na%20katıl!%20Davet%20kodum:%20${inviteCode}`, '_blank');
                              setShowShareOptions(false);
                              toast.success("Facebook'ta paylaş");
                            }}
                            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#1877F2]/10 hover:bg-[#1877F2]/20 transition-all"
                          >
                            <Facebook className="w-5 h-5 text-[#1877F2]" />
                            <span className="text-sm text-neutral-700 dark:text-white">Facebook</span>
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              window.open(`https://www.instagram.com/?url=${window.location.origin}`, '_blank');
                              setShowShareOptions(false);
                              toast.success("Instagram'da paylaş");
                            }}
                            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-br from-[#f58529]/10 via-[#dd2a7b]/10 to-[#8134af]/10 hover:from-[#f58529]/20 hover:via-[#dd2a7b]/20 hover:to-[#8134af]/20 transition-all"
                          >
                            <Instagram className="w-5 h-5 text-[#dd2a7b]" />
                            <span className="text-sm text-neutral-700 dark:text-white">Instagram</span>
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              window.open(`mailto:?subject=GençKonya%20Bilgi%20Bankası%27na%20Katıl&body=GençKonya%20Bilgi%20Bankası%27na%20katıl!%20Davet%20kodum:%20${inviteCode}%20-%20${window.location.origin}`, '_blank');
                              setShowShareOptions(false);
                              toast.success("E-posta ile paylaş");
                            }}
                            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#EA4335]/10 hover:bg-[#EA4335]/20 transition-all"
                          >
                            <Mail className="w-5 h-5 text-[#EA4335]" />
                            <span className="text-sm text-neutral-700 dark:text-white">E-posta</span>
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => setShowInviteModal(false)}
                  className="w-full mt-3 py-3 rounded-xl bg-white/90 dark:bg-neutral-800/90 text-neutral-700 dark:text-white hover:shadow-lg transition-all backdrop-blur-lg"
                >
                  Kapat
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ayarlar Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-gradient-to-br from-[#1d2633] to-[#28374a] rounded-3xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#395579] to-[#4A6A8A] flex items-center justify-center">
                    <Settings className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-white text-xl">Ayarlar</h3>
                </div>
                <button 
                  onClick={() => setShowSettings(false)}
                  className="p-2 hover:bg-white/10 rounded-xl transition-all"
                >
                  <X className="h-5 w-5 text-white" />
                </button>
              </div>

              {/* Ayarlar İçeriği */}
              <div className="space-y-4">
                {/* Profil Ayarları */}
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/10">
                  <h4 className="text-white mb-4 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Profil Ayarları
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-sm">Profil Görünürlüğü</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={profilGorunurlugu}
                          onChange={(e) => setProfilGorunurlugu(e.target.checked)}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#395579] peer-checked:to-[#4A6A8A]"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-sm">Aktivite Durumu Göster</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={aktiviteDurumu}
                          onChange={(e) => setAktiviteDurumu(e.target.checked)}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#395579] peer-checked:to-[#4A6A8A]"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Bildirim Ayarları */}
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/10">
                  <h4 className="text-white mb-4 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Bildirim Ayarları
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-sm">Yeni Yanıt Bildirimleri</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={yeniYanitBildirimleri}
                          onChange={(e) => setYeniYanitBildirimleri(e.target.checked)}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#395579] peer-checked:to-[#4A6A8A]"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-sm">Beğeni Bildirimleri</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={begenieBildirimleri}
                          onChange={(e) => setBegenieBildirimleri(e.target.checked)}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#395579] peer-checked:to-[#4A6A8A]"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-sm">Etkinlik Bildirimleri</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={etkinlikBildirimleri}
                          onChange={(e) => setEtkinlikBildirimleri(e.target.checked)}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#395579] peer-checked:to-[#4A6A8A]"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-sm">E-posta Bildirimleri</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={epostaBildirimleri}
                          onChange={(e) => setEpostaBildirimleri(e.target.checked)}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#395579] peer-checked:to-[#4A6A8A]"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Gizlilik Ayarları */}
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/10">
                  <h4 className="text-white mb-4 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Gizlilik & Güvenlik
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-sm">Mesaj İstekleri</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={mesajIstekleri}
                          onChange={(e) => setMesajIstekleri(e.target.checked)}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#395579] peer-checked:to-[#4A6A8A]"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-sm">Profil Görüntülenme Geçmişi</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={profilGoruntulemeGecmisi}
                          onChange={(e) => setProfilGoruntulemeGecmisi(e.target.checked)}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#395579] peer-checked:to-[#4A6A8A]"></div>
                      </label>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        toast.info("Şifre değiştirme özelliği", {
                          description: "E-posta adresinize şifre sıfırlama bağlantısı gönderilecek",
                          duration: 3000
                        });
                      }}
                      className="w-full mt-2 flex items-center justify-between gap-3 bg-white/5 hover:bg-white/10 text-white px-4 py-3 rounded-xl transition-all border border-white/10"
                    >
                      <span className="text-sm">Şifre Değiştir</span>
                      <ChevronRight className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Görünüm Ayarları */}
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/10">
                  <h4 className="text-white mb-4 flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Görünüm
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-sm">Karanlık Mod</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={darkMode}
                          onChange={(e) => setDarkMode(e.target.checked)}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#395579] peer-checked:to-[#4A6A8A]"></div>
                      </label>
                    </div>
                    <div>
                      <label className="text-white/70 text-sm block mb-2">Yazı Boyutu</label>
                      <select 
                        value={yaziBoyu}
                        onChange={(e) => setYaziBoyu(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/10 text-white border border-white/10 focus:outline-none focus:border-[#395579] transition-all"
                      >
                        <option value="small" className="bg-[#1d2633]">Küçük</option>
                        <option value="medium" className="bg-[#1d2633]">Orta</option>
                        <option value="large" className="bg-[#1d2633]">Büyük</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Hesap Ayarları */}
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/10">
                  <h4 className="text-white mb-4 flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Hesap
                  </h4>
                  <div className="space-y-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDownloadData}
                      className="w-full flex items-center justify-between gap-3 bg-white/5 hover:bg-white/10 text-white px-4 py-3 rounded-xl transition-all border border-white/10"
                    >
                      <span className="text-sm">Verilerimi İndir</span>
                      <ChevronRight className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDeleteAccount}
                      className="w-full flex items-center justify-between gap-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-3 rounded-xl transition-all border border-red-500/30"
                    >
                      <span className="text-sm">Hesabımı Sil</span>
                      <ChevronRight className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSaveSettings}
                  className="w-full py-3 rounded-xl bg-gradient-to-br from-[#395579] to-[#4A6A8A] text-white hover:shadow-xl hover:shadow-[#395579]/30 transition-all"
                >
                  Kaydet ve Kapat
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profil Düzenleme Modal */}
      <AnimatePresence>
        {showProfilDuzenle && (
          <ProfilDuzenleSayfasi
            onClose={() => setShowProfilDuzenle(false)}
            onSave={handleProfilKaydet}
            initialData={{
              ad,
              bio,
              email,
              telefon,
              konum,
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
