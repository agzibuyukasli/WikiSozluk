import { Anasayfa1 } from "./components/anasayfa1";
import { GirisPaneli } from "./components/GirisPaneli";
import { KayitPaneli } from "./components/KayitPaneli";
import { AdminGirisPaneli } from "./components/AdminGirisPaneli";
import { AdminPaneli } from "./components/AdminPaneli";
import { Toaster } from "sonner@2.0.3";
import { useEffect, useState } from "react";

type Sayfa = "giris" | "kayit" | "adminGiris" | "anasayfa" | "adminPanel";
type KullaniciTipi = "kullanici" | "admin" | "misafir" | null;

export default function App() {
  const [aktifSayfa, setAktifSayfa] = useState<Sayfa>("giris");
  const [kullaniciTipi, setKullaniciTipi] = useState<KullaniciTipi>(null);
  const [onaylananOneriler, setOnaylananOneriler] = useState<number[]>([]);

  // Admin kullanıcı bilgileri
  const adminKullaniciBilgileri = {
    ad: "Admin",
    rol: "Yönetici",
    coins: 999999,
    avatar: "🛡️",
    baslikSayisi: 156,
    yorumSayisi: 432,
    goruntulemeSayisi: 12456,
    begeniSayisi: 3421,
  };

  // Normal kullanıcı bilgileri
  const normalKullaniciBilgileri = {
    ad: "Bey gör",
    rol: "Gezgin",
    coins: 5000,
    avatar: "B",
    baslikSayisi: 12,
    yorumSayisi: 34,
    goruntulemeSayisi: 245,
    begeniSayisi: 78,
  };

  // Sayfa yüklendiğinde tema ayarlarını uygula
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const html = document.documentElement;
    
    if (savedTheme === 'dark') {
      html.classList.add('dark');
    } else if (savedTheme === 'light') {
      html.classList.remove('dark');
    } else if (savedTheme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    }
  }, []);

  const handleGirisBasarili = (tip: "kullanici" | "admin" | "misafir") => {
    // Her girişte localStorage'ı temizle ve fresh başlat
    localStorage.removeItem('kullaniciBilgileri');
    localStorage.removeItem('kullaniciYorumlari');
    localStorage.removeItem('kullaniciBegenilenYorumlar');
    localStorage.removeItem('kullaniciKayitliBasliklar');
    
    setKullaniciTipi(tip);
    if (tip === "admin") {
      setAktifSayfa("adminPanel");
    } else {
      setAktifSayfa("anasayfa");
    }
  };

  const handleCikis = () => {
    // localStorage'ı temizle
    localStorage.removeItem('kullaniciBilgileri');
    localStorage.removeItem('kullaniciYorumlari');
    localStorage.removeItem('kullaniciBegenilenYorumlar');
    localStorage.removeItem('kullaniciKayitliBasliklar');
    setKullaniciTipi(null);
    setAktifSayfa("giris");
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      
      {aktifSayfa === "giris" && (
        <GirisPaneli
          onGirisBasarili={handleGirisBasarili}
          onKayitaGec={() => setAktifSayfa("kayit")}
          onAdminGirisineGec={() => setAktifSayfa("adminGiris")}
        />
      )}

      {aktifSayfa === "kayit" && (
        <KayitPaneli
          onKayitBasarili={() => setAktifSayfa("giris")}
          onGeriDon={() => setAktifSayfa("giris")}
        />
      )}

      {aktifSayfa === "adminGiris" && (
        <AdminGirisPaneli
          onGirisBasarili={() => handleGirisBasarili("admin")}
          onGeriDon={() => setAktifSayfa("giris")}
        />
      )}

      {aktifSayfa === "anasayfa" && kullaniciTipi !== null && (
        <Anasayfa1 
          isAdmin={kullaniciTipi === "admin"} 
          onCikis={handleCikis}
          onAdminPaneline={() => setAktifSayfa("adminPanel")}
          initialKullaniciBilgileri={kullaniciTipi === "admin" ? adminKullaniciBilgileri : normalKullaniciBilgileri}
        />
      )}

      {aktifSayfa === "adminPanel" && (
        <AdminPaneli 
          onCikis={handleCikis}
          onAnasayfayaGit={() => setAktifSayfa("anasayfa")}
          onaylananOneriler={onaylananOneriler}
          setOnaylananOneriler={setOnaylananOneriler}
        />
      )}
    </>
  );
}
