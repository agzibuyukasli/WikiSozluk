import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ThumbsUp,
  MessageSquare,
  Bookmark,
  Share2,
  Eye,
  X,
  Users,
  TrendingUp,
  Clock,
  Send,
  ArrowLeft,
  Filter,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { BaslikDetaySayfasi } from "./BaslikDetaySayfasi";
import { PaylasmaModal } from "./PaylasmaModal";

interface SosyalYasamSayfasiProps {
  onGeriDon: () => void;
  kullaniciAdi: string;
  kullaniciRol: string;
  tumBasliklar: any[];
  onBaslikClick: (baslik: any) => void;
  favoriler: number[];
  onFavoriToggle: (id: number) => void;
}

export function SosyalYasamSayfasi({
  onGeriDon,
  kullaniciAdi,
  kullaniciRol,
  tumBasliklar,
  onBaslikClick,
  favoriler,
  onFavoriToggle,
}: SosyalYasamSayfasiProps) {
  const [secilenBaslik, setSecilenBaslik] = useState<any>(null);
  const [paylasmaModalAcik, setPaylasmaModalAcik] = useState(false);
  const [paylasilacakBaslik, setPaylasilacakBaslik] = useState<string>("");
  const [siralamaKriteri, setSiralamaKriteri] = useState<"yeni" | "trend" | "cokGorulen">("yeni");

  const sosyalBasliklar = tumBasliklar.filter((b) => b.kategori === "sosyal");

  const siraliBasliklar = [...sosyalBasliklar].sort((a, b) => {
    if (siralamaKriteri === "yeni") {
      return new Date(b.tarih).getTime() - new Date(a.tarih).getTime();
    } else if (siralamaKriteri === "trend") {
      return b.begeni - a.begeni;
    } else {
      return b.goruntulenme - a.goruntulenme;
    }
  });

  const solKolonBasliklar = siraliBasliklar.filter((_, index) => index % 2 === 0);
  const sagKolonBasliklar = siraliBasliklar.filter((_, index) => index % 2 === 1);

  const handleBaslikClick = (baslik: any) => {
    setSecilenBaslik(baslik);
    onBaslikClick(baslik);
  };

  const handlePaylasClick = (baslik: string) => {
    setPaylasilacakBaslik(baslik);
    setPaylasmaModalAcik(true);
  };

  if (secilenBaslik) {
    return (
      <BaslikDetaySayfasi
        baslik={secilenBaslik}
        onGeriDon={() => setSecilenBaslik(null)}
        kullaniciAdi={kullaniciAdi}
        kullaniciRol={kullaniciRol}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#fcedd3]/10 to-white dark:from-neutral-950 dark:via-[#102a6b]/20 dark:to-neutral-950">
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGeriDon}
              className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
            </motion.button>
            <div>
              <h1 className="text-xl bg-gradient-to-r from-[#1d2633] to-[#28374a] dark:from-[#3d4f66] dark:to-[#4d5f76] bg-clip-text text-transparent">
                Sosyal Yaşam
              </h1>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">{sosyalBasliklar.length} içerik</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-6 rounded-2xl bg-gradient-to-r from-[#1d2633] via-[#28374a] to-[#1d2633] text-white shadow-xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-8 h-8" />
              <h2 className="text-2xl">Sosyal Yaşam Merkezi</h2>
            </div>
            <p className="text-white/90 text-sm leading-relaxed">
              Kampüs hayatını daha renkli hale getiren etkinlikler, kulüpler, hobiler ve sosyal aktiviteler hakkında her şey burada! 
              Yeni arkadaşlar edinin, ilgi alanlarınıza uygun gruplar bulun ve Konya'nın sosyal yaşamını keşfedin. 
              Öğrenci topluluklarından özel aktivitelere kadar tüm bilgiler bir arada.
            </p>
          </div>
        </motion.div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
            <span className="text-sm text-neutral-600 dark:text-neutral-400">Sıralama:</span>
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSiralamaKriteri("yeni")}
              className={`px-4 py-2 rounded-xl text-xs transition-all ${
                siralamaKriteri === "yeni"
                  ? "bg-gradient-to-r from-[#1d2633] to-[#28374a] text-white shadow-lg"
                  : "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700"
              }`}
            >
              <Clock className="w-4 h-4 inline mr-1" />
              En Yeni
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSiralamaKriteri("trend")}
              className={`px-4 py-2 rounded-xl text-xs transition-all ${
                siralamaKriteri === "trend"
                  ? "bg-gradient-to-r from-[#1d2633] to-[#28374a] text-white shadow-lg"
                  : "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700"
              }`}
            >
              <TrendingUp className="w-4 h-4 inline mr-1" />
              Trend
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSiralamaKriteri("cokGorulen")}
              className={`px-4 py-2 rounded-xl text-xs transition-all ${
                siralamaKriteri === "cokGorulen"
                  ? "bg-gradient-to-r from-[#1d2633] to-[#28374a] text-white shadow-lg"
                  : "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700"
              }`}
            >
              <Eye className="w-4 h-4 inline mr-1" />
              Çok Görülen
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {solKolonBasliklar.map((baslik) => (
              <motion.div
                key={baslik.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className="p-5 rounded-2xl bg-white dark:bg-neutral-800 shadow-md hover:shadow-xl transition-all cursor-pointer border border-neutral-200 dark:border-neutral-700"
                onClick={() => handleBaslikClick(baslik)}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="flex-1 text-neutral-800 dark:text-neutral-100 pr-3 line-clamp-2">
                    {baslik.baslik}
                  </h3>
                  <span className="shrink-0 px-3 py-1 rounded-full bg-gradient-to-r from-[#1d2633]/10 to-[#28374a]/10 text-xs text-[#1d2633] dark:text-[#7B99B3]">
                    Sosyal
                  </span>
                </div>
                
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                  {baslik.icerik}
                </p>

                <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                  <span>{baslik.yazar} • {baslik.tarih}</span>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{baslik.goruntulenme}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{baslik.begeni}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>{baslik.yorumlar.length}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onFavoriToggle(baslik.id);
                      toast.success(favoriler.includes(baslik.id) ? "Favorilerden çıkarıldı" : "Favorilere eklendi");
                    }}
                    className={`p-2 rounded-lg transition-colors ${
                      favoriler.includes(baslik.id)
                        ? "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400"
                        : "hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-400"
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${favoriler.includes(baslik.id) ? "fill-current" : ""}`} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePaylasClick(baslik.baslik);
                    }}
                    className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-400 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-4">
            {sagKolonBasliklar.map((baslik) => (
              <motion.div
                key={baslik.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className="p-5 rounded-2xl bg-white dark:bg-neutral-800 shadow-md hover:shadow-xl transition-all cursor-pointer border border-neutral-200 dark:border-neutral-700"
                onClick={() => handleBaslikClick(baslik)}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="flex-1 text-neutral-800 dark:text-neutral-100 pr-3 line-clamp-2">
                    {baslik.baslik}
                  </h3>
                  <span className="shrink-0 px-3 py-1 rounded-full bg-gradient-to-r from-[#1d2633]/10 to-[#28374a]/10 text-xs text-[#1d2633] dark:text-[#7B99B3]">
                    Sosyal
                  </span>
                </div>
                
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                  {baslik.icerik}
                </p>

                <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                  <span>{baslik.yazar} • {baslik.tarih}</span>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{baslik.goruntulenme}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{baslik.begeni}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>{baslik.yorumlar.length}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onFavoriToggle(baslik.id);
                      toast.success(favoriler.includes(baslik.id) ? "Favorilerden çıkarıldı" : "Favorilere eklendi");
                    }}
                    className={`p-2 rounded-lg transition-colors ${
                      favoriler.includes(baslik.id)
                        ? "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400"
                        : "hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-400"
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${favoriler.includes(baslik.id) ? "fill-current" : ""}`} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePaylasClick(baslik.baslik);
                    }}
                    className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-400 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {sosyalBasliklar.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 mx-auto text-neutral-300 dark:text-neutral-600 mb-4" />
            <p className="text-neutral-600 dark:text-neutral-400">Henüz sosyal yaşam içeriği bulunmamaktadır.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {paylasmaModalAcik && (
          <PaylasmaModal
            baslik={paylasilacakBaslik}
            onKapat={() => setPaylasmaModalAcik(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
