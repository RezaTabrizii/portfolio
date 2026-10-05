import type { PortfolioCopy } from '~/types/portfolio'

export default {
  meta: {
    title: 'Reza Tabrizi — Full-Stack Geliştirici (.NET & Vue)',
    description: '.NET ve Vue ile üretim sistemlerini uçtan uca geliştirmede 3 yılı aşkın deneyime sahip full-stack geliştirici. Tebriz, İran merkezli — uzaktan çalışmaya açık.',
  },
  name: 'Reza Tabrizi',
  avatarAlt: 'Reza Tabrizi\'nin portresi',
  jobTitle: 'Full-Stack Geliştirici',
  tagline: 'Full-Stack · .NET & Vue',
  headline: 'Full-Stack Geliştirici — .NET & Vue',
  sentences: [
    'Full-Stack Geliştirici — .NET & Vue',
    'Üretim sistemlerini uçtan uca geliştiriyorum',
    'npm\'de açık kaynak yazarı',
  ],
  location: 'Tebriz, İran (uzaktan çalışmaya açık)',
  city: 'Tebriz',
  languages: ['Farsça (Ana dil)', 'Türkçe (Ana dil)', 'İngilizce (Profesyonel)'],
  emailLabel: 'E-posta',
  summary:
    '.NET ve Vue ile üretim sistemlerini uçtan uca teslim etmede 3 yılı aşkın deneyime sahip full-stack geliştirici; Docker ile dağıtım yapar, SOLID, temiz mimari ve sistem tasarımı temelleri sayesinde yeni teknolojilere hızla uyum sağlar. Backend tarafında RBAC sistemleri, SignalR ile gerçek zamanlı özellikler ve yarış koşullarına karşı güvenli ödeme akışları; frontend tarafında çok rollü Nuxt panelleri ve SEO odaklı e-ticaret vitrinleri geliştirdi. npm\'de yayımlanmış açık kaynak bir Vue bileşeninin yazarıdır; ajan tabanlı yapay zekâ kodlama araçlarını her gün, bağlamı sıkı biçimde sınırlayarak düşük maliyetli ve üretim kalitesinde değişiklikler için kullanır, tasarımın sorumluluğunu üstlenir ve her diff\'i inceler.',
  stack: {
    languages: 'Diller',
    backend: 'Backend',
    frontend: 'Frontend',
    data: 'Veri',
    devops: 'DevOps',
    practices: 'Yöntemler',
  },
  experience: {
    'isbis': {
      location: 'Pekin, Çin',
      locationType: 'Uzaktan',
      title: 'Front-end Geliştirici',
      description: [
        'Öğrencileri, velileri, okulları ve danışmanları buluşturan bir eğitim portalının frontend\'ini geliştirdim',
        'Tek bir Nuxt.js monorepo içinde, her biri farklı yetki modeline sahip 4 rol tabanlı panel geliştirdim; bileşenler, Pinia store\'ları, tipler ve API istemcileri uygulamalar arasında paylaşıldığı için her kullanıcı tipi UI kodu tekrarlanmadan eklenebiliyor',
        'İki cihazlı gözetimli sınav ortamı kurdum: aday sınava bir cihazdan girerken ikinci cihaz kamera ve oda görüntüsünü canlı izleme merkezine aktarıyor; cihazlardan biri bağlantıyı kaybettiği anda sınav otomatik olarak duraklıyor',
        'Bu merkez üzerine canlı gözetmenlik panelini geliştirdim; yöneticiler ve okul personeli eş zamanlı sınav oturumlarını gerçek zamanlı izleyebiliyor ve kopya tespit edildiğinde adayı anında diskalifiye edebiliyor',
        'Okul arama ve başvuru akışını erişilebilir, duyarlı bileşenler etrafında yeniden tasarlayarak başvuru sürecini 5 adımdan 3 adıma indirdim',
      ],
    },
    'nira': {
      location: 'Tebriz, İran',
      title: 'Full-Stack Geliştirici',
      employmentType: 'Bireysel yan proje',
      description: [
        'Veritabanı şeması, .NET REST API, vitrin ve teknik olmayan personelin mağazayı yönetebildiği bir Vue yönetim paneli dahil eksiksiz bir e-ticaret platformunu tek başıma tasarlayıp geliştirdim ve yayına aldım. MVP 5 haftada yayına girdi',
        'Her merge\'de tüm yapıyı Docker Compose ile derleyip dağıtan bir GitLab CI/CD hattı kurdum; sürümler manuel sunucu işi gerektirmeden yayınlanıyor',
        'Ödeme ve satın alma akışını veritabanı düzeyinde eşzamanlılık kontrolleriyle geliştirerek eş zamanlı siparişlerde çift tahsilat ve stok aşımı yarış koşullarını ortadan kaldırdım',
        'Figma tasarımlarından piksel hassasiyetinde bir Nuxt + Tailwind vitrini geliştirdim ve organik arama trafiğini artırmak için teknik SEO (SSR, yapılandırılmış veri, meta optimizasyonu) uyguladım',
      ],
    },
    'ika': {
      location: 'Tahran, İran',
      locationType: 'Uzaktan',
      title: 'Back-end Geliştirici',
      description: [
        '80 aktif kullanıcıyla 200\'den fazla sözleşmeyi yöneten, 75GB proje dosyasını S3 üzerinden saklayıp sunan kurumsal bir denetim sözleşmesi platformunun backend mimarisini tasarladım',
        'Birden çok kullanıcı rolü için ayrıntılı yetkilere sahip rol tabanlı erişim kontrolü (RBAC) sistemi tasarladım; yetkiler rol bazında kolayca eklenip kaldırılabiliyor ve bir rol güncellendiğinde etkilenen tüm kullanıcıların yetkileri otomatik olarak senkronize ediliyor',
        'SignalR Hub\'ları ile gerçek zamanlı sohbet ve canlı sistem bildirimleri geliştirdim; farklı konumlardaki denetim ekiplerine günde 1.000\'den fazla mesaj, kalıcı mesaj geçmişiyle iletiliyor',
        'Yavaş uç noktaları profilleyerek, N+1 sorgularını yeniden yazarak, hedefli indeksler ekleyerek ve yoğun okunan yollar için bellek içi önbellek ekleyerek API yanıt sürelerini %60 azalttım (~800ms\'den ~320ms\'ye)',
        'Çok aşamalı denetim sözleşmeleri için veri modelini ve iş akışı motorunu tasarlayarak sözleşme başına işlem süresini ~2 saatten ~20 dakikaya indirdim',
        'Üretim ortamında hata izleme ve uyarı için Sentry\'yi entegre ettim; istisnalar stack trace ve istek bağlamıyla kaydedilerek sorunlar hızla teşhis edilip düzeltiliyor',
      ],
    },
    'nct': {
      location: 'Pekin, Çin',
      locationType: 'Uzaktan',
      title: 'Full-Stack Geliştirici',
      description: [
        '6 kişilik bir ekibin parçası olarak denetim yönetimi ve finansal takip platformunu sıfırdan geliştirdim ve boş bir depodan 3 ayda canlıya taşıdım',
        'Gelir ve giderleri takip eden, kâr marjlarını otomatik hesaplayan ve aylık raporlar üreten finans modülleri geliştirerek ayda ~20 saatlik manuel tablo işini ortadan kaldırdım',
        'Platformun REST API\'sini ve ilişkisel şemasını tasarladım; 460 kullanıcıyı ve 3.500\'den fazla denetim kaydını destekliyor',
        'Platform genelinde rol tabanlı erişim kontrolü ve güvenli kimlik doğrulama uyguladım',
      ],
    },
    'sino-uk': {
      location: 'Pekin, Çin',
      locationType: 'Uzaktan',
      title: 'Tek Back-end Geliştirici',
      employmentType: 'Okul yönetim platformu',
      description: [
        'Öğretmenlere ve öğrencilere hizmet veren bir okul yönetim platformunun backend\'ini uçtan uca geliştirdim; ders programı, ödev verme ve teslimi, gelişim raporları ve finans süreçlerini kapsıyor',
        'Öğretmen müsaitliğine dayalı, kısıt tabanlı bir ders programı algoritması geliştirerek çakışmaları ve haftada ~6 saatlik manuel program hazırlığını ortadan kaldırdım',
        'Ödev iş akışını (ödev verme, öğrenci teslimi ve öğretmen değerlendirmesi) ve bundan üretilen gelişim raporlarını geliştirdim',
        'Öğrenci ve öğretmen hesapları için finans alt sistemini ve kurum genelinde bir finans ve istatistik panelini tasarlayıp otomatikleştirerek ayda ~15 saatlik manuel muhasebe işini ortadan kaldırdım',
        'Redis önbelleği ekleyerek platformun en ağır rapor ve panel sorgularının yanıt sürelerini %55 azalttım (~600ms\'den ~270ms\'ye)',
      ],
    },
  },
  aiWorkflow: [
    'Geliştirme, refactoring ve kod incelemesi için her gün Claude Code ve diğer ajan tabanlı kodlama asistanlarıyla çalışıyorum',
    'Yapay zekâ destekli iş akışlarıyla ISBIS\'in 4 rol tabanlı panelini ve gözetimli sınav sistemini katıldıktan sonraki 3 ay içinde teslim ederken paralelde eksiksiz bir e-ticaret platformu yayına aldım',
    'Prompt ve bağlam mühendisliği uygulayarak bağlamı sıkı biçimde sınırlıyor, token açısından verimli iş akışlarında üretim kalitesinde çıktı alıp yapay zekâ araç maliyetlerini düşük tutuyorum',
    'Mimarinin sorumluluğunu üstleniyor ve yapay zekâ tarafından üretilen her değişikliği merge öncesinde inceliyorum; böylece yapay zekânın sağladığı hız asla kod kalitesinden ödün verilerek elde edilmiyor',
  ],
  projects: {
    'jalali-picker': {
      period: 'Açık kaynak npm paketi',
      description: [
        'Celali (İran) takviminde tarih/saat seçimi için açık kaynak bir Vue bileşeni yazıp yayımladım; Farsça yerel ayarlı uygulamalar için Vue ekosistemindeki bir boşluğu dolduruyor',
        'Temalar, renkler, formatlar, yerel ayar, aralık/saat modları ve slot tabanlı özelleştirmelerle tamamen özelleştirilebilir hâle getirdim; kullanıcılar fork etmeden her parçayı yeniden biçimlendirip genişletebiliyor',
      ],
    },
    'python-automation': {
      title: 'Python Otomasyon Betikleri',
      period: 'Otomasyon',
      description: [
        'Zamanlanmış veritabanı yedekleme ve veritabanları arası veri taşıma betikleri yazdım',
        'Belirli aralıklarla Telegram kanallarına veri yayımlayan Telegram botları geliştirdim',
      ],
    },
  },
  contributing: {
    title: 'Katkıda Bulunma',
    paragraphs: [
      'Gerçek, gündelik sorunları çözen açık kaynak projelerle ilgileniyorum: diğer geliştiricilerin zamanını kazandıran, küçük ve iyi belgelenmiş araçlar. vue-jalali-datetime-picker da böyle doğdu ve Farsça yerel ayarlı Vue uygulamaları için bir boşluğu doldurdu.',
      '.NET ve Vue ekosistemlerindeki faydalı projelere katkıda bulunmaktan memnuniyet duyarım; ister özellik geliştirmek, hata düzeltmek, pull request incelemek ya da dokümantasyonu iyileştirmek olsun, ister bir kütüphanenin uzun vadeli bakımına yardım etmek. Ekstra bir el gerektiren bir fikriniz veya issue\'nuz varsa benimle iletişime geçin.',
    ],
    ctaLabel: 'Sohbet başlat',
    ctaSubject: 'Açık kaynak iş birliği',
  },
  education: {
    'university': {
      school: 'Tebriz Payame Noor Üniversitesi',
      degree: 'Bilgisayar Mühendisliği Lisans',
      description: 'İlgili dersler: Veri Yapıları, Algoritmalar, Veritabanı Sistemleri, Yazılım Mühendisliği, İşletim Sistemleri',
    },
    'high-school': {
      school: 'Tebriz Firdevsi Lisesi',
      degree: 'Lise Diploması, Matematik ve Fizik',
    },
  },
} satisfies PortfolioCopy
