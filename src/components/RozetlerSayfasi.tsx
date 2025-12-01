import { motion } from "motion/react";
import { ArrowLeft, Award, Trophy, Star, Crown, Zap, Shield, Lock, Unlock, Edit, MessageSquare, CheckCircle, Flag, Users, TrendingUp, Coins, Info } from "lucide-react";

interface RozetlerSayfasiProps {
  onGeriDon: () => void;
}

export function RozetlerSayfasi({ onGeriDon }: RozetlerSayfasiProps) {
  const roller = [
    {
      id: 1,
      isim: "Yeni Gelen",
      icon: "🌱",
      coinAraligi: "0 - 500 Coin",
      coinMin: 0,
      coinMax: 500,
      persona: "Meraklı Gözlemci",
      personaAciklama: "Platformu yeni keşfediyor, bilgi tüketiyor.",
      carpan: "1.0x",
      carpanDeger: 1.0,
      yetkiler: [
        "Yorum Alanı'na yorum yapabilir",
        "Bilgi Alanı için düzenleme teklif edebilir (onay gerekir)",
      ],
      kisitlamalar: [
        "Saatlik/günlük yorum limiti (1 saatte 5 yorum)",
        "Başlık açamaz",
        "Düzenleme teklifleri 'Kaşif Meraklısı' onayına düşer",
      ],
      amac: "Platformu öğrenmek, ilk katkıları yapmak, güven oluşturmak.",
      renk: "from-green-400 to-emerald-600",
      borderColor: "border-green-500",
    },
    {
      id: 2,
      isim: "Seyyah",
      icon: "🚶",
      coinAraligi: "501 - 2.500 Coin",
      coinMin: 501,
      coinMax: 2500,
      persona: "Katkıda Bulunan",
      personaAciklama: "Artık platformun bir parçası, deneyimlerini paylaşıyor.",
      carpan: "1.2x",
      carpanDeger: 1.2,
      yetkiler: [
        "Yorum limitleri kalkar",
        "Bilgi Alanı'nı (Wiki) doğrudan düzenleyebilir",
      ],
      kisitlamalar: [
        "Düzenlemeler anında yayınlanır ama denetime tabidir",
        "Üst roller düzenlemeleri inceleyebilir/geri alabilir",
        "Hala yeni başlık açamaz",
      ],
      amac: "Bilgi Alanı'nı zenginleştirmek, objektif bilgileri güncellemek.",
      renk: "from-blue-400 to-blue-600",
      borderColor: "border-blue-500",
    },
    {
      id: 3,
      isim: "Gezgin",
      icon: "🧳",
      coinAraligi: "2.501 - 10.000 Coin",
      coinMin: 2501,
      coinMax: 10000,
      persona: "Güvenilir İçerik Üretici",
      personaAciklama: "Platformun temel direklerinden biri.",
      carpan: "1.5x",
      carpanDeger: 1.5,
      yetkiler: [
        "Yeni başlık açabilir",
        "Platformun ufkunu genişletir",
        "Tüm düzenlemeleri yapabilir",
        "Topluluk düzenlemelere daha fazla güvenir",
      ],
      kisitlamalar: [
        "Açtığı başlıklar Kullanım Sözleşmesi'ne uygunluk açısından denetime tabidir",
      ],
      amac: "Platformun konu envanterini (içerik sütunlarını) genişletmek.",
      renk: "from-purple-400 to-purple-600",
      borderColor: "border-purple-500",
    },
    {
      id: 4,
      isim: "Kaşif Meraklısı",
      icon: "🔍",
      coinAraligi: "10.001 - 50.000 Coin",
      coinMin: 10001,
      coinMax: 50000,
      persona: "Topluluk Lideri / Moderatör",
      personaAciklama: "Platformun kalitesini ve sağlığını koruyan kişi.",
      carpan: "2.0x",
      carpanDeger: 2.0,
      yetkiler: [
        "Moderasyon yetkileri kazanır",
        "'Yeni Gelen' rolünün düzenleme tekliflerini onaylayabilir/reddedebilir",
        "Spam veya uygunsuz yorumları silebilir",
        "Bayraklanan içerikleri KBB'den önce inceleyip çözebilir",
      ],
      kisitlamalar: [],
      amac: "Kalite kontrolü, topluluk sağlığını korumak, KBB'nin denetim yükünü hafifletmek.",
      renk: "from-orange-400 to-red-500",
      borderColor: "border-orange-500",
    },
    {
      id: 5,
      isim: "Konya Bilgesi",
      icon: "👑",
      coinAraligi: "50.001+ Coin",
      coinMin: 50001,
      coinMax: null,
      persona: "Usta Rehber / Elit Katılımcı",
      personaAciklama: "Platformun zirvesi, en güvenilir üyesi.",
      carpan: "2.5x",
      carpanDeger: 2.5,
      yetkiler: [
        "Üst düzey moderasyon yetkileri",
        "'Kaşif'lerin eylemlerini denetleme",
        "KBB denetim paneline sınırlı erişim",
        "Bayraklanan İçerik Akışı'nı görme ve KBB'ye tavsiye notu bırakma",
        "Yeni özellikler için Fikir/Görüş toplantılarına davet edilme",
      ],
      kisitlamalar: [],
      amac: "Platformun stratejisine ve uzun vadeli sağlığına katkıda bulunmak.",
      renk: "from-yellow-400 to-yellow-600",
      borderColor: "border-yellow-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#5990c0]/40 via-[#fcedd3]/10 to-white dark:from-neutral-800 dark:via-neutral-900 dark:to-neutral-950">
      {/* Header */}
      <div className="bg-white dark:bg-gradient-to-r dark:from-[#0d2350] dark:to-[#0a1835] border-b border-neutral-200 dark:border-[#1e4a7a]/50 sticky top-0 z-20 shadow-sm dark:shadow-[#5990c0]/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={onGeriDon}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-[#015185]/40 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-[#102a6b] dark:text-[#e8f0ff]" />
            </button>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#cea273] to-[#fcedd3] dark:from-neutral-700 dark:to-neutral-800 shadow-lg dark:shadow-neutral-900/40">
                <Crown className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-[#102a6b] dark:text-[#e8f0ff]">Roller & Sistem</h1>
                <p className="text-sm text-neutral-600 dark:text-[#9fb5d4]">
                  Coin bazlı rol sistemi ve yetkileriniz
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-6 bg-gradient-to-br from-[#fcedd3]/50 to-[#cea273]/20 dark:from-neutral-800/50 dark:to-neutral-900/50 rounded-2xl border border-[#cea273]/50 dark:border-neutral-700/50 shadow-lg dark:shadow-neutral-900/40"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white dark:bg-[#0a1835] rounded-xl shadow-md">
              <Info className="w-6 h-6 text-[#cea273] dark:text-neutral-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-[#102a6b] dark:text-[#e8f0ff] mb-2">
                Rol Sistemi Nasıl Çalışır?
              </h3>
              <p className="text-sm text-neutral-600 dark:text-[#9fb5d4] leading-relaxed mb-3">
                Kullanıcıların toplam <strong className="text-[#cea273] dark:text-[#fcedd3]">Coin</strong> miktarı, rollerini belirler. 
                Yüksek roller, eylemlerden daha fazla puan kazanır (çarpan mantığı).
              </p>
              <div className="bg-white/50 dark:bg-[#0a1835]/50 p-4 rounded-xl border border-[#cea273]/30 dark:border-neutral-700/50">
                <p className="text-sm text-neutral-700 dark:text-[#e8f0ff] mb-2 flex items-center gap-2">
                  <Coins className="w-4 h-4 text-[#cea273] dark:text-neutral-400" />
                  <strong>Çarpan Örneği:</strong>
                </p>
                <p className="text-xs text-neutral-600 dark:text-[#9fb5d4]">
                  "Kaşif Meraklısı" (Rol 4) rolündeki bir kullanıcı "Bilgi Alanı" düzenlemesi yaptığında 
                  10 Coin yerine <strong className="text-[#cea273] dark:text-neutral-300">(10 × 2.0) = 20 Coin</strong> kazanır.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Roller */}
        <div className="space-y-6">
          {roller.map((rol, index) => (
            <motion.div
              key={rol.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`group relative bg-white dark:bg-gradient-to-br dark:from-[#102a6b] dark:to-[#0a1835] rounded-2xl border-2 ${rol.borderColor} dark:border-[#5990c0]/50 shadow-lg hover:shadow-2xl dark:hover:shadow-[#5990c0]/40 transition-all overflow-hidden`}
            >
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${rol.renk} opacity-5 dark:opacity-10`}></div>

              <div className="relative p-6">
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  {/* Icon & Rank */}
                  <div className="shrink-0">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${rol.renk} flex items-center justify-center text-4xl shadow-xl group-hover:scale-110 transition-transform`}>
                      {rol.icon}
                    </div>
                    <div className="mt-2 text-center">
                      <span className="text-xs px-2 py-1 rounded-full bg-neutral-100 dark:bg-[#015185]/50 text-neutral-600 dark:text-[#e8f0ff]">
                        Rol {rol.id}
                      </span>
                    </div>
                  </div>

                  {/* Title & Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <h3 className="text-[#102a6b] dark:text-[#e8f0ff] text-2xl">
                        {rol.isim}
                      </h3>
                      <div className={`shrink-0 px-4 py-2 rounded-xl bg-gradient-to-br ${rol.renk} shadow-md`}>
                        <div className="text-white text-center">
                          <div className="text-xs opacity-90">Çarpan</div>
                          <div className="text-xl font-semibold">{rol.carpan}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <Coins className="w-4 h-4 text-[#cea273] dark:text-neutral-400" />
                      <span className="text-sm text-[#cea273] dark:text-neutral-300">
                        {rol.coinAraligi}
                      </span>
                    </div>

                    <div className="mb-4 p-3 bg-neutral-50 dark:bg-[#0a1835]/50 rounded-xl border border-neutral-200 dark:border-[#1e4a7a]/50">
                      <div className="flex items-start gap-2">
                        <Star className="w-4 h-4 text-[#cea273] dark:text-neutral-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#102a6b] dark:text-[#e8f0ff] text-sm">
                            {rol.persona}
                          </strong>
                          <p className="text-xs text-neutral-600 dark:text-[#9fb5d4] mt-1">
                            {rol.personaAciklama}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-[#1e4a7a] to-transparent mb-6"></div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Yetkiler */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`p-1.5 rounded-lg bg-gradient-to-br ${rol.renk}`}>
                        <Unlock className="w-4 h-4 text-white" />
                      </div>
                      <h4 className="text-[#102a6b] dark:text-[#e8f0ff]">Yetkiler</h4>
                    </div>
                    <ul className="space-y-2">
                      {rol.yetkiler.map((yetki, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-[#9fb5d4]">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          <span>{yetki}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Kısıtlamalar & Amaç */}
                  <div className="space-y-4">
                    {/* Kısıtlamalar */}
                    {rol.kisitlamalar.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="p-1.5 rounded-lg bg-neutral-400">
                            <Lock className="w-4 h-4 text-white" />
                          </div>
                          <h4 className="text-[#102a6b] dark:text-[#e8f0ff]">Kısıtlamalar</h4>
                        </div>
                        <ul className="space-y-2">
                          {rol.kisitlamalar.map((kisit, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-[#9fb5d4]">
                              <Flag className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                              <span>{kisit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Amaç */}
                    <div className="p-4 bg-gradient-to-br from-[#fcedd3]/30 to-transparent dark:from-neutral-800/30 dark:to-transparent rounded-xl border border-[#cea273]/30 dark:border-neutral-700/50">
                      <div className="flex items-start gap-2">
                        <Trophy className="w-4 h-4 text-[#cea273] dark:text-neutral-400 shrink-0 mt-0.5" />
                        <div>
                          <h5 className="text-xs text-[#102a6b] dark:text-[#e8f0ff] mb-1">Amaç</h5>
                          <p className="text-xs text-neutral-600 dark:text-[#9fb5d4] leading-relaxed">
                            {rol.amac}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-6 bg-white dark:bg-gradient-to-br dark:from-[#102a6b] dark:to-[#0a1835] rounded-2xl border border-neutral-200 dark:border-[#1e4a7a]/50 shadow-md dark:shadow-[#5990c0]/20"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-br from-[#015185] to-[#5990c0] rounded-xl shadow-md">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-[#102a6b] dark:text-[#e8f0ff] mb-3">
                Rolünüzü Nasıl Yükseltirsiniz?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-neutral-600 dark:text-[#9fb5d4]">
                <div className="flex items-start gap-2">
                  <MessageSquare className="w-4 h-4 text-[#5990c0] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#102a6b] dark:text-[#e8f0ff]">Aktif Katılım:</strong>
                    <span className="block text-xs mt-1">Yorum yapın, başlık açın, toplulukla etkileşime geçin</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Edit className="w-4 h-4 text-[#5990c0] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#102a6b] dark:text-[#e8f0ff]">Bilgi Alanı Düzenlemeleri:</strong>
                    <span className="block text-xs mt-1">Wiki'yi güncelleyin ve zenginleştirin</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-[#5990c0] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#102a6b] dark:text-[#e8f0ff]">Kaliteli İçerik:</strong>
                    <span className="block text-xs mt-1">Topluluk tarafından beğenilen ve faydalı içerikler oluşturun</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-[#5990c0] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#102a6b] dark:text-[#e8f0ff]">Kurallara Uyum:</strong>
                    <span className="block text-xs mt-1">Platformun kurallarına uygun davranın ve güven kazanın</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-[#fcedd3]/30 dark:bg-neutral-800/30 rounded-xl border border-[#cea273]/30 dark:border-neutral-700/50">
                <p className="text-xs text-[#102a6b] dark:text-[#e8f0ff]">
                  <Coins className="w-4 h-4 text-[#cea273] dark:text-neutral-400 inline mr-2" />
                  <strong>Hatırlatma:</strong> Coin kazandıkça rolünüz otomatik olarak yükselir. Her rol, daha fazla yetki ve sorumluluk getirir!
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
