import { motion } from "motion/react";
import { X, Send, Image as ImageIcon, Bold, Italic, List, Link as LinkIcon, Hash, ChevronDown } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner@2.0.3";

interface YeniBaslikSayfasiProps {
  onClose: () => void;
  onPublish?: (data: { baslik: string; kategori: string; icerik: string; etiketler: string[] }) => void;
  kullaniciRolu?: string;
  onBaslikOlusturuldu?: (yeniBaslik: any) => void;
}

export function YeniBaslikSayfasi({ onClose, onPublish, kullaniciRolu, onBaslikOlusturuldu }: YeniBaslikSayfasiProps) {
  const [baslik, setBaslik] = useState("");
  const [kategori, setKategori] = useState("");
  const [icerik, setIcerik] = useState("");
  const [etiketler, setEtiketler] = useState<string[]>([]);
  const [yeniEtiket, setYeniEtiket] = useState("");
  const [showKategoriDropdown, setShowKategoriDropdown] = useState(false);

  const kategoriler = [
    { name: "Akademik Destek", icon: "📚", color: "#cea273" },
    { name: "Sosyal Yaşam & Mekan Rehberi", icon: "☕", color: "#5990c0" },
    { name: "Kariyer", icon: "💼", color: "#cea273" },
    { name: "Keşif Rehberi", icon: "🗺️", color: "#fcedd3" },
    { name: "Etkinlikler", icon: "🎭", color: "#015185" },
  ];

  const handleEtiketEkle = () => {
    if (yeniEtiket.trim() && !etiketler.includes(yeniEtiket.trim())) {
      setEtiketler([...etiketler, yeniEtiket.trim()]);
      setYeniEtiket("");
    }
  };

  const handleEtiketSil = (etiket: string) => {
    setEtiketler(etiketler.filter((e) => e !== etiket));
  };

  const handlePublish = () => {
    if (!baslik.trim()) {
      toast.error("Başlık boş bırakılamaz!");
      return;
    }
    if (!kategori) {
      toast.error("Lütfen bir kategori seçin!");
      return;
    }
    if (!icerik.trim()) {
      toast.error("İçerik boş bırakılamaz!");
      return;
    }

    const data = {
      baslik: baslik.trim(),
      kategori,
      icerik: icerik.trim(),
      etiketler,
    };

    if (onPublish) {
      onPublish(data);
    }

    if (onBaslikOlusturuldu) {
      onBaslikOlusturuldu(data);
    }

    toast.success("🎉 Tebrikler! +25 Coin Kazandınız", {
      description: "Başlığınız başarıyla yayınlandı!",
      duration: 3000,
      style: {
        background: "linear-gradient(135deg, #cea273 0%, #fcedd3 100%)",
        border: "2px solid #cea273",
        color: "#102a6b",
      },
    });

    onClose();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#5990c0]/40 via-[#fcedd3]/10 to-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-lg mb-6 p-6 border border-neutral-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="p-3 hover:bg-neutral-100 rounded-xl transition-colors"
              >
                <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                style={{ background: "linear-gradient(to bottom right, #015185, #102a6b)" }}
              >
                ✍️
              </div>
              <div>
                <h2 className="text-neutral-950" style={{ color: "#102a6b" }}>
                  Yeni Başlık Oluştur
                </h2>
                <p className="text-sm text-neutral-600">Fikirlerini topluluğumuzla paylaş</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl shadow-lg p-6 space-y-6 border border-neutral-200">
          {/* Başlık Input */}
          <div>
            <label className="block text-sm mb-2" style={{ color: "#102a6b" }}>
              Başlık *
            </label>
            <input
              type="text"
              value={baslik}
              onChange={(e) => setBaslik(e.target.value)}
              placeholder="Başlığınızı yazın..."
              className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-[#015185] transition-colors text-neutral-950"
              maxLength={150}
            />
            <p className="text-xs text-neutral-500 mt-1">{baslik.length}/150 karakter</p>
          </div>

          {/* Kategori Seçimi */}
          <div>
            <label className="block text-sm mb-2" style={{ color: "#102a6b" }}>
              Kategori *
            </label>
            <div className="relative">
              <button
                onClick={() => setShowKategoriDropdown(!showKategoriDropdown)}
                className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-[#015185] transition-colors text-left flex items-center justify-between"
              >
                {kategori ? (
                  <span className="flex items-center gap-2">
                    <span>{kategoriler.find((k) => k.name === kategori)?.icon}</span>
                    <span className="text-neutral-950">{kategori}</span>
                  </span>
                ) : (
                  <span className="text-neutral-400">Kategori seçin...</span>
                )}
                <ChevronDown className="w-5 h-5 text-neutral-400" />
              </button>

              {showKategoriDropdown && (
                <div className="absolute top-full mt-2 w-full bg-white border-2 border-neutral-200 rounded-xl shadow-xl z-10 max-h-64 overflow-y-auto">
                  {kategoriler.map((kat) => (
                    <button
                      key={kat.name}
                      onClick={() => {
                        setKategori(kat.name);
                        setShowKategoriDropdown(false);
                      }}
                      className="w-full px-4 py-3 hover:bg-neutral-50 transition-colors text-left flex items-center gap-3"
                    >
                      <span className="text-2xl">{kat.icon}</span>
                      <span className="text-neutral-950">{kat.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* İçerik Textarea */}
          <div>
            <label className="block text-sm mb-2" style={{ color: "#102a6b" }}>
              İçerik *
            </label>
            <textarea
              value={icerik}
              onChange={(e) => setIcerik(e.target.value)}
              placeholder="İçeriğinizi detaylı bir şekilde yazın..."
              className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-[#015185] transition-colors min-h-[300px] resize-y text-neutral-950"
              maxLength={5000}
            />
            <p className="text-xs text-neutral-500 mt-1">{icerik.length}/5000 karakter</p>
          </div>

          {/* Etiketler */}
          <div>
            <label className="block text-sm mb-2" style={{ color: "#102a6b" }}>
              Etiketler
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={yeniEtiket}
                onChange={(e) => setYeniEtiket(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleEtiketEkle();
                  }
                }}
                placeholder="Etiket ekle..."
                className="flex-1 px-4 py-2 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-[#015185] transition-colors text-neutral-950"
              />
              <button
                onClick={handleEtiketEkle}
                className="px-4 py-2 rounded-xl text-white transition-all hover:shadow-lg"
                style={{ background: "linear-gradient(to right, #015185, #5990c0)" }}
              >
                <Hash className="w-5 h-5" />
              </button>
            </div>

            {etiketler.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {etiketler.map((etiket, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-full text-sm flex items-center gap-2"
                    style={{ background: "#fcedd3", color: "#102a6b" }}
                  >
                    #{etiket}
                    <button
                      onClick={() => handleEtiketSil(etiket)}
                      className="hover:text-red-600 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Formatting Toolbar (Optional) */}
          <div className="border-t pt-4">
            <p className="text-xs text-neutral-500 mb-3">Biçimlendirme araçları (yakında)</p>
            <div className="flex gap-2">
              <button
                disabled
                className="p-2 rounded-lg bg-neutral-100 text-neutral-400 cursor-not-allowed"
                title="Yakında"
              >
                <Bold className="w-4 h-4" />
              </button>
              <button
                disabled
                className="p-2 rounded-lg bg-neutral-100 text-neutral-400 cursor-not-allowed"
                title="Yakında"
              >
                <Italic className="w-4 h-4" />
              </button>
              <button
                disabled
                className="p-2 rounded-lg bg-neutral-100 text-neutral-400 cursor-not-allowed"
                title="Yakında"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                disabled
                className="p-2 rounded-lg bg-neutral-100 text-neutral-400 cursor-not-allowed"
                title="Yakında"
              >
                <LinkIcon className="w-4 h-4" />
              </button>
              <button
                disabled
                className="p-2 rounded-lg bg-neutral-100 text-neutral-400 cursor-not-allowed"
                title="Yakında"
              >
                <ImageIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white rounded-3xl shadow-lg p-6 border border-neutral-200 flex items-center justify-between mt-6">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors"
          >
            İptal
          </button>
          <button
            onClick={handlePublish}
            className="px-8 py-3 rounded-xl text-white hover:shadow-lg transition-all flex items-center gap-2"
            style={{ background: "linear-gradient(to right, #015185, #102a6b)" }}
          >
            <Send className="w-4 h-4" />
            Yayınla
          </button>
        </div>
      </div>
    </div>
  );
}
