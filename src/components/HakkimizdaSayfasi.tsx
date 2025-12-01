import { ArrowLeft, Heart, Users, BookOpen, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface HakkimizdaSayfasiProps {
  onGeriDon: () => void;
}

export function HakkimizdaSayfasi({ onGeriDon }: HakkimizdaSayfasiProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-[#0a1835] dark:via-[#0d2350] dark:to-[#102a6b] pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-[#102a6b]/80 backdrop-blur-xl border-b border-neutral-200 dark:border-[#1e4a7a]/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onGeriDon}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-[#015185]/50 rounded-xl transition-colors"
            >
              <ArrowLeft className="h-6 w-6 text-[#5990c0]" />
            </button>
            <h1 className="text-[#102a6b] dark:text-[#e8f0ff]">Hakkımızda</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#cea273] to-[#102a6b] rounded-3xl p-8 mb-8 text-white shadow-2xl dark:shadow-[#5990c0]/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="h-8 w-8" />
            <h2 className="text-white">Genç Konya WikiSözlük</h2>
          </div>
          <p className="text-white/90 text-lg leading-relaxed">
            Konya'nın gençlerinin bir araya geldiği, bilgi paylaşımının özgürce yapıldığı, 
            şehrimizi ve üniversite hayatını daha iyi tanımanızı sağlayan bir bilgi platformu.
          </p>
        </motion.div>

        {/* Mission Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gradient-to-br dark:from-[#102a6b] dark:via-[#0d2350] dark:to-[#0a1835] border border-neutral-200 dark:border-[#1e4a7a]/50 rounded-2xl p-6 shadow-lg dark:shadow-[#5990c0]/10"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-[#015185] to-[#5990c0] rounded-xl flex items-center justify-center mb-4 shadow-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-[#102a6b] dark:text-[#e8f0ff] mb-2">Bilgi Paylaşımı</h3>
            <p className="text-neutral-600 dark:text-[#9fb5d4] text-sm">
              Akademik destekten sosyal yaşama, kariyerden keşif rehberine kadar her konuda deneyimlerini paylaş.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gradient-to-br dark:from-[#102a6b] dark:via-[#0d2350] dark:to-[#0a1835] border border-neutral-200 dark:border-[#1e4a7a]/50 rounded-2xl p-6 shadow-lg dark:shadow-[#5990c0]/10"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-[#cea273] to-[#fcedd3] rounded-xl flex items-center justify-center mb-4 shadow-lg">
              <Users className="h-6 w-6 text-[#102a6b]" />
            </div>
            <h3 className="text-[#102a6b] dark:text-[#e8f0ff] mb-2">Topluluk</h3>
            <p className="text-neutral-600 dark:text-[#9fb5d4] text-sm">
              Binlerce Konyalı genç ve üniversite öğrencisi ile bağlantı kur, deneyimlerinden faydalanın.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gradient-to-br dark:from-[#102a6b] dark:via-[#0d2350] dark:to-[#0a1835] border border-neutral-200 dark:border-[#1e4a7a]/50 rounded-2xl p-6 shadow-lg dark:shadow-[#5990c0]/10"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-[#015185] to-[#102a6b] rounded-xl flex items-center justify-center mb-4 shadow-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-[#102a6b] dark:text-[#e8f0ff] mb-2">Konya Sevgisi</h3>
            <p className="text-neutral-600 dark:text-[#9fb5d4] text-sm">
              Şehrimizi daha iyi tanı, gizli kalmış güzelliklerini keşfet ve başkalarıyla paylaş.
            </p>
          </motion.div>
        </div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gradient-to-br dark:from-[#102a6b] dark:via-[#0d2350] dark:to-[#0a1835] border border-neutral-200 dark:border-[#1e4a7a]/50 rounded-2xl p-8 shadow-lg dark:shadow-[#5990c0]/10 mb-8"
        >
          <h3 className="text-[#102a6b] dark:text-[#e8f0ff] mb-4">Hikayemiz</h3>
          <div className="space-y-4 text-neutral-700 dark:text-[#9fb5d4]">
            <p>
              Genç Konya WikiSözlük, Konya'da yaşayan ve okuyan gençlerin ihtiyaçlarından doğdu. 
              Yeni gelen öğrencilerin şehre adapte olması, yerel halkın üniversite hayatını daha iyi 
              anlaması ve herkesin bilgi paylaşabileceği özgür bir platform oluşturma hedefiyle yola çıktık.
            </p>
            <p>
              Platformumuzda her gün yüzlerce başlık açılıyor, binlerce yorum yapılıyor. 
              "Yeni Gelen" seviyesinden "Konya Bilgesi" seviyesine kadar ilerleyebilir, 
              katkılarınızla toplulukta saygın bir yer edinebilirsiniz.
            </p>
            <p>
              8 farklı kategoride, akademik destekten yeme-içme önerilerine, etkinliklerden 
              kariyer tavsiyelerine kadar geniş bir yelpazede içerik üretiyoruz. Her yeni bilgi, 
              şehrimizi ve topluluğumuzu daha güçlü kılıyor.
            </p>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="bg-gradient-to-br from-[#015185] to-[#5990c0] rounded-2xl p-6 text-center shadow-xl">
            <p className="text-3xl text-white mb-2">2.5k+</p>
            <p className="text-white/80 text-sm">Toplam Başlık</p>
          </div>
          <div className="bg-gradient-to-br from-[#cea273] to-[#fcedd3] rounded-2xl p-6 text-center shadow-xl">
            <p className="text-3xl text-[#102a6b] mb-2">8.4k+</p>
            <p className="text-[#102a6b]/80 text-sm">Aktif Kullanıcı</p>
          </div>
          <div className="bg-gradient-to-br from-[#102a6b] to-[#015185] rounded-2xl p-6 text-center shadow-xl">
            <p className="text-3xl text-white mb-2">15k+</p>
            <p className="text-white/80 text-sm">Toplam Yorum</p>
          </div>
          <div className="bg-gradient-to-br from-[#5990c0] to-[#015185] rounded-2xl p-6 text-center shadow-xl">
            <p className="text-3xl text-white mb-2">8</p>
            <p className="text-white/80 text-sm">Kategori</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
