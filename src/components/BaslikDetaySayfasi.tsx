import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, MessageSquare, Eye, Edit, ThumbsUp, Clock, User, Award, Share2, Bookmark, Flag, Send, CheckCircle, XCircle, AlertTriangle, MinusCircle, ThumbsDown, Lightbulb, Image, X as XIcon, Link as LinkIcon, Trash2, History, RotateCcw, Flame, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner@2.0.3";
import { BildirmeFormu } from "./BildirmeFormu";
import { PaylasmaModal } from "./PaylasmaModal";
import { YorumBildirmeModal } from "./YorumBildirmeModal";
import { BaslikDuzenleSayfasi } from "./BaslikDuzenleSayfasi";

interface Yorum {
  id: number;
  kullanici: string;
  kullaniciRol: string;
  icerik: string;
  tarih: string;
  begeni: number;
  avatar: string;
}

interface Version {
  id: number;
  icerik: string;
  baslik: string;
  duzenleyen: string;
  duzenleyenRol: string;
  tarih: string;
  degisiklikAciklamasi?: string;
}

interface Baslik {
  id: number;
  baslik: string;
  kategori: string;
  icerik: string;
  yazar: string;
  yazarRol: string;
  tarih: string;
  goruntulenme: number;
  duzenlemeSayisi: number;
  begeni: number;
  yorumlar: Yorum[];
  etiketler?: string[];
  versions?: Version[];
  trendYorumlar?: Yorum[];
}

interface BaslikDetaySayfasiProps {
  baslik: Baslik;
  onClose: () => void;
  highlightedCommentId?: number | null;
  onYorumEkle?: (baslikId: number, baslikBaslik: string, kategori: string, yorumMetni: string) => void;
  onYorumBegen?: (yorumId: number, yorum: any) => void;
  onBaslikKaydet?: (baslik: any) => void;
  kullaniciRolu?: string;
  isAdmin?: boolean;
  onBaslikDuzenle?: (baslikId: number, yeniBaslik: string, yeniIcerik: string, degisiklikAciklamasi: string, kullaniciRolu: string) => void;
  kullaniciAdi?: string;
  onCoinKazan?: (miktar: number) => void;
}

