import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Eye, Edit, ThumbsUp, Clock, TrendingUp, MessageSquare, BookOpen, Coffee, Briefcase, Map, Theater, Utensils, Dumbbell, Palette, Plus, Search, Bell, User } from "lucide-react";
import { useState } from "react";
import { BildirimPaneli } from "./BildirimPaneli";
import { ProfilSayfasi } from "./ProfilSayfasi";

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
  yorumSayisi: number;
}

interface KategoriListesiProps {
  kategori: string | null;
  basliklar: Baslik[];
  onClose: () => void;
  onBaslikClick: (baslik: Baslik) => void;
}

export function KategoriListesi({ kategori, basliklar, onClose, onBaslikClick }: KategoriListesiProps) {
  const [siralamaKriteri, setSiralamaKriteri] = useState<'yeni' | 'populer' | 'cokyorumlanan'>('yeni');
  const [aramaMetni, setAramaMetni] = useState("");
  const [isBildirimOpen, setIsBildirimOpen] = useState(false);
  const [isProfilOpen, setIsProfilOpen] = useState(false);

  // Kategori ikonları, renkleri ve açıklamaları
  const kategoriVerileri: Record<string, { icon: any; color: string; gradient: string; aciklama: string }> = {
    "Akademik Destek": { 
      icon: BookOpen, 
      color: "#015185", 
      gradient: "from-[#015185] to-[#102a6b]",
      aciklama: "Bu kategoride ders notları, sınav hazırlık ipuçları, ödev yardımı, proje tavsiyeleri, kaynak önerileri, ders programları ve akademik başarı için ipuçları paylaşılır. Hocalarla ilgili deneyimler, ders seçimi tavsiyeleri ve akademik kariyer planlaması hakkında bilgi alışverişinde bulunabilirsiniz."
    },
    "Sosyal Yaşam & Mekan Rehberi": { 
      icon: Coffee, 
      color: "#015185", 
      gradient: "from-[#015185] to-[#102a6b]",
      aciklama: "Kampüs yaşamı, sosyal aktiviteler, arkadaşlık grupları, öğrenci kulüpleri, hobiler ve ilgi alanlarıyla ilgili paylaşımlar için alan. Konya'da gezilecek yerler, tarihi mekanlar, doğa rotaları ve şehri keşfetmek için öneriler burada paylaşılır."
    },
    "Sosyal Yaşam": { 
      icon: Coffee, 
      color: "#015185", 
      gradient: "from-[#015185] to-[#102a6b]",
      aciklama: "Kampüs yaşamı, sosyal aktiviteler, arkadaşlık grupları, öğrenci kulüpleri, hobiler ve ilgi alanlarıyla ilgili paylaşımlar için alan. Yeni arkadaşlar edinmek, sosyal çevreyi genişletmek ve kampüs hayatından maksimum verim almak için ipuçları burada."
    },
    "Kariyer": { 
      icon: Briefcase, 
      color: "#015185", 
      gradient: "from-[#015185] to-[#102a6b]",
      aciklama: "Staj fırsatları, iş ilanları, kariyer danışmanlığı, CV hazırlama, mülakat teknikleri, networking ipuçları ve mezuniyet sonrası planlar burada paylaşılır. İş dünyası deneyimleri, sektörel bilgiler ve kariyer gelişimi için öneriler bu kategoride bulunur."
    },
    "Keşif Rehberi": { 
      icon: Map, 
      color: "#015185", 
      gradient: "from-[#015185] to-[#102a6b]",
      aciklama: "Konya'da gezilecek yerler, tarihi mekanlar, müzeler, parklar, doğa rotaları ve şehri keşfetmek için öneriler burada paylaşılır. Gezi planları, fotoğraf noktaları ve yerel rehber tavsiyeleri için ideal kategori."
    },
    "Etkinlikler": { 
      icon: Theater, 
      color: "#015185", 
      gradient: "from-[#015185] to-[#102a6b]",
      aciklama: "Kampüs etkinlikleri, konserler, seminerler, workshoplar, festivaller, tiyatro gösterileri ve çeşitli organizasyonlar hakkında duyurular ve değerlendirmeler paylaşılır. Yaklaşan etkinlikler ve katılım bilgileri burada bulunur."
    },
    "Yeme & İçme": { 
      icon: Utensils, 
      color: "#015185", 
      gradient: "from-[#015185] to-[#102a6b]",
      aciklama: "Konya'nın en iyi restoranları, kafeler, yemek önerileri, öğrenci dostu mekanlar, yerel lezzetler ve ekonomik yeme içme seçenekleri bu kategoride paylaşılır. Yemek tarifleri, kafe tavsiyeleri ve gurme deneyimler için burası ideal."
    },
    "Spor": { 
      icon: Dumbbell, 
      color: "#015185", 
      gradient: "from-[#015185] to-[#102a6b]",
      aciklama: "Spor salonları, fitness merkezleri, takım sporları, antrenman programları, spor etkinlikleri ve sağlıklı yaşam tavsiyeleri paylaşılır. Kampüs spor tesisleri, spor kulüpleri ve aktif yaşam için ipuçları burada."
    },
    "Sanat & Kültür": { 
      icon: Palette, 
      color: "#015185", 
      gradient: "from-[#015185] to-[#102a6b]",
      aciklama: "Sanat galerileri, sergiler, müzik etkinlikleri, tiyatro, edebiyat, kültürel aktiviteler ve sanatsal projeler hakkında paylaşımlar yapılır. Yaratıcı fikirler, sanatsal deneyimler ve kültürel gelişim için bu kategoriyi kullanın."
    },
  };

  const kategoriData = kategori ? kategoriVerileri[kategori] : { icon: BookOpen, color: "#5990c0", gradient: "from-[#5990c0] to-[#102a6b]" };
  const KategoriIkon = kategoriData?.icon || BookOpen;

  // Arama ve sıralama
  const filtreliBasliklar = basliklar.filter(baslik =>
    baslik.baslik.toLowerCase().includes(aramaMetni.toLowerCase()) ||
    baslik.icerik.toLowerCase().includes(aramaMetni.toLowerCase()) ||
    (baslik.etiketler && baslik.etiketler.some(etiket => etiket.toLowerCase().includes(aramaMetni.toLowerCase())))
  );

  const siraliBasliklar = [...filtreliBasliklar].sort((a, b) => {
    if (siralamaKriteri === 'populer') {
      return b.goruntulenme - a.goruntulenme;
    } else if (siralamaKriteri === 'cokyorumlanan') {
      return b.yorumSayisi - a.yorumSayisi;
    }
    return 0;
  });

  // Profil açıksa sadece profil sayfasını göster
  if (isProfilOpen) {
    return <ProfilSayfasi onClose={() => setIsProfilOpen(false)} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-[#5990c0]/40 via-[#fcedd3]/10 to-white dark:from-[#0a1835] dark:via-[#0d2350]/50 dark:to-[#0a1835]"
    >
      {/* Header with Back Button */}
      <div className="bg-white dark:bg-gradient-to-br dark:from-[#0d2350] dark:to-[#0a1835] border-b border-neutral-200 dark:border-[#1e4a7a]/50 shadow-sm dark:shadow-[#5990c0]/10">
        <div className="container mx-auto px-4 py-3">
          {/* Top Bar - Geri Butonu, Kategori Adı, Bildirim & Profil */}
          <div className="flex items-center justify-between gap-2 mb-3">
            {/* Sol: Geri Butonu */}
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-[#015185]/40 transition-colors shrink-0"
            >
              <ArrowLeft className="h-5 w-5 text-[#102a6b] dark:text-[#e8f0ff]" />
            </motion.button>

            {/* Ortada: Kategori Adı */}
            <div className="flex-1 flex items-center justify-center gap-3 min-w-0 px-2">
              <KategoriIkon className="h-7 w-7 shrink-0" style={{ color: kategoriData.color }} />
              <h1 className="text-2xl md:text-3xl truncate text-[#102a6b] dark:text-[#e8f0ff]" style={{ fontWeight: 700 }}>{kategori || "Tüm Kategoriler"}</h1>
            </div>

            {/* Sağ: Bildirim ve Profil Butonları */}
            <div className="flex items-center gap-2 shrink-0">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsBildirimOpen(true)}
                className="w-10 h-10 rounded-xl shadow-md dark:shadow-[#015185]/40 hover:shadow-lg transition-all flex items-center justify-center relative"
                style={{ background: '#015185' }}
              >
                <Bell className="h-5 w-5 text-white" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 dark:bg-red-600 rounded-full flex items-center justify-center text-white text-[10px] shadow-lg">
                  3
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsProfilOpen(true)}
                className="w-10 h-10 rounded-xl shadow-md dark:shadow-[#cea273]/40 hover:shadow-lg transition-all flex items-center justify-center relative overflow-hidden text-white"
                style={{ background: '#cea273' }}
              >
                B
              </motion.button>
            </div>
          </div>

          {/* Sorting Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { key: 'yeni', label: 'En Yeni', icon: Clock },
              { key: 'populer', label: 'Popüler', icon: TrendingUp },
            ].map(({ key, label, icon: Icon }) => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSiralamaKriteri(key as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all whitespace-nowrap ${
                  siralamaKriteri === key
                    ? 'text-white shadow-md dark:shadow-[#5990c0]/40'
                    : 'bg-neutral-100 dark:bg-[#015185]/30 text-neutral-700 dark:text-[#e8f0ff] hover:bg-neutral-200 dark:hover:bg-[#015185]/50 dark:border dark:border-[#5990c0]/30'
                }`}
                style={siralamaKriteri === key ? { background: '#102a6b' } : {}}
              >
                <Icon className="h-4 w-4" />
                {label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Kategori Açıklama Kartı */}
          {kategori && kategoriData.aciklama && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 bg-gradient-to-br from-white to-[#fcedd3]/10 dark:from-[#102a6b] dark:to-[#0d2350] rounded-3xl p-8 shadow-xl dark:shadow-2xl dark:shadow-[#5990c0]/20 border-2 border-[#cea273]/30 dark:border-[#5990c0]/30 relative overflow-hidden"
            >
              {/* Dekoratif Arka Plan */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#5990c0]/10 to-transparent dark:from-[#5990c0]/20 rounded-full blur-3xl -z-0"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#cea273]/10 to-transparent dark:from-[#cea273]/20 rounded-full blur-3xl -z-0"></div>

              <div className="relative z-10">
                {/* Başlık */}
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="w-20 h-20 rounded-2xl shadow-lg dark:shadow-xl dark:shadow-[#5990c0]/30 flex items-center justify-center text-white"
                    style={{ background: '#015185' }}
                  >
                    <KategoriIkon className="h-10 w-10" />
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl text-[#102a6b] dark:text-[#e8f0ff] mb-1" style={{ fontWeight: 700 }}>
                      {kategori}
                    </h2>
                    <p className="text-sm text-[#5990c0] dark:text-[#9fb5d4]" style={{ fontWeight: 500 }}>Kategori Rehberi</p>
                  </div>
                </div>

                {/* Açıklama */}
                <div className="bg-white/60 dark:bg-[#0a1835]/40 backdrop-blur-sm rounded-2xl p-6 border border-[#cea273]/20 dark:border-[#5990c0]/20">
                  <div className="flex items-start gap-3">
                    <div className="w-1 h-full bg-gradient-to-b from-[#cea273] to-[#5990c0] rounded-full"></div>
                    <div className="flex-1">
                      <h3 className="text-sm uppercase tracking-wide text-[#5990c0] dark:text-[#9fb5d4] mb-3" style={{ fontWeight: 600 }}>
                        Bu Kategoride Ne Paylaşılır?
                      </h3>
                      <p className="text-neutral-700 dark:text-[#e8f0ff]/90 leading-relaxed" style={{ fontSize: "15px" }}>
                        {kategoriData.aciklama}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gradient-to-br dark:from-[#102a6b] dark:to-[#0a1835] rounded-2xl p-4 shadow-sm dark:shadow-[#5990c0]/10 border border-neutral-200 dark:border-[#1e4a7a]/50"
            >
              <div className="flex items-center gap-2 mb-1">
                <MessageSquare className="h-4 w-4 text-[#5990c0]" />
                <span className="text-xs text-neutral-600 dark:text-[#9fb5d4]">Toplam Başlık</span>
              </div>
              <p className="text-2xl text-[#102a6b] dark:text-[#e8f0ff]">{basliklar.length}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gradient-to-br dark:from-[#102a6b] dark:to-[#0a1835] rounded-2xl p-4 shadow-sm dark:shadow-[#5990c0]/10 border border-neutral-200 dark:border-[#1e4a7a]/50"
            >
              <div className="flex items-center gap-2 mb-1">
                <Eye className="h-4 w-4 text-[#5990c0]" />
                <span className="text-xs text-neutral-600 dark:text-[#9fb5d4]">Toplam Görüntüleme</span>
              </div>
              <p className="text-2xl text-[#102a6b] dark:text-[#e8f0ff]">
                {basliklar.reduce((acc, b) => acc + b.goruntulenme, 0)}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gradient-to-br dark:from-[#102a6b] dark:to-[#0a1835] rounded-2xl p-4 shadow-sm dark:shadow-[#5990c0]/10 border border-neutral-200 dark:border-[#1e4a7a]/50"
            >
              <div className="flex items-center gap-2 mb-1">
                <MessageSquare className="h-4 w-4 text-[#5990c0]" />
                <span className="text-xs text-neutral-600 dark:text-[#9fb5d4]">Toplam Yorum</span>
              </div>
              <p className="text-2xl text-[#102a6b] dark:text-[#e8f0ff]">
                {basliklar.reduce((acc, b) => acc + b.yorumSayisi, 0)}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gradient-to-br dark:from-[#102a6b] dark:to-[#0a1835] rounded-2xl p-4 shadow-sm dark:shadow-[#5990c0]/10 border border-neutral-200 dark:border-[#1e4a7a]/50"
            >
              <div className="flex items-center gap-2 mb-1">
                <ThumbsUp className="h-4 w-4 text-[#5990c0]" />
                <span className="text-xs text-neutral-600 dark:text-[#9fb5d4]">Toplam Beğeni</span>
              </div>
              <p className="text-2xl text-[#102a6b] dark:text-[#e8f0ff]">
                {basliklar.reduce((acc, b) => acc + b.begeni, 0)}
              </p>
            </motion.div>
          </div>

          {/* Başlıklar Listesi */}
          <div className="space-y-4">
            {siraliBasliklar.map((baslik, index) => (
              <motion.div
                key={baslik.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.01, y: -2 }}
                onClick={() => onBaslikClick(baslik)}
                className="bg-white dark:bg-gradient-to-br dark:from-[#102a6b] dark:to-[#0a1835] rounded-2xl p-6 shadow-sm hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-[#5990c0]/20 border-2 border-neutral-200 dark:border-[#1e4a7a]/50 hover:border-[#5990c0] dark:hover:border-[#5990c0]/50 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl text-neutral-900 dark:text-[#e8f0ff] mb-2 hover:text-[#5990c0] transition-colors">
                      {baslik.baslik}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-[#9fb5d4] line-clamp-2 mb-4">
                      {baslik.icerik}
                    </p>

                    {/* Tags */}
                    {baslik.etiketler && baslik.etiketler.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {baslik.etiketler.map((etiket, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-lg text-xs"
                            style={{ background: 'rgba(89, 144, 192, 0.1)', color: '#5990c0' }}
                          >
                            #{etiket}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 dark:text-[#9fb5d4]">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full shadow-md shrink-0 flex items-center justify-center text-white text-sm" style={{ background: '#cea273' }}>
                          {baslik.yazar.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-neutral-800 dark:text-[#e8f0ff]">{baslik.yazar}</span>
                          <span className="px-2 py-0.5 rounded text-xs text-white" style={{ background: '#5990c0' }}>
                            {baslik.yazarRol}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {baslik.tarih}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {baslik.goruntulenme}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {baslik.yorumSayisi} yorum
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        {baslik.begeni}
                      </div>
                      <div className="flex items-center gap-1">
                        <Edit className="h-4 w-4" />
                        {baslik.duzenlemeSayisi} düzenleme
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {siraliBasliklar.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="inline-flex p-6 rounded-full bg-neutral-100 mb-4">
                <KategoriIkon className="h-16 w-16 text-neutral-400" />
              </div>
              <h3 className="text-xl text-neutral-700 mb-2">
                {aramaMetni ? "Arama sonucu bulunamadı" : "Bu kategoride henüz başlık bulunmuyor"}
              </h3>
              <p className="text-sm text-neutral-500 mb-6">
                {aramaMetni ? "Farklı anahtar kelimelerle tekrar deneyin" : "İlk başlığı sen oluştur!"}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl text-white shadow-md hover:shadow-lg transition-all flex items-center gap-2 mx-auto"
                style={{ background: '#5990c0' }}
              >
                <Plus className="h-5 w-5" />
                Yeni Başlık Oluştur
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Bildirim Paneli */}
      <AnimatePresence>
        {isBildirimOpen && (
          <BildirimPaneli onClose={() => setIsBildirimOpen(false)} />
        )}
      </AnimatePresence>

      {/* Profil Sayfası - Artık ayrı sayfa olarak gösteriliyor */}
    </motion.div>
  );
}
