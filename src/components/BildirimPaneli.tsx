import { motion, AnimatePresence } from "motion/react";
import { X, Bell, MessageSquare, ThumbsUp, UserPlus, Award, TrendingUp, Check, Trash2 } from "lucide-react";
import { useState } from "react";

interface Bildirim {
  id: number;
  tip: "yorum" | "begeni" | "takip" | "rozet" | "trend";
  kullanici?: string;
  baslik?: string;
  icerik: string;
  tarih: string;
  isRead: boolean;
}

interface BildirimPaneliProps {
  onClose: () => void;
}

export function BildirimPaneli({ onClose }: BildirimPaneliProps) {
  const [bildirimler, setBildirimler] = useState<Bildirim[]>([
    {
      id: 1,
      tip: "yorum",
      kullanici: "Ahmet K.",
      baslik: "Elektrik Mühendisliği final hazırlık grubu",
      icerik: "başlığınıza yorum yaptı",
      tarih: "5 dakika önce",
      isRead: false,
    },
    {
      id: 2,
      tip: "begeni",
      kullanici: "Zeynep A.",
      baslik: "Kalkülüs 2 dersi için kaynak önerisi",
      icerik: "başlığınızı beğendi",
      tarih: "15 dakika önce",
      isRead: false,
    },
    {
      id: 3,
      tip: "takip",
      kullanici: "Mehmet Y.",
      icerik: "sizi takip etmeye başladı",
      tarih: "1 saat önce",
      isRead: false,
    },
    {
      id: 4,
      tip: "rozet",
      icerik: "Yeni rozet kazandınız: ⭐ 100 Beğeni",
      tarih: "2 saat önce",
      isRead: true,
    },
    {
      id: 5,
      tip: "trend",
      baslik: "Mevlana Müzesi ziyaret rehberi",
      icerik: "başlığınız trend olmaya başladı! 🔥",
      tarih: "3 saat önce",
      isRead: true,
    },
    {
      id: 6,
      tip: "yorum",
      kullanici: "Can B.",
      baslik: "Kampüs yakınında yeni açılan kafe",
      icerik: "yorumunuza cevap verdi",
      tarih: "5 saat önce",
      isRead: true,
    },
  ]);

  const [filter, setFilter] = useState<"tumu" | "okunmamis">("tumu");

  const getIcon = (tip: Bildirim["tip"]) => {
    switch (tip) {
      case "yorum":
        return MessageSquare;
      case "begeni":
        return ThumbsUp;
      case "takip":
        return UserPlus;
      case "rozet":
        return Award;
      case "trend":
        return TrendingUp;
    }
  };

  const getIconColor = (tip: Bildirim["tip"]) => {
    switch (tip) {
      case "yorum":
        return "from-[#28374a] to-[#3d4f66]";
      case "begeni":
        return "from-[#1d2633] to-[#28374a]";
      case "takip":
        return "from-[#1d2633] to-[#28374a]";
      case "rozet":
        return "from-[#1d2633] to-[#28374a]";
      case "trend":
        return "from-[#28374a] to-[#1d2633]";
    }
  };

  const okunduIsaretle = (id: number) => {
    setBildirimler(
      bildirimler.map((b) => (b.id === id ? { ...b, isRead: true } : b))
    );
  };

  const tumunuOkunduIsaretle = () => {
    setBildirimler(bildirimler.map((b) => ({ ...b, isRead: true })));
  };

  const bildirimSil = (id: number) => {
    setBildirimler(bildirimler.filter((b) => b.id !== id));
  };

  const filtrelenmis = bildirimler.filter((b) =>
    filter === "okunmamis" ? !b.isRead : true
  );

  const okunmamisSayisi = bildirimler.filter((b) => !b.isRead).length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 dark:bg-black/80 z-50 flex items-start justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="bg-white dark:bg-black rounded-3xl shadow-2xl dark:shadow-none dark:border dark:border-neutral-800 w-full max-w-2xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-[#28374a] to-[#3d4f66]">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-[#28374a] dark:text-white">Bildirimler</h2>
                {okunmamisSayisi > 0 && (
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {okunmamisSayisi} okunmamış bildirim
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-xl transition-colors"
            >
              <X className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
            </button>
          </div>

          {/* Filtreler ve Aksiyonlar */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setFilter("tumu")}
              className={`px-4 py-2 rounded-xl text-sm transition-all ${
                filter === "tumu"
                  ? "bg-gradient-to-r from-[#28374a] to-[#3d4f66] text-white shadow-lg"
                  : "bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800"
              }`}
            >
              Tümü
            </button>
            <button
              onClick={() => setFilter("okunmamis")}
              className={`px-4 py-2 rounded-xl text-sm transition-all ${
                filter === "okunmamis"
                  ? "bg-gradient-to-r from-[#28374a] to-[#3d4f66] text-white shadow-lg"
                  : "bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800"
              }`}
            >
              Okunmamış ({okunmamisSayisi})
            </button>
            {okunmamisSayisi > 0 && (
              <button
                onClick={tumunuOkunduIsaretle}
                className="ml-auto px-4 py-2 rounded-xl text-sm bg-[#28374a]/10 dark:bg-neutral-900 text-[#28374a] dark:text-[#3d4f66] hover:bg-[#28374a]/20 dark:hover:bg-neutral-800 dark:border dark:border-neutral-700 transition-colors flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Tümünü Okundu İşaretle
              </button>
            )}
          </div>
        </div>

        {/* Bildirimler Listesi */}
        <div className="max-h-[600px] overflow-y-auto">
          {filtrelenmis.length === 0 ? (
            <div className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#28374a]/20 to-[#1d2633]/20 dark:from-neutral-900 dark:to-neutral-800 mb-4">
                <Bell className="w-8 h-8 text-[#28374a] dark:text-neutral-600" />
              </div>
              <p className="text-neutral-600 dark:text-neutral-400">
                {filter === "okunmamis"
                  ? "Okunmamış bildiriminiz yok"
                  : "Henüz bildiriminiz yok"}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {filtrelenmis.map((bildirim) => {
                const Icon = getIcon(bildirim.tip);
                return (
                  <motion.div
                    key={bildirim.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors relative ${
                      !bildirim.isRead ? "bg-[#28374a]/5 dark:bg-neutral-900/50" : ""
                    }`}
                  >
                    <div className="flex gap-4">
                      {/* Icon */}
                      {!bildirim.isRead && (
                        <div
                          className={`shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${getIconColor(
                            bildirim.tip
                          )} flex items-center justify-center shadow-lg`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      )}

                      {/* İçerik */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2">
                          <p className="text-neutral-900 dark:text-white flex-1">
                            {bildirim.kullanici && (
                              <span className="text-[#28374a] dark:text-[#3d4f66]">
                                {bildirim.kullanici}{" "}
                              </span>
                            )}
                            {bildirim.icerik}
                          </p>
                          {!bildirim.isRead && (
                            <div className="w-2 h-2 rounded-full bg-[#28374a] dark:bg-[#3d4f66] shrink-0 mt-2" />
                          )}
                        </div>
                        {bildirim.baslik && (
                          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                            "{bildirim.baslik}"
                          </p>
                        )}
                        <div className="flex items-center gap-3 mt-2">
                          <p className="text-xs text-neutral-500 dark:text-neutral-500">
                            {bildirim.tarih}
                          </p>
                          {!bildirim.isRead ? (
                            <button
                              onClick={() => okunduIsaretle(bildirim.id)}
                              className="text-xs text-[#28374a] dark:text-[#3d4f66] hover:text-[#1d2633] dark:hover:text-[#4d5f76] transition-colors"
                            >
                              Okundu işaretle
                            </button>
                          ) : (
                            <span className="text-xs text-green-600 dark:text-green-400">
                              Okundu
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Sil Butonu */}
                      <button
                        onClick={() => bildirimSil(bildirim.id)}
                        className="shrink-0 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors group"
                      >
                        <Trash2 className="w-4 h-4 text-neutral-400 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
