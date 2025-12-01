import { motion } from "motion/react";
import { X, Upload, Save, User, Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner@2.0.3";

interface ProfilDuzenleSayfasiProps {
  onClose: () => void;
  onSave: (data: {
    ad: string;
    bio: string;
    email: string;
    telefon: string;
    konum: string;
  }) => void;
  initialData: {
    ad: string;
    bio: string;
    email: string;
    telefon: string;
    konum: string;
  };
}

export function ProfilDuzenleSayfasi({ onClose, onSave, initialData }: ProfilDuzenleSayfasiProps) {
  const [ad, setAd] = useState(initialData.ad);
  const [bio, setBio] = useState(initialData.bio);
  const [email, setEmail] = useState(initialData.email);
  const [telefon, setTelefon] = useState(initialData.telefon);
  const [konum, setKonum] = useState(initialData.konum);

  const handleSave = () => {
    if (!ad.trim()) {
      toast.error("Ad alanı boş bırakılamaz!");
      return;
    }

    onSave({ ad, bio, email, telefon, konum });
    toast.success("✅ Profil bilgileriniz güncellendi!", {
      description: "Değişiklikler başarıyla kaydedildi",
      duration: 3000,
    });
    onClose();
  };

  return (
    <>
      {/* Modal Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-20 p-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-xl shadow-lg transition-colors"
          >
            <X className="h-5 w-5 text-neutral-700 dark:text-white" />
          </button>

          {/* Header */}
          <div className="relative rounded-t-3xl p-8 bg-gradient-to-br from-[#2A4461] via-[#395579] to-[#4A6A8A]">
            <div className="text-center">
              <h2 className="text-white text-3xl mb-2">Profili Düzenle</h2>
              <p className="text-white/80">Bilgilerinizi güncelleyin</p>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8 space-y-6">
            {/* Profil Fotoğrafı */}
            <div className="flex flex-col items-center gap-4 pb-6 border-b border-neutral-200 dark:border-neutral-700">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-[#395579] to-[#7B99B3] rounded-2xl shadow-xl flex items-center justify-center text-4xl text-white">
                  {ad.charAt(0).toUpperCase()}
                </div>
                <button className="absolute -bottom-2 -right-2 p-2 bg-[#395579] hover:bg-[#4A6A8A] rounded-xl shadow-lg transition-colors">
                  <Upload className="h-4 w-4 text-white" />
                </button>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Profil fotoğrafını değiştir</p>
            </div>

            {/* Ad Soyad */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                <User className="h-4 w-4 text-[#395579]" />
                <span>Ad Soyad</span>
              </label>
              <input
                type="text"
                value={ad}
                onChange={(e) => setAd(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#395579] transition-all text-neutral-900 dark:text-white"
                placeholder="Ad Soyad giriniz"
              />
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                <span>Hakkımda</span>
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#395579] transition-all resize-none text-neutral-900 dark:text-white"
                placeholder="Kendiniz hakkında birkaç cümle yazın..."
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                <Mail className="h-4 w-4 text-[#395579]" />
                <span>E-posta</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#395579] transition-all text-neutral-900 dark:text-white"
                placeholder="email@example.com"
              />
            </div>

            {/* Telefon */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                <Phone className="h-4 w-4 text-[#395579]" />
                <span>Telefon</span>
              </label>
              <input
                type="tel"
                value={telefon}
                onChange={(e) => setTelefon(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#395579] transition-all text-neutral-900 dark:text-white"
                placeholder="+90 555 123 4567"
              />
            </div>

            {/* Konum */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                <MapPin className="h-4 w-4 text-[#395579]" />
                <span>Konum</span>
              </label>
              <input
                type="text"
                value={konum}
                onChange={(e) => setKonum(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#395579] transition-all text-neutral-900 dark:text-white"
                placeholder="Üniversite / Şehir"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-white rounded-xl transition-colors"
              >
                İptal
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#395579] to-[#4A6A8A] hover:from-[#4A6A8A] hover:to-[#395579] text-white rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Save className="h-5 w-5" />
                <span>Kaydet</span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
