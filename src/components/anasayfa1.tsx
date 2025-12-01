import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Home,
  Search,
  Bell,
  User,
  Plus,
  TrendingUp,
  Trophy,
  Settings,
  LogOut,
  X,
  Bookmark,
  Eye,
  MessageSquare,
  ThumbsUp,
  Calendar,
  MapPin,
  Users,
  ChevronDown,
  Filter,
  Flame,
  Clock,
  Send,
  Shield,
  Star,
  Coins,
  Sparkles,
  Award,
  Share2,
  Menu,
  Activity,
  FileText,
  Edit,
  BookOpen,
  CalendarDays,
  Heart,
  Save,
  Mail,
  Phone,
  Globe,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Linkedin,
  HelpCircle,
  FileQuestion,
  Scale,
  BadgeCheck,
  Crown,
  Gem,
  Zap,
  Target,
  Rocket,
  GraduationCap,
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { BaslikDetaySayfasi } from "./BaslikDetaySayfasi";
import { EtkinlikDetaySayfasi } from "./EtkinlikDetaySayfasi";
import { Leaderboard } from "./Leaderboard";
import { PaylasmaModal } from "./PaylasmaModal";
import { KullaniciProfilSayfasi } from "./KullaniciProfilSayfasi";
import { ProfilSayfasi } from "./ProfilSayfasi";
import { AyarlarSayfasi } from "./AyarlarSayfasi";
import { YeniBaslikSayfasi } from "./YeniBaslikSayfasi";
import { BildirimPaneli } from "./BildirimPaneli";
import { TumuSayfasi } from "./TumuSayfasi";
import { AkademikDestekSayfasi } from "./AkademikDestekSayfasi";
import { SosyalYasamSayfasi } from "./SosyalYasamSayfasi";
import { KesifRehberiSayfasi } from "./KesifRehberiSayfasi";
import { KariyerSayfasi } from "./KariyerSayfasi";
import { EtkinliklerSayfasi } from "./EtkinliklerSayfasi";
import { DigerSayfasi } from "./DigerSayfasi";

interface Anasayfa1Props {
  isAdmin: boolean;
  onCikis: () => void;
  onAdminPaneline?: () => void;
  initialKullaniciBilgileri?: {
    ad: string;
    rol: string;
    coins: number;
    avatar: string;
    baslikSayisi: number;
    yorumSayisi: number;
    goruntulemeSayisi: number;
    begeniSayisi: number;
  };
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
  versions?: any[];
  trendYorumlar?: Yorum[];
}

interface Yorum {
  id: number;
  kullanici: string;
  kullaniciRol: string;
  icerik: string;
  tarih: string;
  begeni: number;
  avatar: string;
}

interface Etkinlik {
  id: number;
  baslik: string;
  aciklama: string;
  detay: string;
  tarih: string;
  saat: string;
  konum: string;
  konumDetay: string;
  kategori: string;
  organizator: string;
  katilimciSayisi: number;
  maxKatilimci?: number;
  ucret: string;
  kapakGorseli: string;
  etiketler?: string[];
  isSocialResponsibility?: boolean;
  iletisim?: {
    telefon?: string;
    email?: string;
    instagram?: string;
    twitter?: string;
  };
}

type Sayfa = "anasayfa" | "profil" | "ayarlar" | "yeniBaslik" | "tumu" | "akademik" | "sosyal" | "kesif" | "kariyer" | "etkinlik" | "diger";

const kategoriler = [
  { id: "tumu", isim: "Tümü", icon: Home, renk: "from-[#1d2633] to-[#28374a]" },
  { id: "akademik", isim: "Akademik Destek", icon: Award, renk: "from-[#1d2633] to-[#28374a]" },
  { id: "sosyal", isim: "Sosyal Yaşam", icon: Users, renk: "from-[#1d2633] to-[#28374a]" },
  { id: "kesif", isim: "Keşif Rehberi", icon: MapPin, renk: "from-[#1d2633] to-[#28374a]" },
  { id: "kariyer", isim: "Kariyer", icon: TrendingUp, renk: "from-[#1d2633] to-[#28374a]" },
  { id: "etkinlik", isim: "Etkinlikler", icon: Calendar, renk: "from-[#1d2633] to-[#28374a]" },
  { id: "diger", isim: "Diğer", icon: Sparkles, renk: "from-[#1d2633] to-[#28374a]" },
];

// Kategori bilgileri ve hashtag'leri
const kategoriBilgileri: Record<string, { aciklama: string; hashtags: string[] }> = {
  tumu: {
    aciklama: "Konya'daki öğrenci hayatıyla ilgili tüm içerikleri burada bulabilirsiniz. Akademik destek, sosyal aktiviteler, keşif rehberleri ve daha fazlası!",
    hashtags: ["#tümü", "#yeni", "#popüler", "#gündem", "#tartışmalı"]
  },
  akademik: {
    aciklama: "Ders çalışma, sınav hazırlığı, proje paylaşımı ve akademik başarı için ihtiyacınız olan tüm destek burada. Kütüphane bilgileri, ders notları ve çalışma ipuçları!",
    hashtags: ["#kütüphane", "#final", "#çalışma", "#sınav", "#proje", "#ders", "#ödev", "#wifi"]
  },
  sosyal: {
    aciklama: "Kampüs hayatının sosyal yönünü keşfedin! Kafeler, restoranlar, hobiler ve arkadaşlıklar. Konya'da öğrenci olmanın tadını çıkarın!",
    hashtags: ["#kafe", "#yemek", "#kantin", "#eğlence", "#hobi", "#arkadaşlık", "#market", "#24saat"]
  },
  kesif: {
    aciklama: "Konya'nın gizli kalmış köşelerini ve en güzel mekanlarını keşfedin. Gezilecek yerler, tarihi noktalar ve manzara önerileri burada!",
    hashtags: ["#meram", "#alaaddin", "#manzara", "#gezilecekyerler", "#kahvaltı", "#tarihi", "#foto"]
  },
  kariyer: {
    aciklama: "Kariyerinizi planlayın, staj fırsatlarını yakalayın ve profesyonel ağınızı genişletin. İş ilanları, staj başvuruları ve kariyer ipuçları!",
    hashtags: ["#staj", "#iş", "#kariyer", "#başvuru", "#networking", "#cv", "#mülakat"]
  },
  etkinlik: {
    aciklama: "Kampüs ve şehirdeki tüm etkinlikleri takip edin! Konserler, festivaller, workshoplar ve sosyal aktiviteler. Hiçbir etkinliği kaçırmayın!",
    hashtags: ["#konser", "#festival", "#şenlik", "#workshop", "#seminar", "#kongre", "#etkinlik"]
  },
  diger: {
    aciklama: "Diğer kategorilere girmeyen ancak öğrenci hayatınızı ilgilendiren her türlü içerik burada. Genel duyurular, öneriler ve serbest konular!",
    hashtags: ["#genel", "#öneri", "#soru", "#duyuru", "#tartışma", "#yardım"]
  }
};

