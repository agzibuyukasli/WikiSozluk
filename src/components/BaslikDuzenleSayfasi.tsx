import { motion } from "motion/react";
import { ArrowLeft, Save, X, AlertCircle, Lightbulb, CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner@2.0.3";

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
  yorumlar: any[];
  etiketler?: string[];
  versions?: any[];
  trendYorumlar?: any[];
}

interface BaslikDuzenleSayfasiProps {
  baslik: Baslik;
  onClose: () => void;
  onDuzenle?: (baslikId: number, yeniBaslik: string, yeniIcerik: string, degisiklikAciklamasi: string, kullaniciRolu: string) => void;
  kullaniciRolu?: string;
  kullaniciAdi?: string;
}

export function BaslikDuzenleSayfasi({ 
  baslik, 
  onClose, 
  onDuzenle, 
  kullaniciRolu = "Yeni Gelen",
  kullaniciAdi = "Misafir"
}: BaslikDuzenleSayfasiProps) {
  const [yeniBaslik, setYeniBaslik] = useState(baslik.baslik);
  const [yeniIcerik, setYeniIcerik] = useState(baslik.icerik);
  const [degisiklikAciklamasi, setDegisiklikAciklamasi] = useState("");

  // Rol seviyeleri
  const rolSeviyeleri: Record<string, number> = {
    "Yeni Gelen": 1,
    "Seyyah": 2,
    "Gezgin": 3,
    "Kaşif Meraklısı": 4,
    "Konya Bilgesi": 5
  };

  // Seyyah rolü mü?
  const isSeyyah = () => {
    const seviye = rolSeviyeleri[kullaniciRolu] || 0;
    return seviye === 2;
  };

  // Direkt düzenleme yetkisi var mı?
  const direktDuzenleyebilirMi = () => {
    const seviye = rolSeviyeleri[kullaniciRolu] || 0;
    return seviye >= 3; // Gezgin ve üstü
  };

  const handleKaydet = () => {
    // Validasyon
    if (!yeniBaslik.trim()) {
      toast.error("Başlık boş olamaz!", {
        description: "Lütfen bir başlık girin.",
        duration: 3000,
      });
      return;
    }

    if (!yeniIcerik.trim()) {
      toast.error("İçerik boş olamaz!", {
        description: "Lütfen içerik girin.",
        duration: 3000,
      });
      return;
    }

    if (!degisiklikAciklamasi.trim() && direktDuzenleyebilirMi()) {
      toast.error("Değişiklik açıklaması gerekli!", {
        description: "Lütfen yaptığınız değişiklikleri açıklayın.",
        duration: 3000,
      });
      return;
    }

    // Kaydetme işlemi
    if (onDuzenle) {
      onDuzenle(baslik.id, yeniBaslik, yeniIcerik, degisiklikAciklamasi, kullaniciRolu);
    }

    // Mesajlar
    if (isSeyyah()) {
      toast.success("Düzenleme öneriniz gönderildi! 📝", {
        description: "Admin onayından sonra yayınlanacak. Katkınız için teşekkürler!",
        duration: 4000,
        style: {
          background: "linear-gradient(135deg, #cea273 0%, #fcedd3 100%)",
          border: "2px solid #cea273",
          color: "#102a6b",
        },
      });
    } else {
      toast.success("Düzenleme kaydedildi! ✅", {
        description: "Değişiklikler başarıyla yayınlandı.",
        duration: 3000,
        style: {
          background: "linear-gradient(135deg, #015185 0%, #5990c0 100%)",
          border: "2px solid #015185",
          color: "white",
        },
      });
    }

    onClose();
  };

  const handleVazgec = () => {
    if (yeniBaslik !== baslik.baslik || yeniIcerik !== baslik.icerik) {
      const onay = window.confirm("Kaydedilmemiş değişiklikler var. Çıkmak istediğinize emin misiniz?");
      if (onay) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="w-full max-w-4xl m-4 my-8"
      >
        <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1d2633] to-[#28374a] dark:from-neutral-800 dark:to-neutral-900 text-white p-6">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handleVazgec}
                className="p-2 hover:bg-white/10 rounded-xl transition-all"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            </div>

            <h1 className="text-2xl mb-2">Başlık Düzenle</h1>
            <p className="text-white/70 text-sm">
              {isSeyyah() 
                ? "Düzenlemeniz admin onayına gönderilecek"
                : "Değişiklikleriniz direkt yayınlanacak"}
            </p>
          </div>

          {/* Bilgilendirme Kutusu */}
          {isSeyyah() && (
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
              <div className="bg-gradient-to-r from-[#cea273]/10 to-[#fcedd3]/10 dark:from-[#cea273]/5 dark:to-[#fcedd3]/5 rounded-xl p-4 border border-[#cea273]/30">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-[#cea273] mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-neutral-700 dark:text-neutral-300">
                    <p className="font-medium text-[#102a6b] dark:text-white mb-1">Seyyah Rolü - Onay Gerekli</p>
                    <p>Düzenlemeniz başarıyla kaydedilecek ve admin onayına gönderilecektir. Onaylandıktan sonra yayınlanacaktır. Katkınız için teşekkür ederiz!</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* İçerik */}
          <div className="p-6 space-y-6">
            {/* Orijinal Bilgiler */}
            <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-xl p-4 border border-neutral-200 dark:border-neutral-700">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-[#395579] dark:text-[#5990c0] mt-0.5" />
                <div className="text-sm">
                  <p className="text-neutral-600 dark:text-neutral-400 mb-1">
                    <span className="font-medium text-neutral-900 dark:text-white">Orijinal Yazar:</span> {baslik.yazar}
                  </p>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    <span className="font-medium text-neutral-900 dark:text-white">Kategori:</span> {baslik.kategori}
                  </p>
                </div>
              </div>
            </div>

            {/* Başlık Input */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Başlık
              </label>
              <input
                type="text"
                value={yeniBaslik}
                onChange={(e) => setYeniBaslik(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#395579] dark:focus:ring-[#5990c0] transition-all"
                placeholder="Başlık giriniz..."
              />
            </div>

            {/* İçerik Textarea */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                İçerik
              </label>
              <textarea
                value={yeniIcerik}
                onChange={(e) => setYeniIcerik(e.target.value)}
                rows={12}
                className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#395579] dark:focus:ring-[#5990c0] transition-all resize-none"
                placeholder="İçerik giriniz..."
              />
            </div>

            {/* Değişiklik Açıklaması */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Değişiklik Açıklaması {direktDuzenleyebilirMi() && <span className="text-red-500">*</span>}
              </label>
              <textarea
                value={degisiklikAciklamasi}
                onChange={(e) => setDegisiklikAciklamasi(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#395579] dark:focus:ring-[#5990c0] transition-all resize-none"
                placeholder="Ne değiştirdiniz? (Örn: Güncel bilgiler eklendi, yazım hataları düzeltildi...)"
              />
            </div>

            {/* Bilgi Kutusu */}
            <div className="bg-gradient-to-r from-[#5990c0]/10 to-[#cea273]/10 dark:from-[#015185]/10 dark:to-[#102a6b]/10 rounded-xl p-4 border border-[#5990c0]/30">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-[#5990c0] mt-0.5 flex-shrink-0" />
                <div className="text-sm text-neutral-700 dark:text-neutral-300">
                  <p className="font-medium text-[#102a6b] dark:text-white mb-1">Düzenleme Kuralları</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Başlık ve içerik alanları boş bırakılamaz</li>
                    <li>Değişiklik açıklaması yapmak önemlidir</li>
                    <li>Düzenleme sürüm geçmişine kaydedilecektir</li>
                    {isSeyyah() && <li className="text-[#cea273] font-medium">Seyyah rolü için admin onayı gereklidir</li>}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-neutral-50 dark:bg-neutral-800/50 px-6 py-4 flex items-center justify-between border-t border-neutral-200 dark:border-neutral-700">
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              Düzenleyen: <span className="font-medium text-neutral-900 dark:text-white">{kullaniciAdi}</span>
              <span className="mx-2">•</span>
              <span className="font-medium text-[#395579] dark:text-[#5990c0]">{kullaniciRolu}</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleVazgec}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-all"
              >
                <X className="h-4 w-4" />
                <span>Vazgeç</span>
              </button>
              <button
                onClick={handleKaydet}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#395579] to-[#4A6A8A] text-white hover:shadow-lg transition-all"
              >
                <Save className="h-4 w-4" />
                <span>Kaydet</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}