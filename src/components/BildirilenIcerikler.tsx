import { motion, AnimatePresence } from "motion/react";
import { Flag, AlertTriangle, MessageSquare, FileText, User, Calendar, X, Send, CheckCircle, XCircle, Trash2, Eye } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner@2.0.3";

interface BildirilenIceriklerProps {
  onUyariGonder?: (bildirimId: number, mesaj: string, mesajTipi: "uyari" | "oneri") => void;
}

export function BildirilenIcerikler({ onUyariGonder }: BildirilenIceriklerProps) {
  const [seciliModal, setSeciliModal] = useState<{ bildirimId: number; icerikSahibi: string; tip: "uyari" | "oneri" } | null>(null);
  const [mesaj, setMesaj] = useState("");
  const [filtrelenmisDurum, setFiltrelenmisDurum] = useState<"tumu" | "beklemede" | "incelendi">("beklemede");

  // Örnek bildirimler
  const [bildirimler, setBildirimler] = useState([
    {
      id: 1,
      icerikTipi: "yorum" as const,
      icerik: {
        id: 101,
        metin: "Bu yer berbat, kesinlikle gitmeyin. Paran çöpe gider.",
        baslik: "Kampüste en iyi kahve nerede içilir?",
        yazar: "Ahmet Y."
      },
      bildirenKisi: "Zeynep K.",
      bildirimNedeni: "Hakaret veya Küfür",
      aciklama: "Kullanıcı hakaret içeren ve kırıcı ifadeler kullanmış, diğer kullanıcılara saygısızca davranmış.",
      tarih: "15 dk önce",
      durum: "beklemede" as const
    },
    {
      id: 2,
      icerikTipi: "baslik" as const,
      icerik: {
        id: 202,
        metin: "Bedava iPhone kazanmak için tıklayın!",
        kategori: "Duyuru",
        yazar: "Mehmet T."
      },
      bildirenKisi: "Ayşe M.",
      bildirimNedeni: "Spam veya Yanıltıcı İçerik",
      aciklama: "Başlık spam içeriyor ve kullanıcıları kandırmaya çalışıyor. Platformun amacına uygun değil.",
      tarih: "1 saat önce",
      durum: "beklemede" as const
    },
    {
      id: 3,
      icerikTipi: "yorum" as const,
      icerik: {
        id: 103,
        metin: "Konya'da hiç güzel yer yok, hepsi berbat!",
        baslik: "Meram'da gezilecek yerler",
        yazar: "Can B."
      },
      bildirenKisi: "Bey gör",
      bildirimNedeni: "Uygunsuz İçerik",
      aciklama: "Yorum tamamen olumsuz ve yapıcı olmayan bir şekilde yazılmış. Diğer kullanıcıların motivasyonunu bozuyor.",
      tarih: "2 saat önce",
      durum: "beklemede" as const
    },
    {
      id: 4,
      icerikTipi: "baslik" as const,
      icerik: {
        id: 204,
        metin: "Selçuk Üniversitesi 2025'te kapanacak (DÜZELTİLDİ)",
        kategori: "Duyuru",
        yazar: "Ali K."
      },
      bildirenKisi: "Fatma S.",
      bildirimNedeni: "Yanlış veya Eksik Bilgi",
      aciklama: "Başlıkta tamamen yanlış ve asılsız bilgi var. Öğrenciler arasında gereksiz panik yaratıyor.",
      tarih: "3 saat önce",
      durum: "incelendi" as const
    },
  ]);

  const bildirimNedenIkonlari: Record<string, string> = {
    "Spam veya Yanıltıcı İçerik": "🚫",
    "Hakaret veya Küfür": "😤",
    "Yanlış veya Eksik Bilgi": "❌",
    "Uygunsuz İçerik": "⚠️",
    "Telif Hakkı İhlali": "©️",
    "Diğer": "📝"
  };

  const handleMesajGonder = () => {
    if (!mesaj.trim()) {
      toast.error("Lütfen bir mesaj yazın");
      return;
    }

    if (!seciliModal) return;

    // Bildirimi incelendi olarak işaretle
    setBildirimler(bildirimler.map(b => 
      b.id === seciliModal.bildirimId ? { ...b, durum: "incelendi" as const } : b
    ));

    const bildirim = bildirimler.find(b => b.id === seciliModal.bildirimId);
    const mesajTipiText = seciliModal.tip === "uyari" ? "Uyarı" : "Öneri";
    
    toast.success(`${mesajTipiText} gönderildi!`, {
      description: `${seciliModal.icerikSahibi} kullanıcısına bildirim olarak iletildi.`,
      duration: 3000
    });

    // Callback fonksiyonunu çağır
    if (onUyariGonder) {
      onUyariGonder(seciliModal.bildirimId, mesaj, seciliModal.tip);
    }

    setSeciliModal(null);
    setMesaj("");
  };

  const handleBildirimReddet = (id: number) => {
    setBildirimler(bildirimler.map(b => 
      b.id === id ? { ...b, durum: "incelendi" as const } : b
    ));
    toast.info("Bildirim reddedildi", {
      description: "İçerik uygun bulundu, herhangi bir işlem yapılmadı.",
    });
  };

  const handleIcerikSil = (bildirimId: number, icerikTipi: string) => {
    setBildirimler(bildirimler.map(b => 
      b.id === bildirimId ? { ...b, durum: "incelendi" as const } : b
    ));
    toast.success(`${icerikTipi === "baslik" ? "Başlık" : "Yorum"} silindi!`, {
      description: "İçerik platformdan kaldırıldı.",
    });
  };

  const filtrelenmisListe = bildirimler.filter(b => {
    if (filtrelenmisDurum === "tumu") return true;
    return b.durum === filtrelenmisDurum;
  });

  return (
    <div className="space-y-6">
      {/* Başlık ve Filtre */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-9 bg-gradient-to-b from-[#2A4461] via-[#395579] to-[#4A6A8A] rounded-full shadow-lg shadow-[#395579]/30"></div>
            <div className="w-1.5 h-7 bg-gradient-to-b from-[#395579] to-[#5A7A9A] rounded-full opacity-80"></div>
            <div className="w-1 h-5 bg-gradient-to-b from-[#4A6A8A] to-[#7B99B3] rounded-full opacity-60"></div>
            <div className="w-0.5 h-3 bg-[#5A7A9A] rounded-full opacity-40"></div>
          </div>
          <div>
            <h2 className="text-neutral-700 dark:text-neutral-200">Bildirilen İçerikler</h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Kullanıcılar tarafından bildirilen başlık ve yorumları inceleyin
            </p>
          </div>
        </div>

        {/* Durum Filtresi */}
        <div className="flex gap-2 bg-white/85 dark:bg-neutral-800/85 backdrop-blur-lg rounded-xl p-1 border border-[#395579]/20 dark:border-[#395579]/30">
          <button
            onClick={() => setFiltrelenmisDurum("beklemede")}
            className={`px-4 py-2 rounded-lg transition-all text-sm ${
              filtrelenmisDurum === "beklemede"
                ? "bg-gradient-to-br from-[#2A4461] via-[#395579] to-[#4A6A8A] text-white shadow-md"
                : "text-neutral-600 dark:text-neutral-400 hover:bg-gradient-to-r hover:from-[#395579]/15 hover:to-[#4A6A8A]/10"
            }`}
          >
            Beklemede ({bildirimler.filter(b => b.durum === "beklemede").length})
          </button>
          <button
            onClick={() => setFiltrelenmisDurum("incelendi")}
            className={`px-4 py-2 rounded-lg transition-all text-sm ${
              filtrelenmisDurum === "incelendi"
                ? "bg-gradient-to-br from-[#2A4461] via-[#395579] to-[#4A6A8A] text-white shadow-md"
                : "text-neutral-600 dark:text-neutral-400 hover:bg-gradient-to-r hover:from-[#395579]/15 hover:to-[#4A6A8A]/10"
            }`}
          >
            İncelendi ({bildirimler.filter(b => b.durum === "incelendi").length})
          </button>
          <button
            onClick={() => setFiltrelenmisDurum("tumu")}
            className={`px-4 py-2 rounded-lg transition-all text-sm ${
              filtrelenmisDurum === "tumu"
                ? "bg-gradient-to-br from-[#2A4461] via-[#395579] to-[#4A6A8A] text-white shadow-md"
                : "text-neutral-600 dark:text-neutral-400 hover:bg-gradient-to-r hover:from-[#395579]/15 hover:to-[#4A6A8A]/10"
            }`}
          >
            Tümü ({bildirimler.length})
          </button>
        </div>
      </div>

      {/* Bildirimler Listesi */}
      {filtrelenmisListe.length === 0 ? (
        <div className="relative bg-gradient-to-br from-[#395579]/12 via-[#4A6A8A]/10 to-[#5A7A9A]/8 dark:from-[#395579]/18 dark:via-[#4A6A8A]/15 dark:to-[#5A7A9A]/12 rounded-3xl p-12 shadow-2xl shadow-[#395579]/12 overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#395579]/8 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#5A7A9A]/12 rounded-full blur-3xl"></div>
          <CheckCircle className="w-16 h-16 text-green-500 dark:text-green-400 mx-auto mb-4 relative z-10" />
          <h3 className="text-xl text-neutral-900 dark:text-neutral-100 mb-2 relative z-10">
            {filtrelenmisDurum === "beklemede" ? "Bekleyen bildirim yok! ✨" : "Kayıt bulunamadı"}
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 relative z-10">
            {filtrelenmisDurum === "beklemede" 
              ? "Şu anda incelenmesi gereken bildirim bulunmuyor."
              : "Bu kategoride henüz bildirim bulunmuyor."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtrelenmisListe.map((bildirim, index) => (
            <motion.div
              key={bildirim.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              className="group relative bg-white/85 dark:bg-neutral-800/85 backdrop-blur-lg rounded-2xl hover:bg-gradient-to-r hover:from-[#395579]/18 hover:via-[#4A6A8A]/12 hover:to-transparent dark:hover:from-[#395579]/25 dark:hover:via-[#4A6A8A]/18 dark:hover:to-transparent hover:shadow-2xl hover:shadow-[#395579]/25 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#395579]/0 via-[#395579]/8 to-[#395579]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#395579]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Header */}
              <div className="relative p-4 border-b border-[#395579]/20 dark:border-[#395579]/30">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {/* İçerik Tipi Badge */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      bildirim.icerikTipi === "baslik" 
                        ? "bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18" 
                        : "bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18"
                    }`}>
                      {bildirim.icerikTipi === "baslik" 
                        ? <FileText className="w-5 h-5 text-[#395579]" />
                        : <MessageSquare className="w-5 h-5 text-[#395579]" />
                      }
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18 text-neutral-600 dark:text-neutral-300 border border-[#395579]/20">
                          {bildirim.icerikTipi === "baslik" ? "Başlık" : "Yorum"}
                        </span>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {bildirim.tarih}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                        <span className="font-semibold">Bildiren:</span> {bildirim.bildirenKisi}
                      </p>
                    </div>
                  </div>

                  {/* Durum Badge */}
                  <span className={`px-3 py-1 rounded-full text-xs shrink-0 ${
                    bildirim.durum === "beklemede"
                      ? "bg-gradient-to-r from-[#395579]/25 to-[#4A6A8A]/20 dark:from-[#395579]/35 dark:to-[#4A6A8A]/25 text-[#2A4461] dark:text-[#7B99B3] border border-[#395579]/30"
                      : "bg-gradient-to-r from-green-500/25 to-green-600/20 dark:from-green-500/35 dark:to-green-600/25 text-green-700 dark:text-green-400 border border-green-500/30"
                  }`}>
                    {bildirim.durum === "beklemede" ? "⏳ Beklemede" : "✅ İncelendi"}
                  </span>
                </div>
              </div>

              {/* İçerik */}
              <div className="relative p-6">
                {/* Bildirim Nedeni */}
                <div className="mb-4 flex items-start gap-3 p-3 bg-gradient-to-r from-red-50 to-red-100/50 dark:from-red-900/20 dark:to-red-900/10 rounded-xl border border-red-200 dark:border-red-800">
                  <span className="text-2xl">{bildirimNedenIkonlari[bildirim.bildirimNedeni]}</span>
                  <div className="flex-1">
                    <p className="text-sm text-red-800 dark:text-red-300">
                      <span className="font-semibold">Bildirim Nedeni:</span> {bildirim.bildirimNedeni}
                    </p>
                    <p className="text-xs text-red-700 dark:text-red-400 mt-1">
                      {bildirim.aciklama}
                    </p>
                  </div>
                </div>

                {/* Bildirilen İçerik */}
                <div className="mb-4 p-4 bg-gradient-to-r from-[#395579]/8 to-[#4A6A8A]/5 dark:from-[#395579]/15 dark:to-[#4A6A8A]/10 rounded-xl border border-[#395579]/20 dark:border-[#395579]/30">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                    <span className="text-sm text-neutral-700 dark:text-neutral-300">
                      <span className="font-semibold">İçerik Sahibi:</span> {bildirim.icerik.yazar}
                    </span>
                  </div>
                  
                  {bildirim.icerikTipi === "yorum" && (
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                      <span className="font-semibold">Başlık:</span> {bildirim.icerik.baslik}
                    </p>
                  )}
                  
                  {bildirim.icerikTipi === "baslik" && (
                    <span className="inline-block text-xs px-2 py-1 rounded-full bg-gradient-to-r from-[#395579]/15 to-[#4A6A8A]/10 dark:from-[#395579]/25 dark:to-[#4A6A8A]/18 text-neutral-600 dark:text-neutral-300 border border-[#395579]/20 mb-2">
                      {bildirim.icerik.kategori}
                    </span>
                  )}

                  <p className="text-sm text-neutral-900 dark:text-neutral-100 p-3 bg-white dark:bg-neutral-800/50 rounded-lg border border-[#395579]/20 dark:border-[#395579]/30">
                    "{bildirim.icerik.metin}"
                  </p>
                </div>

                {/* Aksiyon Butonları */}
                {bildirim.durum === "beklemede" && (
                  <div className="flex flex-col sm:flex-row flex-wrap gap-2 md:gap-3">
                    <button
                      onClick={() => setSeciliModal({ 
                        bildirimId: bildirim.id, 
                        icerikSahibi: bildirim.icerik.yazar,
                        tip: "uyari"
                      })}
                      className="flex-1 min-w-[140px] py-2 md:py-2.5 px-3 md:px-4 rounded-xl bg-gradient-to-br from-[#2A4461] via-[#395579] to-[#4A6A8A] text-white flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-[#395579]/50 hover:scale-105 transition-all duration-300 text-sm"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      Uyarı Gönder
                    </button>

                    <button
                      onClick={() => setSeciliModal({ 
                        bildirimId: bildirim.id, 
                        icerikSahibi: bildirim.icerik.yazar,
                        tip: "oneri"
                      })}
                      className="flex-1 min-w-[140px] py-2 md:py-2.5 px-3 md:px-4 rounded-xl bg-gradient-to-br from-[#2A4461] via-[#395579] to-[#4A6A8A] text-white flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-[#395579]/50 hover:scale-105 transition-all duration-300 text-sm"
                    >
                      <Send className="w-4 h-4" />
                      Öneri Gönder
                    </button>

                    <button
                      onClick={() => handleIcerikSil(bildirim.id, bildirim.icerikTipi)}
                      className="flex-1 sm:flex-none py-2 md:py-2.5 px-3 md:px-4 rounded-xl border-2 border-[#395579] text-[#395579] dark:text-[#7B99B3] flex items-center justify-center gap-2 hover:bg-[#395579] hover:text-white transition-all text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                      İçeriği Sil
                    </button>

                    <button
                      onClick={() => handleBildirimReddet(bildirim.id)}
                      className="flex-1 sm:flex-none py-2 md:py-2.5 px-3 md:px-4 rounded-xl border-2 border-neutral-400 dark:border-neutral-600 text-neutral-600 dark:text-neutral-400 flex items-center justify-center gap-2 hover:bg-neutral-400 hover:text-white transition-all text-sm"
                    >
                      <XCircle className="w-4 h-4" />
                      Reddet
                    </button>
                  </div>
                )}

                {bildirim.durum === "incelendi" && (
                  <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400 bg-gradient-to-r from-green-500/15 to-green-600/10 dark:from-green-500/25 dark:to-green-600/18 p-3 rounded-xl border border-green-500/30">
                    <CheckCircle className="w-5 h-5" />
                    <span>Bu bildirim incelendi ve gerekli işlemler yapıldı.</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Uyarı/Öneri Gönderme Modalı */}
      <AnimatePresence>
        {seciliModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSeciliModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gradient-to-br dark:from-[#0d2350] dark:to-[#0a1835] rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className={`p-6 relative overflow-hidden ${
                seciliModal.tip === "uyari"
                  ? "bg-gradient-to-r from-[#cea273] to-[#b8926a]"
                  : "bg-gradient-to-r from-[#5990c0] to-[#015185]"
              }`}>
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                    backgroundSize: "20px 20px",
                  }} />
                </div>
                
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      {seciliModal.tip === "uyari" 
                        ? <AlertTriangle className="w-6 h-6 text-white" />
                        : <Send className="w-6 h-6 text-white" />
                      }
                    </div>
                    <div>
                      <h2 className="text-white text-xl">
                        {seciliModal.tip === "uyari" ? "Uyarı Gönder" : "Öneri Gönder"}
                      </h2>
                      <p className="text-white/80 text-sm mt-0.5">
                        {seciliModal.icerikSahibi} kullanıcısına bildirim gönderilecek
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSeciliModal(null)}
                    className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors flex items-center justify-center text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/50 rounded-xl">
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">
                    <span className="font-semibold">💡 Bilgi:</span> Bu mesaj kullanıcının bildirimler sayfasında görünecektir.
                  </p>
                </div>

                <label className="block text-[#102a6b] dark:text-white mb-3">
                  {seciliModal.tip === "uyari" ? "Uyarı Mesajı" : "Öneri Mesajı"} <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={mesaj}
                  onChange={(e) => setMesaj(e.target.value)}
                  placeholder={
                    seciliModal.tip === "uyari"
                      ? "Örn: Yorumunuz platformun kullanım kurallarına aykırıdır. Lütfen daha saygılı bir dil kullanın..."
                      : "Örn: İçeriklerinizi daha yapıcı ve bilgilendirici hale getirmenizi öneririz..."
                  }
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 dark:border-[#1e4a7a] dark:bg-[#0d2350] dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/50 transition-all resize-none"
                />
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                  Minimum 20 karakter
                </p>
              </div>

              {/* Footer */}
              <div className="p-6 bg-neutral-50 dark:bg-[#0a1430] border-t border-neutral-200 dark:border-[#1e4a7a] flex gap-3">
                <button
                  onClick={() => setSeciliModal(null)}
                  className="flex-1 py-3 px-4 rounded-xl border-2 border-neutral-300 dark:border-[#1e4a7a] text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-[#0d2350] transition-all"
                >
                  İptal
                </button>
                <button
                  onClick={handleMesajGonder}
                  disabled={mesaj.trim().length < 20}
                  className={`flex-1 py-3 px-4 rounded-xl text-white hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    seciliModal.tip === "uyari"
                      ? "bg-gradient-to-r from-[#cea273] to-[#b8926a]"
                      : "bg-gradient-to-r from-[#5990c0] to-[#015185]"
                  }`}
                >
                  Gönder
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
