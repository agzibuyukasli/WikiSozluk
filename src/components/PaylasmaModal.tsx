import { motion } from "motion/react";
import { X, Share2, Copy, Check, Facebook, Twitter, Linkedin, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner@2.0.3";

interface PaylasmaModalProps {
  onClose: () => void;
  baslikAdi: string;
  baslikUrl?: string;
}

export function PaylasmaModal({ onClose, baslikAdi, baslikUrl }: PaylasmaModalProps) {
  const [kopyalandi, setKopyalandi] = useState(false);
  
  const shareUrl = baslikUrl || window.location.href;
  const shareText = `${baslikAdi} - WikiSözlük`;

  const handleKopyala = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setKopyalandi(true);
      toast.success("Link kopyalandı! 📋", {
        description: "Paylaşmak için yapıştırabilirsiniz.",
        duration: 2000,
      });
      setTimeout(() => setKopyalandi(false), 2000);
    } catch (err) {
      toast.error("Link kopyalanamadı");
    }
  };

  const paylasmaPlatformlari = [
    {
      id: "whatsapp",
      label: "WhatsApp",
      icon: MessageCircle,
      color: "from-green-500 to-green-600",
      url: `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
    },
    {
      id: "twitter",
      label: "Twitter (X)",
      icon: Twitter,
      color: "from-sky-500 to-sky-600",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      id: "facebook",
      label: "Facebook",
      icon: Facebook,
      color: "from-blue-600 to-blue-700",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: Linkedin,
      color: "from-blue-700 to-blue-800",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      id: "telegram",
      label: "Telegram",
      icon: MessageCircle,
      color: "from-sky-400 to-sky-500",
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    },
    {
      id: "email",
      label: "E-posta",
      icon: Mail,
      color: "from-neutral-600 to-neutral-700",
      url: `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareUrl)}`,
    },
  ];

  const handlePlatformPaylas = (url: string, platform: string) => {
    window.open(url, "_blank", "width=600,height=400");
    toast.success(`${platform} ile paylaşılıyor...`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gradient-to-br dark:from-neutral-900 dark:to-neutral-950 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#395579] via-[#4A6A8A] to-[#5A7A9A] p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }} />
          </div>
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Share2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-white text-xl">Paylaş</h2>
                <p className="text-white/80 text-sm mt-0.5">Arkadaşlarınla paylaş</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors flex items-center justify-center text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Başlık */}
          <div className="mb-6 p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-700">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Paylaşılacak İçerik:</p>
            <p className="text-[#102a6b] dark:text-white">{baslikAdi}</p>
          </div>

          {/* Link Kopyalama */}
          <div className="mb-6">
            <label className="block text-sm text-neutral-600 dark:text-neutral-400 mb-2">Link</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-4 py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800/50 dark:text-white bg-neutral-50 text-sm"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleKopyala}
                className={`px-6 py-3 rounded-xl transition-all flex items-center gap-2 ${
                  kopyalandi
                    ? "bg-green-500 text-white"
                    : "bg-gradient-to-r from-[#395579] to-[#4A6A8A] text-white"
                }`}
              >
                {kopyalandi ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span className="text-sm">Kopyalandı</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span className="text-sm">Kopyala</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Paylaşım Platformları */}
          <div>
            <label className="block text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              Paylaşım Platformu Seç
            </label>
            <div className="grid grid-cols-2 gap-3">
              {paylasmaPlatformlari.map((platform) => {
                const Icon = platform.icon;
                return (
                  <motion.button
                    key={platform.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handlePlatformPaylas(platform.url, platform.label)}
                    className={`p-4 rounded-xl bg-gradient-to-r ${platform.color} text-white shadow-md hover:shadow-lg transition-all flex items-center gap-3`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm">{platform.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* İpucu */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/50 rounded-xl">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              💡 <span className="font-semibold">İpucu:</span> Paylaştığın her içerik için +2 Coin kazanırsın!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
          <button
            onClick={onClose}
            className="w-full py-3 px-4 rounded-xl border-2 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
          >
            Kapat
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}