export function BaslikDetaySayfasi({ baslik, onClose, highlightedCommentId, onYorumEkle, onYorumBegen, onBaslikKaydet, kullaniciRolu = "Yeni Gelen", isAdmin = false, onBaslikDuzenle, kullaniciAdi = "Misafir", onCoinKazan }: BaslikDetaySayfasiProps) {
  const [yeniYorum, setYeniYorum] = useState("");
  const [begenilenYorumlar, setBegenilenYorumlar] = useState<number[]>([]);
  const [begenilmeyenYorumlar, setBegenilmeyenYorumlar] = useState<number[]>([]);
  const [mantikliYorumlar, setMantikliYorumlar] = useState<number[]>([]);
  const [baslikBegenildi, setBaslikBegenildi] = useState(false);
  const [baslikKaydedildi, setBaslikKaydedildi] = useState(false);
  const [baslikDegerlendirme, setBaslikDegerlendirme] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [linkUrl, setLinkUrl] = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<number | null>(null);
  const [showBildirmeFormu, setShowBildirmeFormu] = useState(false);
  const [showPaylasmaModal, setShowPaylasmaModal] = useState(false);
  const [bildirilenYorumlar, setBildirilenYorumlar] = useState<number[]>([]);
  const [showYorumBildirmeFormu, setShowYorumBildirmeFormu] = useState(false);
  const [bildirilenYorumBilgisi, setBildirilenYorumBilgisi] = useState<{id: number, icerik: string, kullanici: string} | null>(null);
  const [yerelYorumlar, setYerelYorumlar] = useState<Yorum[]>([]);
  const [yorumPaylasmaModal, setYorumPaylasmaModal] = useState(false);
  const [paylasimYorumBilgisi, setPaylasimYorumBilgisi] = useState<{baslik: string, icerik: string} | null>(null);
  const [showDuzenleSayfasi, setShowDuzenleSayfasi] = useState(false);
  const [duzenlenenYorum, setDuzenlenenYorum] = useState<number | null>(null);
  const [geciciYorumIcerik, setGeciciYorumIcerik] = useState<string>("");

  // Sayfa açıldığında en üste scroll et
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Rol bazlı yetkilendirme
  const rolSeviyeleri: Record<string, number> = {
    "Yeni Gelen": 1,
    "Seyyah": 2,
    "Gezgin": 3,
    "Kaşif Meraklısı": 4,
    "Konya Bilgesi": 5
  };

  const yorumYapabilirMi = () => {
    // Tüm kullanıcılar yorum yapabilir
    return true;
  };

  const gorselEkleyebilirMi = () => {
    const seviye = rolSeviyeleri[kullaniciRolu] || 0;
    return seviye >= 3; // Gezgin (3) ve üstü
  };

  const baslikDuzenleyebilirMi = () => {
    const seviye = rolSeviyeleri[kullaniciRolu] || 0;
    return seviye >= 2; // Seyyah (2) ve üstü
  };

  const handleYorumGonder = () => {
    if (yeniYorum.trim() || selectedImages.length > 0 || linkUrl) {
      // Yeni yorumu oluştur
      const yeniYorumObj: Yorum = {
        id: Date.now(), // Benzersiz ID
        kullanici: "Sen",
        kullaniciRol: kullaniciRolu,
        icerik: yeniYorum,
        tarih: "Şimdi",
        begeni: 0,
        avatar: ""
      };

      // Yerel yorumlar listesine ekle
      setYerelYorumlar([...yerelYorumlar, yeniYorumObj]);

      // Kullanıcının yorumunu merkezi state'e ekle
      if (onYorumEkle && yeniYorum.trim()) {
        onYorumEkle(baslik.id, baslik.baslik, baslik.kategori, yeniYorum);
      }
      
      // Özel coin kazanma bildirimi (+2 yorum yazma için)
      toast.success("🎉 Tebrikler! +2 Coin Kazandınız", {
        description: "Yorumunuz başarıyla gönderildi.",
        duration: 3000,
        style: {
          background: "linear-gradient(135deg, #cea273 0%, #fcedd3 100%)",
          border: "2px solid #cea273",
          color: "#102a6b",
        },
      });
      
      setYeniYorum("");
      setSelectedImages([]);
      setLinkUrl("");
      setShowLinkInput(false);
    }
  };

  const handleImageUpload = () => {
    if (!gorselEkleyebilirMi()) {
      toast.error("Görsel ekleme yetkiniz yok! 🔒", {
        description: `Görsel ekleyebilmek için en az "Gezgin" seviyesinde olmalısınız. Şu anki rolünüz: ${kullaniciRolu}.`,
        duration: 4000,
      });
      return;
    }
    
    // Mock image upload
    const mockImageUrl = `https://picsum.photos/seed/${Date.now()}/800/600`;
    setSelectedImages([...selectedImages, mockImageUrl]);
    toast.success("Görsel eklendi");
  };

  const removeImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
    toast.info("Görsel kaldırıldı");
  };

  const handleLinkAdd = () => {
    if (linkUrl.trim()) {
      toast.success("Link eklendi");
      setShowLinkInput(false);
    }
  };

  const handleYorumBegen = (yorumId: number) => {
    if (begenilenYorumlar.includes(yorumId)) {
      setBegenilenYorumlar(begenilenYorumlar.filter(id => id !== yorumId));
      toast.info("Beğeni geri alındı");
    } else {
      setBegenilenYorumlar([...begenilenYorumlar, yorumId]);
      setBegenilmeyenYorumlar(begenilmeyenYorumlar.filter(id => id !== yorumId));
      
      // Yorumu bul ve parent'a gönder
      const yorum = baslik.yorumlar.find((y: any) => y.id === yorumId);
      if (yorum && onYorumBegen) {
        onYorumBegen(yorumId, {
          id: yorum.id,
          baslikId: baslik.id,
          baslik: baslik.baslik,
          kategori: baslik.kategori,
          yorum: yorum.icerik,
          kullanici: yorum.kullanici,
          tarih: yorum.tarih,
          begeniSayisi: yorum.begeniSayisi
        });
      }
      
      // Coin kazandır
      if (onCoinKazan) {
        onCoinKazan(1);
      }
      
      // Coin kazanma bildirimi
      toast.success("🎉 Tebrikler! +1 Coin Kazandınız", {
        description: "Yorum beğenildi!",
        duration: 2500,
        style: {
          background: "linear-gradient(135deg, #cea273 0%, #fcedd3 100%)",
          border: "2px solid #cea273",
          color: "#102a6b",
        },
      });
    }
  };

  const handleYorumBegenmeme = (yorumId: number) => {
    if (begenilmeyenYorumlar.includes(yorumId)) {
      setBegenilmeyenYorumlar(begenilmeyenYorumlar.filter(id => id !== yorumId));
      toast.info("Beğenmeme geri alındı");
    } else {
      setBegenilmeyenYorumlar([...begenilmeyenYorumlar, yorumId]);
      setBegenilenYorumlar(begenilenYorumlar.filter(id => id !== yorumId));
      toast.error("Olumsuz oy verildi");
    }
  };

  const handleMantikliYorum = (yorumId: number) => {
    if (mantikliYorumlar.includes(yorumId)) {
      setMantikliYorumlar(mantikliYorumlar.filter(id => id !== yorumId));
      toast.info("Mantıklı işareti kaldırıldı");
    } else {
      setMantikliYorumlar([...mantikliYorumlar, yorumId]);
      
      // Coin kazandır
      if (onCoinKazan) {
        onCoinKazan(3);
      }
      
      // Coin kazanma bildirimi
      toast.success("🎉 Tebrikler! +3 Coin Kazandınız", {
        description: "Mantıklı yorum olarak işaretlendi!",
        duration: 2500,
        style: {
          background: "linear-gradient(135deg, #cea273 0%, #fcedd3 100%)",
          border: "2px solid #cea273",
          color: "#102a6b",
        },
      });
    }
  };

  const handleYorumBildir = (yorumId: number, yorumIcerik: string, yorumKullanici: string) => {
    // Daha önce bildirilmiş mi kontrol et
    if (bildirilenYorumlar.includes(yorumId)) {
      toast.info("Bu yorumu zaten bildirdiniz", {
        description: "Moderatörlerimiz inceleyecektir.",
        duration: 3000,
      });
      return;
    }

    // Bildirilecek yorumun bilgilerini kaydet ve formu aç
    setBildirilenYorumBilgisi({ id: yorumId, icerik: yorumIcerik, kullanici: yorumKullanici });
    setShowYorumBildirmeFormu(true);
  };

  const handleYorumBildirmeGonder = (neden: string, aciklama: string) => {
    if (bildirilenYorumBilgisi) {
      // Bildirimi kaydet
      setBildirilenYorumlar(prev => [...prev, bildirilenYorumBilgisi.id]);

      // Admin paneline bildirim gönder (simulasyon)
      console.log("Yorum Bildirimi:", {
        yorumId: bildirilenYorumBilgisi.id,
        yorumIcerik: bildirilenYorumBilgisi.icerik,
        yorumKullanici: bildirilenYorumBilgisi.kullanici,
        bildirimNedeni: neden,
        bildirimAciklama: aciklama,
        bildirenKullanici: kullaniciRolu,
        tarih: new Date().toISOString(),
        baslikId: baslik.id,
        baslikBaslik: baslik.baslik,
      });

      // Başarılı bildirim mesajı
      toast.success("Yorum bildirildi", {
        description: "Moderatör ekibimiz en kısa sürede inceleyecektir. Teşekkürler!",
        duration: 4000,
        style: {
          background: "linear-gradient(135deg, #015185 0%, #5990c0 100%)",
          border: "2px solid #015185",
          color: "white",
        },
      });

      // Formu kapat ve bilgileri sıfırla
      setShowYorumBildirmeFormu(false);
      setBildirilenYorumBilgisi(null);
    }
  };

  // Yorum düzenleme fonksiyonları (Admin için)
  const handleYorumDuzenleBasla = (yorumId: number, mevcutIcerik: string) => {
    setDuzenlenenYorum(yorumId);
    setGeciciYorumIcerik(mevcutIcerik);
  };

  const handleYorumDuzenleKaydet = (yorumId: number) => {
    if (geciciYorumIcerik.trim()) {
      // Yerel yorumları güncelle
      setYerelYorumlar(prev => 
        prev.map(y => y.id === yorumId ? { ...y, icerik: geciciYorumIcerik.trim() } : y)
      );
      
      toast.success("Yorum başarıyla güncellendi! ✏️", {
        duration: 2000,
        style: {
          background: "linear-gradient(135deg, #2A4461 0%, #395579 100%)",
          color: "white",
        },
      });
      
      setDuzenlenenYorum(null);
      setGeciciYorumIcerik("");
    }
  };

  const handleYorumDuzenleIptal = () => {
    setDuzenlenenYorum(null);
    setGeciciYorumIcerik("");
  };

  const handleBaslikDegerlendirme = (tip: string) => {
    if (baslikDegerlendirme === tip) {
      setBaslikDegerlendirme(null);
      toast.info("Değerlendirme geri alındı");
    } else {
      setBaslikDegerlendirme(tip);
      const mesajlar: Record<string, string> = {
        yararli: "Yararlı olarak işaretledin",
        yararsiz: "Yararsız olarak işaretledin",
        tarafli: "Taraflı olarak işaretledin",
        eksik: "Eksik olarak işaretledin"
      };
      
      // Her değerlendirme tipi için farklı renkte bildirim
      if (tip === "yararli") {
        toast.success(mesajlar[tip]);
      } else if (tip === "yararsiz") {
        toast.error(mesajlar[tip]);
      } else if (tip === "tarafli") {
        toast(mesajlar[tip], {
          style: {
            background: '#f59e0b',
            color: 'white',
          },
        });
      } else if (tip === "eksik") {
        toast(mesajlar[tip], {
          style: {
            background: '#9333ea',
            color: 'white',
          },
        });
      }
    }
  };

  const handleBaslikBegen = () => {
    const yeniDurum = !baslikBegenildi;
    setBaslikBegenildi(yeniDurum);
    
    if (yeniDurum) {
      // Coin kazandır
      if (onCoinKazan) {
        onCoinKazan(2);
      }
      
      // Beğeni eklendiğinde coin kazandır
      toast.success("🎉 Tebrikler! +2 Coin Kazandınız", {
        description: "Başlık beğenildi!",
        duration: 2500,
        style: {
          background: "linear-gradient(135deg, #cea273 0%, #fcedd3 100%)",
          border: "2px solid #cea273",
          color: "#102a6b",
        },
      });
    } else {
      toast.success("Beğeni geri alındı");
    }
  };

  const handleKaydet = () => {
    const yeniDurum = !baslikKaydedildi;
    setBaslikKaydedildi(yeniDurum);
    
    if (yeniDurum && onBaslikKaydet) {
      // Başlığı kaydet
      onBaslikKaydet({
        id: baslik.id,
        baslik: baslik.baslik,
        kategori: baslik.kategori,
        yazar: baslik.yazar,
        tarih: baslik.tarih,
        goruntulenme: baslik.goruntulenme,
        yorumSayisi: baslik.yorumlar.length
      });
    }
    
    toast.success(baslikKaydedildi ? "Kayıtlardan çıkarıldı" : "Başlık kayıt edildi!");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-[#5A7A9A]/20 via-white to-neutral-50 dark:from-[#0a1835] dark:via-[#102a6b] dark:to-[#0d2350]"
    >
      {/* Header */}
      <div className="bg-white dark:bg-gradient-to-r dark:from-[#2A4461] dark:to-[#395579] border-b border-neutral-200 dark:border-[#4A6A8A]/30 shadow-sm sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="p-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-[#4A6A8A]/50 transition-colors flex items-center gap-2 text-[#395579] dark:text-white"
            >
              <ArrowLeft className="h-6 w-6" />
              <span className="hidden md:inline">{baslik.kategori}</span>
            </motion.button>

            <div className="flex-1">
              <h1 className="text-xl md:text-2xl text-[#395579] dark:text-white line-clamp-1">{baslik.baslik}</h1>
            </div>

            {/* Düzenleme Butonu */}
            {baslikDuzenleyebilirMi() && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  toast.success("Düzenleme sayfası açılıyor...", {
                    description: "Başlık içeriğini düzenleyebilirsiniz.",
                    duration: 3000,
                  });
                  setShowDuzenleSayfasi(true);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#395579] to-[#4A6A8A] text-white shadow-md hover:shadow-lg transition-all"
              >
                <Edit className="h-4 w-4" />
                <span className="hidden md:inline">Düzenle</span>
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Post Content */}
            <div className="bg-white dark:bg-gradient-to-br dark:from-[#2A4461] dark:to-[#395579] rounded-3xl shadow-lg border border-neutral-200 dark:border-[#4A6A8A]/30 p-6 md:p-8">
              {/* Author Info */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-neutral-200 dark:border-[#4A6A8A]/30">
                <div className="w-14 h-14 rounded-full shadow-md flex items-center justify-center text-white text-xl bg-[#395579]">
                  {baslik.yazar.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-neutral-900 dark:text-white">{baslik.yazar}</h3>
                    <span className="px-3 py-1 rounded-lg text-xs text-white bg-[#395579]">
                      {baslik.yazarRol}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-300 mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {baslik.tarih}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" />
                      {baslik.goruntulenme}
                    </span>
                    {baslik.duzenlemeSayisi > 0 && (
                      <span className="flex items-center gap-1">
                        <Edit className="h-3.5 w-3.5" />
                        {baslik.duzenlemeSayisi} düzenleme
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p className="text-neutral-700 dark:text-neutral-200 leading-relaxed whitespace-pre-wrap">{baslik.icerik}</p>
              </div>

              {/* Tags */}
              {baslik.etiketler && baslik.etiketler.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-neutral-200 dark:border-[#4A6A8A]/30">
                  {baslik.etiketler.map((etiket, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-[#395579]/10 text-[#395579] dark:bg-[#4A6A8A]/20 dark:text-neutral-200 rounded-lg text-sm border border-[#395579]/20 dark:border-[#4A6A8A]/30"
                    >
                      #{etiket}
                    </span>
                  ))}
                </div>
              )}

              {/* Version History Button */}
              {baslik.duzenlemeSayisi > 0 && (
                <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-[#1e4a7a]">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowVersionHistory(!showVersionHistory)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#cea273]/10 to-[#5990c0]/10 dark:from-[#015185]/20 dark:to-[#102a6b]/20 text-[#102a6b] dark:text-[#e8f0ff] hover:from-[#cea273]/20 hover:to-[#5990c0]/20 transition-all border border-[#cea273]/30 dark:border-[#5990c0]/30"
                  >
                    <History className="h-4 w-4" />
                    <span>Sürüm Geçmişi ({baslik.duzenlemeSayisi} düzenleme)</span>
                  </motion.button>
                </div>
              )}

              {/* Evaluation Buttons - Desktop */}
              <div className="hidden md:block mt-6 pt-6 border-t border-neutral-100 dark:border-[#1e4a7a]">
                <p className="text-sm text-neutral-600 dark:text-[#9fb5d4] mb-3">Bu içeriği nasıl değerlendirirsin?</p>
                <div className="flex flex-wrap gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleBaslikDegerlendirme("yararli")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                      baslikDegerlendirme === "yararli" ? 'bg-[#5990c0] text-white' : 'bg-neutral-100 dark:bg-[#0a1835] text-neutral-700 dark:text-[#e8f0ff] hover:bg-neutral-200 dark:hover:bg-[#015185]/50'
                    }`}
                  >
                    <CheckCircle className="h-4 w-4" />
                    Yararlı
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleBaslikDegerlendirme("yararsiz")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                      baslikDegerlendirme === "yararsiz" ? 'bg-[#cea273] dark:bg-[#015185] text-white' : 'bg-neutral-100 dark:bg-[#0a1835] text-neutral-700 dark:text-[#e8f0ff] hover:bg-neutral-200 dark:hover:bg-[#015185]/50'
                    }`}
                  >
                    <XCircle className="h-4 w-4" />
                    Yararsız
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleBaslikDegerlendirme("tarafli")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                      baslikDegerlendirme === "tarafli" ? 'bg-[#015185] text-white' : 'bg-neutral-100 dark:bg-[#0a1835] text-neutral-700 dark:text-[#e8f0ff] hover:bg-neutral-200 dark:hover:bg-[#015185]/50'
                    }`}
                  >
                    <AlertTriangle className="h-4 w-4" />
                    Taraflı
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleBaslikDegerlendirme("eksik")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                      baslikDegerlendirme === "eksik" ? 'bg-[#102a6b] text-white' : 'bg-neutral-100 dark:bg-[#0a1835] text-neutral-700 dark:text-[#e8f0ff] hover:bg-neutral-200 dark:hover:bg-[#015185]/50'
                    }`}
                  >
                    <MinusCircle className="h-4 w-4" />
                    Eksik
                  </motion.button>
                </div>
              </div>

              {/* Action Buttons - Mobile */}
              <div className="md:hidden mt-6 pt-6 border-t border-neutral-100 dark:border-[#1e4a7a] space-y-3">
                <p className="text-sm text-neutral-600 dark:text-[#9fb5d4]">Bu içeriği nasıl değerlendirirsin?</p>
                <div className="grid grid-cols-2 gap-2">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleBaslikDegerlendirme("yararli")}
                    className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl transition-all text-sm ${
                      baslikDegerlendirme === "yararli" ? 'bg-[#5990c0] text-white' : 'bg-neutral-100 dark:bg-[#0a1835] text-neutral-700 dark:text-[#e8f0ff]'
                    }`}
                  >
                    <CheckCircle className="h-4 w-4" />
                    Yararlı
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleBaslikDegerlendirme("yararsiz")}
                    className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl transition-all text-sm ${
                      baslikDegerlendirme === "yararsiz" ? 'bg-[#cea273] dark:bg-[#015185] text-white' : 'bg-neutral-100 dark:bg-[#0a1835] text-neutral-700 dark:text-[#e8f0ff]'
                    }`}
                  >
                    <XCircle className="h-4 w-4" />
                    Yararsız
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleBaslikDegerlendirme("tarafli")}
                    className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl transition-all text-sm ${
                      baslikDegerlendirme === "tarafli" ? 'bg-[#015185] text-white' : 'bg-neutral-100 dark:bg-[#0a1835] text-neutral-700 dark:text-[#e8f0ff]'
                    }`}
                  >
                    <AlertTriangle className="h-4 w-4" />
                    Taraflı
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleBaslikDegerlendirme("eksik")}
                    className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl transition-all text-sm ${
                      baslikDegerlendirme === "eksik" ? 'bg-[#102a6b] text-white' : 'bg-neutral-100 dark:bg-[#0a1835] text-neutral-700 dark:text-[#e8f0ff]'
                    }`}
                  >
                    <MinusCircle className="h-4 w-4" />
                    Eksik
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Version History Section */}
            <AnimatePresence>
              {showVersionHistory && (
                <motion.div
                  initial={{ y: 20, opacity: 0, height: 0 }}
                  animate={{ y: 0, opacity: 1, height: "auto" }}
                  exit={{ y: 20, opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gradient-to-br dark:from-[#0d2350] dark:to-[#102a6b] rounded-3xl shadow-sm dark:shadow-xl dark:shadow-[#5990c0]/10 p-6 md:p-8 border border-neutral-100 dark:border-[#1e4a7a] overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <History className="h-5 w-5 text-[#cea273]" />
                      <h2 className="text-xl text-[#102a6b] dark:text-[#e8f0ff]">Sürüm Geçmişi</h2>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setShowVersionHistory(false);
                        setSelectedVersion(null);
                      }}
                      className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-[#015185]/50 transition-colors"
                    >
                      <XIcon className="h-5 w-5 text-neutral-600 dark:text-[#9fb5d4]" />
                    </motion.button>
                  </div>

                  <div className="space-y-4">
                    {/* Mevcut Sürüm */}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="p-4 rounded-xl bg-gradient-to-r from-[#5990c0]/10 to-[#cea273]/10 dark:from-[#015185]/20 dark:to-[#102a6b]/20 border-2 border-[#5990c0] dark:border-[#5990c0]/50"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-1 bg-[#5990c0] text-white text-xs rounded-lg">Güncel Sürüm</span>
                            <span className="text-sm text-neutral-600 dark:text-[#9fb5d4]">{baslik.tarih}</span>
                          </div>
                          <p className="text-sm text-[#102a6b] dark:text-[#e8f0ff]">
                            <span className="font-medium">{baslik.yazar}</span> ({baslik.yazarRol})
                          </p>
                        </div>
                      </div>
                      <div className="bg-white/50 dark:bg-[#0a1835]/50 rounded-lg p-3 mb-2">
                        <p className="text-sm text-neutral-700 dark:text-[#c8daf0]">{baslik.icerik.substring(0, 200)}...</p>
                      </div>
                    </motion.div>

                    {/* Önceki Sürümler */}
                    {baslik.versions && baslik.versions.length > 0 ? (
                      baslik.versions.map((version, index) => (
                        <motion.div
                          key={version.id}
                          whileHover={{ scale: 1.01 }}
                          className={`p-4 rounded-xl border transition-all ${
                            selectedVersion === version.id
                              ? 'bg-gradient-to-r from-[#cea273]/20 to-[#fcedd3]/20 dark:from-[#cea273]/10 dark:to-[#102a6b]/20 border-[#cea273] dark:border-[#cea273]/50'
                              : 'bg-neutral-50 dark:bg-[#0a1835]/30 border-neutral-200 dark:border-[#1e4a7a]'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm text-neutral-600 dark:text-[#9fb5d4]">Sürüm #{baslik.versions.length - index}</span>
                                <span className="text-sm text-neutral-600 dark:text-[#9fb5d4]">{version.tarih}</span>
                              </div>
                              <p className="text-sm text-[#102a6b] dark:text-[#e8f0ff] mb-1">
                                <span className="font-medium">{version.duzenleyen}</span> ({version.duzenleyenRol})
                              </p>
                              {version.degisiklikAciklamasi && (
                                <p className="text-xs text-neutral-600 dark:text-[#9fb5d4] italic mt-1">
                                  "{version.degisiklikAciklamasi}"
                                </p>
                              )}
                            </div>
                            {(isAdmin || kullaniciRolu === "Konya Bilgesi" || kullaniciRolu === "Kaşif Meraklısı") && (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                  toast.success("Sürüm geri yüklendi!", {
                                    description: `${version.tarih} tarihli sürüme geri dönüldü.`,
                                  });
                                  setSelectedVersion(version.id);
                                }}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#cea273] dark:bg-[#015185] hover:bg-[#cea273]/80 dark:hover:bg-[#5990c0] text-white text-sm transition-colors"
                              >
                                <RotateCcw className="h-3.5 w-3.5" />
                                Geri Yükle
                              </motion.button>
                            )}
                          </div>
                          <div className="bg-white/50 dark:bg-[#0a1835]/50 rounded-lg p-3">
                            <p className="text-sm text-neutral-700 dark:text-[#c8daf0]">{version.icerik.substring(0, 200)}...</p>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-neutral-500 dark:text-[#9fb5d4]">
                        <History className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p>Henüz önceki sürüm bulunmuyor</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-[#1e4a7a]">
                    <div className="bg-gradient-to-r from-[#5990c0]/10 to-[#cea273]/10 dark:from-[#015185]/10 dark:to-[#102a6b]/10 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="h-5 w-5 text-[#cea273] dark:text-[#5990c0] mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-neutral-700 dark:text-[#c8daf0]">
                          <p className="font-medium text-[#102a6b] dark:text-[#e8f0ff] mb-1">Sürüm Geçmişi Bilgisi</p>
                          <p>Her düzenleme otomatik olarak kaydedilir ve geçmiş sürümlere geri dönülebilir. Kaşif Meraklısı, Konya Bilgesi ve Admin kullanıcıları sürümleri geri yükleyebilir.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Comments Section */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gradient-to-br dark:from-[#2A4461] dark:to-[#395579] rounded-3xl shadow-lg border border-neutral-200 dark:border-[#4A6A8A]/30 p-6 md:p-8"
            >
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="h-5 w-5 text-[#395579] dark:text-neutral-200" />
                <h2 className="text-xl text-[#395579] dark:text-white">Yorumlar ({(baslik.yorumlar?.length || 0) + (baslik.trendYorumlar?.length || 0)})</h2>
              </div>

              {/* Comment Input */}
              <div className="mb-6 pb-6 border-b border-neutral-200 dark:border-[#4A6A8A]/30">
                <textarea
                  value={yeniYorum}
                  onChange={(e) => setYeniYorum(e.target.value)}
                  placeholder="Yorumunuzu yazın..."
                  className="w-full p-4 rounded-xl border-2 border-neutral-200 dark:border-[#4A6A8A]/30 dark:bg-[#2A4461]/50 dark:text-white focus:border-[#395579] dark:focus:border-[#5A7A9A] focus:outline-none resize-none"
                  rows={3}
                  style={{ fontFamily: 'inherit' }}
                />

                {/* Image/Link buttons */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleImageUpload}
                      className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-[#4A6A8A]/50 transition-colors"
                      title={gorselEkleyebilirMi() ? "Görsel ekle" : "Görsel eklemek için Gezgin seviyesine ulaşmalısınız"}
                    >
                      <Image className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowLinkInput(!showLinkInput)}
                      className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-[#4A6A8A]/50 transition-colors"
                    >
                      <LinkIcon className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
                    </motion.button>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleYorumGonder}
                    disabled={!yeniYorum.trim() && selectedImages.length === 0 && !linkUrl}
                    className="flex items-center gap-2 px-6 py-2 rounded-xl text-white bg-[#395579] hover:bg-[#4A6A8A] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-4 w-4" />
                    Gönder
                  </motion.button>
                </div>

                {/* Link Input */}
                {showLinkInput && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 p-4 rounded-xl bg-neutral-50 border border-neutral-200"
                  >
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        placeholder="https://example.com"
                        className="flex-1 px-4 py-2 rounded-lg border border-neutral-300 focus:border-[#015185] focus:outline-none"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleLinkAdd}
                        className="px-4 py-2 rounded-lg text-white"
                        style={{ background: '#015185' }}
                      >
                        Ekle
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Link Preview */}
                {linkUrl && !showLinkInput && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 p-3 rounded-xl bg-gradient-to-r from-[#015185]/10 to-[#5990c0]/10 border border-[#015185]/30 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <LinkIcon className="h-4 w-4 text-[#015185] shrink-0" />
                      <span className="text-sm text-[#102a6b] truncate">{linkUrl}</span>
                    </div>
                    <button
                      onClick={() => setLinkUrl("")}
                      className="p-1 hover:bg-white/50 rounded-lg transition-colors shrink-0"
                    >
                      <XIcon className="h-4 w-4 text-neutral-600" />
                    </button>
                  </motion.div>
                )}

                {/* Image Previews */}
                {selectedImages.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2">
                    {selectedImages.map((img, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative group rounded-xl overflow-hidden border-2 border-neutral-200"
                      >
                        <img
                          src={img}
                          alt={`Upload ${idx + 1}`}
                          className="w-full h-32 object-cover"
                        />
                        <button
                          onClick={() => removeImage(idx)}
                          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <XIcon className="h-4 w-4" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {[...(baslik.trendYorumlar || []), ...(baslik.yorumlar || []), ...yerelYorumlar].map((yorum, index) => {
                  const isHighlighted = highlightedCommentId === yorum.id;
                  const isTrendYorum = baslik.trendYorumlar?.some(ty => ty.id === yorum.id);
                  
                  const handleYorumDoubleClick = (e: React.MouseEvent) => {
                    e.stopPropagation();
                    if (!begenilenYorumlar.includes(yorum.id)) {
                      handleYorumBegen(yorum.id);
                    }
                  };
                  
                  return (
                  <motion.div
                    key={yorum.id}
                    id={`comment-${yorum.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onDoubleClick={handleYorumDoubleClick}
                    className={`p-6 rounded-2xl border transition-all ${
                      isHighlighted 
                        ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-300 dark:border-orange-500 shadow-md' 
                        : isTrendYorum
                        ? 'bg-amber-50 dark:bg-[#2A4461]/50 border-amber-200 dark:border-orange-500/30'
                        : 'bg-white dark:bg-[#2A4461]/30 border-neutral-200 dark:border-[#4A6A8A]/30 hover:border-[#395579]/30 hover:shadow-sm'
                    }`}
                    {...(isHighlighted && {
                      onAnimationComplete: () => {
                        setTimeout(() => {
                          const element = document.getElementById(`comment-${yorum.id}`);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          }
                        }, 300);
                      }
                    })}
                  >
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white bg-[#7B99B3] dark:bg-[#4A6A8A]">
                        {yorum.kullanici.charAt(0).toUpperCase()}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                          <div className="flex items-center gap-2 flex-wrap">
                            {isTrendYorum && (
                              <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-xs bg-gradient-to-r from-orange-500 to-amber-500 text-white">
                                <Flame className="h-3 w-3" />
                                TREND
                              </span>
                            )}
                            <span className="text-neutral-900 dark:text-white">{yorum.kullanici}</span>
                            <span className="px-2.5 py-0.5 rounded-md text-xs text-white bg-[#5A7A9A] dark:bg-[#4A6A8A]">
                              {yorum.kullaniciRol}
                            </span>
                            <span className="text-xs text-neutral-500 dark:text-neutral-400">• {yorum.tarih}</span>
                          </div>
                          {isAdmin && duzenlenenYorum !== yorum.id && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleYorumDuzenleBasla(yorum.id, yorum.icerik);
                              }}
                              className="p-1.5 rounded-lg hover:bg-[#395579]/10 dark:hover:bg-[#395579]/20 transition-colors"
                            >
                              <Edit className="w-4 h-4 text-[#395579] dark:text-[#7B99B3]" />
                            </button>
                          )}
                        </div>
                        
                        {duzenlenenYorum === yorum.id ? (
                          <div className="mb-4 space-y-3">
                            <textarea
                              value={geciciYorumIcerik}
                              onChange={(e) => setGeciciYorumIcerik(e.target.value)}
                              rows={4}
                              className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-neutral-900/50 border-2 border-[#395579]/30 dark:border-[#395579]/40 text-neutral-700 dark:text-neutral-200 focus:border-[#395579] focus:outline-none transition-all resize-none"
                              placeholder="Yorum içeriğini düzenleyin..."
                            />
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleYorumDuzenleKaydet(yorum.id);
                                }}
                                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-br from-[#2A4461] via-[#395579] to-[#4A6A8A] text-white hover:shadow-lg transition-all text-sm"
                              >
                                <Save className="w-4 h-4" />
                                Kaydet
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleYorumDuzenleIptal();
                                }}
                                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border-2 border-neutral-400 dark:border-neutral-600 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all text-sm"
                              >
                                <XIcon className="w-4 h-4" />
                                İptal
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed">{yorum.icerik}</p>
                        )}
                        
                        <div className="flex items-center gap-2 flex-wrap">
                          <button
                            onClick={() => handleYorumBegen(yorum.id)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all ${
                              begenilenYorumlar.includes(yorum.id) 
                                ? 'bg-[#395579] text-white' 
                                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-[#4A6A8A]/30'
                            }`}
                          >
                            <ThumbsUp className="h-4 w-4" />
                            Beğen
                          </button>
                          
                          <button
                            onClick={() => handleYorumBegenmeme(yorum.id)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all ${
                              begenilmeyenYorumlar.includes(yorum.id) 
                                ? 'bg-neutral-500 text-white' 
                                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-[#4A6A8A]/30'
                            }`}
                          >
                            <ThumbsDown className="h-4 w-4" />
                            Beğenme
                          </button>
                          
                          <button
                            onClick={() => handleMantikliYorum(yorum.id)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all ${
                              mantikliYorumlar.includes(yorum.id) 
                                ? 'bg-[#4A6A8A] text-white' 
                                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-[#4A6A8A]/30'
                            }`}
                          >
                            <Lightbulb className="h-4 w-4" />
                            Mantıklı
                          </button>
                          
                          <button
                            onClick={() => {
                              setPaylasimYorumBilgisi({
                                baslik: `${yorum.kullanici} - ${baslik.baslik}`,
                                icerik: yorum.icerik
                              });
                              setYorumPaylasmaModal(true);
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-[#4A6A8A]/30"
                          >
                            <Share2 className="h-4 w-4" />
                            Paylaş
                          </button>
                          
                          <button
                            onClick={() => handleYorumBildir(yorum.id, yorum.icerik, yorum.kullanici)}
                            disabled={bildirilenYorumlar.includes(yorum.id)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all ${
                              bildirilenYorumlar.includes(yorum.id)
                                ? 'text-neutral-400 dark:text-neutral-600 cursor-not-allowed bg-neutral-100 dark:bg-neutral-800'
                                : 'text-neutral-600 dark:text-neutral-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600'
                            }`}
                          >
                            <Flag className="h-4 w-4" />
                            Bildir
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
                })}
              </div>

              {/* Empty State */}
              {baslik.yorumlar.length === 0 && (
                <div className="text-center py-12">
                  <div className="inline-flex p-6 rounded-full bg-neutral-100 mb-4">
                    <MessageSquare className="h-12 w-12 text-neutral-400" />
                  </div>
                  <p className="text-neutral-600">Henüz yorum yapılmamış</p>
                  <p className="text-sm text-neutral-500 mt-2">İlk yorumu sen yap!</p>
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="hidden lg:block space-y-4"
          >
            {/* Action Buttons */}
            <div className="bg-white dark:bg-gradient-to-br dark:from-[#0d2350] dark:to-[#102a6b] rounded-2xl shadow-sm dark:shadow-xl dark:shadow-[#5990c0]/10 p-6 border border-neutral-100 dark:border-[#1e4a7a] space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBaslikBegen}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all ${
                  baslikBegenildi ? 'text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
                style={baslikBegenildi ? { background: '#5990c0' } : {}}
              >
                <ThumbsUp className={`h-5 w-5 ${baslikBegenildi ? 'fill-current' : ''}`} />
                {baslikBegenildi ? 'Beğenildi' : 'Beğen'}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleKaydet}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all ${
                  baslikKaydedildi ? 'text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
                style={baslikKaydedildi ? { background: '#cea273' } : {}}
              >
                <Bookmark className={`h-5 w-5 ${baslikKaydedildi ? 'fill-current' : ''}`} />
                {baslikKaydedildi ? 'Kaydedildi' : 'Kaydet'}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowPaylasmaModal(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-neutral-100 dark:bg-[#0d2350] text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-[#102a6b] transition-all"
              >
                <Share2 className="h-5 w-5" />
                Paylaş
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowBildirmeFormu(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-neutral-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all"
              >
                <Flag className="h-5 w-5" />
                Bildir
              </motion.button>
            </div>

            {/* Stats */}
            <div className="bg-white dark:bg-gradient-to-br dark:from-[#0d2350] dark:to-[#102a6b] rounded-2xl shadow-sm dark:shadow-xl dark:shadow-[#5990c0]/10 p-6 border border-neutral-100 dark:border-[#1e4a7a]">
              <h3 className="text-sm text-neutral-600 dark:text-[#9fb5d4] mb-4">İstatistikler</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600 dark:text-[#9fb5d4]">Görüntülenme</span>
                  <span className="text-[#102a6b] dark:text-[#e8f0ff]">{baslik.goruntulenme}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600 dark:text-[#9fb5d4]">Yorum</span>
                  <span className="text-[#102a6b] dark:text-[#e8f0ff]">{baslik.yorumlar.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600 dark:text-[#9fb5d4]">Beğeni</span>
                  <span className="text-[#102a6b] dark:text-[#e8f0ff]">{baslik.begeni}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bildirime Formu Modal */}
      <AnimatePresence>
        {showBildirmeFormu && (
          <BildirmeFormu
            onClose={() => setShowBildirmeFormu(false)}
            baslikAdi={baslik.baslik}
          />
        )}
      </AnimatePresence>

      {/* Paylaşma Modal */}
      <AnimatePresence>
        {showPaylasmaModal && (
          <PaylasmaModal
            onClose={() => setShowPaylasmaModal(false)}
            baslikAdi={baslik.baslik}
          />
        )}
      </AnimatePresence>

      {/* Yorum Bildirme Modal */}
      <AnimatePresence>
        {showYorumBildirmeFormu && bildirilenYorumBilgisi && (
          <YorumBildirmeModal
            onClose={() => {
              setShowYorumBildirmeFormu(false);
              setBildirilenYorumBilgisi(null);
            }}
            onGonder={handleYorumBildirmeGonder}
            yorumIcerik={bildirilenYorumBilgisi.icerik}
            yorumKullanici={bildirilenYorumBilgisi.kullanici}
          />
        )}
      </AnimatePresence>

      {/* Yorum Paylaşma Modal */}
      <AnimatePresence>
        {yorumPaylasmaModal && paylasimYorumBilgisi && (
          <PaylasmaModal
            onClose={() => {
              setYorumPaylasmaModal(false);
              setPaylasimYorumBilgisi(null);
            }}
            baslikAdi={paylasimYorumBilgisi.baslik}
          />
        )}
      </AnimatePresence>

      {/* Düzenleme Sayfası */}
      <AnimatePresence>
        {showDuzenleSayfasi && (
          <BaslikDuzenleSayfasi
            onClose={() => setShowDuzenleSayfasi(false)}
            baslik={baslik}
            onDuzenle={onBaslikDuzenle}
            kullaniciRolu={kullaniciRolu}
            kullaniciAdi={kullaniciAdi}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}