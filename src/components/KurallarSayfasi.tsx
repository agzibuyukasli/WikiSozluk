import { ArrowLeft, Shield, AlertTriangle, Heart, ThumbsUp, MessageSquare, Ban } from "lucide-react";
import { motion } from "motion/react";

interface KurallarSayfasiProps {
  onGeriDon: () => void;
}

export function KurallarSayfasi({ onGeriDon }: KurallarSayfasiProps) {
  const kurallar = [
    {
      icon: Heart,
      baslik: "Saygılı Ol",
      aciklama: "Her kullanıcıya saygılı davran. Hakaret, aşağılama ve kişisel saldırılar kesinlikle yasaktır.",
      renk: "from-[#015185] to-[#5990c0]"
    },
    {
      icon: Shield,
      baslik: "Doğru Bilgi Paylaş",
      aciklama: "Paylaştığın bilgilerin doğruluğundan emin ol. Yanıltıcı veya yanlış bilgi paylaşmaktan kaçın.",
      renk: "from-[#cea273] to-[#fcedd3]"
    },
    {
      icon: MessageSquare,
      baslik: "Konuya Uygun Yorum Yap",
      aciklama: "Başlığın konusuyla alakalı yorumlar yap. Off-topic (konuyla alakasız) içeriklerden uzak dur.",
      renk: "from-[#5990c0] to-[#015185]"
    },
    {
      icon: Ban,
      baslik: "Spam Yapma",
      aciklama: "Aynı içeriği tekrar tekrar paylaşma, reklam yapma veya gereksiz tekrarlarda bulunma.",
      renk: "from-[#102a6b] to-[#015185]"
    },
    {
      icon: AlertTriangle,
      baslik: "Yasa Dışı İçerik Yasak",
      aciklama: "Yasalara aykırı, şiddet içeren, nefret söylemi içeren veya telif hakkı ihlali yapan içerikler paylaşılmaz.",
      renk: "from-red-500 to-orange-500"
    },
    {
      icon: ThumbsUp,
      baslik: "Yapıcı Eleştiri Yap",
      aciklama: "Eleştirilerini saygı çerçevesinde ve yapıcı bir dille ifade et. Katkı sunmayan eleştirilerden kaçın.",
      renk: "from-[#cea273] to-[#5990c0]"
    }
  ];

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
            <h1 className="text-[#102a6b] dark:text-[#e8f0ff]">Topluluk Kuralları</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#015185] to-[#102a6b] rounded-3xl p-8 mb-8 text-white shadow-2xl dark:shadow-[#5990c0]/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8" />
            <h2 className="text-white">Güvenli ve Saygılı Bir Topluluk</h2>
          </div>
          <p className="text-white/90 leading-relaxed">
            Genç Konya WikiSözlük'te herkesin özgürce bilgi paylaşabileceği, güvenli ve saygılı 
            bir ortam oluşturmak için bazı temel kurallara uymamız gerekiyor. Bu kurallar, 
            topluluğumuzun kalitesini korumak ve herkes için pozitif bir deneyim sağlamak amacıyla hazırlanmıştır.
          </p>
        </motion.div>

        {/* Rules Cards */}
        <div className="space-y-4 mb-8">
          {kurallar.map((kural, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gradient-to-br dark:from-[#102a6b] dark:via-[#0d2350] dark:to-[#0a1835] border border-neutral-200 dark:border-[#1e4a7a]/50 rounded-2xl p-6 shadow-lg dark:shadow-[#5990c0]/10 hover:shadow-xl dark:hover:shadow-[#5990c0]/20 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${kural.renk} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <kural.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[#102a6b] dark:text-[#e8f0ff] mb-2">{index + 1}. {kural.baslik}</h3>
                  <p className="text-neutral-600 dark:text-[#9fb5d4]">{kural.aciklama}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Violation Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white dark:bg-gradient-to-br dark:from-[#102a6b] dark:via-[#0d2350] dark:to-[#0a1835] border border-neutral-200 dark:border-[#1e4a7a]/50 rounded-2xl p-8 shadow-lg dark:shadow-[#5990c0]/10 mb-8"
        >
          <h3 className="text-[#102a6b] dark:text-[#e8f0ff] mb-4">Kural İhlalleri</h3>
          <div className="space-y-3 text-neutral-700 dark:text-[#9fb5d4]">
            <p>
              Kurallara uymayanlar hakkında aşağıdaki yaptırımlar uygulanabilir:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start gap-2">
                <span className="text-[#cea273] mt-1">•</span>
                <span><strong className="text-[#102a6b] dark:text-[#e8f0ff]">İlk ihlal:</strong> Uyarı mesajı</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#cea273] mt-1">•</span>
                <span><strong className="text-[#102a6b] dark:text-[#e8f0ff]">İkinci ihlal:</strong> 24 saat geçici uzaklaştırma</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#cea273] mt-1">•</span>
                <span><strong className="text-[#102a6b] dark:text-[#e8f0ff]">Üçüncü ihlal:</strong> 7 gün geçici uzaklaştırma</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#cea273] mt-1">•</span>
                <span><strong className="text-[#102a6b] dark:text-[#e8f0ff]">Ciddi veya tekrarlanan ihlaller:</strong> Kalıcı hesap kapatma</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Report Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-br from-[#cea273] to-[#fcedd3] rounded-2xl p-6 text-center shadow-xl"
        >
          <h3 className="text-[#102a6b] mb-2">Kural İhlali Gördün mü?</h3>
          <p className="text-[#102a6b]/80 mb-4">
            Topluluk kurallarına aykırı bir içerik görürsen, "Bildir" butonunu kullanarak moderatörlere bildir.
          </p>
          <div className="inline-flex items-center gap-2 bg-[#102a6b] text-white px-6 py-3 rounded-xl shadow-lg">
            <AlertTriangle className="h-5 w-5" />
            <span>Birlikte Güvenli Bir Topluluk Oluşturalım</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