export function Anasayfa1({ isAdmin, onCikis, onAdminPaneline, initialKullaniciBilgileri }: Anasayfa1Props) {
  const [aktifSayfa, setAktifSayfa] = useState<Sayfa>("anasayfa");
  const [secilenKategori, setSecilenKategori] = useState("tumu");
  const [aramaTerimi, setAramaTerimi] = useState("");
  const [acikPanel, setAcikPanel] = useState<"basliklar" | "yorumlar" | null>(null);
  const [bildirimlerAcik, setBildirimlerAcik] = useState(false);
  const [duzenlenecekBaslik, setDuzenlenecekBaslik] = useState<Baslik | null>(null);
  const [secilenBaslik, setSecilenBaslik] = useState<Baslik | null>(null);
  const [vurgulananYorumId, setVurgulananYorumId] = useState<number | null>(null);
  const [secilenEtkinlik, setSecilenEtkinlik] = useState<Etkinlik | null>(null);
  const [leaderboardAcik, setLeaderboardAcik] = useState(false);
  const [secilenKullanici, setSecilenKullanici] = useState<any>(null);
  const [cikisOnayDialogu, setCikisOnayDialogu] = useState(false);
  const [footerModal, setFooterModal] = useState<"hakkimizda" | "iletisim" | "rozetler" | "sss" | "kullanim" | "gizlilik" | "yardim" | null>(null);
  const [kayitliBasliklar, setKayitliBasliklar] = useState<any[]>([]);
  const [kullaniciYorumlari, setKullaniciYorumlari] = useState<any[]>([]);
  const [begenilenYorumlar, setBegenilenYorumlar] = useState<any[]>([]);
  const [begenilenBasliklar, setBegenilenBasliklar] = useState<number[]>(() => {
    const saved = localStorage.getItem('begenilenBasliklar');
    return saved ? JSON.parse(saved) : [];
  });
  const [paylasmaModalAcik, setPaylasmaModalAcik] = useState(false);
  const [paylasilacakBaslik, setPaylasilacakBaslik] = useState<string>("");
  const [kategoriDrawerAcik, setKategoriDrawerAcik] = useState(false);
  const [mobilAramaAcik, setMobilAramaAcik] = useState(false);
  const [gecmisAramalar, setGecmisAramalar] = useState<string[]>([]);
  const [kategoriDetayAcik, setKategoriDetayAcik] = useState(false);
  const [kategoriDetayData, setKategoriDetayData] = useState<{ id: string; isim: string } | null>(null);
  const [secilenHashtag, setSecilenHashtag] = useState<string | null>(null);
  
  // Kategori bilgileri düzenleme state'leri
  const [duzenlenecekKategori, setDuzenlenecekKategori] = useState<string | null>(null);
  const [duzenlemeMetnleri, setDuzenlemeMetnleri] = useState<Record<string, { aciklama: string; hashtags: string[] }>>(() => {
    const saved = localStorage.getItem('kategoriBilgileriDuzenleme');
    return saved ? JSON.parse(saved) : kategoriBilgileri;
  });
  const [geciciAciklama, setGeciciAciklama] = useState<string>("");
  
  // Kutucuk (box) düzenleme state'leri
  const [duzenlenecekKutucuk, setDuzenlenecekKutucuk] = useState<string | null>(null);
  const [kutucukBasliklari, setKutucukBasliklari] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('kutucukBasliklari');
    return saved ? JSON.parse(saved) : {
      kategoriler: "Kategoriler",
      hizliAksiyonlar: "Hızlı Aksiyonlar",
      platformIstatistikleri: "Platform İstatistikleri",
      trendBasliklar: "Trend Başlıklar",
      populerYorumlar: "Popüler Yorumlar"
    };
  });
  const [geciciKutucukBaslik, setGeciciKutucukBaslik] = useState<string>("");
  
  // Başlık düzenleme form state'leri
  const [editBaslik, setEditBaslik] = useState<string>("");
  const [editIcerik, setEditIcerik] = useState<string>("");
  const [editKategori, setEditKategori] = useState<string>("");
  const [editEtiketler, setEditEtiketler] = useState<string>("");
  
  // Kullanıcı bilgileri state
  const [kullaniciBilgileri, setKullaniciBilgileri] = useState(() => {
    const saved = localStorage.getItem('kullaniciBilgileri');
    return saved ? JSON.parse(saved) : initialKullaniciBilgileri;
  });

  // LocalStorage'dan kayıtlı başlıkları yükle
  useEffect(() => {
    const savedKayitliBasliklar = localStorage.getItem('kullaniciKayitliBasliklar');
    if (savedKayitliBasliklar) {
      setKayitliBasliklar(JSON.parse(savedKayitliBasliklar));
    }
  }, []);

  // LocalStorage'dan yorumları yükle
  useEffect(() => {
    const savedYorumlar = localStorage.getItem('kullaniciYorumlari');
    if (savedYorumlar) {
      setKullaniciYorumlari(JSON.parse(savedYorumlar));
    }
  }, []);

  // LocalStorage'dan beğenilen yorumları yükle
  useEffect(() => {
    const savedBegenilenYorumlar = localStorage.getItem('kullaniciBegenilenYorumlar');
    if (savedBegenilenYorumlar) {
      setBegenilenYorumlar(JSON.parse(savedBegenilenYorumlar));
    }
  }, []);

  // Geçmiş aramaları localStorage'dan yükle
  useEffect(() => {
    const savedAramalar = localStorage.getItem('gecmisAramalar');
    if (savedAramalar) {
      setGecmisAramalar(JSON.parse(savedAramalar));
    }
  }, []);

  // Başlık düzenleme formunu başlat
  useEffect(() => {
    if (duzenlenecekBaslik) {
      setEditBaslik(duzenlenecekBaslik.baslik);
      setEditIcerik(duzenlenecekBaslik.icerik);
      setEditKategori(duzenlenecekBaslik.kategori);
      setEditEtiketler(duzenlenecekBaslik.etiketler?.join(", ") || "");
    }
  }, [duzenlenecekBaslik]);

  // Başlık düzenleme kaydet fonksiyonu
  const handleBaslikDuzenleKaydet = () => {
    if (duzenlenecekBaslik && editBaslik.trim() && editIcerik.trim()) {
      // Başlığı güncelle (tumBasliklar state'ini güncelle gerekirse)
      toast.success("✅ Başlık başarıyla güncellendi!", {
        duration: 3000,
        style: {
          background: "linear-gradient(135deg, #2A4461 0%, #395579 100%)",
          color: "white",
        },
      });
      setDuzenlenecekBaslik(null);
      // Form state'lerini sıfırla
      setEditBaslik("");
      setEditIcerik("");
      setEditKategori("");
      setEditEtiketler("");
    } else {
      toast.error("Lütfen tüm alanları doldurun");
    }
  };

  // Sık arananlar (statik liste)
  const sikArananlar = [
    "Yurt",
    "Kütüphane",
    "Kantin",
    "Sosyal Etkinlikler",
    "Staj",
    "Part-time İş",
  ];

  // Arama yapıldığında geçmişe ekle
  const handleSearch = (terim: string) => {
    if (terim.trim() && !gecmisAramalar.includes(terim.trim())) {
      const yeniGecmis = [terim.trim(), ...gecmisAramalar].slice(0, 10); // Son 10 aramayı tut
      setGecmisAramalar(yeniGecmis);
      localStorage.setItem('gecmisAramalar', JSON.stringify(yeniGecmis));
    }
    setAramaTerimi(terim);
  };

  // Geçmiş aramayı kaldır
  const removeGecmisArama = (terim: string) => {
    const yeniGecmis = gecmisAramalar.filter(a => a !== terim);
    setGecmisAramalar(yeniGecmis);
    localStorage.setItem('gecmisAramalar', JSON.stringify(yeniGecmis));
  };

  // Mock başlıklar verisi
  const tumBasliklar: Baslik[] = [
    {
      id: 1,
      baslik: "Kampüs Kantinlerinde Yeni Menü",
      kategori: "Sosyal Yaşam",
      icerik: "Kampüs kantinlerinde bu hafta başladı! Öğle aralarında denemenizi öneririm. Fiyatlar çok uygun ve porsiyonlar doyurucu. Özellikle vejetaryen seçenekler çok başarılı olmuş.",
      yazar: "Ahmet Y.",
      yazarRol: "Gezgin",
      tarih: "2 saat önce",
      goruntulenme: 234,
      duzenlemeSayisi: 0,
      begeni: 45,
      yorumlar: [
        { id: 1, kullanici: "Zeynep K.", kullaniciRol: "Seyyah", icerik: "Çok güzel bir haber, teşekkürler!", tarih: "1 saat önce", begeni: 12, avatar: "Z" },
        { id: 2, kullanici: "Can B.", kullaniciRol: "Konya Bilgesi", icerik: "Fiyatlar gerçekten makul, herkese tavsiye ederim.", tarih: "30 dakika önce", begeni: 8, avatar: "C" },
      ],
      etiketler: ["kantin", "yemek", "kampüs"],
    },
    {
      id: 2,
      baslik: "Kütüphane Çalışma Saatleri Güncelleme",
      kategori: "Akademik Destek",
      icerik: "Sevgili arkadaşlar, merkez kütüphane final döneminde hafta sonları da 08:00-22:00 arası açık olacak. Sessiz çalışma alanları için rezervasyon yapabilirsiniz.",
      yazar: "Kemal R.",
      yazarRol: "Kaşif Meraklısı",
      tarih: "5 saat önce",
      goruntulenme: 567,
      duzenlemeSayisi: 1,
      begeni: 89,
      yorumlar: [
        { id: 3, kullanici: "Elif S.", kullaniciRol: "Gezgin", icerik: "Harika! Final haftasında çok işimize yarayacak.", tarih: "4 saat önce", begeni: 15, avatar: "E" },
        { id: 4, kullanici: "Mehmet Y.", kullaniciRol: "Gezgin", icerik: "Rezervasyon için hangi numarayı aramak gerekiyor?", tarih: "3 saat önce", begeni: 5, avatar: "M" },
      ],
      etiketler: ["kütüphane", "final", "çalışma"],
    },
    {
      id: 3,
      baslik: "Meram'da Yeni Açılan Kafe",
      kategori: "Keşif Rehberi",
      icerik: "Meram Meydan'da yeni açılan bir kafe keşfettim. Atmosferi ve kahveleri harika! Öğrenci indirimi de var. Adres: Meram Meydan AVM karşısı. Kahve fiyatları 35-50 TL arası.",
      yazar: "Selin Y.",
      yazarRol: "Seyyah",
      tarih: "1 gün önce",
      goruntulenme: 421,
      duzenlemeSayisi: 0,
      begeni: 67,
      yorumlar: [
        { id: 5, kullanici: "Berk S.", kullaniciRol: "Gezgin", icerik: "Dün gittim, gerçekten çok güzel bir yer!", tarih: "18 saat önce", begeni: 10, avatar: "B" },
        { id: 6, kullanici: "Derya H.", kullaniciRol: "Seyyah", icerik: "Öğrenci indirimli fiyatlar nedir acaba?", tarih: "12 saat önce", begeni: 4, avatar: "D" },
      ],
      etiketler: ["kafe", "meram", "kahve", "indirim"],
    },
    {
      id: 4,
      baslik: "Staj Başvuru Tarihleri",
      kategori: "Kariyer",
      icerik: "Yaz dönemi staj başvuruları başladı! Özellikle mühendislik öğrencileri için çok güzel fırsatlar var. Kariyer Merkezi'nde detaylı bilgi alabilirsiniz. Son başvuru tarihi 15 Ocak.",
      yazar: "Onur V.",
      yazarRol: "Kaşif Meraklısı",
      tarih: "3 gün önce",
      goruntulenme: 892,
      duzenlemeSayisi: 2,
      begeni: 134,
      yorumlar: [
        { id: 7, kullanici: "Cem Ö.", kullaniciRol: "Seyyah", icerik: "Hangi firmalarda staj imkanı var?", tarih: "2 gün önce", begeni: 18, avatar: "C" },
        { id: 8, kullanici: "Zehra P.", kullaniciRol: "Gezgin", icerik: "Kariyer Merkezi'nin iletişim bilgilerini paylaşabilir misiniz?", tarih: "2 gün önce", begeni: 9, avatar: "Z" },
      ],
      etiketler: ["staj", "kariyer", "iş"],
    },
    {
      id: 5,
      baslik: "Kampüs Bahar Şenliği 2025",
      kategori: "Etkinlikler",
      icerik: "Bu yıl bahar şenliğimiz 20-22 Mart tarihleri arasında gerçekleşecek! Konserler, workshoplar ve çeşitli aktiviteler sizleri bekliyor. Katılım ücretsiz!",
      yazar: "Can H.",
      yazarRol: "Konya Bilgesi",
      tarih: "1 hafta önce",
      goruntulenme: 1243,
      duzenlemeSayisi: 0,
      begeni: 256,
      yorumlar: [
        { id: 9, kullanici: "Alp K.", kullaniciRol: "Kaşif Meraklısı", icerik: "Hangi sanatçılar gelecek?", tarih: "6 gün önce", begeni: 23, avatar: "A" },
        { id: 10, kullanici: "Ece B.", kullaniciRol: "Gezgin", icerik: "Çok heyecanlıyım! Kesinlikle katılacağım.", tarih: "5 gün önce", begeni: 14, avatar: "E" },
      ],
      etiketler: ["etkinlik", "şenlik", "konser"],
    },
    {
      id: 6,
      baslik: "Kampüs Yakınında Yeni Açılan Kafe",
      kategori: "Sosyal Yaşam",
      icerik: "Kampüs yakınında harika bir kafe açıldı! Öğrenci dostu fiyatlar ve rahat ortamı ile ders çalışmak için ideal.",
      yazar: "Bey gör",
      yazarRol: "Gezgin",
      tarih: "6 saat önce",
      goruntulenme: 325,
      duzenlemeSayisi: 0,
      begeni: 52,
      yorumlar: [],
      etiketler: ["kafe", "kampüs"],
    },
    {
      id: 16,
      baslik: "Alaaddin Tepesi'nde En İyi Manzara Noktaları",
      kategori: "Keşif Rehberi",
      icerik: "Alaaddin Tepesi'nde gün batımını izlemek için en iyi noktaları paylaşıyorum.",
      yazar: "Bey gör",
      yazarRol: "Konya Bilgesi",
      tarih: "1 gün önce",
      goruntulenme: 856,
      duzenlemeSayisi: 1,
      begeni: 93,
      yorumlar: [
        { id: 20, kullanici: "Murat G.", kullaniciRol: "Gezgin", icerik: "Harika bir paylaşım, çok teşekkürler!", tarih: "20 saat önce", begeni: 15, avatar: "M" },
      ],
      etiketler: ["alaaddin", "manzara"],
    },
    {
      id: 21,
      baslik: "Selçuklu Kongre Merkezi Etkinlikleri",
      kategori: "Etkinlikler",
      icerik: "Selçuklu Kongre Merkezi'nde bu ay çeşitli etkinlikler var.",
      yazar: "Mehmet K.",
      yazarRol: "Gezgin",
      tarih: "1 hafta önce",
      goruntulenme: 542,
      duzenlemeSayisi: 0,
      begeni: 71,
      yorumlar: [
        { id: 14, kullanici: "Burcu Y.", kullaniciRol: "Seyyah", icerik: "Bu hafta sonu tiyatro gösterisi var, kesinlikle izlemenizi tavsiye ederim!", tarih: "6 gün önce", begeni: 6, avatar: "B" },
      ],
      etiketler: ["kongre", "etkinlik"],
    },
    {
      id: 34,
      baslik: "Meram'da En İyi Kahvaltı Mekanları",
      kategori: "Keşif Rehberi",
      icerik: "Meram'da hafta sonu kahvaltısı için en iyi mekanları derlediğim bir liste.",
      yazar: "Aylin S.",
      yazarRol: "Kaşif Meraklısı",
      tarih: "1 gün önce",
      goruntulenme: 678,
      duzenlemeSayisi: 0,
      begeni: 89,
      yorumlar: [
        { id: 15, kullanici: "Bey gör", kullaniciRol: "Gezgin", icerik: "Kesinlikle Tiritçi Mithat'ı deneyin, fiyatlar uygun ve lezzet harika!", tarih: "1 gün önce", begeni: 8, avatar: "B" },
      ],
      etiketler: ["kahvaltı", "meram"],
    },
    {
      id: 45,
      baslik: "Kampüste WiFi Sorunları",
      kategori: "Akademik Destek",
      icerik: "Kampüste wifi bağlantısında yaşanan sorunlar hakkında bilgilendirme.",
      yazar: "Emre D.",
      yazarRol: "Seyyah",
      tarih: "3 gün önce",
      goruntulenme: 423,
      duzenlemeSayisi: 2,
      begeni: 34,
      yorumlar: [
        { id: 16, kullanici: "Bey gör", kullaniciRol: "Gezgin", icerik: "Merkez kütüphanenin 2. katında wifi daha stabil çalışıyor, oradan deneyebilirsiniz.", tarih: "3 gün önce", begeni: 5, avatar: "B" },
      ],
      etiketler: ["wifi", "kampüs"],
    },
    {
      id: 46,
      baslik: "Konya'da Açık Olan 24 Saat Marketler",
      kategori: "Sosyal Yaşam",
      icerik: "Gece geç saatlerde ihtiyaç duyduğunuz anlarda açık olan marketlerin listesi.",
      yazar: "Fatma H.",
      yazarRol: "Gezgin",
      tarih: "4 gün önce",
      goruntulenme: 512,
      duzenlemeSayisi: 1,
      begeni: 67,
      yorumlar: [
        { id: 17, kullanici: "Bey gör", kullaniciRol: "Gezgin", icerik: "Alaaddin'in yanındaki Migros 24 saat açık, acil durumlar için ideal.", tarih: "4 gün önce", begeni: 12, avatar: "B" },
      ],
      etiketler: ["market", "24saat"],
    },
  ];

  // Mock etkinlikler verisi
  const tumEtkinlikler: Etkinlik[] = [
    {
      id: 1,
      baslik: "Kampüs Bahar Şenliği 2025",
      aciklama: "Bahar geldi, şenlik zamanı! Konserler, workshoplar ve eğlence dolu 3 gün.",
      detay: "Kampüsümüzün en büyük etkinliği olan Bahar Şenliği bu yıl 20-22 Mart tarihleri arasında gerçekleşecek. 3 gün boyunca çeşitli konserler, atölyeler, spor aktiviteleri ve daha fazlası sizleri bekliyor. Tüm öğrenciler ücretsiz katılabilir!",
      tarih: "20-22 Mart 2025",
      saat: "10:00 - 22:00",
      konum: "Merkez Kampüs",
      konumDetay: "Ana Meydan ve Çevre Alanları",
      kategori: "Şenlik",
      organizator: "Öğrenci Kulüpleri Birliği",
      katilimciSayisi: 2453,
      maxKatilimci: 5000,
      ucret: "Ücretsiz",
      kapakGorseli: "🎉",
      etiketler: ["şenlik", "konser", "workshop", "bahar"],
      iletisim: {
        email: "kulüpler@universite.edu.tr",
        instagram: "kampussenlik",
      },
    },
    {
      id: 2,
      baslik: "Mevlana Müzesi Gezisi",
      aciklama: "Konya'nın en önemli tarihi mekanlarından birini birlikte keşfedelim!",
      detay: "Tarih ve Kültür Kulübü olarak Mevlana Müzesi'ne rehberli gezi düzenliyoruz. Profesyonel bir rehber eşliğinde Mevlana'nın hayatını ve Konya'nın tarihi dokusunu keşfedeceğiz. Gezi sonrası Sems-i Tebrizi Türbesi'ni de ziyaret edeceğiz.",
      tarih: "15 Aralık 2024",
      saat: "14:00",
      konum: "Mevlana Müzesi",
      konumDetay: "Mevlana Mah. Mevlana Caddesi No:1",
      kategori: "Kültür",
      organizator: "Tarih ve Kültür Kulübü",
      katilimciSayisi: 34,
      maxKatilimci: 50,
      ucret: "20 TL (Ulaşım dahil)",
      kapakGorseli: "🕌",
      etiketler: ["kültür", "tarih", "mevlana", "gezi"],
      iletisim: {
        telefon: "0332 123 45 67",
        email: "tarihkulup@universite.edu.tr",
      },
    },
  ];

  // Sosyal Sorumluluk Etkinlikleri
  const sosyalSorumlulukEtkinlikleri: Etkinlik[] = [
    {
      id: 101,
      baslik: "Çevre Temizliği - Alaaddin Tepesi",
      aciklama: "Konya'nın en özel noktalarından Alaaddin Tepesi'nde çevre temizliği yapıyoruz!",
      detay: "Alaaddin Tepesi ve çevresi için düzenlenen çevre temizliği etkinliğine davetlisiniz. Doğaya ve şehrimize katkıda bulunurken, aynı zamanda sosyal bir aktivitenin parçası olacaksınız. Temizlik malzemeleri tarafımızca sağlanacaktır. Katılımcılara 2x coin kazanma fırsatı!",
      tarih: "8 Aralık 2024",
      saat: "09:00 - 12:00",
      konum: "Alaaddin Tepesi",
      konumDetay: "Alaaddin Parkı Ana Giriş",
      kategori: "Sosyal Sorumluluk",
      organizator: "Çevre Gönüllüleri Kulübü",
      katilimciSayisi: 45,
      maxKatilimci: 100,
      ucret: "Ücretsiz",
      kapakGorseli: "🌱",
      isSocialResponsibility: true,
      etiketler: ["çevre", "temizlik", "gönüllülük", "doğa"],
      iletisim: {
        email: "cevrekulup@universite.edu.tr",
        instagram: "cevrevolunteer",
      },
    },
    {
      id: 102,
      baslik: "Kitap Bağışı Kampanyası",
      aciklama: "İhtiyaç sahibi öğrenciler için kitap toplama kampanyası!",
      detay: "Eğitim hayatına yeni başlayan ve maddi imkanları kısıtlı öğrenciler için kitap topluyoruz. Kullanmadığınız ders kitaplarını, romanları veya kaynak kitapları bağışlayabilirsiniz. Toplanan kitaplar ihtiyaç sahibi öğrencilere ulaştırılacak. Sosyal sorumluluk etkinliği olarak 2x coin kazanacaksınız!",
      tarih: "10-15 Aralık 2024",
      saat: "10:00 - 17:00",
      konum: "Merkez Kütüphane",
      konumDetay: "Kütüphane Giriş Holü",
      kategori: "Sosyal Sorumluluk",
      organizator: "Eğitim Gönüllüleri Topluluğu",
      katilimciSayisi: 67,
      maxKatilimci: 150,
      ucret: "Ücretsiz",
      kapakGorseli: "📚",
      isSocialResponsibility: true,
      etiketler: ["eğitim", "kitap", "bağış", "yardımlaşma"],
      iletisim: {
        telefon: "0332 234 56 78",
        email: "egitimvolunteer@universite.edu.tr",
      },
    },
    {
      id: 103,
      baslik: "Sokak Hayvanları Kış Bakımı",
      aciklama: "Sokak hayvanları için mama ve barınak hazırlığı yapıyoruz.",
      detay: "Kış aylarında sokak hayvanlarının ihtiyaçlarını karşılamak için mama dağıtımı ve barınak hazırlama etkinliği düzenliyoruz. Kampüs ve çevre mahallerdeki sokak hayvanları için su kapları yerleştirme, mama dağıtımı ve basit barınaklar hazırlayacağız. Hayvan sever katılımcılar için özel bir etkinlik! 2x coin kazanma fırsatı.",
      tarih: "12 Aralık 2024",
      saat: "13:00 - 16:00",
      konum: "Kampüs ve Çevre Mahalleler",
      konumDetay: "Buluşma: Kampüs Ana Kapı",
      kategori: "Sosyal Sorumluluk",
      organizator: "Hayvan Hakları Kulübü",
      katilimciSayisi: 34,
      maxKatilimci: 60,
      ucret: "Ücretsiz",
      kapakGorseli: "🐾",
      isSocialResponsibility: true,
      etiketler: ["hayvanlar", "gönüllülük", "kış", "bakım"],
      iletisim: {
        instagram: "hayvanhakları_konya",
        email: "hayvansevgisi@universite.edu.tr",
      },
    },
  ];

  // Popüler yorumlar
  const populerYorumlar = [
    {
      id: 15, // Başlıktaki gerçek yorum id'si
      baslikId: 34,
      baslikBaslik: "Meram'da En İyi Kahvaltı Mekanları",
      kategori: "Keşif Rehberi",
      kullanici: "Bey gör",
      kullaniciRol: "Gezgin",
      avatar: "B",
      icerik: "Kesinlikle Tiritçi Mithat'ı deneyin, fiyatlar uygun ve lezzet harika!",
      tarih: "1 gün önce",
      begeni: 8,
    },
    {
      id: 20, // Başlıktaki gerçek yorum id'si
      baslikId: 16,
      baslikBaslik: "Alaaddin Tepesi'nde En İyi Manzara Noktaları",
      kategori: "Keşif Rehberi",
      kullanici: "Murat G.",
      kullaniciRol: "Gezgin",
      avatar: "M",
      icerik: "Harika bir paylaşım, çok teşekkürler!",
      tarih: "20 saat önce",
      begeni: 15,
    },
    {
      id: 1, // Başlıktaki gerçek yorum id'si
      baslikId: 1,
      baslikBaslik: "Kampüs Kantinlerinde Yeni Menü",
      kategori: "Sosyal Yaşam",
      kullanici: "Zeynep K.",
      kullaniciRol: "Seyyah",
      avatar: "Z",
      icerik: "Çok güzel bir haber, teşekkürler!",
      tarih: "1 saat önce",
      begeni: 12,
    },
    {
      id: 7, // Başlıktaki gerçek yorum id'si
      baslikId: 4,
      baslikBaslik: "Staj Başvuru Tarihleri",
      kategori: "Kariyer",
      kullanici: "Cem Ö.",
      kullaniciRol: "Seyyah",
      avatar: "C",
      icerik: "Hangi firmalarda staj imkanı var?",
      tarih: "2 gün önce",
      begeni: 18,
    },
    {
      id: 14, // Başlıktaki gerçek yorum id'si
      baslikId: 21,
      baslikBaslik: "Selçuklu Kongre Merkezi Etkinlikleri",
      kategori: "Etkinlikler",
      kullanici: "Burcu Y.",
      kullaniciRol: "Seyyah",
      avatar: "B",
      icerik: "Bu hafta sonu tiyatro gösterisi var, kesinlikle izlemenizi tavsiye ederim!",
      tarih: "6 gün önce",
      begeni: 6,
    },
  ];

  // Bildirimler - BildirimPaneli kendi verilerini yönetiyor
  const okunmamisBildirimSayisi = 2;

  // Kategori değişikliğinde scroll to top
  useEffect(() => {
    if (aktifSayfa === "anasayfa") {
      // Mobilde header'ın altına scroll yap
      const isMobile = window.innerWidth < 1024; // lg breakpoint
      const headerHeight = isMobile ? 72 : 0; // Mobil header yüksekliği (py-4 = 16px * 2 + content height ≈ 72px)
      
      window.scrollTo({ 
        top: headerHeight, 
        behavior: "smooth" 
      });
    }
  }, [secilenKategori, aktifSayfa]);

  // Kategori detay açıldığında hashtag filtresini sıfırla
  useEffect(() => {
    if (kategoriDetayAcik) {
      setSecilenHashtag(null);
    }
  }, [kategoriDetayAcik]);

  // Filtrelenmiş başlıklar
  const filtrelenmisBasliklar = tumBasliklar.filter(baslik => {
    const kategoriUygun = secilenKategori === "tumu" || baslik.kategori.toLowerCase().includes(secilenKategori);
    const aramaUygun = baslik.baslik.toLowerCase().includes(aramaTerimi.toLowerCase()) ||
                       baslik.icerik.toLowerCase().includes(aramaTerimi.toLowerCase());
    return kategoriUygun && aramaUygun;
  });

  // Trend algoritması - En çok görüntülenen, yorumlanan ve beğenilen başlıklar
  const trendBasliklar = [...tumBasliklar]
    .sort((a, b) => {
      const aPuan = a.goruntulenme * 0.3 + a.yorumlar.length * 5 + a.begeni * 2;
      const bPuan = b.goruntulenme * 0.3 + b.yorumlar.length * 5 + b.begeni * 2;
      return bPuan - aPuan;
    })
    .slice(0, 3);

  // Yorum ekleme fonksiyonu
  const handleYorumEkle = (baslikId: number, baslikBaslik: string, kategori: string, yorumMetni: string) => {
    const yeniYorum = {
      id: Date.now(),
      baslikId,
      baslik: baslikBaslik,
      kategori,
      yorum: yorumMetni,
      kullanici: kullaniciBilgileri.ad,
      tarih: "Az önce",
      begeniSayisi: 0,
    };

    const guncelYorumlar = [...kullaniciYorumlari, yeniYorum];
    setKullaniciYorumlari(guncelYorumlar);
    localStorage.setItem('kullaniciYorumlari', JSON.stringify(guncelYorumlar));

    // Kullanıcı bilgilerini güncelle (+2 coin yorum yazma için)
    const guncelBilgiler = {
      ...kullaniciBilgileri,
      yorumSayisi: kullaniciBilgileri.yorumSayisi + 1,
      coins: kullaniciBilgileri.coins + 2,
    };
    setKullaniciBilgileri(guncelBilgiler);
    localStorage.setItem('kullaniciBilgileri', JSON.stringify(guncelBilgiler));
  };

  // Yorum beğenme fonksiyonu
  const handleYorumBegen = (yorumId: number, yorum: any) => {
    const guncelBegenilenYorumlar = [...begenilenYorumlar, yorum];
    setBegenilenYorumlar(guncelBegenilenYorumlar);
    localStorage.setItem('kullaniciBegenilenYorumlar', JSON.stringify(guncelBegenilenYorumlar));

    // Kullanıcı bilgilerini güncelle
    const guncelBilgiler = {
      ...kullaniciBilgileri,
      coins: kullaniciBilgileri.coins + 1,
    };
    setKullaniciBilgileri(guncelBilgiler);
    localStorage.setItem('kullaniciBilgileri', JSON.stringify(guncelBilgiler));
  };

  // Başlık beğenme fonksiyonu
  const handleBaslikBegen = (baslikId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (begenilenBasliklar.includes(baslikId)) {
      // Beğeniyi geri al
      const guncelBegenilenler = begenilenBasliklar.filter(id => id !== baslikId);
      setBegenilenBasliklar(guncelBegenilenler);
      localStorage.setItem('begenilenBasliklar', JSON.stringify(guncelBegenilenler));
      toast.info("Beğeni geri alındı");
    } else {
      // Beğen
      const guncelBegenilenler = [...begenilenBasliklar, baslikId];
      setBegenilenBasliklar(guncelBegenilenler);
      localStorage.setItem('begenilenBasliklar', JSON.stringify(guncelBegenilenler));
      
      // Coin kazandır
      const guncelBilgiler = {
        ...kullaniciBilgileri,
        coins: kullaniciBilgileri.coins + 1,
      };
      setKullaniciBilgileri(guncelBilgiler);
      localStorage.setItem('kullaniciBilgileri', JSON.stringify(guncelBilgiler));
      
      toast.success("🎉 +1 Coin Kazandınız!", {
        description: "Başlık beğenildi!",
        duration: 2000,
        style: {
          background: "linear-gradient(135deg, #2A4461 0%, #395579 100%)",
          color: "white",
        },
      });
    }
  };

  // Başlık kaydetme fonksiyonu
  const handleBaslikKaydet = (baslik: any) => {
    const guncelKayitliBasliklar = [...kayitliBasliklar, baslik];
    setKayitliBasliklar(guncelKayitliBasliklar);
    localStorage.setItem('kullaniciKayitliBasliklar', JSON.stringify(guncelKayitliBasliklar));
  };

  // Çıkış onay fonksiyonu
  const handleCikisOnayla = () => {
    setCikisOnayDialogu(false);
    onCikis();
  };

  // Kategori açıklaması düzenleme fonksiyonları
  const handleKategoriDuzenleBasla = (kategoriId: string) => {
    setDuzenlenecekKategori(kategoriId);
    setGeciciAciklama(duzenlemeMetnleri[kategoriId]?.aciklama || "");
  };

  const handleKategoriDuzenleKaydet = () => {
    if (duzenlenecekKategori && geciciAciklama.trim()) {
      const guncelMetnler = {
        ...duzenlemeMetnleri,
        [duzenlenecekKategori]: {
          ...duzenlemeMetnleri[duzenlenecekKategori],
          aciklama: geciciAciklama.trim(),
        },
      };
      setDuzenlemeMetnleri(guncelMetnler);
      localStorage.setItem('kategoriBilgileriDuzenleme', JSON.stringify(guncelMetnler));
      toast.success("Kategori açıklaması güncellendi!", {
        duration: 2000,
        style: {
          background: "linear-gradient(135deg, #1d2633 0%, #28374a 100%)",
          color: "white",
        },
      });
      setDuzenlenecekKategori(null);
      setGeciciAciklama("");
    }
  };

  const handleKategoriDuzenleIptal = () => {
    setDuzenlenecekKategori(null);
    setGeciciAciklama("");
  };

  // Kutucuk düzenleme fonksiyonları
  const handleKutucukDuzenleBasla = (kutucukId: string) => {
    setDuzenlenecekKutucuk(kutucukId);
    setGeciciKutucukBaslik(kutucukBasliklari[kutucukId] || "");
  };

  const handleKutucukDuzenleKaydet = () => {
    if (duzenlenecekKutucuk && geciciKutucukBaslik.trim()) {
      const guncelBasliklar = {
        ...kutucukBasliklari,
        [duzenlenecekKutucuk]: geciciKutucukBaslik.trim(),
      };
      setKutucukBasliklari(guncelBasliklar);
      localStorage.setItem('kutucukBasliklari', JSON.stringify(guncelBasliklar));
      toast.success("Kutucuk başlığı güncellendi!", {
        duration: 2000,
        style: {
          background: "linear-gradient(135deg, #2A4461 0%, #395579 100%)",
          color: "white",
        },
      });
      setDuzenlenecekKutucuk(null);
      setGeciciKutucukBaslik("");
    }
  };

  const handleKutucukDuzenleIptal = () => {
    setDuzenlenecekKutucuk(null);
    setGeciciKutucukBaslik("");
  };

  // Rol rengini belirle
  const getRolColor = (rol: string) => {
    if (rol.includes("Konya Bilgesi")) return "from-yellow-400 to-yellow-600";
    if (rol.includes("Kaşif Meraklısı")) return "from-purple-500 to-purple-600";
    if (rol.includes("Gezgin")) return "from-blue-500 to-blue-600";
    if (rol.includes("Seyyah")) return "from-green-500 to-green-600";
    return "from-gray-400 to-gray-500";
  };

  // Sayfa render fonksiyonları
  const renderSayfaIcerigi = () => {
    if (aktifSayfa === "profil") {
      return (
      <ProfilSayfasi
        onClose={() => setAktifSayfa("anasayfa")}
        onOpenSettings={() => setAktifSayfa("ayarlar")}
        kullaniciBilgileri={kullaniciBilgileri}
        kullaniciYorumlari={kullaniciYorumlari}
        kullaniciBegenilenYorumlar={begenilenYorumlar}
        kullaniciKayitliBasliklar={kayitliBasliklar}
        onBaslikClick={(baslikId, kategori) => {
          const baslik = tumBasliklar.find(b => b.id === baslikId);
          if (baslik) {
            setSecilenBaslik(baslik);
            setAktifSayfa("anasayfa");
          }
        }}
        onOpenYeniBaslik={() => setAktifSayfa("yeniBaslik")}
        onCikis={() => setCikisOnayDialogu(true)}
        onCoinsUpdate={(newCoins) => {
          const guncelBilgiler = {
            ...kullaniciBilgileri,
            coins: newCoins,
          };
          setKullaniciBilgileri(guncelBilgiler);
          localStorage.setItem('kullaniciBilgileri', JSON.stringify(guncelBilgiler));
        }}
        />
      );
    }

    if (aktifSayfa === "ayarlar") {
      return (
        <AyarlarSayfasi
          onClose={() => setAktifSayfa("anasayfa")}
          onProfileDon={() => setAktifSayfa("profil")}
          kullaniciBilgileri={kullaniciBilgileri}
        />
      );
    }

    if (aktifSayfa === "yeniBaslik") {
      return (
        <YeniBaslikSayfasi
          onClose={() => setAktifSayfa("anasayfa")}
          kullaniciRolu={kullaniciBilgileri.rol}
        onBaslikOlusturuldu={(yeniBaslik) => {
          // Başlık oluşturulduğunda kullanıcı bilgilerini güncelle (+20 coin yeni başlık için)
          const guncelBilgiler = {
            ...kullaniciBilgileri,
            baslikSayisi: kullaniciBilgileri.baslikSayisi + 1,
            coins: kullaniciBilgileri.coins + 20,
          };
          setKullaniciBilgileri(guncelBilgiler);
          localStorage.setItem('kullaniciBilgileri', JSON.stringify(guncelBilgiler));
          setAktifSayfa("anasayfa");
        }}
        />
      );
    }

    // Eğer başlık detayı açıksa, onu göster
    if (secilenBaslik) {
      return (
      <BaslikDetaySayfasi
        baslik={secilenBaslik}
        onClose={() => {
          setSecilenBaslik(null);
          setVurgulananYorumId(null);
        }}
        highlightedCommentId={vurgulananYorumId}
        onYorumEkle={handleYorumEkle}
        onYorumBegen={handleYorumBegen}
        onBaslikKaydet={handleBaslikKaydet}
        kullaniciRolu={kullaniciBilgileri.rol}
        isAdmin={isAdmin}
        onCoinKazan={(miktar: number) => {
          const guncelBilgiler = {
            ...kullaniciBilgileri,
            coins: kullaniciBilgileri.coins + miktar,
          };
          setKullaniciBilgileri(guncelBilgiler);
          localStorage.setItem('kullaniciBilgileri', JSON.stringify(guncelBilgiler));
        }}
        />
      );
    }

    // Eğer etkinlik detayı açıksa, onu göster
    if (secilenEtkinlik) {
      return (
      <EtkinlikDetaySayfasi
        etkinlik={secilenEtkinlik}
        onClose={() => setSecilenEtkinlik(null)}
        onKayitOl={() => {
          toast.success("🎉 Etkinliğe kayıt oldunuz! +10 Coin", {
            duration: 3000,
            style: {
              background: "linear-gradient(135deg, #877C73 0%, #D5D0C4 100%)",
              border: "2px solid #877C73",
              color: "#44474D",
            },
          });
          const guncelBilgiler = {
            ...kullaniciBilgileri,
            coins: kullaniciBilgileri.coins + 10,
          };
          setKullaniciBilgileri(guncelBilgiler);
          localStorage.setItem('kullaniciBilgileri', JSON.stringify(guncelBilgiler));
          setSecilenEtkinlik(null);
        }}
        />
      );
    }

    // Anasayfa içeriği
    return (
      <div className="container mx-auto px-4 py-6">
        {/* Mobil Üst Bölüm - Sadece Mobilde Görünür */}
        <div className="lg:hidden mb-6 space-y-4">
          {/* Gündemde - Mobilde En Üstte */}
          <div className="relative bg-gradient-to-br from-[#395579]/12 via-[#4A6A8A]/10 to-[#5A7A9A]/8 dark:from-[#395579]/18 dark:via-[#4A6A8A]/15 dark:to-[#5A7A9A]/12 rounded-3xl p-6 shadow-2xl shadow-[#395579]/12 overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#395579]/8 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#5A7A9A]/12 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#4A6A8A]/6 rounded-full blur-2xl"></div>
            
            <div className="relative flex items-center gap-3 mb-6 px-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-9 bg-gradient-to-b from-[#2A4461] via-[#395579] to-[#4A6A8A] rounded-full shadow-lg shadow-[#395579]/30"></div>
                <div className="w-1.5 h-7 bg-gradient-to-b from-[#395579] to-[#5A7A9A] rounded-full opacity-80"></div>
                <div className="w-1 h-5 bg-gradient-to-b from-[#4A6A8A] to-[#7B99B3] rounded-full opacity-60"></div>
                <div className="w-0.5 h-3 bg-[#5A7A9A] rounded-full opacity-40"></div>
              </div>
              <h2 className="text-neutral-700 dark:text-neutral-200">Gündemde</h2>
              <div className="ml-auto flex items-center gap-2.5 bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/20 px-4 py-2 rounded-full backdrop-blur-md shadow-lg shadow-[#395579]/10">
                <div className="relative flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#395579] shadow-lg shadow-[#395579]/50"></div>
                  <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-[#395579] animate-ping"></div>
                  <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-[#395579] animate-pulse"></div>
                </div>
                <Flame className="w-4 h-4 text-[#395579]" />
              </div>
            </div>
            
            <div className="relative space-y-3">
              {trendBasliklar.map((baslik, index) => (
                <motion.div
                  key={baslik.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => {
                    setVurgulananYorumId(null);
                    setSecilenBaslik(baslik);
                  }}
                  className="group relative flex items-start gap-4 p-5 rounded-2xl bg-white/85 dark:bg-neutral-800/85 backdrop-blur-lg hover:bg-gradient-to-r hover:from-[#395579]/18 hover:via-[#4A6A8A]/12 hover:to-transparent dark:hover:from-[#395579]/25 dark:hover:via-[#4A6A8A]/18 dark:hover:to-transparent hover:shadow-2xl hover:shadow-[#395579]/25 transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#395579]/0 via-[#395579]/8 to-[#395579]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#395579]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#2A4461] via-[#395579] to-[#4A6A8A] text-white shadow-xl shadow-[#395579]/35 group-hover:shadow-2xl group-hover:shadow-[#395579]/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shrink-0">
                    <span className="text-sm">{index + 1}</span>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="relative flex-1 min-w-0">
                    <h3 className="text-sm text-neutral-700 dark:text-[#e8f0ff] line-clamp-2 mb-3 group-hover:text-[#2A4461] dark:group-hover:text-[#7B99B3] transition-colors duration-300">
                      {baslik.baslik}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 flex-wrap">
                      <span className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18 group-hover:bg-gradient-to-r group-hover:from-[#395579]/25 group-hover:to-[#4A6A8A]/18 group-hover:shadow-md group-hover:shadow-[#395579]/20 transition-all duration-300">
                        <Eye className="w-3.5 h-3.5 text-[#395579] group-hover:scale-110 transition-transform" />
                        <span className="text-neutral-600 dark:text-neutral-300">{baslik.goruntulenme}</span>
                      </span>
                      <span className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18 group-hover:bg-gradient-to-r group-hover:from-[#395579]/25 group-hover:to-[#4A6A8A]/18 group-hover:shadow-md group-hover:shadow-[#395579]/20 transition-all duration-300">
                        <MessageSquare className="w-3.5 h-3.5 text-[#395579] group-hover:scale-110 transition-transform" />
                        <span className="text-neutral-600 dark:text-neutral-300">{baslik.yorumlar.length}</span>
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => handleBaslikBegen(baslik.id, e)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-full transition-all duration-300 ${
                          begenilenBasliklar.includes(baslik.id)
                            ? 'bg-[#395579] text-white shadow-md shadow-[#395579]/30'
                            : 'bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18 group-hover:from-[#395579]/25 group-hover:to-[#4A6A8A]/18 group-hover:shadow-md group-hover:shadow-[#395579]/20'
                        }`}
                      >
                        <ThumbsUp className={`w-3.5 h-3.5 transition-transform ${begenilenBasliklar.includes(baslik.id) ? 'text-white scale-110' : 'text-[#395579] group-hover:scale-110'}`} />
                        <span className={begenilenBasliklar.includes(baslik.id) ? 'text-white' : 'text-neutral-600 dark:text-neutral-300'}>
                          {baslik.begeni + (begenilenBasliklar.includes(baslik.id) ? 1 : 0)}
                        </span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Platform İstatistikleri */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-3 sm:p-4 shadow-sm">
            <h3 className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-2 sm:mb-3 px-1 sm:px-2">Platform İstatistikleri</h3>
            <div className="space-y-2 sm:space-y-3">
              {/* Aktif Kullanıcı Sayısı */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-between px-2 sm:px-3 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#1d2633]/80 to-[#28374a]/80 border border-white/10"
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
                  <span className="text-xs sm:text-sm text-white/80">Aktif Kullanıcı</span>
                </div>
                <span className="text-xs sm:text-sm text-white">{Math.floor(Math.random() * 50) + 150}</span>
              </motion.div>

              {/* Başlık Sayısı */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-between px-2 sm:px-3 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#1d2633]/80 to-[#28374a]/80 border border-white/10"
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#cea273]" />
                  <span className="text-xs sm:text-sm text-white/80">Toplam Başlık</span>
                </div>
                <span className="text-xs sm:text-sm text-white">{tumBasliklar.length}</span>
              </motion.div>

              {/* Yorum Sayısı */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-between px-2 sm:px-3 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#1d2633]/80 to-[#28374a]/80 border border-white/10"
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
                  <span className="text-xs sm:text-sm text-white/80">Toplam Yorum</span>
                </div>
                <span className="text-xs sm:text-sm text-white">
                  {tumBasliklar.reduce((total, baslik) => total + (baslik.yorumlar?.length || 0), 0)}
                </span>
              </motion.div>

              {/* Beğeni Sayısı */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-between px-2 sm:px-3 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#1d2633]/80 to-[#28374a]/80 border border-white/10"
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <ThumbsUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400" />
                  <span className="text-xs sm:text-sm text-white/80">Toplam Beğeni</span>
                </div>
                <span className="text-xs sm:text-sm text-white">
                  {tumBasliklar.reduce((total, baslik) => total + baslik.begeni, 0)}
                </span>
              </motion.div>
            </div>
          </div>

          {/* Yaklaşan Etkinlikler */}
          <div className="relative bg-gradient-to-br from-[#395579]/12 via-[#4A6A8A]/10 to-[#5A7A9A]/8 dark:from-[#395579]/18 dark:via-[#4A6A8A]/15 dark:to-[#5A7A9A]/12 rounded-2xl p-4 shadow-xl shadow-[#395579]/10 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#395579]/8 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-[#5A7A9A]/12 rounded-full blur-3xl"></div>
            
            <div className="relative flex items-center gap-2 mb-4 px-1">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-6 bg-gradient-to-b from-[#2A4461] via-[#395579] to-[#4A6A8A] rounded-full shadow-lg shadow-[#395579]/30"></div>
                <div className="w-1 h-4 bg-gradient-to-b from-[#395579] to-[#5A7A9A] rounded-full opacity-80"></div>
              </div>
              <h3 className="text-sm text-neutral-700 dark:text-neutral-200">Yaklaşan Etkinlikler</h3>
              <div className="ml-auto">
                <CalendarDays className="w-4 h-4 text-[#395579]" />
              </div>
            </div>
            
            <div className="relative space-y-2.5">
              {tumEtkinlikler.map((etkinlik, index) => (
                <motion.div
                  key={etkinlik.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSecilenEtkinlik(etkinlik)}
                  className="group relative p-3 rounded-xl bg-white/85 dark:bg-neutral-800/85 backdrop-blur-lg hover:bg-gradient-to-r hover:from-[#395579]/18 hover:via-[#4A6A8A]/12 hover:to-transparent dark:hover:from-[#395579]/25 dark:hover:via-[#4A6A8A]/18 dark:hover:to-transparent hover:shadow-xl hover:shadow-[#395579]/20 transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#395579]/0 via-[#395579]/8 to-[#395579]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative flex items-start gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#2A4461] via-[#395579] to-[#4A6A8A] text-xl shadow-lg shadow-[#395579]/35 group-hover:shadow-xl group-hover:shadow-[#395579]/50 group-hover:scale-105 transition-all duration-300 shrink-0">
                      {etkinlik.kapakGorseli}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm text-neutral-700 dark:text-[#e8f0ff] line-clamp-2 mb-1.5 group-hover:text-[#2A4461] dark:group-hover:text-[#7B99B3] transition-colors duration-300">
                        {etkinlik.baslik}
                      </h4>
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18 group-hover:shadow-sm group-hover:shadow-[#395579]/20 transition-all duration-300 inline-flex w-fit">
                        <Clock className="w-3 h-3 text-[#395579] group-hover:scale-110 transition-transform" />
                        <span className="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-1">{etkinlik.tarih}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sosyal Sorumluluk Etkinlikleri */}
          <div className="relative bg-gradient-to-br from-[#395579]/12 via-[#4A6A8A]/10 to-[#5A7A9A]/8 dark:from-[#395579]/18 dark:via-[#4A6A8A]/15 dark:to-[#5A7A9A]/12 rounded-2xl p-4 shadow-xl shadow-[#395579]/10 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#395579]/8 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-[#5A7A9A]/12 rounded-full blur-3xl"></div>
            
            <div className="relative flex items-center gap-2 mb-4 px-1">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-6 bg-gradient-to-b from-[#2A4461] via-[#395579] to-[#4A6A8A] rounded-full shadow-lg shadow-[#395579]/30"></div>
                <div className="w-1 h-4 bg-gradient-to-b from-[#395579] to-[#5A7A9A] rounded-full opacity-80"></div>
              </div>
              <h3 className="text-sm text-neutral-700 dark:text-neutral-200">Sosyal Sorumluluk</h3>
              <span className="ml-auto flex items-center gap-1 text-xs bg-gradient-to-r from-[#395579] to-[#4A6A8A] text-white px-2 py-1 rounded-full shadow-lg shadow-[#395579]/30">
                <Coins className="w-3 h-3" />
                2x Coin
              </span>
            </div>
            
            <div className="relative space-y-2.5">
              {sosyalSorumlulukEtkinlikleri.map((etkinlik, index) => (
                <motion.div
                  key={etkinlik.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSecilenEtkinlik(etkinlik)}
                  className="group relative p-3 rounded-xl bg-white/85 dark:bg-neutral-800/85 backdrop-blur-lg hover:bg-gradient-to-r hover:from-[#395579]/18 hover:via-[#4A6A8A]/12 hover:to-transparent dark:hover:from-[#395579]/25 dark:hover:via-[#4A6A8A]/18 dark:hover:to-transparent hover:shadow-xl hover:shadow-[#395579]/20 transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#395579]/0 via-[#395579]/8 to-[#395579]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative flex items-start gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#2A4461] via-[#395579] to-[#4A6A8A] text-xl shadow-lg shadow-[#395579]/35 group-hover:shadow-xl group-hover:shadow-[#395579]/50 group-hover:scale-105 transition-all duration-300 shrink-0">
                      {etkinlik.kapakGorseli}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm text-neutral-700 dark:text-[#e8f0ff] line-clamp-2 mb-1.5 group-hover:text-[#2A4461] dark:group-hover:text-[#7B99B3] transition-colors duration-300">
                        {etkinlik.baslik}
                      </h4>
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18 group-hover:shadow-sm group-hover:shadow-[#395579]/20 transition-all duration-300 inline-flex w-fit">
                        <MapPin className="w-3 h-3 text-[#395579] group-hover:scale-110 transition-transform" />
                        <span className="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-1">{etkinlik.tarih}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sol Sidebar - Kategoriler (X tarzı sticky) */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto overflow-x-hidden scrollbar-thin space-y-4">
              {/* Kategoriler */}
              <div className="relative bg-gradient-to-br from-[#395579]/12 via-[#4A6A8A]/10 to-[#5A7A9A]/8 dark:from-[#395579]/18 dark:via-[#4A6A8A]/15 dark:to-[#5A7A9A]/12 rounded-3xl p-6 shadow-2xl shadow-[#395579]/12 overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#395579]/8 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#5A7A9A]/12 rounded-full blur-3xl"></div>
                
                <div className="relative flex items-center justify-between gap-3 mb-5 px-2">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-7 bg-gradient-to-b from-[#2A4461] via-[#395579] to-[#4A6A8A] rounded-full shadow-lg shadow-[#395579]/30"></div>
                      <div className="w-1 h-5 bg-gradient-to-b from-[#395579] to-[#5A7A9A] rounded-full opacity-80"></div>
                    </div>
                    {duzenlenecekKutucuk === "kategoriler" ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={geciciKutucukBaslik}
                          onChange={(e) => setGeciciKutucukBaslik(e.target.value)}
                          className="px-3 py-1.5 rounded-lg bg-white/50 dark:bg-neutral-900/50 border-2 border-[#395579]/30 dark:border-[#395579]/40 text-neutral-700 dark:text-neutral-200 text-sm focus:border-[#395579] focus:outline-none transition-all"
                        />
                        <button onClick={handleKutucukDuzenleKaydet} className="p-1.5 rounded-lg bg-gradient-to-br from-[#2A4461] via-[#395579] to-[#4A6A8A] text-white hover:shadow-lg transition-all">
                          <Save className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={handleKutucukDuzenleIptal} className="p-1.5 rounded-lg border border-neutral-400 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <h3 className="text-neutral-700 dark:text-neutral-200">{kutucukBasliklari.kategoriler}</h3>
                    )}
                  </div>
                  {isAdmin && duzenlenecekKutucuk !== "kategoriler" && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleKutucukDuzenleBasla("kategoriler")}
                      className="p-1.5 rounded-lg hover:bg-[#395579]/10 dark:hover:bg-[#395579]/20 transition-colors"
                    >
                      <Edit className="w-4 h-4 text-[#395579] dark:text-[#7B99B3]" />
                    </motion.button>
                  )}
                </div>
                <div className="relative space-y-2.5">
                  {kategoriler.map((kategori) => {
                    const Icon = kategori.icon;
                    const aktif = secilenKategori === kategori.id;
                    return (
                      <motion.button
                        key={kategori.id}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          // Kategori detay panelini aç
                          setKategoriDetayData({ id: kategori.id, isim: kategori.isim });
                          setKategoriDetayAcik(true);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                          aktif
                            ? "bg-gradient-to-r from-[#2A4461] via-[#395579] to-[#4A6A8A] text-white shadow-lg shadow-[#395579]/30"
                            : "bg-white/60 dark:bg-neutral-800/60 hover:bg-gradient-to-r hover:from-[#395579]/15 hover:to-[#4A6A8A]/10 dark:hover:from-[#395579]/20 dark:hover:to-[#4A6A8A]/15 text-neutral-700 dark:text-neutral-300 border border-[#395579]/25 dark:border-[#395579]/35 hover:border-[#395579]/50"
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg ${aktif ? 'bg-white/20' : 'bg-[#395579]/20'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-sm">{kategori.isim}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Hızlı Aksiyonlar */}
              <div className="relative bg-gradient-to-br from-[#395579]/12 via-[#4A6A8A]/10 to-[#5A7A9A]/8 dark:from-[#395579]/18 dark:via-[#4A6A8A]/15 dark:to-[#5A7A9A]/12 rounded-3xl p-6 shadow-2xl shadow-[#395579]/12 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#395579]/8 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#5A7A9A]/12 rounded-full blur-3xl"></div>
                
                <div className="relative flex items-center justify-between gap-3 mb-5 px-2">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-7 bg-gradient-to-b from-[#2A4461] via-[#395579] to-[#4A6A8A] rounded-full shadow-lg shadow-[#395579]/30"></div>
                      <div className="w-1 h-5 bg-gradient-to-b from-[#395579] to-[#5A7A9A] rounded-full opacity-80"></div>
                    </div>
                    {duzenlenecekKutucuk === "hizliAksiyonlar" ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={geciciKutucukBaslik}
                          onChange={(e) => setGeciciKutucukBaslik(e.target.value)}
                          className="px-3 py-1.5 rounded-lg bg-white/50 dark:bg-neutral-900/50 border-2 border-[#395579]/30 dark:border-[#395579]/40 text-neutral-700 dark:text-neutral-200 text-sm focus:border-[#395579] focus:outline-none transition-all"
                        />
                        <button onClick={handleKutucukDuzenleKaydet} className="p-1.5 rounded-lg bg-gradient-to-br from-[#2A4461] via-[#395579] to-[#4A6A8A] text-white hover:shadow-lg transition-all">
                          <Save className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={handleKutucukDuzenleIptal} className="p-1.5 rounded-lg border border-neutral-400 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <h3 className="text-neutral-700 dark:text-neutral-200">{kutucukBasliklari.hizliAksiyonlar}</h3>
                    )}
                  </div>
                  {isAdmin && duzenlenecekKutucuk !== "hizliAksiyonlar" && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleKutucukDuzenleBasla("hizliAksiyonlar")}
                      className="p-1.5 rounded-lg hover:bg-[#395579]/10 dark:hover:bg-[#395579]/20 transition-colors"
                    >
                      <Edit className="w-4 h-4 text-[#395579] dark:text-[#7B99B3]" />
                    </motion.button>
                  )}
                </div>
                
                <div className="relative space-y-3">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setAktifSayfa("yeniBaslik")}
                    className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-gradient-to-r from-[#2A4461] via-[#395579] to-[#4A6A8A] text-white hover:shadow-2xl hover:shadow-[#395579]/40 transition-all duration-300"
                  >
                    <Plus className="w-5 h-5" />
                    <span className="text-sm">Yeni Başlık</span>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setLeaderboardAcik(true)}
                    className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-white/85 dark:bg-neutral-800/85 backdrop-blur-lg text-neutral-700 dark:text-neutral-300 hover:bg-gradient-to-r hover:from-[#395579]/18 hover:via-[#4A6A8A]/12 hover:to-transparent dark:hover:from-[#395579]/25 dark:hover:via-[#4A6A8A]/18 dark:hover:to-transparent hover:shadow-xl hover:shadow-[#395579]/25 transition-all duration-300"
                  >
                    <Trophy className="w-5 h-5 text-[#395579]" />
                    <span className="text-sm">Lider Tablosu</span>
                  </motion.button>

                  {isAdmin && onAdminPaneline && (
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={onAdminPaneline}
                      className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-gradient-to-r from-[#2A4461] via-[#395579] to-[#4A6A8A] text-white hover:shadow-2xl hover:shadow-[#395579]/40 transition-all duration-300"
                    >
                      <Shield className="w-5 h-5" />
                      <span className="text-sm">Admin Paneli</span>
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Platform İstatistikleri - Mobilde Gizli */}
              <div className="hidden lg:block relative bg-gradient-to-br from-[#395579]/12 via-[#4A6A8A]/10 to-[#5A7A9A]/8 dark:from-[#395579]/18 dark:via-[#4A6A8A]/15 dark:to-[#5A7A9A]/12 rounded-3xl p-6 shadow-2xl shadow-[#395579]/12 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#395579]/8 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#5A7A9A]/12 rounded-full blur-3xl"></div>
                
                <div className="relative flex items-center justify-between gap-3 mb-5 px-2">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-7 bg-gradient-to-b from-[#2A4461] via-[#395579] to-[#4A6A8A] rounded-full shadow-lg shadow-[#395579]/30"></div>
                      <div className="w-1 h-5 bg-gradient-to-b from-[#395579] to-[#5A7A9A] rounded-full opacity-80"></div>
                    </div>
                    {duzenlenecekKutucuk === "platformIstatistikleri" ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={geciciKutucukBaslik}
                          onChange={(e) => setGeciciKutucukBaslik(e.target.value)}
                          className="px-3 py-1.5 rounded-lg bg-white/50 dark:bg-neutral-900/50 border-2 border-[#395579]/30 dark:border-[#395579]/40 text-neutral-700 dark:text-neutral-200 text-sm focus:border-[#395579] focus:outline-none transition-all"
                        />
                        <button onClick={handleKutucukDuzenleKaydet} className="p-1.5 rounded-lg bg-gradient-to-br from-[#2A4461] via-[#395579] to-[#4A6A8A] text-white hover:shadow-lg transition-all">
                          <Save className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={handleKutucukDuzenleIptal} className="p-1.5 rounded-lg border border-neutral-400 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <h3 className="text-neutral-700 dark:text-neutral-200">{kutucukBasliklari.platformIstatistikleri}</h3>
                    )}
                  </div>
                  {isAdmin && duzenlenecekKutucuk !== "platformIstatistikleri" && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleKutucukDuzenleBasla("platformIstatistikleri")}
                      className="p-1.5 rounded-lg hover:bg-[#395579]/10 dark:hover:bg-[#395579]/20 transition-colors"
                    >
                      <Edit className="w-4 h-4 text-[#395579] dark:text-[#7B99B3]" />
                    </motion.button>
                  )}
                </div>
                
                <div className="relative space-y-3">
                  {/* Aktif Kullanıcı Sayısı */}
                  <div className="flex items-center justify-between px-4 py-3.5 rounded-2xl bg-white/85 dark:bg-neutral-800/85 backdrop-blur-lg hover:shadow-xl hover:shadow-[#395579]/20 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2A4461] via-[#395579] to-[#4A6A8A] flex items-center justify-center shadow-lg shadow-[#395579]/30">
                        <Activity className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm text-neutral-700 dark:text-neutral-300">Aktif Kullanıcı</span>
                    </div>
                    <span className="text-sm px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 text-neutral-700 dark:text-neutral-200">
                      {Math.floor(Math.random() * 50) + 150}
                    </span>
                  </div>

                  {/* Başlık Sayısı */}
                  <div className="flex items-center justify-between px-4 py-3.5 rounded-2xl bg-white/85 dark:bg-neutral-800/85 backdrop-blur-lg hover:shadow-xl hover:shadow-[#395579]/20 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2A4461] via-[#395579] to-[#4A6A8A] flex items-center justify-center shadow-lg shadow-[#395579]/30">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm text-neutral-700 dark:text-neutral-300">Toplam Başlık</span>
                    </div>
                    <span className="text-sm px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 text-neutral-700 dark:text-neutral-200">
                      {tumBasliklar.length}
                    </span>
                  </div>

                  {/* Yorum Sayısı */}
                  <div className="flex items-center justify-between px-4 py-3.5 rounded-2xl bg-white/85 dark:bg-neutral-800/85 backdrop-blur-lg hover:shadow-xl hover:shadow-[#395579]/20 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2A4461] via-[#395579] to-[#4A6A8A] flex items-center justify-center shadow-lg shadow-[#395579]/30">
                        <MessageSquare className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm text-neutral-700 dark:text-neutral-300">Toplam Yorum</span>
                    </div>
                    <span className="text-sm px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 text-neutral-700 dark:text-neutral-200">
                      {tumBasliklar.reduce((total, baslik) => total + (baslik.yorumlar?.length || 0), 0)}
                    </span>
                  </div>

                  {/* Beğeni Sayısı */}
                  <div className="flex items-center justify-between px-4 py-3.5 rounded-2xl bg-white/85 dark:bg-neutral-800/85 backdrop-blur-lg hover:shadow-xl hover:shadow-[#395579]/20 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2A4461] via-[#395579] to-[#4A6A8A] flex items-center justify-center shadow-lg shadow-[#395579]/30">
                        <ThumbsUp className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm text-neutral-700 dark:text-neutral-300">Toplam Beğeni</span>
                    </div>
                    <span className="text-sm px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 text-neutral-700 dark:text-neutral-200">
                      {tumBasliklar.reduce((total, baslik) => total + baslik.begeni, 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Ana İçerik - Feed (Twitter tarzı: body ile scroll) */}
          <main className="col-span-1 lg:col-span-6">
            <div className="space-y-6 bg-[rgba(0,0,0,0)]">
              {/* Gündemde - Sadece Desktop'ta İlk Sırada */}
              <div className="hidden lg:block relative bg-gradient-to-br from-[#395579]/12 via-[#4A6A8A]/10 to-[#5A7A9A]/8 dark:from-[#395579]/18 dark:via-[#4A6A8A]/15 dark:to-[#5A7A9A]/12 rounded-3xl p-6 shadow-2xl shadow-[#395579]/12 overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#395579]/8 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#5A7A9A]/12 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#4A6A8A]/6 rounded-full blur-2xl"></div>
                
                <div className="relative flex items-center gap-3 mb-6 px-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-9 bg-gradient-to-b from-[#2A4461] via-[#395579] to-[#4A6A8A] rounded-full shadow-lg shadow-[#395579]/30"></div>
                    <div className="w-1.5 h-7 bg-gradient-to-b from-[#395579] to-[#5A7A9A] rounded-full opacity-80"></div>
                    <div className="w-1 h-5 bg-gradient-to-b from-[#4A6A8A] to-[#7B99B3] rounded-full opacity-60"></div>
                    <div className="w-0.5 h-3 bg-[#5A7A9A] rounded-full opacity-40"></div>
                  </div>
                  <h2 className="text-neutral-700 dark:text-neutral-200">Gündemde</h2>
                  <div className="ml-auto flex items-center gap-2.5 bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/20 px-4 py-2 rounded-full backdrop-blur-md shadow-lg shadow-[#395579]/10">
                    <div className="relative flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#395579] shadow-lg shadow-[#395579]/50"></div>
                      <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-[#395579] animate-ping"></div>
                      <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-[#395579] animate-pulse"></div>
                    </div>
                    <Flame className="w-4 h-4 text-[#395579]" />
                  </div>
                </div>
                
                <div className="relative space-y-3">
                  {trendBasliklar.map((baslik, index) => (
                    <motion.div
                      key={baslik.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => {
                        setVurgulananYorumId(null);
                        setSecilenBaslik(baslik);
                      }}
                      className="group relative flex items-start gap-4 p-5 rounded-2xl bg-white/85 dark:bg-neutral-800/85 backdrop-blur-lg hover:bg-gradient-to-r hover:from-[#395579]/18 hover:via-[#4A6A8A]/12 hover:to-transparent dark:hover:from-[#395579]/25 dark:hover:via-[#4A6A8A]/18 dark:hover:to-transparent hover:shadow-2xl hover:shadow-[#395579]/25 transition-all duration-300 cursor-pointer overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#395579]/0 via-[#395579]/8 to-[#395579]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#395579]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#2A4461] via-[#395579] to-[#4A6A8A] text-white shadow-xl shadow-[#395579]/35 group-hover:shadow-2xl group-hover:shadow-[#395579]/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shrink-0">
                        <span className="text-sm">{index + 1}</span>
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      
                      <div className="relative flex-1 min-w-0">
                        <h3 className="text-sm text-neutral-700 dark:text-[#e8f0ff] line-clamp-2 mb-3 group-hover:text-[#2A4461] dark:group-hover:text-[#7B99B3] transition-colors duration-300">
                          {baslik.baslik}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 flex-wrap">
                          <span className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18 group-hover:bg-gradient-to-r group-hover:from-[#395579]/25 group-hover:to-[#4A6A8A]/18 group-hover:shadow-md group-hover:shadow-[#395579]/20 transition-all duration-300">
                            <Eye className="w-3.5 h-3.5 text-[#395579] group-hover:scale-110 transition-transform" />
                            <span className="text-neutral-600 dark:text-neutral-300">{baslik.goruntulenme}</span>
                          </span>
                          <span className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18 group-hover:bg-gradient-to-r group-hover:from-[#395579]/25 group-hover:to-[#4A6A8A]/18 group-hover:shadow-md group-hover:shadow-[#395579]/20 transition-all duration-300">
                            <MessageSquare className="w-3.5 h-3.5 text-[#395579] group-hover:scale-110 transition-transform" />
                            <span className="text-neutral-600 dark:text-neutral-300">{baslik.yorumlar.length}</span>
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => handleBaslikBegen(baslik.id, e)}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-full transition-all duration-300 ${
                              begenilenBasliklar.includes(baslik.id)
                                ? 'bg-[#395579] text-white shadow-md shadow-[#395579]/30'
                                : 'bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18 group-hover:from-[#395579]/25 group-hover:to-[#4A6A8A]/18 group-hover:shadow-md group-hover:shadow-[#395579]/20'
                            }`}
                          >
                            <ThumbsUp className={`w-3.5 h-3.5 transition-transform ${begenilenBasliklar.includes(baslik.id) ? 'text-white scale-110' : 'text-[#395579] group-hover:scale-110'}`} />
                            <span className={begenilenBasliklar.includes(baslik.id) ? 'text-white' : 'text-neutral-600 dark:text-neutral-300'}>
                              {baslik.begeni + (begenilenBasliklar.includes(baslik.id) ? 1 : 0)}
                            </span>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Trend Başlıklar - Always Visible */}
              <div className="relative bg-gradient-to-br from-[#395579]/12 via-[#4A6A8A]/10 to-[#5A7A9A]/8 dark:from-[#395579]/18 dark:via-[#4A6A8A]/15 dark:to-[#5A7A9A]/12 rounded-3xl p-6 shadow-2xl shadow-[#395579]/12 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#395579]/8 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#5A7A9A]/12 rounded-full blur-3xl"></div>
                
                <div className="relative flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#395579]" />
                    {duzenlenecekKutucuk === "trendBasliklar" ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={geciciKutucukBaslik}
                          onChange={(e) => setGeciciKutucukBaslik(e.target.value)}
                          className="px-3 py-1.5 rounded-lg bg-white/50 dark:bg-neutral-900/50 border-2 border-[#395579]/30 dark:border-[#395579]/40 text-neutral-700 dark:text-neutral-200 text-sm focus:border-[#395579] focus:outline-none transition-all"
                        />
                        <button onClick={handleKutucukDuzenleKaydet} className="p-1.5 rounded-lg bg-gradient-to-br from-[#2A4461] via-[#395579] to-[#4A6A8A] text-white hover:shadow-lg transition-all">
                          <Save className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={handleKutucukDuzenleIptal} className="p-1.5 rounded-lg border border-neutral-400 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <h2 className="text-neutral-700 dark:text-neutral-200">{kutucukBasliklari.trendBasliklar}</h2>
                    )}
                  </div>
                  {isAdmin && duzenlenecekKutucuk !== "trendBasliklar" && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleKutucukDuzenleBasla("trendBasliklar")}
                      className="p-1.5 rounded-lg hover:bg-[#395579]/10 dark:hover:bg-[#395579]/20 transition-colors"
                    >
                      <Edit className="w-4 h-4 text-[#395579] dark:text-[#7B99B3]" />
                    </motion.button>
                  )}
                </div>
                
                <div className="relative space-y-3">
                  {[...tumBasliklar]
                    .sort((a, b) => b.begeni - a.begeni)
                    .slice(0, 5)
                    .map((baslik, index) => (
                      <motion.div
                        key={baslik.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => {
                          setVurgulananYorumId(null);
                          setSecilenBaslik(baslik);
                        }}
                        className="group relative flex items-start gap-3 p-4 rounded-2xl bg-white/85 dark:bg-neutral-800/85 backdrop-blur-lg hover:bg-gradient-to-r hover:from-[#395579]/18 hover:via-[#4A6A8A]/12 hover:to-transparent dark:hover:from-[#395579]/25 dark:hover:via-[#4A6A8A]/18 dark:hover:to-transparent hover:shadow-2xl hover:shadow-[#395579]/25 transition-all cursor-pointer overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#395579]/0 via-[#395579]/8 to-[#395579]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#2A4461] via-[#395579] to-[#4A6A8A] text-white text-sm shadow-xl shadow-[#395579]/35 group-hover:shadow-2xl group-hover:shadow-[#395579]/50 group-hover:scale-110 transition-all duration-300 shrink-0">
                          {index + 1}
                        </div>
                        <div className="relative flex-1 min-w-0">
                          <h3 className="text-sm text-neutral-700 dark:text-[#e8f0ff] line-clamp-2 mb-1 group-hover:text-[#2A4461] dark:group-hover:text-[#7B99B3] transition-colors">
                            {baslik.baslik}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 flex-wrap">
                            <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18">
                              <Eye className="w-3 h-3 text-[#395579]" />
                              <span className="text-neutral-600 dark:text-neutral-300">{baslik.goruntulenme}</span>
                            </span>
                            <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18">
                              <MessageSquare className="w-3 h-3 text-[#395579]" />
                              <span className="text-neutral-600 dark:text-neutral-300">{baslik.yorumlar.length}</span>
                            </span>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => handleBaslikBegen(baslik.id, e)}
                              className={`flex items-center gap-1.5 px-2 py-1 rounded-full transition-all ${
                                begenilenBasliklar.includes(baslik.id)
                                  ? 'bg-[#395579] text-white shadow-md shadow-[#395579]/30'
                                  : 'bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18 hover:from-[#395579]/25 hover:to-[#4A6A8A]/15'
                              }`}
                            >
                              <ThumbsUp className={`w-3 h-3 ${begenilenBasliklar.includes(baslik.id) ? 'text-white' : 'text-[#395579]'}`} />
                              <span className={begenilenBasliklar.includes(baslik.id) ? 'text-white' : 'text-neutral-600 dark:text-neutral-300'}>
                                {baslik.begeni + (begenilenBasliklar.includes(baslik.id) ? 1 : 0)}
                              </span>
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>

              {/* Popüler Yorumlar - Always Visible */}
              <div className="relative bg-gradient-to-br from-[#395579]/12 via-[#4A6A8A]/10 to-[#5A7A9A]/8 dark:from-[#395579]/18 dark:via-[#4A6A8A]/15 dark:to-[#5A7A9A]/12 rounded-3xl p-6 shadow-2xl shadow-[#395579]/12 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#395579]/8 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#5A7A9A]/12 rounded-full blur-3xl"></div>
                
                <div className="relative flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[#395579]" />
                    {duzenlenecekKutucuk === "populerYorumlar" ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={geciciKutucukBaslik}
                          onChange={(e) => setGeciciKutucukBaslik(e.target.value)}
                          className="px-3 py-1.5 rounded-lg bg-white/50 dark:bg-neutral-900/50 border-2 border-[#395579]/30 dark:border-[#395579]/40 text-neutral-700 dark:text-neutral-200 text-sm focus:border-[#395579] focus:outline-none transition-all"
                        />
                        <button onClick={handleKutucukDuzenleKaydet} className="p-1.5 rounded-lg bg-gradient-to-br from-[#2A4461] via-[#395579] to-[#4A6A8A] text-white hover:shadow-lg transition-all">
                          <Save className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={handleKutucukDuzenleIptal} className="p-1.5 rounded-lg border border-neutral-400 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <h2 className="text-neutral-700 dark:text-neutral-200">{kutucukBasliklari.populerYorumlar}</h2>
                    )}
                  </div>
                  {isAdmin && duzenlenecekKutucuk !== "populerYorumlar" && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleKutucukDuzenleBasla("populerYorumlar")}
                      className="p-1.5 rounded-lg hover:bg-[#395579]/10 dark:hover:bg-[#395579]/20 transition-colors"
                    >
                      <Edit className="w-4 h-4 text-[#395579] dark:text-[#7B99B3]" />
                    </motion.button>
                  )}
                </div>
                
                <div className="relative space-y-3">
                  {populerYorumlar.map((yorum) => (
                    <motion.div
                      key={yorum.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        const baslik = tumBasliklar.find(b => b.id === yorum.baslikId);
                        if (baslik) {
                          setVurgulananYorumId(yorum.id);
                          setSecilenBaslik(baslik);
                        }
                      }}
                      className="group relative p-3 rounded-2xl bg-white/85 dark:bg-neutral-800/85 backdrop-blur-lg hover:bg-gradient-to-r hover:from-[#395579]/18 hover:via-[#4A6A8A]/12 hover:to-transparent dark:hover:from-[#395579]/25 dark:hover:via-[#4A6A8A]/18 dark:hover:to-transparent hover:shadow-2xl hover:shadow-[#395579]/25 transition-all cursor-pointer overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#395579]/0 via-[#395579]/8 to-[#395579]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="relative flex items-start gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2A4461] via-[#395579] to-[#4A6A8A] flex items-center justify-center text-white text-xs shadow-xl shadow-[#395579]/35 shrink-0">
                          {yorum.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-neutral-700 dark:text-[#e8f0ff]">{yorum.kullanici}</span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-gradient-to-r from-[#2A4461] via-[#395579] to-[#4A6A8A] text-white">
                              <Award className="w-3 h-3" />
                              {yorum.kullaniciRol}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-2 mb-2">
                            {yorum.icerik}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                            <span>{yorum.baslikBaslik}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18">
                              <ThumbsUp className="w-3 h-3 text-[#395579]" />
                              <span className="text-neutral-600 dark:text-neutral-300">{yorum.begeni}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Başlıklar Listesi */}
              <div className="space-y-4">
                {filtrelenmisBasliklar.length === 0 ? (
                  <div className="relative bg-gradient-to-br from-[#395579]/12 via-[#4A6A8A]/10 to-[#5A7A9A]/8 dark:from-[#395579]/18 dark:via-[#4A6A8A]/15 dark:to-[#5A7A9A]/12 rounded-3xl p-12 shadow-2xl shadow-[#395579]/12 text-center overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#395579]/8 rounded-full blur-3xl"></div>
                    <Search className="w-12 h-12 text-[#395579] dark:text-[#7B99B3] mx-auto mb-4" />
                    <h3 className="text-neutral-700 dark:text-neutral-200 mb-2">Başlık bulunamadı</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Arama kriterlerinize uygun başlık bulunmuyor.
                    </p>
                  </div>
                ) : (
                  filtrelenmisBasliklar.map((baslik, index) => (
                    <motion.article
                      key={baslik.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => {
                        setVurgulananYorumId(null);
                        setSecilenBaslik(baslik);
                      }}
                      className="group relative bg-white/85 dark:bg-neutral-800/85 backdrop-blur-lg rounded-3xl p-6 shadow-2xl shadow-[#395579]/12 hover:shadow-[#395579]/25 hover:bg-gradient-to-br hover:from-[#395579]/8 hover:to-transparent dark:hover:from-[#395579]/15 dark:hover:to-transparent transition-all cursor-pointer overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#395579]/0 via-[#395579]/5 to-[#395579]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Header */}
                      <div className="relative flex items-start gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2A4461] via-[#395579] to-[#4A6A8A] flex items-center justify-center text-white text-sm shadow-xl shadow-[#395579]/35 shrink-0">
                          {baslik.yazar.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-sm text-neutral-700 dark:text-[#e8f0ff]">{baslik.yazar}</h3>
                            <span className={`px-2 py-0.5 rounded-full text-xs text-white bg-gradient-to-r ${getRolColor(baslik.yazarRol)}`}>
                              {baslik.yazarRol}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                            <Clock className="w-3 h-3" />
                            <span>{baslik.tarih}</span>
                            <span>•</span>
                            <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18 text-[#395579] dark:text-[#7B99B3]">
                              {baslik.kategori}
                            </span>
                          </div>
                        </div>
                        {/* Düzenleme Butonu - Sadece admin veya başlık sahibi görebilir */}
                        {(isAdmin || baslik.yazar === kullaniciBilgileri.ad) && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setDuzenlenecekBaslik(baslik);
                            }}
                            className="p-2 rounded-lg hover:bg-[#395579]/10 dark:hover:bg-[#395579]/20 transition-colors"
                          >
                            <Edit className="w-4 h-4 text-[#395579] dark:text-[#7B99B3]" />
                          </motion.button>
                        )}
                      </div>

                      {/* Content */}
                      <h2 className="relative text-neutral-700 dark:text-[#e8f0ff] mb-3 group-hover:text-[#2A4461] dark:group-hover:text-[#7B99B3] transition-colors">
                        {baslik.baslik}
                      </h2>
                      <p className="relative text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                        {baslik.icerik}
                      </p>

                      {/* Tags */}
                      {baslik.etiketler && baslik.etiketler.length > 0 && (
                        <div className="relative flex flex-wrap gap-2 mb-4">
                          {baslik.etiketler.map((etiket, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 text-xs rounded-lg bg-gradient-to-r from-[#395579]/10 to-[#4A6A8A]/5 dark:from-[#395579]/20 dark:to-[#4A6A8A]/10 text-neutral-600 dark:text-neutral-400"
                            >
                              #{etiket}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Stats */}
                      <div className="relative flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700">
                        <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                          <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-gradient-to-r from-[#395579]/10 to-[#4A6A8A]/5 dark:from-[#395579]/20 dark:to-[#4A6A8A]/10">
                            <Eye className="w-4 h-4 text-[#395579]" />
                            <span className="text-neutral-600 dark:text-neutral-300">{baslik.goruntulenme}</span>
                          </span>
                          <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-gradient-to-r from-[#395579]/10 to-[#4A6A8A]/5 dark:from-[#395579]/20 dark:to-[#4A6A8A]/10">
                            <MessageSquare className="w-4 h-4 text-[#395579]" />
                            <span className="text-neutral-600 dark:text-neutral-300">{baslik.yorumlar.length}</span>
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => handleBaslikBegen(baslik.id, e)}
                            className={`flex items-center gap-1.5 px-2 py-1 rounded-full transition-all ${
                              begenilenBasliklar.includes(baslik.id)
                                ? 'bg-[#395579] text-white shadow-lg shadow-[#395579]/30'
                                : 'bg-gradient-to-r from-[#395579]/10 to-[#4A6A8A]/5 dark:from-[#395579]/20 dark:to-[#4A6A8A]/10 hover:from-[#395579]/20 hover:to-[#4A6A8A]/10'
                            }`}
                          >
                            <ThumbsUp className={`w-4 h-4 ${begenilenBasliklar.includes(baslik.id) ? 'text-white' : 'text-[#395579]'}`} />
                            <span className={begenilenBasliklar.includes(baslik.id) ? 'text-white' : 'text-neutral-600 dark:text-neutral-300'}>
                              {baslik.begeni + (begenilenBasliklar.includes(baslik.id) ? 1 : 0)}
                            </span>
                          </motion.button>
                        </div>
                        <div className="flex items-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setPaylasilacakBaslik(baslik.baslik);
                              setPaylasmaModalAcik(true);
                            }}
                            className="p-2 rounded-lg hover:bg-[#395579]/10 dark:hover:bg-[#395579]/20 transition-colors"
                          >
                            <Share2 className="w-4 h-4 text-[#395579] dark:text-[#7B99B3]" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBaslikKaydet(baslik);
                              toast.success("Başlık kaydedildi!");
                            }}
                            className="p-2 rounded-lg hover:bg-[#395579]/10 dark:hover:bg-[#395579]/20 transition-colors"
                          >
                            <Bookmark className="w-4 h-4 text-[#395579] dark:text-[#7B99B3]" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.article>
                  ))
                )}
              </div>
            </div>
          </main>

          {/* Sağ Sidebar - Etkinlikler & Kullanıcı Bilgileri (X tarzı sticky) */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto overflow-x-hidden scrollbar-thin space-y-4">
              {/* Kullanıcı Kartı - Mobilde Gizli */}
              <div className="hidden lg:block relative bg-gradient-to-br from-[#395579]/12 via-[#4A6A8A]/10 to-[#5A7A9A]/8 dark:from-[#395579]/18 dark:via-[#4A6A8A]/15 dark:to-[#5A7A9A]/12 rounded-3xl p-6 shadow-2xl shadow-[#395579]/12 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#395579]/8 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#5A7A9A]/12 rounded-full blur-3xl"></div>
                
                <div className="relative flex items-center gap-3 mb-5 pb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2A4461] via-[#395579] to-[#4A6A8A] flex items-center justify-center text-lg shadow-xl shadow-[#395579]/30 text-white">
                    {kullaniciBilgileri.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm text-neutral-700 dark:text-neutral-200">{kullaniciBilgileri.ad}</h3>
                    <p className={`text-xs px-2.5 py-1 rounded-full bg-gradient-to-r ${getRolColor(kullaniciBilgileri.rol)} inline-block mt-1.5 shadow-md`}>
                      {kullaniciBilgileri.rol}
                    </p>
                  </div>
                </div>
                
                <div className="relative space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/60 dark:bg-neutral-800/60 hover:bg-white/70 dark:hover:bg-neutral-800/70 transition-all">
                    <span className="text-sm text-neutral-600 dark:text-neutral-300">Coins</span>
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 text-neutral-700 dark:text-neutral-200">
                      <Coins className="w-4 h-4 text-[#395579]" />
                      <span>{kullaniciBilgileri.coins}</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/60 dark:bg-neutral-800/60 hover:bg-white/70 dark:hover:bg-neutral-800/70 transition-all">
                    <span className="text-sm text-neutral-600 dark:text-neutral-300">Başlıklar</span>
                    <span className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 text-neutral-700 dark:text-neutral-200">
                      {kullaniciBilgileri.baslikSayisi}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/60 dark:bg-neutral-800/60 hover:bg-white/70 dark:hover:bg-neutral-800/70 transition-all">
                    <span className="text-sm text-neutral-600 dark:text-neutral-300">Yorumlar</span>
                    <span className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 text-neutral-700 dark:text-neutral-200">
                      {kullaniciBilgileri.yorumSayisi}
                    </span>
                  </div>
                </div>
              </div>

              {/* Yaklaşan Etkinlikler - Mobilde Gizli */}
              <div className="hidden lg:block relative bg-gradient-to-br from-[#395579]/12 via-[#4A6A8A]/10 to-[#5A7A9A]/8 dark:from-[#395579]/18 dark:via-[#4A6A8A]/15 dark:to-[#5A7A9A]/12 rounded-3xl p-6 shadow-2xl shadow-[#395579]/12 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#395579]/8 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#5A7A9A]/12 rounded-full blur-3xl"></div>
                
                <div className="relative flex items-center gap-3 mb-5 px-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-7 bg-gradient-to-b from-[#2A4461] via-[#395579] to-[#4A6A8A] rounded-full shadow-lg shadow-[#395579]/30"></div>
                    <div className="w-1 h-5 bg-gradient-to-b from-[#395579] to-[#5A7A9A] rounded-full opacity-80"></div>
                  </div>
                  <h3 className="text-neutral-700 dark:text-neutral-200">Yaklaşan Etkinlikler</h3>
                  <div className="ml-auto">
                    <CalendarDays className="w-5 h-5 text-[#395579]" />
                  </div>
                </div>
                
                <div className="relative space-y-3">
                  {tumEtkinlikler.map((etkinlik, index) => (
                    <motion.div
                      key={etkinlik.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSecilenEtkinlik(etkinlik)}
                      className="group relative p-4 rounded-2xl bg-white/85 dark:bg-neutral-800/85 backdrop-blur-lg hover:bg-gradient-to-r hover:from-[#395579]/18 hover:via-[#4A6A8A]/12 hover:to-transparent dark:hover:from-[#395579]/25 dark:hover:via-[#4A6A8A]/18 dark:hover:to-transparent hover:shadow-2xl hover:shadow-[#395579]/25 transition-all duration-300 cursor-pointer overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#395579]/0 via-[#395579]/8 to-[#395579]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="relative flex items-start gap-3">
                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#2A4461] via-[#395579] to-[#4A6A8A] text-2xl shadow-xl shadow-[#395579]/35 group-hover:shadow-2xl group-hover:shadow-[#395579]/50 group-hover:scale-110 transition-all duration-300 shrink-0">
                          {etkinlik.kapakGorseli}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm text-neutral-700 dark:text-[#e8f0ff] line-clamp-2 mb-2 group-hover:text-[#2A4461] dark:group-hover:text-[#7B99B3] transition-colors duration-300">
                            {etkinlik.baslik}
                          </h4>
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18 group-hover:shadow-md group-hover:shadow-[#395579]/20 transition-all duration-300 inline-flex w-fit">
                            <Clock className="w-3.5 h-3.5 text-[#395579] group-hover:scale-110 transition-transform" />
                            <span className="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-1">{etkinlik.tarih}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Sosyal Sorumluluk Etkinlikleri - Mobilde Gizli */}
              <div className="hidden lg:block relative bg-gradient-to-br from-[#395579]/12 via-[#4A6A8A]/10 to-[#5A7A9A]/8 dark:from-[#395579]/18 dark:via-[#4A6A8A]/15 dark:to-[#5A7A9A]/12 rounded-3xl p-6 shadow-2xl shadow-[#395579]/12 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#395579]/8 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#5A7A9A]/12 rounded-full blur-3xl"></div>
                
                <div className="relative flex items-center gap-3 mb-5 px-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-7 bg-gradient-to-b from-[#2A4461] via-[#395579] to-[#4A6A8A] rounded-full shadow-lg shadow-[#395579]/30"></div>
                    <div className="w-1 h-5 bg-gradient-to-b from-[#395579] to-[#5A7A9A] rounded-full opacity-80"></div>
                  </div>
                  <h3 className="text-neutral-700 dark:text-neutral-200">Sosyal Sorumluluk</h3>
                  <span className="ml-auto flex items-center gap-1 text-xs bg-gradient-to-r from-[#395579] to-[#4A6A8A] text-white px-3 py-1.5 rounded-full shadow-lg shadow-[#395579]/30">
                    <Coins className="w-3.5 h-3.5" />
                    2x Coin
                  </span>
                </div>
                
                <div className="relative space-y-3">
                  {sosyalSorumlulukEtkinlikleri.map((etkinlik, index) => (
                    <motion.div
                      key={etkinlik.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSecilenEtkinlik(etkinlik)}
                      className="group relative p-4 rounded-2xl bg-white/85 dark:bg-neutral-800/85 backdrop-blur-lg hover:bg-gradient-to-r hover:from-[#395579]/18 hover:via-[#4A6A8A]/12 hover:to-transparent dark:hover:from-[#395579]/25 dark:hover:via-[#4A6A8A]/18 dark:hover:to-transparent hover:shadow-2xl hover:shadow-[#395579]/25 transition-all duration-300 cursor-pointer overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#395579]/0 via-[#395579]/8 to-[#395579]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="relative flex items-start gap-3">
                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#2A4461] via-[#395579] to-[#4A6A8A] text-2xl shadow-xl shadow-[#395579]/35 group-hover:shadow-2xl group-hover:shadow-[#395579]/50 group-hover:scale-110 transition-all duration-300 shrink-0">
                          {etkinlik.kapakGorseli}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm text-neutral-700 dark:text-[#e8f0ff] line-clamp-2 mb-2 group-hover:text-[#2A4461] dark:group-hover:text-[#7B99B3] transition-colors duration-300">
                            {etkinlik.baslik}
                          </h4>
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18 group-hover:shadow-md group-hover:shadow-[#395579]/20 transition-all duration-300 inline-flex w-fit">
                            <MapPin className="w-3.5 h-3.5 text-[#395579] group-hover:scale-110 transition-transform" />
                            <span className="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-1">{etkinlik.tarih}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>
          </aside>
        </div>
      </div>
    );
  };

  // Ana render - Header her zaman görünür
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#fcedd3]/10 to-white dark:from-neutral-950 dark:via-[#102a6b]/20 dark:to-neutral-950">
      {/* Header - Her Sayfada Görünür */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Kategoriler Menü Butonu - Sadece Mobilde */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setKategoriDrawerAcik(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <Menu className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
            </motion.button>

            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => setAktifSayfa("anasayfa")}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1d2633] via-[#28374a] to-[#344556] flex items-center justify-center shadow-lg relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#3d4f66]/50 via-transparent to-[#5a7a8f]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <BookOpen className="w-5 h-5 text-white drop-shadow-lg relative z-10" />
              </div>
              <div className="hidden md:block">
                <h1 className="text-lg bg-gradient-to-r from-[#1d2633] to-[#28374a] dark:from-[#3d4f66] dark:to-[#4d5f76] bg-clip-text text-transparent">
                  WikiSözlük
                </h1>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">Öğrenci Platformu</p>
              </div>
            </div>

            {/* Arama Çubuğu - Orta */}
            <div className="flex-1 max-w-xl hidden sm:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Başlık veya içerik ara..."
                  value={aramaTerimi}
                  onChange={(e) => setAramaTerimi(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && aramaTerimi.trim()) {
                      handleSearch(aramaTerimi);
                    }
                  }}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-[#28374a] dark:focus:border-[#3d4f66] focus:outline-none transition-all text-sm text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400"
                />
                {aramaTerimi && (
                  <button
                    onClick={() => setAramaTerimi("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                
                {/* Arama Sonuçları Dropdown */}
                {aramaTerimi && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-neutral-800 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 shadow-2xl max-h-96 overflow-y-auto z-50">
                    {tumBasliklar
                      .filter((baslik) =>
                        baslik.baslik.toLowerCase().includes(aramaTerimi.toLowerCase()) ||
                        baslik.icerik.toLowerCase().includes(aramaTerimi.toLowerCase())
                      )
                      .slice(0, 8)
                      .map((baslik) => (
                        <div
                          key={baslik.id}
                          onClick={() => {
                            setSecilenBaslik(baslik);
                            setAramaTerimi("");
                          }}
                          className="p-3 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer border-b border-neutral-100 dark:border-neutral-700 last:border-b-0 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2A4461] via-[#395579] to-[#4A6A8A] flex items-center justify-center text-white text-xs shrink-0">
                              {baslik.yazar.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm text-neutral-800 dark:text-neutral-100 line-clamp-1 mb-1">
                                {baslik.baslik}
                              </h4>
                              <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-1">
                                {baslik.icerik}
                              </p>
                              <div className="flex items-center gap-2 mt-1.5">
                                <span className="text-xs text-neutral-500 dark:text-neutral-500">
                                  {baslik.yazar}
                                </span>
                                <span className="text-xs text-neutral-400">•</span>
                                <span className="text-xs text-neutral-500 dark:text-neutral-500">
                                  {baslik.tarih}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    
                    {tumBasliklar.filter((baslik) =>
                      baslik.baslik.toLowerCase().includes(aramaTerimi.toLowerCase()) ||
                      baslik.icerik.toLowerCase().includes(aramaTerimi.toLowerCase())
                    ).length === 0 && (
                      <div className="p-6 text-center text-neutral-500 dark:text-neutral-400">
                        <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Sonuç bulunamadı</p>
                      </div>
                    )}
                    
                    {tumBasliklar.filter((baslik) =>
                      baslik.baslik.toLowerCase().includes(aramaTerimi.toLowerCase()) ||
                      baslik.icerik.toLowerCase().includes(aramaTerimi.toLowerCase())
                    ).length > 0 && (
                      <div className="p-2 text-center border-t border-neutral-200 dark:border-neutral-700">
                        <button
                          onClick={() => handleSearch(aramaTerimi)}
                          className="text-sm text-[#395579] dark:text-[#7B99B3] hover:underline"
                        >
                          Tüm sonuçları gör ({tumBasliklar.filter((baslik) =>
                            baslik.baslik.toLowerCase().includes(aramaTerimi.toLowerCase()) ||
                            baslik.icerik.toLowerCase().includes(aramaTerimi.toLowerCase())
                          ).length})
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Sağ Menü */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Arama Butonu - Sadece Mobilde */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobilAramaAcik(true)}
                className="sm:hidden p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <Search className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
              </motion.button>

              {/* Liderlik Tablosu - Sadece Mobilde */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLeaderboardAcik(true)}
                className="sm:hidden p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <Trophy className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
              </motion.button>

              {/* Admin Panel Butonu - Sadece adminler için */}
              {isAdmin && onAdminPaneline && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onAdminPaneline}
                  className="p-2 rounded-xl bg-gradient-to-r from-[#1d2633] to-[#28374a] hover:shadow-lg transition-all"
                  title="Admin Paneline Dön"
                >
                  <Shield className="w-5 h-5 text-white" />
                </motion.button>
              )}

              {/* Bildirimler */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setBildirimlerAcik(!bildirimlerAcik)}
                  className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors relative"
                >
                  <Bell className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                  {okunmamisBildirimSayisi > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </motion.button>
              </div>

              {/* Profil */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setAktifSayfa("profil")}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-[#1d2633] to-[#28374a] dark:from-[#28374a] dark:to-[#3d4f66] text-white hover:shadow-lg transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm">
                  {kullaniciBilgileri.avatar}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-xs opacity-90">{kullaniciBilgileri.ad}</p>
                  <p className="text-xs opacity-70">{kullaniciBilgileri.coins} 🪙</p>
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Bildirim Paneli */}
      <AnimatePresence>
        {bildirimlerAcik && (
          <BildirimPaneli
            onClose={() => setBildirimlerAcik(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobil Arama Modal */}
      <AnimatePresence>
        {mobilAramaAcik && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobilAramaAcik(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 sm:hidden"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 right-0 bg-white dark:bg-neutral-900 shadow-2xl z-50 sm:hidden p-4"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setMobilAramaAcik(false)}
                    className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors shrink-0"
                  >
                    <X className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                  </button>
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Başlık veya içerik ara..."
                      value={aramaTerimi}
                      onChange={(e) => setAramaTerimi(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && aramaTerimi.trim()) {
                          handleSearch(aramaTerimi);
                        }
                      }}
                      autoFocus
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-[#28374a] dark:focus:border-[#3d4f66] focus:outline-none transition-all text-sm text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400"
                    />
                    {aramaTerimi && (
                      <button
                        onClick={() => setAramaTerimi("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Geçmiş ve Sık Arananlar */}
                {!aramaTerimi && (
                  <div className="space-y-4 px-4">
                    {/* Geçmiş Aramalar */}
                    {gecmisAramalar.length > 0 && (
                      <div>
                        <h3 className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">Geçmiş Aramalar</h3>
                        <div className="space-y-1">
                          {gecmisAramalar.map((arama, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group"
                            >
                              <button
                                onClick={() => handleSearch(arama)}
                                className="flex items-center gap-2 flex-1 text-left"
                              >
                                <Clock className="w-4 h-4 text-neutral-400" />
                                <span className="text-sm text-neutral-700 dark:text-neutral-300">{arama}</span>
                              </button>
                              <button
                                onClick={() => removeGecmisArama(arama)}
                                className="p-1 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="w-3.5 h-3.5 text-neutral-500" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Sık Arananlar */}
                    <div>
                      <h3 className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">Sık Arananlar</h3>
                      <div className="flex flex-wrap gap-2">
                        {sikArananlar.map((arama, index) => (
                          <button
                            key={index}
                            onClick={() => handleSearch(arama)}
                            className="px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-[#28374a] dark:hover:bg-[#3d4f66] hover:text-white text-sm text-neutral-700 dark:text-neutral-300 transition-colors"
                          >
                            {arama}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Arama Sonuçları */}
                {aramaTerimi && (
                  <div className="px-4 max-h-96 overflow-y-auto">
                    <h3 className="text-xs text-neutral-500 dark:text-neutral-400 mb-3">
                      Arama Sonuçları ({filtrelenmisBasliklar.length})
                    </h3>
                    {filtrelenmisBasliklar.length === 0 ? (
                      <div className="text-center py-8">
                        <Search className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto mb-3" />
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">Sonuç bulunamadı</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {filtrelenmisBasliklar.map((baslik) => (
                          <div
                            key={baslik.id}
                            onClick={() => {
                              setSecilenBaslik(baslik);
                              setMobilAramaAcik(false);
                              setAramaTerimi("");
                            }}
                            className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 hover:bg-[#28374a]/10 dark:hover:bg-[#3d4f66]/20 border border-neutral-200 dark:border-neutral-700 cursor-pointer transition-all"
                          >
                            <h4 className="text-sm text-neutral-800 dark:text-neutral-200 mb-1 line-clamp-2">
                              {baslik.baslik}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                              <span className="px-2 py-0.5 rounded-md bg-[#28374a]/10 dark:bg-[#3d4f66]/20">
                                {baslik.kategori}
                              </span>
                              <span>•</span>
                              <span>{baslik.yazar}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Kategoriler Drawer - Mobil */}
      <AnimatePresence>
        {kategoriDrawerAcik && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setKategoriDrawerAcik(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-white dark:bg-[#2A4461] shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-[#395579] to-[#4A6A8A] p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Filter className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-white">Kategoriler</h2>
                    <p className="text-white/80 text-xs">İçerikleri filtrele</p>
                  </div>
                </div>
                <button
                  onClick={() => setKategoriDrawerAcik(false)}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Kategoriler Listesi */}
              <div className="p-4 space-y-2">
                {kategoriler.map((kategori) => {
                  const Icon = kategori.icon;
                  const aktif = secilenKategori === kategori.id;
                  return (
                    <motion.button
                      key={kategori.id}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        // Kategori detay panelini aç
                        setKategoriDetayData({ id: kategori.id, isim: kategori.isim });
                        setKategoriDetayAcik(true);
                        setKategoriDrawerAcik(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        aktif
                          ? "bg-gradient-to-r from-[#2A4461] via-[#395579] to-[#4A6A8A] text-white shadow-lg shadow-[#395579]/30"
                          : "bg-neutral-50 dark:bg-[#395579]/20 hover:bg-gradient-to-r hover:from-[#395579]/15 hover:to-[#4A6A8A]/10 text-neutral-700 dark:text-neutral-200 border border-[#395579]/25 hover:border-[#395579]/50"
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg ${aktif ? 'bg-white/20' : 'bg-[#395579]/20'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm">{kategori.isim}</span>
                      {aktif && (
                        <div className="ml-auto w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Alt Bilgi */}
              <div className="p-4 mt-4 border-t border-[#4A6A8A]/30">
                <div className="p-3 bg-[#7B99B3]/10 dark:bg-[#4A6A8A]/20 rounded-xl">
                  <p className="text-xs text-[#395579] dark:text-neutral-200 text-center">
                    Kategorilere göre içerikleri filtreleyebilirsiniz
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Sayfa İçeriği */}
      <div>
        {renderSayfaIcerigi()}
      </div>

      {/* Leaderboard Modal */}
      <AnimatePresence>
        {leaderboardAcik && (
          <Leaderboard
            onClose={() => setLeaderboardAcik(false)}
            onKullaniciClick={(kullanici) => {
              setSecilenKullanici(kullanici);
            }}
          />
        )}
      </AnimatePresence>

      {/* Kategori Detay Paneli */}
      <AnimatePresence>
        {kategoriDetayAcik && kategoriDetayData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setKategoriDetayAcik(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-[#1d2633] to-[#28374a] text-white px-6 py-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  {(() => {
                    const kategori = kategoriler.find(k => k.id === kategoriDetayData.id);
                    const Icon = kategori?.icon || Home;
                    return <Icon className="w-6 h-6" />;
                  })()}
                  <h2 className="text-xl">{kategoriDetayData.isim}</h2>
                </div>
                <button
                  onClick={() => setKategoriDetayAcik(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6">
                {(() => {
                  // Kategori bilgilerini al - düzenlenmiş versiyonu varsa onu kullan
                  const kategoriBilgi = duzenlemeMetnleri[kategoriDetayData.id] || kategoriBilgileri[kategoriDetayData.id] || kategoriBilgileri.tumu;
                  
                  // Kategoriye göre başlıkları filtrele
                  let kategoriyeAitBasliklar = tumBasliklar.filter(baslik => {
                    if (kategoriDetayData.id === "tumu") return true;
                    // Kategori isimlerini karşılaştır
                    return baslik.kategori.toLowerCase().includes(kategoriDetayData.id.toLowerCase()) ||
                           kategoriDetayData.isim.toLowerCase().includes(baslik.kategori.toLowerCase());
                  });
                  
                  // Hashtag filtrelemesi
                  if (secilenHashtag) {
                    const hashtagSuz = secilenHashtag.replace('#', '').toLowerCase();
                    kategoriyeAitBasliklar = kategoriyeAitBasliklar.filter(baslik => {
                      const baslikEtiketleri = baslik.etiketler?.map(e => e.toLowerCase()) || [];
                      const baslikMetni = `${baslik.baslik} ${baslik.icerik}`.toLowerCase();
                      return baslikEtiketleri.includes(hashtagSuz) || baslikMetni.includes(hashtagSuz);
                    });
                  }

                  return (
                    <div className="space-y-6">
                      {/* Kategori Açıklama */}
                      <div className="bg-gradient-to-br from-[#1d2633]/10 to-[#28374a]/10 dark:from-[#1d2633]/20 dark:to-[#28374a]/20 rounded-2xl p-6 border border-[#28374a]/20">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1d2633] to-[#28374a] flex items-center justify-center shrink-0">
                            {(() => {
                              const kategori = kategoriler.find(k => k.id === kategoriDetayData.id);
                              const Icon = kategori?.icon || Home;
                              return <Icon className="w-5 h-5 text-white" />;
                            })()}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-neutral-900 dark:text-white">Bu Kategori Hakkında</h3>
                              {isAdmin && duzenlenecekKategori !== kategoriDetayData.id && (
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleKategoriDuzenleBasla(kategoriDetayData.id)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#1d2633] to-[#28374a] text-white text-xs hover:shadow-lg transition-all"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                  Düzenle
                                </motion.button>
                              )}
                            </div>
                            
                            {duzenlenecekKategori === kategoriDetayData.id ? (
                              <div className="space-y-3">
                                <textarea
                                  value={geciciAciklama}
                                  onChange={(e) => setGeciciAciklama(e.target.value)}
                                  className="w-full px-4 py-3 rounded-xl border-2 border-[#28374a] dark:border-[#3d4f66] bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#28374a] dark:focus:ring-[#3d4f66] resize-none"
                                  rows={4}
                                  placeholder="Kategori açıklamasını yazın..."
                                />
                                <div className="flex items-center gap-2">
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleKategoriDuzenleKaydet}
                                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#1d2633] to-[#28374a] text-white text-sm hover:shadow-lg transition-all"
                                  >
                                    Kaydet
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleKategoriDuzenleIptal}
                                    className="px-4 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-all"
                                  >
                                    İptal
                                  </motion.button>
                                </div>
                              </div>
                            ) : (
                              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                {duzenlemeMetnleri[kategoriDetayData.id]?.aciklama || kategoriBilgi.aciklama}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Hashtag Filtreleme */}
                      <div className="bg-white dark:bg-neutral-800 rounded-2xl p-5 border border-neutral-200 dark:border-neutral-700">
                        <div className="flex items-center gap-2 mb-4">
                          <Filter className="w-4 h-4 text-[#28374a] dark:text-[#7B99B3]" />
                          <h3 className="text-sm text-neutral-900 dark:text-white">Etiketlere Göre Filtrele</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {/* Tümünü Göster Butonu */}
                          <button
                            onClick={() => setSecilenHashtag(null)}
                            className={`px-4 py-2 rounded-full text-sm transition-all ${
                              secilenHashtag === null
                                ? 'bg-gradient-to-r from-[#1d2633] to-[#28374a] text-white shadow-lg'
                                : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                            }`}
                          >
                            Tümü
                          </button>
                          {kategoriBilgi.hashtags.map((hashtag) => (
                            <button
                              key={hashtag}
                              onClick={() => setSecilenHashtag(hashtag === secilenHashtag ? null : hashtag)}
                              className={`px-4 py-2 rounded-full text-sm transition-all ${
                                secilenHashtag === hashtag
                                  ? 'bg-gradient-to-r from-[#1d2633] to-[#28374a] text-white shadow-lg'
                                  : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                              }`}
                            >
                              {hashtag}
                            </button>
                          ))}
                        </div>
                        {secilenHashtag && (
                          <div className="mt-3 flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                            <span className="inline-flex items-center gap-1.5 bg-[#1d2633]/10 dark:bg-[#1d2633]/30 px-3 py-1.5 rounded-full">
                              <span>{secilenHashtag}</span>
                              <button 
                                onClick={() => setSecilenHashtag(null)}
                                className="hover:text-[#28374a] dark:hover:text-white transition-colors"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </span>
                            <span>filtresi aktif</span>
                          </div>
                        )}
                      </div>

                      {/* İçerik Listesi */}
                      {kategoriyeAitBasliklar.length === 0 ? (
                        <div className="text-center py-12">
                          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#1d2633]/10 to-[#28374a]/10 flex items-center justify-center">
                            <FileText className="w-10 h-10 text-[#28374a]/50" />
                          </div>
                          <p className="text-neutral-500 dark:text-neutral-400">
                            {secilenHashtag 
                              ? `${secilenHashtag} etiketine sahip içerik bulunamadı.`
                              : 'Bu kategoride henüz içerik bulunmuyor.'
                            }
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                      {kategoriyeAitBasliklar.map((baslik) => (
                        <motion.div
                          key={baslik.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden hover:shadow-lg transition-shadow"
                        >
                          {/* Başlık Kartı */}
                          <div
                            onClick={() => {
                              setSecilenBaslik(baslik);
                              setKategoriDetayAcik(false);
                            }}
                            className="p-5 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <h3 className="flex-1 text-lg text-neutral-900 dark:text-white pr-4">
                                {baslik.baslik}
                              </h3>
                              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#1d2633] to-[#28374a] text-white text-xs whitespace-nowrap">
                                {baslik.kategori}
                              </span>
                            </div>
                            
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                              {baslik.icerik}
                            </p>

                            <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400 mb-4">
                              <span className="flex items-center gap-1">
                                <User className="w-3.5 h-3.5" />
                                {baslik.yazar}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {baslik.tarih}
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="w-3.5 h-3.5" />
                                {baslik.goruntulenme}
                              </span>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => handleBaslikBegen(baslik.id, e)}
                                className={`flex items-center gap-1 px-2 py-0.5 rounded-full transition-all ${
                                  begenilenBasliklar.includes(baslik.id)
                                    ? 'bg-[#395579] text-white'
                                    : 'hover:bg-[#395579]/10'
                                }`}
                              >
                                <ThumbsUp className={`w-3.5 h-3.5 ${begenilenBasliklar.includes(baslik.id) ? 'text-white' : ''}`} />
                                {baslik.begeni + (begenilenBasliklar.includes(baslik.id) ? 1 : 0)}
                              </motion.button>
                            </div>
                          </div>

                          {/* Yorumlar Bölümü */}
                          {baslik.yorumlar && baslik.yorumlar.length > 0 && (
                            <div className="border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/50 px-5 py-4">
                              <div className="flex items-center gap-2 mb-3">
                                <MessageSquare className="w-4 h-4 text-[#28374a]" />
                                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                                  {baslik.yorumlar.length} Yorum
                                </span>
                              </div>
                              
                              <div className="space-y-3">
                                {baslik.yorumlar.slice(0, 3).map((yorum) => (
                                  <div
                                    key={yorum.id}
                                    className="bg-white dark:bg-neutral-800 rounded-xl p-3 border border-neutral-200 dark:border-neutral-700"
                                  >
                                    <div className="flex items-start gap-3">
                                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1d2633] to-[#28374a] flex items-center justify-center text-white text-xs shrink-0">
                                        {yorum.avatar}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                          <span className="text-sm text-neutral-900 dark:text-white">
                                            {yorum.kullanici}
                                          </span>
                                          <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                            {yorum.tarih}
                                          </span>
                                        </div>
                                        <p className="text-sm text-neutral-700 dark:text-neutral-300">
                                          {yorum.icerik}
                                        </p>
                                        <div className="flex items-center gap-2 mt-2">
                                          <button className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400 hover:text-[#28374a] dark:hover:text-white transition-colors">
                                            <ThumbsUp className="w-3 h-3" />
                                            {yorum.begeni}
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                                
                                {baslik.yorumlar.length > 3 && (
                                  <button
                                    onClick={() => {
                                      setSecilenBaslik(baslik);
                                      setKategoriDetayAcik(false);
                                    }}
                                    className="w-full py-2 text-sm text-[#28374a] dark:text-[#7B99B3] hover:underline"
                                  >
                                    Tüm yorumları gör ({baslik.yorumlar.length})
                                  </button>
                                )}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      ))}
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Kullanıcı Profil Sayfası - Modal Panel */}
      <AnimatePresence>
        {secilenKullanici && (
          <KullaniciProfilSayfasi
            kullanici={secilenKullanici}
            onGeriDon={() => {
              setSecilenKullanici(null);
            }}
            onBaslikClick={(baslikId, kategori) => {
              const baslik = tumBasliklar.find(b => b.id === baslikId);
              if (baslik) {
                setSecilenBaslik(baslik);
                setSecilenKullanici(null);
              }
            }}
          />
        )}
      </AnimatePresence>

      {/* Paylaşma Modal */}
      <AnimatePresence>
        {paylasmaModalAcik && (
          <PaylasmaModal
            onClose={() => setPaylasmaModalAcik(false)}
            baslikAdi={paylasilacakBaslik}
          />
        )}
      </AnimatePresence>

      {/* FAB - Yeni Başlık Ekle (Mobil) */}
      {aktifSayfa === "anasayfa" && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setAktifSayfa("yeniBaslik")}
          className="fixed bottom-6 right-6 lg:hidden w-14 h-14 rounded-full bg-gradient-to-r from-[#395579] to-[#4A6A8A] text-white shadow-2xl shadow-[#395579]/50 flex items-center justify-center z-40"
        >
          <Plus className="w-6 h-6" />
        </motion.button>
      )}

      {/* Başlık Düzenleme Modalı */}
      <AnimatePresence>
        {duzenlenecekBaslik && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setDuzenlenecekBaslik(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-[#395579]/20 dark:border-[#395579]/30 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2A4461] via-[#395579] to-[#4A6A8A] flex items-center justify-center shadow-lg shadow-[#395579]/30">
                    <Edit className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl text-[#2A4461] dark:text-[#e8f0ff]">Başlığı Düzenle</h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Başlık bilgilerini güncelleyin</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setDuzenlenecekBaslik(null)}
                  className="p-2 rounded-xl hover:bg-[#395579]/10 dark:hover:bg-[#395579]/20 transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-500" />
                </motion.button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-[#395579] dark:text-[#7B99B3] mb-2">
                    Başlık
                  </label>
                  <input
                    type="text"
                    value={editBaslik}
                    onChange={(e) => setEditBaslik(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#395579]/30 dark:border-[#395579]/40 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#395579] transition-all"
                    placeholder="Başlık giriniz..."
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#395579] dark:text-[#7B99B3] mb-2">
                    İçerik
                  </label>
                  <textarea
                    value={editIcerik}
                    onChange={(e) => setEditIcerik(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#395579]/30 dark:border-[#395579]/40 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#395579] transition-all resize-none"
                    placeholder="İçerik giriniz..."
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#395579] dark:text-[#7B99B3] mb-2">
                    Kategori
                  </label>
                  <select
                    value={editKategori}
                    onChange={(e) => setEditKategori(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#395579]/30 dark:border-[#395579]/40 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#395579] transition-all"
                  >
                    <option value="Akademik Destek">Akademik Destek</option>
                    <option value="Sosyal Yaşam">Sosyal Yaşam</option>
                    <option value="Keşif Rehberi">Keşif Rehberi</option>
                    <option value="Kariyer">Kariyer</option>
                    <option value="Etkinlikler">Etkinlikler</option>
                    <option value="Diğer">Diğer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-[#395579] dark:text-[#7B99B3] mb-2">
                    Etiketler (virgülle ayırın)
                  </label>
                  <input
                    type="text"
                    value={editEtiketler}
                    onChange={(e) => setEditEtiketler(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#395579]/30 dark:border-[#395579]/40 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#395579] transition-all"
                    placeholder="etiket1, etiket2, etiket3"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 mt-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBaslikDuzenleKaydet}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#2A4461] via-[#395579] to-[#4A6A8A] text-white hover:shadow-xl hover:shadow-[#395579]/50 transition-all"
                >
                  <Save className="w-5 h-5" />
                  Kaydet
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setDuzenlenecekBaslik(null)}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-neutral-400 dark:border-neutral-600 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
                >
                  <X className="w-5 h-5" />
                  İptal
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Çıkış Onay Dialogu */}
      <AnimatePresence>
        {cikisOnayDialogu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setCikisOnayDialogu(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-800 p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
                  <LogOut className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl text-[#102a6b] dark:text-[#e8f0ff] mb-2">Çıkış yapmak istediğinize emin misiniz?</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Tüm oturum bilgileriniz temizlenecektir.</p>
              </div>
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCikisOnayDialogu(false)}
                  className="flex-1 px-6 py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
                >
                  İptal
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCikisOnayla}
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg transition-all"
                >
                  Çıkış Yap
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-16 border-t-4 border-[#cea273] mt-8">
        <div className="container mx-auto px-4">
          {/* Logo */}
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white mb-2">WikiSözlük</h2>
            <p className="text-neutral-400 text-sm">Öğrenci Bilgi Paylaşım Platformu</p>
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
              © {new Date().getFullYear()} WikiSözlük. Tüm hakları saklıdır.
            </p>
            <p className="text-neutral-500 text-xs mt-2">
              Öğrenciler tarafından, öğrenciler için.
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
                        <p className="text-sm text-neutral-500">v2.0.0</p>
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
                          <a href="mailto:destek@wikisozluk.com" className="text-neutral-900 dark:text-white font-medium hover:text-[#395579]">destek@wikisozluk.com</a>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
                        <div className="w-12 h-12 rounded-full bg-[#395579] flex items-center justify-center">
                          <Phone className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">Telefon</p>
                          <a href="tel:+902121234567" className="text-neutral-900 dark:text-white font-medium hover:text-[#395579]">+90 (212) 123 45 67</a>
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
                      { q: "Rozet sistemı nasıl çalışır?", a: "Toplam coin miktarınıza göre otomatik olarak rozet seviyeniz belirlenir. Her rozet farklı ayrıcalıklar sunar." },
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
                    <p>KVKK kapsamında verilerinize erişim, düzeltme ve silme haklarına sahipsiniz. destek@wikisozluk.com adresinden talepte bulunabilirsiniz.</p>
                  </div>
                )}

                {/* Yardım */}
                {footerModal === "yardim" && (
                  <div className="space-y-4">
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">Yardıma mı ihtiyacınız var? Aşağıdaki kanallardan bize ulaşabilirsiniz.</p>
                    <div className="grid gap-3">
                      <a href="mailto:destek@wikisozluk.com" className="flex items-center gap-3 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
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
