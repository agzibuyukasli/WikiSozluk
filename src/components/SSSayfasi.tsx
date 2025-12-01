import { ArrowLeft, HelpCircle, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

interface SSSayfasiProps {
  onGeriDon: () => void;
}

export function SSSayfasi({ onGeriDon }: SSSayfasiProps) {
  const [acikSoru, setAcikSoru] = useState<number | null>(null);

  const sorular = [
    {
      kategori: "Genel",
      sorular: [
        {
          soru: "Genç Konya WikiSözlük nedir?",
          cevap: "Genç Konya WikiSözlük, Konya'da yaşayan ve okuyan gençlerin bilgi paylaşımı yaptığı, deneyimlerini aktardığı ve şehri daha iyi tanımalarını sağlayan bir topluluk platformudur."
        },
        {
          soru: "Nasıl üye olabilirim?",
          cevap: "Ana sayfadaki 'Kayıt Ol' butonuna tıklayarak e-posta adresiniz veya sosyal medya hesaplarınızla hızlıca üye olabilirsiniz."
        },
        {
          soru: "Platform tamamen ücretsiz mi?",
          cevap: "Evet! Genç Konya WikiSözlük tamamen ücretsizdir. Tüm özelliklere ücretsiz olarak erişebilirsiniz."
        }
      ]
    },
    {
      kategori: "Başlık ve Yorum",
      sorular: [
        {
          soru: "Nasıl başlık açabilirim?",
          cevap: "Sağ alt köşedeki '+' butonuna tıklayarak yeni başlık açabilirsiniz. Kategori seçin, başlığınızı yazın ve içeriğinizi paylaşın."
        },
        {
          soru: "Hangi kategorilerde başlık açabilirim?",
          cevap: "8 farklı kategoride başlık açabilirsiniz: Akademik Destek, Sosyal Yaşam, Kariyer, Keşif Rehberi, Etkinlikler, Yeme & İçme, Spor ve Sanat & Kültür."
        },
        {
          soru: "Başlığımı nasıl düzenleyebilirim?",
          cevap: "Açtığınız başlığın sağ üst köşesindeki '...' menüsünden 'Düzenle' seçeneğini kullanabilirsiniz."
        },
        {
          soru: "Yorum yaparken nelere dikkat etmeliyim?",
          cevap: "Saygılı olmak, doğru bilgi paylaşmak ve konuyla alakalı yorum yapmak en önemli kurallardır. Detaylı kurallar için 'Topluluk Kuralları' sayfasını ziyaret edebilirsiniz."
        }
      ]
    },
    {
      kategori: "Seviye ve Rozet Sistemi",
      sorular: [
        {
          soru: "Seviye sistemi nasıl çalışıyor?",
          cevap: "5 seviye vardır: Yeni Gelen (0-500 Coin), Seyyah (501-2500 Coin), Gezgin (2501-10000 Coin), Kaşif Meraklısı (10001-50000 Coin) ve Konya Bilgesi (50001+ Coin). Her katkı Coin kazandırır."
        },
        {
          soru: "Coin nasıl kazanırım?",
          cevap: "Başlık açarak, yorum yaparak, faydalı içerik paylaşarak ve toplulukta aktif olarak Coin kazanabilirsiniz. Beğenilen içerikler bonus Coin getirir."
        },
        {
          soru: "Rozetler ne işe yarar?",
          cevap: "Rozetler, belirli başarıları temsil eder ve profil sayfanızda görünür. Örneğin 'İlk Başlık', '50 Yorum', 'Popüler Yazar' gibi rozetler kazanabilirsiniz."
        },
        {
          soru: "Coin sistemi nedir?",
          cevap: "Coin, toplulukta özel içeriklere erişim ve ödüller için kullanabileceğiniz sanal bir para birimidir. Her seviyede farklı coin çarpanı kazanırsınız."
        }
      ]
    },
    {
      kategori: "Güvenlik ve Gizlilik",
      sorular: [
        {
          soru: "Kişisel bilgilerim güvende mi?",
          cevap: "Evet, tüm kişisel verileriniz şifrelenir ve güvenli sunucularda saklanır. Gizlilik politikamız KVKK'ya uygundur."
        },
        {
          soru: "Uygunsuz içerik nasıl bildirilir?",
          cevap: "Her başlık ve yorumun yanındaki 'Bildir' butonunu kullanarak uygunsuz içerikleri moderatörlere bildirebilirsiniz."
        },
        {
          soru: "Hesabımı nasıl silebilirim?",
          cevap: "Ayarlar sayfasından 'Hesap' sekmesine giderek 'Hesabı Sil' seçeneğini kullanabilirsiniz. Bu işlem geri alınamaz."
        }
      ]
    },
    {
      kategori: "Özellikler",
      sorular: [
        {
          soru: "Favorilere nasıl eklerim?",
          cevap: "Her başlığın sağ üst köşesindeki kalp ikonuna tıklayarak favorilerinize ekleyebilirsiniz. Favoriler profilinizde görünür."
        },
        {
          soru: "Karanlık mod nasıl açılır?",
          cevap: "Ayarlar sayfasından 'Görünüm' sekmesinde karanlık mod, açık mod veya otomatik tema seçeneklerinden birini seçebilirsiniz."
        },
        {
          soru: "Bildirimler nasıl çalışır?",
          cevap: "Başlıklarınıza yorum yapıldığında, beğeni aldığınızda veya yanıt geldiğinde bildirim alırsınız. Bildirim ayarlarını özelleştirebilirsiniz."
        },
        {
          soru: "Arama özelliği var mı?",
          cevap: "Evet! Üst kısımdaki arama çubuğundan başlıklarda, yorumlarda ve kullanıcılarda arama yapabilirsiniz."
        }
      ]
    }
  ];

  const toggleSoru = (index: number) => {
    setAcikSoru(acikSoru === index ? null : index);
  };

  let soruIndex = 0;

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
            <h1 className="text-[#102a6b] dark:text-[#e8f0ff]">Sıkça Sorulan Sorular</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#5990c0] to-[#015185] rounded-3xl p-8 mb-8 text-white shadow-2xl dark:shadow-[#5990c0]/20 text-center"
        >
          <HelpCircle className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-white mb-2">Nasıl Yardımcı Olabiliriz?</h2>
          <p className="text-white/90">
            En sık sorulan soruların yanıtlarını burada bulabilirsiniz. Aradığınızı bulamazsanız 
            bizimle iletişime geçebilirsiniz.
          </p>
        </motion.div>

        {/* FAQ Sections */}
        <div className="space-y-6">
          {sorular.map((kategori, katIndex) => (
            <motion.div
              key={katIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: katIndex * 0.1 }}
              className="bg-white dark:bg-gradient-to-br dark:from-[#102a6b] dark:via-[#0d2350] dark:to-[#0a1835] border border-neutral-200 dark:border-[#1e4a7a]/50 rounded-2xl p-6 shadow-lg dark:shadow-[#5990c0]/10"
            >
              <h3 className="text-[#102a6b] dark:text-[#e8f0ff] mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-gradient-to-br from-[#cea273] to-[#fcedd3] rounded-lg flex items-center justify-center text-[#102a6b]">
                  {katIndex + 1}
                </span>
                {kategori.kategori}
              </h3>
              
              <div className="space-y-3">
                {kategori.sorular.map((item) => {
                  const currentIndex = soruIndex++;
                  return (
                    <div
                      key={currentIndex}
                      className="border border-neutral-200 dark:border-[#5990c0]/20 rounded-xl overflow-hidden hover:border-[#5990c0] dark:hover:border-[#5990c0]/50 transition-colors"
                    >
                      <button
                        onClick={() => toggleSoru(currentIndex)}
                        className="w-full px-4 py-4 flex items-center justify-between bg-neutral-50 dark:bg-[#015185]/20 hover:bg-neutral-100 dark:hover:bg-[#015185]/30 transition-colors"
                      >
                        <span className="text-left text-[#102a6b] dark:text-[#e8f0ff]">{item.soru}</span>
                        <ChevronDown
                          className={`h-5 w-5 text-[#5990c0] flex-shrink-0 transition-transform ${
                            acikSoru === currentIndex ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      
                      <AnimatePresence>
                        {acikSoru === currentIndex && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 py-4 bg-white dark:bg-[#102a6b]/30 text-neutral-600 dark:text-[#9fb5d4] border-t border-neutral-200 dark:border-[#5990c0]/20">
                              {item.cevap}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-[#cea273] to-[#fcedd3] rounded-2xl p-8 text-center shadow-xl mt-8"
        >
          <h3 className="text-[#102a6b] mb-2">Sorunuz mu Var?</h3>
          <p className="text-[#102a6b]/80 mb-4">
            Aradığınız soruyu bulamadınız mı? Bize ulaşın, size yardımcı olmaktan mutluluk duyarız!
          </p>
          <button
            onClick={() => onGeriDon()}
            className="inline-flex items-center gap-2 bg-[#102a6b] text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <HelpCircle className="h-5 w-5" />
            <span>İletişime Geç</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
